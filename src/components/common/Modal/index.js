import { useState, useRef, useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import useEscape from 'shared/hooks/useEscape';
import useOutsideClick from 'shared/hooks/useOutsideClick';
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

    useEffect(() => {
        if (isVisible) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'unset';
        }
    }, [isVisible]);

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
        <Overlay
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'tween', duration: 0.15 }}
        >
            <FocusTrap>
                <Container
                    ref={containerRef}
                    padding={padding}
                    style={containerStyle}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.25 }}
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
