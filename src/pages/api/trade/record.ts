import type { NextApiRequest, NextApiResponse } from 'next';
import type { FinalizedTradeDetailsType, DegenTradeRecord } from 'types/Trade';
import prisma from 'lib/prisma';
import { env } from 'process';

type Data = {
    success: boolean;
    trade?: DegenTradeRecord;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    if (!process.env.DATABASE_URL) {
        console.log('No database url');
        res.json({ success: true });
    }

    if (req.method !== 'POST') {
        res.status(405).end('Method Not Allowed');
        return res;
    }

    const trade = JSON.parse(req.body);

    // small validation
    if (!trade?.orderId) {
        res.status(400).json({ success: false });
        return res;
    }

    console.log('Recording trade', trade);

    const input: DegenTradeRecord = {
        orderId: trade.orderId,
        txHash: trade.txHash,
        chainId: trade.chainId,
        trader: trade.trader,
        pairIndex: trade.pairIndex,
        pairString: trade.pairString,
        index: trade.index,
        buy: trade.buy,
        leverage: trade.leverage,
        feesDai: trade.feesDai,
        positionSizeDai: trade.positionSizeDai,
        openPrice: trade.openPrice,
        tp: trade.tp,
        sl: trade.sl,
        tpP: trade.tpP,
        slP: trade.slP,
        referrer: trade.referrer,
        slippageP: trade.slippageP,
    };

    const tradeRecord = await prisma.trade.create({
        data: input,
    });

    console.log('Recorded trade', tradeRecord);

    res.json({ success: true, trade: tradeRecord });
};
