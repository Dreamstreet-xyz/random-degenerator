import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useViewportScroll, useTransform } from 'framer-motion';
import AppLayout from 'components/layout/AppLayout';
import MainApp from 'components/app/MainApp';
import Leaderboard from 'components/app/Leaderboard';
import NetworkInfo from 'components/app/NetworkInfo';
import { Sun, SunGradient, SunGradientCity, City, Grid } from 'components/app/decorations';
import { Banner as DefaultBanner } from 'components/common';
import useGasStation from 'shared/hooks/useGasStation';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';
import { polygon } from 'shared/constants/networks';
import WinPopup from 'components/app/WinPopup';

const Container = styled.div`
    position: relative;
`;

const StickyContainer = styled.div`
    position: absolute;
    width: 100%;
    z-index: 3;
    height: 100vh;
    pointer-events: none;
`;

export const AnnouncementBannerContainer = styled.div`
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 3;
    background: linear-gradient(45deg, #5835f5cc, #ac46ffcc);
    pointer-events: initial;
`;

export const AnnouncementBanner = styled(DefaultBanner)`
    z-index: 3;
    margin: 0 auto;
    margin-top: 96px;
    max-width: 600px;
    padding: 16px;
    background-color: transparent;

    @media (max-width: 500px) {
        margin-top: 64px;
    }
`;

export const WinButton = styled.button`
    position: fixed;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    z-index: 5;
    background-color: #5222aa;
`;

export default function Home() {
    const { scrollYProgress } = useViewportScroll();
    const translateY = useTransform(scrollYProgress, [0.75, 1], [107, 0]);
    const sunGradientOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
    const cityGradientOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
    const [networkInfo, setNetworkInfo] = useState(null);
    const [win, setWin] = useState(null);
    const { getGasStationPayload } = useGasStation();
    const { network } = useNetworkDetails();
    const [announcement, setAnnouncement] = useState({
        display: false,
        message:
            'Polygon is less stable than usual. Extra block confirmations are required so be patient while playing.',
        close: () => setAnnouncement({ ...announcement, display: false }),
    });

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
            {network.chainId === polygon.chainId && announcement?.display && (
                <StickyContainer>
                    <AnnouncementBannerContainer>
                        <AnnouncementBanner
                            message={announcement?.message}
                            close={announcement?.close}
                            iconStyle={{ top: -10 }}
                        />
                    </AnnouncementBannerContainer>
                </StickyContainer>
            )}
            <MainApp gas={networkInfo?.fast.maxPriorityFee} />
            <Sun style={{ translateY }} />
            <City />
            <SunGradient style={{ translateY, opacity: sunGradientOpacity }} />
            <Grid />
            <SunGradientCity style={{ opacity: cityGradientOpacity }} />
            {networkInfo && (
                <NetworkInfo
                    slow={network.chainId === polygon.chainId}
                    gas={networkInfo.fast.maxPriorityFee}
                    block={networkInfo.blockNumber}
                />
            )}
            <WinPopup win={win} close={() => setWin(null)} />
            <WinButton onClick={() => setWin({ dai: 482, percent: 500 })} />
        </Container>
    );
}

Home.layout = AppLayout;
