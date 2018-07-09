import React from 'react';
import styled from 'styled-components';

// Components
import Loader from '../components/Loader';
import Temperature from '../components/Temperature';
import City from '../components/City';
import WeatherCondition from '../components/WeatherCondition';
import CalcDate from '../components/CalcDate';
import Stats from '../components/Stats';
import HourlyWeather from '../components/HourlyWeather';

const CurrentWeather = styled.div`
  position: relative;
  min-width: 320px;
`;

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
  }

  getCoords = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve);
    });
  };

  setCurrentWeather = (index, callback) => {
    this.setState(prevState => ({
      active: prevState.response.list[index],
      activeIndex: index,
      temperature: Math.round(prevState.response.list[index].main.temp),
      weatherCondition: prevState.response.list[index].weather,
      date: prevState.response.list[index].dt,
      humidity: prevState.response.list[index].main.humidity,
      windSpeed: prevState.response.list[index].wind.speed
    }));

    if (callback) {
      callback(index);
    }
  };

  onWheel = (e, index, callback) => {
    if (e.deltaY > 0) {
      index < 39 && index++;
    } else {
      index > 0 && index--;
    }

    this.setCurrentWeather(index);

    if (callback) {
      callback(index);
    }
  };

  componentDidMount() {
    this.getCoords().then(position => {
      this.setState({
        latitude: Number.parseFloat(position.coords.latitude).toFixed(4),
        longitude: Number.parseFloat(position.coords.longitude).toFixed(4)
      });

      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${
        this.state.latitude
      }&lon=${this.state.longitude}&appid=${
        process.env.REACT_APP_API_KEY
      }&units=metric`;

      fetch(url)
        .then(res => res.json())
        .then(result => {
          this.setState({
            response: result,
            isLoaded: true,
            place: result.city.name,
            active: result.list[0],
            activeIndex: 0,
            temperature: Math.round(result.list[0].main.temp),
            weatherCondition: result.list[0].weather,
            date: result.list[0].dt,
            humidity: result.list[0].main.humidity,
            windSpeed: result.list[0].wind.speed,
            list: result.list
          });
        })
        .catch(() => {
          this.setState({
            isLoaded: false
          });
        });
    });
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div>
          <CurrentWeather>
            <WeatherCondition
              value={this.state.weatherCondition}
              fs={72}
              description
            />
            <Temperature value={this.state.temperature} fs={72} />
            <Stats
              windSpeed={this.state.windSpeed}
              humidity={this.state.humidity}
            />
            <CalcDate value={this.state.date} />
            <City name={this.state.place} />
          </CurrentWeather>

          <HourlyWeather
            onClick={this.setCurrentWeather}
            list={this.state.list}
            activeIndex={this.state.activeIndex}
            onWheel={this.onWheel}
          />
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}

export default Weather;
