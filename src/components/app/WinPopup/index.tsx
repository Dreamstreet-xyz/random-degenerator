import { useEffect, useRef } from 'react';
import { animate, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import useAudio from 'shared/hooks/useAudio';
import useWindowSize from 'shared/hooks/useWindowSize';
import { CelebrationType, Win } from 'types/Trade/Celebration';
import {
    Overlay,
    Container,
    Header,
    Logo,
    Title,
    Content,
    WinRow,
    WinAmount,
    Unit,
} from './styles';

function BigWinCounter({ to }) {
    const nodeRef = useRef();

    useEffect(() => {
        const node = nodeRef.current;

        const controls = animate(0, to, {
            duration: 3.1,
            onUpdate(value) {
                node.textContent = value.toFixed(0);
            },
        });

        return () => controls.stop();
    }, [to]);

    return <WinAmount ref={nodeRef} />;
}

function WinCounter({ to }) {
    return <WinAmount>{Number(to).toFixed(0)}</WinAmount>;
}

export const getWinType = (win, pnlPercent): CelebrationType => {
    if (win >= 200 && pnlPercent >= 100) return CelebrationType.BIG_WIN;
    if (pnlPercent >= 100) return CelebrationType.BIG_PNL;
    if (pnlPercent >= 50) return CelebrationType.NICE_PNL;
    return CelebrationType.NORMAL;
};

export default function WinPopup({ win, close }: { win: Win; close: () => void }) {
    const size = useWindowSize();
    const { play, stop } = useAudio('audio/big_win.ogg');
    const { play: smallPlay, stop: smallStop } = useAudio('audio/win.m4a');

    const winType = getWinType(win?.dai, win?.percent);

    useEffect(() => {
        let timeout;
        if (win) {
            timeout = setTimeout(() => {
                close();
            }, 6000);
        }

        return () => clearTimeout(timeout);
    }, [win]);

    useEffect(() => {
        if (win) {
            if (winType === CelebrationType.BIG_WIN) play();
            if (winType === CelebrationType.BIG_PNL || winType === CelebrationType.NICE_PNL)
                smallPlay();
        }

        return () => {
            smallStop();
            stop();
        };
    }, [win]);

    const showConfetti = winType === CelebrationType.BIG_PNL || winType === CelebrationType.BIG_WIN;

    return (
        <AnimatePresence>
            {win && (
                <Overlay
                    onClick={close}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {showConfetti && (
                        <Confetti
                            width={size?.width || 1920}
                            height={size?.height || 1080}
                            recycle={false}
                            numberOfPieces={400}
                        />
                    )}
                    <Container
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ x: 500 }}
                        transition={{ type: 'spring', duration: 0.2, bounce: 0.35 }}
                    >
                        <Header>
                            <Logo src="images/rdg_logo.png" />
                            <Title>You've won! 🎉</Title>
                        </Header>
                        <Content>
                            <WinRow
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    type: 'spring',
                                    duration: 0.4,
                                    bounce: 0.35,
                                }}
                            >
                                {winType === CelebrationType.BIG_WIN ? (
                                    <BigWinCounter to={win?.dai} />
                                ) : (
                                    <WinCounter to={win?.dai} />
                                )}
                                <Unit>DAI</Unit>
                            </WinRow>
                        </Content>
                    </Container>
                </Overlay>
            )}
        </AnimatePresence>
    );
}
