import styled from 'styled-components';

export const Type = styled.div`
    color: ${({ pnl }) => (pnl?.pnlInclFee > 0 ? '#57e08b' : '#db5c91')};
    font-size: 18px;
    text-transform: uppercase;
    padding: 3px;
`;

export const Pair = styled.div`
    padding: 3px;
`;

export const Result = styled.div`
    color: ${({ pnl }) => (pnl?.pnlInclFee > 0 ? '#57e08b' : '#db5c91')};
    padding: 3px;
`;

export const Container = styled.div`
    letter-spacing: 0.075em;
`;
