import StarsCanvas from 'components/layout/AppLayout/StarsCanvas';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
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
    Row,
    Column,
    CoinsContainer,
    CoinsMarquee,
    CoinIcon,
    SecondaryCta,
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
    const { scrollY } = useViewportScroll();
    const opacity = useTransform(scrollY, [0, 150, 600], [1, 0.8, 0]);

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
                    </Column>
                    <Column>hey</Column>
                </Row>
                <Row>
                    <CoinsContainer>
                        <CoinsMarquee>
                            {coins.map((coin, index) => (
                                <CoinIcon
                                    key={index}
                                    style={{ rotateY: index * 20, translateZ: 400 }}
                                    animate={{
                                        rotateY: -360 + index * 20,
                                    }}
                                    transition={{
                                        type: 'tween',
                                        duration: 180,
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
                        <SectionTitle>What are you waiting for?</SectionTitle>
                    </Column>
                </Row>
                <Row>
                    <SecondaryCta href="./">I'm ready!</SecondaryCta>
                </Row>
            </ContentSection>
        </Container>
    );
};
