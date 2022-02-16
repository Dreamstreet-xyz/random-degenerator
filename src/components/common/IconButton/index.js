import { Icon, Loading } from 'components/common';
import { StyledButton } from './styles';

export default function IconButton(props) {
    const { forwardRef, color, icon, disabled, loading, className, size, iconStyle, ...rest } =
        props;

    return (
        <StyledButton
            type="button"
            ref={forwardRef}
            className={className}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? (
                <Loading />
            ) : (
                icon && <Icon icon={icon} size={size} color={color} style={iconStyle} />
            )}
        </StyledButton>
    );
}
