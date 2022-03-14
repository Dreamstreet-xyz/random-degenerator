import styled from 'styled-components';
import { retroTextGradient } from 'shared/styles';
import { motion } from 'framer-motion';

export const Section = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    z-index: 1;

    @media (max-width: 768px) {
        padding: 0px;
    }
`;

export const Container = styled(motion.div)`
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    width: 100%;
    box-sizing: border-box;
    background-color: #150736ee;
    border-radius: 20px;
    padding: 48px;
    z-index: 1;

    &::after {
        border-radius: 20px;
    }

    @media (max-width: 768px) {
        padding: 16px 8px;
        border-radius: 0;
        &::after {
            border-radius: 0px;
        }
    }
`;

export const Content = styled.div``;

export const Header = styled.div`
    display: flex;
    margin-bottom: 24px;
`;

export const Title = styled.h2`
    color: #c6cbf5;
    font-family: Roboto;
    font-size: 1.8rem;
    font-weight: 1000;
    line-height: 1.2;
    text-transform: uppercase;
    z-index: 2;
    ${retroTextGradient}

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

export const Subtitle = styled.h2`
    font-size: 1rem;
    font-weight: 500;
    z-index: 2;
    padding: 8px;
    color: #e9e9e9;
`;
