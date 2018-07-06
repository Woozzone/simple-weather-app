import React from 'react';

// Components
import Temperature from '../components/Temperature';
import City from '../components/City';

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
      fetch(url)
        .then(res => res.json())
        .then(result => {
          this.setState({
            isLoaded: true,
            place: result.name,
            temperature: result.main.temp
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
    return (
      <div>
        <Temperature value={this.state.temperature} />
        <City name={this.state.place} />
      </div>
    );
  }
}

export default Weather;
