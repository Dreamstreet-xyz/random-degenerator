import { useState } from 'react';
import { NetworkInterface } from 'shared/constants/networks';
import { Web3Provider } from '@usedapp/core/node_modules/@ethersproject/providers';
import { useContractFunction } from 'shared/hooks/useContractFunction';
import { TradingV6__factory } from 'types/ethers-contracts';
import { TransactionStatus } from '@usedapp/core';

type CloseTradeDetails = {
    pairIndex: string;
    index: string;
};

interface UseCloseTradeV6InputInterface {
    network: NetworkInterface;
    library: Web3Provider;
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
        TradingV6__factory.connect(network.tradingV6ContractAddress, library),
        'closeTradeMarket'
    );

    const closeTrade = async () => {
        console.log('Closing trade', _tradingDetails);
        send(_tradingDetails.pairIndex, _tradingDetails.index);
    };

    return {
        closeTrade,
        state,
        resetState,
    };
}
