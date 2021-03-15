/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'; 
import { StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {User_Dashboard} from './src/screens/user/dashboard'
import {CustomeHeader} from './src/components/navigation/custom_header'
import {SplashScreen} from './src/screens/splash/splash'

const App = () =>  {
  return (
    <>
      <CustomeHeader/>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor:'red'
  },
});

export default App;
