import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useViewportScroll, useTransform } from 'framer-motion';
import AppLayout from 'components/layout/AppLayout';
import MainApp from 'components/app/MainApp';
import Leaderboard from 'components/app/Leaderboard';
import NetworkInfo from 'components/app/NetworkInfo';
import { Sun, SunGradient, SunGradientCity, City, Grid } from 'components/app/decorations';

const Container = styled.div`
    position: relative;
`;
export default function Home() {
    const { scrollYProgress } = useViewportScroll();
    const translateY = useTransform(scrollYProgress, [0.75, 1], [107, 0]);
    const sunGradientOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
    const cityGradientOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
    const [networkInfo, setNetworkInfo] = useState(null);

    useEffect(() => {
        fetchGas();
        const intervalId = setInterval(() => {
            fetchGas();
        }, 40000);

        function fetchGas() {
            fetch('https://gasstation-mainnet.matic.network')
                .then(response => response.json())
                .then(json => {
                    setNetworkInfo(json);
                })
                .catch(() => {
                    console.log('Failed to fetch polygon gas prices...');
                });
        }

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Container>
            <MainApp gas={networkInfo?.fastest} />
            <Sun style={{ translateY }} />
            <City />
            <SunGradient style={{ translateY, opacity: sunGradientOpacity }} />
            <Grid />
            <SunGradientCity style={{ opacity: cityGradientOpacity }} />
            {networkInfo && (
                <NetworkInfo gas={networkInfo.fastest} block={networkInfo.blockNumber} />
            )}
        </Container>
    );
}

Home.layout = AppLayout;
