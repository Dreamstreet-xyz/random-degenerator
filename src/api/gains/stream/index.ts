import { transformTradingVariables } from 'shared/utils/gains';
import { useGainsMainnetDataStore, useGainsTestnetDataStore } from 'shared/stores/GainsDataStore';
import { useGainsPriceStore } from 'shared/stores/GainsPriceStore';
import { NetworkInterface } from 'shared/constants/networks';
import { Mumbai, Polygon } from '@usedapp/core';
import { GainsStreamingDataInterface, StreamTypeName } from 'types/gains/GainsStreamingData';
import { GainsTradingDataInterface } from 'types/gains/GainsTradingData';
import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import { transformTradeWrapper } from 'shared/utils/gains';
import { GainsLiveEventDataInterface, LiveEventTypeName } from 'types/gains/GainsLiveEventData';

const WSS = 'wss://';

export const getGainsDataStoreFromNetwork = (network: NetworkInterface) => {
    switch (network.chainId) {
        case Polygon.chainId:
            return useGainsMainnetDataStore;
        case Mumbai.chainId:
            return useGainsTestnetDataStore;
        default:
            break;
    }
};

export const handleStream = (
    socket: WebSocket,
    network: NetworkInterface,
    setIsHealthy: (isHealthy: boolean, _network: NetworkInterface) => void
) => {
    console.log(`Starting ${network.chainName} stream handler`);
    const dataStore = getGainsDataStoreFromNetwork(network);

    // setup onmessage - price data comes from mainnet always so update that + mainnet tv and others
    socket.onmessage = async msg => {
        const data = JSON.parse(msg.data);

        const wallet = dataStore.getState().wallet;

        switch (data.name) {
            case StreamTypeName.charts:
                if (network.chainId === Polygon.chainId) {
                    useGainsPriceStore.getState().setPriceData(data);
                } else {
                    console.log('\n\n\nWOAH WE ARE GETTING CHARTS FROM TESTNET\n\n\n');
                }
                break;
            case StreamTypeName.tradingVariables:
                const tv: GainsTradingDataInterface.Data = data?.value || data;
                dataStore.getState().setTradingVariables(transformTradingVariables(tv));
                if (tv?.allTrades) {
                    const tradesForWallet =
                        (
                            tv.allTrades?.filter(
                                (o: GainsCoreDataInterface.TradeWrapper) =>
                                    o?.trade?.trader === wallet
                            ) || []
                        ).map(t => transformTradeWrapper(t, tv)) || [];

                    dataStore.getState().setOpenTradesForWallet(tradesForWallet);
                }
                break;
            case StreamTypeName.liveEvent:
                const le: GainsLiveEventDataInterface.Data = data;
                if (wallet && data?.value?.event === LiveEventTypeName.MarketExecuted) {
                    console.log('MarketExecuted');
                    const me: GainsLiveEventDataInterface.LiveEvent = data.value;
                    const t = me?.returnValues?.t || [];
                    if (wallet === t[0]) {
                        dataStore.getState().setLatestMarketOrderForWallet(me);
                    }
                }
                break;
            case StreamTypeName.openTrades:
                const oo: GainsStreamingDataInterface.OpenTrades = data;
                dataStore.getState().setOpenTrades(oo.value);
                // if (wallet) {
                //     const tradesForWallet = (
                //         oo?.value?.filter(
                //             (o: GainsCoreDataInterface.TradeWrapper) => o?.trade?.trader === wallet
                //         ) || []
                //     ).map(t => transformTradeWrapper(t, dataStore.getState().tradingVariables));

                //     dataStore.getState().setOpenTradesForWallet(tradesForWallet);
                // }
                break;
            case StreamTypeName.openMarketOrderCanceled:
                const omo: GainsStreamingDataInterface.OpenMarketOrderCanceled = data;
                if (wallet && omo.address === wallet) {
                    console.log('openMarketOrderCanceled');
                    dataStore.getState().setLatestMarketOrderCanceledForWallet(omo);
                }
                break;
            case StreamTypeName.currentBlock:
                dataStore.getState().setCurrentBlock(data.value);
                break;
            case StreamTypeName.marketOrderExecuted:
            default:
                break;
        }

        setIsHealthy(true, network);
    };

    socket.onerror = error => {
        console.log(error);
        socket.close();
        setIsHealthy(false, network);
    };
};
