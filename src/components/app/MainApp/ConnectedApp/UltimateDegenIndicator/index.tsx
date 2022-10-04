import { AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
    position: relative;
    top: 0;
    max-width: 600px;
    width: 100%;
`;

const growIn = keyframes`
    from {
        transform: scaleY(0);
        opacity: 0;
    }
    to {
        transform: scaleY(1);
        opacity: 1;
    }
`;

export const popIn = keyframes`
    0% {
        transform: scale(.95);
        opacity: 0;
    }
    70% {
        transform: scale(1.025);
        opacity:1;
    }
    100%{
        transform: scale(1);
        opacity:1;
    }
`;

export const InnerContainer = styled.div`
    position: absolute;
    bottom: 16px;
    flex: 1;
    width: 90%;
    left: 5%;
    z-index: 5;
    transform: scaleY(0);
    opacity: 0;
    height: 175px;
    border-top: 3px solid rgba(255, 255, 255, 0.65);
    transform-origin: bottom;
    animation: ${growIn} 0.25s ease-in-out forwards;

    @media (max-width: 768px) {
        position: relative;
    }
`;

const SpinnerContainer = styled.div`
    position: absolute;
    top: 75px;
    left: 25%;
    opacity: 0;
    scale: 1.05 1;
    transform: scale(0);
    animation: ${popIn} 0.3s ease-in-out forwards;
    animation-delay: 0.25s;
`;

interface UltimateDegenIndicatorProps {
    isEnabled: boolean;
}

export const UltimateDegenIndicator = ({ isEnabled }: UltimateDegenIndicatorProps) => {
    return (
        <Container>
            <AnimatePresence>
                {isEnabled && (
                    <InnerContainer>
                        <SpinnerContainer>
                            <object type="image/svg+xml" data="/images/decorations/infinity.svg">
                                svg-animation
                            </object>
                        </SpinnerContainer>
                    </InnerContainer>
                )}
            </AnimatePresence>
        </Container>
    );
};
