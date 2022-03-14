import { IconButton } from 'components/common';
import { motion } from 'framer-motion';
import { noSelect } from 'shared/styles';
import styled from 'styled-components';

export const Container = styled.div`
    padding: 24px;
    background-color: #21175e;
    border-radius: 10px;
    ${noSelect}

    @media (max-width: 600px) {
        padding: 12px;
    }
`;

export const Collateral = styled.p`
    font-weight: 900;
    font-size: 24px;
    font-family: Montserrat;
    color: #e7e7ff;

    @media (max-width: 1100px) {
        font-size: 20px;
    }

    @media (max-width: 940px) {
        font-size: 24px;
    }

    @media (max-width: 600px) {
        font-size: 20px;
    }

    @media (max-width: 450px) {
        font-size: 16px;
    }
`;

export const Pnl = styled.p`
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: ${({ pnl }) => (pnl.pnlInclFee > 0 ? '#57e08b' : '#db5c91')};
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 1100px) {
        font-size: 20px;
    }

    @media (max-width: 1000px) {
        margin-right: 0;
    }
    
    @media (max-width: 940px) {
        font-size: 24px;
        margin-right: auto;
    }

    @media (max-width: 600px) {
        font-size: 20px;
        margin-right: 0;
    }

    @media (max-width: 450px) {
        font-size: 16px;
    }
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
`;

export const StatusBar = styled.div`
    position: relative;
    background: linear-gradient(90deg, #ce3ece, #4f40d4);
    height: 36px;
    border-radius: 4px;
    flex: 1;
    display: flex;
    align-items: center;
`;

export const OpenPrice = styled.span`
    width: 2px;
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
    transform: translateX(-5px);

    &:hover {
       ${OpenPrice} {
            box-shadow: 0px 0px 0px 2px white;
       }
    }
`;

export const CurrentPrice = styled(motion.span)`
    position: absolute;
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    transform: translateX(-12px);
    z-index: 2;
`;

export const StopLoss = styled.span`
    position: absolute;
    left: 0;
    width: 6px;
    height: 100%;
    border-radius: 4px 0 0 4px;

    &:hover {
        background-color: #ffffff88;
    }
`;

export const TakeProfit = styled.span`
    position: absolute;
    left: calc(100% - 6px);
    width: 6px;
    height: 100%;
    border-radius: 0 4px 4px 0;

    &:hover {
        background-color: #ffffff88;
    }
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
