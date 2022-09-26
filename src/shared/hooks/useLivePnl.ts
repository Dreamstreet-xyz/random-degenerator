import { useMemo, useRef, useState } from 'react';
import type { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import {
    useActiveGainsDataStore,
    ActiveGainsDataStoreInterface,
} from 'shared/stores/ActiveGainsDataStore';
import { GainsDataStoreInterface } from 'shared/stores/GainsDataStore';
import { useGainsPriceStore, GainsPriceStoreInterface } from 'shared/stores/GainsPriceStore';
import { calculatePnL } from 'shared/utils/gains/trade';
import { PnlType } from 'types/Trade';

export type UseLivePnlType = { pnl: PnlType; freeze: (freeze: boolean) => void };

export default function useLivePnl(trade: GainsCoreDataInterface.TradeWrapper): UseLivePnlType {
    const activePnl = useRef<PnlType>();
    const useGainsDataStore = useActiveGainsDataStore(
        (state: ActiveGainsDataStoreInterface) => state.store
    );
    const tradingVariables = useGainsDataStore(
        (state: GainsDataStoreInterface) => state.tradingVariables
    );
    const currentBlock = useGainsDataStore((state: GainsDataStoreInterface) => state.currentBlock);

    const priceData = useGainsPriceStore((state: GainsPriceStoreInterface) => state.priceData);
    const [isActive, setIsActive] = useState(true);
    const pnl = useMemo(() => {
        if (isActive) {
            const _pnl = calculatePnL(trade, priceData, tradingVariables, currentBlock);
            activePnl.current = _pnl;
            return _pnl;
        }
        return activePnl.current;
    }, [trade, tradingVariables, currentBlock, isActive]);
    const freeze = (freeze: boolean) => {
        setIsActive(!freeze);
    };

    return useMemo(() => ({ pnl, freeze }), [pnl, freeze]);
}
