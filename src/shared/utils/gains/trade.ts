import type { GainsTradingDataInterface } from 'types/gains/GainsTradingData';
import type { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import type { GainsPricingDataInterface } from 'types/gains/GainsPricingData';
import type { PnlType } from 'types/Trade';
import { calculateCloseFee, calculateFundingFee, calculateRolloverFee } from './fees';
import { getLivePairPrice } from './pairs';
import { formatEther, formatUnits } from '@ethersproject/units';
import { StorageInterfaceV5 } from 'types/ethers-contracts/TradingV6';
import { SubmitTradeOverride } from 'shared/hooks/useOpenTradeV6';
import { GainsLiveEventDataInterface } from 'types/gains/GainsLiveEventData';
import { transformCloseEventToTradeWrapper } from 'shared/utils/gains';

const _calculatePnL = (
    trade: GainsCoreDataInterface.TradeWrapper,
    pc: number,
    tv: GainsTradingDataInterface.Data,
    currentBlock: number
) => {
    const pp = calculatePercentProfit(pc, trade?.trade);
    const pnl = pp * Number(formatEther(trade?.trade?.positionSizeDai));
    const closingFee = calculateCloseFee(trade, tv);
    const fundingFee = calculateFundingFee(trade, tv, currentBlock);
    const rolloverFee = calculateRolloverFee(trade, tv, currentBlock);

    const feeDai = closingFee + fundingFee + rolloverFee;
    return {
        pnl: pnl,
        percentProfit: pp * 100,
        feeDai,
        pnlInclFee: pnl - feeDai,
        percentProfitInclFee: (pnl - feeDai) / Number(formatEther(trade?.trade?.positionSizeDai)),
        fundingFeeDai: fundingFee,
        rolloverFeeDai: rolloverFee,
        closingFeeDai: closingFee,
    };
};

export const calculatePnL = (
    trade: GainsCoreDataInterface.TradeWrapper,
    priceData: GainsPricingDataInterface.Data,
    tv: GainsTradingDataInterface.Data,
    currentBlock: number
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
    const pc = calculatePriceChangeFromPriceData(trade?.trade, priceData);
    return _calculatePnL(trade, pc, tv, currentBlock);
};

export const calculatePnLFromCloseEvent = (
    tradeEvent:
        | GainsLiveEventDataInterface.MarketExecuted
        | GainsLiveEventDataInterface.LimitExecuted,
    tv: GainsTradingDataInterface.Data,
    currentBlock: number
) => {
    const trade = transformCloseEventToTradeWrapper(tradeEvent, tv);
    if (!trade || !tradeEvent || !tv) {
        return {
            pnl: -1,
            percentProfit: -1,
            feeDai: -1,
            pnlInclFee: -1,
            percentProfitInclFee: -1,
        };
    }

    const pc = calculatePriceChange(trade?.trade, Number(formatUnits(tradeEvent?.price, 10)));
    return _calculatePnL(trade, pc, tv, currentBlock);
};

export const calculatePercentProfit = (
    priceChange: number,
    trade: GainsCoreDataInterface.Trade
): number => priceChange * parseInt(trade?.leverage);

export const calculatePriceChangeFromPriceData = (
    trade: GainsCoreDataInterface.Trade,
    priceData: GainsPricingDataInterface.Data
): number => {
    const curPrice = getLivePairPrice(parseInt(trade?.pairIndex), priceData);
    return calculatePriceChange(trade, curPrice);
};

export const calculatePriceChange = (
    trade: GainsCoreDataInterface.Trade,
    curPrice: number
): number => {
    const openPrice = Number(formatUnits(trade?.openPrice, 10));
    const pc = curPrice > openPrice ? curPrice / openPrice - 1 : 1 - curPrice / openPrice;

    return (trade?.buy && curPrice >= openPrice) || (!trade?.buy && curPrice <= openPrice)
        ? pc
        : -pc;
};

export const getTradeKey = (trade: GainsCoreDataInterface.TradeWrapper): string =>
    `${trade?.trade?.pairIndex}-${trade?.trade?.index}`;

export const getTradeKeyFromTradeStruct = (trade: StorageInterfaceV5.TradeStruct): string =>
    `${trade?.pairIndex}-${trade?.index}`;

export const getTradeKeyFromTradeOverrides = (trade: SubmitTradeOverride): string =>
    `${trade?.pairIndex}-${trade?.index}`;

export const getTradeKeyFromCloseEvent = (
    tradeEvent:
        | GainsLiveEventDataInterface.MarketExecuted
        | GainsLiveEventDataInterface.LimitExecuted
): string => `${tradeEvent?.t[1]}-${tradeEvent?.t[2]}`;

export const getTradeDetailsFromCloseEvent = (
    tradeEvent:
        | GainsLiveEventDataInterface.MarketExecuted
        | GainsLiveEventDataInterface.LimitExecuted
): any => {
    const percentProfit = Number(formatUnits(tradeEvent.percentProfit, 10));
    const percentProfitS = percentProfit.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const positionSizeDai = Number(formatUnits(tradeEvent.positionSizeDai, 18));
    const positionSizeDaiS = positionSizeDai.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const pnl = positionSizeDai * (percentProfit / 100);

    return {};
};
