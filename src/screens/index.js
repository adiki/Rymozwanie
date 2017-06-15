/**
 * @flow
 */

'use strict';

import { Navigation } from 'react-native-navigation';

import Games from './Games';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('rymozwanie.Games', () => Games, store, Provider);
}