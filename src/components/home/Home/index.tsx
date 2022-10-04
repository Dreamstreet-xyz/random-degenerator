import StarsCanvas from 'components/layout/AppLayout/StarsCanvas';
import { useTransform, useScroll } from 'framer-motion';
import { PopupIntoView, Spark } from 'components/misc';
import {
    Container,
    HeroSection,
    BrandContainer,
    FirstName,
    LastName,
    PrimaryCta,
    PoweredBy,
    BrandLogo,
    ContentSection,
    SectionTitle,
    Subtitle,
    Row,
    Column,
    CoinsContainer,
    CoinsMarquee,
    CoinIcon,
    SecondaryNavLink,
    SecondaryLink,
    Grid,
    ScrollToExplore,
    ScrollToExploreContent,
    StarsContainer,
} from './styles';
import Footer from './Footer';

const coins = [
    'aave',
    'ada',
    'algo',
    'ape',
    'bnb',
    'btc',
    'doge',
    'eos',
    'eth',
    'link',
    'matic',
    'mkr',
    'sol',
    'sushi',
    'uni',
    'xrp',
    'xtz',
    'yfi',
];

export const Home = () => {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 150, 800], [1, 0.8, 0.15]);
    const translateY = useTransform(scrollY, [600, 2000], [800, -300]);
    const containerTranslateY = useTransform(scrollY, [600, 2000], [-800, 300]);
    const heroOpacity = useTransform(scrollY, [200, 600], [1, 0]);
    const scrollIndicatorOpacity = useTransform(scrollY, [0, 600], [1, 0]);

    return (
        <Container>
            <StarsContainer style={{ opacity }}>
                <StarsCanvas />
            </StarsContainer>
            <HeroSection style={{ opacity: heroOpacity }}>
                <BrandContainer>
                    <FirstName>
                        <span>Random</span>
                        <Spark delay={1.6} style={{ left: -12, top: 0 }} scale={1.2} />
                    </FirstName>
                    <LastName>Degenerator</LastName>
                </BrandContainer>
                <PrimaryCta href="./">Let's go!</PrimaryCta>
                <PoweredBy>
                    <BrandLogo src="images/home/gains_logo.png" />
                    <BrandLogo src="images/home/polygon_logo.svg" />
                    <BrandLogo src="images/home/arbitrum_logo.svg" />
                </PoweredBy>
                <ScrollToExplore style={{ opacity: scrollIndicatorOpacity }}>
                    <ScrollToExploreContent>
                        <div />
                        <span>Scroll to Explore</span>
                    </ScrollToExploreContent>
                </ScrollToExplore>
            </HeroSection>
            <ContentSection>
                <Row>
                    <Column>
                        <PopupIntoView>
                            <SectionTitle>Try your luck!</SectionTitle>
                        </PopupIntoView>
                        <Subtitle></Subtitle>
                    </Column>
                    <Column>
                        hey
                        <div></div>
                    </Column>
                </Row>
            </ContentSection>
            <ContentSection>
                <Row>
                    <Column>
                        <PopupIntoView scale={1.1} duration={1.25} distance={0}>
                            <SectionTitle>We've got your favorites!</SectionTitle>
                        </PopupIntoView>
                        <PopupIntoView duration={1.25}>
                            <Subtitle>39 crypto pairs and more coming!</Subtitle>
                        </PopupIntoView>
                    </Column>
                </Row>
                <Row>
                    <CoinsContainer style={{ translateY: containerTranslateY }}>
                        <CoinsMarquee style={{ translateY }}>
                            {coins.map((coin, index) => (
                                <CoinIcon
                                    key={index}
                                    style={{ rotateY: index * 20, translateZ: 400 }}
                                    animate={{
                                        rotateY: -360 + index * 20,
                                    }}
                                    transition={{
                                        type: 'tween',
                                        duration: 60,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}
                                    src={`images/tokens/${coin}.svg`}
                                />
                            ))}
                        </CoinsMarquee>
                    </CoinsContainer>
                </Row>
            </ContentSection>
            <ContentSection>
                <Row>
                    <Column>
                        <SectionTitle>Built on gTrade</SectionTitle>
                        <SecondaryLink href="https://gains.trade" target="_blank">
                            Go to gTrade
                        </SecondaryLink>
                    </Column>
                    <Column>
                        <Grid src="images/home/grid.svg" />
                    </Column>
                </Row>
            </ContentSection>
            <ContentSection>
                <Row>
                    <Column>
                        <SectionTitle>What are you waiting for?</SectionTitle>
                    </Column>
                </Row>
                <Row>
                    <PopupIntoView scale={0} duration={0.3} distance={0}>
                        <SecondaryNavLink href="./">I'm ready!</SecondaryNavLink>
                    </PopupIntoView>
                </Row>
            </ContentSection>
            <Footer />
        </Container>
    );
};
