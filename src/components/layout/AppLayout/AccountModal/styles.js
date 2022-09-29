import styled, { css } from 'styled-components';

export const ModalBody = styled.div`
    color: white;
`;

export const BasicInfo = styled.div`
    margin-top: 8px;
    border-radius: 10px;
`;

export const ProviderRow = styled.div`
    display: flex;
    margin-bottom: 16px;
    align-items: center;
`;

export const Provider = styled.span`
    color: #7c69a1;
    font-size: 14px;
`;

export const UserInfo = styled.div`
    padding: 24px;
    border-radius: 10px;
    //background: linear-gradient(45deg, #6b39df, #c41cc4);
    border: 1px solid #291849;
`;

export const Address = styled.h3`
    font-size: 24px;
    font-weight: bold;
    font-family: 'Fira Mono', monospace;
`;

export const ActionRow = styled.div`
    display: flex;
    margin-top: 24px;
    justify-content: space-between;

    @media (max-width: 495px) {
        flex-direction: column;
    }
`;

export const addressAction = css`
    display: flex;
    align-items: center;
    color: #7245ee;
    padding: 8px 4px;
    font-size: 16px;
    text-align: left;

    &:hover {
        color: #8861f5;
    }

    @media (max-width: 495px) {
        margin: 4px 0;
    }
`;
    
export const ExplorerLink = styled.a`
    ${addressAction}
    text-decoration: none;
`;

export const CopyButton = styled.button`
    ${addressAction}
    background-color: transparent;
    flex-basis: 136px;

    @media (max-width: 495px) {
        flex-basis: 0px;
    }
`;

export const DisconnectButton = styled.button`
    ${addressAction}   
    background-color: transparent;
`;
