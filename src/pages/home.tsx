import styled from 'styled-components';
import { useViewportScroll, useTransform } from 'framer-motion';
import { Hero } from 'components/home/Hero';

const Container = styled.div`
    position: relative;
`;

export default function Home() {
    const { scrollYProgress } = useViewportScroll();

    return (
        <Container>
            <Hero />
        </Container>
    );
}
