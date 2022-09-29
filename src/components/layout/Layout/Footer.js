import { CoinLink } from 'components/common';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
    position: relative;
    z-index: 3;
    width: 100%;
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 32px;
    height: 250px;
    padding-top: 64px;
`;

const CoinsRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 320px;
`;

const BottomRow = styled.div`
    margin: auto auto 0;
    max-width: 820px;
    width: 100%;
    display: flex;
`;

const shine = keyframes`
    to {
      background-position: 200% center;
    }
`;

const LeftSection = styled.div`
    span {
        font-size: 11px;
        background: linear-gradient(
            to right,
            #b984ff 10%,
            #fa66ff 40%,
            #ff6694 60%,
            #fa66ff 80%,
            #b984ff 100%
        );
        text-shadow: 0px 0px 12px #ff46c7;
        background-size: 200% auto;
        color: #ff38c3;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: ${shine} 5s linear infinite;
        letter-spacing: 2px;
        text-transform: uppercase;
        font-family: 'Fira Mono';
    }
`;
const RightSection = styled.div`
    margin-left: auto;
`;

const GithubCoin = styled(CoinLink)`
    background-image: url('/images/home/github_coin.png');

    &::before {
        background-image: url('/images/home/github_coin.png');
    }
`;

export default function Footer() {
    return (
        <Container>
            <CoinsRow>
                <GithubCoin href="https://github.com" />
                <GithubCoin href="https://github.com" />
                <GithubCoin href="https://github.com" />
            </CoinsRow>
            <BottomRow>
                <LeftSection>
                    <span>© Dreamstreet</span>
                </LeftSection>
                <RightSection></RightSection>
            </BottomRow>
        </Container>
    );
}
