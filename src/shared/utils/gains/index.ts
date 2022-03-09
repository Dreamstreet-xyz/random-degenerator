import { formatEther } from '@ethersproject/units';
import { GainsTradingDataInterface } from 'types/gains/GainsTradingData';
import { GainsStreamingDataInterface } from 'types/gains/GainsStreamingData';
import { GainsCoreDataInterface, AssetType } from 'types/gains/GainsCoreData';
import { getMinPositionSizeForAssetTypes, getPairString } from 'shared/utils/gains/pairs';
import { BigNumber } from 'ethers';
import { GainsUserTradingData } from 'types/gains/GainsUserTradingData';
import { GainsLiveEventDataInterface } from 'types/gains/GainsLiveEventData';

export const transformTradingVariables = (
    data: GainsTradingDataInterface.Data
): GainsTradingDataInterface.Data => {
    // TODO V6: remove this once on Polygon
    if (data.maxPosDaiP) {
        return data;
    }
    try {
        data.maxPosDaiInt = parseInt(formatEther(data.maxPosDai));
        data.pairs = data.pairs.map(pair => {
            pair = { ...pair, ...data?.groups[pair?.groupIndex], ...data?.fees[pair?.feeIndex] };
            pair.minPosDaiInt = Math.ceil(
                parseInt(formatEther(pair.minLevPosDai)) / parseInt(pair.maxLeverage)
            );
            return pair;
        });

        data.minPosDaiInt = getMinPositionSizeForAssetTypes(data, [AssetType.CRYPTO]);
    } catch (error) {
        console.error(error);
    }

    return data;
};

export const transformUserTradingVariables = (
    data: GainsUserTradingData.Data
): GainsUserTradingData.Data => {
    // TODO: add types and transforms
    const newData = { ...data };
    return newData;
};

export const transformUserTradingHistory = (
    data: GainsCoreDataInterface.HistoricalTrade[]
): GainsCoreDataInterface.HistoricalTrade[] => {
    // TODO: add types and transforms
    const newData = [...data];
    return newData.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
};

export const transformTradeWrapper = (
    ot: GainsCoreDataInterface.TradeWrapper,
    tv: GainsTradingDataInterface.Data
): GainsCoreDataInterface.TradeWrapper => {
    const pair = tv?.pairs[ot?.trade?.pairIndex];

    console.log(ot);
    const positionSizeDai =
        !ot.trade?.positionSizeDai || ot.trade?.positionSizeDai === '0'
            ? BigNumber.from(ot?.tradeInfo?.openInterestDai)
                  .div(parseInt(ot?.trade?.leverage) || 1)
                  .toString()
            : ot.trade?.positionSizeDai;
    return {
        ...ot,
        trade: {
            ...ot.trade,
            pairString: `${pair?.from}/${pair?.to}`,
            positionSizeDai,
        },
    };
};

export const transformCloseEventToTradeWrapper = (
    closeEvent:
        | GainsLiveEventDataInterface.MarketExecuted
        | GainsLiveEventDataInterface.LimitExecuted,
    tv: GainsTradingDataInterface.Data
): GainsCoreDataInterface.TradeWrapper => {
    const trade: GainsCoreDataInterface.Trade = {
        trader: closeEvent.t[0],
        pairIndex: closeEvent.t[1],
        index: closeEvent.t[2],
        initialPosToken: closeEvent.t[3],
        positionSizeDai: closeEvent.positionSizeDai || closeEvent.t[4],
        openPrice: closeEvent.t[5],
        buy: closeEvent.t[6],
        leverage: closeEvent.t[7],
        tp: closeEvent.t[8],
        sl: closeEvent.t[9],
        pairString: getPairString(tv.pairs[parseInt(closeEvent.t[1])]),
    };

    const tradeInfo: GainsCoreDataInterface.TradeInfo = {
        tokenPriceDai: closeEvent.price.toString(),
        openInterestDai: BigNumber.from(trade.positionSizeDai).mul(trade.leverage).toString(),
        beingMarketClosed: true,
    };

    return transformTradeWrapper({ trade, tradeInfo }, tv);
};
