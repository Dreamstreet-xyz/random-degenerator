import { formatEther, formatUnits } from '@ethersproject/units';
import type { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import type { GainsTradingDataInterface } from 'types/gains/GainsTradingData';

export const calculateCloseFee = (
    trade: GainsCoreDataInterface.TradeWrapper,
    tv: GainsTradingDataInterface.Data
): number => {
    const posDai = Number(formatEther(trade.trade.positionSizeDai));
    const fees = tv?.fees[tv?.pairs[parseInt(trade?.trade?.pairIndex)]?.feeIndex || 0];
    const leverage = +trade.trade.leverage;
    const closeFeeP = Number(formatUnits(fees.closeFeeP, 12));
    const nftLimitOrderFeeP = Number(formatUnits(fees.nftLimitOrderFeeP, 12));

    const feeP = Number(
        formatUnits(
            tv?.fees[tv?.pairs[parseInt(trade?.trade?.pairIndex)]?.feeIndex || 0]?.closeFeeP,
            10
        )
    );
    return (closeFeeP + nftLimitOrderFeeP) * posDai * leverage;
};

export const calculateFundingFee = (
    trade: GainsCoreDataInterface.TradeWrapper,
    tv: GainsTradingDataInterface.Data,
    currentBlock: number
): number => {
    const pairParams = tv.pairParams;
    const pairFundingFees = tv.pairFundingFees;
    const openInterests = tv.openInterests;
    const initialAccFundingFees = parseInt(trade.initialAccFees?.funding) / 1e18;
    const openedAfterUpdate = trade.initialAccFees?.openedAfterUpdate;
    const pairIndex = trade.trade.pairIndex;
    const buy = trade.trade.buy;
    const leveragedPosDai =
        Number(formatEther(trade.trade.initialPosToken)) *
        Number(formatUnits(trade.tradeInfo.tokenPriceDai, 10)) *
        parseInt(trade.trade.leverage);

    if (
        !currentBlock ||
        !openedAfterUpdate ||
        pairParams === undefined ||
        pairParams.length === 0 ||
        pairFundingFees === undefined ||
        pairFundingFees.length === 0 ||
        openInterests === undefined
    ) {
        return 0;
    }
    const { accPerOiLong, accPerOiShort, lastUpdateBlock } = pairFundingFees[pairIndex];
    const { fundingFeePerBlockP } = pairParams[pairIndex];

    const { long: longOi, short: shortOi } = openInterests[pairIndex];
    const fundingFeesPaidByLongs =
        (longOi - shortOi) * fundingFeePerBlockP * (currentBlock - lastUpdateBlock);

    const pendingAccFundingFees = buy
        ? accPerOiLong + fundingFeesPaidByLongs / longOi
        : accPerOiShort + (fundingFeesPaidByLongs * -1) / shortOi;

    return leveragedPosDai * (pendingAccFundingFees - initialAccFundingFees) || 0;
};

export const calculateRolloverFee = (
    trade: GainsCoreDataInterface.TradeWrapper,
    tv: GainsTradingDataInterface.Data,
    currentBlock: number
): number => {
    const posDai =
        Number(formatEther(trade.trade.initialPosToken)) *
        Number(formatUnits(trade.tradeInfo.tokenPriceDai, 10));
    const pairIndex = trade.trade.pairIndex;
    const initialAccRolloverFees = parseFloat(trade.initialAccFees?.rollover) / 1e18;
    const openedAfterUpdate = trade.initialAccFees?.openedAfterUpdate;
    const pairParams = tv.pairParams;
    const pairRolloverFees = tv.pairRolloverFees;

    if (
        !currentBlock ||
        !openedAfterUpdate ||
        pairParams === undefined ||
        pairParams.length === 0 ||
        pairRolloverFees === undefined ||
        pairRolloverFees.length === 0
    )
        return 0;

    const { accPerCollateral, lastUpdateBlock } = pairRolloverFees[pairIndex];
    const { rolloverFeePerBlockP } = pairParams[pairIndex];

    const pendingAccRolloverFees =
        accPerCollateral + (currentBlock - lastUpdateBlock) * rolloverFeePerBlockP;

    return posDai * (pendingAccRolloverFees - initialAccRolloverFees);
};
