import { useMemo } from 'react';
import type { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import {
    useActiveGainsDataStore,
    ActiveGainsDataStoreInterface,
} from 'shared/stores/ActiveGainsDataStore';
import { GainsDataStoreInterface } from 'shared/stores/GainsDataStore';
import { useGainsPriceStore, GainsPriceStoreInterface } from 'shared/stores/GainsPriceStore';
import { calculatePnL } from 'shared/utils/gains/trade';

export default function useLivePnl(trade: GainsCoreDataInterface.TradeWrapper) {
    const useGainsDataStore = useActiveGainsDataStore(
        (state: ActiveGainsDataStoreInterface) => state.store
    );
    const tradingVariables = useGainsDataStore(
        (state: GainsDataStoreInterface) => state.tradingVariables
    );
    const priceData = useGainsPriceStore((state: GainsPriceStoreInterface) => state.priceData);
    const pnl = useMemo(() => {
        return calculatePnL(trade, priceData, tradingVariables);
    }, [trade, tradingVariables, priceData]);

    return pnl;
}
