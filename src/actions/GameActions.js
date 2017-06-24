/* @flow */

'use strict';

import {
    AsyncStorage
} from 'react-native';

export const fetchStoredVerses = () => {

    return async (dispatch) => {
        try {
            let verses = await AsyncStorage.getItem('@RymozwanieStore:verses');
            verses = JSON.parse(verses);
            let score = await AsyncStorage.getItem('@RymozwanieStore:score');
            score = JSON.parse(score);
            let generatedIndexes = await AsyncStorage.getItem('@RymozwanieStore:generatedIndexes');
            generatedIndexes = JSON.parse(generatedIndexes);
            dispatch({ type: 'data_fetched', verses, score, generatedIndexes });
        } catch (error) {
            console.log(error);
        }
    };
};

export const generateVerse = () => {
    return {
        type: 'generate_verse',
    };
};

export const currentReplyDidChange = (currentReply) => {
    return {
        type: 'current_reply_did_change',
        payload: currentReply
    };
};

export const submitReply = () => {
    return {
        type: 'submit_reply',
    };
};
