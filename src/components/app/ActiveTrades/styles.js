import { IconButton } from 'components/common';
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
        padding-bottom: 32px;
    }
`;

export const HeaderRight = styled.div`
    margin-left: auto;
`;

export const Toggle = styled(IconButton)`
    background-color: transparent;
`;
