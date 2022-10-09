/* eslint-disable indent */
import { Icon } from 'components/common';
import { Menu } from 'components/common/Dropdown/styles';
import networks from 'shared/constants/networks';
import {
    Dropdown,
    Title,
    Networks,
    NetworkOption,
    NetworkIcon,
    Link,
    LinksContainer,
    Practice,
} from './styles';

export default function NetworkDropdown({ isOpen, close, selected, onSelect, toggleRef }) {
    const handleSelect = network => {
        onSelect?.(network);
        close();
    };

    return (
        <Dropdown close={close} isOpen={isOpen} toggleRef={toggleRef}>
            <Menu style={{ paddingTop: 8 }}>
                <Title>Select a network</Title>
                <Networks>
                    {networks.map(network => (
                        <NetworkOption
                            key={network.chainName}
                            id={network.chainName}
                            isSelected={selected.chainName === network.chainName}
                            onClick={() => handleSelect(network)}
                        >
                            <NetworkIcon src={network.icon} />
                            {network.chainName}
                            {network.chainName === 'Mumbai' && <Practice>Practice</Practice>}
                        </NetworkOption>
                    ))}
                </Networks>
                {selected.chainName === 'Polygon' && (
                    <LinksContainer>
                        <Link href="https://wallet.polygon.technology/bridge" target="_blank">
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
            </Menu>
        </Dropdown>
    );
}
