import { Container, Content, Image, Title, Subtitle } from './styles';

export default function EmptyStatePlaceholder({ title, subtitle, image }) {
    return (
        <Container>
            <Content>
                {image && <Image src={image} />}
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
            </Content>
        </Container>
    );
}
