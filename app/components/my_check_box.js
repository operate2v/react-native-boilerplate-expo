import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'components/commons';
import styled from 'styled-components/native';
import CheckBox from 'react-native-check-box';

const CheckBoxContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const CheckBoxText = styled(Text)`
  padding-right: ${props => props.paddingText};
  color: ${props => props.checkboxColor};
`;

export default class MyCheckBox extends Component {
  state = {
    checked: false,
  };

  shouldComponentUpdate = (nextProps, nextState) =>
    this.state.checked !== nextState.checked ||
    this.props.checkboxColor !== nextProps.checkboxColor ||
    this.props.paddingText !== nextProps.paddingText ||
    this.props.text !== nextProps.text;

  onPressCheckBox = (checked) => {
    this.props.onPressCheckBox(checked);
    this.setState({ checked: !checked });
  };

  render() {
    const { paddingText, checkboxColor, text, onPressCheckBox } = this.props;
    return (
      <CheckBoxContainer>
        <CheckBoxText paddingText={paddingText} checkboxColor={checkboxColor}>
          {text}
        </CheckBoxText>
        <CheckBox
          onClick={checked => onPressCheckBox(checked)}
          isChecked={this.state.checked}
          checkBoxColor={checkboxColor}
        />
      </CheckBoxContainer>
    );
  }
}

MyCheckBox.propTypes = {
  text: PropTypes.string.isRequired,
  onPressCheckBox: PropTypes.func.isRequired,
  checkboxColor: PropTypes.string,
  paddingText: PropTypes.number,
};

MyCheckBox.defaultProps = {
  paddingText: 12,
  checkboxColor: '#333',
};
