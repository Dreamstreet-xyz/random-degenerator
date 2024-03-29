import styled, { css } from 'styled-components';
import { Container as DefaultContainer, Title as DefaultTitle } from 'components/app/sharedStyles';
import { Button, IconButton } from 'components/common';
import { fadeIn } from 'shared/styles';
import { DegenLevel } from 'types/Trade';

export const Container = styled(DefaultContainer)`
    max-width: 550px;
    padding: 28px 36px;
    box-sizing: border-box;
    position: relative;
    

    @media (max-width: 768px) {
        padding: 16px;
    }

    @media (max-width: 500px) {
        padding: 0px;
    }
    
    ${({ glow }) => glow && css`
        &::after {
            position: absolute;
            content: "";
            inset: 0;
            border-radius: 20px;
            box-shadow: 0px 0px 0px 3px #ff00955c, 0px 0px 24px 8px #ff1bff3d;
            z-index: -1;
            opacity: 0;
            animation: ${fadeIn} .75s ease-in-out forwards;
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
    color: #14ffe3;
    font-size: 1em;
    margin-right: 8px;
`;

export const GasPrice = styled.p`
    color: #14ffe3;
    font-weight: bold;
`;

export const SettingsButton = styled(IconButton).attrs(() => ({
    icon: 'cog',
}))`
    background-color: transparent;

    ${({ degenLevel }) => degenLevel === DegenLevel.high && css`
        color: #ff3eef !important;
    `};
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
    min-height: 45px;
    font-size: 24px;
    margin-left: auto;
`;
