import styled, { css } from 'styled-components';
import { animatedTextGradientCustom, fadeIn, shine } from 'shared/styles';

export const Container = styled.div`
    position: fixed;
    bottom: 8px;
    right: 16px;
    z-index: 3;
    display: flex;
    align-items: flex-end;
`;

const indicatorStyles = css`
    position: relative;
    font-size: .85rem;
    font-weight: bold;
    color: #ff06ac;
    cursor: pointer;
    text-decoration: none;
    ${({ gradient }) => gradient && animatedTextGradientCustom(gradient)}
    animation: ${shine} 20s linear infinite;
    font-family: 'Fira Mono', monospace;
`;

export const SlowIndicator = styled.a`
    position: relative;
    width: 32px;
    height: 30px;

    &::after {
        content: '';
        height: 0.25em;
        width: 0.25em;
        border-radius: 50%;
        background-color: #48cf70;
        position: absolute;
        right: .5em;
        bottom: 0.40em;
    }
`;

export const SlowImage = styled.img`
    position: absolute;
    top: 6px;
    left: -16px;
    width: 32px;
    height: 32px;
    animation: ${fadeIn} 3s infinite alternate;
`;

export const GasIndicator = styled.a`
    ${indicatorStyles}
    margin-right: 1.5em;
`;

export const BlockIndicator = styled.a`
    ${indicatorStyles}

    &::before {
        content: '';
        height: 0.25em;
        width: 0.25em;
        border-radius: 50%;
        background-color: #ff2f63;
        position: absolute;
        left: -0.9em;
        bottom: 0.45em;
    }
`;
