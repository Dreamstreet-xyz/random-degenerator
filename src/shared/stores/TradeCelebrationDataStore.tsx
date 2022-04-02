import create from 'zustand';
import { TradeCelebrationHandlerType } from 'shared/utils/trade/TradeCelebration';
import { getWinType } from 'components/app/WinPopup';
import { Win } from 'types/Trade/Celebration';

export interface TradeCelebrationDataStoreInterface extends TradeCelebrationHandlerType {
    activeTradeCelebration: Win;
}

export const useTradeCelebrationDataStore = create<TradeCelebrationDataStoreInterface>(set => ({
    activeTradeCelebration: null,
    trigger: (celebration: Win) =>
        set(state => {
            console.log('trigger', celebration);
            const active = state.activeTradeCelebration;
            // only update if celebration is larger
            if (
                !active ||
                getWinType(active.dai, active.percent) <
                    getWinType(celebration.dai, celebration.percent)
            ) {
                return { activeTradeCelebration: celebration };
            }
        }),
    removeActiveCelebration: () => set(state => ({ activeTradeCelebration: null })),
}));
