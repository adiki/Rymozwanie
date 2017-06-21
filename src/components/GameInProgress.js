/* @flow */

'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import { connect } from 'react-redux';
import colors from '../config/colors';
import fonts from '../config/fonts';
import navigatorStyle from '../config/navigatorStyle';
import { generateVerse } from '../actions';
import GeneratedVerse from './GeneratedVerse';

class GameInProgress extends Component {

    componentWillMount() {
        this.createDataSource(this.props);
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
            <ListView
                dataSource={this.dataSource}
                renderRow={(verse) => {
                    if (verse.generated) {
                        return this.renderGeneratedVerse(verse);
                    } else {
                        return this.renderUserVerse(verse);
                    }
                }} />
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
