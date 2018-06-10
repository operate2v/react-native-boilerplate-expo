import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'constants';
import ScaleWidth from 'utils/scale_width';

const Divider = styled.View`
  width: ${props => (props.isFullLine ? Dimensions.get('window').width : 280 * ScaleWidth)}
  height: ${StyleSheet.hairlineWidth};
  background-color: ${colors.linegray};
  align-self: center;
  margin-vertical: ${props => (props.isMarginVertical ? 12 : 0)}
`;

export default Divider;
