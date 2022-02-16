import styled from 'styled-components';

export const StyledButton = styled.button`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 10px;
    border-radius: 10px;
    font-weight: bold;
    outline: none;
    background-color: #26203d;
    color: white;

    &:hover:enabled {
        background-color: #211a41;
    }

    &:active {
        background-color: #2d264d;
    }
    
    &:focus {
        box-shadow: 0px 0px 0px 2px #4a5297;
    }
`;
