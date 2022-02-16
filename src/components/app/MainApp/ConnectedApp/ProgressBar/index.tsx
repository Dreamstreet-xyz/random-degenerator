import { TradeStatus } from 'types/Trade';
import { getTradeProgress } from 'shared/utils/trade';
import { Container, Circle, InnerProgress } from './styles';

export default function ProgressBar({
    tradeStatus,
    finished,
}: {
    tradeStatus: TradeStatus;
    finished: boolean;
}) {
    const progress = getTradeProgress(
        finished && tradeStatus === TradeStatus.Executed ? TradeStatus.Success : tradeStatus
    );
    const percentage = progress.cur / progress.total;
    return (
        <Container>
            <Circle percentage={percentage}>
                <InnerProgress>
                    {progress.cur} of {progress.total}
                </InnerProgress>
            </Circle>
        </Container>
    );
}
