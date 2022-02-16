import { useUser } from 'shared/contexts/UserContext';
import { NeonButton } from 'components/common';
import { WalletConnectionStatus } from 'types/Wallet';
import { Section } from './styles';
import ConnectedApp from './ConnectedApp';
import { GainsDataStoreInterface } from 'shared/stores/GainsDataStore';
import {
    useActiveGainsDataStore,
    ActiveGainsDataStoreInterface,
} from 'shared/stores/ActiveGainsDataStore';
import { SquareLoadingSpinner } from 'components/common/Loading';

export default function MainApp({ gas }) {
    const { user, walletConnectionStatus, connectWallet, loading: cLoading } = useUser();
    const useGainsDataStore = useActiveGainsDataStore(
        (state: ActiveGainsDataStoreInterface) => state.store
    );
    const tradingVariables = useGainsDataStore(
        (state: GainsDataStoreInterface) => state.tradingVariables
    );

    const handleConnect = () => {
        connectWallet();
    };

    const renderMainApp = () => {
        switch (walletConnectionStatus) {
            case WalletConnectionStatus.Connected:
            case WalletConnectionStatus.UnsupportedNetwork:
            case WalletConnectionStatus.NetworkMismatch:
            case WalletConnectionStatus.OtherError:
                return <ConnectedApp gas={gas} />;
            case WalletConnectionStatus.Connecting:
                return <NeonButton title="Connect Wallet" onClick={handleConnect} loading />;
            case WalletConnectionStatus.Disconnected:
                return (
                    <NeonButton title="Connect Wallet" onClick={handleConnect} loading={cLoading} />
                );
            default:
                return <div>something went wrong</div>;
        }
    };

    if (
        !tradingVariables ||
        (walletConnectionStatus === WalletConnectionStatus.Connected && !user.daiBalance)
    ) {
        return (
            <Section style={{ alignItems: 'center', marginTop: 0 }}>
                <SquareLoadingSpinner />
            </Section>
        );
    }

    return <Section>{renderMainApp()}</Section>;
}
