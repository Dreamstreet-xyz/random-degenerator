import { formatEther, formatUnits } from '@ethersproject/units';
import { BigNumber } from 'ethers';
import type { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import type { GainsTradingDataInterface } from 'types/gains/GainsTradingData';

export const calculateCloseFee = (
    trade: GainsCoreDataInterface.TradeWrapper,
    tv: GainsTradingDataInterface.Data
): number => {
    const oid = Number(formatEther(trade.tradeInfo.openInterestDai));
    const feeP = Number(
        formatUnits(
            tv?.fees[tv?.pairs[parseInt(trade?.trade?.pairIndex)]?.feeIndex || 0]?.closeFeeP,
            10
        )
    );
    return (feeP / 100) * oid;
};
