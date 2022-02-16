import { GainsCoreDataInterface } from './GainsCoreData';

export declare module GainsTradingDataInterface {
    export interface Reserves {
        0: string;
        1: string;
    }

    export interface Pair {
        from: string;
        to: string;
        spreadP: string;
        minLeverage: string;
        maxLeverage: string;
        maxCollateralP: string;
        openFeeP: string;
        closeFeeP: string;
        oracleFeeP: string;
        nftLimitOrderFeeP: string;
        referralFeeP: string;
        minLevPosDai: string;
        groupIndex: string;
        feeIndex: string;

        // computed
        minPosDaiInt: number;
    }

    export interface Group {
        minLeverage: string;
        maxLeverage: string;
        maxCollateralP: string;
    }

    export interface Fee {
        openFeeP: string;
        closeFeeP: string;
        oracleFeeP: string;
        nftLimitOrderFeeP: string;
        referralFeeP: string;
        minLevPosDai: string;
    }

    export interface OpenInterest {
        long: string;
        short: string;
        max: string;
    }

    export interface OpenCollateral {
        long: string;
        short: string;
    }

    export interface Data {
        paused: boolean;
        maxPosDai: string;
        maxGainP: number;
        maxTradesPerPair: string;
        maxPendingMarketOrders: string;
        limitOrdersTimelock: string;
        nftSuccessTimelock: string;
        marketOrdersTimeout: string;
        gfarmUsd: string;
        reserves: Reserves;
        groups: Group[];
        pairs: Pair[];
        fees: Fee[];
        cryptos: string[];
        forex: string[];
        openInterests: OpenInterest[];
        openCollaterals: OpenCollateral[];
        spreadReductionsP: string[];
        tvl: string;
        tvlWithBoosts: string;
        currentBalanceDai: string;
        maxBalanceDai: string;
        vaultFeeP: string;
        allTrades: GainsCoreDataInterface.TradeWrapper[];

        // computed
        minPosDaiInt: number;
        maxPosDaiInt: number;
    }
}
