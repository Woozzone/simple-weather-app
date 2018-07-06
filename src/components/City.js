import React from 'react';
import styled from 'styled-components';

const CityWrapper = styled.div`
  text-transform: capitalize;
  font-size: 14px;
  font-family: 'Work Sans', sans-serif;
  color: #fff;
  text-align: center;
  margin-top: 5px;
`;

const City = props => {
  return <CityWrapper>{props.name}</CityWrapper>;
};

export default City;
