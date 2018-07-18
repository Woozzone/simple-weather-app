import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { DAYS } from '../constants';

const DailyWeatherWrapper = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 50%;
  padding: 10px 0;
  width: 48px;
  height: 48px;
  font-size: 14px;
  cursor: pointer;
  font-family: 'Righteous', cursive;
  opacity: ${props => (props.active ? 1 : 0.3)};

  &:focus {
    outline: none;
  }
`;

class DailyWeather extends React.Component {
  unixToDay(unixDate) {
    const day = new Date(unixDate * 1000).getDay();
    return DAYS[day];
  }

  getDays() {
    return this.props.list.reduce((acc, item, index) => {
      const day = this.unixToDay(item.dt);

      if (acc[day] === undefined) {
        acc[day] = index;
      }

      return acc;
    }, {});
  }

  render() {
    const days = this.getDays();
    const buttons = Object.keys(days).map((item, i) => {
      const active = this.unixToDay(this.props.date) === item ? true : false;
      return (
        <Button
          onClick={() => {
            this.props.onClick(days[item]);
          }}
          key={days[item]}
          active={active}
        >
          {item}
        </Button>
      );
    });

    return <DailyWeatherWrapper>{buttons}</DailyWeatherWrapper>;
  }
}

DailyWeather.propTypes = {
  onClick: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  date: PropTypes.number.isRequired
};

export default DailyWeather;
