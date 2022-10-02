import StarsCanvas from 'components/layout/AppLayout/StarsCanvas';
import { motion, useTransform, useScroll } from 'framer-motion';
import { Spark } from 'components/misc/Spark';
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
} from './styles';
import { useEffect } from 'react';

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
    const opacity = useTransform(scrollY, [0, 150, 800], [1, 0.8, 0]);
    const translateY = useTransform(scrollY, [1200, 1800], [200, -200]);
    const containerTranslateY = useTransform(scrollY, [1200, 1800], [-200, 200]);

    useEffect(() => {
        window.history.scrollRestoration = 'manual';
    }, []);

    return (
        <Container>
            <motion.div style={{ opacity }}>
                <StarsCanvas />
            </motion.div>
            <HeroSection>
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
            </HeroSection>
            <ContentSection>
                <Row>
                    <Column>
                        <SectionTitle>Try your luck!</SectionTitle>
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
                        <SectionTitle>We've got your favorites!</SectionTitle>
                        <Subtitle>39 crypto pairs and more coming!</Subtitle>
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
                    <SecondaryNavLink href="./">I'm ready!</SecondaryNavLink>
                </Row>
            </ContentSection>
        </Container>
    );
};
