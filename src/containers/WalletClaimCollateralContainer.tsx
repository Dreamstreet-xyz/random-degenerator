import { useEffect } from 'react';
import {
    useActiveGainsDataStore,
    ActiveGainsDataStoreInterface,
} from 'shared/stores/ActiveGainsDataStore';
import { GainsDataStoreInterface } from 'shared/stores/GainsDataStore';

export default function WalletClaimCollateralContainer() {
    const useGainsDataStore = useActiveGainsDataStore(
        (state: ActiveGainsDataStoreInterface) => state.store
    );
    const timedOutTradeIds = useGainsDataStore(
        (state: GainsDataStoreInterface) => state.timedOutTradeIdsForWallet
    );

    useEffect(() => {
        console.log(timedOutTradeIds);
    }, [timedOutTradeIds]);

    if (!timedOutTradeIds || timedOutTradeIds.length === 0) {
        return null;
    }
}
