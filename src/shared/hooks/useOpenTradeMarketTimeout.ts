import { Web3Provider } from '@usedapp/core/node_modules/@ethersproject/providers';
import { TransactionStatus } from '@usedapp/core';
import { NetworkInterface } from 'shared/constants/networks';
import useGasStation from 'shared/hooks//useGasStation';
import { useContractFunction } from 'shared/hooks/useContractFunction';
import { TradingV6__factory } from 'types/ethers-contracts';

interface UseOpenTradeMarketTimeoutInputInterface {
    network: NetworkInterface;
    library: Web3Provider;
}

interface UseOpenTradeMarketTimeoutInterface {
    submitMarketTimeout: (orderId: string) => Promise<void>;
    state: TransactionStatus;
    resetState: () => void;
}

export default function useOpenTradeMarketTimeout({
    network,
    library,
}: UseOpenTradeMarketTimeoutInputInterface): UseOpenTradeMarketTimeoutInterface {
    const { send, state, resetState } = useContractFunction(
        TradingV6__factory.connect(network.tradingV6ContractAddress, library),
        'openTradeMarketTimeout'
    );
    const gasStation = useGasStation();

    const submitMarketTimeout = async (orderId: string) => {
        console.log('Submitting market timeout', orderId);
        send(orderId, { ...(await gasStation.getOpenTradeMarketTimeoutGas()) });
    };

    return {
        submitMarketTimeout,
        state,
        resetState,
    };
}
