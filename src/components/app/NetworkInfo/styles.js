import styled, { css } from 'styled-components';
import { animatedTextGradientCustom, shine } from 'shared/styles';

const indicatorStyles = css`
    position: relative;
    font-size: .85rem;
    font-weight: bold;
    color: #ff06ac;
    cursor: pointer;
    text-decoration: none;
    ${({ gradient }) => gradient && animatedTextGradientCustom(gradient)}
    animation: ${shine} 20s linear infinite;
`;

export const Container = styled.div`
    position: fixed;
    bottom: 8px;
    right: 16px;
    z-index: 3;
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
