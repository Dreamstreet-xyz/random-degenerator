import styled from 'styled-components';
import { Dropdown as DefaultDropdown } from 'components/common';

export const Dropdown = styled(DefaultDropdown)`
    && {
        min-width: 280px;
    }
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
`;

export const Label = styled.label`
    font-size: 14px;
    font-weight: bold;
`;

export const Input = styled.input`
    width: 100%;
    box-sizing: border-box;
    text-align: right;
    background-color: transparent;
    font-size: 24px;
    font-weight: bold;
    font-family: Montserrat;
    padding: 8px 8px 0 8px;
    border: none;
    border-bottom: 3px solid #5526c4;
    border-radius: 0;
    outline: none;
    caret-color: #ff37a5;
    color: #ff86f5;

    &:focus {
        border-bottom: 3px solid #c23bb7;
    }
`;
