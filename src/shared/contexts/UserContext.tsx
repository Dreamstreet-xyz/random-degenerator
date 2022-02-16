import { useState, useEffect, useMemo, useContext, createContext } from 'react';
import { useEtherBalance, useEthers, useTokenBalance } from '@usedapp/core';
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
    const { account, deactivate, chainId, error, active, library } = useEthers(); // TOOD: use activate for walletconnect
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
            } else {
                status = WalletConnectionStatus.OtherError;
            }
            console.log(error);
        } else if (loading) {
            status = WalletConnectionStatus.Connecting;
        }

        console.log('Status ' + status);
        console.log('Account ' + account);
        setWalletConnectionStatus(status);
    };

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

    // useEffect(() => {
    //     console.log(tradingVariables);
    //     if (tradingVariables?.allTrades) {
    //         const userTrades = tradingVariables.allTrades.filter(
    //             (t: GainsCoreDataInterface.TradeWrapper) => t?.trade?.trader === account
    //         );
    //         useGainsDataStore.getState().setOpenTradesForWallet(userTrades);
    //         setHasOpenTrades(userTrades.length > 0);
    //     }
    // }, [tradingVariables]);

    // useEffect(() => {
    //     console.log('hasOpenTrades', hasOpenTrades);
    // }, [hasOpenTrades]);

    const connectWallet = () => {
        setIsConnectWalletActive(true);
        setWalletConnectionStatus(WalletConnectionStatus.Connecting);
    };

    const disconnectWallet = () => {
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
            <ConnectWalletContainer
                active={
                    isConnectWalletActive &&
                    walletConnectionStatus === WalletConnectionStatus.Connecting
                }
                handleSuccess={handleConnectedWallet}
                handleFailure={handleConnectedWallet}
            />
        </UserContext.Provider>
    );
}
