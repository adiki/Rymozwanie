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
import { currentReplyDidChange, submitReply } from '../actions';

class VerseInput extends Component {

    constructor(props) {
        super(props);

        this.state = { textInputHeight: 34 }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={[styles.textInput, { height: this.state.textInputHeight }]}
                    value={this.props.currentReply}
                    autoFocus={true}
                    returnKeyType='done'
                    blurOnSubmit={false}
                    multiline={true}
                    placeholder='Twój rymujący się werset'
                    onChangeText={(this.onInputTextChange.bind(this))}
                    onSubmitEditing={this.submit.bind(this)}
                    onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)} />
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

    updateSize = (textInputHeight) => {
        this.setState({
            textInputHeight: Math.min(Math.max(34, textInputHeight + 10), 136)
        });
    }

    onInputTextChange(value) {
        this.props.currentReplyDidChange(value)
    }

    submit() {
        this.props.submitReply();
    }

    replyButtonPressed() {
        this.props.submitReply();
    }
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: colors.lightGray
    },
    textInput: {
        flex: 1,
        marginTop: 5,
        marginLeft: 5,
        marginBottom: 5,
        backgroundColor: colors.lightGray,
        borderRadius: 5,
        fontFamily: fonts.medium,
        fontSize: 18,
        padding: 5,
    },
    replyButton: {
        fontSize: 17,
        fontFamily: fonts.bold,
        color: colors.orange,
        padding: 10,
    },
});

const mapStateToProps = state => {
    const { currentReply } = state.game;
    return { currentReply };
};

export default connect(mapStateToProps, { currentReplyDidChange, submitReply })(VerseInput);
