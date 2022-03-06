import { NetworkInterface } from 'shared/constants/networks';
import { transformUserTradingVariables } from 'shared/utils/gains';
import { GainsUserTradingData } from 'types/gains/GainsUserTradingData';

const HTTPS = 'https://';
const USER_TRADING_VARIABLES_PATH = '/user-trading-variables';

export default async (
    network: NetworkInterface,
    account: string
): Promise<GainsUserTradingData.Data> => {
    const endpoint = HTTPS + network.backendEndpoint + USER_TRADING_VARIABLES_PATH + '/' + account;
    console.log(endpoint);
    const response = await fetch(endpoint);
    // filtering out allTrades for now since it's not supported and a large amount of data
    const data = await response.json();
    return transformUserTradingVariables(data);
};
