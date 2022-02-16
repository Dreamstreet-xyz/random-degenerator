import styled from 'styled-components';
import { Icon as DefaultIcon } from 'components/common';

export const Button = styled.button`
    width: 100%;
    padding: 32px;
    font-size: 24px;
    font-weight: bold;
    background-color: transparent;
    color: #e9e4f5;
    text-align: left;

    @media (max-width: 1000px) {
        padding: 16px;
    }

    @media (max-width: 500px) {
        font-size: 18px;
    }
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
`;

export const Icon = styled(DefaultIcon)`
    margin-left: auto;
    color: #7860ce;
`;
