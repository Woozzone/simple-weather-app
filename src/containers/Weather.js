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
import DailyWeather from '../components/DailyWeather';

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

  setCurrentWeather = index => {
    this.setState(prevState => ({
      current: {
        ...prevState.current,
        itemIndex: index,
        temperature: Math.round(prevState.list[index].main.temp),
        weatherCondition: prevState.list[index].weather,
        date: prevState.list[index].dt,
        humidity: prevState.list[index].main.humidity,
        windSpeed: prevState.list[index].wind.speed
      }
    }));
  };

  hourHandleWheel = e => {
    let delta = 0;

    if (e.deltaY > 0) {
      this.state.current.itemIndex < this.state.list.length - 1 && delta++;
    } else {
      this.state.current.itemIndex > 0 && delta--;
    }

    this.setState(prevState => ({
      current: {
        ...prevState.current,
        itemIndex: prevState.current.itemIndex + delta
      }
    }));
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
            isLoaded: true,
            list: result.list,
            current: {
              place: result.city.name,
              temperature: Math.round(result.list[0].main.temp),
              weatherCondition: result.list[0].weather,
              date: result.list[0].dt,
              humidity: result.list[0].main.humidity,
              windSpeed: result.list[0].wind.speed,
              itemIndex: 0
            }
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
              value={this.state.current.weatherCondition}
              fs={72}
              description
            />
            <Temperature value={this.state.current.temperature} fs={72} />
            <Stats
              windSpeed={this.state.current.windSpeed}
              humidity={this.state.current.humidity}
            />
            <CalcDate value={this.state.current.date} />
            <City name={this.state.current.place} />
          </CurrentWeather>

          <DailyWeather
            onClick={this.setCurrentWeather}
            list={this.state.list}
            date={this.state.current.date}
          />

          <HourlyWeather
            onClick={this.setCurrentWeather}
            list={this.state.list}
            itemIndex={this.state.current.itemIndex}
            onWheel={this.hourHandleWheel}
          />
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}

export default Weather;
