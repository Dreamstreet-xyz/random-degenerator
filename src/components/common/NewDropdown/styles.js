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
  left: 0;
  top: 100%;
  width: 100%;
  max-height: 500px;
  max-width: 400px;
  overflow-y: auto;
  overscroll-behavior: contain;
  background-color: var(--strong-bg);
  border-radius: 0 0 10px 10px;
  box-shadow: 0 8px 16px 8px var(--dropdown-shadow);
  border: 1px solid var(--dropdown-border);
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
  background-color: var(--dropdown-bg);
  color: white;
  overflow: hidden;
`;
