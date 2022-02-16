import create, { UseBoundStore, StoreApi } from 'zustand';
import {
    useGainsDataStoreScaffolding,
    GainsDataStoreInterface,
} from 'shared/stores/GainsDataStore';
import { GainsTradingDataInterface } from 'types/gains/GainsTradingData';

export interface ActiveGainsDataStoreInterface {
    store: UseBoundStore<GainsDataStoreInterface, StoreApi<GainsDataStoreInterface>>;
    setStore: (
        store: UseBoundStore<GainsDataStoreInterface, StoreApi<GainsDataStoreInterface>>
    ) => void;
}

export const useActiveGainsDataStore = create<ActiveGainsDataStoreInterface>(set => ({
    store: create<GainsDataStoreInterface>(set => useGainsDataStoreScaffolding(set)),
    setStore: (store: UseBoundStore<GainsDataStoreInterface, StoreApi<GainsDataStoreInterface>>) =>
        set(state => {
            console.log('Updating store');
            return { store };
        }),
}));
