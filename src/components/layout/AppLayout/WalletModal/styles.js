import { Button } from 'components/common';
import styled, { css } from 'styled-components';

export const ModalBody = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 16px;
    row-gap: 16px;
    margin-top: 16px;

    @media (max-width: 450px) {
        grid-template-columns: 1fr;
    }
`;

export const WalletIcon = styled.img`
    width: 32px;
    height: 32px;
    margin-right: 16px;
`;

export const WalletOption = styled.button`
    font-weight: bold;
    background-color: #1f1341;
    border-radius: 10px;
    color: white;
    display: flex;
    align-items: center;
    padding: 16px;

    &:hover:enabled {
        background-color: #281b4b;
    }
`;

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #0000007a;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    border-radius: 10px;
    text-align: center;
`;
