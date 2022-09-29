import styled from 'styled-components';
import { IconButton } from 'components/common';

export const TableRow = styled.tr`
    position: relative;
    cursor: pointer;

    &:last-of-type {
        td:first-of-type {
            border-radius: 0 0 0 10px;
        }
        td:last-of-type {
            border-radius: 0 0 10px 0;
        }
    }

    &:hover {
        background-color: #291774;
    }

    &:active {
        background-color: #291772;
    }
    
    @media (max-width: 800px) {
        display: flex;
        padding: 16px;
        background-color: #21115c;
        border-radius: 10px;
        flex-wrap: wrap;
        align-items: center;
    }
`;

export const TableData = styled.td`
    padding: 12px 16px;
    text-align: center;
    vertical-align:  middle;

    @media (max-width: 800px) {
        padding: 4px;
    }
`;

export const PositionData = styled(TableData)`
    color: ${({ position }) => (position === 'LONG' ? '#57e08b' : '#db5c91')};
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
    color: ${({ pnl }) => (pnl?.pnlInclFee > 0 ? '#57e08b' : '#db5c91')};
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
