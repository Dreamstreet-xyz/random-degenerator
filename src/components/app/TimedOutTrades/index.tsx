import { JsonRpcProvider } from '@ethersproject/providers';
import { NetworkInterface } from 'shared/constants/networks';
import { Table, TableBody } from 'components/app/ActiveTrades/styles';
import TimedOutTradeContainer from 'containers/TimedOutTradeContainer';
import { Header, Title, Content } from '../sharedStyles';
import { Container, Section } from './styles';

export default function TimedOutTrades({
    tradeIds,
    network,
    library,
}: {
    tradeIds: string[];
    network: NetworkInterface;
    library: JsonRpcProvider;
}) {
    return (
        <>
            <Section>
                <Container>
                    <Header>
                        <Title>Timed Out Trades</Title>
                    </Header>
                    <Content>
                        <Table>
                            <TableBody>
                                {tradeIds.map(tradeId => (
                                    <TimedOutTradeContainer
                                        key={tradeId}
                                        tradeId={tradeId}
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
