import { useEffect } from 'react';
import { Icon, Modal } from 'components/common';
import { ModalBody, WalletOption, WalletIcon, Overlay } from './styles';

const WALLETS = [
    { id: 0, name: 'MetaMask', icon: '/images/wallets/metamask.png' },
    { id: 1, name: 'WalletConnect (SOON)', icon: '/images/wallets/walletconnect.png' },
];

function LoadingOverlay({ loading }) {
    if (loading) return <Overlay>Loading spinning animation</Overlay>;

    return null;
}

export default function WalletModal({ isVisible, close, connect, loading }) {
    useEffect(() => {}, [isVisible]);

    const handleConnect = provider => {
        connect(provider);
    };

    return (
        <Modal
            isVisible={isVisible}
            close={close}
            title="Connect Wallet"
            titleStyle={{ color: '#6b69ee' }}
            containerStyle={{ maxWidth: 460, width: '100%' }}
        >
            <LoadingOverlay loading={loading} />
            <ModalBody>
                {WALLETS.map(wallet => (
                    <WalletOption
                        key={wallet.name}
                        disabled={wallet.id !== 0}
                        onClick={() => handleConnect(wallet.name)}
                    >
                        <WalletIcon src={wallet.icon} />
                        {wallet.name}
                    </WalletOption>
                ))}
            </ModalBody>
        </Modal>
    );
}
