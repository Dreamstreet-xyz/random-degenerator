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
    overflow: hidden;
    height: 30px;
    font-family: 'Fira Mono', monospace;

    @media (max-width: 500px) {
        display: none;
    }

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
    font-size: 12px;
    animation-name: ${marquee};
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-duration: 12s;

    @media (min-width: 500px) {
        animation-duration: 16s;
    }
    @media (min-width: 850px) {
        animation-duration: 20s;
    }
    @media (min-width: 1200px) {
        animation-duration: 24s;
    }
`;

const Winners = styled.span`
    display: flex;
    gap: 16px;
    white-space: nowrap;
    color: #23fca9;
`;

const Losers = styled.span`
    display: flex;
    gap: 16px;
    white-space: nowrap;
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
                <Marquee></Marquee>
            </Footer>
        </Container>
    );
}

AppLayout.showMainLayout = false;
