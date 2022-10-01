import { Icon } from 'components/common';
import { Practice } from 'components/layout/AppLayout/NetworkDropdown/styles';
import { pulsingGlow } from 'shared/styles';
import styled, { css } from 'styled-components';

export const Container = styled.div`
    cursor: pointer;
`;

export const Button = styled.button`
    position: relative;
    color: white;
    padding: 4px 12px;
    min-height: 32px;
    border-radius: 8px;
    background-color: ${({ isOpen }) => (isOpen ? '#5025b3' : '#3e1994')};
    font-weight: bold;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    outline: none;
    @media (max-width: 600px) {
        padding: 4px 8px;
        span {
            font-size: 12px;
            gap: 4px;
        }
    }

    @media (max-width: 390px) {
        span {
            display: none;
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

    @media (max-width: 700px) {
        width: 18px;
        height: 18px;
    }
`;

export const WrongNetworkIcon = styled(Icon)`
    margin-right: 6px;
`;

export const Chevron = styled(Icon)`
    color: '#9d8aca';
`;

export const PracticeBadge = styled(Practice)`
    @media (max-width: 600px) {
        display: none;
    }
`;
