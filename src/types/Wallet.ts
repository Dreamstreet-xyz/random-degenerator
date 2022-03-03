export enum WalletConnectionStatus {
    Disconnected = 'Disconnected',
    Connecting = 'Connecting',
    UnsupportedNetwork = 'UnsupportedNetwork',
    NetworkMismatch = 'NetworkMismatch',
    NoEthereumProvider = 'NoEthereumProvider',
    JsonRpcError = 'JsonRpcError',
    OtherError = 'OtherError',
    Connected = 'Connected',
}

export interface AddEthereumChainParameter {
    chainId: string;
    blockExplorerUrls?: string[];
    chainName?: string;
    iconUrls?: string[];
    nativeCurrency?: {
        name: string;
        symbol: string;
        decimals: number;
    };
    rpcUrls?: string[];
}
