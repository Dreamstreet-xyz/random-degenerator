import { css, keyframes } from 'styled-components';
import colors from './colors';
import theme from './theme';

export const noSelect = css`
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
`;

export const containerScrollbar = css`
    scrollbar-width: thin;

    ::-webkit-scrollbar {
        height: 8px;
        width: 8px;
        background: #dddddd;
    }

    ::-webkit-scrollbar-thumb {
        background: #aaa;
        border-radius: 3px;
        -webkit-border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #999;
    }

    ::-webkit-scrollbar-thumb:active {
        background: #777;
    }

    ::-webkit-scrollbar-corner {
        background: #000;
    }
`;

export const windowScrollbar = css`
    scrollbar-width: thin;

    ::-webkit-scrollbar {
        height: 8px;
        width: 8px;
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background: #4e28d8;
        border-radius: 3px;
        -webkit-border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #6c48f0;
    }

    ::-webkit-scrollbar-thumb:active {
        background: #8c6dff;
    }

    ::-webkit-scrollbar-corner {
        background: #000;
    }
`;

export const retroTextGradient = css`
    color: #c6cbf5;
    background: -webkit-linear-gradient(
        top,
        #be9ff8,
        #63d4f0 40%,
        #b913b9 40%,
        #e1a0ce 65%,
        white 90%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 0.5px;
    -webkit-text-stroke-color: white;
`;

export const retroTextCursive = css`
    color: rgb(209, 0, 177);
    display: block;
    font-family: 'Yellowtail';
    text-shadow: 0 0 1px #d100b1, 0 -2px 2px #ffffffcc, 0 3px 3px #00000088, 0 0 15px #d100b1,
        0 0 45px #d100b1cc;
    text-decoration: underline;
    transform: skew(-10deg);
`;

export const textGradient = css`
    background: linear-gradient(to right, #7b9edf, #9737cf);
    background-size: auto;
    background-clip: border-box;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #6ff3ec;
`;

export const textGradientCustom = colors => css`
    background: linear-gradient(45deg, ${colors.toString()});
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 100% auto;
    color: #000;
`;

export const shine = keyframes`
    to {
        background-position: 200% center;
    }
`;

export const lightShineAnimation = keyframes`
    0% {
        background-position: 0% 51%
    }
    50%{
        background-position: 100% 50%
    }
    100%{
        background-position: 0% 51%
    }
`;

export const lightShine = value => css`
    &::after {
        content: '${value}';
        background-image: linear-gradient(225deg, transparent 53%, white 55%, transparent 58%);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-clip: text;
        -webkit-background-clip: text;
        z-index: 999;
        background-size: 400% 400%;
        animation: ${lightShineAnimation} 10s ease infinite;
        animation-delay: 0s;
    }
`;

export const animatedTextGradientCustom = colors => css`
    background: linear-gradient(to right, ${colors.toString()});
    background-clip: text;
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const animatedTextGradient = css`
    background: linear-gradient(to right, #ff8b55, #fc37fc, #ff8b55);
    background-clip: text;
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shine} 20s linear infinite;
`;

const glow = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

export const gradientShine = keyframes`
    0% {
        background-position: 0% 50%;
    } 
    50% {
        background-position: 100% 50%;
    }
    100%{
        background-position: 0% 50%;
    }
`;

export const pulsingGlow = css`
    position: relative;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        animation: ${glow} 2s alternate infinite;
    }
`;

export { colors, theme };
