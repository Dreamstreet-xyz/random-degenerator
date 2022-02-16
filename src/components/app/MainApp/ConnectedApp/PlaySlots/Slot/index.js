/* eslint-disable indent */
import { Container, Title, Card, Column, Spinner, Unconfirmed } from './styles';

export default function Slot({ title, options, target, index }) {
    const slot = {
        hidden: { y: 60, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    const positionInWheel = ix => -ix * (360 / options.length);

    return (
        <Container>
            <div style={{ height: 36 }}>
                {!!title && (
                    <Title
                        style={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'tween', duration: 1 }}
                    >
                        {title}
                    </Title>
                )}
            </div>
            <Card className="slot" variants={slot}>
                {options.length > 0 ? (
                    <Column
                        style={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'tween', duration: 1.5 }}
                    >
                        {options.map((option, ix) => (
                            <Spinner
                                key={ix}
                                style={{
                                    rotateX: positionInWheel(ix),
                                    opacity: 1,
                                    color: '#8a26db',
                                }}
                                animate={{
                                    rotateX: -360 * (6 + target) + positionInWheel(ix - target),
                                    opacity: target ? (ix === target ? 1 : [1, 1, 0]) : 1,
                                    color: target
                                        ? ix === target && [
                                              '#8a26db',
                                              '#8a26db',
                                              '#8a26db',
                                              '#8a26db',
                                              '#ff57e3',
                                          ]
                                        : '#8a26db',
                                }}
                                transition={{
                                    type: 'tween',
                                    duration: 2 + 0.35 * index,
                                    repeat: target ? 0 : Infinity,
                                    ease: target ? 'circOut' : 'linear',
                                }}
                            >
                                {option}
                            </Spinner>
                        ))}
                    </Column>
                ) : (
                    <Unconfirmed>?</Unconfirmed>
                )}
            </Card>
        </Container>
    );
}
