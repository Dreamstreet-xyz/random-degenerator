import styled from 'styled-components';
import { motion } from 'framer-motion';
import IconButton from 'components/common/IconButton';

export const Container = styled(motion.div)`
    position: relative;
    background-color: #e63b82;
    border-radius: 10px;
    display: flex;
    padding: 24px;
`;

export const Content = styled.div`
    font-weight: bold;
    flex: 1;
`;

export const IconContainer = styled.div`
    flex-basis: 16px;
    position: relative;
`;

export const CloseButton = styled(IconButton).attrs(() => ({
    icon: 'times',
}))`
    background-color: transparent;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    color: #ffb5c2;
    position: absolute;
    top: -20px;
    right: -12px;
   
    &:hover:enabled {
        background-color: transparent;
    }

    &:active,
    &:focus {
        box-shadow: 0px 0px 0px 2px #ea4bff;
        background-color: transparent;
    }
`;
