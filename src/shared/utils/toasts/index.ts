import { formatUnits } from '@ethersproject/units';
import { GainsLiveEventDataInterface } from 'types/gains/GainsLiveEventData';
import { GainsTradingDataInterface } from 'types/gains/GainsTradingData';
import { calculatePnLFromCloseEvent, getTradeKeyFromCloseEvent } from 'shared/utils/gains/trade';
import { transformCloseEventToTradeWrapper } from 'shared/utils/gains';
import ToastChannel from './ToastChannel';

export const runClosedTradeToast = (
    closeEvent:
        | GainsLiveEventDataInterface.MarketExecuted
        | GainsLiveEventDataInterface.LimitExecuted,
    tv: GainsTradingDataInterface.Data
) => {
    console.log(closeEvent);
    const pnl = calculatePnLFromCloseEvent(closeEvent, tv);
    const trade = transformCloseEventToTradeWrapper(closeEvent, tv);
    ToastChannel.updateToastInChannel(getTradeKeyFromCloseEvent(closeEvent), {
        options: {
            render: `Trade closed - ${trade.trade.pairString} @ ${formatUnits(
                closeEvent.price,
                10
            )} - ${pnl.pnlInclFee.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })} (${(pnl.percentProfitInclFee * 100).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}%) `,
            type: 'info',
            autoClose: 5000,
        },
    });
};
