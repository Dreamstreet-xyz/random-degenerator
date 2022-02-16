import { useState, useEffect } from 'react';
import { truncateAddress } from 'shared/utils/contentHelpers';
import { useUser } from 'shared/contexts/UserContext';
import { Icon, Modal } from 'components/common';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';
import { copy } from 'shared/utils/clipboard';
import { WalletConnectionStatus } from 'types/Wallet';
import {
    ModalBody,
    BasicInfo,
    ProviderRow,
    Provider,
    UserInfo,
    Address,
    ActionRow,
    CopyButton,
    ExplorerLink,
    DisconnectButton,
} from './styles';

export default function AccountModal({ isVisible, close, loading }) {
    const { user, walletConnectionStatus, disconnectWallet } = useUser();
    const { network } = useNetworkDetails();
    const [copied, setCopied] = useState(false);

    useEffect(() => {}, [isVisible]);

    const handleDisconnect = () => {
        disconnectWallet();
        close();
    };

    const handleCopy = () => {
        copy(user?.address);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };
    return (
        <Modal
            isVisible={isVisible}
            close={close}
            title="Account"
            titleStyle={{ color: '#6b69ee' }}
            containerStyle={{ maxWidth: 550, width: '100%' }}
        >
            <ModalBody>
                {[
                    WalletConnectionStatus.Connected,
                    WalletConnectionStatus.NetworkMismatch,
                ].includes(walletConnectionStatus) && (
                    <BasicInfo>
                        <ProviderRow>
                            {user?.provider && <Provider>Connected with {user?.provider}</Provider>}
                        </ProviderRow>
                        <UserInfo>
                            <Address>{truncateAddress(user?.address)}</Address>
                        </UserInfo>
                        <ActionRow>
                            <CopyButton onClick={copied ? () => {} : handleCopy}>
                                <Icon icon={['far', 'copy']} size={20} style={{ marginRight: 8 }} />
                                {copied ? 'Copied' : 'Copy Address'}
                            </CopyButton>
                            <ExplorerLink
                                href={`${network.addressUrl}/${user.address}`}
                                target="_blank"
                            >
                                <Icon
                                    icon="external-link-alt"
                                    size={20}
                                    style={{ marginRight: 8 }}
                                />
                                View on Explorer
                            </ExplorerLink>
                            <DisconnectButton onClick={handleDisconnect}>
                                <Icon icon="sign-out-alt" size={20} style={{ marginRight: 8 }} />
                                Disconnect
                            </DisconnectButton>
                        </ActionRow>
                    </BasicInfo>
                )}
            </ModalBody>
        </Modal>
    );
}
