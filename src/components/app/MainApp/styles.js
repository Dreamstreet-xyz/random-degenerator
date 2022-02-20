import styled from 'styled-components';
import { Section as DefaultSection } from '../sharedStyles';

export const Section = styled(DefaultSection)`
    position: relative;
    min-height: 100vh;

    @media (max-width: 500px) {
        align-items: flex-start;
    }
`;
