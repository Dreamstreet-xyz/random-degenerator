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
}

export enum AssetType {
    CRYPTO = 'crypto',
    FOREX = 'forex',
}
