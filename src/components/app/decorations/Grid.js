import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 27.5em;
    overflow: hidden;
    perspective: 1200px;
`;

const Content = styled.div`
    background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0px,
            rgba(54, 226, 248, 0.5) 0%,
            rgba(54, 226, 248, 0.5) 3px,
            rgba(0, 0, 0, 0) 0px
        ),
        linear-gradient(
            90deg,
            rgba(0, 0, 0, 0) 0px,
            rgba(54, 226, 248, 0.5) 0%,
            rgba(54, 226, 248, 0.5) 3px,
            rgba(0, 0, 0, 0) 0px
        );
    background-size: 4em 4em, 4em 4em;
    background-color: black;
    border-top: 5px solid rgb(209, 0, 177);
    box-shadow: 0 -25px 45px rgb(209, 0, 177);
    height: 40em;
    transform: scale(1.26) rotateX(80deg);
    position: absolute;
    width: 100%;

    &::after {
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 95%);
        content: '';
        height: 100%;
        position: absolute;
        width: 100%;
    }

    &::before {
        background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0) 30%,
            rgba(209, 0, 177, 0.5) 90%
        );
        content: '';
        height: 100%;
        position: absolute;
        width: 100%;
    }
`;

function Grid() {
    return (
        <Container>
            <Content />
        </Container>
    );
}

export default React.memo(Grid);
