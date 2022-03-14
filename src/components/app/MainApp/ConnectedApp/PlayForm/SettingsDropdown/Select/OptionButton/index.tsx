import { Button } from './styles';

export default function OptionButton({ title, isSelected, onClick, emphasize }) {
    const handleClick = () => {
        onClick?.(title);
    };

    return (
        <Button onClick={handleClick} isSelected={isSelected} emphasize={emphasize}>
            {title}
        </Button>
    );
}
