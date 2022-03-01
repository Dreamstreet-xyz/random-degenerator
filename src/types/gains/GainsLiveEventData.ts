import { BigNumberish } from 'ethers';

export const enum LiveEventTypeName {
    MarketExecuted = 'MarketExecuted',
    MarketOpenCanceled = 'MarketOpenCanceled',
    LimitExecuted = 'LimitExecuted',
}

export declare module GainsLiveEventDataInterface {
    export interface MarketExecuted {
        orderId: string;
        t: any[];
        open: boolean;
        price: BigNumberish;
        positionSizeDai: BigNumberish;
        percentProfit: string;
    }

    export interface MarketOpenCanceled {
        orderId: string;
        trader: string;
        pairIndex: string;
    }

    export interface LimitExecuted {
        orderId: string;
        limitIndex: string;
        t: any[];
        nftHolder: string;
        orderType: string;
        price: string;
        positionSizeDai: string;
        percentProfit: string;
    }

    export interface Raw {
        data: string;
        topics: string[];
    }

    export interface LiveEvent {
        address: string;
        blockNumber: number;
        transactionHash: string;
        transactionIndex: number;
        blockHash: string;
        logIndex: number;
        removed: boolean;
        id: string;
        returnValues: MarketExecuted | MarketOpenCanceled | LimitExecuted | any;
        event: string;
        signature: string;
        raw: Raw;
        triedTimes: number;
    }

    export interface Data {
        name: string;
        value: MarketExecuted | MarketOpenCanceled | any;
    }
}
