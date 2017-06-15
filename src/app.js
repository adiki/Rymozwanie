/**
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import { registerScreens } from './screens';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import colors from './config/colors';
import fonts from './config/fonts';

const store = configureStore();

registerScreens(store, Provider);

const navigatorStyle = {
	navBarTranslucent: true,
	drawUnderNavBar: true,
    drawUnderTabBar: true,
    navBarBackgroundColor: 'white',
	navBarTextFontFamily: fonts.junegullRegular,
	navBarTextColor: colors.orange,
	navBarTextFontSize: 23
};

Navigation.startSingleScreenApp({
	screen: {
		screen: 'rymozwanie.Games',
		title: 'Rymozwanie',
		navigatorStyle
	}
});
