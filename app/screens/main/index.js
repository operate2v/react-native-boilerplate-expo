import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, TouchableHighlight, Button } from 'react-native';
import styled from 'styled-components/native';
import { Text, ScreenView, Divider } from 'components/commons';
import Header from 'components/header/header';
import RadioGroup from 'components/radio_group/radio_group';
import Avatar from 'components/avatar';
import MyCheckBox from 'components/my_check_box';
import RatingStar from 'components/rating_star';
import MyModal from 'components/my_modal';

const MainContainer = styled(ScreenView)`
  align-items: center;
`;
const ScrollWrapper = styled.View`
  align-items: center;
  width: 100%;
`;

export default class Main extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const botImage = 'https://robohash.org/123125123.png';
    const genderList = [
      { id: 0, name: '남성' },
      { id: 1, name: '여성' },
      { id: 2, name: '비공개' },
    ];
    return (
      <MainContainer>
        <MyModal
          isShowModal={this.state.modalVisible}
          toggleModal={val => this.setModalVisible(val)}
          navigation={this.props.navigation}
        />
        <Header title="로그인" withBackButton withBottomBorder />
        <ScrollView>
          <ScrollWrapper>
            <Text>가나다라마바사</Text>
            <Divider isMarginVertical />
            <Text>siabal</Text>
            <Divider isMarginVertical />
            <View style={{ alignItems: 'center', width: '100%' }}>
              <RadioGroup data={genderList} onSelectRadioButton={() => console.log('sibal')} />
            </View>
            <Divider isMarginVertical />
            <Avatar size={80} uri={botImage} />
            <Divider isMarginVertical />
            <Avatar size={80} />
            <Divider isMarginVertical />
            <MyCheckBox text="sibaloma" onPressCheckBox={() => console.log('as')} />
            <Divider isMarginVertical />
            <RatingStar onFinishRating={() => {}} />
            <Divider isMarginVertical />
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Text>Show Modal</Text>
            </TouchableHighlight>
            <Button title="forms" onPress={() => this.props.navigation.navigate('Second')} />
          </ScrollWrapper>
        </ScrollView>
      </MainContainer>
    );
  }
}

Main.defaultProps = {};

Main.propTypes = {
  navigation: PropTypes.object.isRequired,
};
