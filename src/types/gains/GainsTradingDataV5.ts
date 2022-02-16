import { BigNumber } from 'ethers';

// TODO: any harm in not converting some of these strings to BigNumberish?
export declare namespace GainsTradingDataInterfaceV5 {
    export interface Reserves {
        0: string;
        1: string;
    }

    export interface Pair {
        from: string;
        to: string;
        spreadP: string;
        feed: string[];
        minLeverage: string;
        maxLeverage: string;
        minOpenLimitSlippageP: string;
        openFeeP: string;
        closeFeeP: string;
        oracleFeeP: string;
        nftLimitOrderFeeP: string;
        referralP: string;
    }

    export interface OpenInterest {
        long: string;
        short: string;
        max: string;
    }

    export interface Trade {
        trader: string;
        pairIndex: string;
        index: string;
        positionSize: string;
        spreadReductionP: string;
        buy: boolean;
        leverage: string;
        tp: string;
        sl: string;
        minPrice: string;
        maxPrice: string;
        block: string;
        tokenId: string;
    }

    export interface Data {
        paused: boolean;
        minPosUsd: BigNumber;
        maxPosDaiP: BigNumber;
        maxGainP: string;
        maxTradesPerPair: string;
        maxPendingMarketOrders: string;
        limitOrdersTimelock: string;
        nftSuccessTimelock: string;
        orderTimeout: string;
        gfarmUsd: string;
        reserves: Reserves;
        pairs: Pair[];
        cryptos: string[];
        forex: string[];
        openInterests: OpenInterest[];
        spreadReductionsP: string[];
        tvl: string;
        tvlWithBoosts: string;
        currentBalanceDai: BigNumber;
        maxBalanceDai: string;
        vaultFeeP: string;
        allTrades: Trade[];

        // computed
        minPosDaiInt: number;
        maxPosDaiInt: number;
    }
}
