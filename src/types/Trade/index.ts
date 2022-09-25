import { BigNumberish } from 'ethers';
import { StorageInterfaceV5 } from './ethers-contracts/TradingV6';
import { AssetType } from 'types/gains/GainsCoreData';

export interface FinalizedTradeDetailsType extends StorageInterfaceV5.TradeStruct {
    pairString: string;
    txHash: string;
    feesDai: number;
    tpP: number;
    slP: number;
    orderId: number;
    chainId: number;
}

export type DegenTradeRecord = {
    id?: number;
    orderId: number;
    txHash: string;
    trader: string;
    pairIndex: number;
    index: number;
    positionSizeDai: number;
    leverage: number;
    feesDai: number;
    openPrice: number;
    buy: boolean;
    tp: number;
    tpP: number;
    sl: number;
    slP: number;
    pairString: string;
    chainId: number;
    createdAt?: Date;
    referrer: string;
    slippageP: number;
};

export enum TradeStatus {
    None = 'None',
    PendingSignature = 'PendingSignature',
    Mining = 'Mining',
    DelayedMining = 'DelayedMining',
    PendingExecution = 'PendingExecution',
    DelayedExecution = 'DelayedExecution',
    Unconfirmed = 'Unconfirmed',
    Executed = 'Executed',
    Canceled = 'Canceled',
    TimedOut = 'TimedOut',
    Failed = 'Failed',
    Success = 'Success',
}

export type PnlType = {
    pnl: number;
    percentProfit: number;
    feeDai: number;
    pnlInclFee: number;
    percentProfitInclFee: number;
    rolloverFeeDai?: number;
    fundingFeeDai?: number;
    closingFeeDai?: number;
};

export enum DegenLevel {
    low,
    normal,
    high,
}

export enum TradeDirection {
    long,
    short,
    both,
}

export type DetailsOption = {
    value: DegenLevel | TradeDirection;
    title: string;
    emphasize?: boolean;
};

export type PlayFormSettingsDetailsType = {
    degenOptions: DetailsOption[];
    directionOptions: DetailsOption[];
};

export type PlayFormSettingsType = {
    slippageP: string;
    degenLevel: DegenLevel;
    direction: TradeDirection;
    assetTypes: AssetType[];
    collateralRange: number[];
    details: PlayFormSettingsDetailsType;
};
