import { IconButton } from 'components/common';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
    padding: 24px;
    background-color: #21175e;
    border-radius: 10px;
`;

export const Collateral = styled.p`
    font-weight: 900;
    font-size: 24px;
    font-family: Montserrat;
`;

export const Pnl = styled.p`
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: ${({ pnl }) => (pnl.pnlInclFee > 0 ? '#57e08b' : '#db5c91')};
    margin-left: auto;
    margin-right: auto;
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
`;

export const StatusBar = styled.div`
    position: relative;
    background: linear-gradient(90deg, #ec3865 0%, #4f40d4 40%);
    height: 36px;
    border-radius: 4px;
    flex: 1;
`;

export const OpenPrice = styled.span`
    width: 6px;
    height: 100%;
    background: linear-gradient(45deg, #d6abff, #ff97a5);
`;

export const Indicator = styled(motion.span)`
    position: absolute;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 0 4px;
    overflow-y: hidden;
    transform: translateX(-7px);

    &:hover {
       ${OpenPrice} {
            box-shadow: 0px 0px 0px 2px #ea4bff;
       }
    }
`;

export const CurrentPrice = styled(motion.span)`
    position: absolute;
    width: 32px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    transform: translateX(-16px);
    z-index: 2;
`;

export const CloseButtonWrapper = styled.div`
    margin-left: 8px;
`;

export const CloseButton = styled(IconButton).attrs({
    color: '#a51d56',
})`
    && {
        display: inline-flex;
        background-color: transparent;

        &:hover:enabled,
        &:active,
        &:focus {
            background-color: #381e77;
        }
    }
`;
