import styled, { keyframes, css } from 'styled-components';
import NavLink from 'components/common/NavLink';
import { fadeIn, fadeUp, lightShine, newRetroText, newRetroTextCursive, shadowOutline } from 'shared/styles';
import { motion } from 'framer-motion';

export const Container = styled.div`
`;

export const HeroSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 48px;
    transform: translateY(0px);
    min-height: calc(100vh - 64px);
`;

export const BrandContainer = styled.div`
    font-size: 96px;
    opacity: 0;
    animation: ${fadeIn} .5s ease-in-out forwards;
    animation-delay: .75s;
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
    opacity: 0;
    animation: ${fadeUp} .5s ease-in-out forwards;
    animation-delay: 1s;
`;

export const PoweredBy = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    height: 32px;
    opacity: 0;
    animation: ${fadeUp} .5s ease-in-out forwards;
    animation-delay: 1.25s;
`;

export const BrandLogo = styled.img`
    width: 24px;
`;

export const ContentSection = styled.div`
    padding: 250px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
`;

export const SectionTitle = styled.h2`
    font-size: 48px;
    font-weight: 700;
    font-family: Montserrat;
`;

export const Subtitle = styled.p`
    font-size: 20px;
    color: #9292c5;
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

export const CoinsContainer = styled(motion.div)`
    perspective: 1200px;
    position: relative;
    margin-top: 100px;
`;

export const CoinsMarquee = styled(motion.div)`
    position: absolute;
    display: flex;
    gap: 16px;
    backface-visibility: hidden;
    z-index: 0;
    transform: translateZ(100px);
    transform-style: preserve-3d;
`;

export const CoinIcon = styled(motion.img)`
    position: absolute;
    left: 10px;
    top: 10px;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    transform-origin: -12px 50% -250px;
    image-rendering: optimizeQuality;
`;

const secondaryCta = css`
    border: 1px solid #392c58;
    color: #db2aff;
    height: 32px;
    padding: 8px 48px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    outline: none;

    &:hover,
    &:focus {
        text-decoration: none;
        border-color: #ff2aed;
        color: #ff2aed;
        text-shadow: 0 0 8px #ff2aed50;
        box-shadow: 0 0 24px 8px #ff2aed50;
    }
`;

export const SecondaryNavLink = styled(NavLink)`
    ${secondaryCta}
`;

export const SecondaryLink = styled.a`
    ${secondaryCta}
    display: block;
    text-decoration: none;
    width: max-content;
    line-height: 32px;
`;

export const Grid = styled.img`
    width: 300px;
    filter: invert(.3);
    transform: perspective(20px) rotateX(30deg) scale(1, .25);
`;
