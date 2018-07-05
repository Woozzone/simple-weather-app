import React from 'react';
import styled from 'styled-components';

const ContainerWrapper = styled.div``;

const Container = props => {
  return <ContainerWrapper>{props.children}</ContainerWrapper>;
};

export default Container;
