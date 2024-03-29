import { useState } from 'react';
import { NetworkInterface } from 'shared/constants/networks';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useContractFunction } from 'shared/hooks/useContractFunction';
import { TradingV62__factory } from 'types/ethers-contracts';
import { TransactionStatus } from '@usedapp/core';
import useGasStation from './useGasStation';

type CloseTradeDetails = {
    pairIndex: string;
    index: string;
};

interface UseCloseTradeV6InputInterface {
    network: NetworkInterface;
    library: JsonRpcProvider;
    tradingDetails: CloseTradeDetails;
}

interface UseCloseTradeV6Interface {
    closeTrade: () => Promise<void>;
    state: TransactionStatus;
    resetState: () => void;
}

export default function useCloseTradeV6({
    network,
    library,
    tradingDetails,
}: UseCloseTradeV6InputInterface): UseCloseTradeV6Interface {
    const [_tradingDetails] = useState(tradingDetails);
    const { send, state, resetState } = useContractFunction(
        TradingV62__factory.connect(network.tradingV6_2ContractAddress, library),
        'closeTradeMarket'
    );
    const gasStation = useGasStation();

    const closeTrade = async (overrides?: CloseTradeDetails) => {
        console.log('Closing trade', _tradingDetails, overrides);
        const td = { ..._tradingDetails, ...overrides };
        send(td.pairIndex, td.index, { ...(await gasStation.getCloseTradeGas()) });
    };

    return {
        closeTrade,
        state,
        resetState,
    };
}
