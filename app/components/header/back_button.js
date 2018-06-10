import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Keyboard } from 'react-native';

const leftBackStyle = {
  backgroundColor: 'transparent',
  overflow: 'visible',
  width: 44,
  height: 44,
  justifyContent: 'center',
};

const BackButton = ({ ...props }) => (
  <TouchableOpacity
    style={props.style === {} ? leftBackStyle : props.style}
    activeOpacity={0.6}
    onPress={() => {
      Keyboard.dismiss();
      if (props.navigation) {
        props.navigation.goBack(null);
      } else {
        props.onPressButton();
      }
    }}
  >
    {props.children}
  </TouchableOpacity>
);

BackButton.propTypes = {
  navigation: PropTypes.object,
  children: PropTypes.any,
  style: PropTypes.object,
  onPressButton: PropTypes.func,
};
BackButton.defaultProps = {
  navigation: null,
  children: null,
  style: {},
  onPressButton: () => {},
};

export default BackButton;
