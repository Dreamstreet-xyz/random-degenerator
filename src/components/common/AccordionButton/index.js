import { Button, Row, Icon } from './styles';

export default function AccordionButton({ children, isOpen, ...rest }) {
    return (
        <Button {...rest}>
            <Row>
                {children}
                <Icon icon={isOpen ? 'chevron-up' : 'chevron-down'} />
            </Row>
        </Button>
    );
}
