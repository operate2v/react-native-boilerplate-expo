import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Modal } from 'react-native';
import { Text } from 'components/commons';

/**
 * screens 폴더 안에 구현할 것이며
 * 단순 예제
 */
export default class MyModal extends Component {
  state = {};
  render() {
    console.log(this.props.isShowModal);
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.isShowModal}
          onRequestClose={() => {}}
        >
          <View style={{ marginTop: 22 }}>
            <Text>Hello World!</Text>

            <TouchableOpacity
              onPress={() => {
                this.props.toggleModal(!this.props.isShowModal);
              }}
            >
              <Text>Hide Modal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.toggleModal(false);
                setTimeout(() => {
                  this.props.navigation.navigate('Second');
                }, 220);
              }}
            >
              <Text>next Page</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

MyModal.defaultProps = {};

MyModal.propTypes = {
  isShowModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};
