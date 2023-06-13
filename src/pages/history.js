import Head from 'next/head';
import styled from 'styled-components';
import AppLayout from 'components/layout/AppLayout';
import HistoricalTradesContainer from 'containers/HistoricalTradesContainer';

const PageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    padding-top: min(150px, 15vh);

    @media (max-width: 768px) {
        padding-left: 0;
        padding-right: 0;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1280px;
    max-height: 6000px;
    width: 100%;
    border-radius: 20px;
`;

const Content = styled.div`
    width: 100%;
    display: flex;
`;

const MainContent = styled.div`
    flex: 1;
    width: 100%;
`;

export default function History() {
    return (
        <>
            <Head>
                <title>Random Degenerator | History</title>
            </Head>
            <PageContainer>
                <Container>
                    <Content>
                        <MainContent>
                            <HistoricalTradesContainer />
                        </MainContent>
                    </Content>
                </Container>
            </PageContainer>
        </>
    );
}

History.layout = AppLayout;
