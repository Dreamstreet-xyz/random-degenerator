import { useState } from 'react';
import Link from 'next/link';
import { useUser } from 'shared/contexts/UserContext';
import { truncateAddress } from 'shared/utils/contentHelpers';
import { Loading } from 'components/common';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';
import { WalletConnectionStatus } from 'types/Wallet';
import { prettifyEther } from 'shared/utils/wallet';
import NavLink from 'components/common/NavLink';
import { Spark } from 'components/misc/Spark';
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
    UserAddress,
    ConnectButton,
    SpilloverButton,
    SpilloverDropdown,
    NavIcon,
} from './styles';

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
                                        <span>Random</span>
                                        <Spark delay={1.6} style={{ left: -12, top: -4 }} />
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
                        <span style={{ position: 'relative', cursor: 'pointer' }}>
                            <SpilloverButton
                                icon="ellipsis-h"
                                onClick={() => setShowMenu(!showMenu)}
                                isOpen={showMenu}
                            />
                            <SpilloverDropdown
                                close={() => setShowMenu(false)}
                                isVisible={showMenu}
                            >
                                <NavLink href="/">
                                    <NavIcon icon="dice" size={20} style={{ color: '#fff' }} />
                                    Play
                                </NavLink>
                                <NavLink href="/history">
                                    <NavIcon icon="history" size={20} style={{ color: '#fff' }} />
                                    History
                                </NavLink>
                                <NavLink href="/about">
                                    <NavIcon
                                        icon={['fab', 'readme']}
                                        size={20}
                                        style={{ color: '#fff' }}
                                    />
                                    About
                                </NavLink>
                            </SpilloverDropdown>
                        </span>
                    </RightSection>
                </NavContent>
            </NavbarContainer>
            <AccountModal isVisible={isModalVisible} close={() => setModalVisible(false)} />
        </>
    );
}
