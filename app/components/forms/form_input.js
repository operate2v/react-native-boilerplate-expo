import React from 'react';
import PropTypes from 'prop-types';
import { Platform, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'constants';
import ScaleWidth from 'utils/scale_width';
import { Text, Icon } from 'components/commons';

const FormView = styled.View`
  width: ${280 * ScaleWidth};
  margin-horizontal: ${20 * ScaleWidth};
  background-color: transparent;
  align-self: center;
`;
const InputView = styled.View`
  border-bottom-color: ${colors.slate};
  border-bottom-width: 1px;
  padding-bottom: 5px;
`;
const IconView = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  position: absolute;
  right: 12;
  bottom: 6;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const TextInput = styled.TextInput`
  font-size: 15px;
  font-weight: 300;
  font-style: normal;
  letter-spacing: 0px;
  text-align: left;
  color: #343b4d;
  padding: 0px;
  width: 85%;
  font-family: ${Platform.OS === 'ios' ? 'Apple SD Gothic Neo' : 'Spoqa Han Sans Light'};
`;
const ValidationMessage = styled(Text)`
  font-size: 12px;
  font-weight: 300;
  font-style: normal;
  letter-spacing: 0;
  text-align: right;
  margin-vertical: 10px;
  color: ${colors.brightSkyBlue};
`;
const SubItemView = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: flex-end;
  width: auto;
  align-self: flex-end;
`;
const ConfirmButtonView = styled.TouchableOpacity`
  height: 25px;
  width: 41px;
  border-radius: 3px;
  background-color: ${props => (props.isValid ? colors.brightSkyBlue : colors.blueyGrey)};
  position: absolute;
  right: 0;
  bottom: 5;
  align-items: center;
  justify-content: center;
`;
const ConfirmButtonText = styled(Text)`
  font-size: 12px;
  font-weight: 300;
  color: white;
  text-align: center;
`;
const LabelText = styled(Text)`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: left;
  width: ${100 * ScaleWidth};
  color: #343b4d;
  background-color: transparent;
  margin-bottom: ${10 * ScaleWidth};
`;

export default class FormInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isValid: false,
    };

    this.indicatorLoading = null;
    this.validationMessageIndex = 0;
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.checkPassword && this.props.checkPassword !== nextProps.checkPassword) {
      this.validationNow(nextProps.validateFormula, nextProps.value);
    }
  };

  shouldComponentUpdate = (nextProps, nextStates) =>
    this.props.value !== nextProps.value ||
    this.state.loading !== nextStates.loading ||
    this.props.checkPassword !== nextProps.checkPassword;

  onChangeText = (text) => {
    const { validateFormula, onChangeText } = this.props;
    onChangeText(text);
    this.checkEmpty(text);
    clearTimeout(this.indicatorLoading);
    if (validateFormula) this.validationNow(validateFormula, text);
  };

  clearText = () => {
    this.props.onChangeText('');
    this.setState({ loading: false, isValid: false });
  };

  checkEmpty = (text) => {
    if (text === '') this.setState({ isValid: false });
  };

  validationNow = (regExp, text) => {
    const { isLoading, validationFunc } = this.props;
    if (isLoading && validationFunc) this.setState({ loading: true });

    let gotInvalid = false;

    regExp.forEach((formula, index) => {
      const patt = new RegExp(formula);
      const res = patt.test(text);
      if (!res) {
        gotInvalid = true;
        this.validationMessageIndex = index;
      }
    });

    if (validationFunc && !gotInvalid) {
      validationFunc(text, (hasEmail, meesageNumber) => {
        if (hasEmail) this.validationMessageIndex = meesageNumber;
        this.setState({ isValid: !hasEmail, loading: false });
      });
    } else if (validationFunc) {
      this.setState({ isValid: !gotInvalid, loading: false });
    } else {
      this.setState({ isValid: !gotInvalid });
    }
  };

  renderLabelText = () => {
    if (this.props.label) {
      return <LabelText>{this.props.label}</LabelText>;
    }
    return null;
  };

  renderInvalidIcon = (value) => {
    if (value.length > 0) {
      return (
        <IconView activeOpacity={0.8} onPress={() => this.clearText()}>
          <Icon size={16} name="btn_close_small" color="#98a1ae" />
        </IconView>
      );
    }
    return null;
  };

  renderValidIcon = (value) => {
    if (value.length > 0) {
      return (
        <IconView activeOpacity={1}>
          <Icon size={16} name="input_OK" color={colors.brightSkyBlue} />
        </IconView>
      );
    }
    return null;
  };

  renderIndicator = (value) => {
    if (value.length > 0) {
      return (
        <IconView activeOpacity={1}>
          <ActivityIndicator
            size={Platform.OS === 'android' ? 19 : 'small'}
            color={colors.brightSkyBlue}
          />
        </IconView>
      );
    }
    return null;
  };

  renderValidationIcon = () => {
    const { value, showIcon } = this.props;
    const { isValid, loading } = this.state;

    if (showIcon) {
      if (!isValid && !loading) {
        return this.renderInvalidIcon(value);
      } else if (loading) {
        return this.renderIndicator(value);
      } else if (isValid === true && !loading) {
        return this.renderValidIcon(value);
      }
    }
    return null;
  };

  renderConfirmButton = () => {
    if (this.props.showConfirmButton) {
      return (
        <ConfirmButtonView
          isValid={this.state.isValid}
          onPress={() => {
            this.props.onPressConfirmButton();
            this.clearText();
          }}
          activeOpacity={0.7}
          disabled={!this.state.isValid}
        >
          <ConfirmButtonText isScale={false}>확인</ConfirmButtonText>
        </ConfirmButtonView>
      );
    }
    return null;
  };

  renderValidationMessage = () => {
    const { showValidationMessage, value, validationMessages } = this.props;
    const { isValid, loading } = this.state;

    if (!isValid && !loading && validationMessages && showValidationMessage && value.length > 0) {
      return (
        <ValidationMessage>{validationMessages[this.validationMessageIndex]}</ValidationMessage>
      );
    }
    return null;
  };

  renderAlertMessage = () => {
    if (this.props.showAlertMessage) {
      return <ValidationMessage>{this.props.alertMessage}</ValidationMessage>;
    }
    return null;
  };

  renderSubItem = subItem => (subItem ? <SubItemView>{subItem}</SubItemView> : null);

  render() {
    const { style, value, placeholder, isPassword, subItem } = this.props;
    return (
      <FormView style={style}>
        <InputView>
          {this.renderLabelText()}
          <TextInput
            underlineColorAndroid="transparent"
            secureTextEntry={isPassword}
            value={value}
            onChangeText={text => this.onChangeText(text)}
            placeholderTextColor="#98a1ae"
            placeholder={placeholder}
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect={false}
            blurOnSubmit
          />
          {this.renderValidationIcon()}
          {this.renderConfirmButton()}
        </InputView>
        {this.renderValidationMessage()}
        {this.renderAlertMessage()}
        {this.renderSubItem(subItem)}
      </FormView>
    );
  }
}

FormInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  checkPassword: PropTypes.string,
  isLoading: PropTypes.bool,
  onChangeText: PropTypes.func,
  style: PropTypes.any,
  label: PropTypes.string,
  subItem: PropTypes.object,
  showValidationMessage: PropTypes.bool,
  showIcon: PropTypes.bool,
  showAlertMessage: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  onPressConfirmButton: PropTypes.func,
  validateFormula: PropTypes.array,
  validationMessages: PropTypes.arrayOf(PropTypes.string),
  validationFunc: PropTypes.func,
  alertMessage: PropTypes.string,
};
FormInput.defaultProps = {
  value: '',
  placeholder: '',
  isPassword: false,
  checkPassword: null,
  isLoading: false,
  onChangeText: () => {},
  style: {},
  label: null,
  subItem: null,
  showValidationMessage: false,
  showIcon: false,
  showAlertMessage: false,
  showConfirmButton: false,
  onPressConfirmButton: () => {},
  validateFormula: [],
  validationMessages: [],
  validationFunc: null,
  alertMessage: null,
};
