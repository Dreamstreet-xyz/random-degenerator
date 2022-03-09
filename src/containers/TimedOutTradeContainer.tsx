import { JsonRpcProvider } from '@ethersproject/providers';
import { useEffect } from 'react';
import { NetworkInterface } from 'shared/constants/networks';
import useCloseTradeMarketTimeout from 'shared/hooks/useCloseTradeMarketTimeout';
import TimedOutTradeItem from 'components/app/TimedOutTrades/TimedOutTradeItem';
import { toast } from 'react-toastify';
import ToastChannel from 'shared/utils/toasts/ToastChannel';

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
        console.log(state);
        const channel = state?.transaction?.hash || tradeId;
        switch (state?.status) {
            case 'Mining':
                ToastChannel.addToastToChannel(channel, {
                    toast: toast.info,
                    content: 'Claim collateral submitted',
                    options: { autoClose: false },
                });
                break;
            case 'Exception':
            case 'Fail':
                ToastChannel.updateToastInChannel(channel, {
                    options: {
                        render: 'Failed to claim collateral',
                        type: 'error',
                        onClose: () => resetState(),
                        autoClose: 5000,
                    },
                });
                break;
            case 'Success':
                ToastChannel.updateToastInChannel(channel, {
                    options: {
                        render: 'Collateral claimed',
                        type: 'info',
                        onClose: () => resetState(),
                        autoClose: 5000,
                    },
                });
                break;
            case 'PendingSignature':
            case 'None':
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
