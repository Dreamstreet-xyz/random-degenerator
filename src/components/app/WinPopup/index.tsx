import { useEffect, useRef } from 'react';
import { animate, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import useAudio from 'shared/hooks/useAudio';
import useWindowSize from 'shared/hooks/useWindowSize';
import { Overlay, Container, Row, WinAmount, Unit, Title } from './styles';

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

const getWinType = (win, pnlPercent) => {
    if (win >= 200 && pnlPercent >= 100) return 'BIG_WIN';
    if (pnlPercent >= 100) return 'BIG_PNL';
    if (pnlPercent >= 50) return 'NICE_PNL';
    return 'NORMAL';
};

export default function WinPopup({ win, close }) {
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
            if (winType === 'BIG_WIN') play();
            if (winType === 'BIG_PNL' || winType === 'NICE_PNL') smallPlay();
        }

        return () => {
            smallStop();
            stop();
        };
    }, [win]);

    const showConfetti = winType === 'BIG_PNL' || winType === 'BIG_WIN';

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
                        <Title>You've won! 🎉</Title>
                        <Row
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                type: 'spring',
                                duration: 0.4,
                                bounce: 0.35,
                            }}
                        >
                            {winType === 'BIG_WIN' ? (
                                <BigWinCounter to={win?.dai} />
                            ) : (
                                <WinCounter to={win?.dai} />
                            )}
                            <Unit>DAI</Unit>
                        </Row>
                    </Container>
                </Overlay>
            )}
        </AnimatePresence>
    );
}
