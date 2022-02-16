import styled, { css } from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
    position: relative;
    z-index: 3;
    width: 100%;
    padding: 32px 0px;
    display: flex;
    justify-content: center;
    height: 100px;
    background-color: black;
`;

const FooterColumn = styled.div`
    border-radius: 16px;
    margin: 0px 32px;
`;

export default function Footer() {
    return (
        <Container>
            <FooterColumn></FooterColumn>
            <FooterColumn></FooterColumn>
            <FooterColumn></FooterColumn>
        </Container>
    );
}
