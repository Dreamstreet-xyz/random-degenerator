import { PnlType } from 'types/Trade';

export default function ClosedTradeToast(type: string, pair: string, price: number, pnl: PnlType) {
    return (
        <>
            <title>This is a header</title>
            <div>This is the body</div>
            <div>This is the bottom</div>
        </>
    );
}
