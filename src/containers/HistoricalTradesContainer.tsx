import { useState } from 'react';
import { useEthers } from '@usedapp/core';
import { useEffect } from 'react';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';
import fetchUserTradingHistory from 'api/gains/rest/fetchUserTradingHistory';
import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';
import HistoricalTrades from 'components/app/HistoricalTrades';

export default function HistoricalTradesContainer() {
    const { account } = useEthers();
    const { network } = useNetworkDetails();
    const [trades, setTrades] = useState<GainsCoreDataInterface.HistoricalTrade[]>([]);

    useEffect(() => {
        // read trade history
        setTrades([]);
        const getTradingVariables = async () => {
            const trades = await fetchUserTradingHistory(network, account);
            console.log('Historical trades for account ', account, ':', trades);
            console.log(typeof trades);
            setTrades(trades);
        };
        getTradingVariables();
    }, [account, network]);

    return <HistoricalTrades trades={trades} />;
}
