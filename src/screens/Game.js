/* @flow */

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Image,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { connect } from 'react-redux';
import colors from '../config/colors';
import EmptyGame from '../components/EmptyGame';
import fonts from '../config/fonts';
import navigatorStyle from '../config/navigatorStyle';
import { fetchStoredVerses } from '../actions';

class Game extends Component {

  componentWillMount() {
    this.props.fetchStoredVerses();
  }

  renderContent() {
    if (this.props.verses === null) {
      return <ActivityIndicator/>
    }

    if (this.props.verses.length == 0) {
      return <EmptyGame/>
    }

    return <View/>
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
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

const mapStateToProps = state => {
  const { loaded, verses } = state.game;
  return { loaded, verses };
};

export default connect(mapStateToProps, { fetchStoredVerses })(Game);