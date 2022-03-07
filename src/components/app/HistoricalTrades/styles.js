import { textGradientCustom } from 'shared/styles';
import styled from 'styled-components';

export const Section = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    z-index: 1;
`;

export const Table = styled.table`
    width: 100%;
    background-color: #21115c;
    border-radius: 10px;

`;

export const TableHead = styled.thead`
    background-color: #21115c;

`; 

export const TableHeadRow = styled.tr`
    border-bottom: 1px solid #d200b8;
`;

export const TableHeader = styled.th`
    padding: 24px 16px;
    font-weight: bold;
    ${textGradientCustom(['#e386ff', '#fd8b8b'])}
`;

export const TableBody = styled.tbody`

`;
