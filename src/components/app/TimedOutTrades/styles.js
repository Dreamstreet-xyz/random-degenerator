import styled from 'styled-components';
import { Button } from 'components/common';
import { motion } from 'framer-motion';

export const Section = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;

export const Container = styled(motion.div)`
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    box-sizing: border-box;
    background-color: #150736ee;
    border-radius: 20px;
    padding: 48px;
    margin-bottom: 68px;

    @media (max-width: 768px) {
        padding: 16px;
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

export const ClaimCollateralButtonWrapper = styled(TableData)`
@media (max-width: 800px) {
    position: absolute;
    top: 0;
    right: 0;
}
`;

export const ClaimCollateralButton = styled(Button).attrs({
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

export const TableRow = styled.tr`
    background-color: #150736ee;
`;
