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
import { connect } from 'react-redux';
import colors from '../config/colors';
import fonts from '../config/fonts';
import navigatorStyle from '../config/navigatorStyle';
import { generateVerse } from '../actions';
import Header from './Header';

class EmptyGame extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Header title='Rymozwanie' />
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
        <View />
      </View>
    );
  }

  newGameButtonPressed() {
    this.props.generateVerse();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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

export default connect(null, { generateVerse })(EmptyGame);
