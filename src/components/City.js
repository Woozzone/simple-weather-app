import React from 'react';
import styled from 'styled-components';

const CityWrapper = styled.div`
  text-transform: capitalize;
  font-size: 14px;
  font-family: 'Work Sans', sans-serif;
  color: #fff;
  text-align: center;
  margin-top: ${props => props.marginTop}px;
`;

const City = props => {
  return <CityWrapper marginTop={props.marginTop}>{props.name}</CityWrapper>;
};

export default City;
