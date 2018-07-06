import React from 'react';
import styled from 'styled-components';

const WeatherConditionWrapper = styled.div`
  text-align: center;
  color: #fff;
  font-family: 'Righteous', cursive;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const WeatherCondition = props => {
  return <WeatherConditionWrapper>{props.value}</WeatherConditionWrapper>;
};

export default WeatherCondition;
