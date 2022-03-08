import { useState } from 'react';
import Link from 'next/link';
import { useUser } from 'shared/contexts/UserContext';
import { truncateAddress } from 'shared/utils/contentHelpers';
import { IconButton, Loading } from 'components/common';
import { Menu } from 'components/common/Dropdown/styles';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';
import { WalletConnectionStatus } from 'types/Wallet';
import { prettifyEther } from 'shared/utils/wallet';
import NavLink from '../NavLink';
import AccountModal from '../../AppLayout/AccountModal';
import NetworkDropdown from '../../AppLayout/NetworkDropdown';
import NetworkButton from '../../AppLayout/NetworkButton';
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
    UserAddress,
    ConnectButton,
    SpilloverDropdown,
    NavIcon,
    Spark,
} from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Navbar() {
    const { network: selectedNetwork, setNetwork } = useNetworkDetails();
    const { user, walletConnectionStatus, connectWallet, loading: cLoading } = useUser();
    const [isModalVisible, setModalVisible] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showNetworkMenu, setShowNetworkMenu] = useState(false);

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
                                <BrandColumn>
                                    <LogoName>
                                        Random
                                        <Spark delay={7.2} style={{ right: -14 }} />
                                        <Spark delay={1.6} style={{ left: -14 }} />
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
                                        isOpen={showNetworkMenu}
                                        onClick={() => setShowNetworkMenu(!showNetworkMenu)}
                                    />
                                    <NetworkDropdown
                                        isVisible={showNetworkMenu}
                                        close={() => setShowNetworkMenu(false)}
                                        selected={selectedNetwork}
                                        onSelect={handleNetworkSelect}
                                    />
                                </div>
                                <ConnectedUser>
                                    <CurrencyAmount>
                                        {prettifyEther(user.nativeBalance)} {selectedNetwork.symbol}
                                    </CurrencyAmount>
                                    <UserAddress onClick={() => setModalVisible(true)}>
                                        {truncateAddress(user.address)}
                                    </UserAddress>
                                </ConnectedUser>
                            </>
                        ) : (
                            <ConnectButton loading={cLoading} onClick={() => connectWallet()}>
                                {cLoading ? (
                                    <Loading containerStyle={{ minHeight: 21 }} />
                                ) : (
                                    'Connect Wallet'
                                )}
                            </ConnectButton>
                        )}
                        <span style={{ position: 'relative' }}>
                            <IconButton icon="ellipsis-h" onClick={() => setShowMenu(!showMenu)} />
                            <SpilloverDropdown
                                close={() => setShowMenu(false)}
                                isVisible={showMenu}
                            >
                                <Menu>
                                    <NavLink href="/">
                                        <NavIcon icon="dice" size={20} style={{ color: 'white' }} />
                                        Play
                                    </NavLink>
                                    <NavLink href="/history">
                                        <NavIcon
                                            icon="history"
                                            size={20}
                                            style={{ color: 'white' }}
                                        />
                                        History
                                    </NavLink>
                                    <NavLink href="/about">
                                        <NavIcon
                                            icon={['fab', 'readme']}
                                            size={20}
                                            style={{ color: '#f0dfc8' }}
                                        />
                                        About
                                    </NavLink>
                                </Menu>
                            </SpilloverDropdown>
                        </span>
                    </RightSection>
                </NavContent>
            </NavbarContainer>
            <AccountModal isVisible={isModalVisible} close={() => setModalVisible(false)} />
        </>
    );
}
