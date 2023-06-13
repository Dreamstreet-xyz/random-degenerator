import styled from 'styled-components';
import { IconButton } from 'components/common';

export const TableRow = styled.tr`
    position: relative;
    cursor: pointer;
    &:hover {
        background-color: #ffffff08;
    }

    &:active {
        background-color: #ffffff0b;
    }
    
    @media (max-width: 800px) {
        display: flex;
        padding: 16px;
        border: 1px solid #483b9e88;
        border-radius: 10px;
        flex-wrap: wrap;
        align-items: center;
    }
`;

export const TableData = styled.td`
    padding: 12px 8px;
    text-align: center;
    vertical-align:  middle;

    @media (max-width: 800px) {
        padding: 4px;
    }
`;

export const PositionData = styled(TableData)`
    color: ${({ position }) => (position === 'LONG' ? '#14ffe3' : '#ff5391')};
    @media (max-width: 800px) {
        order: 1;
        padding: 4px 0 4px 4px;
    }
`;

export const Pair = styled(TableData)`
    @media (max-width: 800px) {
        order: 3;
        text-align: right;
        padding: 4px 26px 4px 0;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 35%;
    }
`;

export const Leverage = styled(TableData)`
    flex-basis: 40px;
    @media (max-width: 800px) {
        order: 2;
        padding: 4px 4px 4px 0px;
    }
`;

export const Collateral = styled(TableData)`
    text-align: right;
    @media (max-width: 800px) {
        order: 4;
        text-align: left;
        flex-basis: 100%;
    }
`;

export const PnlData = styled(TableData)`
    color: ${({ pnl }) => (pnl?.pnlInclFee > 0 ? '#14ffe3' : '#ff5391')};
    text-align: right;
    /* width: 250px; // if pnl changing length shifting table content is annoying

    @media (max-width: 1000px) {
        width: 200px;
    } */

    @media (max-width: 800px) {
        order: 5;
        width: auto;
        text-align: center;
        margin-top: 8px;
        flex-basis: 100%;
        font-weight: bold;
    }
`;

export const CloseButtonWrapper = styled(TableData)`
    @media (max-width: 800px) {
        position: absolute;
        top: 0;
        right: 0;
    }
`;

export const CloseButton = styled(IconButton)`
    && {
        display: inline-flex;
        background-color: transparent;
        color: #ff2ca0;

        &:hover:enabled,
        &:active,
        &:focus {
            background-color: #ffffff08;
            color: #ff2ca0;

        }
    }
`;
