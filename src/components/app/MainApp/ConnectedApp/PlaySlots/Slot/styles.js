import styled from 'styled-components';
import { motion } from 'framer-motion';
import { retroTextGradient } from 'shared/styles';

export const Container = styled.div`
`;

export const Title = styled(motion.h3)`
    font-weight: bold;
    text-align: center;
    font-size: 28px;
    color: #ff51ff;
    text-transform: uppercase;
    ${retroTextGradient}

    @media (max-width: 870px) {
        font-size: 20px;
    }
`;

export const Card = styled(motion.div)`
    width: 200px;
    height: 400px;
    border-radius: 10px;
    background-color: #100731;

    @media (max-width: 870px) {
        width: 150px;
        height: 200px;
    }
`;

export const Column = styled(motion.div)`
    position: relative;
    width: 200px;
    height: 400px;
    top: 92px;
    perspective: 1000px;
    pointer-events: none;

    @media (max-width: 870px) {
        width: 150px;
        height: 200px;
        top: 45px;
    }
`;

export const Spinner = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 24px;
    font-family: Montserrat;
    font-weight: 800;
    backface-visibility: hidden;
    z-index: 0;
    transform-origin: 50% 50% -200px;

    @media (max-width: 870px) {
        height: 100px;
        transform-origin: 50% 50% -90px;
        font-size: 18px;
    }
`;

export const Unconfirmed = styled.div`
    width: 200px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 160px;
    font-weight: 900;
    color: #2c2577ac;

    @media (max-width: 870px) {
        width: 150px;
        height: 200px;
        font-size: 120px;
    }
`;
