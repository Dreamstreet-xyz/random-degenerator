import useLivePnl from 'shared/hooks/useLivePnl';
import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import { PnlType } from 'types/Trade';
import { PnlData } from './styles';

export default function LivePnl({ trade }: { trade: GainsCoreDataInterface.TradeWrapper }) {
    const pnl: PnlType = useLivePnl(trade);
    return (
        <PnlData pnl={pnl}>
            {pnl.pnlInclFee.toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            })}{' '}
            DAI ( {pnl.pnlInclFee > 0 ? '+' : ''}
            {(pnl.percentProfitInclFee * 100).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            })}
            %)
        </PnlData>
    );
}
