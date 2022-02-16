import { Container, Sender, Content } from './styles';

export default function Message({ sender, content }) {
    return (
        <Container>
            <Sender>{sender}</Sender>
            <Content>{content}</Content>
        </Container>
    );
}
