import { useState, useRef } from 'react';
import Link from 'next/link';
import { useUser } from 'shared/contexts/UserContext';
import { truncateAddress } from 'shared/utils/contentHelpers';
import { Loading } from 'components/common';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';
import { WalletConnectionStatus } from 'types/Wallet';
import { prettifyEther } from 'shared/utils/wallet';
import { Spark } from 'components/misc';
import AccountModal from '../AccountModal';
import NetworkDropdown from '../NetworkDropdown';
import NetworkButton from '../NetworkButton';
import {
    NavbarContainer,
    NavContent,
    LeftSection,
    LogoRow,
    BrandColumn,
    LogoName,
    LogoName2,
    RightSection,
    ConnectedUser,
    CurrencyAmount,
    UserInfo,
    UserAddress,
    ConnectButton,
    SpilloverButton,
    SpilloverDropdown,
    SpilloverMenu,
    SpilloverLink,
    NavIcon,
    Logo,
    UserIcon,
} from './styles';

export default function Navbar() {
    const { network: selectedNetwork, setNetwork } = useNetworkDetails();
    const { user, walletConnectionStatus, connectWallet, loading: cLoading } = useUser();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSpilloverDropdownOpen, setSpilloverDropdownOpen] = useState(false);
    const [isNetworkDropdownOpen, setNetworkDropdownOpen] = useState(false);
    const networkToggleRef = useRef(null);
    const spilloverToggleRef = useRef(null);

    const handleNetworkSelect = network => {
        setNetwork(network);
    };

    const isConnected =
        walletConnectionStatus !== WalletConnectionStatus.Disconnected &&
        walletConnectionStatus !== WalletConnectionStatus.Connecting;

    return (
        <>
            <NavbarContainer>
                <NavContent>
                    <LeftSection>
                        <Link href="/" passHref>
                            <LogoRow>
                                <Logo src="/images/rdg_logo.png" />
                                <BrandColumn>
                                    <LogoName>
                                        <span>Random</span>
                                        <Spark delay={1.6} style={{ left: -14, top: -10 }} />
                                    </LogoName>
                                    <LogoName2>Degenerator</LogoName2>
                                </BrandColumn>
                            </LogoRow>
                        </Link>
                    </LeftSection>
                    <RightSection>
                        {isConnected ? (
                            <>
                                <div style={{ position: 'relative' }}>
                                    <NetworkButton
                                        selected={selectedNetwork}
                                        isOpen={isNetworkDropdownOpen}
                                        onClick={() =>
                                            setNetworkDropdownOpen(!isNetworkDropdownOpen)
                                        }
                                        ref={networkToggleRef}
                                    />
                                    <NetworkDropdown
                                        isOpen={isNetworkDropdownOpen}
                                        close={() => setNetworkDropdownOpen(false)}
                                        selected={selectedNetwork}
                                        onSelect={handleNetworkSelect}
                                        toggleRef={networkToggleRef}
                                    />
                                </div>
                                <ConnectedUser>
                                    <CurrencyAmount>
                                        {prettifyEther(user.nativeBalance)} {selectedNetwork.symbol}
                                    </CurrencyAmount>
                                    <UserInfo onClick={() => setModalVisible(true)}>
                                        <UserAddress>{truncateAddress(user.address)}</UserAddress>
                                        <UserIcon address={user.address} />
                                    </UserInfo>
                                </ConnectedUser>
                            </>
                        ) : (
                            <ConnectButton loading={cLoading} onClick={() => connectWallet()}>
                                {cLoading ? (
                                    <Loading containerStyle={{ minHeight: 21 }} />
                                ) : (
                                    'Connect'
                                )}
                            </ConnectButton>
                        )}
                        <span style={{ position: 'relative' }}>
                            <SpilloverButton
                                icon="ellipsis-h"
                                onClick={() => setSpilloverDropdownOpen(!isSpilloverDropdownOpen)}
                                isOpen={isSpilloverDropdownOpen}
                                ref={spilloverToggleRef}
                            />
                            <SpilloverDropdown
                                close={() => setSpilloverDropdownOpen(false)}
                                isOpen={isSpilloverDropdownOpen}
                                toggleRef={spilloverToggleRef}
                            >
                                <SpilloverMenu>
                                    <SpilloverLink href="/">
                                        <NavIcon
                                            icon="dice"
                                            size={16}
                                            style={{ color: '#d4deff' }}
                                        />
                                        Play
                                    </SpilloverLink>
                                    <SpilloverLink href="/history">
                                        <NavIcon
                                            icon="history"
                                            size={16}
                                            style={{ color: '#d4deff' }}
                                        />
                                        History
                                    </SpilloverLink>
                                    <SpilloverLink href="/about">
                                        <NavIcon
                                            icon={['fab', 'readme']}
                                            size={16}
                                            style={{ color: '#d4deff' }}
                                        />
                                        About
                                    </SpilloverLink>
                                </SpilloverMenu>
                            </SpilloverDropdown>
                        </span>
                    </RightSection>
                </NavContent>
            </NavbarContainer>
            <AccountModal isVisible={isModalVisible} close={() => setModalVisible(false)} />
        </>
    );
}
