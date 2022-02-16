import { Menu } from 'components/common/Dropdown/styles';
import networks from 'shared/constants/networks';
import { Dropdown, Network, NetworkIcon } from './styles';

export default function NetworkDropdown({ isVisible, close, selected, onSelect }) {
    const handleSelect = network => {
        onSelect?.(network);
        close();
    };

    return (
        <Dropdown close={close} isVisible={isVisible}>
            <Menu>
                {networks.map(network => (
                    <Network
                        key={network.chainName}
                        id={network.chainName}
                        onClick={() => handleSelect(network)}
                        selected={selected.chainName === network.chainName}
                    >
                        <NetworkIcon src={network.icon} />
                        {network.chainName}
                    </Network>
                ))}
            </Menu>
        </Dropdown>
    );
}
