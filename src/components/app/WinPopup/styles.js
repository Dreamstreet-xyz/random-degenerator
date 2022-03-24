import styled from 'styled-components';
import { motion } from 'framer-motion';
import { noSelect, retroTextCursive, retroTextGradient, retroTextMarker } from 'shared/styles';

export const Overlay = styled.div`
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
    top: 96px;
    right: 16px;
    min-width: 320px;
    height: auto;
    pointer-events: initial;
    background-color: #351c8dcc;
    border-radius: 10px;
    padding: 32px;
    z-index: 7;
    ${noSelect}
`;

export const Row = styled.div`
    display: flex;
    margin-top: 24px;
    justify-content: flex-end;
    align-items: flex-end;
`;

export const Title = styled.h4`
    font-size: 24px;
    font-weight: 700;
    font-family: Montserrat;
    text-transform: uppercase;
    color: #b8b0ff;
    text-align: right;
`;

export const WinAmount = styled(motion.p)`
    font-size: 48px;
    font-weight: 900;
    font-family: Montserrat;
    color: #64f087;
`;

export const Unit = styled.span`
    font-size: 48px;
    font-weight: 700;
    font-family: Montserrat;
    margin-left: 16px;

`;
