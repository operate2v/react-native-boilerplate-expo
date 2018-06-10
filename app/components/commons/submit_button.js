import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, Platform } from 'react-native';
import styled from 'styled-components/native';
import ScaleWidth from 'utils/scale_width';
import { colors } from 'constants';
import Text from './app_text';

const ButtonOpacity = styled.TouchableOpacity`
  height: ${50 * ScaleWidth};
  width: ${props => props.buttonWidth};
  border-radius: 3px;
  align-self: center;
  justify-content: center;
  align-items: center;
  background-color: ${colors.brightSkyBlue};
`;
const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const ButtonText = styled(Text)`
  font-size: 18px;
  font-weight: 500;
  color: white;
  margin-left: ${props => (props.buttonIcon !== null ? 8 : 0)};
`;

const SubmitButton = ({ style, children, ...props }) => (
  <View {...props}>
    <ButtonOpacity
      style={[style, { width: props.isClause ? '100%' : props.buttonWidth }]}
      onPress={() => props.onPressButton()}
      activeOpacity={0.8}
      disabled={props.disabled}
    >
      {!props.disabled ? (
        <ButtonContainer>
          {props.buttonIcon}
          <ButtonText>{props.text}</ButtonText>
        </ButtonContainer>
      ) : (
        <ActivityIndicator size={Platform.OS === 'android' ? 24 : 'small'} color="white" />
      )}
    </ButtonOpacity>
  </View>
);

SubmitButton.defaultProps = {
  style: {},
  children: '',
  buttonWidth: '87%',
  buttonIcon: null,
  isClause: false,
  disabled: false,
};

SubmitButton.propTypes = {
  children: PropTypes.node,
  style: PropTypes.any,
  buttonWidth: PropTypes.string,
  buttonIcon: PropTypes.any,
  onPressButton: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isClause: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default SubmitButton;
