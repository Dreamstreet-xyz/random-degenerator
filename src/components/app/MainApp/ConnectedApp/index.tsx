import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import useApproveDai from 'shared/hooks/useApproveDai';
import { useUser } from 'shared/contexts/UserContext';
import { GainsDataStoreInterface } from 'shared/stores/GainsDataStore';
import {
    useActiveGainsDataStore,
    ActiveGainsDataStoreInterface,
} from 'shared/stores/ActiveGainsDataStore';
import { getWalletConnectionStatusMessage, prettifyEther } from 'shared/utils/wallet';
import { getTransactionStatusMessage, didUserRejectTransaction } from 'shared/utils/transaction';
import { getLevRangeForPosSizeAllPairs } from 'shared/utils/gains/pairs';
import { WalletConnectionStatus } from 'types/Wallet';
import PlayForm from './PlayForm';
import PlaySlots, { SlotOptionType, positions } from './PlaySlots';
import {
    Container,
    AppContainer,
    BannerContainer,
    Banner,
    InsufficientFundsContainer,
    InsufficientFunds,
} from './styles';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';
import useRandomTrade, {
    getRandomFloorNumberIncl,
    UseRandomTradeInterface,
} from 'shared/hooks/useRandomTrade';
import WalletOpenTradesContainer from 'containers/WalletOpenTradesContainer';
import { TradeStatus } from 'types/Trade';
import ProgressBar from './ProgressBar';

