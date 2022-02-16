import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    background-color: #13092e;
    z-index: 4;
    right: 0;
    margin-top: 16px;
    border-radius: 10px;
    box-shadow: 0px 0px 0px 2px #422f94;
    padding: 0;
`;

export const Header = styled.div`
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #691554;
`;

export const Title = styled.h3`
    font-weight: bold;
    color: #d7cfe7;
    font-size: 14px;
`;

export const Menu = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    box-sizing: border-box;
`;

export const MenuButton = styled.button`
    width: 100%;
    padding: 8px 16px;
    background-color: white;
    font-size: 16px;
    text-align: left;

    &:hover:enabled {
        background-color: #eeeeee;
    }

    &:active {
        background-color: #e8e8e8;
    }
`;

export const Divider = styled.div`
    flex: 1;
    height: 1px;
    background-color: #ff22c8;
    margin-left: 16px;
`;
