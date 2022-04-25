/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';
import 'react-native-gesture-handler';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import Router from './src/router';
import AddressScreen from './src/screens/AddressScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductScreen from './src/screens/ProductScreen';
import ShoppingCartScreen from './src/screens/ShoppingCartScreen';

import { Amplify } from 'aws-amplify'
import {withAuthenticator} from 'aws-amplify-react-native'

import awsconfig from './src/aws-exports'
Amplify.configure(awsconfig)

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  return (
    <View style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Router/>
    </View>
  );
};

export default withAuthenticator(App);
