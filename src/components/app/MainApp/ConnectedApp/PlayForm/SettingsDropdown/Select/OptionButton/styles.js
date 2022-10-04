import { gradientShine, shadowOutline } from 'shared/styles';
import styled, { css } from 'styled-components';

export const Button = styled.button`
    flex: 1;
    padding: 8px;
    height: 100%;
    font-size: 14px;
    font-weight: bold;
    border-radius: 0;
    background-color: transparent;
    color: #7f7ccf;
    outline: none;
    z-index: 1;

    &:first-of-type {
        border-radius: 6px 0 0 6px;
    }
    
    &:last-of-type {
        border-radius: 0 6px 6px 0;
    }

    &:hover:not([disabled]) {
        ${({ isSelected }) => !isSelected && css`
            background-color: #331f8d;
            color: #a6afe0;
        `};
    }

    &:focus-visible {
        ${shadowOutline()}
        z-index: 2;
    }

    ${({ isSelected }) => isSelected && css`
        background-color: #7050ff;
        color: white;
    
        ${({ emphasize }) => emphasize && css`
            background: linear-gradient(-45deg, #866aff, #ff3ab4); 
            background-size: 200%;
            animation: ${gradientShine} 4s linear infinite;
            box-shadow: 0 0 8px 2px #ff3ab37b;
            color: #fdf4ff;
        `};
    `};
`;
