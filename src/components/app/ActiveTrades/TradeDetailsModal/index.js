import { Modal } from 'components/common';
import { ModalBody } from './styles';

export default function TradeDetailsModal({ isVisible, close, trade }) {
    return (
        <Modal
            isVisible={isVisible}
            close={close}
            title=""
            titleStyle={{ color: '#6b69ee' }}
            containerStyle={{ maxWidth: 550, width: '100%' }}
        >
            <ModalBody>
                <pre>{JSON.stringify(trade, null, 2)}</pre>
            </ModalBody>
        </Modal>
    );
}
