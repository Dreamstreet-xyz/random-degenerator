import { useMemo } from 'react';
import type { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import {
    useActiveGainsDataStore,
    ActiveGainsDataStoreInterface,
} from 'shared/stores/ActiveGainsDataStore';
import { GainsDataStoreInterface } from 'shared/stores/GainsDataStore';
import { useGainsPriceStore, GainsPriceStoreInterface } from 'shared/stores/GainsPriceStore';
import { calculatePnL } from 'shared/utils/gains/trade';
import { getLivePairPrice } from 'shared/utils/gains/pairs';

export default function useLivePrice(trade: GainsCoreDataInterface.TradeWrapper) {
    const priceData = useGainsPriceStore((state: GainsPriceStoreInterface) => state.priceData);
    const price = useMemo(
        () => getLivePairPrice(parseInt(trade?.trade?.pairIndex), priceData) || -1,
        [trade, priceData]
    );

    return price;
}
