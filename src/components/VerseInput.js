/* @flow */

'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';
import { connect } from 'react-redux';
import colors from '../config/colors';
import fonts from '../config/fonts';
import navigatorStyle from '../config/navigatorStyle';
import { generateVerse } from '../actions';

class VerseInput extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.textInput}/>
                <TouchableHighlight style={styles.touchableHighlight} 
                                    onPress={this.replyButtonPressed.bind(this)}
                    underlayColor='white'>
                    <Text style={styles.replyButton}>
                        Odpowiedz
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }

    replyButtonPressed() {

    }
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: colors.lightGray
    },
    textInput: {
        flex: 1,
        margin: 5,
        backgroundColor: colors.lightGray,
        borderRadius: 5,
        fontFamily: fonts.medium,
        paddingLeft: 5,
        paddingRight: 5,
    },
    replyButton: {
        fontSize: 17,
        fontFamily: fonts.bold,
        color: colors.orange,
        padding: 10,
    },
});

export default connect(null)(VerseInput);
