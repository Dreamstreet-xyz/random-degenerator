import { useMemo, useState } from 'react';
import type { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import { useGainsPriceStore, GainsPriceStoreInterface } from 'shared/stores/GainsPriceStore';
import { getLivePairPrice } from 'shared/utils/gains/pairs';

export type UseLivePriceType = { price: number; freeze: (freeze: boolean) => void };

export default function useLivePrice(trade: GainsCoreDataInterface.TradeWrapper): UseLivePriceType {
    const priceData = useGainsPriceStore((state: GainsPriceStoreInterface) => state.priceData);
    const [isActive, setIsActive] = useState(true);
    const price = useMemo(
        () =>
            isActive ? getLivePairPrice(parseInt(trade?.trade?.pairIndex), priceData) || -1 : price,
        [trade, priceData, isActive]
    );

    const freeze = (freeze: boolean) => {
        console.log('setting freeze', freeze);
        setIsActive(!freeze);
    };

    return { price, freeze };
}
