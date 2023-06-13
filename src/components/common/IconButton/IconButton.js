import React from 'react';
import { Icon } from 'components/common';
import { LoadingSpinner } from '../Loading';
import { StyledButton } from './styles';

export const IconButton = React.forwardRef((props, ref) => {
    const {
        color,
        icon,
        disabled,
        loading,
        className,
        size,
        iconStyle,
        spinnerWidth = 24,
        spinnerColor = '#e64582',
        ...rest
    } = props;

    return (
        <StyledButton
            type="button"
            ref={ref}
            className={className}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? (
                <LoadingSpinner width={spinnerWidth} color={spinnerColor} />
            ) : (
                icon && <Icon icon={icon} size={size} color={color} style={iconStyle} />
            )}
        </StyledButton>
    );
});
