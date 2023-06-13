import styled from 'styled-components';
import { lightShine, noSelect } from 'shared/styles';
import { Menu } from 'components/common/Dropdown/styles';
import { Dropdown, Icon, IconButton, Identicon } from 'components/common';
import NavLink, { NavButton } from 'components/common/NavLink';

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

export const Logo = styled.img`
    position: relative;
    display: none;

    @media (max-width: 768px) {
        width: 36px;
        height: 36px;
        display: block;
    }
`;

export const BrandColumn = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    @media (max-width: 768px) {
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
    border-radius: 8px;
    align-items: center;
    border: 1px solid #a400aa;
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
    @media (max-width: 850px) {
        display: none
    }
`;

export const UserInfo = styled.button`
    color: white;
    padding: 4px 8px;
    border-radius: 6px;
    background-color: #1c0e3d;
    font-family: 'Fira Mono', monospace;
    display: flex;
    align-items: center;
    gap: 4px;
    &:hover {
        background-color: #220f50;
    }
`;

export const UserIcon = styled(Identicon)`
    @media (max-width: 410px) {
        display: none;
    }
`;

export const UserAddress = styled.span`
`;

export const SpilloverDropdown = styled(Dropdown)`
`;

export const SpilloverMenu = styled(Menu)`
    gap: 8px;
`;

export const SpilloverButton = styled(IconButton)`
`;

export const SpilloverLink = styled(NavLink)`
    text-decoration: none;
    border-radius: 8px;
    color: white;
    &:hover {
        background-color: #ffffff11;
        text-decoration: none;
    }
`;
