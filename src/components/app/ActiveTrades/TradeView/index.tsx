import ActiveTradeContainer from 'containers/ActiveTradeContainer';
import { getTradeKey } from 'shared/utils/gains/trade';
import { Container, Table, TableHead, TableHeadRow, TableHeader, TableBody } from './styles';

export default function TradeView({ trades, closedTradeKeys, onTradeClosed, onTradeClick }) {
    return (
        <Container>
            <Table>
                <TableHead>
                    <TableHeadRow>
                        <TableHeader style={{ borderTopLeftRadius: 10 }}>Position</TableHeader>
                        <TableHeader>Pair</TableHeader>
                        <TableHeader>Leverage</TableHeader>
                        <TableHeader style={{ textAlign: 'right' }}>Collateral</TableHeader>
                        <TableHeader style={{ textAlign: 'right' }}>Net PnL</TableHeader>
                        <TableHeader style={{ borderTopRightRadius: 10 }}>Close</TableHeader>
                    </TableHeadRow>
                </TableHead>
                <TableBody>
                    {trades.map((item, ix) => (
                        <ActiveTradeContainer
                            key={getTradeKey(item)}
                            tradeWrapper={item}
                            onClick={() => onTradeClick(ix)}
                            type={'table'}
                            onTradeClosed={onTradeClosed}
                            isClosed={closedTradeKeys.has(getTradeKey(item))}
                        />
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}
