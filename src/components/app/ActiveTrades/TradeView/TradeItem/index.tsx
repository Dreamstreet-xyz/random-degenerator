import { formatEther } from '@ethersproject/units';
import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import LivePnl from './LivePnl';
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
    onClick,
    isClosed,
}: {
    trade: GainsCoreDataInterface.TradeWrapper;
}) {
    const handleClick = () => {
        onClick?.();
    };

    const handleClose = e => {
        e.stopPropagation();
        onClose?.();
    };

    return (
        <TableRow onClick={handleClick}>
            <PositionData position={position}>{position}</PositionData>
            <Pair>{pair}</Pair>
            <Leverage>{leverage}x</Leverage>
            <Collateral>{Number(formatEther(collateral)).toFixed(1)} DAI</Collateral>
            <LivePnl trade={trade} active={!loading && !isClosed} />
            <CloseButtonWrapper>
                <CloseButton
                    onClick={handleClose}
                    disabled={isClosed}
                    loading={loading}
                    icon={isClosed ? 'check-circle' : 'times'}
                />
            </CloseButtonWrapper>
        </TableRow>
    );
}
