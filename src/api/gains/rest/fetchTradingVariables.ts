import { ChainId } from '@usedapp/core';
import { BigNumber } from 'ethers';
import { formatEther } from '@ethersproject/units';
import { GainsTradingDataInterface } from 'types/gains/GainsTradingData';
import { GainsTradingDataInterfaceV5 } from 'types/gains/GainsTradingDataV5';
import { NetworkInterface } from 'shared/constants/networks';
import { transformTradingVariables } from 'shared/utils/gains';

const HTTPS = 'https://';
const TRADING_VARIABLES_PATH = '/trading-variables';

export const getEndpointFromNetwork = (chainId: ChainId, protocol: string) => {
    switch (chainId) {
        case ChainId.Polygon:
            return protocol + process.env.NEXT_PUBLIC_POLYGON_BACKEND_ENDPOINT;
        case ChainId.Kovan:
        case ChainId.Mumbai:
            return protocol + process.env.NEXT_PUBLIC_KOVAN_BACKEND_ENDPOINT;
        default:
            throw Error(`Unsupported network: ${chainId}`);
    }
};

export default async (network: NetworkInterface): Promise<GainsTradingDataInterface.Data> => {
    try {
        const endpoint = HTTPS + network.backendEndpoint + TRADING_VARIABLES_PATH;
        console.log(endpoint);
        const response = await fetch(endpoint);
        // filtering out allTrades for now since it's not supported and a large amount of data
        const data = await response.json();
        return transformTradingVariables(data);
    } catch (e) {
        console.log('Error fetching trading variables', e);
    }
};

const computeV5MaxPosDaiInt = (data: GainsTradingDataInterfaceV5.Data) => {
    return parseInt(
        formatEther(
            BigNumber.from(data.currentBalanceDai)
                .mul(BigNumber.from(data.maxPosDaiP))
                .div(100)
                .div(1e10)
                .toString()
        )
    );
};
