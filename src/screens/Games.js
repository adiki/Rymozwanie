/* @flow */

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
import navigatorStyle from '../config/navigatorStyle';

export default class Games extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        icon: require('../../assets/img/icons/plus.png'),
        id: 'new_game',
      }
    ]
  };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.lastGamesPrompt}>
          Twoje ostatnie gry będą pokazane tutaj
        </Text>
        <TouchableHighlight onPress={this.newGameButtonPressed.bind(this)}
                            underlayColor='white'>
          <Text style={styles.newGame}>
            Rozpocznij nową grę
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  newGameButtonPressed() {
    this.props.navigator.push({
       screen: 'rymozwanie.Game',
       title: 'Rymozwanie',
       backButtonTitle: '',
       navigatorStyle
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
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