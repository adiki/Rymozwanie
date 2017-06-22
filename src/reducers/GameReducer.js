/* @flow */

'use strict';

import versesPool from '../../assets/text/verses.json';

const INITIAL_STATE = {
    verses: null,
    versesPool,
    currentReply: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'verses_fetched':
            const verses = action.payload || [];
            return { ...state, verses: verses };
        case 'generate_verse':
            const newVerses = Array.from(state.verses);
            newVerses.unshift({ generated: true, verseIndex: 0 })
            return { ...state, verses: newVerses };
        case 'current_reply_did_change':
            return { ...state, currentReply: action.payload }
        case 'submit_reply':

            if (state.currentReply == '') {
                return state;
            }

            newVerses = Array.from(state.verses);
            newVerses.unshift({ generated: false, value: state.currentReply })
            newVerses.unshift({ generated: true, verseIndex: 0 })
            return { ...state, verses: newVerses, currentReply: '' }
        default:
            return state;
    }
};
