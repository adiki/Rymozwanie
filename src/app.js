/**
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import { registerScreens } from './screens';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import navigatorStyle from './config/navigatorStyle';

const store = configureStore();

registerScreens(store, Provider);

Navigation.startSingleScreenApp({
	screen: {
		screen: 'rymozwanie.Game',
		title: 'Rymozwanie',
		navigatorStyle
	}
});
