import { GainsCoreDataInterface } from './GainsCoreData';

export const enum StreamTypeName {
    marketOrderExecuted = 'marketOrderExecuted',
    charts = 'charts',
    tradingVariables = 'tradingVariables',
    openTrades = 'openTrades',
    liveEvent = 'liveEvent',
    openMarketOrderCanceled = 'openMarketOrderCanceled',
    currentBlock = 'currentBlock',
    unconfirmedEvent = 'unconfirmedEvent',
}

export declare module GainsStreamingDataInterface {
    export interface Trader {
        leverageUnlocked: string;
        referral: string;
        referralRewardsTotal: string;
    }

    export interface MarketOrderExecuted {
        name: string;
        address: string;
        id: string;
        pairIndex: string;
        open: boolean;
        trader: Trader;
    }

    export interface OpenTrades {
        name: string;
        value: GainsCoreDataInterface.TradeWrapper[];
    }

    export interface OpenMarketOrderCanceled {
        name?: string;
        address: string;
        id: string;
        pairIndex: string;
        open: boolean;
    }
}
