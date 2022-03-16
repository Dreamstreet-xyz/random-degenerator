import { retroTextGradient, retroTextMarker } from 'shared/styles';
import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Image = styled.img`
`;

export const Title = styled.p`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: #fff;
`;

export const Subtitle = styled.p`
    font-size: 16px;
    color: #ed9efd;
    text-align: center;
    margin-top: 16px;
    font-weight: bold;
`;
