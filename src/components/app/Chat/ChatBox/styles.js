import styled from 'styled-components';
import { containerScrollbar, noSelect } from 'shared/styles';
import { IconButton } from 'components/common';

export const Container = styled.div`
    color: white;
    background-color: #4629ac;
    border-top: 2px solid #97116f;
    border-radius: 4px;
    pointer-events: initial;
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

export const Header = styled.div`
    display: flex;
    background-color: #1d104b;
    border-radius: 4px 4px 0 0;
    height: 32px;
    width: 100%;
    font-size: 12px;
    align-items: center;
    ${noSelect}
`;

export const Title = styled.span`
    color: white;
    text-indent: 8px;
`;

export const WindowActions = styled.div`
    width: 80px;
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
`;

export const ActionButton = styled(IconButton)`
    width: 32px;
    height: 32px;
    border-radius: 0px;
    background-color: transparent;
`;

export const ChatContent = styled.div`
    overflow-y: scroll;
    height: 100%;
    background-color: #4629ac;
    padding: 8px;
    ${containerScrollbar}
    flex-direction: column-reverse;
`;

export const ChatInput = styled.input`
    flex: 1;
    height: 32px;
    font-size: 16px;
`;

export const Form = styled.form`
    display: flex;
    background-color: #4629ac;
`;

export const SendButton = styled.button`
    width: 60px;    
`;

export const ResizeHandle = styled.span`
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #1153aa;
    opacity: 0.75;
    border-radius: 4px;
    bottom: -4px;
    right: -4px;
    cursor: se-resize;
    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};

`;
