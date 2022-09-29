import styled, { keyframes } from 'styled-components';
import NavLink from 'components/common/NavLink';
import { shadowOutline } from 'shared/styles';

const popIn = keyframes`
    from {
        transform: scale(0);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity:1;
    }
`;

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

`;

export const LeftSection = styled.div`
    display: flex;
    align-items: center;
    animation-delay: .6s;
    animation: ${popIn} .25s ease-in-out forwards;
`;

export const RightSection = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    animation-delay: .6s;
    animation: ${popIn} .25s ease-in-out forwards;
`;

export const AppLink = styled(NavLink)`
    padding: 10px 32px;
    background: linear-gradient(45deg, #f838ff, #a31efc);
    border-radius: 10px;
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

    @media (max-width: 710px) {
        margin-right: 0;
    }

    @media (max-width: 520px) {
        width: 36px;
        height: 36px;
    }
`;
