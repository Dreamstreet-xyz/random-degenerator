import styled, { keyframes } from 'styled-components';

const dotPulse = keyframes`
    0% {
        transform: scale(.8);
        opacity: .8;
    }
    50% {
        transform: scale(1.2);
        opacity: 1;
    }
    100% {
        transform: scale(.8);
        opacity: .8;
    }
`;

export const Container = styled.div`
    display: flex;
    min-height: 32px;
    align-items: center;
    justify-content: center;
`;

export const Dot = styled.div`
    background-color: #ffffff;
    width: 12px;
    height: 12px;
    border-radius: 6px;
    margin: 0 6px;
    animation: ${dotPulse} 1.2s infinite;
    animation-delay: ${({ delay }) => `${delay}s`};
`;

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

export const SquareContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const SquareSpinnerContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 16px;
`;

export const SquareSpinner = styled.div`
    width: 32px;
    height: 32px;
    border: 3px solid #ff40d6;
    animation: ${rotate} 2s infinite;
`;

export const LoadingText = styled.span`
    color: #ff40d6;
    font-weight: bold;
    font-size: 18px;
    font-family: Montserrat;
    text-transform: uppercase;
    animation: ${fadeIn} 1.6s infinite alternate;
`;

export const SpinnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Spinner = styled.div`
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${({ width }) => `${width}px`};
    height: ${({ width }) => `${width}px`};
    border: ${({ width }) => `${width / 8}px solid #fff`};
    border-radius: 50%;
    animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ color }) => `${color} transparent transparent transparent`};
`;
