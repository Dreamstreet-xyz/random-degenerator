import { Button } from 'components/common';
import styled, { css } from 'styled-components';

export const ModalBody = styled.div`
    color: white;
`;

export const Row = styled.div`
    display: flex;
    align-items: flex-end;
    font-size: 20px;
    margin-bottom: 24px;
`;

export const Label = styled.span`
    font-size: 16px;
    color: #a694ec;
`;

const fieldStyle = css`
    font-size: 20px;
    font-weight: bold;
    margin-left: auto;
`;

export const Pair = styled.p`
    font-size: 36px;
    font-weight: bold;
    color: #57e08b;
    text-align: center;
`;

export const Position = styled.p`
    font-size: 24px;
    font-weight: bold;
    color: ${({ buy }) => (buy ? '#57e08b' : '#db5c91')};
    text-align: center;
    margin-bottom: 32px;
`;

export const Collateral = styled.p`
    ${fieldStyle}
`;

export const Size = styled.p`
    ${fieldStyle}
`;

export const Open = styled.p`
    ${fieldStyle}
`;

export const Tp = styled.p`
    ${fieldStyle}
`;

export const Sl = styled.p`
    ${fieldStyle}
`;

export const Pnl = styled.p`
    ${fieldStyle}
    color: ${({ pnl }) => (pnl.pnlInclFee > 0 ? '#57e08b' : '#db5c91')};
`;

export const CloseButton = styled(Button)`
    width: 100%;
    padding: 16px;
    font-size: 20px;
`;
