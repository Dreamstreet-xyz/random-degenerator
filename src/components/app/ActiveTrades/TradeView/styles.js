import styled from 'styled-components';
import { textGradientCustom } from 'shared/styles';

export const Container = styled.div``;

export const Table = styled.table`
    width: 100%;
    border-radius: 10px;
`;

export const TableHead = styled.thead`
    @media (max-width: 800px) {
        display: none;
    }
`; 

export const TableHeadRow = styled.tr`
    position: relative;
    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 1px;
        width: 100%;
        background:linear-gradient(to right, #cd28ff 5%, #cf00b7);
    }
`;

export const TableHeader = styled.th`
    padding: 16px 8px 12px;
    font-weight: bold;
    ${textGradientCustom(['#d83dff', '#ff6c6c'])}
`;

export const TableBody = styled.tbody`
    @media (max-width: 800px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 16px 16px;
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;
