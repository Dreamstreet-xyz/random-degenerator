import styled, { css } from 'styled-components';
import { Banner as DefaultBanner } from 'components/common';
import { noSelect, retroTextGradient, retroTextMarker } from 'shared/styles';

export const Container = styled.div`
    width: 100%;
    overflow-x: hidden;
    @media (max-width: 500px) {
        margin-top: 80px;
    }
`;

export const InsufficientFundsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const InsufficientFunds = styled.span`
    color: #c6cbf5;
    font-family: Roboto;
    font-size: 1.8rem;
    font-weight: 1000;
    line-height: 1.2;
    text-transform: uppercase;
    text-align: center;
    ${retroTextGradient}

    @media (max-width: 550px) {
        display: block;
    }
`;

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 500px) {
        justify-content: flex-start;
        min-height: auto;
        padding: 32px 0 128px 0;
    }
`;

export const BannerContainer = styled.div`
    position: relative;
    max-width: 550px;
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const Banner = styled(DefaultBanner)`
    position: absolute;
    bottom: 16px;
    flex: 1;
    width: 100%;
    border-radius: 20px;
    z-index: 5;
    background: linear-gradient(45deg, #f5355f, #ff465f);

    @media (max-width: 768px) {
        position: relative;
    }
`;

export const LinksContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 32px;

    @media (max-width: 590px) {
        flex-direction: column;
    }
`;

export const LinksDivider = styled.div`
    margin: 16px;
    ${retroTextMarker}
    font-size: 20px;
`;

export const Link = styled.a`
    display: flex;
    width: 200px;
    padding: 16px;
    font-size: 16px;
    font-weight: bold;
    background-color: #538de433;
    border-radius: 10px;
    text-decoration: none;
    color: white;
    ${noSelect}

    &:hover,
    &:active {
        background-color: #538de455;
    }
`;

export const LinkImage = styled.img`
    width:  32px;
    height: 32px;
    margin-right: 12px;
`;
