import styled from 'styled-components';
import { motion } from 'framer-motion';
import { noSelect, retroTextGradient } from 'shared/styles';

export const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 6;
    pointer-events: none;
`;

export const Container = styled(motion.div)`
    position: absolute;
    top: 80px;
    right: 16px;
    min-width: 320px;
    height: auto;
    pointer-events: initial;
    background-color: #351c8dcc;
    border-radius: 10px;
    padding: 32px;
    z-index: 7;
    cursor: pointer;
    ${noSelect}
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
`;

export const Logo = styled.img`
    width: 48px;
    height: 48px;
    object-fit: contain;
    margin-right: 8px;
    display: inline-block;
`;

export const Title = styled.h4`
    font-size: 24px;
    font-weight: 700;
    font-family: Montserrat;
    text-transform: uppercase;
    color: #b8b0ff;
    text-align: right;
    ${retroTextGradient}
`;

export const Content = styled.div`
    margin-top: 24px;
`;

export const WinRow = styled(motion.div)`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`;

export const WinAmount = styled(motion.p)`
    font-size: 40px;
    font-weight: 900;
    font-family: Montserrat;
    color: #64f087;
`;

export const Unit = styled.span`
    font-size: 40px;
    font-weight: 700;
    font-family: Montserrat;
    margin-left: 8px;
`;
