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
} from './styles';
import { useEffect } from 'react';

export const Home = () => {
    const { scrollY } = useViewportScroll();
    const opacity = useTransform(scrollY, [0, 300, 500], [1, 0.9, 0]);

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
                        <SectionTitle>We've got your favorites!</SectionTitle>
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
            </ContentSection>
            <ContentSection>
                <Row>
                    <Column>
                        <SectionTitle>We've got your favorites!</SectionTitle>
                    </Column>
                    <Column>hey</Column>
                </Row>
            </ContentSection>
        </Container>
    );
};
