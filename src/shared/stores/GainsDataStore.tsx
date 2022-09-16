import create from 'zustand';
import { GainsTradingDataInterface } from 'types/gains/GainsTradingData';
import { GainsStreamingDataInterface } from 'types/gains/GainsStreamingData';
import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import { transformTradeWrapper } from 'shared/utils/gains';
import { GainsLiveEventDataInterface } from 'types/gains/GainsLiveEventData';
import { GainsUserTradingData } from 'types/gains/GainsUserTradingData';
import { getTradeKey } from 'shared/utils/gains/trade';

const getTradesForWallet = (
    wallet: string,
    trades: GainsCoreDataInterface.TradeWrapper[],
    tv: GainsTradingDataInterface.Data
) => {
    if (!trades || !tv || !wallet || trades?.length === 0) {
        return [];
    }
    return (
        (
            trades?.filter(
                (o: GainsCoreDataInterface.TradeWrapper) => o?.trade?.trader === wallet
            ) || []
        )?.map(t => transformTradeWrapper(t, tv)) || []
    );
};

export enum TimeoutType {
    open,
    close,
}

export type TimedOutTrade = {
    orderId: string;
    type: TimeoutType;
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

    latestUnconfirmedMarketOrderForWallet: GainsLiveEventDataInterface.LiveEvent;
    setLatestUnconfirmedMarketOrderForWallet: (
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
    updateOpenTradeForWallet: (trade: GainsCoreDataInterface.TradeWrapper) => void;
    removeOpenTradeForWallet: (tradeKey: string) => void;

    cancelledTradesForWallet: any; // TODO
    setCancelledTradesForWallet: (trades: any) => void;

    closedTradesForWallet: any; // TODO
    setClosedTradesForWallet: (trades: any) => void;

    currentBlock: number;
    setCurrentBlock: (currentBlock: number) => void;

    timedOutTradeIdsForWallet: TimedOutTrade[];
    setTimedOutTradeIdsForWallet: (timedOutTrades: TimedOutTrade[]) => void;
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

    latestUnconfirmedMarketOrderForWallet: null,
    setLatestUnconfirmedMarketOrderForWallet: (latestUnconfirmedMarketOrderForWallet: any) =>
        set(state => ({ latestUnconfirmedMarketOrderForWallet })),

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
    updateOpenTradeForWallet: (trade: GainsCoreDataInterface.TradeWrapper) =>
        set(state => {
            const transformedTrade = transformTradeWrapper(trade, state.tradingVariables);
            const openTradesForWallet = state.openTradesForWallet.map(t => {
                if (getTradeKey(t) === getTradeKey(transformedTrade)) {
                    return transformedTrade;
                }
                return t;
            });
            return { openTradesForWallet };
        }),
    removeOpenTradeForWallet: (tradeKey: string) =>
        set(state => {
            const openTradesForWallet = state.openTradesForWallet.filter(
                t => getTradeKey(t) !== tradeKey
            );
            return { openTradesForWallet };
        }),

    cancelledTradesForWallet: [],
    setCancelledTradesForWallet: (trades: any) =>
        set(state => ({ cancelledTradesForWallet: trades })),

    closedTradesForWallet: [],
    setClosedTradesForWallet: (trades: any) => set(state => ({ closedTradesForWallet: trades })),

    currentBlock: null,
    setCurrentBlock: (currentBlock: number) => set(state => ({ currentBlock })),

    timedOutTradeIdsForWallet: [],
    setTimedOutTradeIdsForWallet: (timedOutTrades: TimedOutTrade[]) =>
        set(state => {
            const existingTimedOutTrades = state.timedOutTradeIdsForWallet || [];
            // if all trades are the same, don't touch
            if (
                existingTimedOutTrades.every(({ orderId, type }) =>
                    timedOutTrades.some(t => t.orderId === orderId && t.type === type)
                ) &&
                timedOutTrades.every(({ orderId, type }) =>
                    existingTimedOutTrades.includes(t => t.orderId === orderId && t.type === type)
                )
            ) {
                return {};
            }
            return { timedOutTradeIdsForWallet: timedOutTrades };
        }),
});

// used by GainsNetworkContextProvider to set useGainsDataStore based on network
export const useGainsMainnetDataStore = create<GainsDataStoreInterface>(set =>
    useGainsDataStoreScaffolding(set)
);

// used by GainsNetworkContextProvider to set useGainsDataStore based on network
export const useGainsTestnetDataStore = create<GainsDataStoreInterface>(set =>
    useGainsDataStoreScaffolding(set)
);
