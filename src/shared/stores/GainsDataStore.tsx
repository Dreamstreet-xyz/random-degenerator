import create from 'zustand';
import { GainsTradingDataInterface } from 'types/gains/GainsTradingData';
import { GainsStreamingDataInterface } from 'types/gains/GainsStreamingData';
import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import { transformTradeWrapper } from 'shared/utils/gains';
import { GainsLiveEventDataInterface } from 'types/gains/GainsLiveEventData';

const getTradesForWallet = (
    wallet: string,
    trades: GainsCoreDataInterface.TradeWrapper[],
    tv: GainsTradingDataInterface.Data
) => {
    if (!trades || !tv) {
        return [];
    }

    return (
        trades.filter((o: GainsCoreDataInterface.TradeWrapper) => o?.trade?.trader === wallet) || []
    ).map(t => transformTradeWrapper(t, tv));
};

export interface GainsDataStoreInterface {
    tradingVariables: GainsTradingDataInterface.Data;
    setTradingVariables: (tv: GainsTradingDataInterface.Data) => void;

    wallet: string;
    setActiveWallet: (wallet: string) => void;

    latestMarketOrderForWallet: GainsLiveEventDataInterface.LiveEvent;
    setLatestMarketOrderForWallet: (
        latestMarketOrderForWallet: GainsLiveEventDataInterface.LiveEvent
    ) => void;

    latestMarketOrderCanceledForWallet: GainsStreamingDataInterface.OpenMarketOrderCanceled;
    setLatestMarketOrderCanceledForWallet: (
        latestMarketOrderCanceledForWallet: GainsStreamingDataInterface.OpenMarketOrderCanceled
    ) => void;

    openTrades: GainsCoreDataInterface.TradeWrapper[];
    setOpenTrades: (trades: GainsCoreDataInterface.TradeWrapper[]) => void;

    openTradesForWallet: GainsCoreDataInterface.TradeWrapper[];
    setOpenTradesForWallet: (trades: GainsCoreDataInterface.TradeWrapper[]) => void;

    cancelledTradesForWallet: any; // TODO
    setCancelledTradesForWallet: (trades: any) => void;

    closedTradesForWallet: any; // TODO
    setClosedTradesForWallet: (trades: any) => void;

    currentBlock: number;
    setCurrentBlock: (currentBlock: number) => void;
}

export const useGainsDataStoreScaffolding = set => ({
    tradingVariables: null,
    setTradingVariables: (tv: GainsTradingDataInterface.Data) =>
        set(state => {
            // if (state?.wallet && tv?.allTrades) {
            //     console.log('setting trades for wallet', state.wallet, tv.allTrades);
            //     // check for open trades and set if exist
            //     const openTrades = getTradesForWallet(state.wallet, tv.allTrades, tv);
            //     console.log('openTradesForWallet from setTradingVariables', openTrades);
            //     return {
            //         tradingVariables: tv,
            //         openTradesForWallet: openTrades,
            //     };
            // }
            return { tradingVariables: tv };
        }),

    wallet: null,
    setActiveWallet: (wallet: string) =>
        set(state => {
            // reset wallet specific values in event wallet is changed
            if (state.wallet !== wallet) {
                return {
                    wallet,
                    latestMarketOrderForWallet: null,
                    openTradesForWallet: getTradesForWallet(
                        wallet,
                        state.openTrades,
                        state.tradingVariables
                    ),
                    cancelledTradesForWallet: [],
                    closedTradesForWallet: [],
                };
            }
            return { wallet };
        }),

    latestMarketOrderForWallet: null,
    setLatestMarketOrderForWallet: (latestMarketOrderForWallet: any) =>
        set(state => ({ latestMarketOrderForWallet })),

    latestMarketOrderCanceledForWallet: null,
    setLatestMarketOrderCanceledForWallet: (latestMarketOrderCanceledForWallet: any) =>
        set(state => ({ latestMarketOrderCanceledForWallet })),

    openTrades: [],
    setOpenTrades: (trades: GainsCoreDataInterface.TradeWrapper[]) =>
        set(state => {
            if (state.wallet && state.tradingVariables) {
                return {
                    openTradesForWallet: getTradesForWallet(
                        state.wallet,
                        trades,
                        state.tradingVariables
                    ),
                    openTrades: trades,
                };
            }

            return { openTrades: trades };
        }),

    openTradesForWallet: [],
    setOpenTradesForWallet: (trades: GainsCoreDataInterface.TradeWrapper[]) =>
        set(state => {
            const transformedTrades = trades.map(t =>
                transformTradeWrapper(t, state.tradingVariables)
            );
            return { openTradesForWallet: transformedTrades };
        }),

    cancelledTradesForWallet: [],
    setCancelledTradesForWallet: (trades: any) =>
        set(state => ({ cancelledTradesForWallet: trades })),

    closedTradesForWallet: [],
    setClosedTradesForWallet: (trades: any) => set(state => ({ closedTradesForWallet: trades })),

    currentBlock: null,
    setCurrentBlock: (currentBlock: number) => set(state => ({ currentBlock })),
});

// used by GainsNetworkContextProvider to set useGainsDataStore based on network
export const useGainsMainnetDataStore = create<GainsDataStoreInterface>(set =>
    useGainsDataStoreScaffolding(set)
);

// used by GainsNetworkContextProvider to set useGainsDataStore based on network
export const useGainsTestnetDataStore = create<GainsDataStoreInterface>(set =>
    useGainsDataStoreScaffolding(set)
);
