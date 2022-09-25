import { PnlType } from 'types/Trade';
import { ActionType } from 'types/gains/GainsCoreData';
import { Container, Type, Pair, Result } from './styles';

const typeToString = (type: ActionType) => {
    switch (type) {
        case ActionType.LIQ:
            return 'Liquidation';
        case ActionType.MAR:
            return 'Market Close';
        case ActionType.SL:
            return 'Stop Loss';
        case ActionType.TP:
            return 'Take Profit';
    }
};

export interface ClosedTradeToastInput {
    type: ActionType;
    pair: string;
    price: number;
    pnl: PnlType;
}

export const renderClosedTradeToast = ({ type, pair, price, pnl }: ClosedTradeToastInput) => {
    return <ClosedTradeToast type={type} pair={pair} price={price} pnl={pnl} />;
};

export default function ClosedTradeToast({ type, pair, price, pnl }: ClosedTradeToastInput) {
    return (
        <Container>
            <Type pnl={pnl}>{typeToString(type)}</Type>
            <Pair>
                {pair} @{' '}
                {price.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                })}
            </Pair>
            <Result pnl={pnl}>
                {pnl?.pnlInclFee >= 0 ? '+' : ''}
                {pnl?.pnlInclFee.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                })}{' '}
                ({pnl?.pnlInclFee >= 0 ? '+' : ''}
                {(pnl?.percentProfitInclFee * 100).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                })}
                )%
            </Result>
        </Container>
    );
}
