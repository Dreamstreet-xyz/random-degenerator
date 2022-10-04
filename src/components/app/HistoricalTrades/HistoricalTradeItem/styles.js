import styled from 'styled-components';
import { ActionType } from 'types/gains/GainsCoreData';

export const TableRow = styled.tr`
    position: relative;
    overflow-x: hidden;

    &:hover {
        background-color: #ffffff05;
    }

    &:last-of-type {
        td:first-of-type {
            border-radius: 0 0 0 10px;
        }
        td:last-of-type {
            border-radius: 0 0 10px 0;
        }
    }
`;

export const TableData = styled.td`
    padding: 12px 16px;
    text-align: center;
    vertical-align:  middle;

    @media (max-width: 800px) {
        font-size: 14px;
        padding: 10px 12px;
    }
`;

export const PositionData = styled(TableData)`
    color: ${({ position }) => (position === 'LONG' ? '#14ffe3' : '#ff5391')};
`;

export const Pair = styled(TableData)`
`;

export const Leverage = styled(TableData)`
    flex-basis: 40px;
`;

export const Collateral = styled(TableData)`
    text-align: right;
`;

export const PnlData = styled(TableData)`
    color: ${({ pnl }) => (pnl > 0 ? '#14ffe3' : '#ff5391')};
    text-align: right;
`;

export const Action = styled(TableData)`
    color: ${({ action }) => ([ActionType.LIQ, ActionType.SL].includes(action) ? '#ff5391' : action === ActionType.TP ? '#14ffe3' : '#fff')};
`;
