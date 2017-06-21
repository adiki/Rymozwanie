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
import VerseInput from './VerseInput';

class GameInProgress extends Component {

    constructor(props) {
        super(props);

        this.state = { keyboardHeight: 0 }
    }

    componentWillMount() {
        this.createDataSource(this.props);

        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardWillShow.remove();
        this.keyboardWillHide.remove();
    }

    keyboardWillShow = (event) => {
        let newSize = event.endCoordinates.height
        
        this.setState({
            keyboardHeight: newSize,
        })
        LayoutAnimation.configureNext({...LayoutAnimation.Presets.linear, duration: event.duration});
    }

    keyboardWillHide = (event) => {
        
        this.setState({
            keyboardHeight: 0,
        })
        LayoutAnimation.configureNext({...LayoutAnimation.Presets.linear, duration: event.duration});
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
        return <Text>TODO: User verse</Text>;
    }

    render() {
        return (
            <View>
                <ListView
                    dataSource={this.dataSource}
                    renderRow={(verse) => {
                        if (verse.generated) {
                            return this.renderGeneratedVerse(verse);
                        } else {
                            return this.renderUserVerse(verse);
                        }
                    }} />
                <VerseInput />
                <View style={{height: this.state.keyboardHeight}} />
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
