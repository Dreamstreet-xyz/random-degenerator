import { gradientShine } from 'shared/styles';
import styled, { css } from 'styled-components';

export const Button = styled.button`
    flex: 1;
    padding: 8px;
    height: 100%;
    font-size: 16px;
    font-weight: bold;
    border-radius: 0;
    background-color: transparent;
    color: white;
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
            background-color: #3a237a;
        `};
    }

    &:focus {
        box-shadow: 0px 0px 0px 3px #42bef0;
        z-index: 2;
    }

    ${({ isSelected }) => isSelected && css`
        background-color: #5935bd;
    
        ${({ emphasize }) => emphasize && css`
            background: linear-gradient(-45deg, #6142eb, #b41892); 
            background-size: 200%;
            animation: ${gradientShine} 2s linear infinite;
        `};
    `};
`;
