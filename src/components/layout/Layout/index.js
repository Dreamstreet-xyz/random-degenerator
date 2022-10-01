import styled from 'styled-components';
import { Navbar } from './Navbar';
import Footer from './Footer';

const Content = styled.main``;

export default function Layout({ show, children }) {
    return (
        <>
            {show && <Navbar />}
            <Content>{children}</Content>
            {show && <Footer />}
        </>
    );
}
