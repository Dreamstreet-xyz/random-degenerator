import { useState, useRef } from 'react';
import FocusTrap from 'focus-trap-react';
import useEscape from 'shared/hooks/useEscape';
import useOutsideClick from 'shared/hooks/useOutsideClick';
import useBodyScrollLock from 'shared/hooks/useBodyScrollLock';
import { Overlay, Container, ModalHeader, ModalTitle, ModalBody, CloseButton } from './styles';

function Modal({
    isVisible,
    close,
    title,
    children,
    padding,
    titleStyle,
    containerStyle,
    closeButtonStyle,
}) {
    const [mouseDown, setMouseDown] = useState(false);
    const containerRef = useRef(null);

    useBodyScrollLock(containerRef, isVisible);

    useEscape(() => close());

    useOutsideClick(containerRef, () => {
        setMouseDown(true);
    });

    const handleMouseUp = e => {
        if (mouseDown) {
            setMouseDown(false);
            close();
        }
    };

    if (!isVisible) return null;

    return (
        <Overlay onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp}>
            <FocusTrap>
                <Container
                    ref={containerRef}
                    padding={padding}
                    style={containerStyle}
                    initial={{ translateY: 16 }}
                    animate={{ translateY: 0 }}
                    transition={{ type: 'spring', duration: 0.35 }}
                >
                    <ModalHeader>
                        <ModalTitle style={titleStyle}>{title}</ModalTitle>
                        <CloseButton
                            type="button"
                            icon="times"
                            onClick={close}
                            style={closeButtonStyle}
                            size={16}
                        />
                    </ModalHeader>
                    <ModalBody>{children}</ModalBody>
                </Container>
            </FocusTrap>
        </Overlay>
    );
}

export default Modal;
