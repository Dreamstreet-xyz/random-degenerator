import { NetworkInterface } from 'shared/constants/networks';
import { GainsPricingDataInterface } from 'types/gains/GainsPricingData';

// TODO: need reconnection logic

const WSS = 'wss://';

let priceData = {
    name: 'skeleton',
    time: 0,
    opens: [],
    highs: [],
    lows: [],
    closes: [],
};
let socket = null;

const startPriceStream = (network: NetworkInterface, onMessageCallback, onErrorCallback) => {
    console.log('Starting stream');
    socket = new WebSocket(WSS + network.backendEndpoint);
    socket.onerror = error => {
        console.log(error);
        socket.close();
        onErrorCallback(error);
    };
    socket.onmessage = async msg => {
        const data = JSON.parse(msg.data);
        // console.log(data);
        onMessageCallback(data);
    };
};

const closePriceStream = () => {
    console.log('Closing stream');
    socket?.close();
    console.log('Stream closed ' + socket);
};

const getPriceData = (): GainsPricingDataInterface.Data => {
    return priceData;
};

export { startPriceStream, closePriceStream, getPriceData };
