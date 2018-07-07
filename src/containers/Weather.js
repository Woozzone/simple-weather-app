import React from 'react';
import styled from 'styled-components';

// Components
import Loader from '../components/Loader';
import Temperature from '../components/Temperature';
import City from '../components/City';
import WeatherCondition from '../components/WeatherCondition';
import CalcDate from '../components/CalcDate';
import Stats from '../components/Stats';

const WeatherWrapper = styled.div`
  position: relative;
  min-width: 320px;
`;

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };

    this.getCoords = this.getCoords.bind(this);
  }

  getCoords() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve);
    });
  }

  componentDidMount() {
    this.getCoords().then(position => {
      this.setState({
        latitude: Number.parseFloat(position.coords.latitude).toFixed(2),
        longitude: Number.parseFloat(position.coords.longitude).toFixed(2)
      });

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${
        this.state.latitude
      }&lon=${this.state.longitude}&appid=${
        process.env.REACT_APP_API_KEY
      }&units=metric`;
      console.log(url);
      fetch(url)
        .then(res => res.json())
        .then(result => {
          console.log(result);
          this.setState({
            isLoaded: true,
            place: result.name,
            temperature: Math.round(result.main.temp),
            weatherCondition: result.weather,
            date: result.dt,
            humidity: result.main.humidity,
            windSpeed: result.wind.speed
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
    console.log(this.state);
    if (this.state.isLoaded) {
      return (
        <WeatherWrapper>
          <WeatherCondition value={this.state.weatherCondition} />
          <Temperature value={this.state.temperature} />
          <Stats
            windSpeed={this.state.windSpeed}
            humidity={this.state.humidity}
          />
          <CalcDate value={this.state.date} />
          <City name={this.state.place} />
        </WeatherWrapper>
      );
    } else {
      return <Loader />;
    }
  }
}

export default Weather;
