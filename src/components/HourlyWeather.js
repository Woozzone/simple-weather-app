import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Components
import Temperature from './Temperature';
import WeatherCondition from './WeatherCondition';

const ITEM_WIDTH = 64;

const HourlyWeatherWrapper = styled.div`
  position: relative;
  left: 50%;
  width: 320px;
  margin-top: 25px;
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
  min-width: 50px;
  padding: 10px 5px;
  margin: 0 2px;
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

    this.slideIndent = 0;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.itemIndex !== this.props.itemIndex) {
      this.props.onClick(this.props.itemIndex);
      this.setSlideIndent(this.props.itemIndex);
    }
  }

  handleClick(i) {
    this.props.onClick(i);
    this.setSlideIndent(i);
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

  setSlideIndent = i => {
    let indent;
    switch (i) {
      case 0:
        indent = 0;
        break;
      case 1:
        indent = ITEM_WIDTH;
        break;
      case this.props.list.length - 2:
        indent = ITEM_WIDTH * 3;
        break;
      case this.props.list.length - 1:
        indent = ITEM_WIDTH * 4;
        break;
      default:
        indent = ITEM_WIDTH * 2;
    }
    this.slideIndent = -i * ITEM_WIDTH + indent;
  };

  render() {
    const list = this.props.list.map((item, i) => {
      const activeClass = this.props.itemIndex === i && 'active';
      return (
        <HourlyWeatherItem
          className={activeClass}
          key={i}
          onClick={() => {
            this.handleClick(i);
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
        <HourlyWeatherSlide
          onWheel={e => this.props.onWheel(e)}
          slideIndent={this.slideIndent}
        >
          {list}
        </HourlyWeatherSlide>
      </HourlyWeatherWrapper>
    );
  }
}

HourlyWeather.propTypes = {
  onClick: PropTypes.func.isRequired,
  onWheel: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object),
  itemIndex: PropTypes.number
};

export default HourlyWeather;
