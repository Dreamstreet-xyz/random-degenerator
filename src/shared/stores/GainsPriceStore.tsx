import create from 'zustand';
import { getLivePairPrice } from 'shared/utils/gains/pairs';
import { GainsPricingDataInterface } from 'types/gains/GainsPricingData';

export interface GainsPriceStoreInterface {
    getLivePairPrice: (pairIndex: number) => number;
    priceData: GainsPricingDataInterface.Data | {};
    setPriceData: (pd: GainsPricingDataInterface.Data) => void;
}

// used by all components that need to access the price
export const useGainsPriceStore = create<GainsPriceStoreInterface>(set => ({
    getLivePairPrice: (pairIndex: number) =>
        getLivePairPrice(pairIndex, useGainsPriceStore.getState().priceData),
    priceData: {},
    setPriceData: (pd: GainsPricingDataInterface.Data) => set(state => ({ priceData: pd })),
}));
