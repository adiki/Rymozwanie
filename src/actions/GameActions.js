/* @flow */

'use strict';

import {
    AsyncStorage
} from 'react-native';

export const fetchStoredVerses = () => {

    return async (dispatch) => {
        try {
            let verses = await AsyncStorage.getItem('@RymozwanieStore:verses');
            dispatch({ type: 'verses_fetched', payload: verses });
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
