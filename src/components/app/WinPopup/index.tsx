import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';
import Confetti from 'react-confetti';
import useAudio from 'shared/hooks/useAudio';
import useWindowSize from 'shared/hooks/useWindowSize';
import { Overlay, Container, Row, WinAmount, Unit, Title } from './styles';

function WinCounter({ to }) {
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

export default function WinPopup({ win, close }) {
    const { play, stop } = useAudio('audio/big_win.ogg');
    const size = null;

    useEffect(() => {
        if (win) play();

        return () => stop();
    }, [win]);

    if (!win) return null;

    return (
        <Overlay onClick={close}>
            <Confetti
                width={size?.width || 1920}
                height={size?.height || 1080}
                recycle={false}
                numberOfPieces={400}
            />
            <Container
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', duration: 0.2, bounce: 0.35 }}
            >
                <Title>You've won! 🎉</Title>
                <Row>
                    <WinCounter to={win} />
                    <Unit>DAI</Unit>
                </Row>
            </Container>
        </Overlay>
    );
}
