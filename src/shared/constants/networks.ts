import { ChainId, Chain, Polygon, Kovan, Mumbai } from '@usedapp/core';
import { AddEthereumChainParameter } from 'types/Wallet';
import { utils } from 'ethers';

export const getHexChainId = (chainId: ChainId): string => {
    return utils.hexValue(chainId);
};

export interface NetworkInterface extends Chain {
    symbol: string;
    icon: string;
    gasUrl: string;
    blocksUrl: string;
    addressUrl: string;
    daiAddress: string;
    referralAddress: string;
    apiKey: string;
    backendEndpoint: string;
    pricingEndpoint: string;
    tradingV5ContractAddress: string;
    tradingV6ContractAddress: string;
    storageContractAddress: string;
    isActive: boolean;
    gasStationUrl: string;
}

export const polygon: NetworkInterface = {
    ...Polygon,
    symbol: 'MATIC',
    icon: '/images/networks/polygon-logo.png',
    gasUrl: 'https://polygonscan.com/gastracker',
    blocksUrl: 'https://polygonscan.com/blocks',
    addressUrl: 'https://polygonscan.com/address',
    daiAddress: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    referralAddress: '0x337A00Bb895Ca48A1C9F1865eDC18Aa29D6cB68e',
    apiKey: process.env.NEXT_PUBLIC_POLYGON_API_KEY,
    backendEndpoint: process.env.NEXT_PUBLIC_POLYGON_BACKEND_ENDPOINT,
    pricingEndpoint: process.env.NEXT_PUBLIC_PRICING_ENDPOINT,
    tradingV5ContractAddress: '0x37c11410b2c2a1cd4b3a0de2bd3a1808e0528ebe',
    tradingV6ContractAddress: '0xF8a140DB8B05BEC52C7e86D0D40D72f8e54Fe559',
    storageContractAddress: '0xaee4d11a16B2bc65EDD6416Fb626EB404a6D65BD',
    isActive: true,
    gasStationUrl: 'https://gasstation-mainnet.matic.network/v2',
};

export const kovan: NetworkInterface = {
    ...Kovan,
    symbol: 'kovETH',
    icon: '/images/networks/ethereum-logo.png',
    gasUrl: 'https://kovan.etherscan.io/gastracker',
    blocksUrl: 'https://kovan.etherscan.io/blocks',
    addressUrl: 'https://kovan.etherscan.io/address',
    daiAddress: '0x74a76b51940961779e52597a016dd12a557fcb85',
    referralAddress: '0x337A00Bb895Ca48A1C9F1865eDC18Aa29D6cB68e',
    apiKey: process.env.NEXT_PUBLIC_MUMBAI_API_KEY,
    backendEndpoint: process.env.NEXT_PUBLIC_KOVAN_BACKEND_ENDPOINT,
    pricingEndpoint: process.env.NEXT_PUBLIC_PRICING_ENDPOINT,
    tradingV5ContractAddress: '0xec1c66a898ba26bca60a8f5129802d1727d9f918',
    tradingV6ContractAddress: '0xec1c66a898ba26bca60a8f5129802d1727d9f918',
    storageContractAddress: '0x7ef89abe6830e00580a8fc8c298afdad038cbced',
    isActive: false,
    gasStationUrl: 'https://ethgasstation.info/api/ethgasAPI.json?',
};

export const mumbai: NetworkInterface = {
    ...Mumbai,
    symbol: 'muMATIC',
    icon: '/images/networks/polygon-logo.png',
    gasUrl: 'https://mumbai.polygonscan.io/gastracker',
    blocksUrl: 'https://mumbai.polygonscan.com/blocks',
    addressUrl: 'https://mumbai.polygonscan.com/address',
    daiAddress: '0x04B2A6E51272c82932ecaB31A5Ab5aC32AE168C3',
    referralAddress: '0x337A00Bb895Ca48A1C9F1865eDC18Aa29D6cB68e',
    apiKey: process.env.NEXT_PUBLIC_MUMBAI_API_KEY,
    backendEndpoint: process.env.NEXT_PUBLIC_KOVAN_BACKEND_ENDPOINT,
    pricingEndpoint: process.env.NEXT_PUBLIC_PRICING_ENDPOINT,
    tradingV5ContractAddress: '',
    tradingV6ContractAddress: '0x49370dc7319d8439c895015cbad8e35d381e7d73',
    storageContractAddress: '0x4d2df485c608aa55a23d8d98dd2b4fa24ba0f2cf',
    isActive: true,
    gasStationUrl: 'https://gasstation-mumbai.matic.today/v2',
};

export const walletPolygonChain: AddEthereumChainParameter = {
    chainId: getHexChainId(ChainId.Polygon),
    blockExplorerUrls: ['https://polygonscan.com/'],
    chainName: Polygon.chainName,
    nativeCurrency: {
        name: 'Matic',
        symbol: 'MATIC',
        decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com'],
};

export const walletKovanChain: AddEthereumChainParameter = {
    chainId: getHexChainId(ChainId.Kovan),
    blockExplorerUrls: ['https://kovan.etherscan.io/'],
    chainName: Kovan.chainName,
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: ['https://rpc.kovan.infura.io'],
};

export const walletMumbaiChain: AddEthereumChainParameter = {
    chainId: getHexChainId(ChainId.Mumbai),
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    chainName: Mumbai.chainName,
    nativeCurrency: {
        name: 'tMatic',
        symbol: 'tMATIC',
        decimals: 18,
    },
    rpcUrls: ['https://rpc-mumbai.matic.today'],
};

export const walletNetworksList = [walletPolygonChain, walletKovanChain, walletMumbaiChain];

export const getWalletChainFromChainId = (chainId: ChainId): AddEthereumChainParameter => {
    return walletNetworksList.find(n => n.chainId === getHexChainId(chainId));
};

export const Networks = {
    Polygon: polygon,
    Kovan: kovan,
    Mumbai: mumbai,
};

export default [polygon, mumbai];
