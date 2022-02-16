import { TradeStatus } from 'types/Trade';
import { getTradeProgress } from 'shared/utils/trade';

export default function ProgressBar({
    tradeStatus,
    finished,
}: {
    tradeStatus: TradeStatus;
    finished: boolean;
}) {
    const progress = getTradeProgress(finished ? TradeStatus.Success : tradeStatus);

    return (
        <div>
            {progress.cur}/{progress.total}
        </div>
    );
}
