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
    LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import colors from '../config/colors';
import fonts from '../config/fonts';
import navigatorStyle from '../config/navigatorStyle';
import { generateVerse } from '../actions';
import GeneratedVerse from './GeneratedVerse';
import UserVerse from './UserVerse';
import VerseInput from './VerseInput';

class GameInProgress extends Component {

    constructor(props) {
        super(props);

        this.isKeyboardPresenting = false;
        this.state = { keyboardHeight: 0, listViewHeight: 0, listViewContentSizeHeight: 0 };
    }

    componentWillMount() {
        this.createDataSource(this.props);

        this.isKeyboardPresenting = true

        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
        this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
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
            this._listView.scrollTo({x: 0, y: 0, animated: true})
        }
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
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

    render() {
        return (
            <View>
                <ListView ref={component => this._listView = component}
                    keyboardDismissMode='on-drag'
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
                <VerseInput />
                <View style={{ height: this.state.keyboardHeight }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
});

const mapStateToProps = state => {
    const { verses } = state.game;
    return { verses };
};

export default connect(mapStateToProps)(GameInProgress);
