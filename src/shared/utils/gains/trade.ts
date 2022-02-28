import type { GainsTradingDataInterface } from 'types/gains/GainsTradingData';
import type { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import type { GainsPricingDataInterface } from 'types/gains/GainsPricingData';
import type { PnlType } from 'types/Trade';
import { calculateCloseFee } from './fees';
import { getLivePairPrice } from './pairs';
import { formatEther, formatUnits } from '@ethersproject/units';

export const calculatePnL = (
    trade: GainsCoreDataInterface.TradeWrapper,
    priceData: GainsPricingDataInterface.Data,
    tv: GainsTradingDataInterface.Data
): PnlType => {
    if (!trade || !priceData || !tv) {
        return {
            pnl: -1,
            percentProfit: -1,
            feeDai: -1,
            pnlInclFee: -1,
            percentProfitInclFee: -1,
        };
    }
    const pc = calculatePriceChange(trade, priceData);
    const pp = calculatePercentProfit(pc, trade);
    const pnl = pp * Number(formatEther(trade?.trade?.positionSizeDai));
    const feeDai = calculateCloseFee(trade, tv);
    const ret = {
        pnl: pnl,
        percentProfit: pp * 100,
        feeDai,
        pnlInclFee: pnl - feeDai,
        percentProfitInclFee: (pnl - feeDai) / Number(formatEther(trade?.trade?.positionSizeDai)),
    };
    // console.log({
    //     trade,
    //     ret,
    //     priceChange: pc,
    //     percentProfit: pp,
    //     pnlNoFees: pnl,
    //     feeDai,
    //     percentProfitReverse: pnl / Number(formatEther(trade?.trade?.positionSizeDai)),
    //     percentProfitReverseFees:
    //         (pnl + feeDai) / Number(formatEther(trade?.trade?.positionSizeDai)),
    // });

    return ret;
};

export const calculatePercentProfit = (
    priceChange: number,
    trade: GainsCoreDataInterface.TradeWrapper
): number => priceChange * parseInt(trade?.trade?.leverage);

export const calculatePriceChange = (
    trade: GainsCoreDataInterface.TradeWrapper,
    priceData: GainsPricingDataInterface.Data
): number => {
    const curPrice = getLivePairPrice(parseInt(trade?.trade?.pairIndex), priceData);
    const openPrice = Number(formatUnits(trade?.trade?.openPrice, 10));
    const pc = curPrice > openPrice ? curPrice / openPrice - 1 : 1 - curPrice / openPrice;

    return (trade?.trade?.buy && curPrice >= openPrice) ||
        (!trade?.trade?.buy && curPrice <= openPrice)
        ? pc
        : -pc;
};

export const getTradeKey = (trade: GainsCoreDataInterface.TradeWrapper): string =>
    `${trade.trade.pairIndex}-${trade.trade.index}`;
