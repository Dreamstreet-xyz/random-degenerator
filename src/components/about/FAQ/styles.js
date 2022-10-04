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
    background: linear-gradient(45deg, #f71dff, #996dff);
    margin-bottom: 24px;
    background-size: 200%;
    animation: ${gradientShine} 4s linear infinite;
`;

export const Section = styled.section`
    max-width: 800px;
    margin: 0 auto;
`;

export const Accordion = styled(DefaultAccordion)`
    &:not(:last-of-type) {
        border-bottom: 1px solid #27226e81;
    }
`;

export const FAQContent = styled.div`
    padding: 16px 32px 32px 32px;
    line-height: 1.6;
    color: #c8c7f0;
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
    color: #28a9ff;

    &:visited {
        color: #b575ff;
    }

    &:hover {
        opacity: .85;
    }
`;
