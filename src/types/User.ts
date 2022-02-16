import { ChainId } from '@usedapp/core';
import { BigNumberish } from 'ethers';

export interface UserInterface {
    address: string | null;
    chainId: ChainId | null;
    daiBalance: BigNumberish | null;
    nativeBalance: BigNumberish | null;
    avatar: string | null;
    hasOpenTrades?: boolean;
}
