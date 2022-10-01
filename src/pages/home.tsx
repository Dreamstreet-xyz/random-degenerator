import styled from 'styled-components';
import { Home } from 'components/home';

const Container = styled.div`
    position: relative;
`;

export default function HomePage() {
    return (
        <Container>
            <Home />
        </Container>
    );
}
