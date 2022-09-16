import { JsonRpcProvider } from '@ethersproject/providers';
import { TransactionStatus } from '@usedapp/core';
import { NetworkInterface } from 'shared/constants/networks';
import useGasStation from 'shared/hooks//useGasStation';
import { useContractFunction } from 'shared/hooks/useContractFunction';
import { TradingV62__factory } from 'types/ethers-contracts';

interface UseOpenTradeMarketTimeoutInputInterface {
    network: NetworkInterface;
    library: JsonRpcProvider;
    tradeId: string;
}

interface UseOpenTradeMarketTimeoutInterface {
    submitMarketTimeout: (orderIdOverride?: string) => Promise<void>;
    state: TransactionStatus;
    resetState: () => void;
}

export default function useOpenTradeMarketTimeout({
    network,
    library,
    tradeId,
}: UseOpenTradeMarketTimeoutInputInterface): UseOpenTradeMarketTimeoutInterface {
    const { send, state, resetState } = useContractFunction(
        TradingV62__factory.connect(network.tradingV6_2ContractAddress, library),
        'openTradeMarketTimeout'
    );
    const gasStation = useGasStation();

    const submitMarketTimeout = async (orderIdOverride?: string) => {
        const orderId = orderIdOverride || tradeId;
        console.log('Submitting market timeout on open', orderId);
        send(orderId, { ...(await gasStation.getOpenTradeMarketTimeoutGas()) });
    };

    return {
        submitMarketTimeout,
        state,
        resetState,
    };
}
