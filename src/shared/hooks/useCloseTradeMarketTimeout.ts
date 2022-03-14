import { JsonRpcProvider } from '@ethersproject/providers';
import { TransactionStatus } from '@usedapp/core';
import { NetworkInterface } from 'shared/constants/networks';
import useGasStation from 'shared/hooks//useGasStation';
import { useContractFunction } from 'shared/hooks/useContractFunction';
import { TradingV6__factory } from 'types/ethers-contracts';

interface UseCloseTradeMarketTimeoutInputInterface {
    network: NetworkInterface;
    library: JsonRpcProvider;
    tradeId: string;
}

interface UseCloseTradeMarketTimeoutInterface {
    submitMarketTimeout: (orderId?: string) => Promise<void>;
    state: TransactionStatus;
    resetState: () => void;
}

export default function useCloseTradeMarketTimeout({
    network,
    library,
    tradeId,
}: UseCloseTradeMarketTimeoutInputInterface): UseCloseTradeMarketTimeoutInterface {
    const { send, state, resetState } = useContractFunction(
        TradingV6__factory.connect(network.tradingV6ContractAddress, library),
        'closeTradeMarketTimeout'
    );
    const gasStation = useGasStation();

    const submitMarketTimeout = async (orderIdOverride?: string) => {
        const orderId = orderIdOverride || tradeId;
        console.log('Submitting market timeout on close', orderId);
        // TODO: find details on closetrademarket and add gas suggestions. for now using open.
        send(orderId, { ...(await gasStation.getOpenTradeMarketTimeoutGas()) });
    };

    return {
        submitMarketTimeout,
        state,
        resetState,
    };
}
