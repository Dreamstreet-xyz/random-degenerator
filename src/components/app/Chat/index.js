import styled from 'styled-components';
import ChatBox from './ChatBox';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 4;
    pointer-events: none;
`;

export default function Chat({ chats, onMinimize, onClose, onFocus }) {
    return (
        <Container>
            {chats.map(chat => (
                <ChatBox
                    key={chat.id}
                    id={chat.id}
                    zIndex={chat.zIndex}
                    isVisible={chat.isVisible}
                    onMinimize={onMinimize}
                    onClose={onClose}
                    onFocus={onFocus}
                />
            ))}
        </Container>
    );
}
