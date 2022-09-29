import { shadowOutline } from 'shared/styles';
import styled from 'styled-components';

export const StyledButton = styled.button`
    background: linear-gradient(45deg, #c125ff, #ff36de);
    color: white;
    padding: 16px 64px;
    border-radius: 16px;
    font-size: 24px;
    font-weight: bold;
    outline: none;
    margin: auto 0;

    &:hover:enabled,
    &:focus {
        ${shadowOutline()}
    }
`;
