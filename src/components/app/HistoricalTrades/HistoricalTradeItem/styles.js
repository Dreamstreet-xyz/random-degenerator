import styled from 'styled-components';
import { IconButton } from 'components/common';

export const TableRow = styled.tr`
    position: relative;
    cursor: pointer;
    overflow-x: hidden;

    &:last-of-type {
        td:first-of-type {
            border-radius: 0 0 0 10px;
        }
        td:last-of-type {
            border-radius: 0 0 10px 0;
        }
    }

    &:hover {
        background-color: #261663;
    }

    &:active {
        background-color: #2a1a68;
    }
`;

export const TableData = styled.td`
    padding: 12px 16px;
    text-align: center;
    vertical-align:  middle;
`;

export const PositionData = styled(TableData)`
    color: ${({ position }) => (position === 'LONG' ? '#57e08b' : '#db5c91')};
`;

export const Pair = styled(TableData)`
`;

export const Leverage = styled(TableData)`
    flex-basis: 40px;
`;

export const Collateral = styled(TableData)`
    text-align: right;
`;
