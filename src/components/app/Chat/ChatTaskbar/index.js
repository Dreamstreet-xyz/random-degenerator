import { TaskbarButton } from './styles';

export default function ChatTaskbar({ chats, onClick }) {
    const handleClick = id => {
        onClick(id);
    };

    return chats.map(chat => (
        <TaskbarButton isVisible={chat.isVisible} onClick={() => handleClick(chat.id)}>
            {chat.id}
        </TaskbarButton>
    ));
}
