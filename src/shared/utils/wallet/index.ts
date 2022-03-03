import { formatEther } from '@ethersproject/units';
import { BigNumberish } from 'ethers';
import { WalletConnectionStatus } from 'types/Wallet';

export const getWalletConnectionStatusMessage = (walletStatus: WalletConnectionStatus): string => {
    switch (walletStatus) {
        case WalletConnectionStatus.Disconnected:
            return 'Connect Wallet';
        case WalletConnectionStatus.Connecting:
            return 'Connecting...';
        case WalletConnectionStatus.UnsupportedNetwork:
            return 'Unsupported network - please update in your wallet';
        case WalletConnectionStatus.NetworkMismatch:
            return 'Network mismatch - your wallet is not connected to the correct network';
        case WalletConnectionStatus.NoEthereumProvider:
            return 'No wallet provider found - please install MetaMask';
        case WalletConnectionStatus.OtherError:
            return 'Oops, something went wrong';
        case WalletConnectionStatus.Connected:
            return 'Connected';
        case WalletConnectionStatus.JsonRpcError:
            return 'RPC errors - please refresh or make sure your wallet has a connection to the network';
        default:
            return 'Unknown error occurred... please reach out to us on Telegram';
    }
};

export const prettifyEther = (value: BigNumberish = 0) => {
    return (+formatEther(value)).toFixed(4);
};
