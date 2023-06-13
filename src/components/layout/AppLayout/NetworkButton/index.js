import React from 'react';
import { useUser } from 'shared/contexts/UserContext';
import { WalletConnectionStatus } from 'types/Wallet';
import { Container, Button, NetworkIcon, Chevron, WrongNetworkIcon, PracticeBadge } from './styles';

const NetworkButton = React.forwardRef(({ selected, isOpen, onClick }, ref) => {
    const { walletConnectionStatus } = useUser();

    const invalidNetwork =
        walletConnectionStatus === WalletConnectionStatus.NetworkMismatch ||
        walletConnectionStatus === WalletConnectionStatus.UnsupportedNetwork;
    return (
        <Container>
            <Button
                type="button"
                onClick={onClick}
                invalid={invalidNetwork}
                isOpen={isOpen}
                ref={ref}
            >
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
                            size={10}
                            style={{ color: '#ffc7d3' }}
                        />
                    </>
                ) : (
                    <>
                        <NetworkIcon src={selected.icon} />
                        <span>{selected.chainName}</span>
                        {selected.chainName === 'Mumbai' && <PracticeBadge>Practice</PracticeBadge>}
                        <Chevron icon={isOpen ? 'chevron-up' : 'chevron-down'} size={10} />
                    </>
                )}
            </Button>
        </Container>
    );
});

export default NetworkButton;
