import { GainsCoreDataInterface, ActionType } from 'types/gains/GainsCoreData';
import {
    TableRow,
    PositionData,
    Pair,
    Leverage,
    Collateral,
    TableData,
    PnlData,
    Action,
} from './styles';

export default function HistoricalTradeItem({
    trade: { date, pair, action, price, buy, size, leverage, pnl, tx },
}: {
    trade: GainsCoreDataInterface.HistoricalTrade;
}) {
    const _date = new Date(date);
    const actionToString = (action: ActionType) => {
        switch (action) {
            case ActionType.LIQ:
                return 'LIQ';
            case ActionType.MAR:
                return 'MARKET';
            case ActionType.SL:
                return 'SL';
            case ActionType.TP:
                return 'TP';
            default:
                break;
        }
        return action;
    };

    return (
        <TableRow>
            <TableData>{`${_date.getMonth() + 1}/${_date.getDate()}`}</TableData>
            <PositionData position={buy ? 'LONG' : 'SHORT'}>{buy ? 'LONG' : 'SHORT'}</PositionData>
            <Pair>{pair}</Pair>
            <Leverage>{leverage}x</Leverage>
            <Collateral>
                {Number(size).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                })}{' '}
                DAI
            </Collateral>
            <Action action={action}>{actionToString(action)}</Action>
            <PnlData pnl={Number(pnl)}>
                {Number(pnl).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                })}{' '}
                DAI
            </PnlData>
        </TableRow>
    );
}
