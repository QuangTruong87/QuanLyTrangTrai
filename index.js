/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MainScreen from './src/screens/main/index.js';

AppRegistry.registerComponent(appName, () => MainScreen);
