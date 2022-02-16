import { ChainId, useEthers } from '@usedapp/core';
import { useContext, createContext, useState, useEffect, useCallback } from 'react';
import networkList, { Networks, NetworkInterface } from 'shared/constants/networks';
import { getWalletChainFromChainId, getHexChainId } from 'shared/constants/networks';

interface NetworkDetailsContextInterface {
    network: NetworkInterface;
    setNetwork: (network: NetworkInterface) => void;
    updateNetworkToCurWalletNetwork: () => void;
}

const CHAIN_ID_KEY = 'ds:chainId';
const POLYGON = 'polygon';

const NetworkDetailsContext = createContext<NetworkDetailsContextInterface>({
    network: Networks.Polygon,
    setNetwork: (network: NetworkInterface) => {},
    updateNetworkToCurWalletNetwork: () => {},
});

export const useNetworkDetails = () => useContext(NetworkDetailsContext);

// injected wallet is source of truth for network info
// always flow into dapp from wallet
export default function NetworkDetailsContextProvider({ children }) {
    const { active, library, chainId } = useEthers();
    const [currentNetwork, _setNetwork] = useState<NetworkInterface>(
        chainId ? getNetworkFromChainId(chainId) : Networks.Polygon
    );

    const setNetwork = (network: NetworkInterface) => {
        // localStorage.setItem(CHAIN_ID_KEY, network.chainId.toString());
        // _setNetwork(network);
        console.log('Updating network');
        updateWalletNetwork(network);
    };

    const getChainIdFromStorage = () => localStorage.getItem(CHAIN_ID_KEY);

    const getDefaultChainId = () =>
        parseInt(getChainIdFromStorage() || '') || getNetworkFromEnv().chainId;

    const getNetworkFromEnv = () =>
        process.env.NEXT_PUBLIC_DEFAULT_NETWORK === POLYGON ? Networks.Polygon : Networks.Mumbai;

    useEffect(() => {
        _setNetwork(getNetworkFromChainId(chainId));
    }, [chainId]);

    const updateNetworkToCurWalletNetwork = useCallback(() => {
        setNetwork(getNetworkFromChainId(chainId));
    }, [chainId]);

    const updateWalletNetwork = async (network: NetworkInterface) => {
        if (active && chainId !== network.chainId) {
            console.log('Requesting wallet to switch to network: ' + network.chainName);
            try {
                await library.provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: getHexChainId(network.chainId) }],
                });
            } catch (switchError) {
                // add network
                if (switchError.code === 4902) {
                    try {
                        await library.provider.request({
                            method: 'wallet_addEthereumChain',
                            params: [getWalletChainFromChainId(network.chainId)],
                        });
                    } catch (addError) {
                        console.log('addError', addError);
                    }
                } else {
                    console.log('switchError', switchError);
                }
            }
        }
    };

    return (
        <NetworkDetailsContext.Provider
            value={{
                network: currentNetwork,
                setNetwork,
                updateNetworkToCurWalletNetwork,
            }}
        >
            {children}
        </NetworkDetailsContext.Provider>
    );
}

const getNetworkFromChainId = (chainId: ChainId) => {
    return networkList.find(network => network.chainId === chainId) || Networks.Mumbai;
};
