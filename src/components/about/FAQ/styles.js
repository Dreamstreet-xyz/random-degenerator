import styled from 'styled-components';
import { Accordion as DefaultAccordion } from 'components/common';
import { retroTextGradient } from 'shared/styles';

export const Header = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
`;

export const Title = styled.h2`
    font-size: 32px;
    font-weight: bold;
    font-family: Roboto;
    ${retroTextGradient}

    @media (max-width: 700px) {
        font-size: 24px;
    }
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
    color: #d7d7f5;
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
    color: #42d9ff;

    &:visited {
        color: #c267ff;
    }

    &:hover {
        opacity: .85;
    }
`;
