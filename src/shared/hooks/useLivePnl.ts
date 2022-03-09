import { useEffect, useState } from 'react';
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
    const priceData = useGainsPriceStore((state: GainsPriceStoreInterface) => state.priceData);
    const [isActive, setIsActive] = useState(true);
    const [pnl, setPnl] = useState(calculatePnL(trade, priceData, tradingVariables));

    useEffect(() => {
        if (isActive) {
            console.log('Yep is active');
            setPnl(calculatePnL(trade, priceData, tradingVariables));
        }
    }, [tradingVariables, priceData, isActive]);

    const freeze = (freeze: boolean) => {
        setIsActive(!freeze);
    };

    return { pnl, freeze };
}
