import ActiveTradeContainer from 'containers/ActiveTradeContainer';
import { getTradeKey } from 'shared/utils/gains/trade';
import { Container } from './styles';

export default function BetView({ trades, closedTradeKeys, onTradeClosed }) {
    return (
        <Container>
            {trades.map((item, ix) => (
                <ActiveTradeContainer
                    key={getTradeKey(item)}
                    tradeWrapper={item}
                    type={'bet'}
                    onTradeClosed={onTradeClosed}
                    isClosed={closedTradeKeys.has(getTradeKey(item))}
                />
            ))}
        </Container>
    );
}
