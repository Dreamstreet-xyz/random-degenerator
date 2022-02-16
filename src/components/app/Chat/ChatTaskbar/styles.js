import styled from 'styled-components';

export const TaskbarButton = styled.button`
    height: 36px;
    width: 200px;
    background-color: ${({ isVisible }) => (isVisible ? '#674daf' : '#402883')};;
    border-radius: 4px;
    color: white;
    font-weight: bold;

    &:hover {
        background-color: ${({ isVisible }) => (isVisible ? '#816abe' : '#4e3592')};;
    }
`;
