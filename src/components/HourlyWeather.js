import React from 'react';
import styled from 'styled-components';

// Components
import Temperature from './Temperature';
import WeatherCondition from './WeatherCondition';

const HourlyWeatherWrapper = styled.div`
  display: flex;
  margin-top: 50px;
`;

const HourlyWeatherItem = styled.div`
  cursor: pointer;
  width: 40px;
  padding: 10px 5px;
  text-align: center;
`;

const Time = styled.div`
  font-family: 'Work Sans', sans-serif;
  font-weight: 200;
  color: #fff;
  font-size: 14px;
`;

class HourlyWeather extends React.Component {
  getTemperature(item) {
    return <Temperature value={Math.ceil(item.main.temp)} />;
  }

  getTime(item) {
    const date = new Date(item.dt * 1000);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const time = `${hours}:${minutes}`;
    return <Time>{time}</Time>;
  }

  getWeatherCondition(item) {
    return <WeatherCondition value={item.weather} />;
  }

  render() {
    const list = this.props.list.map((item, i) => {
      return (
        <HourlyWeatherItem key={i} onClick={() => this.props.onClick(i)}>
          {this.getWeatherCondition(item)}
          {this.getTemperature(item)}
          {this.getTime(item)}
        </HourlyWeatherItem>
      );
    });

    return <HourlyWeatherWrapper>{list}</HourlyWeatherWrapper>;
  }
}

export default HourlyWeather;
