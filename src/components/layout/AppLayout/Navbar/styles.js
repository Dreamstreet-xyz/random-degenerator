import styled, { keyframes } from 'styled-components';
import { lightShine, noSelect, retroTextCursive, retroTextGradient } from 'shared/styles';
import { Dropdown, Icon, IconButton } from 'components/common';
import { NavButton } from 'components/common/NavLink';

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
    padding: 16px;
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

export const BrandColumn = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    @media (max-width: 710px) {
        display: none;
    }
`;

export const LogoName = styled.h1`
    position: relative;
    font-size: 42px;
    line-height: 42px;
    font-family: 'Exo';
    transform: skew(-15deg);
    letter-spacing: 0.02em;
    text-transform: uppercase;
    margin-left: 8px;
    
    @media (max-width: 768px) {
        font-size: 28px;
    }

    span:first-child {
        position: absolute;
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
        ${lightShine('RANDOM')}
    }
`;

export const LogoName2 = styled.h2`
    font-size: 42px;
    position: absolute;
    left: -4px;
    top: 30px;
    font-family: 'Mr Dafoe';
    font-weight: bold;
    color: #ffffff;
    text-shadow: 0 0 8px #d400ff, 0 0 0.3em #fe05e1, 0 0 0.8em #e100ff;

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
    border: 1px solid #a400aa;
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
    font-family: 'Fira Mono', monospace;
`;

export const SpilloverButton = styled(IconButton)`
    pointer-events: ${({ isOpen }) => (isOpen ? 'none' : 'initial')};;
`;

export const SpilloverDropdown = styled(Dropdown)`
    width: 250px;
`;
