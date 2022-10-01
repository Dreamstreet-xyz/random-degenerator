/* eslint-disable indent */
import { Icon } from 'components/common';
import { Menu } from 'components/common/Dropdown/styles';
import networks from 'shared/constants/networks';
import { Dropdown, NetworkContainer, Network, NetworkIcon, Link, LinksContainer } from './styles';

export default function NetworkDropdown({ isVisible, close, selected, onSelect }) {
    const handleSelect = network => {
        onSelect?.(network);
        close();
    };

    return (
        <Dropdown close={close} isVisible={isVisible}>
            <Menu>
                {networks.map(network => (
                    <NetworkContainer selected={selected.chainName === network.chainName}>
                        <Network
                            key={network.chainName}
                            id={network.chainName}
                            onClick={() => handleSelect(network)}
                        >
                            <NetworkIcon src={network.icon} />
                            {network.chainName}
                        </Network>
                        {selected.chainName === network.chainName &&
                            selected.chainName === 'Polygon' && (
                                <LinksContainer key={network.chainName}>
                                    <Link
                                        href="https://wallet.polygon.technology/bridge"
                                        target="_blank"
                                    >
                                        Polygon Bridge
                                        <Icon
                                            icon="arrow-circle-right"
                                            size={14}
                                            style={{
                                                marginLeft: 'auto',
                                                transform: 'rotate(-45deg)',
                                            }}
                                        />
                                    </Link>
                                </LinksContainer>
                            )}
                    </NetworkContainer>
                ))}
            </Menu>
        </Dropdown>
    );
}
