import StarsCanvas from 'components/layout/AppLayout/StarsCanvas';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
    const translateY = useTransform(scrollY, [800, 1800], [400, -300]);
    const containerTranslateY = useTransform(scrollY, [800, 1800], [-400, 300]);
    const [ref1, vis1] = useInView({ threshold: 1 });
    const [ref2, vis2] = useInView({ threshold: 1 });

    useEffect(() => {
        window.history.scrollRestoration = 'manual';
    }, []);

    return (
        <Container>
            <motion.div
                style={{
                    opacity,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: -1,
                }}
            >
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
                        <SectionTitle
                            ref={ref1}
                            style={{ opacity: 0, translateY: 24 }}
                            animate={vis1 && { opacity: 1, translateY: 0 }}
                            transition={{
                                type: 'tween',
                                duration: 0.75,
                                ease: 'easeOut',
                            }}
                        >
                            Try your luck!
                        </SectionTitle>
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
                        <SectionTitle
                            ref={ref2}
                            style={{ opacity: 0, scale: 1.075 }}
                            animate={vis2 && { opacity: 1, scale: 1 }}
                            transition={{
                                type: 'tween',
                                duration: 1.25,
                                ease: 'easeOut',
                            }}
                        >
                            We've got your favorites!
                        </SectionTitle>
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
