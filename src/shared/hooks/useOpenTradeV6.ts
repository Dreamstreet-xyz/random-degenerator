import { useState, useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { BigNumberish } from 'ethers';
import { parseUnits } from '@ethersproject/units';
import { useContractFunction } from 'shared/hooks/useContractFunction';
import { TradingV6__factory } from 'types/ethers-contracts';
import { useGainsPriceStore, GainsPriceStoreInterface } from 'shared/stores/GainsPriceStore';

const DEFAULT_POSITION_SIZE = 0;
const DEFAULT_PAIR_INDEX = 0; // BTC/USD
const DEFAULT_LEVERAGE = 5; // minimum
export const LONG_POSITION = 'long';
export const SHORT_POSITION = 'short';
const DEFAULT_POSITION = LONG_POSITION;

export interface SubmitTradeOverride {
    positionSizeDai?: number;
    pairIndex?: number;
    leverage?: number;
    referrer?: string;
    slP?: number;
    tpP?: number;
    position?: string;
    index?: number;
    slippageP?: number;
}

export type TradeStruct = {
    trader: string;
    pairIndex: number;
    index: number;
    initialPosToken: number;
    positionSizeDai: BigNumberish;
    openPrice: BigNumberish;
    buy: boolean;
    leverage: number;
    tp: BigNumberish;
    sl: BigNumberish;
};

const calculateTakeProfitFromPercentage = (
    price: number,
    tpP: number,
    leverage: number,
    position: string
): number => {
    const multiplier = tpP / 100;
    if (position === LONG_POSITION) {
        console.log(`(${multiplier}/${leverage}) * ${price} + ${price}`);
        return (multiplier / leverage) * price + price;
    } else if (position === SHORT_POSITION) {
        console.log(`1-${multiplier}/${leverage} * ${price}`);
        return (1 - multiplier / leverage) * price;
    }

    console.error('Not a proper position, returning 0', position);
    return 0;
};

const calculateStopLossFromPercentage = (
    price: number,
    slP: number,
    leverage: number,
    position: string
): number => {
    const multiplier = slP / 100;
    if (position === LONG_POSITION) {
        console.log(`(1-${multiplier}/${leverage}) * ${price}`);
        return (1 - multiplier / leverage) * price;
    } else if (position === SHORT_POSITION) {
        console.log(`(${multiplier}/${leverage}) * ${price}`);
        return (multiplier / leverage) * price + price;
    }

    console.error('Not a proper position, returning 0', position);
    return 0;
};

export default function useOpenTradeV6({ tradingAddress }: { tradingAddress: string }) {
    const [positionSizeDai, setPositionSizeDai] = useState(DEFAULT_POSITION_SIZE);
    const [pairIndex, setPairIndex] = useState(DEFAULT_PAIR_INDEX);
    const [leverage, setLeverage] = useState(DEFAULT_LEVERAGE);
    const [referrer, setReferrer] = useState('0x0000000000000000000000000000000000000000');
    const [slippageP, setSlippageP] = useState(-1);
    const { library } = useEthers();
    const { send, state, resetState } = useContractFunction(
        TradingV6__factory.connect(tradingAddress, library),
        'openTrade'
    );
    const getLivePairPrice = useGainsPriceStore(
        (state: GainsPriceStoreInterface) => state.getLivePairPrice
    );

    const submitTrade = (trader: string, overrides?: SubmitTradeOverride): TradeStruct => {
        const _pIx = overrides?.pairIndex ?? pairIndex;
        const openPrice: number = getLivePairPrice(_pIx);
        const _positionSizeDai = overrides?.positionSizeDai ?? positionSizeDai;
        const _leverage = overrides?.leverage ?? leverage;
        const _referrer = overrides?.referrer ?? referrer;
        const _position = overrides?.position ?? DEFAULT_POSITION;
        const _index = overrides?.index ?? 0;
        const _slippage = parseUnits(overrides.slippageP?.toString() || slippageP.toString(), 9);
        const sl = overrides?.slP
            ? parseUnits(
                  calculateStopLossFromPercentage(openPrice, overrides.slP, _leverage, _position)
                      .toFixed(9)
                      .toString(),
                  10
              ).toString()
            : '0';
        const tp = overrides?.tpP
            ? parseUnits(
                  calculateTakeProfitFromPercentage(openPrice, overrides.tpP, _leverage, _position)
                      .toFixed(9)
                      .toString(),
                  10
              ).toString()
            : '0';

        const tuple: TradeStruct = {
            trader,
            pairIndex: _pIx,
            index: _index,
            initialPosToken: 0, // TODO: ask Seb for docs on this
            positionSizeDai: parseUnits(_positionSizeDai.toString(), 18).toString(),
            openPrice: parseUnits(openPrice.toString(), 10).toString(),
            buy: _position === LONG_POSITION,
            leverage: _leverage,
            tp,
            sl,
        };

        console.log(tuple);

        console.log('Sending trade to contract', tuple, 0, 0, _slippage.toString(), _referrer);
        // TODO: before sending, ensure user is on expected network. otherwise, this won't error, it'll actually send a tx to the address...
        send(tuple, 0, 0, _slippage, _referrer);
        return tuple;
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
        slippageP,
        setSlippageP,
    };
}
