import styled from 'styled-components';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function Tooltip({ content, children }) {
    return <Tippy content={content}>{children}</Tippy>;
}
