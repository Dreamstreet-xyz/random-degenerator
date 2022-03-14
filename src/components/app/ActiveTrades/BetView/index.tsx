import { EmptyStatePlaceholder } from 'components/common';
import ActiveTradeContainer from 'containers/ActiveTradeContainer';
import { getTradeKey } from 'shared/utils/gains/trade';
import { Container, BetsContainer } from './styles';

export default function BetView({ trades, closedTradeKeys, onTradeClosed }) {
    return (
        <Container>
            {trades.length > 0 ? (
                <BetsContainer>
                    {trades.map((item, ix) => (
                        <ActiveTradeContainer
                            key={getTradeKey(item)}
                            tradeWrapper={item}
                            type={'bet'}
                            onTradeClosed={onTradeClosed}
                            isClosed={closedTradeKeys.has(getTradeKey(item))}
                        />
                    ))}
                </BetsContainer>
            ) : (
                <EmptyStatePlaceholder
                    image="images/noun/galaxy.png"
                    title="There's nothing to see here, yet"
                    subtitle="Come back after you've made a bet"
                />
            )}
        </Container>
    );
}
