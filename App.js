import React from 'react';
import { Font } from 'expo';
import Root from 'routes/root';

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentWillMount() {
    await Font.loadAsync({
      'Roboto-Light': require('assets/custom_font/Roboto-Light.ttf'),
      'Roboto-Bold': require('assets/custom_font/Roboto-Bold.ttf'),
      'Gugi-Regular': require('assets/custom_font/Gugi-Regular.ttf'),
      icomoon: require('assets/fonts/icon_font/fonts/icomoon.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (this.state.fontLoaded) {
      return <Root />;
    }
    return null;
  }
}
