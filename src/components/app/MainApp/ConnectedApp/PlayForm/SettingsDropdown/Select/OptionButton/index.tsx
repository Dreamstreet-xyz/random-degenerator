import { Button } from './styles';

export default function OptionButton({ value, title, isSelected, onClick, emphasize }) {
    const handleClick = () => {
        onClick?.(value);
    };

    return (
        <Button onClick={handleClick} isSelected={isSelected} emphasize={emphasize}>
            <span>{title}</span>
        </Button>
    );
}
