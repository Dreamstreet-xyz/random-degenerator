import { Icon } from 'components/common';
import { pulsingGlow } from 'shared/styles';
import styled, { css } from 'styled-components';

export const Container = styled.div`
    cursor: pointer;
`;

export const Button = styled.button`
    position: relative;
    color: white;
    padding: 4px 8px;
    min-height: 32px;
    border-radius: 10px;
    background-color: ${({ isOpen }) => (isOpen ? '#5025b3' : '#3e1994')};
    font-weight: bold;
    font-size: 14px;
    display: flex;
    align-items: center;
    pointer-events: ${({ isOpen }) => (isOpen ? 'none' : 'initial')};;

    @media (max-width: 700px) {
        span {
            font-size: 12px;
        }
    }

    &:hover {
        background-color: #5025b3;
    }

    ${({ invalid }) => (invalid && css`
        background-color: #f5355f;
        background:  ${({ isOpen }) => (isOpen ? 'linear-gradient(45deg, #f55074, #ff5e74)' : 'linear-gradient(45deg, #f5355f, #ff465f)')};
        box-shadow: 0px 0px 8px 4px #ff1bce61;
        ${pulsingGlow}

        &:hover {
            background: linear-gradient(45deg, #f55074, #ff5e74);
        }
    
        &::after {
            box-shadow: 0px 0px 8px 4px #ff1b7a61;
            border-radius: 10px;
            animation-duration: 1s;
        }
    `)}
`;

export const NetworkIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 6px;

    @media (max-width: 700px) {
        width: 18px;
        height: 18px;
        margin-right: 4px;
    }
`;

export const WrongNetworkIcon = styled(Icon)`
    margin-right: 6px;
`;

export const Chevron = styled(Icon)`
    color: '#9d8aca';
    margin-left: 8px;

    @media (max-width: 700px) {
        margin-left: 4px;
    }
`;
