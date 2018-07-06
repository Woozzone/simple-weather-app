import React from 'react';

// Components
import Temperature from '../components/Temperature';
import City from '../components/City';
import WeatherCondition from '../components/WeatherCondition';
import CalcDate from '../components/CalcDate';

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

  parseWeatherCondition(array) {
    let weatherCondition = [];

    array.forEach(condition => {
      weatherCondition.push(condition.description);
    });

    return weatherCondition.join(', ');
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
      fetch(url)
        .then(res => res.json())
        .then(result => {
          console.log(result);
          this.setState({
            isLoaded: true,
            place: result.name,
            temperature: Math.round(result.main.temp),
            weatherCondition: this.parseWeatherCondition(result.weather),
            date: result.dt
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
    return (
      <div>
        <WeatherCondition value={this.state.weatherCondition} />
        <Temperature value={this.state.temperature} />
        <CalcDate value={this.state.date} marginTop={20} />
        <City name={this.state.place} marginTop={5} />
      </div>
    );
  }
}

export default Weather;
