import { JsonRpcProvider } from '@ethersproject/providers';
import { NetworkInterface } from 'shared/constants/networks';
import { Table, TableBody } from 'components/app/ActiveTrades/TradeView/styles';
import TimedOutTradeContainer from 'containers/TimedOutTradeContainer';
import { TimedOutTrade } from 'shared/stores/GainsDataStore';
import { Header, Title, Content } from '../sharedStyles';
import { Container, Section } from './styles';

export default function TimedOutTrades({
    trades,
    network,
    library,
}: {
    trades: TimedOutTrade[];
    network: NetworkInterface;
    library: JsonRpcProvider;
}) {
    return (
        <>
            <Section>
                <Container>
                    <Header style={{ 'justify-content': 'center' }}>
                        <Title>Timeouts</Title>
                    </Header>
                    <Content>
                        <Table>
                            <TableBody>
                                {trades?.map(trade => (
                                    <TimedOutTradeContainer
                                        key={trade.orderId}
                                        trade={trade}
                                        network={network}
                                        library={library}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </Content>
                </Container>
            </Section>
        </>
    );
}
