import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Text } from 'components/commons';
import { colors } from 'constants';

const DEFAULT_SIZE_MULTIPLIER = 1.4;
const DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER = 0.1;

const RadioButtonView = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const OuterView = styled.View`
  justify-content: center;
  align-items: center;
  align-self: center;
  overflow: visible;
  width: ${props => props.size + props.size * DEFAULT_SIZE_MULTIPLIER};
  height: ${props => props.size + props.size * DEFAULT_SIZE_MULTIPLIER};
  border-color: ${props => props.outerColor};
  border-radius: ${props => (props.size + props.size * DEFAULT_SIZE_MULTIPLIER) / 2};
  border-width: ${props => props.size * DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER};
`;
const InnerView = styled.View`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => props.size / 1};
  background-color: ${props => props.innerColor};
`;
const RadioText = styled(Text)`
  font-size: 11px;
  margin-left: 5px;
  color: ${props => (props.isSelected ? colors.darkBlueGrey : colors.coolGrey)};
`;

const GenderRadioButton = ({ ...props }) => {
  const { size, innerColor, outerColor, isSelected, onPress, label, style } = props;
  return (
    <RadioButtonView style={style} onPress={() => onPress(label)} activeOpacity={1}>
      <OuterView size={size} outerColor={outerColor}>
        {isSelected ? <InnerView size={size} innerColor={innerColor} /> : null}
      </OuterView>
      <RadioText isSelected={isSelected}>{label}</RadioText>
    </RadioButtonView>
  );
};

GenderRadioButton.propTypes = {
  size: PropTypes.number,
  innerColor: PropTypes.string,
  outerColor: PropTypes.string,
  isSelected: PropTypes.bool,
  onPress: PropTypes.func,
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
};

GenderRadioButton.defaultProps = {
  size: 7.5,
  innerColor: colors.brightSkyBlue,
  outerColor: colors.linegray,
  isSelected: false,
  onPress: () => null,
  style: {},
};

export default GenderRadioButton;
