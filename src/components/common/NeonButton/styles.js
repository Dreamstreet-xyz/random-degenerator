import styled from 'styled-components';

export const StyledButton = styled.button`
    position: relative;
    padding: .6em 1em;
    border-radius: .25em;
    background-color: transparent;
    border: .125em solid;
    border-color: ${props => props.theme.neon};
    color: ${props => props.theme.neon};
    display: inline-block;
    cursor: pointer;
    font-size: 2rem;
    font-weight: bold;
    text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3),
    0 0 0.45em currentColor;

    box-shadow: inset 0 0 0.25em 0 currentColor, 0 0 0.5em 0 currentColor;

    &:hover:not([disabled]) {
        color: pink;
    }

    &:active {

    }

    &:disabled{
        cursor: default;
    }

    &::before {
        content: '';
        position: absolute;
        background: currentColor;
        top: 120%;
        left: 0;
        width: 100%;
        height: 100%;
        transform: perspective(2em) rotateX(40deg) scale(1, 0.35);
        filter: blur(2em);
        pointer-events: none;
    }

    @media (max-width: 768px) {
        margin-top: 30vh;
    }

    @media (max-width: 600px) {
        font-size: 1.8rem;
    }
`;
