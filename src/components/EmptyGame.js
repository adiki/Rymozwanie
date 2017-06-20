/* @flow */

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import colors from '../config/colors';
import fonts from '../config/fonts';
import navigatorStyle from '../config/navigatorStyle';

export default class EmptyGame extends Component {

  render() {
    return (
      <View>
        <Text style={styles.gameDescription}>
          Rymozwanie to gra polegająca na układaniu rymujących się wersów.
        </Text>
        <TouchableHighlight onPress={this.newGameButtonPressed.bind(this)}
                            underlayColor='white'>
          <Text style={styles.startGameButton}>
            Rozpocznij grę 
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  newGameButtonPressed() {
  }
}

const styles = StyleSheet.create({
  gameDescription: {
    fontSize: 20,
    fontFamily: fonts.medium,
    textAlign: 'center',
    color: colors.textGray,
    marginLeft: 20,
    marginRight: 20
  },
  startGameButton: {
    fontSize: 25,
    fontFamily: fonts.junegullRegular,
    textAlign: 'center',
    color: colors.orange,
    margin: 20,
  },
});