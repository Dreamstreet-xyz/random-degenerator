import React, { useState, useEffect, useContext, createContext } from 'react';
import fetchTradingVariables from 'api/gains/rest/fetchTradingVariables';
import { transformTradingVariables } from 'shared/utils/gains';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';
import {
    useGainsMainnetDataStore,
    useGainsTestnetDataStore,
    GainsDataStoreInterface,
} from 'shared/stores/GainsDataStore';
import { useActiveGainsDataStore } from 'shared/stores/ActiveGainsDataStore';
import { Networks, NetworkInterface } from 'shared/constants/networks';
import { handleStream, getGainsDataStoreFromNetwork } from 'api/gains/stream';

const WSS = 'wss://';
const isBrowser = typeof window !== 'undefined';
let mainnetSocket = isBrowser ? new WebSocket(WSS + Networks.Polygon.backendEndpoint) : null;
let testnetSocket = isBrowser ? new WebSocket(WSS + Networks.Mumbai.backendEndpoint) : null;

interface GainsNetworkContextInterface {
    streamError: string | null;
    streamIsHealthy: boolean;
}

const GainsNetworkContext = createContext<GainsNetworkContextInterface>({
    streamError: null,
    streamIsHealthy: false,
});

export const useGainsNetwork = () => useContext(GainsNetworkContext);

export default function GainsNetworkContextProvider({ children }) {
    const [streamError, setStreamError] = useState<string | null>(null);
    const [streamIsHealthy, setStreamIsHealthy] = useState<boolean>(false);
    const { network } = useNetworkDetails();
    const mainnetTradingVariables = useGainsMainnetDataStore(
        (state: GainsDataStoreInterface) => state.tradingVariables
    );
    const testnetTradingVariables = useGainsTestnetDataStore(
        (state: GainsDataStoreInterface) => state.tradingVariables
    );

    const setIsHealthy = (isHealthy: boolean, _network: NetworkInterface) => {
        setStreamIsHealthy(isHealthy); // TODO: please do more with this lol

        // wait 3 secs and try to reconnect
        if (!isHealthy) {
            setTimeout(() => {
                if (_network.chainId === Networks.Polygon.chainId) {
                    mainnetSocket = new WebSocket(WSS + Networks.Polygon.backendEndpoint);
                    handleStream(mainnetSocket, network, setIsHealthy);
                } else if (_network.chainId === Networks.Mumbai.chainId) {
                    testnetSocket = new WebSocket(WSS + Networks.Mumbai.backendEndpoint);
                    handleStream(testnetSocket, network, setIsHealthy);
                }
            }, 3000);
        }
    };

    const updateDataStore = () => {
        useActiveGainsDataStore.getState().setStore(getGainsDataStoreFromNetwork(network));
    };

    useEffect(() => {
        handleStream(mainnetSocket, Networks.Polygon, setIsHealthy);
        handleStream(testnetSocket, Networks.Mumbai, setIsHealthy);

        const intervalId = setInterval(() => {
            // check for dead sockets
            if (mainnetSocket === undefined || mainnetSocket.readyState === 3) {
                handleStream(mainnetSocket, Networks.Polygon, setIsHealthy);
            }
            if (testnetSocket === undefined || testnetSocket.readyState === 3) {
                handleStream(testnetSocket, Networks.Mumbai, setIsHealthy);
            }
        }, 3000);

        return () => {
            mainnetSocket.close();
            testnetSocket.close();
            clearInterval(intervalId);
        };
    }, []);

    // useEffect(() => {
    //     // whenever a new trading variable is set, we're updating used store
    //     updateDataStore();
    // }, [testnetTradingVariables, mainnetTradingVariables]);

    useEffect(() => {
        // if network is swapped, update used store
        updateDataStore();

        // read trading variables
        const getTradingVariables = async () => {
            const _tv = await fetchTradingVariables(network);
            const _ttv = transformTradingVariables(_tv);
            const dataStore =
                network.chainId === Networks.Polygon.chainId
                    ? useGainsMainnetDataStore
                    : useGainsTestnetDataStore;
            dataStore.getState().setTradingVariables(_ttv);
            if (_ttv.allTrades) {
                dataStore.getState().setOpenTrades(_ttv.allTrades);
            }
        };
        getTradingVariables();
    }, [network]);

    return (
        <GainsNetworkContext.Provider
            value={{
                streamError,
                streamIsHealthy,
            }}
        >
            {children}
        </GainsNetworkContext.Provider>
    );
}
