import React from 'react';
import styled from 'styled-components';

// Components
import Temperature from './Temperature';
import WeatherCondition from './WeatherCondition';

const HourlyWeatherWrapper = styled.div`
  position: relative;
  left: 50%;
  width: 320px;
  margin-top: 50px;
  overflow: hidden;
  transform: translateX(-50%);
`;

const HourlyWeatherSlide = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(
    ${props => (props.slideIndent ? props.slideIndent : 0)}px
  );
`;

const HourlyWeatherItem = styled.div`
  cursor: pointer;
  min-width: ${props => (props.className === 'active' ? 70 : 50)}px;
  padding: 10px 5px;
  text-align: center;
  transition: all 0.2s ease;
  opacity: ${props => (props.className === 'active' ? 1 : 0.7)};
  border-top: 2px solid
    ${props =>
      props.className === 'active' ? '#e5ffde' : 'rgba(255,255,255, 0.1)'};
  user-select: none;
`;

const Time = styled.div`
  font-family: 'Work Sans', sans-serif;
  font-weight: 200;
  color: #fff;
  font-size: 14px;
`;

class HourlyWeather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slideIndent: 0
    };
  }

  getTemperature(item) {
    return <Temperature value={Math.round(item.main.temp)} />;
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

  scrollSlide(i) {
    let indent;
    switch (i) {
      case 0:
        indent = 0;
        break;
      case 1:
        indent = 60;
        break;
      case 38:
        indent = 180;
        break;
      case 39:
        indent = 240;
        break;
      default:
        indent = 120;
    }
    const value = -i * 60 + indent;
    this.setState({
      slideIndent: value
    });
  }

  render() {
    const list = this.props.list.map((item, i) => {
      const activeClass = this.props.active === item && 'active';
      return (
        <HourlyWeatherItem
          className={activeClass}
          key={i}
          onClick={() => {
            this.props.onClick(i);
            this.scrollSlide(i);
          }}
        >
          {this.getWeatherCondition(item)}
          {this.getTemperature(item)}
          {this.getTime(item)}
        </HourlyWeatherItem>
      );
    });

    return (
      <HourlyWeatherWrapper>
        <HourlyWeatherSlide slideIndent={this.state.slideIndent}>
          {list}
        </HourlyWeatherSlide>
      </HourlyWeatherWrapper>
    );
  }
}

export default HourlyWeather;
