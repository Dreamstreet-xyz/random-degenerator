import {
    TransactionStatus,
    useContractFunction as useDappUseContractFunction,
} from '@usedapp/core';
import { Contract } from 'ethers';
import { LogDescription } from 'ethers/lib/utils';

interface UseContractFunctionReturnType<
    ContractType extends Contract,
    Key extends keyof ContractType['functions'],
    Args extends Parameters<ContractType['functions'][Key]>
> {
    send: (...args: Args) => Promise<void>;
    state: TransactionStatus;
    events: LogDescription[] | undefined;
    resetState: () => void;
}

function useContractFunction<
    ContractType extends Contract,
    Key extends keyof ContractType['functions'],
    Args extends Parameters<ContractType['functions'][Key]>
>(
    contract: ContractType,
    functionName: Key
): UseContractFunctionReturnType<ContractType, Key, Args> {
    const { send, state, events, resetState } = useDappUseContractFunction(
        contract,
        functionName as string
    );
    return { send: (...args: Args) => send(...args), state, events, resetState };
}

export { useContractFunction };
