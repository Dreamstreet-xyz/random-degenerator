import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import { TableRow, PositionData, Pair, Leverage, Collateral, TableData } from './styles';

export default function HistoricalTradeItem({
    trade: { date, pair, action, price, buy, size, leverage, pnl, tx },
}: {
    trade: GainsCoreDataInterface.HistoricalTrade;
}) {
    const _date = new Date(date);
    return (
        <TableRow>
            <TableData>{`${_date.getMonth()}/${_date.getDate()}`}</TableData>
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
            {/* <TableData>{action}</TableData> */}
            <TableData>
                {Number(pnl).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                })}{' '}
                DAI
            </TableData>
        </TableRow>
    );
}
