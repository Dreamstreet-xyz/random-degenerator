import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% {
        transform: rotateY(0deg);
    }
    100% {
        transform: rotateY(360deg);
    }
`;

const Coin = styled.div`
    background-size: 100% 100%;
    border-radius: 100%;
    height: 48px;
    margin: 32px auto;
    position: relative;
    width: 48px;
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
    animation: ${spin} 3s infinite linear;

    &::before {
        background-color: transparent;
        background-size: 100% 100%;
        border-radius: 100%;
        content: '';
        left: 0;
        position: absolute;
        top: 0;
        height: 48px;
        width: 48px;
        transform: translateZ(-2px);
        -webkit-transform: translateZ(-2px);
    }
`;

const Center = styled.div`
    position: absolute;
    top: 33px;
    left: calc(50% - 2px);
    width: 4px;
    height: 46px;
    border-radius: 2px;
    background-color: rgb(236, 160, 18);
    z-index: -1;
`;

const Link = styled.a`
    position: relative;

    &:hover {
        filter: brightness(1.25);
    }
`;

function CoinLink({ href, className }) {
    return (
        <Link href={href}>
            <Coin className={className} />
            <Center />
        </Link>
    );
}

export default CoinLink;
