import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, AsyncStorage } from 'react-native';
import { ScreenView } from 'components/commons';
import { routes } from 'constants';

export default class Loading extends Component {
  state = {};

  bootstrapAsync = async (navigation) => {
    const { navigate } = navigation;
    const userToken = await AsyncStorage.getItem('@AccessToken:key');
    const navigateRoute = !userToken || userToken === 'null' ? routes.main : routes.second;
    navigate(navigateRoute);
  };

  render() {
    this.bootstrapAsync(this.props.navigation);

    return (
      <ScreenView>
        <Text>loading</Text>
      </ScreenView>
    );
  }
}

Loading.propTypes = {
  navigation: PropTypes.object.isRequired,
};
Loading.defaultProps = {};
