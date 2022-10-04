import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon, Range, Tooltip } from 'components/common';
import { useUser } from 'shared/contexts/UserContext';
import { prettifyEther } from 'shared/utils/wallet';
import { GainsDataStoreInterface } from 'shared/stores/GainsDataStore';
import {
    useActiveGainsDataStore,
    ActiveGainsDataStoreInterface,
} from 'shared/stores/ActiveGainsDataStore';
import { getMinLevForPosSizeAllPairs } from 'shared/utils/gains/pairs';
import {
    Container,
    Header,
    HeaderRight,
    Title,
    GasIndicator,
    GasPrice,
    SettingsButton,
    FieldContainer,
    ActionRow,
    SubmitButton,
} from './styles';
import { WalletConnectionStatus } from 'types/Wallet';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';
import styled from 'styled-components';
import { textGradientCustom } from 'shared/styles';
import SettingsDropdown from './SettingsDropdown';
import { PlayFormSettingsType, DegenLevel } from 'types/Trade';

const getCharacterWidth = char => {
    switch (char) {
        case '0':
            return 25;
        case '1':
            return 15;
        case '2':
            return 22;
        case '3':
            return 22;
        case '4':
            return 25;
        case '5':
            return 22;
        case '6':
            return 23;
        case '7':
            return 23;
        case '8':
            return 24;
        case '9':
            return 23;
        default:
            return 24;
    }
};

const getValueWidth = value => {
    if (!value) return 0;
    let width = 0;
    for (let i = 0; i < value.length; i++) {
        width += getCharacterWidth(value.charAt(i));
    }
    return width;
};

const RangeInputsRow = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    margin-bottom: 16px;
    left: -8px;
`;

const BetInput = styled.input`
    width: ${({ value }) => `${getValueWidth(value)}px`};
    text-align: left;
    min-width: 26px;
    background-color: transparent;
    font-size: 36px;
    font-weight: bold;
    font-family: Montserrat;
    padding: 8px 8px 0 8px;
    border: none;
    border-bottom: 3px solid #5526c4;
    border-radius: 0;
    outline: none;
    caret-color: #ff37a5;
    color: #ff86f5;

    &:focus {
        border-bottom: 3px solid #c23bb7;
    }

    @media (min-width: 501px) {
        ${textGradientCustom(['#ff86f5', '#fd8ba8'])}
    }

    @media (max-width: 500px) {
        font-size: 7vw;
        width: 100%;
        text-align: ${({ alignRight }) => alignRight && 'right'};
    }
`;

const Dash = styled.span`
    font-size: 48px;
    font-weight: bold;
    font-family: Montserrat;
    ${textGradientCustom(['#ff86f5', '#fd8ba8'])}

    @media (max-width: 500px) {
        font-size: 8vw;
    }
`;

const TokenName = styled.div`
    font-size: 36px;
    font-weight: bold;
    font-family: Montserrat;
    margin-bottom: -4px;
    color: #6c5eee;

    @media (max-width: 500px) {
        font-size: 7vw;
    }
`;

const Leverage = styled.p`
    color: white;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;

    @media (max-width: 500px) {
        font-size: 5vw;
    }
