import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CityWrapper = styled.div`
  text-transform: capitalize;
  font-size: 14px;
  font-family: 'Work Sans', sans-serif;
  color: #fff;
  text-align: center;
  margin-top: 5px;
`;

const City = props => <CityWrapper>{props.name}</CityWrapper>;

City.propTypes = {
  name: PropTypes.string.isRequired
};

export default City;
