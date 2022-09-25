import { useEffect } from 'react';
import { formatEther, formatUnits } from '@ethersproject/units';
import useLivePnl from 'shared/hooks/useLivePnl';
import useLivePrice from 'shared/hooks/useLivePrice';
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

export default function TradeDetailsModalContent({
    trade,
    tradeInfo,
    initialAccFees,
    onCloseTrade,
    loading,
    isClosed,
}) {
    const { pairString, leverage, buy, positionSizeDai, sl, tp, openPrice } = trade;
    const { openInterestDai } = tradeInfo;
    const { pnl, freeze: pnlFreeze } = useLivePnl({ trade, tradeInfo, initialAccFees });
    const { price, freeze: priceFreeze } = useLivePrice({ trade, tradeInfo, initialAccFees });

    const handleClose = e => {
        e.stopPropagation();
        onCloseTrade?.();
    };

    useEffect(() => {
        const _freeze = isClosed || loading;
        pnlFreeze(_freeze);
        priceFreeze(_freeze);
    }, [isClosed, loading]);

    return (
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
                <Label>Price</Label>
                <Size>{price}</Size>
            </Row>
            <Row>
                <Label>Rollover fee</Label>
                <Size>
                    {pnl?.rolloverFeeDai
                        ? pnl.rolloverFeeDai.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                              minimumFractionDigits: 2,
                          })
                        : 'N/A'}
                </Size>
            </Row>
            <Row>
                <Label>Funding fee</Label>
                <Size>
                    {pnl?.fundingFeeDai
                        ? pnl.fundingFeeDai.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                              minimumFractionDigits: 2,
                          })
                        : 'N/A'}
                </Size>
            </Row>
            <Row>
                <Label>Closing fee</Label>
                <Size>
                    {pnl?.closingFeeDai
                        ? pnl.closingFeeDai.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                              minimumFractionDigits: 2,
                          })
                        : 'N/A'}
                </Size>
            </Row>
            <Row>
                <Label>Net PnL</Label>
                <Pnl pnl={pnl}>
                    {pnl?.pnlInclFee?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                    })}{' '}
                    DAI ( {pnl?.pnlInclFee > 0 ? '+' : ''}
                    {(pnl?.percentProfitInclFee * 100).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                    })}
                    %)
                </Pnl>
            </Row>
            <CloseButton
                title="Close Trade"
                onClick={handleClose}
                disabled={isClosed}
                loading={loading}
            />
        </ModalBody>
    );
}
