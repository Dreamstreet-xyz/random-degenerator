import { useState } from 'react';
import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import ActiveTradeContainer from 'containers/ActiveTradeContainer';
import { getTradeKey } from 'shared/utils/gains/trade';
import { Header, Title, Content } from '../sharedStyles';
import { Container, Section, HeaderRight, Toggle } from './styles';
import {
    ActionLink,
    GainsLogo,
} from 'components/app/MainApp/ConnectedApp/PlaySlots/TradeResultsCard/styles';
import { NetworkInterface, polygon } from 'shared/constants/networks';
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
    const [bettingView, setBettingView] = useState(
        JSON.parse(localStorage.getItem('bettingView')) ?? true
    );
    const [closedTradeKeys, setClosedTradeKeys] = useState<Set<string>>(new Set([]));
    const handleTradeClick = index => {
        setTarget(trades[index]);
    };

    const addClosedTrade = (trade: string) => {
        setClosedTradeKeys(new Set([...Array.from(closedTradeKeys), trade]));
    };

    const handleToggleView = () => {
        setBettingView(!bettingView);
        localStorage.setItem('bettingView', JSON.stringify(!bettingView));
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
                    {trades.length > 0 && (
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
                    )}
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
