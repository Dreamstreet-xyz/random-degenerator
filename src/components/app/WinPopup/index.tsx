import { animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Overlay, Container, Row, WinAmount, Unit } from './styles';

function WinCounter({ to }) {
    const nodeRef = useRef();

    useEffect(() => {
        const node = nodeRef.current;

        const controls = animate(0, to, {
            duration: 2,
            onUpdate(value) {
                node.textContent = value.toFixed(0);
            },
        });

        return () => controls.stop();
    }, [to]);

    return <WinAmount ref={nodeRef} />;
}

export default function WinPopup({ win, close }) {
    if (!win) return null;
    return (
        <Overlay onClick={close}>
            <Container>
                <Row>
                    <WinCounter to={win} />
                    <Unit>DAI</Unit>
                </Row>
            </Container>
        </Overlay>
    );
}
