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
    tv: GainsTradingDataInterface.Data
) => {
    const pnl = calculatePnLFromCloseEvent(closeEvent, tv);
    const trade = transformCloseEventToTradeWrapper(closeEvent, tv);
    const price = Number(formatUnits(closeEvent.price, 10));

    // TODO: refactor runClosedTradeToast to use calculated values above
    runClosedTradeToast(closeEvent, tv);

    // if a win, submit to the winpopup
    if (pnl.percentProfitInclFee > 0) {
        TradeCelebration.trigger({ dai: price, percent: pnl.percentProfitInclFee });
    }
};
