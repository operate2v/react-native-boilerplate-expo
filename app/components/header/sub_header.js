import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { Icon, Text } from 'components/commons';
import { colors } from 'constants';
import ScaleWidth from 'utils/scale_width';

const HeaderView = styled.View`
  flex-direction: column;
  height: 55px;
  width: 100%;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.85);
  align-content: center;
  border-bottom-color: ${props => (props.withBottomBorder ? colors.linegray : 'transparent')};
  border-bottom-width: ${props => (props.withBottomBorder ? StyleSheet.hairlineWidth : 0)};
`;
const MenuIconView = styled.View`
  flex-direction: row;
  position: absolute;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`;
const MenuCloseButton = styled.TouchableOpacity`
  margin-right: ${20 * ScaleWidth};
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: flex-end;
`;
const titleStyle = {
  alignSelf: 'flex-start',
  width: 200,
  textAlign: 'left',
  marginLeft: 20 * ScaleWidth,
  fontSize: 18,
  fontWeight: '500',
  letterSpacing: 0,
  color: '#142945',
  backgroundColor: 'transparent',
};

const SubHeader = ({ ...props }) => (
  <HeaderView withBottomBorder={props.withBottomBorder}>
    <Text style={titleStyle}>{props.title}</Text>
    <MenuIconView>
      <MenuCloseButton
        onPress={() => {
          Keyboard.dismiss();
          props.closeDrawer();
        }}
      >
        {props.isIcon ? <Icon size={16} name="btn_close_bold" color={colors.newGrey} /> : null}
      </MenuCloseButton>
    </MenuIconView>
  </HeaderView>
);

SubHeader.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  isIcon: PropTypes.bool,
  rightComponent: PropTypes.any,
  withBackButton: PropTypes.bool,
  withBottomBorder: PropTypes.bool,
  closeDrawer: PropTypes.func,
  rightCompStyle: PropTypes.object,
};
SubHeader.defaultProps = {
  closeDrawer: () => null,
  rightCompStyle: {},
  title: '',
  style: {},
  isIcon: false,
  rightComponent: null,
  withBackButton: false,
  withBottomBorder: false,
};

export default SubHeader;
