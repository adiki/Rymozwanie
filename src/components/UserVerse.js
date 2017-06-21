/* @flow */

'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableHighlight,
    View,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import colors from '../config/colors';
import fonts from '../config/fonts';
import navigatorStyle from '../config/navigatorStyle';
import { generateVerse } from '../actions';

class GeneratedVerse extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.verseBox}>
                        <Text style={styles.text}>{this.props.verse.value}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    innerContainer: {
        width: Dimensions.get('window').width * 0.8,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    verseBox: {
        backgroundColor: colors.orange,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        borderRadius: 10,
    },
    text: {
        fontFamily: fonts.medium,
        fontSize: 17
    }
});

const mapStateToProps = state => {
    const { versesPool } = state.game;
    return { versesPool };
};

export default connect(mapStateToProps)(GeneratedVerse);
