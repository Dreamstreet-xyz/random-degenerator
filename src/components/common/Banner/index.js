import { Container, Content, IconContainer, CloseButton } from './styles';

export default function Banner({ type, message, close, className, ...rest }) {
    return (
        <Container type={type} className={className} {...rest}>
            <Content>{message}</Content>
            {close && (
                <IconContainer>
                    <CloseButton onClick={close} />
                </IconContainer>
            )}
        </Container>
    );
}
