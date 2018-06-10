import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Text, Icon } from 'components/commons';
import ScaleWidth from 'utils/scale_width';
import { colors } from 'constants';
import Logo from 'assets/images/logoHeader.png';
import BackButton from './back_button';

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
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;
const LogoImage = styled.Image`
  align-self: center;
  width: ${54 * ScaleWidth};
  height: ${12 * ScaleWidth};
  overflow: visible;
`;
const BackButtonIcon = styled(Icon)`
  margin-left: ${ScaleWidth * 20};
`;
const TitleText = styled(Text)`
  align-self: flex-start;
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0;
  color: #142945;
  background-color: transparent;
`;

class Header extends React.Component {
  state = {};

  shouldComponentUpdate = nextProps =>
    this.props.navigation !== nextProps.navigation ||
    this.props.withBottomBorder !== nextProps.withBottomBorder ||
    this.props.rightComponent !== nextProps.rightComponent ||
    this.props.leftComponent !== nextProps.leftComponent;

  centerView = () => {
    let component;
    if (this.props.isMain) {
      component = <LogoImage source={Logo} resizeMode="contain" />;
    } else if (this.props.centerComponent) {
      component = this.props.centerComponent;
    } else {
      component = <TitleText type="eng">{this.props.title}</TitleText>;
    }
    return component;
  };

  leftView = () => {
    const { withBackButton, leftComponent, leftCompStyle, navigation, onPressLeft } = this.props;

    if (withBackButton) {
      return (
        <BackButton navigation={navigation}>
          <BackButtonIcon size={16 * ScaleWidth} name="btn_back" color={colors.newGrey} />
        </BackButton>
      );
    } else if (leftComponent) {
      return (
        <BackButton style={leftCompStyle} onPressButton={onPressLeft}>
          {leftComponent}
        </BackButton>
      );
    }
    return null;
  };

  rightView = () => {
    const { rightComponent, rightCompStyle, onPressRight } = this.props;

    if (rightComponent) {
      return (
        <BackButton style={rightCompStyle} onPressButton={onPressRight}>
          {rightComponent}
        </BackButton>
      );
    }
    return null;
  };

  render = () => (
    <HeaderView withBottomBorder={this.props.withBottomBorder}>
      {this.centerView()}
      <MenuIconView>
        {this.leftView()}
        {this.rightView()}
      </MenuIconView>
    </HeaderView>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.object.isRequired,
  centerComponent: PropTypes.object,
  leftComponent: PropTypes.any,
  rightComponent: PropTypes.any,
  withBackButton: PropTypes.bool,
  withBottomBorder: PropTypes.bool,
  isMain: PropTypes.bool,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,

  rightCompStyle: PropTypes.object,
  leftCompStyle: PropTypes.object,
};
Header.defaultProps = {
  onPressLeft: () => {},
  onPressRight: () => {},
  rightCompStyle: {},
  leftCompStyle: {},
  isMain: false,
  title: '',
  centerComponent: null,
  leftComponent: null,
  rightComponent: null,
  withBackButton: false,
  withBottomBorder: false,
};

export default withNavigation(Header);
