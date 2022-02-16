import { Container, Dot, LoadingText, Spinner, SpinnerContainer, SquareContainer } from './styles';

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
            <SpinnerContainer>
                <div />
                <Spinner />
                <div />
                <Spinner />
                <div />
                <Spinner />
                <div />
                <Spinner />
                <div />
            </SpinnerContainer>
            <LoadingText>Loading...</LoadingText>
        </SquareContainer>
    );
}
