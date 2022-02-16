import { useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import WalletModal from 'components/layout/AppLayout/WalletModal';
import { toast } from 'react-toastify';

export default function ConnectWalletContainer({ active, handleSuccess, handleFailure }) {
    const { activateBrowserWallet, account } = useEthers();
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(active);

    useEffect(() => {
        if (account) {
            setLoading(false);
            setModalVisible(false);
            handleSuccess(account);
        }
    }, [account]);

    useEffect(() => {
        setModalVisible(active);
    }, [active]);

    const walletActivationError = error => {
        console.log(error);
        toast.error(error.message);
    };

    const handleConnect = (walletName: string) => {
        setLoading(true);
        switch (walletName) {
            case 'MetaMask':
                activateBrowserWallet(walletActivationError);
                break;
            default:
                // console.error('Unsupported wallet', walletName);
                break;
        }
        setLoading(false);
    };
    return (
        <WalletModal
            isVisible={isModalVisible && active}
            close={() => handleFailure(null)}
            connect={handleConnect}
            loading={loading}
        />
    );
}
