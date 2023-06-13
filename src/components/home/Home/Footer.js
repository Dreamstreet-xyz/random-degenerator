import { CoinLink } from 'components/common';
import { PopupIntoView } from 'components/misc';
import { retroAnimatedGradient } from 'shared/styles';
import styled from 'styled-components';

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
    padding-bottom: 4px;
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

const LeftSection = styled.div`
    display: flex;
    align-items: center;

    span {
        display: flex;
        gap: 4px;
        align-items: center;
        font-size: 11px;
        ${retroAnimatedGradient}
        letter-spacing: 2px;
        text-transform: uppercase;
        font-family: 'Fira Mono';
    }
`;

const Brand = styled.span`
    height: 16px;
`;

const RightSection = styled.div`
    margin-left: auto;
`;

const TelegramCoin = styled(CoinLink)`
    background-image: url('/images/home/coin_telegram.png');

    &::before {
        background-image: url('/images/home/coin_telegram.png');
    }
`;

const TwitterCoin = styled(CoinLink)`
    background-image: url('/images/home/coin_twitter.png');

    &::before {
        background-image: url('/images/home/coin_twitter.png');
    }
`;

const GithubCoin = styled(CoinLink)`
    background-image: url('/images/home/coin_github.png');

    &::before {
        background-image: url('/images/home/coin_github.png');
    }
`;

const Link = styled.a`
    display: block;
    padding: 4px 8px;
    border-radius: 6px;
    text-decoration: none;
    &:hover {
        background-color: #ffffff11;
    }
`;

export default function Footer() {
    return (
        <Container>
            <CoinsRow>
                <PopupIntoView duration={0.3} delay={0.1} margin="0px">
                    <TelegramCoin href="https://t.me/randomdegenerator" />
                </PopupIntoView>
                <PopupIntoView duration={0.3} delay={0.25} margin="0px">
                    <TwitterCoin href="https://twitter.com/rdgxyz" />
                </PopupIntoView>
                <PopupIntoView duration={0.3} delay={0.4} margin="0px">
                    <GithubCoin href="https://github.com/Dreamstreet-xyz/random-degenerator" />
                </PopupIntoView>
            </CoinsRow>
            <BottomRow>
                <LeftSection>
                    <PopupIntoView duration={0.2} delay={0.5} distance={0} scale={0} margin="0px">
                        <Link href="https://github.com/Dreamstreet-xyz" target="_blank">
                            <Brand>
                                <span>
                                    <span
                                        style={{
                                            display: 'block',
                                            fontFamily: 'Roboto',
                                        }}
                                    >
                                        ©
                                    </span>
                                    Dreamstreet
                                </span>
                            </Brand>
                        </Link>
                    </PopupIntoView>
                </LeftSection>
                <RightSection>
                    <PopupIntoView duration={0.2} delay={0.65} distance={0} scale={0} margin="0px">
                        <Link href="https://gains.trade/decentralized-trading" target="_blank">
                            🍏💪💪
                        </Link>
                    </PopupIntoView>
                </RightSection>
            </BottomRow>
        </Container>
    );
}
