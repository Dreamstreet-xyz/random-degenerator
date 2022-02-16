import { useEffect } from 'react';
import ActiveTrades from 'components/app/ActiveTrades';
import {
    useActiveGainsDataStore,
    ActiveGainsDataStoreInterface,
} from 'shared/stores/ActiveGainsDataStore';
import { GainsDataStoreInterface } from 'shared/stores/GainsDataStore';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';

export default function WalletOpenTradesContainer() {
    const { network } = useNetworkDetails();
    const useGainsDataStore = useActiveGainsDataStore(
        (state: ActiveGainsDataStoreInterface) => state.store
    );
    const openTradesForWallet = useGainsDataStore(
        (state: GainsDataStoreInterface) => state.openTradesForWallet
    );

    useEffect(() => {
        console.log(openTradesForWallet);
    }, [openTradesForWallet]);

    return <ActiveTrades trades={openTradesForWallet} network={network} />;
}
