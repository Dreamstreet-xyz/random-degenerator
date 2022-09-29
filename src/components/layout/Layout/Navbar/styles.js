import NavLink from 'components/common/NavLink';
import { shadowOutline } from 'shared/styles';
import styled from 'styled-components';

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
    padding: 10px 32px;
    background: linear-gradient(45deg, #f838ff, #a31efc);
    border-radius: 5px;
    color: white;
    text-align: center;
    height: auto;
    line-height: 1;

    &:hover {
        text-decoration: none;
        ${shadowOutline()}
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
