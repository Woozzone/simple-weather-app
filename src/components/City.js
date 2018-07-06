import React from 'react';
import styled from 'styled-components';

const CityWrapper = styled.div`
  text-transform: uppercase;
  font-size: 16px;
  font-family: 'Work Sans', sans-serif;
  color: #fff;
`;

const City = props => {
  return <CityWrapper>{props.name}</CityWrapper>;
};

export default City;
