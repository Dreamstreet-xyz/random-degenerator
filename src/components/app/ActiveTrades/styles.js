import { IconButton } from 'components/common';
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

export const Toggle = styled(IconButton)`
    background-color: transparent;
`;
