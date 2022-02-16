import { useState } from 'react';
import { useEthers } from '@usedapp/core';
import { parseUnits } from '@ethersproject/units';
import { CONTRACT_ADDRESS } from 'contracts/tradingV5';
import { useContractFunction } from 'shared/utils/hooks/useContractFunction';
import { TradingV5__factory } from 'types/ethers-contracts';
import { StorageInterfaceV5 } from 'types/ethers-contracts/TradingV5';
import { useGainsData } from 'shared/contexts/GainsNetworkContext';

export default function useCloseTradeV5() {
    //   const { library } = useEthers();
    //   const { send, state } = useContractFunction(
    //     TradingV5__factory.connect(CONTRACT_ADDRESS, library),
    //     'closeTradeMarket'
    //   );
    //   const closeTrade = async ()
    //   const submitTrade = async (trader: string) => {
    //     const openPrice = getLivePairPrice('BTC/USD').toString();
    //     console.log('Opening trade at price:', openPrice);
    //     const tuple: StorageInterfaceV5.TradeStruct = {
    //       trader,
    //       pairIndex,
    //       index: 0, // TODO: ask Seb for docs on this
    //       initialPosToken: 0, // TODO: ask Seb for docs on this
    //       positionSizeDai: parseUnits(positionSizeDai.toString(), 18),
    //       openPrice: parseUnits(openPrice, 18),
    //       buy: true,
    //       leverage,
    //       tp: 0,
    //       sl: 0,
    //     };
    //     console.log(tuple);
    //     // TODO: before sending, ensure user is on expected network. otherwise, this won't error, it'll actually send a tx to the address...
    //     return send(tuple, false, 0, 10000000000, '0x0000000000000000000000000000000000000000');
    //   };
    //   return {
    //     positionSizeDai,
    //     setPositionSizeDai,
    //     pairIndex,
    //     setPairIndex,
    //     leverage,
    //     setLeverage,
    //     submitTrade,
    //     state,
    //   };
}
