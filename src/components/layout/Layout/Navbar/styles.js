import styled, { keyframes } from 'styled-components';
import { lightShine, noSelect, retroTextCursive, retroTextGradient } from 'shared/styles';
import { Dropdown, Icon, IconButton } from 'components/common';
import { NavButton } from '../NavLink';

export const NavbarContainer = styled.nav`
    width: 100%;
    position: absolute;
    z-index: 4;
    -webkit-tap-highlight-color: transparent;
    ${noSelect}
`;

export const NavContent = styled.div`
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 8px 16px;
    position: relative;
    z-index: 4;
    
    @media (max-width: 650px) {
        padding: 16px;
        padding-left: 4px;
    }
`;

export const LeftSection = styled.div``;

export const RightSection = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
`;

export const Logo = styled.img`
    position: relative;
    top: 16px;
    width: 72px;
    height: 72px;
    object-fit: contain;
    margin-right: 4px;
    display: inline-block;

    @media (max-width: 768px) {
        width: 50px;
        height: 50px;
        top: 8px;
    }

    @media (max-width: 710px) {
        top: 1px;
        margin-right: 0;
    }

    @media (max-width: 520px) {
        width: 36px;
        height: 36px;
    }
`;

export const BrandColumn = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    @media (max-width: 710px) {
        display: none;
    }
`;

export const LogoName = styled.span`
    position: relative;
    font-size: 36px;
    line-height: 54px;
    font-family: Montserrat;
    color: #dd21d4;
    text-transform: uppercase;
    ${retroTextGradient}
    ${lightShine('RANDOM')}
    @media (max-width: 768px) {
        font-size: 28px;
    }
`;

export const LogoName2 = styled.span`
    font-size: 32px;
    position: absolute;
    left: -4px;
    top: 42px;
    text-transform: uppercase;
    ${retroTextCursive}

    @media (max-width: 768px) {
        font-size: 24px;
        top: 38px;
    }
`;

export const LogoRow = styled.a`
    display: flex;
    align-items: center;
    text-decoration: none;
`;

export const NavIcon = styled(Icon)`
    margin-right: 8px;
    min-width: 28px;
`;

export const ConnectButton = styled(NavButton)`
    margin: 0 16px;
`;

export const ConnectedUser = styled.div`
    display: flex;
    background-color: #3e247a;
    padding: 4px 8px;
    border-radius: 10px;
    align-items: center;
    border: 2px solid #721b6b;
    border-radius: 10px;
    font-size: 14px;
    margin: 0 16px;
    box-sizing: border-box;
    @media (max-width: 400px) {
        margin: 0 12px;
    }
`;

export const CurrencyAmount = styled.div`
    margin-right: 8px;
    color: white;
    @media (max-width: 500px) {
        display: none
    }
`;

export const UserAddress = styled.button`
    color: white;
    padding: 4px 8px;
    border-radius: 7px;
    background-color: #1c0e3d;
`;

export const SpilloverButton = styled(IconButton)`
    pointer-events: ${({ isOpen }) => (isOpen ? 'none' : 'initial')};;
`;

export const SpilloverDropdown = styled(Dropdown)`
    width: 250px;
`;

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
    line-height:0;
    position:absolute;
    width:37px;
    height:45px;
    z-index:999;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='120 250 1700 1200' width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3C!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ --%3E%3Cg%3E%3Ctitle%3Ebackground%3C/title%3E%3Crect fill='none' id='canvas_background' height='402' width='182' y='-1' x='-1'/%3E%3Cg display='none' overflow='visible' y='0' x='0' height='100%25' width='100%25' id='canvasGrid'%3E%3Crect fill='url(%23gridpattern)' stroke-width='0' y='0' x='0' height='100%25' width='100%25'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Ctitle%3ELayer 1%3C/title%3E%3Cellipse ry='183' rx='5' id='svg_2' cy='197.0375' cx='274.5' stroke-width='0' stroke='%23000' fill='%23fff'/%3E%3Cellipse transform='rotate(90 274.50000000000006,197.03750610351565) ' ry='183' rx='5' id='svg_3' cy='197.0375' cx='274.5' stroke-width='0' stroke='%23000' fill='%23fff'/%3E%3Cellipse stroke='%23000' transform='rotate(126.69925689697266 276.19342041015625,195.4363708496094) ' ry='90.194158' rx='3.223029' id='svg_4' cy='195.43637' cx='276.193439' stroke-width='0' fill='%23fff'/%3E%3Cellipse stroke='%23000' transform='rotate(-134.6077117919922 276.19342041015625,195.43637084960938) ' ry='90.194158' rx='3.223029' id='svg_5' cy='195.43637' cx='276.193439' stroke-width='0' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E");
    filter:blur(0.5px);
    transform:scale(0);
    animation: ${blip} 10s infinite;
    animation-delay: ${({ delay }) => `${delay}s`};;
    animation-timing-function: ease-in-out;
`;
