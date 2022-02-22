import styled from 'styled-components';
import AppLayout from 'components/layout/AppLayout';
import { gradientShine, retroTextGradient } from 'shared/styles';
import FAQ from 'components/about/FAQ';
import { Paragraph } from 'components/about/FAQ/styles';

const PageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    padding-top: min(150px, 15vh);
    padding-bottom: 76px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1280px;
    width: 100%;
    background-color: #150736ee;
    border-radius: 20px;
    padding: 64px;
    @media (max-width: 1000px) {
        padding: 32px 16px;
    }
`;

const Header = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
`;

const Title = styled.span`
    font-size: 32px;
    font-weight: bold;
    font-family: Montserrat;
    text-transform: uppercase;
    text-align: center;
    ${retroTextGradient}

    @media (max-width: 700px) {
        font-size: 24px;
    }
`;

const Decoration = styled.div`
    width: 60px;
    height: 6px;
    border-radius: 6px;
    background: linear-gradient(45deg, #a526b6, #6625ff);
    margin-bottom: 24px;
    background-size: 300%;
    animation: ${gradientShine} 8s linear infinite;
`;

const ActionRow = styled.div`
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 8px;
    bottom: 0;
`;

const PlayButton = styled.button`
    padding: 12px 64px;
    font-size: 24px;
    font-weight: bold;
    border-radius: 10px;
    background-color: #e010cf;
    background: linear-gradient(-45deg, #8342eb, #ff3d77);
    background-size: 300%;
    animation: ${gradientShine} 8s linear infinite;
    color: white;
`;

const Content = styled.div`
    width: 100%;
    display: flex;
`;

const Sidebar = styled.div`
    flex: 0 0 260px;
    margin-right: 64px;

    @media (max-width: 10000px) {
        display: none;
    }

    @media (max-width: 900px) {
        flex-basis: 200px;
    }
`;

const MainContent = styled.div`
    flex: 1;
`;

const Section = styled.section`
    &:not(:last-of-type) {
        margin-bottom: 128px;
    }
`;
export default function About() {
    return (
        <PageContainer>
            <Container>
                <Content>
                    <MainContent>
                        <Section>
                            <Header>
                                <h2>
                                    <Title>Embrace your inner degen!</Title>
                                </h2>
                            </Header>
                        </Section>
                        <FAQ />
                    </MainContent>
                </Content>
            </Container>
        </PageContainer>
    );
}

About.layout = AppLayout;
