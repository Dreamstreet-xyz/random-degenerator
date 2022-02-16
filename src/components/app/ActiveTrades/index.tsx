import { formatEther } from '@ethersproject/units';
import { GainsStreamingDataInterface } from 'types/gains/GainsStreamingData';
import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import ActiveTradeContainer from 'containers/ActiveTradeContainer';
import { Container, Header, Title, Content } from '../sharedStyles';
import { Section, Table, TableHead, TableHeadRow, TableHeader, TableBody } from './styles';
import {
    ActionLink,
    GainsLogo,
} from 'components/app/MainApp/ConnectedApp/PlaySlots/TradeResultsCard/styles';
import { NetworkInterface } from 'shared/constants/networks';

export default function ActiveTrades({
    trades,
    network,
}: {
    trades: GainsCoreDataInterface.TradeWrapper[];
    network: NetworkInterface;
}) {
    return (
        <Section>
            <Container>
                <Header>
                    <Title>Your Active Trades</Title>
                </Header>
                <Content>
                    <Table>
                        <TableHead>
                            <TableHeadRow>
                                <TableHeader style={{ borderTopLeftRadius: 10 }}>
                                    Position
                                </TableHeader>
                                <TableHeader>Pair</TableHeader>
                                <TableHeader>Leverage</TableHeader>
                                <TableHeader style={{ textAlign: 'right' }}>Collateral</TableHeader>
                                <TableHeader style={{ textAlign: 'right' }}>Net PnL</TableHeader>
                                <TableHeader style={{ borderTopRightRadius: 10 }}>
                                    Close
                                </TableHeader>
                            </TableHeadRow>
                        </TableHead>
                        <TableBody>
                            {trades.map((item, ix) => (
                                <ActiveTradeContainer
                                    key={`${item.trade.pairIndex}-${item.trade.index}`}
                                    tradeWrapper={item}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </Content>
                <ActionLink
                    href={
                        network.chainName === 'polygon'
                            ? 'https://gains.trade/decentralized-trading/'
                            : 'https://gains.trade/testnet-trading/'
                    }
                    target="_blank"
                >
                    <GainsLogo src="/images/gains_logo.png" />
                    Further manage on Gains
                </ActionLink>
            </Container>
        </Section>
    );
}
