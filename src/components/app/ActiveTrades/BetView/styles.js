import styled from 'styled-components';

export const Container = styled.div`
    
`;

export const BetsContainer = styled.div`
    width: 100%;
    display: grid; 
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: 940px) {
        grid-template-columns: 1fr;
    }

    @media (max-width: 450px) {
        row-gap: 16px;
    }
`;
