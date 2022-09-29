import styled, { keyframes } from 'styled-components';

const blip = keyframes`
0% {
    transform: scale(0);
    opacity: 1;
}
2% {
    transform: scale(1.2) rotate(0deg);
    opacity: 1;
}
3% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
}
4% {
    transform: scale(1) rotate(180deg);
    opacity: 0;
}
50% {
    transform: scale(1) rotate(180deg);
    opacity: 0;
}
`;

export const Spark = styled.span`
    line-height: 0;
    position: absolute;
    width: 37px;
    height: 45px;
    z-index: 999;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='120 250 1700 1200' width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3C!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ --%3E%3Cg%3E%3Ctitle%3Ebackground%3C/title%3E%3Crect fill='none' id='canvas_background' height='402' width='182' y='-1' x='-1'/%3E%3Cg display='none' overflow='visible' y='0' x='0' height='100%25' width='100%25' id='canvasGrid'%3E%3Crect fill='url(%23gridpattern)' stroke-width='0' y='0' x='0' height='100%25' width='100%25'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Ctitle%3ELayer 1%3C/title%3E%3Cellipse ry='183' rx='5' id='svg_2' cy='197.0375' cx='274.5' stroke-width='0' stroke='%23000' fill='%23fff'/%3E%3Cellipse transform='rotate(90 274.50000000000006,197.03750610351565) ' ry='183' rx='5' id='svg_3' cy='197.0375' cx='274.5' stroke-width='0' stroke='%23000' fill='%23fff'/%3E%3Cellipse stroke='%23000' transform='rotate(126.69925689697266 276.19342041015625,195.4363708496094) ' ry='90.194158' rx='3.223029' id='svg_4' cy='195.43637' cx='276.193439' stroke-width='0' fill='%23fff'/%3E%3Cellipse stroke='%23000' transform='rotate(-134.6077117919922 276.19342041015625,195.43637084960938) ' ry='90.194158' rx='3.223029' id='svg_5' cy='195.43637' cx='276.193439' stroke-width='0' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E");
    filter: blur(0.5px);
    transform: scale(0);
    animation: ${blip} 10s infinite;
    animation-delay: ${({ delay }) => `${delay}s`};
    animation-timing-function: ease-in-out;
`;
