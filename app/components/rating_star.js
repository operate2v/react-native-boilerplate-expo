import React from 'react';
import PropTypes from 'prop-types';
import { Rating } from 'react-native-ratings';

const RatingStar = ({ ratingSize, ratingColor, onFinishRating }) => (
  <Rating
    type="custom"
    ratingCount={5}
    imageSize={ratingSize}
    ratingColor={ratingColor}
    ratingBackgroundColor="white"
    onFinishRating={val => onFinishRating(val)}
  />
);

RatingStar.propTypes = {
  ratingSize: PropTypes.number,
  ratingColor: PropTypes.string,
  onFinishRating: PropTypes.func.isRequired,
};
RatingStar.defaultProps = {
  ratingSize: 30,
  ratingColor: '#f1c40f',
};
export default RatingStar;
