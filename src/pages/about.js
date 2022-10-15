import Head from 'next/head';
import styled from 'styled-components';
import AppLayout from 'components/layout/AppLayout';
import { containerStyle } from 'shared/styles';
import FAQ from 'components/about/FAQ';

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
    max-width: 1200px;
    width: 100%;
    ${containerStyle}
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
export default function About() {
    return (
        <>
            <Head>
                <title>Random Degenerator | About</title>
            </Head>
            <PageContainer>
                <Container>
                    <Content>
                        <MainContent>
                            <FAQ />
                        </MainContent>
                    </Content>
                </Container>
            </PageContainer>
        </>
    );
}

About.layout = AppLayout;
