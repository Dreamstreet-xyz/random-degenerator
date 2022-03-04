import { formatEther, formatUnits } from '@ethersproject/units';
import { FinalizedTradeDetailsType, DegenTradeRecord, TradeStatus } from 'types/Trade';

export const transformFinalDetailsToTradeRecord = (
    tradeDetails: FinalizedTradeDetailsType
): DegenTradeRecord => {
    const {
        pairIndex,
        index,
        initialPosToken,
        positionSizeDai,
        openPrice,
        leverage,
        tp,
        sl,
        orderId,
        ...rest
    } = tradeDetails;

    const _pairIndex = Number(pairIndex);
    const _index = Number(index);
    const _positionSizeDai = Number(formatEther(positionSizeDai));
    const _openPrice = Number(formatUnits(openPrice, 10));
    const _leverage = Number(leverage);
    const _tp = Number(formatUnits(tp, 10));
    const _sl = Number(formatUnits(sl, 10));
    const _orderId = Number(orderId);

    return {
        ...rest,
        pairIndex: _pairIndex,
        index: _index,
        positionSizeDai: _positionSizeDai,
        openPrice: _openPrice,
        leverage: _leverage,
        tp: _tp,
        sl: _sl,
        orderId: _orderId,
    };
};

export const transitionTradeToStatus = (from: TradeStatus, to: TradeStatus): TradeStatus => {
    switch (to) {
        case TradeStatus.None:
            return to;
        case TradeStatus.PendingSignature:
            if (from === TradeStatus.None) {
                return to;
            }
            return from;
        case TradeStatus.Mining:
            if ([TradeStatus.PendingSignature, TradeStatus.None].includes(from)) {
                return to;
            }
            return from;
        case TradeStatus.PendingExecution:
            if (
                [TradeStatus.Mining, TradeStatus.PendingSignature, TradeStatus.None].includes(from)
            ) {
                return to;
            }
            return from;
        case TradeStatus.Executed:
            if (
                [
                    TradeStatus.PendingExecution,
                    TradeStatus.Mining,
                    TradeStatus.PendingSignature,
                    TradeStatus.None,
                    TradeStatus.Unconfirmed,
                ].includes(from)
            ) {
                return to;
            }
            return from;
        case TradeStatus.Success:
            console.log('Success', from);
            if (from === TradeStatus.Executed || from === TradeStatus.Unconfirmed) {
                return to;
            }
            return from;
        case TradeStatus.Canceled:
        case TradeStatus.TimedOut:
        case TradeStatus.Failed:
            if (from !== TradeStatus.Executed && from !== TradeStatus.Success) {
                return to;
            }
            return from;
        case TradeStatus.Unconfirmed:
            return to;
        default:
            break;
    }
    return to;
};

export const getTradeProgress = (status: TradeStatus): { cur: number; total: number } => {
    const progress = {
        cur: 0,
        total: 5,
    };
    switch (status) {
        case TradeStatus.Canceled:
        case TradeStatus.TimedOut:
        case TradeStatus.Failed:
            progress.cur = -1;
            break;
        case TradeStatus.PendingSignature:
            progress.cur = 1;
            break;
        case TradeStatus.Mining:
            progress.cur = 2;
            break;
        case TradeStatus.PendingExecution:
            progress.cur = 3;
            break;
        case TradeStatus.Unconfirmed:
        case TradeStatus.Executed:
            progress.cur = 4;
            break;
        case TradeStatus.Success:
            progress.cur = 5;
            break;
        case TradeStatus.None:
        default:
            progress.cur = 0;
            break;
    }
    return progress;
};
