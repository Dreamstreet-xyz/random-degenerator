import styled from 'styled-components';
import { useRouter } from 'next/router';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import StarsCanvas from 'components/layout/AppLayout/StarsCanvas';
import { Navbar } from './Navbar';
import Footer from './Footer';

const Content = styled.main``;

export default function Layout({ show, children }) {
    const { scrollY } = useViewportScroll();
    const opacity = useTransform(scrollY, [0, 150, 800], [1, 0.8, 0]);
    const { pathname } = useRouter();

    const isHome = pathname === '/home';

    return (
        <>
            {show && <Navbar />}
            <motion.div style={{ opacity: isHome ? opacity : 1 }}>
                <StarsCanvas />
            </motion.div>
            <Content>{children}</Content>
            {show && <Footer />}
        </>
    );
}
