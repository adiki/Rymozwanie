/* @flow */

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { connect } from 'react-redux';
import colors from '../config/colors';
import EmptyGame from '../components/EmptyGame';
import GameInProgress from '../components/GameInProgress';
import fonts from '../config/fonts';
import navigatorStyle from '../config/navigatorStyle';
import { fetchStoredVerses } from '../actions';

class Game extends Component {

  componentWillMount() {
    this.props.fetchStoredVerses();
  }

  renderContent() {
    if (this.props.verses === null) {
      return <ActivityIndicator />
    }

    if (this.props.verses.length == 0) {
      return <EmptyGame />
    }

    return <GameInProgress />
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
        {this.renderContent()}
      </KeyboardAvoidingView>
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

const mapStateToProps = state => {
  const { verses } = state.game;
  return { verses };
};

export default connect(mapStateToProps, { fetchStoredVerses })(Game);