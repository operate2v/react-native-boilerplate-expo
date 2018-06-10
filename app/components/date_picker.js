import React from 'react';
import PropTypes from 'prop-types';
import { Platform, TouchableOpacity } from 'react-native';
import { Text } from 'components/commons';
import styled from 'styled-components/native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { colors } from 'constants';

const PickerView = styled.View`
  flex-direction: column;
  margin-top: 24;
  padding-left: 30;
  width: 50%;
`;
const DateText = styled(Text)`
  font-size: 11px;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  margin-top: ${Platform.OS === 'android' ? 3 : 0};
  color: ${props => (!props.date ? colors.coolGrey : colors.darkBlueGrey)};
`;

export default class DatePicker extends React.Component {
  state = { isDateTimePickerVisible: false };

  shouldComponentUpdate = (nextProps, nextStates) =>
    this.state.isDateTimePickerVisible !== nextStates.isDateTimePickerVisible;

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (date) => {
    const dateString = new Date(date);

    const dateValueList = [
      `${dateString.getFullYear()}`,
      `${`0${dateString.getMonth() + 1}`.slice(-2)}`,
      `${`0${dateString.getDate()}`.slice(-2)}`,
    ];
    const dateToInsert = dateValueList.join('/');
    this.hideDateTimePicker();
    this.props.onDatePicked(dateToInsert);
  };

  render() {
    const today = new Date();

    return (
      <PickerView {...this.props}>
        <Text>생년월일</Text>
        <TouchableOpacity onPress={this.showDateTimePicker}>
          <DateText type="eng" date={this.props.date}>
            {this.props.date || '-------- / ---- / ----'}
          </DateText>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          locale="ko"
          maximumDate={today}
        />
      </PickerView>
    );
  }
}

DatePicker.propTypes = {
  date: PropTypes.string,
  onDatePicked: PropTypes.func.isRequired,
};
DatePicker.defaultProps = {
  date: null,
};
