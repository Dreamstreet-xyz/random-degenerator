import { formatEther } from '@ethersproject/units';
import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import LivePnl from 'components/app/ActiveTrades/TradeItem/LivePnl';
import {
    TableRow,
    PositionData,
    Pair,
    Leverage,
    Collateral,
    CloseButtonWrapper,
    CloseButton,
} from './styles';

export default function TradeItem({
    pair,
    collateral,
    positionSize,
    leverage,
    position,
    onClose,
    loading,
    trade,
    isClosed,
}: {
    trade: GainsCoreDataInterface.TradeWrapper;
}) {
    return (
        <TableRow>
            <PositionData position={position}>{position}</PositionData>
            <Pair>{pair}</Pair>
            <Leverage>{leverage}x</Leverage>
            <Collateral>{Number(formatEther(collateral)).toFixed(1)} DAI</Collateral>
            <LivePnl trade={trade} />
            <CloseButtonWrapper>
                <CloseButton
                    onClick={onClose}
                    disabled={isClosed}
                    loading={loading}
                    icon={isClosed ? 'check-circle' : 'times'}
                />
            </CloseButtonWrapper>
        </TableRow>
    );
}