`;

export interface PlayFormInputType {
    gas: number;
    onPlay: () => void;
    bet: string[];
    setBet: (bet: string[]) => void;
    settings: PlayFormSettingsType;
    setSettings: (settings: PlayFormSettingsType) => void;
    daiApproved: boolean;
    onDaiApprove: () => void;
    daiLoading: boolean;
}

export default function PlayForm({
    gas,
    onPlay,
    bet,
    setBet,
    settings,
    setSettings,
    daiApproved,
    onDaiApprove,
    daiLoading,
}: PlayFormInputType) {
    const { degenLevel } = settings;
    const [loading, setLoading] = useState(false);
    const { user, walletConnectionStatus } = useUser();
    const useGainsDataStore = useActiveGainsDataStore(
        (state: ActiveGainsDataStoreInterface) => state.store
    );
    const tradingVariables = useGainsDataStore(
        (state: GainsDataStoreInterface) => state.tradingVariables
    );
    const getMinimumLeverage = useCallback(() => {
        console.log('Getting minimum leverage', tradingVariables);
        try {
            return getMinLevForPosSizeAllPairs(Number(bet[0]), tradingVariables);
        } catch (e) {
            return 0;
        }
    }, [bet, tradingVariables]);

    const [curMinLev, setCurMinLev] = useState(null);
    const { network } = useNetworkDetails();
    const [isSettingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
    const settingsToggleRef = useRef(null);

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onPlay?.();
        }, 0);
    };

    useEffect(() => setCurMinLev(getMinimumLeverage()), [bet, tradingVariables]);

    const connected = walletConnectionStatus === WalletConnectionStatus.Connected;
    return (
        <Container
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            glow={degenLevel === DegenLevel.high}
        >
            <Header>
                <Tooltip content="you know you wanna 🤌">
                    <Title>Place a Trade</Title>
                </Tooltip>
                <HeaderRight>
                    {gas && (
                        <Tooltip content="Most recent Polygon fastest gas price">
                            <GasIndicator gradient={['#78f578', '#6affa3', '#78f578']}>
                                <Icon icon="gas-pump" size={16} style={{ marginRight: 4 }} />
                                <GasPrice>{Math.trunc(gas)}</GasPrice>
                            </GasIndicator>
                        </Tooltip>
                    )}
                    <div style={{ position: 'relative' }}>
                        <div style={{ cursor: 'pointer' }}>
                            <SettingsButton
                                onClick={() => setSettingsDropdownOpen(!isSettingsDropdownOpen)}
                                isOpen={isSettingsDropdownOpen}
                                ref={settingsToggleRef}
                            />
                        </div>
                        <SettingsDropdown
                            settings={settings}
                            setSettings={setSettings}
                            close={() => setSettingsDropdownOpen(false)}
                            isOpen={isSettingsDropdownOpen}
                            toggleRef={settingsToggleRef}
                        />
                    </div>
                </HeaderRight>
            </Header>
            {user.daiBalance && (
                <form onSubmit={handleSubmit}>
                    <FieldContainer>
                        <RangeInputsRow>
                            <BetInput
                                value={bet[0]?.toString()}
                                onChange={e => setBet([e.target.value, bet[1]])}
                                maxLength={5}
                                alignRight
                            />
                            <Dash>-</Dash>
                            <BetInput
                                value={bet[1]?.toString()}
                                onChange={e => setBet([bet[0], e.target.value])}
                                maxLength={5}
                            />
                            <TokenName>DAI</TokenName>
                        </RangeInputsRow>
                        {/* <Leverage>{`Leverage: ${curMinLev}x - 1000x`}</Leverage> */}
                        {tradingVariables && (
                            <Range
                                min={tradingVariables.minPosDaiInt}
                                max={Math.floor(
                                    Math.min(
                                        tradingVariables.maxPosDaiInt,
                                        parseInt(prettifyEther(user.daiBalance))
                                    )
                                )}
                                value={bet}
                                onChange={value => setBet(value)}
                                tipFormatter={value => `${value}`}
                            />
                        )}
                    </FieldContainer>
                    <ActionRow>
                        {connected && daiApproved && (
                            <SubmitButton
                                type="submit"
                                title="Play"
                                loading={loading}
                                disabled={loading || !connected || !network.isActive}
                            />
                        )}
                        {!daiApproved && (
                            <SubmitButton
                                title="Approve DAI"
                                loading={daiLoading}
                                disabled={daiLoading || !network.isActive}
                                onClick={onDaiApprove}
                            />
                        )}
                    </ActionRow>
                </form>
            )}
        </Container>
    );
}