const PLACEHOLDER_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function ConnectedApp({ gas }) {
    const [isPlaying, setPlay] = useState(false);
    const [displayTxMessage, setDisplayTxMessage] = useState(false);
    const [displayDaiMessage, setDisplayDaiMessage] = useState(false);
    const [slippageP, setSlippageP] = useState('2');
    const { network } = useNetworkDetails();
    const useGainsDataStore = useActiveGainsDataStore(
        (state: ActiveGainsDataStoreInterface) => state.store
    );
    const tradingVariables = useGainsDataStore(
        (state: GainsDataStoreInterface) => state.tradingVariables
    );
    const { user, walletConnectionStatus } = useUser();
    const minMaxBet: [number, number] = useMemo(
        () => [
            tradingVariables.minPosDaiInt || 0,
            user.daiBalance
                ? Math.floor(
                      Math.min(
                          tradingVariables.maxPosDaiInt,
                          parseInt(prettifyEther(user.daiBalance || 0))
                      )
                  )
                : tradingVariables.maxPosDaiInt,
        ],
        [user, tradingVariables]
    );
    const hasMinDai = useMemo(
        () => parseInt(prettifyEther(user.daiBalance || '0')) >= tradingVariables.minPosDaiInt,
        [user, tradingVariables]
    );
    const [bet, setBet] = useState([minMaxBet[0].toString(), minMaxBet[1].toString()]);
    const [banner, setBanner] = useState({ display: false, message: '', close: false });
    const [daiLoading, setDaiLoading] = useState(false);
    const [finalOrder, setFinalOrder] = useState(null);
    const [tradeFinished, setTradeFinished] = useState(false);
    const {
        approveDai,
        allowance,
        state: daiState,
        resetState: resetDaiState,
    } = useApproveDai(network?.daiAddress, user.address, network?.storageContractAddress);
    const {
        submitRandomTrade,
        state,
        resetState,
        tradeDetails,
        tradeOverrides,
        generateRandomOverrides,
        finalOrderDetails,
        tradeStatus,
    }: UseRandomTradeInterface = useRandomTrade();

    const message = useMemo(
        () => getWalletConnectionStatusMessage(walletConnectionStatus),
        [walletConnectionStatus]
    );
    const txMessage = useMemo(() => getTransactionStatusMessage(state), [state]);
    const daiApprovalMessage = useMemo(() => getTransactionStatusMessage(daiState), [daiState]);

    useEffect(() => {
        if (hasMinDai) {
            // validate
            const curMin = parseInt(bet[0]);
            const curMax = parseInt(bet[1]);
            if (curMin < minMaxBet[0] || curMin > minMaxBet[1]) {
                setBet([minMaxBet[0].toString(), bet[1]]);
            }

            if (curMax > minMaxBet[1] || curMax < minMaxBet[0]) {
                setBet([bet[0], minMaxBet[1].toString()]);
            }
        }
    }, [minMaxBet]);

    useEffect(() => {
        if (hasMinDai) {
            // validate
            const curMin = parseInt(bet[0]);
            const curMax = parseInt(bet[1]);
            if (curMin > minMaxBet[1]) {
                setBet([minMaxBet[0].toString(), bet[1]]);
            }

            if (curMax > minMaxBet[1]) {
                setBet([bet[0], minMaxBet[1].toString()]);
            }
        }
    }, [bet]);

    useEffect(() => {
        if (walletConnectionStatus === WalletConnectionStatus.JsonRpcError) {
            setBanner({
                display: true,
                message,
                close: () => setBanner({ ...banner, display: false }),
            });
        } else if (walletConnectionStatus !== WalletConnectionStatus.Connected) {
            setBanner({
                display: true,
                message,
                close: false,
            });
        } else if (displayTxMessage) {
            setBanner({ display: true, message: txMessage, close: () => resetTxStateAndPlay() });
        } else if (!network.isActive) {
            setBanner({
                display: true,
                message: `${network?.chainName} is not active until V6 contract deployment. Please switch to supported network above.`,
                close: false,
            });
        } else if (displayDaiMessage) {
            setBanner({ display: true, message: daiApprovalMessage, close: () => resetDaiState() });
        } else {
            setBanner({ display: false, message: '', close: false });
        }
    }, [walletConnectionStatus, displayTxMessage, displayDaiMessage, network]);

    const setBetFromPlay = (proposedBet: [string, string]) => {
        const pMin = parseInt(proposedBet[0]) || parseInt(bet[0]);
        const pMax = parseInt(proposedBet[1]) || parseInt(bet[1]);

        setBet([pMin.toString(), pMax.toString()]);
    };

    const computedSlotOptions = useMemo(() => {
        const pairOptions: SlotOptionType = {
            title: 'Pair',
            options: PLACEHOLDER_LIST.map(_ => {
                const ix = getRandomFloorNumberIncl(0, tradingVariables.pairs.length - 1);
                const pair = tradingVariables.pairs[ix];
                return `${pair.from}/${pair.to}`;
            }),
        };

        const collateralOptions: SlotOptionType = {
            title: 'Collateral',
            options: PLACEHOLDER_LIST.map(
                ix =>
                    getRandomFloorNumberIncl(parseInt(bet[0]), parseInt(bet[1])).toString() + ' DAI'
            ),
        };

        const levRange = getLevRangeForPosSizeAllPairs(parseInt(bet[1]), tradingVariables);

        const leverageOptions: SlotOptionType = {
            title: 'Leverage',
            options: PLACEHOLDER_LIST.map(
                ix => getRandomFloorNumberIncl(levRange[0], levRange[1]).toString() + 'x'
            ),
        };

        const positionOptions: SlotOptionType = {
            title: 'Position',
            options: positions,
        };

        if (tradeOverrides) {
            const { pairIndex, positionSizeDai, leverage, position } = tradeOverrides;

            const pair = tradingVariables.pairs[pairIndex];

            pairOptions.options.push(`${pair.from}/${pair.to}`);
            collateralOptions.options.push(positionSizeDai.toString() + ' DAI');
            leverageOptions.options.push(leverage.toString() + 'x');
            positionOptions.options.push(position);
        }
        return [pairOptions, collateralOptions, leverageOptions, positionOptions];
    }, [tradeOverrides]);

    useEffect(() => {
        // on any network change, just reset state
        setPlay(false);
        resetState();
        resetDaiState();
    }, [network]);

    useEffect(() => {
        switch (tradeStatus) {
            case TradeStatus.Canceled:
                toast.dismiss();
                handleBack();
                toast.error('Trade cancelled');
                setBanner({
                    display: true,
                    message:
                        'Your trade was cancelled! If markets are volatile, adjust your slippage. If Polygon is busy, up your gas.',
                    close: () => setBanner({ display: false, message: '', close: false }),
                });
                break;
            case TradeStatus.TimedOut:
                toast.dismiss();
                handleBack();
                toast.error('Trade timed out');
                setBanner({
                    display: true,
                    message:
                        "Your trade timed out or we lost connection. Refresh and check active trades below. If the new trade is not there, go to https://gains.trade to claim your collateral back (we're working on integrating).",
                    close: () => setBanner({ display: false, message: '', close: false }),
                });
                break;
            case TradeStatus.Mining:
                toast.dismiss();
                toast.info('Trade submitted', { autoClose: false });
                break;
            case TradeStatus.PendingExecution:
                toast.dismiss();
                toast.info('Trade pending', { autoClose: false });
                break;
            case TradeStatus.Executed:
                toast.dismiss();
                toast('Transaction completed!', { icon: '🚀' });
                break;
            case TradeStatus.Unconfirmed:
                toast.dismiss();
                toast.info('Order executed: waiting on block confirmation', {
                    autoClose: false,
                });
                break;
            case TradeStatus.Failed:
            case TradeStatus.None:
            default:
                break;
        }
    }, [tradeStatus]);

    const handlePlay = async () => {
        console.log('playing');
        handleBack();

        // validate bet
        const min = Math.min(parseInt(bet[0]), parseInt(bet[1]));
        const max = Math.max(parseInt(bet[0]), parseInt(bet[1]));

        console.log('min', min);
        console.log('max', max);
        if (min < minMaxBet[0]) {
            setBanner({
                display: true,
                message: 'Minimum bet is ' + minMaxBet[0],
                close: () => setBanner({ display: false, message: '', close: false }),
            });
            return;
        } else if (max > minMaxBet[1]) {
            setBanner({
                display: true,
                message: 'Maximum bet is ' + minMaxBet[1],
                close: () => setBanner({ display: false, message: '', close: false }),
            });
            return;
        }
        try {
            if (min > max) {
                generateRandomOverrides(max, min);
            } else {
                generateRandomOverrides(min, max);
            }
        } catch (e) {
            console.log(e);
            setBanner({
                display: true,
                message: 'Error generating random trade -- try resubmitting a few times',
                close: () => setBanner({ display: false, message: '', close: false }),
            });
            handleBack();
            return;
        }

        setPlay(true);
    };

    const handleBack = () => {
        resetState();
        setTradeFinished(false);
        setPlay(false);
    };

    const resetTxStateAndPlay = () => {
        setDisplayTxMessage(false);
        resetState();
    };

    const handleConfirmTrade = async () => {
        if (!(await submitRandomTrade(user.address, Number(slippageP)))) {
            setPlay(false);
            toast.error(
                'Your position size is either too small or too big, please adjust the band. Sorry!'
            );
        }
    };

    useEffect(() => {
        // if user reject, display toast and backout
        // if other exception, display banner and backout
        // if success, display toast
        // anything else, do nothing
        switch (state?.status) {
            case 'Exception':
                if (didUserRejectTransaction(state)) {
                    setPlay(false);
                    toast.error(txMessage);
                    break;
                }
            case 'Fail':
                setDisplayTxMessage(true);
                setPlay(false);
                return;
            case 'Success':
            case 'None':
            case 'PendingSignature':
            case 'Mining':
            default:
                break;
        }
        setDisplayTxMessage(false);
    }, [state]);

    useEffect(() => {
        switch (daiState.status) {
            case 'Exception':
                if (didUserRejectTransaction(daiState)) {
                    toast.error(txMessage, {
                        onClose: () => resetDaiState(),
                    });
                    setDaiLoading(false);
                    break;
                }
            case 'Fail':
                setDaiLoading(false);
                setDisplayDaiMessage(true);
                return;
            case 'Success':
            case 'None':
                setDaiLoading(false);
            case 'PendingSignature':
            case 'Mining':
            default:
                break;
        }
        setDisplayDaiMessage(false);
    }, [daiState]);

    if (
        user.daiBalance &&
        !hasMinDai &&
        walletConnectionStatus === WalletConnectionStatus.Connected &&
        !isPlaying
    ) {
        return (
            <Container>
                <InsufficientFundsContainer>
                    <h2 style={{ marginTop: -50 }}>
                        <InsufficientFunds>You need at least </InsufficientFunds>
                        <InsufficientFunds>
                            {tradingVariables.minPosDaiInt} DAI to play
                        </InsufficientFunds>
                    </h2>
                </InsufficientFundsContainer>
                <WalletOpenTradesContainer />
            </Container>
        );
    }

    return (
        <Container>
            <AppContainer>
                <BannerContainer>
                    <AnimatePresence>
                        {banner?.display && (
                            <Banner
                                message={banner?.message}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: 'spring', duration: 0.5, delay: 0.1 }}
                                close={banner?.close}
                            />
                        )}
                    </AnimatePresence>
                </BannerContainer>
                {isPlaying && tradeOverrides ? (
                    <>
                        <ProgressBar tradeStatus={tradeStatus} finished={tradeFinished} />
                        <PlaySlots
                            slotOptions={computedSlotOptions}
                            onBack={handleBack}
                            onConfirm={handleConfirmTrade}
                            state={state}
                            finalOrderDetails={finalOrderDetails}
                            onShowTradeResults={() => setTradeFinished(true)}
                        />
                    </>
                ) : (
                    <PlayForm
                        gas={gas}
                        onPlay={handlePlay}
                        bet={bet}
                        setBet={setBetFromPlay}
                        slippage={slippageP}
                        setSlippage={setSlippageP}
                        daiApproved={allowance?.toString() !== '0'}
                        onDaiApprove={() => approveDai()}
                        daiLoading={daiLoading}
                    />
                )}
            </AppContainer>
            {!isPlaying && <WalletOpenTradesContainer />}
        </Container>
    );
}
