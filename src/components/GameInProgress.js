/* @flow */

'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    Text,
    TouchableHighlight,
    View,
    Keyboard,
    Dimensions,
    LayoutAnimation,
    Animated
} from 'react-native';
import { connect } from 'react-redux';
import colors from '../config/colors';
import fonts from '../config/fonts';
import navigatorStyle from '../config/navigatorStyle';
import { generateVerse } from '../actions';
import GeneratedVerse from './GeneratedVerse';
import Header from './Header';
import UserVerse from './UserVerse';
import VerseInput from './VerseInput';

class GameInProgress extends Component {

    constructor(props) {
        super(props);

        this.isKeyboardPresenting = false;
        this.state = { keyboardHeight: 0, listViewHeight: 0, listViewContentSizeHeight: 0, scoreValue: 0 };
    }

    componentWillMount() {
        this.createDataSource(this.props);

        this.isKeyboardPresenting = true

        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
        this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);

        
        const score = new Animated.Value(0)
        score.addListener(({value}) => this.setState({scoreValue: value}));

        Animated.timing(score, {
            toValue: this.props.score,
            duration: 1000,
        }).start();
    }

    componentWillUnmount() {
        this.keyboardWillShow.remove();
        this.keyboardDidShow.remove();
        this.keyboardWillHide.remove();
        this.keyboardDidHide.remove();
    }

    keyboardWillShow = (event) => {

        this.isKeyboardPresenting = true

        let newSize = event.endCoordinates.height

        this.setState({
            keyboardHeight: newSize,
        })
        LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.linear, duration: event.duration });
    }

    keyboardDidShow = () => {
        this.isKeyboardPresenting = false

        if (this.state.listViewHeight < this.state.listViewContentSizeHeight) {
            this._listView.scrollToEnd()
        }
    }

    keyboardWillHide = (event) => {

        this.setState({
            keyboardHeight: 0,
        })
        LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.linear, duration: event.duration });
    }

    keyboardDidHide = (event) => {

        if (this.state.listViewHeight < this.state.listViewContentSizeHeight) {
            this._listView.scrollToEnd()
        } else {
            this._listView.scrollTo({ x: 0, y: 0, animated: true })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);

        const score = new Animated.Value(nextProps.oldScore)
        score.addListener(({value}) => this.setState({scoreValue: value}));

        Animated.timing(score, {
            toValue: nextProps.score,
            duration: 1000,
        }).start();
    }

    createDataSource({ verses }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(verses);
    }

    renderGeneratedVerse(verse) {
        return <GeneratedVerse verse={verse} />;
    }

    renderUserVerse(verse) {
        return <UserVerse verse={verse} />;
    }

    renderError() {
        if (this.props.error == null) {
            return;
        }

        return <Text style={styles.error}>{this.props.error}</Text>;
    }

    render() {
        return (
            <View>
                <Header title={`Twój wynik: ${Math.floor(this.state.scoreValue)}`} />
                <ListView ref={component => this._listView = component}
                    style={{ width: Dimensions.get('window').width }}
                    dataSource={this.dataSource}
                    onLayout={(event) => {
                        const { height } = event.nativeEvent.layout
                        this.setState({ listViewHeight: height })
                    }}
                    onContentSizeChange={(contentSize) => {

                        this.setState({ listViewContentSizeHeight: this._listView.getMetrics().contentLength })
                        if (this.isKeyboardPresenting) {
                            return
                        }

                        if (this.state.listViewHeight < this._listView.getMetrics().contentLength) {
                            this._listView.scrollToEnd()
                        }
                    }}
                    renderRow={(verse) => {
                        if (verse.generated) {
                            return this.renderGeneratedVerse(verse);
                        } else {
                            return this.renderUserVerse(verse);
                        }
                    }} />
                {this.renderError()}
                <VerseInput />
                <View style={{ height: this.state.keyboardHeight }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    error: {
        backgroundColor: 'red',
        color: 'white',
        padding: 8,
        fontSize: 15,
        fontFamily: fonts.medium
    },
    showNextVerse: {
        position: 'absolute',
        color: colors.orange,
        padding: 8,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: fonts.junegullRegular
    }
});

const mapStateToProps = state => {
    const { verses, error, showNextVerse, score, oldScore } = state.game;
    return { verses, error, showNextVerse, score, oldScore };
};

export default connect(mapStateToProps)(GameInProgress);
