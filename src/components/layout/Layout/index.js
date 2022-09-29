import styled from 'styled-components';
import { Navbar } from './Navbar';
import Footer from './Footer';

const Content = styled.main``;

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <Content>{children}</Content>
            <Footer />
        </>
    );
}
