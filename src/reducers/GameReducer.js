/* @flow */

'use strict';

import {
    AsyncStorage
} from 'react-native';

import versesPool from '../../assets/text/verses.json';
import words from '../../assets/text/words.json';

const INITIAL_STATE = {
    verses: null,
    generatedIndexes: null,
    score: 0,
    versesPool,
    words,
    showNextVerse: false,
    currentReply: '',
    oldScore: 0,
    error: null
};

const saveStateToDisk = async (state) => {
    try {
        let verses = await AsyncStorage.setItem('@RymozwanieStore:verses', JSON.stringify(state.verses));
        let score = await AsyncStorage.setItem('@RymozwanieStore:score', JSON.stringify(state.score));
        let generatedIndexes = await AsyncStorage.setItem('@RymozwanieStore:generatedIndexes', JSON.stringify(state.generatedIndexes));
    } catch (error) {
        console.log(error);
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'data_fetched':
            const verses = action.verses || [];
            const score = action.score || 0;
            const generatedIndexes = action.generatedIndexes || {};

            var lastVerse = verses[verses.length - 1];

            if (!lastVerse) {
                return { ...state, verses: verses, generatedIndexes, score };    
            }

            return { ...state, verses: verses, generatedIndexes, score, showNextVerse:  !lastVerse.generated};
        case 'generate_verse':

            var lastVerse = state.verses[state.verses.length - 1];

            if (lastVerse && lastVerse.generated) {
                return state;
            }

            const newVerses = Array.from(state.verses);

            var keys = [...Array(versesPool.length).keys()];
            keys = keys.filter((value) => state.generatedIndexes[value] != true);

            if (keys.length == 0) {
                return { ...state, error: 'Brak nowych wersów do rymowania', oldScore: state.score, score: state.score };
            }
            const index = keys[Math.floor(Math.random() * keys.length)];

            const newGeneratedIndexes = { ...state.generatedIndexes };
            newGeneratedIndexes[index] = true;

            newVerses.push({ generated: true, verseIndex: index, time: new Date().getTime() })
            
            var newState = { ...state, verses: newVerses, showNextVerse: false, oldScore: state.score, score: state.score, generatedIndexes: newGeneratedIndexes };
            saveStateToDisk(newState);
            return newState
        case 'current_reply_did_change':
            return { ...state, currentReply: action.payload, error: null, oldScore: state.score, score: state.score }
        case 'submit_reply':

            if (state.currentReply == '') {
                return state;
            }

            var lastVerse = state.verses[state.verses.length - 1];

            if (!lastVerse.generated) {
                return state;
            }

            const verseFromPool = versesPool[lastVerse.verseIndex];

            const words = verseFromPool.value.split((/\s+/));
            const lastWord = words[words.length - 1];

            const replayWords = state.currentReply.trim().split((/\s+/));
            const lastReplyWord = replayWords[replayWords.length - 1].toLowerCase();

            if (lastReplyWord == lastWord) {
                return { ...state, error: 'Rymujące się słowa są identyczne' };
            }

            if (lastReplyWord.length < verseFromPool.rhymeLetters) {
                return { ...state, error: 'Końcowe słowa się nie rymują' };
            }

            const lastVerseLetters = lastWord.substring(lastWord.length - verseFromPool.rhymeLetters, lastWord.length);
            const lastReplyLetters = lastReplyWord.substring(lastReplyWord.length - verseFromPool.rhymeLetters, lastReplyWord.length);

            if (lastVerseLetters != lastReplyLetters) {
                return { ...state, error: 'Końcowe słowa się nie rymują' };
            }

            if (state.words[lastReplyWord] == undefined) {
                return { ...state, error: 'Rymującego się słowa nie ma w słowniku' };
            }

            newVerses = Array.from(state.verses);
            newVerses.push({ generated: false, value: state.currentReply.trim() })

            const seconds = (new Date().getTime() - lastVerse.time) / 1000;
            const verseScore = Math.max(0, 120 - seconds) / 120 * 50 + Math.min(replayWords.length * 10, 50);

            var newState = { ...state, verses: newVerses, currentReply: '', showNextVerse: true, oldScore: state.score, score: state.score + verseScore }
            saveStateToDisk(newState)
            return newState
        default:
            return state;
    }
};
