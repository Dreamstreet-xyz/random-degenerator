import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
    display: flex;
    margin-bottom: 16px;
    align-items: center;
    justify-content: center;
    max-width: 500px;
    width: 100%;
`;

export const StepContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Step = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 3px solid pink;
    margin-bottom: 8px;
`;

export const StepTitle = styled.span`

`;

export const Circle = styled.div`
    position: relative;
    display: block;
    width: 80px;
    height: 80px;
    border: 6px solid #221a50;
    border-radius: 50%;

    &::before {
        position: absolute;
        top: -6px;
        left: -6px;
        width: 80px;
        height: 80px;
        content: "";
        display: block;
        border-radius: 50%;
        background: radial-gradient(transparent 58.75%, #e546f3 59%);
        mask-image: ${({ percentage }) => `conic-gradient(white calc(${percentage} * 360deg), transparent calc(${percentage} * 360deg))`};
        -webkit-mask-image: ${({ percentage }) => `conic-gradient(white calc(${percentage} * 360deg), transparent calc(${percentage} * 360deg))`};
    }
`;

export const InnerProgress = styled.span`
    position: relative;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -6px;
    left: -6px;
    font-weight: bold;
`;
