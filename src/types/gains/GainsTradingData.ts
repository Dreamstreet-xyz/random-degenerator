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

    export interface PairParams {
        onePercentDepthAbove: number;
        onePercentDepthBelow: number;
        rolloverFeePerBlockP: number;
        fundingFeePerBlockP: number;
    }

    export interface PairRolloverFees {
        accPerCollateral: number;
        lastUpdateBlock: number;
    }

    export interface PairFundingFees {
        accPerOiLong: number;
        accPerOiShort: number;
        lastUpdateBlock: number;
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
        stocks: string[];
        openInterests: OpenInterest[];
        openCollaterals: OpenCollateral[];
        spreadReductionsP: string[];
        tvl: string;
        tvlWithBoosts: string;
        currentBalanceDai: string;
        maxBalanceDai: string;
        vaultFeeP: string;
        allTrades: GainsCoreDataInterface.TradeWrapper[];
        gnsUsd?: number;
        stockPairToActiveStockSplit?: Map<string, string>;
        orderTimeout?: number;
        maxCollateral: number;
        daiReserve?: number;
        forexClosed?: boolean;
        stocksClosed?: boolean;
        blockConfirmations?: number;
        vaultSwapFeeP?: number;
        maxNegativePnlOnOpenP?: number;
        pairInfos: PairInfos;

        // computed
        minPosDaiInt: number;
        maxPosDaiInt: number;
        pairParams?: PairParams[];
        pairRolloverFees?: PairRolloverFees[];
        pairFundingFees?: PairFundingFees[];
    }

    export interface PairInfos {
        params: PairParamsRaw[];
        rolloverFees: PairRolloverFeesRaw[];
        fundingFees: PairFundingFeesRaw[];
    }

    export interface PairParamsRaw {
        onePercentDepthAbove: string;
        onePercentDepthBelow: string;
        rolloverFeePerBlockP: string;
        fundingFeePerBlockP: string;
    }

    export interface PairRolloverFeesRaw {
        accPerCollateral: string;
        lastUpdateBlock: string;
    }

    export interface PairFundingFeesRaw {
        accPerOiLong: string;
        accPerOiShort: string;
        lastUpdateBlock: string;
    }
}
