import { textGradientCustom, windowScrollbar } from 'shared/styles';
import styled from 'styled-components';
import { Container as DefaultContainer } from '../sharedStyles';


export const Section = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    z-index: 1;
`;

export const Container = styled(DefaultContainer)`
    @media (min-width: 769px) {
        padding: 32px;
    }
`;

export const Table = styled.table`
    width: 100%;
    border-radius: 10px;
`;

export const TableHead = styled.thead`
    background-color: #080636;
    position: sticky;
    top: 0;
    z-index: 3;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        height: 1px;
        left: 0;
        width: 100%;
        background:linear-gradient(to right, #cd28ff 5%, #cf00b7);
    }
`; 

export const TableHeadRow = styled.tr`

`;

export const TableHeader = styled.th`
    padding: 16px 8px 12px;
    font-weight: bold;
    ${textGradientCustom(['#d83dff', '#ff6c6c'])}

    @media (max-width: 800px) {
        font-size: 16px;
        padding: 12px 8px;
    }
`;

export const TableBody = styled.tbody`

`;

export const Content = styled.div`
    border-radius: 10px;
    overflow-y: scroll;
    overflow-x: scroll;
    max-height: 65vh;
    overflow: auto;
    ${windowScrollbar}
`;

export const Header = styled.div`
    display: block;
    margin-bottom: 16px;
`;
