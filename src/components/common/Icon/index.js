import { StyledIcon } from './styles';

export default function Icon({ className, size, minWidth, ...rest }) {
    return <StyledIcon className={className} $size={size || 20} $minWidth={minWidth} {...rest} />;
}
