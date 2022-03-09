import { textGradientCustom } from 'shared/styles';
import styled from 'styled-components';

export const Section = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    z-index: 1;
`;

export const HeaderRight = styled.div`
    margin-left: auto;
`;

export const Toggle = styled.button`
    width: 36px;
    height: 36px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 32px;
        height: 32px;
    }
`;
