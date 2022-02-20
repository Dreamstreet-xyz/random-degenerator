import styled, { css, keyframes } from 'styled-components';
import { Container as DefaultContainer, Title as DefaultTitle } from 'components/app/sharedStyles';
import { Button, IconButton } from 'components/common';

export const Container = styled(DefaultContainer)`
    max-width: 550px;
    padding: 28px 36px;
    box-sizing: border-box;
    
    @media (max-width: 768px) {
        padding: 16px;
    }

    @media (max-width: 500px) {
        padding: 0px;
    }
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 16px;

    @media (max-width: 500px) {
        padding: 16px;
        padding-bottom: 8px;
        border-bottom: 1px solid #20084d;
    }
`;

export const HeaderRight = styled.div`
    display: flex;
    margin-left: auto;
    align-items: center;
`;

export const Title = styled(DefaultTitle)`
`;

export const GasIndicator = styled.div`
    display: flex;
    color: #81f781;
    font-size: 1em;
    margin-right: 8px;
`;

export const GasPrice = styled.p`
    color: #81f781;
    font-weight: bold;
`;

export const SettingsButton = styled(IconButton).attrs(() => ({
    icon: 'cog',
}))`
    background-color: transparent;
    color: #fff;
    pointer-events: ${({ isOpen }) => (isOpen ? 'none' : 'initial')};
`;

export const FieldContainer = styled.div`
    background-color: #201442;
    width: 100%;
    padding: 16px 32px 32px 32px;
    border-radius: 10px;

    @media (max-width: 500px) {
        border-radius: 0;
        padding: 16px;
        background-color: transparent;
    }
`;

export const LabelRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`;

export const Label = styled.label`
    font-size: 32px;
    font-weight: bold;
`;

export const ActionRow = styled.div`
    display: flex;
    padding-top: 16px;

    @media (max-width: 500px) {
        padding: 16px;
    }
`;

export const buttonShine = keyframes`
    0% {
        background-position: 0% 50%;
    } 
    50% {
        background-position: 100% 50%;
    }
    100%{
        background-position: 0% 50%;
    }
`;

export const SubmitButton = styled(Button)`
    margin-left: auto;
    padding: 12px 64px;
    font-size: 28px;
    font-weight: bold;
    border-radius: 10px;
    background-color: #e010cf;
    background: linear-gradient(-45deg, #8342eb, #FF3D77); 
    background-size: 300%;
    animation: ${buttonShine} 8s linear infinite;
    color: white;

    &:hover:not([disabled]),
    &:focus {
        box-shadow: 0px 0px 0px 3px #42bef0;
    }
`;
