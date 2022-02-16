import styled from 'styled-components';
import { motion } from 'framer-motion';
import { buttonShine } from '../PlayForm/styles';

export const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;

    @media (max-width: 870px) {
    }
`;

export const TopActionRow = styled.div`
    max-width: 850px;
    width: 100%;
    display: flex;
    align-items: center;
`;

export const BackButton = styled.button`
    padding: 8px 24px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 10px;
    background-color: #e010cf;
    background:linear-gradient(-45deg, #8342eb, #FF3D77);
    background-size: 300%;
    animation: ${buttonShine} 8s linear infinite;
    color: white;

    &:hover,
    &:focus {
        box-shadow: 0px 0px 0px 3px #42bef0;
    }
`;

export const ActionRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 32px;
`;

export const SlotsContainer = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(4, 1fr);;
    column-gap: 16px;
    margin-top: 32px;

    @media (max-width: 870px) {
        column-gap: 8px;
    }

    @media (max-width: 630px) {
        grid-template-columns: repeat(2, 150px);
        column-gap: 8px;
        row-gap: 24px;
    }
`;
