import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, Text } from 'react-native';
import ScaleWidth from 'utils/scale_width';

const baseStyle = StyleSheet.flatten({
  ...Platform.select({
    ios: {
      // fontFamily: 'system font',
      // 기본적인 폰트 설정
    },
    android: {
      // fontFamily: 'Spoqa Han Sans',
      // 기본적인 폰트 설정
    },
    padding: 0,
    letterSpacing: 0,
    fontStyle: 'normal',
  }),
});

const makeScaleFontStyle = (isScale, fontSize) => {
  let scaleFontStyle = {};
  if (isScale) scaleFontStyle = { fontSize: fontSize * ScaleWidth };

  return scaleFontStyle;
};

const makeFontFamilyType = (type, platform, fontWeight) => {
  let fontFamilyType = null;

  if (type === 'eng') {
    if (platform === 'ios') {
      switch (fontWeight) {
        case '100':
        case '200':
        case '300':
          fontFamilyType = 'Roboto-Light';
          break;
        default:
          fontFamilyType = 'Roboto-Bold';
          break;
      }
    } else {
      switch (fontWeight) {
        case '100':
        case '200':
        case '300':
          fontFamilyType = 'Roboto-Light';
          break;
        default:
          fontFamilyType = 'Roboto-Bold';
          break;
      }
    }
  } else if (platform === 'ios') {
    fontFamilyType = 'Gugi-Regular';
  } else {
    fontFamilyType = 'Gugi-Regular';
  }

  return {
    fontFamily: fontFamilyType,
  };
};

const AppText = ({ style, type, isScale, ...props }) => {
  const newStyle = StyleSheet.flatten([baseStyle, style]);

  const newAppTextStyle = StyleSheet.flatten([
    newStyle,
    makeFontFamilyType(type, Platform.OS, style.fontWeight),
    makeScaleFontStyle(isScale, newStyle.fontSize),
  ]);

  return (
    <Text {...props} style={newAppTextStyle}>
      {props.children}
    </Text>
  );
};

AppText.propTypes = {
  children: PropTypes.node,
  style: PropTypes.any,
  type: PropTypes.string,
  isScale: PropTypes.bool,
};

AppText.defaultProps = {
  style: {},
  type: '',
  isScale: true,
  children: '',
};

export default AppText;
