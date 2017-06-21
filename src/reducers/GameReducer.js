/* @flow */

'use strict';

import versesPool from '../../assets/text/verses.json';

const INITIAL_STATE = {
    verses: null,
    versesPool
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'verses_fetched':
            const verses = action.payload || [];
            return { ...state, verses: verses };
        case 'generate_verse':
            const newVerses = Array.from(state.verses);
            newVerses.push({ generated: true, verseIndex: 0 })
            return { ...state, verses: newVerses };
        default:
            return state;
    }
};
