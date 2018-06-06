import React, { Component } from 'react';
import { View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default class Icon extends Component {
  state = {};
  render() {
    return (
      <View>
        <Ionicons name="md-checkmark-circle" size={32} color="green" />
        <FontAwesome name="rocket" size={32} color="#900" />
      </View>
    );
  }
}
