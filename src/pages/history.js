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
    padding-bottom: 76px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1280px;
    max-height: 6000px;
    width: 100%;
    border-radius: 20px;
    padding: 64px;
    @media (max-width: 1000px) {
        padding: 32px 16px;
    }
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
        <PageContainer>
            <Container>
                <Content>
                    <MainContent>
                        <HistoricalTradesContainer />
                    </MainContent>
                </Content>
            </Container>
        </PageContainer>
    );
}

History.layout = AppLayout;
