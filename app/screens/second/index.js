import React, { Component } from 'react';
import { TouchableWithoutFeedback, ScrollView, Keyboard, Platform } from 'react-native';
import styled from 'styled-components/native';
import { ScreenView } from 'components/commons';
import Header from 'components/header/header';
import FormInput from 'components/forms/form_input';
import DatePicker from 'components/date_picker';

const ScreenKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: white;
`;

export default class Second extends Component {
  state = {
    email: '',
    nickName: '',
    password: '',
    confirmPassword: '',
    gender: null,
    date: null,
    isScrollTop: false,
    lockSignup: false,
  };

  render() {
    return (
      <ScreenView>
        <ScreenKeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
          <Header title="회원가입" withBackButton withBottomBorder />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              keyboardDismissMode="none"
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <FormInput
                label="닉네임"
                placeholder="닉네임을 입력하세요"
                value={this.state.nickName}
                onChangeText={nickName => this.setState({ nickName })}
                style={{ marginTop: 21 }}
                showIcon
                showValidationMessage
                validateFormula={[
                  '^[a-zA-Z0-9ㄱ-ㅎ가-힣@!#`$`%`^`&`*()]{1,8}$',
                  '^[a-zA-Z0-9가-힣ㄱ-ㅎ]{1,8}$',
                ]}
                validationMessages={[
                  '“8” 글자 이하로 입력해주세요.',
                  '특수 문자를 사용할 수 없습니다.',
                ]}
              />
              <FormInput
                label="이메일"
                placeholder="이메일을 입력해 주세요"
                // isLoading
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                style={{ marginTop: 24 }}
                showIcon
                showValidationMessage
                validationFunc={this.fetchIsEmail}
                validateFormula={['^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$']}
                validationMessages={[
                  '이메일을 형식에 맞게 입력하세요',
                  '이미 가입되어 있는 메일주소 입니다',
                ]}
              />
              <FormInput
                label="비밀번호"
                placeholder="비밀번호를 입력하세요"
                isPassword
                checkPassword={this.state.confirmPassword}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                style={{ marginTop: 24 }}
                showIcon
                showValidationMessage
                validateFormula={['^(?=.*\\d)(?=.*[a-zA-Z]).{6,}$']}
                validationMessages={['영문과 숫자 조합 6자리 이상 입력하세요']}
              />
              <FormInput
                label="비밀번호 확인"
                placeholder="닉네임을 입력하세요"
                isPassword
                checkPassword={this.state.password}
                value={this.state.confirmPassword}
                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                style={{ marginTop: 24 }}
                showIcon
                showValidationMessage
                validateFormula={[
                  `^[${this.state.password}]{${this.state.password.length},${
                    this.state.password.length
                  }}$`,
                ]}
                validationMessages={['비밀번호와 동일해야 합니다']}
              />
              <DatePicker date={this.state.date} onDatePicked={date => this.setState({ date })} />
            </ScrollView>
          </TouchableWithoutFeedback>
        </ScreenKeyboardAvoidingView>
      </ScreenView>
    );
  }
}
