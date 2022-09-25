import { formatUnits } from '@ethersproject/units';
import { GainsLiveEventDataInterface } from 'types/gains/GainsLiveEventData';
import { GainsTradingDataInterface } from 'types/gains/GainsTradingData';
import { calculatePnLFromCloseEvent } from 'shared/utils/gains/trade';
import { transformCloseEventToTradeWrapper } from 'shared/utils/gains';
import { runClosedTradeToast } from 'shared/utils/toasts';
import TradeCelebration from 'shared/utils/trade/TradeCelebration';

export const handleTradeClosed = (
    closeEvent:
        | GainsLiveEventDataInterface.MarketExecuted
        | GainsLiveEventDataInterface.LimitExecuted,
    tv: GainsTradingDataInterface.Data,
    currentBlock: number
) => {
    const pnl = calculatePnLFromCloseEvent(closeEvent, tv, currentBlock);

    // TODO: refactor runClosedTradeToast to use calculated values above
    runClosedTradeToast(closeEvent, tv, currentBlock);

    // if a win, submit to the winpopup
    if (pnl?.percentProfitInclFee > 0) {
        TradeCelebration.trigger({ dai: pnl?.pnlInclFee, percent: pnl?.percentProfitInclFee });
    }
};
