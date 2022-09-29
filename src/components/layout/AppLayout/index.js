import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IconButton, Tooltip } from 'components/common';
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

const MiscButton = styled(IconButton)`
    && {
        background-color: transparent;
        &:hover,
        &:active {
            background-color: transparent;
        }
    }
`;

const Telegram = styled.img`
    &:hover,
    &:active {
        filter: brightness(85%);
    }
`;

export default function AppLayout({ children }) {
    const [showStars, setShowStars] = useState(true);

    useEffect(() => {
        const storedStars = JSON.parse(localStorage.getItem('ds:stars') ?? true);
        setShowStars(storedStars);
    }, []);

    const toggleStars = () => {
        localStorage.setItem('ds:stars', JSON.stringify(!showStars));
        setShowStars(!showStars);
    };

    return (
        <Container>
            <Navbar />
            {showStars && <StarsCanvas />}
            <Content>{children}</Content>
            <MiscControls>
                <Tooltip content={`${showStars ? 'Disable' : 'Enable'} background stars`}>
                    <span>
                        <MiscButton
                            icon="star"
                            onClick={toggleStars}
                            color={showStars ? 'gold' : '#52388f'}
                        />
                    </span>
                </Tooltip>
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
