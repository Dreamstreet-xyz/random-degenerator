import { Modal } from 'components/common';
import TradeDetailsModalContent from './TradeDetailsModalContent';

export default function TradeDetailsModal({
    isVisible,
    close,
    trade,
    tradeInfo,
    onCloseTrade,
    loading,
    isClosed,
}) {
    return (
        <Modal
            isVisible={isVisible}
            close={close}
            title=""
            titleStyle={{ color: '#6b69ee' }}
            containerStyle={{ maxWidth: 350, width: '100%' }}
        >
            <TradeDetailsModalContent
                trade={trade}
                tradeInfo={tradeInfo}
                onCloseTrade={onCloseTrade}
                loading={loading}
                isClosed={isClosed}
            />
        </Modal>
    );
}
