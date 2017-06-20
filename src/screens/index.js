/**
 * @flow
 */

'use strict';

import { Navigation } from 'react-native-navigation';

import Game from './Game';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('rymozwanie.Game', () => Game, store, Provider);
}