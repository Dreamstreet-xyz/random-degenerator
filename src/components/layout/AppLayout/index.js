import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Chat from 'components/app/Chat';
import ChatTaskbar from 'components/app/Chat/ChatTaskbar';
import { IconButton, Tooltip } from 'components/common';
import StarsContainer from './StarsContainer';

const Container = styled.div`
    position: relative;
    background: radial-gradient(circle at 50% 1800px, #330f96 0, #160231 100%);
    overflow-y: hidden;
`;

const Content = styled.div`
    min-height: 100vh;
`;

const MiscControls = styled.div`
    position: fixed;
    bottom: 4px;
    left: 4px;
    z-index: 3;
    display: flex;
`;

const MiscButton = styled(IconButton)`
    && {
        background-color: transparent;
        &:hover,
        &:active {
            background-color: transparent;
        }
    }
`;

export default function AppLayout({ children }) {
    const [showStars, setShowStars] = useState(true);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const storedStars = JSON.parse(localStorage.getItem('ds:stars') ?? true);
        setShowStars(storedStars);
    }, []);

    const toggleStars = () => {
        localStorage.setItem('ds:stars', JSON.stringify(!showStars));
        setShowStars(!showStars);
    };

    const createChat = () => {
        if (chats.length === 0) {
            setChats(prev => [
                ...prev,
                { id: 'The Degen Zone', zIndex: chats.length, isVisible: true },
            ]);
        }
    };

    const handleCloseChat = id => {
        const filteredChats = chats.filter(chat => chat.id !== id);
        setChats(filteredChats);
    };

    const handleFocusChat = id => {
        const focusedIndex = chats.findIndex(chat => chat.id === id);
        const focused = chats[focusedIndex];
        const newFocused = { ...focused, zIndex: chats.length - 1 };
        const newChats = [...chats];
        newChats.splice(focusedIndex, 1);
        newChats.splice(focusedIndex, 0, newFocused);

        newChats.forEach((chat, index) => {
            if (chat.id !== id && chat.zIndex >= focused.zIndex) {
                const updatedChat = { ...chat, zIndex: chat.zIndex - 1 };
                newChats.splice(index, 1);
                newChats.splice(index, 0, updatedChat);
            }
        });

        setChats(newChats);
    };

    const toggleChatVisibility = id => {
        const chatIndex = chats.findIndex(chat => chat.id === id);
        const chat = chats[chatIndex];
        const newChat = { ...chat, isVisible: !chat.isVisible };
        const newChats = [...chats];
        newChats.splice(chatIndex, 1);
        newChats.splice(chatIndex, 0, newChat);
        setChats(newChats);
    };

    return (
        <Container>
            <StarsContainer show={showStars} />
            <Content>{children}</Content>
            <MiscControls>
                <Tooltip content={`${showStars ? 'Disable' : 'Enable'} background stars`}>
                    <span>
                        <MiscButton
                            icon="star"
                            onClick={toggleStars}
                            color={showStars ? 'gold' : '#52388f'}
                        />
                    </span>
                </Tooltip>
                {/* {chats.length === 0 ? (
                    <Tooltip content="Join the Dreamstreet chat channel">
                        <span>
                            <MiscButton icon="plus" onClick={createChat} />
                        </span>
                    </Tooltip>
                ) : (
                    <ChatTaskbar chats={chats} onClick={toggleChatVisibility} />
                )} */}
            </MiscControls>
            <Chat
                chats={chats}
                onMinimize={toggleChatVisibility}
                onClose={handleCloseChat}
                onFocus={handleFocusChat}
            />
        </Container>
    );
}

AppLayout.showMainLayout = true;
