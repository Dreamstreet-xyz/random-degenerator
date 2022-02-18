import {
    Container,
    Dot,
    LoadingText,
    SquareContainer,
    SquareSpinnerContainer,
    SquareSpinner,
    Spinner,
    SpinnerContainer,
} from './styles';

export default function Loading({ style, containerStyle }) {
    return (
        <Container style={containerStyle}>
            <Dot style={style} />
            <Dot delay={0.3} style={style} />
            <Dot delay={0.6} style={style} />
        </Container>
    );
}

export function SquareLoadingSpinner({ containerStyle }) {
    return (
        <SquareContainer style={containerStyle}>
            <SquareSpinnerContainer>
                <div />
                <SquareSpinner />
                <div />
                <SquareSpinner />
                <div />
                <SquareSpinner />
                <div />
                <SquareSpinner />
                <div />
            </SquareSpinnerContainer>
            <LoadingText>Loading...</LoadingText>
        </SquareContainer>
    );
}

export function LoadingSpinner({ containerStyle, width = 32 }) {
    return (
        <SpinnerContainer style={containerStyle}>
            <Spinner width={width} />
        </SpinnerContainer>
    );
}
