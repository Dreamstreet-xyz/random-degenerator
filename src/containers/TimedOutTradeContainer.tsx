import { JsonRpcProvider } from '@ethersproject/providers';
import { useEffect, useMemo } from 'react';
import { NetworkInterface } from 'shared/constants/networks';
import useCloseTradeMarketTimeout from 'shared/hooks/useCloseTradeMarketTimeout';
import useOpenTradeMarketTimeout from 'shared/hooks/useOpenTradeMarketTimeout';
import TimedOutTradeItem from 'components/app/TimedOutTrades/TimedOutTradeItem';
import { toast } from 'react-toastify';
import ToastChannel from 'shared/utils/toasts/ToastChannel';
import { TimedOutTrade, TimeoutType } from 'shared/stores/GainsDataStore';
import { didUserRejectTransaction } from 'shared/utils/transaction';

export default function TimedOutTradeContainer({
    key,
    trade,
    network,
    library,
}: {
    key: string;
    trade: TimedOutTrade;
    network: NetworkInterface;
    library: JsonRpcProvider;
}) {
    const { orderId, type } = trade;
    // console.log('trade', trade);
    const {
        submitMarketTimeout: submitClose,
        state: closeState,
        resetState: resetCloseState,
    } = useCloseTradeMarketTimeout({
        network,
        library,
        tradeId: orderId,
    });

    const {
        submitMarketTimeout: submitOpen,
        state: openState,
        resetState: resetOpenState,
    } = useOpenTradeMarketTimeout({
        network,
        library,
        tradeId: orderId,
    });

    const { submitMarketTimeout, state, resetState } = useMemo(
        () =>
            type === TimeoutType.close
                ? {
                      submitMarketTimeout: submitClose,
                      state: closeState,
                      resetState: resetCloseState,
                  }
                : { submitMarketTimeout: submitOpen, state: openState, resetState: resetOpenState },
        [orderId, type, openState, closeState]
    );

    useEffect(() => {
        console.log(state);
        const channel = orderId;
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
                if (!didUserRejectTransaction(state)) {
                    ToastChannel.updateToastInChannel(channel, {
                        options: {
                            render: 'Failed to claim collateral',
                            type: 'error',
                            autoClose: 5000,
                        },
                    });
                }
                resetState();
                break;
            case 'Success':
                ToastChannel.updateToastInChannel(channel, {
                    options: {
                        render: 'Collateral claimed',
                        type: 'info',
                        autoClose: 5000,
                    },
                });
                break;
            case 'PendingSignature':
            case 'None':
            default:
                break;
        }

        return () => {
            console.log('Here we are bebe', state);
            if (state?.status === 'Mining') {
                const channel = orderId;
                ToastChannel.updateToastInChannel(channel, {
                    options: {
                        render: 'Collateral claimed',
                        type: 'info',
                        autoClose: 5000,
                    },
                });
                resetState();
            }
        };
    }, [state]);

    return (
        <TimedOutTradeItem
            key={key}
            tradeId={orderId}
            loading={['PendingSignature', 'Mining'].includes(state?.status)}
            isClaimed={state?.status === 'Success'}
            onClaim={() => submitMarketTimeout()}
        />
    );
}
