import styled from 'styled-components';
import Link from 'components/common/NavLink';
import { popIn, shadowOutline } from 'shared/styles';

export const Container = styled.nav`
    width: 100%;
    z-index: 9;
    position: absolute;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 4px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px;
`;

export const LeftSection = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    opacity: 0;
    animation: ${popIn} .25s ease-in-out forwards;
    animation-delay: .6s;
`;

export const NavLink = styled(Link)`
    border-bottom: 4px solid transparent;
    height: 42px;
    padding: 4px 8px 0;
    color: white;
    
    &:hover {
        border-bottom: 4px solid rgb(119, 246, 255);
    }

    @media (max-width: 800px) {
        display: none;
    }
`;

export const RightSection = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    opacity: 0;
    animation: ${popIn} .25s ease-in-out forwards;
    animation-delay: .6s;
`;

export const AppLink = styled(Link)`
    padding: 10px 32px;
    background: linear-gradient(45deg, #f838ff, #a31efc);
    border-radius: 8px;
    color: white;
    text-align: center;
    height: auto;
    line-height: 1;
    outline: none;

    &:hover,
    &:focus {
        text-decoration: none;
        ${shadowOutline()}
    }
`;

export const Logo = styled.img`
    position: relative;
    width: 48px;
    margin-right: 16px;
    display: inline-block;
    cursor: pointer;

    @media (max-width: 710px) {
        margin-right: 0;
    }

    @media (max-width: 520px) {
        width: 36px;
        height: 36px;
    }
`;
