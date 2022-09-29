import styled from 'styled-components';
import { useViewportScroll, useTransform } from 'framer-motion';
import { Home } from 'components/home';

const Container = styled.div`
    position: relative;
`;

export default function HomePage() {
    const { scrollYProgress } = useViewportScroll();

    return (
        <Container>
            <Home />
        </Container>
    );
}
