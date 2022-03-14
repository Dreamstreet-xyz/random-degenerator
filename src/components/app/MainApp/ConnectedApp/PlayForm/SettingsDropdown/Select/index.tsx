import OptionButton from './OptionButton';
import { Container, Divider } from './styles';

export default function Select({ value, options, onChange }) {
    return (
        <Container>
            {options.map((option, index) => (
                <>
                    <OptionButton
                        title={option.title}
                        isSelected={option.title === value}
                        onClick={onChange}
                        emphasize={option.emphasize}
                    />
                    {index < options.length - 1 && <Divider />}
                </>
            ))}
        </Container>
    );
}
