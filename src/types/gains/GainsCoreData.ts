export declare module GainsCoreDataInterface {
    export interface Trade {
        trader: string;
        pairIndex: string;
        index: string;
        initialPosToken: string;
        positionSizeDai: string;
        openPrice: string;
        buy: boolean;
        leverage: string;
        tp: string;
        sl: string;

        // computed
        pairString: string;
    }

    export interface TradeInfo {
        tokenId: string;
        tokenPriceDai: string;
        openInterestDai: string;
        tpLastUpdated: string;
        slLastUpdated: string;
        beingMarketClosed: boolean;
    }

    export interface TradeWrapper {
        trade: Trade;
        tradeInfo: TradeInfo;
    }

    export interface HistoricalTrade {
        id: number;
        date: Date;
        pair: string;
        block: number;
        address: string;
        action: string;
        price: number;
        buy: number;
        size: number;
        leverage: number;
        pnl: number;
        pnl_net: number;
        tx: string;
    }
}

export enum AssetType {
    CRYPTO = 'crypto',
    FOREX = 'forex',
}
