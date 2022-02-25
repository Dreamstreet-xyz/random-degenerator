import { formatEther, formatUnits } from '@ethersproject/units';
import { Button, Modal } from 'components/common';
import useLivePnl from 'shared/hooks/useLivePnl';
import { ModalBody } from './styles';

export default function TradeDetailsModal({ isVisible, close, trade, tradeInfo }) {
    const { pairString, leverage, buy, positionSizeDai, sl, tp, openPrice } = trade;
    const { openInterestDai } = tradeInfo;
    const pnl = useLivePnl({ trade, tradeInfo });

    return (
        <Modal
            isVisible={isVisible}
            close={close}
            title=""
            titleStyle={{ color: '#6b69ee' }}
            containerStyle={{ maxWidth: 550, width: '100%' }}
        >
            <ModalBody>
                <p>{pairString}</p>
                <p>
                    {leverage}x {buy ? 'LONG' : 'SHORT'}
                </p>
                <p>Collateral: {Number(formatEther(positionSizeDai)).toFixed(1)} DAI</p>
                <p>Size: {Number(formatEther(openInterestDai)).toFixed(0)} DAI</p>
                <p>Open Price: {formatUnits(openPrice, 10)}</p>
                <p>Take Profit: {formatUnits(tp, 10)}</p>
                <p>Stop Loss: {formatUnits(sl, 10)}</p>
                <p>
                    Net PnL:{' '}
                    {pnl.pnlInclFee.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                    })}{' '}
                    DAI ( {pnl.pnlInclFee > 0 ? '+' : ''}
                    {(pnl.percentProfitInclFee * 100).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                    })}
                    %)
                </p>
                <Button title="Close Trade" />
            </ModalBody>
        </Modal>
    );
}
