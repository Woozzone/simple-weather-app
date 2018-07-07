import React from 'react';
import styled from 'styled-components';

const WeatherConditionWrapper = styled.div`
  text-align: center;
  color: #fff;
`;

const WeatherConditionValue = styled.div`
  margin-bottom: 15px;
  font-family: 'Righteous', cursive;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const WeatherConditionIcon = styled.i`
  font-size: 108px;
  margin: 0 10px;
`;
const WeatherConditionIcons = styled.div`
  display: flex;
  justify-content: center;
`;

const weatherIcons = {
  '01d': 'wi-day-sunny',
  '02d': 'wi-day-cloudy',
  '03d': 'wi-cloud',
  '04d': 'wi-cloudy',
  '09d': 'wi-rain',
  '10d': 'wi-day-rain',
  '11d': 'wi-day-lightning',
  '13d': 'wi-day-snow',
  '50d': 'wi-fog',
  '01n': 'wi-night-clear',
  '02n': 'wi-night-alt-cloudy',
  '03n': 'wi-cloud',
  '04n': 'wi-cloudy',
  '09n': 'wi-rain',
  '10n': 'wi-night-alt-rain',
  '11n': 'wi-night-alt-thunderstorm',
  '13n': 'wi-night-snow',
  '50n': 'wi-fog'
};

class WeatherCondition extends React.Component {
  parseWeatherCondition(array) {
    let weatherCondition = [];

    array.forEach(condition => {
      weatherCondition.push(condition.description);
    });

    return weatherCondition.join(', ');
  }

  parseWeatherConditionIcon(array) {
    let weatherConditionIcon = [];

    array.forEach(condition => {
      weatherConditionIcon.push(condition.icon);
    });

    return weatherConditionIcon;
  }

  render() {
    const icons = this.parseWeatherConditionIcon(this.props.value).map(
      (icon, i) => {
        return (
          <WeatherConditionIcon
            key={i}
            className={`wi ${weatherIcons[icon]}`}
          />
        );
      }
    );

    const value = this.parseWeatherCondition(this.props.value);

    return (
      <WeatherConditionWrapper>
        <WeatherConditionIcons>{icons}</WeatherConditionIcons>
        <WeatherConditionValue>{value}</WeatherConditionValue>
      </WeatherConditionWrapper>
    );
  }
}

export default WeatherCondition;
