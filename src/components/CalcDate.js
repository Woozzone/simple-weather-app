import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { FULL_DAYS, MONTHS } from '../constants';

const DateWrapper = styled.div`
  text-align: center;
  font-size: 24px;
  font-family: 'Work Sans', sans-serif;
  font-weight: 200;
  color: #fff;
  margin-top: 20px;
`;

const CalcDate = props => {
  const date = new Date(props.value * 1000);
  const day = FULL_DAYS[date.getDay()];
  const month = MONTHS[date.getMonth()];
  return <DateWrapper>{`${day}, ${date.getDate()} ${month}`}</DateWrapper>;
};

CalcDate.propTypes = {
  value: PropTypes.number.isRequired
};

export default CalcDate;
