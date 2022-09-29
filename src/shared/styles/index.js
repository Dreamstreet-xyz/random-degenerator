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
    &::-webkit-scrollbar {
        width: 16px;
        height: 16px;
        background: none;
    }

    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-button {
        width: 16px;
        height: 16px;
        background: silver;
        box-shadow: inset 1px 1px #dfdfdf, inset -1px -1px gray;
        border: 1px solid;
        border-color: silver #000 #000 silver;
    }

    &::-webkit-scrollbar-track {
        background: #ccc;
    }

    &::-webkit-scrollbar-button {
        background-repeat: no-repeat;
        background-size: 16px;
    }

    &::-webkit-scrollbar-button:single-button:vertical:decrement {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTAuNSAxNiAxNiIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj4KPG1ldGFkYXRhPk1hZGUgd2l0aCBQaXhlbHMgdG8gU3ZnIGh0dHBzOi8vY29kZXBlbi5pby9zaHNoYXcvcGVuL1hieHZOajwvbWV0YWRhdGE+CjxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTcgNWgxTTYgNmgzTTUgN2g1TTQgOGg3IiAvPgo8L3N2Zz4=');
    }

    &::-webkit-scrollbar-button:single-button:vertical:increment {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTAuNSAxNiAxNiIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj4KPG1ldGFkYXRhPk1hZGUgd2l0aCBQaXhlbHMgdG8gU3ZnIGh0dHBzOi8vY29kZXBlbi5pby9zaHNoYXcvcGVuL1hieHZOajwvbWV0YWRhdGE+CjxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTQgNWg3TTUgNmg1TTYgN2gzTTcgOGgxIiAvPgo8L3N2Zz4=');
    }

    &::-webkit-scrollbar-button:single-button:horizontal:decrement {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTAuNSAxNiAxNiIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj4KPG1ldGFkYXRhPk1hZGUgd2l0aCBQaXhlbHMgdG8gU3ZnIGh0dHBzOi8vY29kZXBlbi5pby9zaHNoYXcvcGVuL1hieHZOajwvbWV0YWRhdGE+CjxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTggM2gxTTcgNGgyTTYgNWgzTTUgNmg0TTYgN2gzTTcgOGgyTTggOWgxIiAvPgo8L3N2Zz4=');
    }

    &::-webkit-scrollbar-button:single-button:horizontal:increment {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTAuNSAxNiAxNiIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj4KPG1ldGFkYXRhPk1hZGUgd2l0aCBQaXhlbHMgdG8gU3ZnIGh0dHBzOi8vY29kZXBlbi5pby9zaHNoYXcvcGVuL1hieHZOajwvbWV0YWRhdGE+CjxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTYgM2gxTTYgNGgyTTYgNWgzTTYgNmg0TTYgN2gzTTYgOGgyTTYgOWgxIiAvPgo8L3N2Zz4=');
    }

    &::-webkit-scrollbar-corner {
        background: silver;
    }
`;

export const retroTextGradient = css`
    color: #c6cbf5;
    background: -webkit-linear-gradient(
        top,
        #b5b4fa,
        #48d5f8 40%,
        #7414c4 40%,
        #f193d5 65%,
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
    100% {
        background-position: 100% 50%
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

export const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

export const fadeUp = keyframes`
    from {
        transform: translateY(16px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

export const popIn = keyframes`
    from {
        transform: scale(0);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity:1;
    }
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

export const retroTextMarker = css`
    position: relative;
    font-family: 'Permanent Marker', cursive;
    background-image: -webkit-linear-gradient(#ff0ff8 0%, #f9f9f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-filter: drop-shadow(2px 2px 20px #f008b7);
`;

export const newRetroText = css`
    position: relative;
    font-family: 'Exo';
    transform: skew(-15deg);
    letter-spacing: 0.02em;
    text-transform: uppercase;

    span:first-child {
        background: linear-gradient(
            #064274 25%,
            #15affc 35%,
            #ffffff 50%,
            #271574 50%,
            #6413e7 55%,
            #ff61af 75%
        );
        -webkit-text-stroke: 0.01em #94a0b9;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

export const newRetroTextCursive = css`
    font-family: 'Mr Dafoe';
    font-weight: bold;
    color: #ffffff;
    text-shadow: 0 0 8px #d400ff, 0 0 0.3em #fe05e1, 0 0 0.8em #e100ff;
`;

export const shadowOutline = props => css`
    box-shadow: 0 0 0 ${props?.width || 3}px ${props?.color || '#5eddfd'};
`;

export { colors, theme };
