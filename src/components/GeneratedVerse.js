/* @flow */

'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableHighlight,
    View,
    Dimensions,
    Animated
} from 'react-native';
import { connect } from 'react-redux';
import colors from '../config/colors';
import fonts from '../config/fonts';
import navigatorStyle from '../config/navigatorStyle';
import { generateVerse } from '../actions';

class GeneratedVerse extends Component {
    
    constructor(props) {
        super(props);

        this.state = { opacity: new Animated.Value(0) }
    }

    componentDidMount() {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500
        }).start();
    }

    render() {
        return (
            <Animated.View style={[styles.container, { opacity: this.state.opacity }]}>
                <View style={styles.innerContainer}>
                    <View style={styles.verseBox}>
                        <Text style={styles.text}>{this.props.versesPool[this.props.verse.verseIndex]}</Text>
                    </View>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 1,
        flexDirection: 'row',
    },
    innerContainer: {
        width: Dimensions.get('window').width * 0.8,
        flexDirection: 'row',
    },
    verseBox: {
        backgroundColor: colors.yellow,
        margin: 10,
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
