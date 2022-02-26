import { formatEther, formatUnits } from '@ethersproject/units';
import { Button, Modal } from 'components/common';
import useLivePnl from 'shared/hooks/useLivePnl';
import {
    ModalBody,
    Row,
    Label,
    Pair,
    Position,
    Collateral,
    Size,
    Open,
    Tp,
    Sl,
    Pnl,
    CloseButton,
} from './styles';

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
            containerStyle={{ maxWidth: 350, width: '100%' }}
        >
            <ModalBody>
                <Pair>{pairString}</Pair>
                <Position buy={buy}>
                    {leverage}x {buy ? 'LONG' : 'SHORT'}
                </Position>
                <Row>
                    <Label>Collateral</Label>
                    <Collateral>{Number(formatEther(positionSizeDai)).toFixed(1)} DAI</Collateral>
                </Row>
                <Row>
                    <Label>Size</Label>
                    <Size>{Number(formatEther(openInterestDai)).toFixed(0)} DAI</Size>
                </Row>
                <Row>
                    <Label>Open Price</Label>
                    <Open>{Number(formatUnits(openPrice, 10)).toFixed(6)}</Open>
                </Row>
                <Row>
                    <Label>Take Profit</Label>
                    <Tp>{tp > 0 ? Number(formatUnits(tp, 10)).toFixed(5) : 'N/A'}</Tp>
                </Row>
                <Row>
                    <Label>Stop Loss</Label>
                    <Sl>{sl > 0 ? Number(formatUnits(sl, 10)).toFixed(5) : 'N/A'}</Sl>
                </Row>
                <Row>
                    <Label>Net PnL</Label>
                    <Pnl pnl={pnl}>
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
                    </Pnl>
                </Row>
                <CloseButton title="Close Trade" />
            </ModalBody>
        </Modal>
    );
}
