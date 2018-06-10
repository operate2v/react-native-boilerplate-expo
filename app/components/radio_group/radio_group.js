import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import RadioButton from './radio_button';

const RadioGroupView = styled.View`
  margin-top: 24px;
  width: 50%;
`;
const RadioButtonListView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default class GenderRadioGrop extends React.Component {
  state = {
    isSelected: this.props.data.length - 1,
  };

  shouldComponentUpdate = (nextProps, nextStates) => this.state !== nextStates;

  onPressRadioButton = (label) => {
    let index;
    this.props.data.forEach((item, i) => {
      if (label === item.name) {
        index = i;
      }
    });
    this.props.onSelectRadioButton(label);
    this.setState({ isSelected: index });
  };

  render() {
    return (
      <RadioGroupView {...this.props}>
        <RadioButtonListView>
          {this.props.data.map((item, index) => (
            <RadioButton
              key={item.id}
              label={item.name}
              size={6}
              isSelected={this.state.isSelected === index}
              onPress={this.onPressRadioButton}
              style={{ marginRight: 6 }}
            />
          ))}
        </RadioButtonListView>
      </RadioGroupView>
    );
  }
}

GenderRadioGrop.propTypes = {
  data: PropTypes.array.isRequired,
  onSelectRadioButton: PropTypes.func,
};

GenderRadioGrop.defaultProps = {
  onSelectRadioButton: () => null,
};
