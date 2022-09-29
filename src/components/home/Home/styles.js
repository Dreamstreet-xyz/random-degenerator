import NavLink from 'components/common/NavLink';
import { lightShine, newRetroText, newRetroTextCursive, shadowOutline } from 'shared/styles';
import styled from 'styled-components';

export const Container = styled.div`
`;

export const HeroSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 48px;
    transform: translateY(-24px);
    min-height: calc(100vh - 64px);
`;

export const BrandContainer = styled.div`
    font-size: 96px;
`;

export const FirstName = styled.h1`
    position: relative;
    margin-bottom: -28px;
    margin-left: 18px;
    ${newRetroText}
    span:first-child {
        ${lightShine('RANDOM')}
    }
`;

export const LastName = styled.span`
    ${newRetroTextCursive}
`;

export const PrimaryCta = styled(NavLink)`
    background: linear-gradient(45deg, #c125ff, #ff36de);
    color: white;
    height: 32px;
    padding: 8px 64px;
    border-radius: 10px;
    font-size: 18px;
    outline: none;

    &:hover,
    &:focus {
        text-decoration: none;
        ${shadowOutline()}
    }
`;

export const PoweredBy = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    height: 32px;
`;

export const BrandLogo = styled.img`
    width: 24px;
`;

export const ContentSection = styled.div`
    padding: 200px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const SectionTitle = styled.h2`
    font-size: 48px;
    font-weight: 700;
    font-family: Montserrat;
`;

export const Subtitle = styled.p`
    font-size: 28px;
    
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 48px;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;
