import { useRef } from 'react';
import useEscape from 'shared/hooks/useEscape';
import useOutsideClick from 'shared/hooks/useOutsideClick';
import { Container, Header, Title } from './styles';

export default function Dropdown({ close, title, isVisible, children, className }) {
    const containerRef = useRef(null);

    useEscape(() => close?.());

    useOutsideClick(containerRef, () => {
        close?.();
    });

    if (!isVisible) return null;

    return (
        <Container ref={containerRef} className={className}>
            {title && (
                <Header>
                    <Title>{title}</Title>
                </Header>
            )}
            {children}
        </Container>
    );
}
