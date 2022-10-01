import styled from 'styled-components';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const StyledTippy = styled(Tippy)`
    background-color: #4b35af;
    font-weight: bold;
    padding: 4px 6px;
    font-family: 'Fira Mono', monospace;

    .tippy-arrow {
        color: #4b35af;
    }
`;

export default function Tooltip({ children, ...rest }) {
    return <StyledTippy {...rest}>{children}</StyledTippy>;
}
