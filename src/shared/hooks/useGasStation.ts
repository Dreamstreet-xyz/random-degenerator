import { useEthers } from '@usedapp/core';
import { BigNumber, BigNumberish } from 'ethers';

type GasStationReturnValues = {
    gasPrice: BigNumberish;
    gasLimit: BigNumberish;
};

const TX_GAS_COEFFICIENT = 1.1;
const GAS_LIMIT_COEFFICIENT = 1.25;

const AVG_OPEN_TRADE_UNITS = 1315614;
const AVG_CLOSE_TRADE_UNITS = 1250751;

export default function useGasStation() {
    const { library } = useEthers();

    const _getPrice = async (): Promise<BigNumber> => {
        const baseGasPrice = await library?.getGasPrice();
        return BigNumber.from(parseInt((TX_GAS_COEFFICIENT * Number(baseGasPrice)).toString()));
    };

    const getOpenTradeGas = async (): Promise<GasStationReturnValues> => {
        const gasPrice = (await _getPrice()).toString();
        const gasLimit = parseInt((GAS_LIMIT_COEFFICIENT * AVG_OPEN_TRADE_UNITS).toString());
        return { gasPrice, gasLimit };
    };

    const getCloseTradeGas = async (): Promise<GasStationReturnValues> => {
        const gasPrice = (await _getPrice()).toString();
        const gasLimit = parseInt((GAS_LIMIT_COEFFICIENT * AVG_CLOSE_TRADE_UNITS).toString());
        return { gasPrice, gasLimit };
    };

    return { getOpenTradeGas, getCloseTradeGas };
}
