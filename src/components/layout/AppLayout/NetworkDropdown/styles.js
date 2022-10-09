import styled, { css } from 'styled-components';
import { Dropdown as DefaultDropdown } from 'components/common';

export const Dropdown = styled(DefaultDropdown)`
    && {
        min-width: 250px;
        @media (max-width: 820px) {
            right: auto;
            left: 0px;
        }
    }
`;

export const Networks = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const NetworkOption = styled.button`
    position: relative;
    width: 100%;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    color: white;
    font-weight: bold;
    font-size: 16px;
    border-radius: 8px;
    background-color: transparent;
    gap: 8px;
    
    ${({ isSelected }) => (isSelected && css`
        background-color: #ffffff1c;
    
        &::after {
            position: absolute;
            top: calc(50% - 4px);
            right: 16px;
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #14ffe3;
        }
    `)}

    ${({ isSelected }) => (!isSelected && css`
        &:hover {
            background-color: #ffffff11;
        }
    `)}
`;

export const NetworkIcon = styled.img`
    width: 20px;
    height: 20px;
`;

export const LinksContainer = styled.div`
    margin-top: 8px;
    border-top: 1px solid #31225c;
    display: flex;
    flex-direction: column;
`;

export const Link = styled.a`
    display: flex;
    align-items: center;
    padding: 16px;
    font-size: 14px;
    text-decoration: none;
    font-weight: bold;
    color: #b79ff0;
    
    &:hover,
    &:active {
        text-decoration: none;
        color: white;
    }
`;

export const Practice = styled.span`
  border-radius: 4px;
  padding: 2px 4px;
  text-transform: uppercase;
  font-size: 11px;
  background-color: rgb(247, 85, 193);
  color: white;
  font-weight: 600;
`;

export const Title = styled.span`
    font-size: 14px;
    font-weight: bold;
    padding: 4px 0 8px;
    color: #8f84c2;
`;
