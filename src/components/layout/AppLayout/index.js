import styled from 'styled-components';
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
    bottom: 4px;
    left: 4px;
    z-index: 3;
    display: flex;
`;

const Telegram = styled.img`
    &:hover,
    &:active {
        filter: brightness(85%);
    }
`;

export default function AppLayout({ children }) {
    return (
        <Container>
            <Navbar />
            <StarsCanvas />
            <Content>{children}</Content>
            <MiscControls>
                <Tooltip content="Come join our telegram!">
                    <span
                        style={{
                            width: 36,
                            height: 36,
                        }}
                    >
                        <a href="https://t.me/randomdegenerator" target="_blank">
                            <Telegram
                                src="images/telegram_logo_borderless.png"
                                style={{
                                    width: 18,
                                    height: 18,
                                    display: 'block',
                                    margin: '10px 8px 8px 4px',
                                }}
                            />
                        </a>
                    </span>
                </Tooltip>
            </MiscControls>
        </Container>
    );
}

AppLayout.showMainLayout = false;
