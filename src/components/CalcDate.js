import React from 'react';
import styled from 'styled-components';

const DateWrapper = styled.div`
  text-align: center;
  font-size: 24px;
  font-family: 'Work Sans', sans-serif;
  font-weight: 200;
  color: #fff;
  margin-top: ${props => props.marginTop}px;
`;

const CalcDate = props => {
  const date = new Date(props.value * 1000);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  return (
    <DateWrapper marginTop={props.marginTop}>
      {`${day}, ${date.getDate()} ${month}`}
    </DateWrapper>
  );
};

export default CalcDate;
