import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TemperatureWrapper = styled.div`
  font-family: 'Righteous', cursive;
  text-align: center;
  font-size: ${props => (props.fs ? props.fs : 18)}px
  color: #e5ffde;
`;

const Sup = styled.sup`
  position: relative;
  top: ${props => (props.fs ? -props.fs / 2 + props.fs / 20 : -9)}px
  left: ${props => (props.fs ? props.fs / 10 : 2)}px;
  font-size: ${props => (props.fs ? props.fs / 2 : 9)}px;
`;

const Temperature = props => {
  return (
    <TemperatureWrapper fs={props.fs}>
      {props.value}
      <Sup fs={props.fs}>o</Sup>
    </TemperatureWrapper>
  );
};

Temperature.propTypes = {
  value: PropTypes.number,
  fs: PropTypes.number
};

export default Temperature;
