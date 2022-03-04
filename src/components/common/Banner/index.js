import { Container, Content, IconContainer, CloseButton } from './styles';

export default function Banner({
    type,
    message,
    close,
    className,
    contentStyle,
    iconContainerStyle,
    iconStyle,
    ...rest
}) {
    return (
        <Container type={type} className={className} {...rest}>
            <Content style={contentStyle}>{message}</Content>
            {close && (
                <IconContainer style={iconContainerStyle}>
                    <CloseButton onClick={close} style={iconStyle} />
                </IconContainer>
            )}
        </Container>
    );
}
