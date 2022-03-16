import { Tooltip } from 'components/common';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';
import { Container, SlowIndicator, SlowImage, GasIndicator, BlockIndicator } from './styles';

export default function NetworkInfo({ slow, gas, block }) {
    // TODO: add network configs and set in usedapp + use here?
    const { network } = useNetworkDetails();
    return (
        <Container>
            {slow && (
                <SlowIndicator target="_blank">
                    <Tooltip
                        content={`${network.chainName} is experiencing stability issues, transactions may take longer than normal`}
                    >
                        <SlowImage src="images/noun/tortoise.png" />
                    </Tooltip>
                </SlowIndicator>
            )}
            {gas && (
                <Tooltip content="Most recent Polygon fastest gas price">
                    <GasIndicator
                        href={network.gasUrl}
                        target="_blank"
                        gradient={['#78f578', '#6affa3', '#78f578']}
                    >
                        {Math.trunc(gas)} gwei
                    </GasIndicator>
                </Tooltip>
            )}
            {block && (
                <Tooltip content="Latest Polygon block">
                    <BlockIndicator
                        href={network.blocksUrl}
                        target="_blank"
                        gradient={['#ff0697', '#ff05f3', '#ff0697']}
                    >
                        {block}
                    </BlockIndicator>
                </Tooltip>
            )}
        </Container>
    );
}
