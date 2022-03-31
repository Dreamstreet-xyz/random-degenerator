import { TransactionStatus } from '@usedapp/core';
import { useEffect, useState } from 'react';
import { GainsDataStoreInterface } from 'shared/stores/GainsDataStore';
import {
    useActiveGainsDataStore,
    ActiveGainsDataStoreInterface,
} from 'shared/stores/ActiveGainsDataStore';
import { TradeStruct, LONG_POSITION, SHORT_POSITION } from 'shared/hooks/useOpenTradeV6';
import Slot from './Slot';
import { Container, BackButton, SlotsContainer, TopActionRow } from './styles';
import TradeResultsCard from './TradeResultsCard';
import { FinalizedTradeDetailsType } from 'types/Trade';

type SlotOptionTypeTitle = 'Pair' | 'Collateral' | 'Leverage' | 'Position';

export type SlotOptionType = {
    title: SlotOptionTypeTitle;
    options: string[];
};

const pairs = [
    'AAVE/USD',
    'ADA/USD',
    'ALGO/USD',
    'BTC/USD',
    'DOGE/USD',
    'ETH/USD',
    'MATIC/USD',
    'OMG/USD',
    'YFI/USD',
];

const collaterals = [
    '900 DAI',
    '902 DAI',
    '903 DAI',
    '904 DAI',
    '905 DAI',
    '906 DAI',
    '907 DAI',
    '908 DAI',
    '909 DAI',
];

const leverages = [
    '50x',
    '55x',
    '60x',
    '65x',
    '70x',
    '75x',
    '80x',
    '85x',
    '90x',
    '95x',
    '100x',
    '105x',
    '110x',
    '115x',
    '120x',
    '125x',
    '130x',
    '135x',
    '140x',
    '145x',
    '150x',
];

export const positions = [
    'short',
    'long',
    'short',
    'long',
    'short',
    'long',
    'short',
    'long',
    'short',
    'long',
];

const defaultOptions: SlotOptionType[] = [
    {
        title: 'Pair',
        options: pairs,
    },
    {
        title: 'Collateral',
        options: collaterals,
    },
    {
        title: 'Leverage',
        options: leverages,
    },
    {
        title: 'Position',
        options: positions,
    },
];

export default function PlaySlots({
    slotOptions,
    onBack,
    onConfirm,
    state,
    finalOrderDetails,
    onShowTradeResults,
}: {
    slotOptions: SlotOptionType[];
    onBack: () => void;
    onConfirm: () => void;
    state: TransactionStatus;
    finalOrderDetails: FinalizedTradeDetailsType | null;
    onShowTradeResults: () => void;
}) {
    const [targets, setTargets] = useState([]);
    const [options, setOptions] = useState([]);
    const [slotsFinished, setSlotsFinished] = useState(false);
    const useGainsDataStore = useActiveGainsDataStore(
        (state: ActiveGainsDataStoreInterface) => state.store
    );
    const tradingVariables = useGainsDataStore(
        (state: GainsDataStoreInterface) => state.tradingVariables
    );
    const marketOrder = useGainsDataStore(
        (state: GainsDataStoreInterface) => state.latestMarketOrderForWallet
    );
    const handleConfirm = () => {
        onConfirm?.();
    };

    useEffect(() => {
        if (state?.status === 'Success') {
            const _ix = (slotOptions && 10) || 4;
            setTargets([_ix, _ix, _ix, _ix]);
            setTimeout(() => {
                setSlotsFinished(true);
                onShowTradeResults();
            }, 6000);
        }
    }, [state]);

    useEffect(() => {
        setTimeout(
            () =>
                setOptions(prev => [
                    ...prev,
                    slotOptions.find(o => o.title === 'Collateral') || defaultOptions[1],
                ]),
            1000
        );
        setTimeout(
            () =>
                setOptions(prev => [
                    ...prev,
                    slotOptions.find(o => o.title === 'Pair') || defaultOptions[0],
                ]),
            1250
        );
        setTimeout(
            () =>
                setOptions(prev => [
                    ...prev,
                    slotOptions.find(o => o.title === 'Leverage') || defaultOptions[2],
                ]),
            1500
        );
        setTimeout(
            () =>
                setOptions(prev => [
                    ...prev,
                    slotOptions.find(o => o.title === 'Position') || defaultOptions[3],
                ]),
            1750
        );

        setTimeout(() => handleConfirm(), 2000);
    }, []);

    const container = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.05,
                staggerChildren: 0.15,
            },
        },
    };

    return (
        <Container>
            {slotsFinished && finalOrderDetails ? (
                <>
                    <TopActionRow>
                        <BackButton onClick={onBack}>Go back</BackButton>
                    </TopActionRow>
                    <TradeResultsCard transaction={finalOrderDetails} />
                </>
            ) : (
                <SlotsContainer
                    className="container"
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    {[0, 1, 2, 3].map(item => (
                        <Slot
                            key={item}
                            title={item < options.length && options?.[item].title}
                            options={(item < options.length && options?.[item].options) || []}
                            target={targets[item] || null}
                            index={item}
                        />
                    ))}
                </SlotsContainer>
            )}
        </Container>
    );
}
