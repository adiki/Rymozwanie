/* @flow */

'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

export default class Games extends Component {

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});