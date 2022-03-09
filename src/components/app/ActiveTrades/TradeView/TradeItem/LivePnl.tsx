import { useEffect } from 'react';
import useLivePnl from 'shared/hooks/useLivePnl';
import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import { PnlData } from './styles';

export default function LivePnl({
    trade,
    active,
}: {
    trade: GainsCoreDataInterface.TradeWrapper;
    active: boolean;
}) {
    const { pnl, freeze } = useLivePnl(trade);

    useEffect(() => {
        freeze(!active);
    }, [active]);
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
