import { useState, useEffect, useMemo, useContext, createContext } from 'react';
import { useEtherBalance, useEthers, useTokenBalance } from '@usedapp/core';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import ConnectWalletContainer from 'containers/ConnectWalletContainer';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';
import { UserInterface } from 'types/User';
import { WalletConnectionStatus } from 'types/Wallet';
import {
    useGainsMainnetDataStore,
    useGainsTestnetDataStore,
    GainsDataStoreInterface,
} from 'shared/stores/GainsDataStore';
import { GainsTradingDataInterface } from 'types/gains/GainsTradingData';
import {
    useActiveGainsDataStore,
    ActiveGainsDataStoreInterface,
} from 'shared/stores/ActiveGainsDataStore';
import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import { ethers } from '@usedapp/core/node_modules/ethers';

const providerOptions = typeof window !== 'undefined' && {
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
            infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
            rpc: {
                80001:
                    'https://polygon-mumbai.g.alchemy.com/v2/' +
                    process.env.NEXT_PUBLIC_MUMBAI_API_KEY,
                137:
                    'https://polygon-mainnet.g.alchemy.com/v2/' +
                    process.env.NEXT_PUBLIC_POLYGON_API_KEY,
            },
        },
    },
};

const web3Modal =
    typeof window !== 'undefined' &&
    new Web3Modal({
        cacheProvider: true,
        providerOptions,
        theme: 'dark',
    });

type UserContextInterface = {
    user: UserInterface | null;
    walletConnectionStatus: WalletConnectionStatus | null;
    connectWallet: () => void;
    disconnectWallet: () => void;
    loading: boolean;
    error?: Error;
};

const UserContext = createContext<UserContextInterface>({
    user: null,
    walletConnectionStatus: null,
    connectWallet: () => {},
    disconnectWallet: () => {},
    loading: false,
});

export const useUser = () => {
    return useContext(UserContext);
};

export default function UserContextProvider({ children }) {
    const { account, deactivate, chainId, error, active, library, activate } = useEthers(); // TOOD: use activate for walletconnect
    const { network } = useNetworkDetails();
    const [loading, setLoading] = useState(true);
    const [isConnectWalletActive, setIsConnectWalletActive] = useState(false);
    const daiBalance = useTokenBalance(network.daiAddress, account);
    const nativeBalance = useEtherBalance(account);
    const [walletConnectionStatus, setWalletConnectionStatus] =
        useState<WalletConnectionStatus | null>(null);
    const useGainsDataStore = useActiveGainsDataStore(
        (state: ActiveGainsDataStoreInterface) => state.store
    );
    const tradingVariables = useGainsDataStore(
        (state: GainsDataStoreInterface) => state.tradingVariables
    );
    // const [trades, setTrades] = useState<GainsCoreDataInterface.Trade[] | null>(null);
    const [hasOpenTrades, setHasOpenTrades] = useState(false);

    const updateWalletConnectionStatus = () => {
        console.log('updateWalletConnectionStatus ' + account);
        let status = account
            ? WalletConnectionStatus.Connected
            : WalletConnectionStatus.Disconnected;
        if (chainId && chainId !== network.chainId) {
            status = WalletConnectionStatus.NetworkMismatch;
        } else if (error) {
            if (error?.name === 'UnsupportedChainIdError') {
                status = WalletConnectionStatus.UnsupportedNetwork;
            } else if (error?.name === 'NoEthereumProviderError') {
                status = WalletConnectionStatus.NoEthereumProvider;
            } else if (
                (error?.name === 'Error' &&
                    error?.message.includes('underlying network changed')) ||
                (error?.message.includes('1013') &&
                    error?.message.includes('Disconnected from chain'))
            ) {
                status = account
                    ? WalletConnectionStatus.Connected
                    : WalletConnectionStatus.Disconnected;
            } else if (error?.message.includes('Internal JSON-RPC error')) {
                status = account
                    ? WalletConnectionStatus.Connected
                    : WalletConnectionStatus.Disconnected;
            } else {
                status = WalletConnectionStatus.OtherError;
            }
            console.log(error);
            // console.log(error.message);
        } else if (loading) {
            status = WalletConnectionStatus.Connecting;
        }

        console.log('Status ' + status);
        console.log('Account ' + account);
        setWalletConnectionStatus(status);
    };

    // useEffect(() => {
    //     if (web3Modal.cachedProvider) {
    //         web3Modal.connect().then(provider => activate(provider));
    //     }
    // }, [network]);

    useEffect(() => {
        // without a reactivate, provider becomes stale on network change.
        // there should be a way to support "any" network, making provider's mutable, according to ethers.js
        //      https://github.com/ethers-io/ethers.js/issues/866
        // this doesn't appear to work with web3modal, so just reactivating as workaround
        const reactivate = async () => {
            if (web3Modal.cachedProvider) {
                const connection = await web3Modal.connect();
                const provider = new ethers.providers.Web3Provider(connection, 'any');
                provider.on('chainChanged', chainId => {
                    console.log('Chain changed to ' + chainId);
                });
                await activate(provider);
            }
        };
        reactivate();
    }, [network, account]);

    useEffect(() => {
        updateWalletConnectionStatus();
    }, [account, network, chainId, loading, error]);

    useEffect(() => {
        useGainsTestnetDataStore.getState().setActiveWallet(account);
        useGainsMainnetDataStore.getState().setActiveWallet(account);
        setLoading(false);
        if (account) {
            setIsConnectWalletActive(false);
        }
    }, [account]);

    const connectWallet = async () => {
        setWalletConnectionStatus(WalletConnectionStatus.Connecting);

        try {
            web3Modal.clearCachedProvider();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection, 'any');
            await activate(provider);
            // setActivateError('');
        } catch (error: any) {
            console.log(error);
            // setActivateError(error.message);
        }
    };

    const disconnectWallet = () => {
        web3Modal.clearCachedProvider();
        deactivate();
    };

    const handleConnectedWallet = (_account: string) => {
        if (_account) {
            setIsConnectWalletActive(false);
        } else {
            setIsConnectWalletActive(false);
        }
        setLoading(false);
        updateWalletConnectionStatus();
    };

    const value = useMemo(() => ({ connectWallet, disconnectWallet }), []);
    return (
        <UserContext.Provider
            value={{
                ...value,
                user: {
                    address: account,
                    chainId,
                    daiBalance,
                    nativeBalance,
                    avatar: null,
                    hasOpenTrades,
                },
                loading,
                walletConnectionStatus,
            }}
        >
            {children}
            {/* <ConnectWalletContainer
                active={
                    isConnectWalletActive &&
                    walletConnectionStatus === WalletConnectionStatus.Connecting
                }
                handleSuccess={handleConnectedWallet}
                handleFailure={handleConnectedWallet}
            /> */}
        </UserContext.Provider>
    );
}
