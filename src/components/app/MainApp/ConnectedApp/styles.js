import styled, { css } from 'styled-components';
import { Banner as DefaultBanner } from 'components/common';
import { pulsingGlow } from 'shared/styles';

export const Container = styled.div`
    width: 100%;
    overflow-x: hidden;
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

    ${({ invalid }) => (invalid && css`
        background-color: #f5355f;
        background: linear-gradient(45deg, #f5355f, #ff465f);
    `)}

    @media (max-width: 768px) {
        position: relative;
    }
`;

export const GlowBanner = styled(Banner)`
    box-shadow: 0px 0px 8px 4px #ff1bce61;
    ${pulsingGlow}
    &::after {
        border-radius: 20px;
        box-shadow: 0px 0px 8px 4px #ff1b7a61;
    }
`;
