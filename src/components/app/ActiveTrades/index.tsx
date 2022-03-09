import { useState } from 'react';
import { formatEther } from '@ethersproject/units';
import { GainsStreamingDataInterface } from 'types/gains/GainsStreamingData';
import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import ActiveTradeContainer from 'containers/ActiveTradeContainer';
import { getTradeKey } from 'shared/utils/gains/trade';
import { Container, Header, Title, Content } from '../sharedStyles';
import { Section, HeaderRight, Toggle } from './styles';
import {
    ActionLink,
    GainsLogo,
} from 'components/app/MainApp/ConnectedApp/PlaySlots/TradeResultsCard/styles';
import { NetworkInterface, polygon } from 'shared/constants/networks';
import TradeDetailsModal from './TradeView/TradeDetailsModal';
import BetView from './BetView';
import TradeView from './TradeView';
import { Tooltip } from 'components/common';

export default function ActiveTrades({
    trades,
    network,
}: {
    trades: GainsCoreDataInterface.TradeWrapper[];
    network: NetworkInterface;
}) {
    const [target, setTarget] = useState(null);
    const [bettingView, setBettingView] = useState(true);
    const [closedTradeKeys, setClosedTradeKeys] = useState<Set<string>>(new Set([]));
    const handleTradeClick = index => {
        setTarget(trades[index]);
    };

    const addClosedTrade = (trade: string) => {
        setClosedTradeKeys(new Set([...Array.from(closedTradeKeys), trade]));
    };

    const handleToggleView = () => {
        setBettingView(!bettingView);
    };

    return (
        <>
            <Section>
                <Container>
                    <Header>
                        <Title>Your Active {bettingView ? 'Bets' : 'Trades'}</Title>
                        <HeaderRight>
                            <Tooltip content={`Switch to ${bettingView ? 'trade' : 'bet'} view`}>
                                <span>
                                    <Toggle
                                        onClick={handleToggleView}
                                        icon={bettingView ? 'list' : 'dice'}
                                    />
                                </span>
                            </Tooltip>
                        </HeaderRight>
                    </Header>
                    <Content>
                        {bettingView ? (
                            <BetView
                                trades={trades}
                                closedTradeKeys={closedTradeKeys}
                                onTradeClosed={addClosedTrade}
                            />
                        ) : (
                            <TradeView
                                trades={trades}
                                closedTradeKeys={closedTradeKeys}
                                onTradeClick={handleTradeClick}
                                onTradeClosed={addClosedTrade}
                            />
                        )}
                    </Content>
                    <div
                        style={{
                            display: 'flex',
                            marginTop: 8,
                            justifyContent: 'center',
                        }}
                    >
                        <ActionLink
                            href={
                                network.chainId === polygon.chainId
                                    ? 'https://gains.trade/decentralized-trading/'
                                    : 'https://gains.trade/testnet-trading/'
                            }
                            target="_blank"
                            style={{ flex: '0 1 auto' }}
                        >
                            <GainsLogo src="/images/gains_logo.png" />
                            Further manage on Gains
                        </ActionLink>
                    </div>
                </Container>
            </Section>
            <ActiveTradeContainer
                onClick={() => setTarget(null)}
                tradeWrapper={target}
                type={'modal'}
                onTradeClosed={addClosedTrade}
                isClosed={target && closedTradeKeys.has(getTradeKey(target))}
            />
        </>
    );
}
