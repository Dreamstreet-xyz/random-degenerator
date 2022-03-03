import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { useState, useEffect } from 'react';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';
import { GainsDataStoreInterface } from 'shared/stores/GainsDataStore';
import { GainsTradingDataInterface } from 'types/gains/GainsTradingData';
import {
    getMinLevForPosSizeAndPair,
    getLeverageRangeForPosSizeAndPair,
} from 'shared/utils/gains/pairs';
import useOpenTradeV6, { SubmitTradeOverride } from './useOpenTradeV6';
import { StorageInterfaceV5 } from 'types/ethers-contracts/TradingV6';
import { TransactionStatus } from '@usedapp/core';
import {
    useActiveGainsDataStore,
    ActiveGainsDataStoreInterface,
} from 'shared/stores/ActiveGainsDataStore';
import { GainsCoreDataInterface, AssetType } from 'types/gains/GainsCoreData';
import { FinalizedTradeDetailsType, TradeStatus } from 'types/Trade';
import { getPairString, isValidPair } from 'shared/utils/gains/pairs';
import { formatEther, parseEther } from '@ethersproject/units';
import { BigNumber } from 'ethers';
import { transformFinalDetailsToTradeRecord } from 'shared/utils/trade';
import { toast } from 'react-toastify';
import { transitionTradeToStatus } from 'shared/utils/trade';

export interface UseRandomTradeInterface {
    submitRandomTrade: (
        trader: string,
        slippageP: number,
        minCollateral?: number,
        maxCollateral?: number,
        assetTypes?: AssetType[]
    ) => Promise<boolean>;
    state: TransactionStatus;
    resetState: () => void;
    generateRandomOverrides: (
        minCollateral: number,
        maxCollateral: number,
        assetTypes?: AssetType[]
    ) => SubmitTradeOverride;
    tradeDetails: StorageInterfaceV5.TradeStruct | null;
    tradeOverrides: SubmitTradeOverride | null;
    finalOrderDetails: FinalizedTradeDetailsType | null;
    tradeStatus: TradeStatus;
}

const MAX_LOSS_P = 75;
const POSITION_TYPE = ['long', 'short'];
const DEFAULT_ASSET_TYPES = [AssetType.CRYPTO];

const getRandomPairIndexFromPosSize = (
    positionSizeDai: number,
    assetTypes: AssetType[],
    tradingVariables: GainsTradingDataInterface.Data,
    openTrades: GainsCoreDataInterface.TradeWrapper[] = []
): number => {
    let pairIndex: number;

    // add robustness to pair generation by removing already rolled and only randoming until this empties at which point fail out
    const pairsIx = tradingVariables.pairs.map((_, i) => i);

    do {
        const pairIxIx = Math.floor(Math.random() * pairsIx.length);
        pairIndex = pairsIx[pairIxIx];
        pairsIx.splice(pairIxIx, 1);
    } while (
        !isValidPair(pairIndex, assetTypes, positionSizeDai, tradingVariables, openTrades) &&
        pairsIx.length > 0
    );

    // final check to ensure last wasn't valid
    // this is a repeat but
    if (
        pairsIx.length === 0 &&
        !isValidPair(pairIndex, assetTypes, positionSizeDai, tradingVariables, openTrades)
    ) {
        console.error('No valid pairs for position size', positionSizeDai);
        return -1;
    }

    return pairIndex;
};

export const getRandomFloorNumberIncl = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomStopLossP = (leverage: number, maxLossP: number) => {
    // too tight of sl on high leverage will instantly trigger so set min based on
    const minLossP = leverage > 100 ? 25 : leverage > 50 ? 15 : 10;
    return getRandomFloorNumberIncl(minLossP, maxLossP);
};
const getRandomTakeProfitP = (leverage: number, maxGainP: number) => {
    const minGainP = leverage > 100 ? 25 : leverage > 50 ? 15 : 10;
    return getRandomFloorNumberIncl(minGainP, maxGainP);
};

