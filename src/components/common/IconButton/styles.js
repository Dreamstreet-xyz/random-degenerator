import { shadowOutline } from 'shared/styles';
import styled from 'styled-components';

export const StyledButton = styled.button`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 10px;
    border-radius: 8px;
    font-weight: bold;
    outline: none;
    background-color: #322958;
    color: #dcd8ee;

    &:hover:enabled {
        color: #fff;
    }

    
    &:focus-visible {
        ${shadowOutline()}
    }
`;
