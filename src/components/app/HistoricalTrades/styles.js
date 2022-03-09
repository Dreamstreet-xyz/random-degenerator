import { textGradientCustom, windowScrollbar } from 'shared/styles';
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
    position: sticky;
    top: 0;
    z-index: 3;
    border-bottom: 1px solid #d200b8;

`; 

export const TableHeadRow = styled.tr`

`;

export const TableHeader = styled.th`
    padding: 24px 16px;
    font-weight: bold;
    ${textGradientCustom(['#e386ff', '#fd8b8b'])}

    @media (max-width: 800px) {
        font-size: 16px;
        padding: 12px 12px;
    }
`;

export const TableBody = styled.tbody`

`;

export const Content = styled.div`
    border-radius: 10px;
    overflow-y: scroll;
    overflow-x: scroll;
    max-height: 90vh;
    overflow: auto;
    ${windowScrollbar}
`;

export const Header = styled.div`
    display: block;
    margin-bottom: 24px;
`;
