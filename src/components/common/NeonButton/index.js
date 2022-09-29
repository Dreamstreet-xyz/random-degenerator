import { Loading } from 'components/common';
import { StyledButton } from './styles';

export default function NeonButton({ forwardRef, disabled, loading, title, type, ...rest }) {
    return (
        <StyledButton
            ref={forwardRef}
            disabled={disabled || loading}
            type={type || 'button'}
            {...rest}
        >
            {loading ? <Loading style={{ backgroundColor: 'white' }} /> : title}
        </StyledButton>
    );
}
