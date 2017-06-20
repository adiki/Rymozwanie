/* @flow */

'use strict';

const INITIAL_STATE = {
    verses: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'verses_fetched':
            const verses = action.payload || [];
            return  { ...state, verses: verses };
        default:
            return state;
    }
};
