import { useMemo, useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { toast } from 'react-toastify';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';
import { getTransactionStatusMessage, didUserRejectTransaction } from 'shared/utils/transaction';
import useCloseTradeV6 from 'shared/hooks/useCloseTradeV6';
import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import TradeItem from 'components/app/ActiveTrades/TradeItem';

export default function ActiveTradeContainer({
    tradeWrapper,
}: {
    tradeWrapper: GainsCoreDataInterface.TradeWrapper;
}) {
    const { network } = useNetworkDetails();
    const { library } = useEthers();
    const { closeTrade, state, resetState } = useCloseTradeV6({
        network,
        library,
        tradingDetails: {
            pairIndex: tradeWrapper.trade.pairIndex,
            index: tradeWrapper.trade.index,
        },
    });
    const txMessage = useMemo(() => getTransactionStatusMessage(state), [state]);

    useEffect(() => {
        // if user reject, display toast and backout
        // if other exception, display banner and backout
        // if success, display toast
        // anything else, do nothing
        switch (state?.status) {
            case 'Exception':
            case 'Fail':
                toast.error(txMessage, {
                    onClose: () => resetState(),
                });
                break;
            case 'Success':
            case 'None':
            case 'PendingSignature':
            case 'Mining':
            default:
                break;
        }
    }, [state]);

    return (
        <TradeItem
            key={`${tradeWrapper.trade.pairIndex}-${tradeWrapper.trade.index}`}
            position={tradeWrapper.trade.buy ? 'LONG' : 'SHORT'}
            collateral={tradeWrapper.trade.positionSizeDai}
            positionSize={tradeWrapper.tradeInfo.openInterestDai}
            leverage={tradeWrapper.trade.leverage}
            pair={tradeWrapper.trade.pairString}
            trade={tradeWrapper}
            onClose={() => closeTrade()}
            loading={['PendingSignature', 'Mining'].includes(state?.status)}
            isClosed={state?.status === 'Success'}
        />
    );
}
