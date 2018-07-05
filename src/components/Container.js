import React from 'react';
import styled from 'styled-components';

const ContainerWrapper = styled.div`
  height: 100vh;
  background: url(${props => props.backgroundPath}) no-repeat 50% / cover;
`;

const Container = props => {
  return (
    <ContainerWrapper backgroundPath={props.backgroundPath}>
      {props.children}
    </ContainerWrapper>
  );
};

export default Container;
