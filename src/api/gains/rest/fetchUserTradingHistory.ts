import { NetworkInterface } from 'shared/constants/networks';
import { transformUserTradingHistory } from 'shared/utils/gains';
import { GainsCoreDataInterface } from 'types/gains/GainsCoreData';

const HTTPS = 'https://';
const USER_TRADING_VARIABLES_PATH = '/personal-trading-history-table';

export default async (
    network: NetworkInterface,
    account: string
): Promise<GainsCoreDataInterface.HistoricalTrade[]> => {
    try {
        const endpoint =
            HTTPS + network.backendEndpoint + USER_TRADING_VARIABLES_PATH + '/' + account;
        console.log(endpoint);
        const response = await fetch(endpoint);
        // filtering out allTrades for now since it's not supported and a large amount of data
        const data = await response.json();
        return transformUserTradingHistory(data);
    } catch (e) {
        console.log('Error fetching user trading history', e);
    }
    return [];
};
