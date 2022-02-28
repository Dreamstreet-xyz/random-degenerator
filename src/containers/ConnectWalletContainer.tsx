import { useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import WalletModal from 'components/layout/AppLayout/WalletModal';
import { toast } from 'react-toastify';

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {},
    },
};

/**
 * @deprecated
 */
export default function ConnectWalletContainer({ active, handleSuccess, handleFailure }) {
    const { activateBrowserWallet, account, activate } = useEthers();
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

    const handleConnect = async (walletName: string) => {
        setLoading(true);
        // switch (walletName) {
        //     case 'MetaMask':
        //         activateBrowserWallet(walletActivationError);
        //         break;
        //     default:
        //         // console.error('Unsupported wallet', walletName);
        //         break;
        // }
        const providerOptions = {
            injected: {
                display: {
                    name: 'Metamask',
                    description: 'Connect with the provider in your Browser',
                },
                package: null,
            },
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    bridge: 'https://bridge.walletconnect.org',
                    infuraId: '14a0951f47e646c1b241aa533e150219',
                },
            },
        };
        const web3Modal = new Web3Modal({
            providerOptions,
        });
        try {
            const provider = await web3Modal.connect();
            await activate(provider);
        } catch (error: any) {
            console.error(error);
            handleFailure(error.message);
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
