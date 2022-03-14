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
import {
    FinalizedTradeDetailsType,
    TradeStatus,
    DegenLevel,
    PlayFormSettingsType,
    TradeDirection,
} from 'types/Trade';
import { getPairString, isValidPair } from 'shared/utils/gains/pairs';
import { formatEther, parseEther } from '@ethersproject/units';
import { BigNumber } from 'ethers';
import { transformFinalDetailsToTradeRecord } from 'shared/utils/trade';
import { transitionTradeToStatus } from 'shared/utils/trade';
import { toast } from 'react-toastify';

export interface UseRandomTradeInterface {
    submitRandomTrade: (trader: string, settings: PlayFormSettingsType) => Promise<boolean>;
    state: TransactionStatus;
    resetState: () => void;
    generateRandomOverrides: (settings: PlayFormSettingsType) => SubmitTradeOverride;
    tradeDetails: StorageInterfaceV5.TradeStruct | null;
    tradeOverrides: SubmitTradeOverride | null;
    finalOrderDetails: FinalizedTradeDetailsType | null;
    tradeStatus: TradeStatus;
}

const MAX_LOSS_P = 75;
const POSITION_TYPE = ['long', 'short'];
const DEFAULT_ASSET_TYPES = [AssetType.CRYPTO];

const DEGEN_LEVEL_SETTING_UPDATES = {
    [DegenLevel.normal]: {
        minLossP: 0,
        maxLossP: MAX_LOSS_P,
        minGainP: 0,
        minLeverage: -1,
        maxLeverage: -1,
    },
    [DegenLevel.high]: {
        minLossP: 50,
        maxLossP: MAX_LOSS_P,
        minGainP: 200,
        maxGainP: 'max',
        minLeverage: 100,
        maxLeverage: 150,
    },
};

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

const getRandomStopLossP = (leverage: number, minLossP: number, maxLossP: number) => {
    // too tight of sl on high leverage will instantly trigger so set min based on
    const _minLossP = leverage > 100 ? 50 : leverage > 50 ? 25 : 10;
    minLossP = Math.max(_minLossP, minLossP);
    return getRandomFloorNumberIncl(minLossP, maxLossP);
};
const getRandomTakeProfitP = (leverage: number, minGainP: number, maxGainP: number) => {
    const _minGainP = leverage > 100 ? 25 : leverage > 50 ? 15 : 10;
    minGainP = Math.max(_minGainP, minGainP);
    return getRandomFloorNumberIncl(minGainP, maxGainP);
};

export default function useRandomTrade(): UseRandomTradeInterface {
    const { network } = useNetworkDetails();
    const [tradeStatus, setTradeStatus] = useState<TradeStatus>(TradeStatus.None);
    const [submitTradeBlockNumber, setSubmitTradeBlock] = useState<number>();
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
        const timeoutBlockCount = parseInt(tradingVariables.marketOrdersTimeout);
        if (
            orderTxReceipt &&
            !finalOrderDetails &&
            [TradeStatus.PendingExecution, TradeStatus.DelayedExecution].includes(tradeStatus) &&
            currentBlock - orderTxReceipt.blockNumber >= timeoutBlockCount
        ) {
            setTradeStatus(transitionTradeToStatus(tradeStatus, TradeStatus.TimedOut));
        } else {
            const blockWait = currentBlock - submitTradeBlockNumber;
            if (blockWait === Math.round(timeoutBlockCount * 0.5)) {
                if (tradeStatus === TradeStatus.Mining) {
                    setTradeStatus(transitionTradeToStatus(tradeStatus, TradeStatus.DelayedMining));
                } else if (tradeStatus === TradeStatus.PendingExecution) {
                    setTradeStatus(
                        transitionTradeToStatus(tradeStatus, TradeStatus.DelayedExecution)
                    );
                } else {
                    console.log('Hmm... delayed execution but where are we?', tradeStatus);
                }
            }
        }
    }, [currentBlock]);

    useEffect(() => {
        let timeout;
        if (
            unconfirmedMarketOrder &&
            tradeDetails &&
            tradeStatus === TradeStatus.PendingExecution &&
            unconfirmedMarketOrder?.returnValues?.t[1]?.toString() ===
                tradeDetails?.pairIndex?.toString() &&
            unconfirmedMarketOrder?.returnValues?.t[6] === tradeDetails?.buy &&
            unconfirmedMarketOrder?.returnValues?.t[7] === tradeDetails?.leverage?.toString()
        ) {
            timeout = setTimeout(() => {
                setTradeStatus(transitionTradeToStatus(tradeStatus, TradeStatus.Unconfirmed));
            }, 1000);
        }

        // this will prevent a transition from confirmed to unconfirmed if the order was confirmed while this effect was executing
        // useEffects create closures which cache all state values so there is a race condition that can take place
        // because we are listening for tradeStatus updates, if it happens in the interim, we just wipe timeout
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
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

    const generateRandomOverrides = (settings: PlayFormSettingsType): SubmitTradeOverride => {
        console.log(settings);
        const { collateralRange, assetTypes, degenLevel, direction, details } = settings;
        const minCollateral = collateralRange[0];
        const maxCollateral = collateralRange[1];
        const degenLevelSettings =
            DEGEN_LEVEL_SETTING_UPDATES[degenLevel] ||
            DEGEN_LEVEL_SETTING_UPDATES[DegenLevel.normal];
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
        let [minLeverage, maxLeverage] = getLeverageRangeForPosSizeAndPair(
            tradingVariables.pairs[pairIndex],
            positionSizeDai
        );

        // update min // max based on degenLevel
        minLeverage = Math.max(minLeverage, degenLevelSettings.minLeverage);
        maxLeverage = Math.max(maxLeverage, degenLevelSettings.maxLeverage);

        const leverage = getRandomFloorNumberIncl(minLeverage, maxLeverage);

        // get sl & tp percentages
        const slP = getRandomStopLossP(
            leverage,
            degenLevelSettings.minLossP,
            degenLevelSettings.maxLossP
        );

        // stop gap solution for limiting TP size a bit. without trades are too asymmetrical
        let maxTp = getRandomFloorNumberIncl(1, tradingVariables.maxGainP / 100);
        if (maxTp >= 5) {
            // reroll to double odds it's less than 5
            maxTp = getRandomFloorNumberIncl(1, tradingVariables.maxGainP / 100);
        }
        const tpP = getRandomTakeProfitP(
            leverage,
            degenLevelSettings.minGainP,
            (degenLevelSettings.maxGainP === 'max' && tradingVariables.maxGainP) ||
                degenLevelSettings.maxGainP ||
                maxTp * 100
        );
        const pIx =
            direction === TradeDirection.both
                ? getRandomFloorNumberIncl(0, 1)
                : direction === TradeDirection.long
                ? 0
                : 1;

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
        settings: PlayFormSettingsType
    ): Promise<boolean> => {
        const { slippageP, assetTypes } = settings;
        const _tradeOverrides: SubmitTradeOverride =
            tradeOverrides || generateRandomOverrides(settings);

        _tradeOverrides.slippageP = Number(slippageP);
        _tradeOverrides.referrer = network.referralAddress;

        console.log('Submitting trade with overrides', _tradeOverrides);
        const trade = await submitTrade(trader, _tradeOverrides);
        setSubmitTradeBlock(currentBlock);
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
