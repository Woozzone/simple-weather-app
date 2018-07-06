import React from 'react';
import styled from 'styled-components';

const TemperatureWrapper = styled.div`
  font-family: 'Righteous', cursive;
  text-align: center;
  font-size: 72px;
  color: #e5ffde;
`;

const Sup = styled.sup`
  position: relative;
  top: -33px;
  left: 10px;
  font-size: 36px;
`;

const Temperature = props => {
  return (
    <TemperatureWrapper>
      {props.value}
      <Sup>o</Sup>
    </TemperatureWrapper>
  );
};

export default Temperature;
