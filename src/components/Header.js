/* @flow */

'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import colors from '../config/colors';
import fonts from '../config/fonts';
import navigatorStyle from '../config/navigatorStyle';
import { currentReplyDidChange, submitReply, generateVerse } from '../actions';

class Header extends Component {

    render() {
        return (
            <View style={[styles.container, { height: (Platform.OS === 'ios') ? 64 : 44 }]}>
                <View style={styles.innerContainer}>
                    <Text style={styles.score}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        marginTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    score: {
        fontSize: 22,
        textAlign: (Platform.OS === 'ios') ? 'center' : 'left',
        textAlignVertical: 'center',
        fontFamily: fonts.bold,
        color: colors.orange,
        paddingLeft: (Platform.OS === 'ios') ? 0 : 10,
    },
});

const mapStateToProps = state => {
    const { currentReply, showNextVerse } = state.game;
    return { currentReply, showNextVerse };
};

export default connect(mapStateToProps, { currentReplyDidChange, submitReply, generateVerse })(Header);
