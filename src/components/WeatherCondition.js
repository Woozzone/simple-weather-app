import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { WEATHER_ICONS } from '../constants';

const WeatherConditionWrapper = styled.div`
  text-align: center;
  color: #fff;
`;

const WeatherConditionDescription = styled.div`
  margin-bottom: 15px;
  font-family: 'Righteous', cursive;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const WeatherConditionIcon = styled.i`
  font-size: ${props => (props.fs ? props.fs : 18)}px;
  margin: 5px 10px ${props => (props.fs ? props.fs / 5 : 5)}px;
`;

const WeatherConditionIcons = styled.div`
  display: flex;
  justify-content: center;
`;

class WeatherCondition extends React.Component {
  getWeatherConditionDescription(array) {
    return array
      .reduce((acc, condition) => {
        acc.push(condition.description);
        return acc;
      }, [])
      .join(', ');
  }

  getWeatherConditionIcon(array) {
    return array.reduce((acc, condition) => {
      acc.push(condition.icon);
      return acc;
    }, []);
  }

  render() {
    const icons = this.getWeatherConditionIcon(this.props.value).map(
      (icon, i) => {
        return (
          <WeatherConditionIcon
            key={i}
            className={`wi ${WEATHER_ICONS[icon]}`}
            fs={this.props.fs}
          />
        );
      }
    );

    const value = this.props.description && (
      <WeatherConditionDescription>
        {this.getWeatherConditionDescription(this.props.value)}
      </WeatherConditionDescription>
    );

    return (
      <WeatherConditionWrapper>
        <WeatherConditionIcons>{icons}</WeatherConditionIcons>
        {value}
      </WeatherConditionWrapper>
    );
  }
}

WeatherCondition.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
  fs: PropTypes.number,
  description: PropTypes.bool
};

export default WeatherCondition;
