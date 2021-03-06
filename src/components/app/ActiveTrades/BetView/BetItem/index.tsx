import { formatEther, formatUnits } from '@ethersproject/units';
import { Tooltip } from 'components/common';
import { useEffect } from 'react';
import useLivePnl from 'shared/hooks/useLivePnl';
import useLivePrice from 'shared/hooks/useLivePrice';
import {
    Container,
    Row,
    Collateral,
    Pnl,
    StatusBar,
    Indicator,
    CurrentPrice,
    OpenPrice,
    CloseButtonWrapper,
    CloseButton,
    StopLoss,
    TakeProfit,
} from './styles';

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const getStatus = pnl => {
    if (pnl < -90) return 'ðŠĶ';
    if (pnl < -70) return 'ðĩ';
    if (pnl < -50) return 'ð­';
    if (pnl < -36) return 'ðą';
    if (pnl < -25) return 'ð°';
    if (pnl < -20) return 'ðĻ';
    if (pnl < -14) return 'ð';
    if (pnl < -8) return 'ð';
    if (pnl < 8) return 'ð';
    if (pnl < 16) return 'ð';
    if (pnl < 28) return 'ð';
    if (pnl < 50) return 'ð';
    if (pnl < 80) return 'ð';
    if (pnl < 250) return 'ðĪĐ';
    if (pnl < 500) return 'ðĪ';
    return 'ð';
};

export default function BetItem({ trade, tradeInfo, loading, isClosed, onClose }) {
    const { sl, tp, positionSizeDai, openPrice } = trade;
    const { pnl, freeze: pnlFreeze } = useLivePnl({ trade, tradeInfo });
    const { price, freeze: priceFreeze } = useLivePrice({ trade, tradeInfo });

    const fsl = Number(formatUnits(sl, 10));
    const ftp = Number(formatUnits(tp, 10));
    const fop = Number(formatUnits(openPrice, 10));
    const opPercentage = ((fop - fsl) / (ftp - fsl)) * 100;
    const curPercentage = clamp(((price - fsl) / (ftp - fsl)) * 100, 0, 100);
    const pnlPercent = (pnl.percentProfitInclFee * 100).toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    });

    useEffect(() => {
        const _freeze = isClosed || loading;
        pnlFreeze(_freeze);
        priceFreeze(_freeze);
    }, [isClosed, loading]);

    return (
        <Container style={{ opacity: loading || isClosed ? 0.5 : 1 }}>
            <Row>
                <Tooltip content="Bet Amount">
                    <Collateral>{Number(formatEther(positionSizeDai)).toFixed(0)} DAI</Collateral>
                </Tooltip>
                <Tooltip content="Bet PnL">
                    <Pnl pnl={pnl}>
                        {pnl.pnlInclFee.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                        })}{' '}
                        DAI ( {pnl.pnlInclFee > 0 ? '+' : ''}
                        {pnlPercent}
                        %)
                    </Pnl>
                </Tooltip>
                <div />
            </Row>
            <Row style={{ marginTop: 8 }}>
                <StatusBar>
                    <Tooltip content="Stop Loss">
                        <StopLoss />
                    </Tooltip>
                    <Tooltip content="Bet open">
                        <Indicator initial={false} animate={{ left: `${opPercentage}%` }}>
                            <OpenPrice />
                        </Indicator>
                    </Tooltip>
                    <Tooltip content="Current status">
                        <CurrentPrice initial={false} animate={{ left: `${curPercentage}%` }}>
                            {getStatus(pnlPercent)}
                        </CurrentPrice>
                    </Tooltip>
                    <Tooltip content="Take Profit">
                        <TakeProfit />
                    </Tooltip>
                </StatusBar>
                <Tooltip content="Close Bet">
                    <CloseButtonWrapper>
                        <CloseButton
                            onClick={onClose}
                            disabled={isClosed}
                            loading={loading}
                            icon={'times'}
                        />
                    </CloseButtonWrapper>
                </Tooltip>
            </Row>
        </Container>
    );
}
