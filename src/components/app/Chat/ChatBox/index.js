import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { useUser } from 'shared/contexts/UserContext';
import Message from './Message';
import {
    Container,
    Header,
    Title,
    WindowActions,
    ActionButton,
    ChatContent,
    ChatInput,
    Form,
    SendButton,
    ResizeHandle,
} from './styles';

const mockMessages = [
    {
        user: 'Random Degen Team',
        content: 'Chat is coming soon!',
    },
];

export default function ChatBox({ id, zIndex, isVisible, onMinimize, onClose, onFocus }) {
    const { user } = useUser();
    const [pos, setPos] = useState({ x: 20, y: 200 });
    const [messages, setMessages] = useState([...mockMessages]);
    const [input, setInput] = useState('');
    const contentRef = useRef(null);
    const inputRef = useRef(null);

    const handleChangeText = e => {
        setInput(e.target.value);
    };

    useEffect(() => {
        const scrollTop = contentRef.current.scrollHeight;
        contentRef.current.scrollTo(0, scrollTop);
    }, [messages]);

    useEffect(() => {
        if (isVisible) {
            inputRef.current.focus();
            onFocus?.(id);
        }
    }, [isVisible]);

    const handleSubmit = e => {
        e.preventDefault();

        if (input !== '') {
            setMessages(prev => [...prev, { user: user.address, content: input }]);
            setInput('');
        }
    };

    const handleStart = () => {
        const { scrollTop } = contentRef.current;

        contentRef.current.onscroll = function () {
            contentRef.current.scrollTo(0, scrollTop);
        };
    };

    const handleDrag = (e, position) => {
        const { x, y } = position;
        setPos({ x, y });
    };

    const handleDragStop = (e, position) => {
        handleDrag(e, position);
    };

    const handleStop = () => {
        contentRef.current.onscroll = function () {};
    };

    const handleMinimize = () => {
        onMinimize?.(id);
    };

    const handleClose = () => {
        onClose?.(id);
    };

    const handleFocus = () => {
        onFocus?.(id);
    };

    return (
        <Draggable
            bounds="parent"
            handle=".draggable-handle"
            onStart={handleStart}
            onStop={handleStop}
            onDrag={handleDrag}
            position={pos}
            cancel=".actions"
        >
            <ResizableBox
                className="custom-box box"
                width={300}
                height={250}
                handle={(h, ref) => <ResizeHandle ref={ref} isVisible={isVisible} />}
                handleSize={[8, 8]}
                minConstraints={[250, 200]}
                maxConstraints={[500, 900]}
                style={{
                    position: 'absolute',
                    pointerEvents: 'initial',
                    zIndex: 4 + zIndex,
                }}
            >
                <Container onMouseDown={handleFocus} onFocus={handleFocus} isVisible={isVisible}>
                    <Form onSubmit={handleSubmit}>
                        <ChatInput onChange={handleChangeText} value={input} ref={inputRef} />
                        <SendButton type="submit">send</SendButton>
                    </Form>
                    <ChatContent ref={contentRef}>
                        {messages.map((message, index) => (
                            <Message
                                key={`${id}_${index}`}
                                sender={message.user}
                                content={message.content}
                            />
                        ))}
                    </ChatContent>
                    <Header className="draggable-handle">
                        <Title>{id}</Title>
                        <WindowActions className="actions">
                            <ActionButton icon="minus" onClick={handleMinimize} />
                            <ActionButton icon="times" onClick={handleClose} />
                        </WindowActions>
                    </Header>
                </Container>
            </ResizableBox>
        </Draggable>
    );
}
