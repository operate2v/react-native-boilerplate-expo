import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { colors } from 'constants';

const AvatarContainer = styled.View`
  border-radius: ${props => props.size / 2};
  width: ${props => props.size};
  height: ${props => props.size};
  background-color: ${colors.white};
`;
const LoadingImage = styled.Image`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => props.size / 2};
  resize-mode: contain;
  position: absolute;
  z-index: 0;
`;
const AvatarImage = styled.Image`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => props.size / 2};
  resize-mode: contain;
  z-index: 1;
`;

export default class Avatar extends Component {
  state = {
    loading: false,
  };

  componentWillUpdate = (nextProps, nextState) =>
    this.props.size !== nextProps.size ||
    this.props.uri !== nextProps.uri ||
    this.state.loading !== nextState.loading;

  render() {
    return (
      <AvatarContainer size={this.props.size}>
        {this.state.loading ? (
          <LoadingImage size={this.props.size} source={require('assets/images/default.png')} />
        ) : null}
        {this.props.uri ? (
          <AvatarImage
            size={this.props.size}
            onLoadStart={() => this.setState({ loading: true })}
            onLoadEnd={() => this.setState({ loading: false })}
            source={{ uri: this.props.uri }}
          />
        ) : (
          <LoadingImage size={this.props.size} source={require('assets/images/default.png')} />
        )}
      </AvatarContainer>
    );
  }
}

Avatar.defaultProps = {
  size: 100,
  uri: null,
};

Avatar.propTypes = {
  size: PropTypes.number,
  uri: PropTypes.string,
};
