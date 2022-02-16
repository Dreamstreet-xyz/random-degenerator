import styled from 'styled-components';
import { Accordion as DefaultAccordion } from 'components/common';
import { gradientShine, retroTextGradient } from 'shared/styles';

export const Header = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
`;

export const Title = styled.h2`
    font-size: 36px;
    font-weight: bold;
    font-family: Montserrat;
    ${retroTextGradient}

    @media (max-width: 700px) {
        font-size: 24px;
    }
`;

export const Decoration = styled.div`
    width: 60px;
    height: 6px;
    border-radius: 6px;
    background: linear-gradient(45deg, #a526b6, #6625ff);
    margin-bottom: 24px;
    background-size: 300%;
    animation: ${gradientShine} 8s linear infinite;
`;

export const Section = styled.section`
    max-width: 800px;
    margin: 0 auto;
`;

export const Accordion = styled(DefaultAccordion)`
    &:not(:last-of-type) {
        border-bottom: 1px solid #3e2566;
    }
`;

export const FAQContent = styled.div`
    padding: 16px 32px 32px 32px;
    line-height: 1.6;
    color: #b7a8db;
    @media (max-width: 1000px) {
        padding: 16px;
    }
`;

export const Paragraph = styled.p`
    font-size: 18px;

    &:not(:first-of-type) {
        margin-top: 32px;
    }
`;

export const Anchor = styled.a`
    color: #4c90f7;

    &:visited {
        color: #8549f5;
    }
`;
