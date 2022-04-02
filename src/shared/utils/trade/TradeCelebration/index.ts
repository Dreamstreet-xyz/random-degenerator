import { useTradeCelebrationDataStore } from 'shared/stores/TradeCelebrationDataStore';
import { Win } from 'types/Trade/Celebration';

export type TradeCelebrationHandlerType = {
    trigger: (win: Win) => void;
    removeActiveCelebration: () => void;
};

const TradeCelebration: TradeCelebrationHandlerType = {
    trigger: (win: Win) => useTradeCelebrationDataStore.getState().trigger(win),
    removeActiveCelebration: () =>
        useTradeCelebrationDataStore.getState().removeActiveCelebration(),
};

export default TradeCelebration;
