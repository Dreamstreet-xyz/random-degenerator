import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { retroTextCursive, textGradientCustom } from 'shared/styles';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 16px 0;
`;

export const ResultsTitle = styled.h3`
    font-size: 48px;
    text-align: center;
    ${retroTextCursive}

    @media (max-width: 680px) {
        font-size: 44px;
    }

    @media (max-width: 500px) {
        font-size: 40px;
    }
`;

export const Card = styled(motion.div)`
    display: grid;
    max-width: 850px;
    width: 100%;
    grid-template-columns: 1fr max-content 1fr;
    grid-gap: 24px 48px;
    background: linear-gradient(45deg, #150736, #12093f);
    border-radius: 20px;
    padding: 48px 64px;
    margin-top: 16px;
    font-size: 24px;
    font-weight: bold;
    z-index: 1;

    @media (max-width: 820px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 680px) {
        padding: 24px 32px;
        grid-gap: 16px 32px;
    }

    @media (max-width: 500px) {
        padding: 16px 24px;
    }

    @media (max-width: 400px) {
        grid-template-columns: 1fr;
        grid-gap: 8px;
    }
`;

export const Field = styled.p`
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
`;

export const Label = styled.span`
    position: relative;
    color: #6c63b9;
    font-size: 20px;
    margin-bottom: 8px;

    @media (max-width: 680px) {
        font-size: 16px;
    }

    @media (max-width: 500px) {
        font-size: 14px;
    }

    @media (max-width: 400px) {
        font-size: 16px;
    }
`;

export const Value = styled.span`
    color: #d4cdfc;
    font-size: 36px;
    font-family: Montserrat;
    ${textGradientCustom(['#ff86f5', '#fd8ba8'])}
    line-height: 1.1;

    @media (max-width: 900px) {
        font-size: 32px;
    }

    @media (max-width: 680px) {
        font-size: 24px;
    }

    @media (max-width: 500px) {
        font-size: 20px;
    }

    @media (max-width: 400px) {
        font-size: 24px;
    }
`;

export const Fees = styled.span`
    font-size: 16px;
    color: #bfb0f7;
`;

export const ActionRow = styled.div`
    display: flex;
    margin: 16px 0;

    @media (max-width: 580px) {
        flex-direction: column;
    }
`;

const actionStyle = css`
    display: flex;
    align-items: center;
    padding: 8px 16px;
    text-align: left;
    background-color: transparent;
    font-weight: bold;
    font-size: 18px;
    color: #826ff0;

    &:hover {
        color: #9d8dfd;
    }

    @media (max-width: 770px) {
        font-size: 16px;
        flex: 1;
    }
`;

export const ActionButton = styled.button`
    ${actionStyle}
`;

export const ActionLink = styled.a`
    ${actionStyle}
    text-decoration: none;
`;

export const GainsLogo = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 8px;
    filter: sepia(100%) saturate(300%) brightness(70%) hue-rotate(195deg);
`;
