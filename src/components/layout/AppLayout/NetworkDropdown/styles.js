import styled from 'styled-components';
import { Dropdown as DefaultDropdown } from 'components/common';

export const Dropdown = styled(DefaultDropdown)`
    && {
        min-width: 250px;
        @media (max-width: 820px) {
            right: auto;
            left: 0px;
            min-width: 220px;
        }
    }
`;

export const Network = styled.button`
    width: 100%;
    padding: 8px 16px;
    background-color: ${({ selected }) => (selected ? '#1f1341' : 'transparent')};;
    display: flex;
    align-items: center;
    color: white;
    font-weight: bold;
    font-size: 16px;
    margin: 4px 0;
    border-radius: 10px;
    
    &:hover {
        text-decoration: underline;
    }
`;

export const NetworkIcon = styled.img`
    width:  24px;
    height: 24px;
    margin-right: 8px;
`;
