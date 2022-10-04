import styled from 'styled-components';
import { Navbar } from './Navbar';

const Content = styled.main``;

export default function Layout({ show, children }) {
    return (
        <>
            {show && <Navbar />}
            <Content>{children}</Content>
        </>
    );
}
