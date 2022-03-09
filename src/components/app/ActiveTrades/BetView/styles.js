import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: grid; 
    grid-template-columns: 1fr;
    column-gap: 32px;
    row-gap: 32px;

    @media (max-width: 1000px) {
        grid-template-columns: 1fr;
    }
`;
