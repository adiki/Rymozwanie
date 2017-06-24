/**
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
	AppRegistry,
	UIManager
} from 'react-native';
import { registerScreens } from './screens';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import navigatorStyle from './config/navigatorStyle';
import Game from './screens/Game'

UIManager.setLayoutAnimationEnabledExperimental &&
	UIManager.setLayoutAnimationEnabledExperimental(true);

const store = configureStore();

const App = () => {
	return (
		<Provider store={store}>
			<Game />
		</Provider>
	);
};

export default App;