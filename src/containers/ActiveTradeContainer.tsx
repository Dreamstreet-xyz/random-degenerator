import { useMemo, useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import { toast } from 'react-toastify';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';
import { getTransactionStatusMessage, didUserRejectTransaction } from 'shared/utils/transaction';
import { getTradeKey } from 'shared/utils/gains/trade';
import useCloseTradeV6 from 'shared/hooks/useCloseTradeV6';
import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import TradeItem from 'components/app/ActiveTrades/TradeView/TradeItem';
import TradeDetailsModal from 'components/app/ActiveTrades/TradeView/TradeDetailsModal';
import ToastChannel from 'shared/utils/toasts/ToastChannel';
import BetItem from 'components/app/ActiveTrades/BetView/BetItem';
import {
    ActiveGainsDataStoreInterface,
    useActiveGainsDataStore,
} from 'shared/stores/ActiveGainsDataStore';
import { GainsDataStoreInterface } from 'shared/stores/GainsDataStore';

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
    const [frozen, setFrozen] = useState(false);
    const useGainsDataStore = useActiveGainsDataStore(
        (state: ActiveGainsDataStoreInterface) => state.store
    );
    const tradingVariables = useGainsDataStore(
        (state: GainsDataStoreInterface) => state.tradingVariables
    );

    useEffect(() => {
        if (tradeWrapper?.tradeInfo?.beingMarketClosed) {
            setFrozen(true);
        }
    }, [tradeWrapper]);

    useEffect(() => {
        // if user reject, display toast and backout
        // if other exception, display banner and backout
        // if success, display toast
        // anything else, do nothing
        const channel = `${tradeWrapper?.trade?.pairIndex}-${tradeWrapper?.trade?.index}`;
        switch (state?.status) {
            case 'Mining':
                ToastChannel.addToastToChannel(channel, {
                    toast: toast.info,
                    content: 'Close trade submitted',
                    options: { autoClose: false },
                });
                break;
            case 'Exception':
            case 'Fail':
                if (!didUserRejectTransaction(state)) {
                    ToastChannel.updateToastInChannel(channel, {
                        options: {
                            render: txMessage,
                            onClose: () => resetState(),
                            type: 'error',
                            autoClose: 5000,
                        },
                    });
                } else {
                    resetState();
                }

                setFrozen(false);
                break;
            case 'Success':
                ToastChannel.updateToastInChannel(channel, {
                    options: {
                        render: 'Trade closed: waiting on block confirmation',
                        onClose: () => resetState(),
                        type: 'info',
                        autoClose: false,
                    },
                });
                onTradeClosed(getTradeKey(tradeWrapper));
                if (type === 'modal') {
                    onClick();
                }
                break;
            case 'None':
            case 'PendingSignature':
            default:
                break;
        }
    }, [state]);

    const _closeTrade = () => {
        setFrozen(true);
        closeTrade();
    };

    const render = () => {
        switch (type) {
            case 'bet':
                return (
                    <BetItem
                        key={`${tradeWrapper.trade.pairIndex}-${tradeWrapper.trade.index}`}
                        trade={tradeWrapper.trade}
                        tradeInfo={tradeWrapper.tradeInfo}
                        initialAccFees={tradeWrapper.initialAccFees}
                        onClose={_closeTrade}
                        loading={frozen}
                        isClosed={isClosed || state?.status === 'Success'}
                        tradingVariables={tradingVariables}
                    />
                );
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
                        onClose={_closeTrade}
                        loading={frozen}
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
                        initialAccFees={tradeWrapper?.initialAccFees}
                        onCloseTrade={() =>
                            closeTrade({
                                pairIndex: tradeWrapper?.trade.pairIndex,
                                index: tradeWrapper?.trade.index,
                            })
                        }
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