export default function useRandomTrade(): UseRandomTradeInterface {
    const { network } = useNetworkDetails();
    const [tradeStatus, setTradeStatus] = useState<TradeStatus>(TradeStatus.None);
    const { submitTrade, state, resetState, skip } = useOpenTradeV6({
        tradingAddress: network?.tradingV6ContractAddress,
    });
    const useGainsDataStore = useActiveGainsDataStore(
        (state: ActiveGainsDataStoreInterface) => state.store
    );
    const tradingVariables: GainsTradingDataInterface.Data = useGainsDataStore(
        (state: GainsDataStoreInterface) => state.tradingVariables
    );
    const [tradeDetails, setTradeDetails] = useState<StorageInterfaceV5.TradeStruct | null>(null);
    const [tradeOverrides, setTradeOverrides] = useState<SubmitTradeOverride | null>(null);
    const [tradeCanceled, setTradeCanceled] = useState(false);
    const [finalOrderDetails, setFinalOrderDetails] = useState<FinalizedTradeDetailsType | null>(
        null
    );
    const [orderTxReceipt, setOrderTxReceipt] = useState<TransactionReceipt | null>(null);
    const marketOrder = useGainsDataStore(
        (state: GainsDataStoreInterface) => state.latestMarketOrderForWallet
    );
    const unconfirmedMarketOrder = useGainsDataStore(
        (state: GainsDataStoreInterface) => state.latestUnconfirmedMarketOrderForWallet
    );
    const marketOrderCanceled = useGainsDataStore(
        (state: GainsDataStoreInterface) => state.latestMarketOrderCanceledForWallet
    );
    const currentBlock = useGainsDataStore((state: GainsDataStoreInterface) => state.currentBlock);

    useEffect(() => {
        if (skip) {
            console.log('No address for trading');
        }
    }, [skip]);

    useEffect(() => {
        if (
            orderTxReceipt &&
            !finalOrderDetails &&
            tradeStatus === TradeStatus.PendingExecution &&
            currentBlock - orderTxReceipt.blockNumber >=
                parseInt(tradingVariables.marketOrdersTimeout)
        ) {
            // toast.error('The trade timed out - claim your collateral at Gains.Trade now!', {
            //     autoClose: false,
            // });
            setTradeStatus(transitionTradeToStatus(tradeStatus, TradeStatus.TimedOut));
        }
    }, [currentBlock]);

    useEffect(() => {
        if (
            unconfirmedMarketOrder &&
            tradeDetails &&
            tradeStatus === TradeStatus.PendingExecution &&
            unconfirmedMarketOrder?.returnValues?.t[1]?.toString() ===
                tradeDetails?.pairIndex?.toString() &&
            unconfirmedMarketOrder?.returnValues?.t[6] === tradeDetails?.buy &&
            unconfirmedMarketOrder?.returnValues?.t[7] === tradeDetails?.leverage?.toString()
        ) {
            setTimeout(() => {
                toast.info('Order executed: waiting on block confirmation', {
                    autoClose: false,
                });
            }, 1000);
        }
    }, [tradeStatus, unconfirmedMarketOrder]);

    useEffect(() => {
        switch (state?.status) {
            case 'Success':
                setOrderTxReceipt(state.receipt);
                if ([TradeStatus.PendingSignature, TradeStatus.Mining].includes(tradeStatus)) {
                    setTradeStatus(
                        transitionTradeToStatus(tradeStatus, TradeStatus.PendingExecution)
                    );
                }
                break;
            case 'PendingSignature':
                setTradeStatus(transitionTradeToStatus(tradeStatus, TradeStatus.PendingSignature));
                break;
            case 'Mining':
                setTradeStatus(transitionTradeToStatus(tradeStatus, TradeStatus.Mining));
                break;
            default:
                break;
        }
    }, [state]);

    useEffect(() => {
        if (
            !finalOrderDetails &&
            marketOrder &&
            tradeDetails &&
            orderTxReceipt &&
            marketOrder?.returnValues?.t[1]?.toString() === tradeDetails?.pairIndex?.toString() &&
            marketOrder?.returnValues?.t[6] === tradeDetails?.buy &&
            marketOrder?.returnValues?.t[7] === tradeDetails?.leverage?.toString()
        ) {
            // updates from price oracle and fee deduction
            const _fod = {
                ...tradeOverrides,
                ...tradeDetails,
                openPrice: marketOrder.returnValues.price,
                positionSizeDai: marketOrder.returnValues.positionSizeDai,
                txHash: orderTxReceipt.transactionHash,
                pairString: getPairString(
                    tradingVariables.pairs[parseInt(tradeDetails.pairIndex.toString())]
                ),
                feesDai: Number(
                    formatEther(
                        BigNumber.from(tradeDetails.positionSizeDai)
                            .sub(BigNumber.from(marketOrder.returnValues.positionSizeDai))
                            .toString()
                    ).toString()
                ),
                chainId: network.chainId,
                orderId: Number(marketOrder.returnValues.orderId),
                tpP: tradeOverrides?.tpP ?? 0,
                slP: tradeOverrides?.slP ?? 0,
            };
            console.log(
                'Fee after subtraction',
                BigNumber.from(tradeDetails.positionSizeDai)
                    .sub(BigNumber.from(marketOrder.returnValues.positionSizeDai))
                    .toString()
            );
            console.log('Final order details', _fod);

            // record
            try {
                fetch('/api/trade/record', {
                    method: 'POST',
                    body: JSON.stringify(transformFinalDetailsToTradeRecord(_fod)),
                });
            } catch (e) {
                console.log('Error recording trade', e);
            }

            setFinalOrderDetails(_fod);
            setTradeStatus(transitionTradeToStatus(tradeStatus, TradeStatus.Executed));
        }
    }, [orderTxReceipt, marketOrder]);

    useEffect(() => {
        // TODO: this is assuming market order was canceled if a cancel was listened to that
        // had the same pairIndex and address... there's a chance for false positives here
        if (
            marketOrderCanceled &&
            marketOrderCanceled.open &&
            marketOrderCanceled.pairIndex === tradeDetails?.pairIndex.toString()
        ) {
            console.log('Market order canceled');
            setTradeCanceled(true);
            setTradeStatus(transitionTradeToStatus(tradeStatus, TradeStatus.Canceled));
        }
    }, [marketOrderCanceled]);

    const _resetState = () => {
        resetState();
        setTradeOverrides(null);
        setTradeDetails(null);
        setFinalOrderDetails(null);
        setTradeCanceled(false);
        setTradeStatus(transitionTradeToStatus(tradeStatus, TradeStatus.None));
    };

    const generateRandomOverrides = (
        minCollateral: number,
        maxCollateral: number,
        assetTypes: AssetType[] = DEFAULT_ASSET_TYPES
    ): SubmitTradeOverride => {
        if (minCollateral === null || maxCollateral === null) {
            throw Error('Collateral not set');
        }

        if (!tradingVariables?.pairs) {
            throw Error('Missing trading variables');
        }

        const positionSizeDai = getRandomFloorNumberIncl(minCollateral, maxCollateral);

        // get all open trades for random pair selection
        const openTrades: GainsCoreDataInterface.TradeWrapper[] =
            useGainsDataStore.getState().openTradesForWallet;

        let pairIndex = getRandomPairIndexFromPosSize(
            positionSizeDai,
            assetTypes,
            tradingVariables,
            openTrades
        );

        if (pairIndex === -1) {
            throw Error('No valid pairs for position size');
        }

        // compute leverage based on pair
        const [minLeverage, maxLeverage] = getLeverageRangeForPosSizeAndPair(
            tradingVariables.pairs[pairIndex],
            positionSizeDai
        );
        const leverage = getRandomFloorNumberIncl(minLeverage, maxLeverage);

        // get sl & tp percentages
        const slP = getRandomStopLossP(leverage, MAX_LOSS_P);
        const tpP = getRandomTakeProfitP(leverage, tradingVariables.maxGainP);
        const pIx = getRandomFloorNumberIncl(0, 1);

        const _tradeOverrides = {
            positionSizeDai,
            pairIndex,
            leverage,
            slP,
            tpP,
            position: POSITION_TYPE[pIx],
            index: openTrades?.filter(t => parseInt(t.trade.pairIndex) === pairIndex).length ?? 0,
        };
        setTradeOverrides(_tradeOverrides);
        return _tradeOverrides;
    };

    const submitRandomTrade = async (
        trader: string,
        slippageP: number,
        minCollateral?: number,
        maxCollateral?: number,
        assetTypes?: AssetType[]
    ): Promise<boolean> => {
        const _tradeOverrides: SubmitTradeOverride =
            tradeOverrides || generateRandomOverrides(minCollateral, maxCollateral, assetTypes);

        _tradeOverrides.slippageP = slippageP;
        _tradeOverrides.referrer = network.referralAddress;

        console.log('Submitting trade with overrides', _tradeOverrides);
        const trade = await submitTrade(trader, _tradeOverrides);
        setTradeDetails(trade);
        return true;
    };

    return {
        submitRandomTrade,
        generateRandomOverrides,
        state,
        resetState: _resetState,
        tradeDetails,
        tradeOverrides,
        finalOrderDetails,
        tradeStatus,
    };
}
