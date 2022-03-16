import { EmptyStatePlaceholder } from 'components/common';
import ActiveTradeContainer from 'containers/ActiveTradeContainer';
import { getTradeKey } from 'shared/utils/gains/trade';
import { Container, Table, TableHead, TableHeadRow, TableHeader, TableBody } from './styles';

export default function TradeView({ trades, closedTradeKeys, onTradeClosed, onTradeClick }) {
    return (
        <Container>
            {trades.length > 0 ? (
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
            ) : (
                <EmptyStatePlaceholder
                    image="images/noun/galaxy2.png"
                    title="There's nothing to see here, yet"
                    subtitle="Come back after you've made a trade"
                />
            )}
        </Container>
    );
}
