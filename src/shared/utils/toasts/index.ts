import { formatUnits } from '@ethersproject/units';
import { GainsLiveEventDataInterface } from 'types/gains/GainsLiveEventData';
import { GainsTradingDataInterface } from 'types/gains/GainsTradingData';
import { calculatePnLFromCloseEvent, getTradeKeyFromCloseEvent } from 'shared/utils/gains/trade';
import { transformCloseEventToTradeWrapper } from 'shared/utils/gains';
import { renderClosedTradeToast } from 'components/common/Toast/ClosedTradeToast';
import ToastChannel from './ToastChannel';
import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import { ActionType } from 'types/gains/GainsCoreData';
import { PnlType } from 'types/Trade';

const getActionType = (
    closeEvent:
        | GainsLiveEventDataInterface.MarketExecuted
        | GainsLiveEventDataInterface.LimitExecuted,
    trade: GainsCoreDataInterface.TradeWrapper,
    pnl: PnlType
) => {
    // using nftHolder as proxy for market close distinction
    // sl / tp / liquidation all require nft holder to trigger close
    if (!closeEvent.nftHolder) {
        return ActionType.MAR;
    }

    // if no sl / tp were set, this is a liquidation
    if (trade.trade.sl === '0' && trade.trade.tp === '0') {
        return ActionType.LIQ;
    }

    return pnl.percentProfit > 0 ? ActionType.TP : ActionType.SL;
};

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
            render: () =>
                renderClosedTradeToast({
                    type: getActionType(closeEvent, trade, pnl),
                    pnl,
                    price: Number(formatUnits(closeEvent.price, 10)),
                    pair: trade.trade.pairString,
                }),
            type: 'info', // TOOD: custom types for net profit / loss?
            autoClose: 5000,
        },
    });
};
