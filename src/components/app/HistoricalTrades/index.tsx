import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import HistoricalTradeItem from 'components/app/HistoricalTrades/HistoricalTradeItem';
import { Container, Header, Title, Content } from '../sharedStyles';
import { Section, Table, TableHead, TableHeadRow, TableHeader, TableBody } from './styles';

export default function HistoricalTrades({
    trades,
}: {
    trades: GainsCoreDataInterface.HistoricalTrade[];
}) {
    // TODO: consider https://react-table.tanstack.com/ for filtering and sorting
    return (
        <>
            <Section>
                <Container>
                    <Header>
                        <Title>Your Historical Trades</Title>
                    </Header>
                    <Content>
                        <Table>
                            <TableHead>
                                <TableHeadRow>
                                    <TableHeader style={{ borderTopLeftRadius: 10 }}>
                                        Date
                                    </TableHeader>
                                    <TableHeader>Position</TableHeader>
                                    <TableHeader>Pair</TableHeader>
                                    <TableHeader>Leverage</TableHeader>
                                    <TableHeader style={{ textAlign: 'right' }}>
                                        Collateral
                                    </TableHeader>
                                    {/* <TableHeader>Outcome</TableHeader> */}
                                    <TableHeader style={{ textAlign: 'right' }}>
                                        Net PnL
                                    </TableHeader>
                                </TableHeadRow>
                            </TableHead>
                            <TableBody>
                                {trades.map((item, ix) => (
                                    <HistoricalTradeItem key={item.id} trade={item} />
                                ))}
                            </TableBody>
                        </Table>
                    </Content>
                </Container>
            </Section>
        </>
    );
}
