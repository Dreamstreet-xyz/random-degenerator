import { useEthers } from '@usedapp/core';
import { BigNumber, BigNumberish } from 'ethers';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';
import { parseUnits } from '@ethersproject/units';

type GasStationReturnValues = {
    gasLimit: BigNumberish;
    maxPriorityFeePerGas: BigNumberish;
    maxFeePerGas: BigNumberish;
};

const TX_GAS_COEFFICIENT = 1.1;
const GAS_LIMIT_COEFFICIENT = 1.25;

const AVG_OPEN_TRADE_UNITS = 1315614;
const AVG_CLOSE_TRADE_UNITS = 1250751;
const AVG_OPEN_TRADE_MARKET_TIMEOUT_UNITS = 150000;

export default function useGasStation() {
    const { library } = useEthers();
    const { network } = useNetworkDetails();

    const _getPrice = async (): Promise<BigNumber> => {
        const baseGasPrice = await library?.getGasPrice();
        return BigNumber.from(parseInt((TX_GAS_COEFFICIENT * Number(baseGasPrice)).toString()));
    };

    const getGasStationPayload = async (): Promise<JSON> => {
        const stationResp = await fetch(network.gasStationUrl);
        return stationResp.json();
    };

    const _getMaxPriorityFee = async (): Promise<BigNumber> => {
        try {
            const stationResp = await getGasStationPayload();
            const fast = stationResp.fast;
            console.log(fast);
            console.log(fast.maxPriorityFee.toString());
            return parseUnits(fast.maxPriorityFee.toFixed(9).toString(), 'gwei');
        } catch (e) {
            console.log('Error getting maxPriorityFee from gas station', e);
            return _getPrice();
        }
    };

    const getOpenTradeGas = async (): Promise<GasStationReturnValues> => {
        const gasPrice = (await _getMaxPriorityFee()).toString();
        const gasLimit = parseInt((GAS_LIMIT_COEFFICIENT * AVG_OPEN_TRADE_UNITS).toString());
        return { gasLimit, maxPriorityFeePerGas: gasPrice, maxFeePerGas: gasPrice };
    };

    const getCloseTradeGas = async (): Promise<GasStationReturnValues> => {
        const gasPrice = (await _getMaxPriorityFee()).toString();
        const gasLimit = parseInt((GAS_LIMIT_COEFFICIENT * AVG_CLOSE_TRADE_UNITS).toString());
        return { gasLimit, maxPriorityFeePerGas: gasPrice, maxFeePerGas: gasPrice };
    };

    const getOpenTradeMarketTimeoutGas = async (): Promise<GasStationReturnValues> => {
        const gasPrice = (await _getMaxPriorityFee()).toString();
        const gasLimit = parseInt(
            (GAS_LIMIT_COEFFICIENT * AVG_OPEN_TRADE_MARKET_TIMEOUT_UNITS).toString()
        );
        return { gasLimit, maxPriorityFeePerGas: gasPrice, maxFeePerGas: gasPrice };
    };

    return {
        getOpenTradeGas,
        getCloseTradeGas,
        getOpenTradeMarketTimeoutGas,
        getGasPrice: () => _getMaxPriorityFee(),
        getGasStationPayload: () => getGasStationPayload(),
    };
}
