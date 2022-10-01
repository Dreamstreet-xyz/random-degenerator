import styled, {css } from 'styled-components';
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

export const NetworkContainer = styled.div`
    border-radius: 10px;
`;

export const Network = styled.button`
    position: relative;
    width: 100%;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    color: white;
    font-weight: bold;
    font-size: 16px;
    margin: 4px 0;
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
    width:  24px;
    height: 24px;
`;

export const LinksContainer = styled.div`
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

  @media (max-width: 600px) {
    display: none;
  }
`;
