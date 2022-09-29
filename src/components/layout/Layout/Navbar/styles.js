import NavLink, { NavAnchor } from 'components/common/NavLink';
import styled from 'styled-components';

export const Container = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: transparent;
    z-index: 9;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 4px;
    display: flex;
    align-items: center;
    width: 100%;
`;

export const LeftSection = styled.div`
    margin-left: 16px;
    display: flex;
    align-items: center;
`;

export const RightSection = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
`;

export const AppLink = styled(NavLink)`
    padding: 12px 48px;
    border-radius: 5px;
    color: white;
    background: linear-gradient(45deg, #ff4ef67f, #4ee4ff6f);
    backdrop-filter: blur(2px);
    text-align: center;
    height: auto;
    line-height: 1;
    transition: backdrop-filter .15s, filter .15s;
    &:hover {
        text-decoration: none;
        box-shadow: 0 0 0 3px #5eddfd;
        backdrop-filter: blur(10px);
        filter: brightness(1.5);
    }
`;

export const Logo = styled.img`
    position: relative;
    width: 48px;
    height: 48px;
    object-fit: contain;
    margin-right: 4px;
    display: inline-block;

    @media (max-width: 710px) {
        margin-right: 0;
    }

    @media (max-width: 520px) {
        width: 36px;
        height: 36px;
    }
`;
