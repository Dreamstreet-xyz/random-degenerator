import styled, { keyframes } from 'styled-components';

const scaleIn = keyframes`
    from {
      transform: scaleY(0.95) translateZ(0);
      opacity: 0;
    }
    to {
      transform: scaleY(1) translateZ(0);
      opacity: 1;
    }
`;

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 4px);
  width: 100%;
  max-height: 500px;
  min-width: 250px;
  max-width: 400px;
  overflow-y: auto;
  overscroll-behavior: contain;
  background-color: #070324;
  border-radius: 10px;
  box-shadow: 0 8px 16px 8px #ff3ac430;
  border: 1px solid #c417a7;
  transform-origin: top;
  z-index: 9999;
  animation: 0.075s ${scaleIn} ease-in-out forwards;
  transform-origin: top;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 478px;
  height: 100%;
  width: 100%;
  background-color: #1d0a49;
  color: white;
  overflow: hidden;
`;

export const Menu = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    box-sizing: border-box;
`;

export const MenuButton = styled.button`
    width: 100%;
    padding: 8px 16px;
    background-color: white;
    font-size: 16px;
    text-align: left;

    &:hover:enabled {
        background-color: #eeeeee;
    }

    &:active {
        background-color: #e8e8e8;
    }
`;

export const Divider = styled.div`
    flex: 1;
    height: 1px;
    background-color: #ff22c8;
    margin-left: 16px;
`;
