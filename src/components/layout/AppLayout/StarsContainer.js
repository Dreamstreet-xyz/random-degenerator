import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const animStar = keyframes`
    0% {
        transform: translateY(0%);
    }

    100% {
        transform: translateY(-50%);
    }
`;

const Container = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    pointer-events: none;
    overflow: hidden;
`;

const baseStars = css`
    position: absolute;
    width: 100%;
    animation: ${animStar} 480s linear infinite alternate;
`;

const Stars1 = React.memo(styled.div`
    ${baseStars}
    height: 200%;
    opacity: 0.4;
    background-size: 181px;
    background-image: url('/images/decorations/stars_1_109.png');
`);

const Stars2 = React.memo(styled.div`
    ${baseStars}
    height: 300%;
    opacity: 0.4;
    background-size: 211px, 193px, 191px;
    background-image: url('/images/decorations/stars_1_71.png'),
        url('/images/decorations/stars_1_109.png'), url('/images/decorations/stars_1_139.png');
`);

const Stars3 = React.memo(styled.div`
    ${baseStars}
    height: 400%;
    background-size: 211px, 269px;
    background-image: url('/images/decorations/stars_1_109.png'),
        url('/images/decorations/stars_1_139.png');
`);

export default function NewStars({ show }) {
    if (!show) return null;

    return (
        <Container>
            <Stars1 />
            <Stars2 />
            <Stars3 />
        </Container>
    );
}
