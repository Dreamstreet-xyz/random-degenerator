import styled, { css } from 'styled-components';
import { Container as DefaultContainer, Title as DefaultTitle } from 'components/app/sharedStyles';
import { Button, IconButton } from 'components/common';
import { pulsingGlow } from 'shared/styles';

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
    
    ${({ glow }) => glow && css`
        box-shadow: 0px 0px 8px 2px #851bff5f;
        ${pulsingGlow}

        &::after {
            box-shadow: 0px 0px 16px 4px #b71bff60;
            animation-duration: 4s;
            z-index: -1;
        }
    `};
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
    width: 100%;
    padding: 0px 0px 16px 0px;
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

export const SubmitButton = styled(Button)`
    padding: 8px 64px;
    font-size: 24px;
`;
