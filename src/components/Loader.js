import React from 'react';
import styled, { keyframes } from 'styled-components';

const bubble = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(0.5);
  }
`;

const LoaderWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e5ffde;
  opacity: 0;
  transform: scale(0.5);
  animation: ${bubble} 1s ease infinite;
`;

const Loader = props => {
  return <LoaderWrapper />;
};

export default Loader;
