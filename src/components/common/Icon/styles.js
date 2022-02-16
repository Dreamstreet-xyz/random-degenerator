import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledIcon = styled(FontAwesomeIcon)`
    font-size: ${({ $size }) => `${$size}px`};
    min-width: ${({ $minWidth }) => $minWidth}px;
`;

export default StyledIcon;
