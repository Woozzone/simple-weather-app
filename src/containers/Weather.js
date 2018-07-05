import React from 'react';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      temperature: 0
    };
  }

  componentDidMount() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          temperature: result.main.temp
        });
      })
      .catch(() => {
        this.setState({
          isLoaded: false
        });
      });
  }

  render() {
    return <div>{this.state.temperature}</div>;
  }
}

export default Weather;
