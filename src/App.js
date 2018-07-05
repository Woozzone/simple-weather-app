import React, { Component } from 'react';

// Styles
import 'normalize.css';

// Components
import Container from './components/Container';

// Images
import containerBackground from './assets/img/app-bg.jpeg';

class App extends Component {
  render() {
    return <Container backgroundPath={containerBackground} />;
  }
}

export default App;
