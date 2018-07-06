import React, { Component } from 'react';

// Styles
import 'normalize.css';
import 'weather-icons/css/weather-icons.css';

// Components
import Weather from './containers/Weather';
import Container from './components/Container';

// Images
import containerBackground from './assets/img/app-bg.jpeg';

class App extends Component {
  render() {
    return (
      <Container backgroundPath={containerBackground}>
        <Weather />
      </Container>
    );
  }
}

export default App;
