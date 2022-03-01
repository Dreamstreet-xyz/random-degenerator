import { useMemo, useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { toast } from 'react-toastify';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';
import { getTransactionStatusMessage, didUserRejectTransaction } from 'shared/utils/transaction';
import { getTradeKey } from 'shared/utils/gains/trade';
import useCloseTradeV6 from 'shared/hooks/useCloseTradeV6';
import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import TradeItem from 'components/app/ActiveTrades/TradeItem';
import TradeDetailsModal from 'components/app/ActiveTrades/TradeDetailsModal';

export default function ActiveTradeContainer({
    tradeWrapper,
    onClick,
    type,
    onTradeClosed,
    isClosed,
}: {
    tradeWrapper: GainsCoreDataInterface.TradeWrapper;
    onClick: () => void;
    type: string;
    onTradeClosed: (tradeKey: string) => void;
    isClosed: boolean;
}) {
    const { network } = useNetworkDetails();
    const { library } = useEthers();
    const { closeTrade, state, resetState } = useCloseTradeV6({
        network,
        library,
        tradingDetails: {
            pairIndex: tradeWrapper?.trade.pairIndex,
            index: tradeWrapper?.trade.index,
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
                toast.info('Trade closed', {
                    onClose: () => resetState(),
                });
                onTradeClosed(getTradeKey(tradeWrapper));
                if (type === 'modal') {
                    onClick();
                }
                break;
            case 'None':
            case 'PendingSignature':
            case 'Mining':
            default:
                break;
        }
    }, [state]);

    const render = () => {
        switch (type) {
            case 'table':
                return (
                    <TradeItem
                        key={`${tradeWrapper.trade.pairIndex}-${tradeWrapper.trade.index}`}
                        position={tradeWrapper.trade.buy ? 'LONG' : 'SHORT'}
                        collateral={tradeWrapper.trade.positionSizeDai}
                        positionSize={tradeWrapper.tradeInfo.openInterestDai}
                        leverage={tradeWrapper.trade.leverage}
                        pair={tradeWrapper.trade.pairString}
                        trade={tradeWrapper}
                        onClick={onClick}
                        onClose={() => closeTrade()}
                        loading={['PendingSignature', 'Mining'].includes(state?.status)}
                        isClosed={isClosed || state?.status === 'Success'}
                    />
                );
            case 'modal':
                return (
                    <TradeDetailsModal
                        isVisible={!!tradeWrapper}
                        close={onClick}
                        trade={tradeWrapper?.trade}
                        tradeInfo={tradeWrapper?.tradeInfo}
                        onCloseTrade={() => closeTrade()}
                        isClosed={isClosed || state?.status === 'Success'}
                        loading={['PendingSignature', 'Mining'].includes(state?.status)}
                    />
                );
            default:
                break;
        }
    };

    return render();
}
