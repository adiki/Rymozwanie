/**
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import colors from '../config/colors';
import fonts from '../config/fonts';

export default class Games extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        ...Platform.select({
          ios: {
            title: 'Graj',
            buttonColor: colors.orange,
            buttonFontSize: 20,
            buttonFontFamily: fonts.junegullRegular,
          },
          android: {
            icon: require('../../assets/img/icons/plus.png'),
          },
        }),
        id: 'new_game',
      }
    ]
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.hello}>
          Witaj adiki
        </Text>
        <Text style={styles.lastGamesPrompt}>
          Twoje ostatnie gry będą pokazane tutaj
        </Text>
        <TouchableHighlight onPress={this.newGameButtonPressed}
                            underlayColor='white'>
          <Text style={styles.newGame}>
            Rozpocznij nową grę
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  newGameButtonPressed() {
    console.log("pressed");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  hello: {
    fontSize: 30,
    fontFamily: fonts.medium,
    textAlign: 'center',
    color: colors.textGray,
    margin: 10,
  },
  lastGamesPrompt: {
    fontSize: 20,
    fontFamily: fonts.medium,
    textAlign: 'center',
    color: colors.textGray,
    marginLeft: 20,
    marginRight: 20
  },
  newGame: {
    fontSize: 25,
    fontFamily: fonts.junegullRegular,
    textAlign: 'center',
    color: colors.orange,
    margin: 20,
  },
});