import { useState, useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { parseUnits } from '@ethersproject/units';
import { useContractFunction } from 'shared/hooks/useContractFunction';
import { TradingV5__factory } from 'types/ethers-contracts';
import { StorageInterfaceV5 } from 'types/ethers-contracts/TradingV5';
import { useGainsPriceStore, GainsPriceStoreInterface } from 'shared/stores/GainsPriceStore';

const DEFAULT_POSITION_SIZE = 0;
const DEFAULT_PAIR_INDEX = 0; // BTC/USD
const DEFAULT_LEVERAGE = 5; // minimum

interface SubmitTradeOverride {
    positionSizeDai?: number;
    pairIndex?: number;
    leverage?: number;
    referrer?: string;
}

/**
 *
 * @deprecated Please use useOpenTradeV6 instead. This is missing important features.
 */
export default function useOpenTradeV5({ tradingAddress }: { tradingAddress: string }) {
    if (!tradingAddress) {
        return { skip: true };
    }

    const [positionSizeDai, setPositionSizeDai] = useState(DEFAULT_POSITION_SIZE);
    const [pairIndex, setPairIndex] = useState(DEFAULT_PAIR_INDEX);
    const [leverage, setLeverage] = useState(DEFAULT_LEVERAGE);
    const [referrer, setReferrer] = useState('0x0000000000000000000000000000000000000000');
    const { library } = useEthers();
    const { send, state, resetState } = useContractFunction(
        TradingV5__factory.connect(tradingAddress, library),
        'openTrade'
    );
    const getLivePairPrice = useGainsPriceStore(
        (state: GainsPriceStoreInterface) => state.getLivePairPrice
    );

    const submitTrade = async (trader: string, overrides?: SubmitTradeOverride) => {
        const _pIx = overrides?.pairIndex ?? pairIndex;
        const openPrice = getLivePairPrice(_pIx).toString();
        console.log('Opening trade at price:', openPrice);

        const tuple: StorageInterfaceV5.TradeStruct = {
            trader,
            pairIndex: _pIx,
            index: 0, // TODO: ask Seb for docs on this
            initialPosToken: 0, // TODO: ask Seb for docs on this
            positionSizeDai: parseUnits(
                overrides?.positionSizeDai?.toString() ?? positionSizeDai.toString(),
                18
            ).toString(),
            openPrice: parseUnits(openPrice, 18).toString(),
            buy: true,
            leverage: overrides?.leverage ?? leverage,
            tp: 0,
            sl: 0,
        };

        console.log(tuple);

        // TODO: before sending, ensure user is on expected network. otherwise, this won't error, it'll actually send a tx to the address...
        return send(tuple, false, 0, 10000000000, overrides?.referrer || referrer);
    };

    useEffect(() => {
        console.log(state);
    }, [state]);

    return {
        positionSizeDai,
        setPositionSizeDai,
        pairIndex,
        setPairIndex,
        leverage,
        setLeverage,
        submitTrade,
        state,
        resetState,
        referrer,
        setReferrer,
        skip: false,
    };
}
