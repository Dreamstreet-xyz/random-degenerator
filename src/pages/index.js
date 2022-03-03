import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useViewportScroll, useTransform } from 'framer-motion';
import AppLayout from 'components/layout/AppLayout';
import MainApp from 'components/app/MainApp';
import Leaderboard from 'components/app/Leaderboard';
import NetworkInfo from 'components/app/NetworkInfo';
import { Sun, SunGradient, SunGradientCity, City, Grid } from 'components/app/decorations';
import useGasStation from 'shared/hooks/useGasStation';
import { formatUnits } from '@ethersproject/units';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';

const Container = styled.div`
    position: relative;
`;
export default function Home() {
    const { scrollYProgress } = useViewportScroll();
    const translateY = useTransform(scrollYProgress, [0.75, 1], [107, 0]);
    const sunGradientOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
    const cityGradientOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
    const [networkInfo, setNetworkInfo] = useState(null);
    const { getGasStationPayload } = useGasStation();
    const { network } = useNetworkDetails();

    useEffect(() => {
        fetchGas();
        const intervalId = setInterval(() => {
            fetchGas();
        }, 5000);

        function fetchGas() {
            getGasStationPayload()
                .then(json => {
                    setNetworkInfo(json);
                })
                .catch(() => {
                    console.log('Failed to fetch polygon gas prices...');
                });
        }

        return () => clearInterval(intervalId);
    }, [network]);

    return (
        <Container>
            <MainApp gas={networkInfo?.fast.maxPriorityFee} />
            <Sun style={{ translateY }} />
            <City />
            <SunGradient style={{ translateY, opacity: sunGradientOpacity }} />
            <Grid />
            <SunGradientCity style={{ opacity: cityGradientOpacity }} />
            {networkInfo && (
                <NetworkInfo
                    gas={networkInfo.fast.maxPriorityFee}
                    block={networkInfo.blockNumber}
                />
            )}
        </Container>
    );
}

Home.layout = AppLayout;
