import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { IconButton } from 'components/common';

export const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000000bb;
    display: flex;
    justify-content: center;
    z-index: 99;
    overflow-y: auto;
    padding: 128px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 64px 16px;
    }
`;

export const Container = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    background-color: #150f36;
    border-radius: 10px;
    border: 2px solid #651668;
    padding: ${({ padding }) => (padding ? `${padding}px` : '24px')};
    position: relative;

    ${({ style }) => (style && style)}
`;

export const ModalTitle = styled.h2`
    font-weight: bold;
    font-size: 20px;
    ${({ style }) => (style && style)}
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const CloseButton = styled(IconButton)`
    background-color: transparent;
    color: #ccc;
    width: 24px;
    height: 24px;
    border-radius: 6px;

    ${({ style }) => (style && style)}
`;

export const ModalBody = styled.div`

`;
