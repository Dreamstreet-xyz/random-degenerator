import { formatEther } from '@ethersproject/units';
import { GainsTradingDataInterface } from 'types/gains/GainsTradingData';
import { GainsStreamingDataInterface } from 'types/gains/GainsStreamingData';
import { GainsCoreDataInterface, AssetType } from 'types/gains/GainsCoreData';
import { getMinPositionSizeForAssetTypes } from 'shared/utils/gains/pairs';
import { BigNumber } from 'ethers';

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

export const transformTradeWrapper = (
    ot: GainsCoreDataInterface.TradeWrapper,
    tv: GainsTradingDataInterface.Data
): GainsCoreDataInterface.TradeWrapper => {
    const pair = tv?.pairs[ot?.trade?.pairIndex];

    const positionSizeDai =
        !ot.trade?.positionSizeDai || ot.trade?.positionSizeDai === '0'
            ? BigNumber.from(ot.tradeInfo.openInterestDai)
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
