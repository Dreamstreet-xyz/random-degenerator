import { JsonRpcProvider } from '@ethersproject/providers';
import { useEffect } from 'react';
import { NetworkInterface } from 'shared/constants/networks';
import useCloseTradeMarketTimeout from 'shared/hooks/useCloseTradeMarketTimeout';
import TimedOutTradeItem from 'components/app/TimedOutTrades/TimedOutTradeItem';
import { toast } from 'react-toastify';

export default function TimedOutTradeContainer({
    key,
    tradeId,
    network,
    library,
}: {
    key: string;
    tradeId: string;
    network: NetworkInterface;
    library: JsonRpcProvider;
}) {
    const { submitMarketTimeout, state, resetState } = useCloseTradeMarketTimeout({
        network,
        library,
        tradeId,
    });

    useEffect(() => {
        switch (state?.status) {
            case 'Exception':
            case 'Fail':
                toast.error('Failed to claim collateral', { onClose: () => resetState() });
                break;
            case 'Success':
                toast.info('Collateral claimed', { onClose: () => resetState() });
                break;
            case 'None':
            case 'PendingSignature':
            case 'Mining':
            default:
                break;
        }
    }, [state]);

    return (
        <TimedOutTradeItem
            key={key}
            tradeId={tradeId}
            loading={['PendingSignature', 'Mining'].includes(state?.status)}
            isClaimed={state?.status === 'Success'}
            onClaim={() => submitMarketTimeout()}
        />
    );
}
