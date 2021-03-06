import { Icon } from 'components/common';
import { useUser } from 'shared/contexts/UserContext';
import { WalletConnectionStatus } from 'types/Wallet';
import { Container, Button, NetworkIcon, Chevron, WrongNetworkIcon } from './styles';

export default function NetworkButton({ selected, isOpen, onClick }) {
    const { walletConnectionStatus } = useUser();

    const invalidNetwork =
        walletConnectionStatus === WalletConnectionStatus.NetworkMismatch ||
        walletConnectionStatus === WalletConnectionStatus.UnsupportedNetwork;
    return (
        <Container>
            <Button type="button" onClick={onClick} invalid={invalidNetwork} isOpen={isOpen}>
                {invalidNetwork ? (
                    <>
                        <div
                            style={{ width: 24, height: 24, display: 'flex', alignItems: 'center' }}
                        >
                            <WrongNetworkIcon icon="unlink" size={16} />
                        </div>
                        <span>Wrong Network</span>
                        <Chevron
                            icon={isOpen ? 'chevron-up' : 'chevron-down'}
                            size={12}
                            style={{ color: '#ffc7d3' }}
                        />
                    </>
                ) : (
                    <>
                        <NetworkIcon src={selected.icon} />
                        <span>{selected.chainName}</span>
                        <Chevron icon={isOpen ? 'chevron-up' : 'chevron-down'} size={12} />
                    </>
                )}
            </Button>
        </Container>
    );
}
