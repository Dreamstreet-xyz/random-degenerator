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
import fetchTradingVariables from 'api/gains/rest/fetchTradingVariables';
import { getTradeKey } from 'shared/utils/gains/trade';
import { toast } from 'react-toastify';
import ToastChannel from 'shared/utils/ToastChannel';

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

export const handleStream = async (
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
                if (wallet) {
                    switch (data?.value?.event) {
                        case LiveEventTypeName.MarketExecuted:
                            const me: GainsLiveEventDataInterface.LiveEvent = data.value;
                            const t = me?.returnValues?.t || [];
                            if (wallet === t[0]) {
                                console.log('MarketExecuted', me);
                                if (me?.returnValues?.open) {
                                    dataStore.getState().setLatestMarketOrderForWallet(me);
                                }
                                // fetch trading variables again to get updated open trades with proper data
                                const newTvs = await fetchTradingVariables(network);
                                dataStore.getState().setOpenTrades(newTvs.allTrades);
                            }
                            break;
                        case LiveEventTypeName.MarketOpenCanceled:
                            const moc: GainsLiveEventDataInterface.MarketOpenCanceled =
                                data.value.returnValues;
                            if (wallet === moc.trader) {
                                console.log('MarketOpenCanceled', moc);
                                dataStore.getState().setLatestMarketOrderCanceledForWallet({
                                    address: moc.trader,
                                    id: moc.orderId,
                                    pairIndex: moc.pairIndex,
                                    open: true,
                                });
                            }
                            break;
                        case LiveEventTypeName.LimitExecuted:
                            const le: GainsLiveEventDataInterface.LimitExecuted =
                                data.value?.returnValues;
                            if (wallet === le.t[0]) {
                                console.log('LimitExecuted', le);
                                const userTrades = dataStore.getState().openTradesForWallet;
                                const key = `${le.t[1]}-${le.t[2]}`;
                                if (userTrades.some(t => getTradeKey(t) === key)) {
                                    const limitType = Number(le?.percentProfit) >= 0 ? 'TP' : 'SL';
                                    dataStore
                                        .getState()
                                        .setOpenTradesForWallet(
                                            userTrades.filter(t => getTradeKey(t) !== key)
                                        );
                                    ToastChannel.updateToastInChannel(key, {
                                        options: {
                                            render: `${limitType} hit: trade closed`,
                                            autoClose: 3000,
                                        },
                                    });
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
                break;
            case StreamTypeName.unconfirmedEvent:
                // unconfirmed events are just being toasted atm
                if (wallet) {
                    switch (data?.value?.event) {
                        case LiveEventTypeName.MarketExecuted:
                            const me: GainsLiveEventDataInterface.LiveEvent = data.value;
                            const t = me?.returnValues?.t || [];
                            if (wallet === t[0]) {
                                console.log('Unconfirmed MarketExecuted', me);
                                if (me?.returnValues?.open) {
                                    dataStore
                                        .getState()
                                        .setLatestUnconfirmedMarketOrderForWallet(me);
                                }
                            }
                            break;
                        case LiveEventTypeName.MarketOpenCanceled:
                            const moc: GainsLiveEventDataInterface.MarketOpenCanceled =
                                data.value.returnValues;
                            if (wallet === moc.trader) {
                                toast.info('Order canceled: waiting on block confirmation', {
                                    autoClose: 5000,
                                });
                            }
                            break;
                        case LiveEventTypeName.LimitExecuted:
                            const le: GainsLiveEventDataInterface.LimitExecuted =
                                data.value?.returnValues;
                            if (wallet === le.t[0]) {
                                console.log('LimitExecuted', le);
                                const userTrades = dataStore.getState().openTradesForWallet;
                                const key = `${le.t[1]}-${le.t[2]}`;
                                if (userTrades.some(t => getTradeKey(t) === key)) {
                                    const limitType = Number(le?.percentProfit) >= 0 ? 'TP' : 'SL';
                                    ToastChannel.updateToastInChannel(key, {
                                        options: {
                                            render: `${limitType} hit: waiting on block confirmation`,
                                            type: 'info',
                                            autoClose: false,
                                        },
                                    });
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
                break;
            case StreamTypeName.openTrades:
                const oo: GainsStreamingDataInterface.OpenTrades = data;
                console.log('OpenTrades', oo);
                dataStore.getState().setOpenTrades(oo.value);
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

    socket.onclose = () => {
        console.log('Socket closed');
        setIsHealthy(false, network);
    };
};
