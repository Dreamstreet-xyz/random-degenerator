import styled, { keyframes } from 'styled-components';
import { Tooltip } from 'components/common';
import StarsCanvas from './StarsCanvas';
import Navbar from './Navbar';

const Container = styled.div`
    position: relative;
    background: transparent;
`;

const Content = styled.div`
    min-height: 100vh;
`;

const MiscControls = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 4px 8px;
`;

const Telegram = styled.img`
    width: 18px;
    height: 18px;
    &:hover,
    &:active {
        filter: brightness(85%);
    }
`;

const SpotifyLink = styled.a``;

const SpotifyLogo = styled.img`
    width: 20px;
    background-color: black;
    border-radius: 50%;
`;

const Footer = styled.div`
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 32px;

    &:hover {
        & > div {
            animation-play-state: paused;
        }
    }
`;

const marquee = keyframes`
    from {
        transform: translateX(100vw);
    }
    to {
        transform: translateX(-100%);
    }
`;

const Marquee = styled.div`
    display: flex;
    gap: 32px;
    font-size: 13px;
    animation-name: ${marquee};
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-duration: 8s;

    @media (min-width: 500px) {
        animation-duration: 10s;
    }
    @media (min-width: 850px) {
        animation-duration: 14s;
    }
    @media (min-width: 1200px) {
        animation-duration: 18s;
    }
`;

const Winners = styled.span`
    display: flex;
    gap: 16px;
    color: #23fca9;
`;

const Losers = styled.span`
    display: flex;
    gap: 16px;
    color: #fc238f;
`;
export default function AppLayout({ children }) {
    return (
        <Container>
            <Navbar />
            <StarsCanvas />
            <Content>{children}</Content>
            <MiscControls>
                <Tooltip content="Come join our telegram!">
                    <span>
                        <a href="https://t.me/randomdegenerator" target="_blank">
                            <Telegram src="images/telegram_logo_borderless.png" />
                        </a>
                    </span>
                </Tooltip>
                <Tooltip content="Listen to our Spotify playlist!">
                    <span>
                        <SpotifyLink
                            href="https://open.spotify.com/playlist/7pZlODVzhEr1kTE0MupUUW"
                            target="_blank"
                        >
                            <SpotifyLogo src="images/spotify_logo.svg" />
                        </SpotifyLink>
                    </span>
                </Tooltip>
            </MiscControls>
            <Footer>
                <Marquee>
                    <Winners>
                        <span>Today's top winners: </span>
                        <span>0xa14df +332%</span>
                        <span>0xfd4ac +283%</span>
                        <span>0xfcd19 +254%</span>
                        <span>0xd14df +173%</span>
                    </Winners>
                    <Losers>
                        <span>Today's top losers: </span>
                        <span>0xfdfdf -332%</span>
                        <span>0xfafafa -283%</span>
                        <span>0xf5d5d5 -254%</span>
                        <span>0xa1b1fd -173%</span>
                    </Losers>
                </Marquee>
            </Footer>
        </Container>
    );
}

AppLayout.showMainLayout = false;
