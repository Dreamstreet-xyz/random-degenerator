import { formatEther } from '@ethersproject/units';
import { GainsPricingDataInterface } from 'types/gains/GainsPricingData';
import { GainsTradingDataInterface } from 'types/gains/GainsTradingData';
import { GainsCoreDataInterface, AssetType } from 'types/gains/GainsCoreData';

export const getLivePairPrice = (
    pairIndex: number,
    priceData: GainsPricingDataInterface.Data
): number => {
    // console.log(`Getting live price for ${pairIndex}`);
    if (pairIndex == null || !priceData) {
        return;
    }

    let { name: n, closes: c } = priceData;
    if (n === 'charts') {
        return c[pairIndex];
    }
};

export const getMinLevForPosSizeAndPair = (
    pair: GainsTradingDataInterface.Pair,
    positionSize: number
): number => Math.ceil(parseInt(formatEther(pair?.minLevPosDai || '0')) / positionSize);

export const getLeverageRangeForPosSizeAndPair = (
    pair: GainsTradingDataInterface.Pair,
    positionSize: number
): number[] => {
    const minLeverageForPos = getMinLevForPosSizeAndPair(pair, positionSize);
    const levs = [
        Math.max(minLeverageForPos, parseInt(pair.minLeverage)),
        parseInt(pair.maxLeverage),
    ];
    console.log(`Leverage range for ${positionSize} and pair ${pair.from}/${pair.to}: ${levs}`);
    return levs;
};

export const getMinLevForPosSizeAllPairs = (
    positionSize: number,
    data: GainsTradingDataInterface.Data
): number => {
    let minLeverageAcrossPairs = 1000;

    // compute minimum leverage for each pair to hit minLevPosDai given positionSize
    data?.pairs?.forEach(pair => {
        const minLeverage = getMinLevForPosSizeAndPair(pair, positionSize);
        const pairMinLeverage = parseInt(pair.minLeverage);
        if (minLeverage < minLeverageAcrossPairs) {
            minLeverageAcrossPairs = Math.max(minLeverage, pairMinLeverage);
        }
    });

    console.log(`Minimum leverage for ${positionSize} is ${minLeverageAcrossPairs}`);
    return minLeverageAcrossPairs;
};

export const getLevRangeForPosSizeAllPairs = (
    positionSize: number,
    data: GainsTradingDataInterface.Data
): number[] => {
    let minLeverageAcrossPairs = 1000;
    let maxLeverageAcrossPairs = 0;

    // compute minimum leverage for each pair to hit minLevPosDai given positionSize
    data?.pairs?.forEach(pair => {
        const minLeverage = getMinLevForPosSizeAndPair(pair, positionSize);
        const pairMinLeverage = parseInt(pair.minLeverage);
        if (minLeverage < minLeverageAcrossPairs) {
            minLeverageAcrossPairs = Math.max(minLeverage, pairMinLeverage);
        }

        const maxLeverage = parseInt(pair.maxLeverage);
        if (maxLeverage > maxLeverageAcrossPairs) {
            maxLeverageAcrossPairs = maxLeverage;
        }
    });

    console.log(
        `Minimum leverage for ${positionSize} is [${minLeverageAcrossPairs}, ${maxLeverageAcrossPairs}]`
    );
    return [minLeverageAcrossPairs, maxLeverageAcrossPairs];
};

export const getPairString = (pair: GainsTradingDataInterface.Pair): string =>
    `${pair.from}/${pair.to}`;

export const getAssetTypeForPair = (
    pair: GainsTradingDataInterface.Pair,
    data: GainsTradingDataInterface.Data
): AssetType =>
    data?.cryptos?.includes(pair?.from)
        ? AssetType.CRYPTO
        : data?.forex?.includes(pair?.from)
        ? AssetType.FOREX
        : data?.stocks?.includes(pair?.from)
        ? AssetType.STOCKS
        : null;

export const isValidPair = (
    pairIndex: number,
    assetTypes: AssetType[],
    positionSizeDai: number,
    tradingVariables: GainsTradingDataInterface.Data,
    openTrades: GainsCoreDataInterface.TradeWrapper[] = []
): boolean => {
    const pair = tradingVariables.pairs[pairIndex];
    const assetName = pair?.from;
    const assetType = getAssetTypeForPair(pair, tradingVariables);
    console.log(`Asset type for pair ${assetName} is ${assetType}`);
    if (!assetType) {
        throw Error('Invalid pair index');
    }

    // check asset type
    if (!assetTypes.includes(assetType)) {
        console.log(`Pair ${assetName} is not a valid asset type`, assetTypes);
        return false;
    }

    // check position size against leverage
    const minLev = getMinLevForPosSizeAndPair(pair, positionSizeDai);
    if (minLev > parseInt(pair.maxLeverage)) {
        return false;
    }

    // check # open trades against pair
    console.log('Open trades', openTrades);
    const openTradeCount = openTrades.filter(t => parseInt(t.trade.pairIndex) === pairIndex).length;
    console.log('Open trades', openTradeCount);
    if (openTradeCount >= 3) {
        return false;
    }

    return true;
};

export const getMinPositionSizeForAssetTypes = (
    data: GainsTradingDataInterface.Data,
    assetTypes: AssetType[]
): number =>
    Math.min(
        ...data.pairs
            .filter((pair: GainsTradingDataInterface.Pair) =>
                assetTypes.includes(getAssetTypeForPair(pair, data))
            )
            .map((pair: GainsTradingDataInterface.Pair) => pair.minPosDaiInt)
    );
