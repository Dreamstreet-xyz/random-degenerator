import styled from 'styled-components';
import { gradientShine, shadowOutline } from 'shared/styles';

export const StyledButton = styled.button`
    position: relative;
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    width: auto;
    font-size: 14px;
    outline: none;
    padding: 8px 16px;
    font-weight: bold;
    border-radius: 10px;
    background-color: #e010cf;
    background: linear-gradient(-45deg, #914dff, #ff2f6d); 
    background-size: 300%;
    animation: ${gradientShine} 8s linear infinite;
    color: white;

    &:hover:not([disabled]),
    &:focus {
        ${shadowOutline()}
    }
`;

export const Content = styled.span`
    display: flex;
    justify-content: ${({ center }) => (center && 'center')};
    align-items: ${({ hasSubtitle }) => (hasSubtitle ? 'flex-start' : 'center')};
    visibility: ${({ hideContent }) => (hideContent ? 'hidden' : 'visible')};
    width: 100%;
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.span`
    max-width: ${({ $maxWidth }) => ($maxWidth && `${$maxWidth}px`)};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    font-weight: bold; 
    flex-wrap: wrap;
    width: 100%;
`;

export const Subtitle = styled.p`
    color: #888;
    font-weight: normal;
`;
