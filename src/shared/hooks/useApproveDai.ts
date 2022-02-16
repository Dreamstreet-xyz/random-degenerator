import { useEthers, useTokenAllowance, TransactionStatus } from '@usedapp/core';
import { BigNumberish, constants } from 'ethers';
import { useEffect } from 'react';
import { useContractFunction } from 'shared/hooks/useContractFunction';
import { ERC20__factory } from 'types/ethers-contracts/factories/ERC20__factory';

interface UseApproveDaiInterface {
    approveDai: () => Promise<void>;
    allowance: BigNumberish | undefined;
    state: TransactionStatus;
    resetState: () => void;
}

const DAI_AMOUNT = constants.MaxUint256;

export default function useApproveDai(
    daiAddress: string,
    ownerAddress: string,
    spenderAddress: string
): UseApproveDaiInterface {
    const { library } = useEthers();
    const allowance = useTokenAllowance(daiAddress, ownerAddress, spenderAddress);
    const { send, state, resetState } = useContractFunction(
        ERC20__factory.connect(daiAddress, library),
        'approve'
    );

    const approveDai = async () => {
        console.log('Sending', spenderAddress, DAI_AMOUNT);
        send(spenderAddress, DAI_AMOUNT);
    };

    return { approveDai, state, allowance, resetState };
}
