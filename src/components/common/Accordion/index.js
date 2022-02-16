import { useState } from 'react';
import { Container, Content } from './styles';

export default function Accordion({ renderButton, children, className }) {
    const [isOpen, setOpened] = useState(false);

    const handleClick = () => {
        setOpened(!isOpen);
    };

    return (
        <Container className={className}>
            {renderButton({ isOpen, handleClick })}
            {isOpen && <Content>{children}</Content>}
        </Container>
    );
}
