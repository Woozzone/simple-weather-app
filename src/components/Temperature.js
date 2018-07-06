import React from 'react';
import styled from 'styled-components';

const TemperatureWrapper = styled.div`
  font-family: 'Righteous', cursive;
  font-size: 72px;
  color: #41ead4;
  text-align: center;
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
