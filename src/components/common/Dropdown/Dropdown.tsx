import React, { MutableRefObject, useRef } from 'react';
import { Container, Content } from './styles';
import useBodyScrollLock from 'shared/hooks/useBodyScrollLock';
import useEscape from 'shared/hooks/useEscape';
import useOutsideClick from 'shared/hooks/useOutsideClick';

type Props = {
    isOpen: boolean;
    children: React.ReactNode;
    className?: string;
    close: () => void;
    toggleRef?: MutableRefObject<HTMLElement | null>;
};

export const Dropdown = ({ isOpen, children, className, close, toggleRef }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEscape(close);
    useOutsideClick(
        containerRef,
        () => {
            close();
        },
        toggleRef
    );

    if (!isOpen) return null;

    return (
        <Container className={className} ref={containerRef}>
            <Content>{children}</Content>
        </Container>
    );
};
