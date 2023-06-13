import styled from 'styled-components';
import { Button } from 'components/common';
import { Section as DefaultSection } from '../sharedStyles';

export const Section = styled(DefaultSection)`
    position: relative;
    min-height: 100vh;
`;

export const ConnectButton = styled(Button)`
    padding: 16px 64px;
    font-size: 24px;
    border-radius: 16px;
    text-transform: uppercase;
`;
