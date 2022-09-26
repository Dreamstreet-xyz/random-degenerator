import { useEffect, useMemo, useState } from 'react';
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
    const useGainsDataStore = useActiveGainsDataStore(
        (state: ActiveGainsDataStoreInterface) => state.store
    );
    const tradingVariables = useGainsDataStore(
        (state: GainsDataStoreInterface) => state.tradingVariables
    );
    const currentBlock = useGainsDataStore((state: GainsDataStoreInterface) => state.currentBlock);

    const priceData = useGainsPriceStore((state: GainsPriceStoreInterface) => state.priceData);
    const [isActive, setIsActive] = useState(true);
    const pnl = useMemo(
        () => (isActive ? calculatePnL(trade, priceData, tradingVariables, currentBlock) : pnl),
        [trade, tradingVariables, currentBlock, isActive]
    );
    const freeze = (freeze: boolean) => {
        setIsActive(!freeze);
    };

    return useMemo(() => ({ pnl, freeze }), [pnl, freeze]);
}
