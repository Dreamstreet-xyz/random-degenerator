import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 6;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000088;
`;

export const Container = styled.div`
    width: 500px;
`;

export const Row = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`;

export const WinAmount = styled(motion.p)`
    font-size: 48px;
    font-weight: 900;
    color: #64f087;
    height: 100px;
    font-family: Montserrat;
`;

export const Unit = styled.span`
    font-size: 48px;
    font-weight: 700;
    height: 100px;
    font-family: Montserrat;
    margin-left: 16px;
`;
