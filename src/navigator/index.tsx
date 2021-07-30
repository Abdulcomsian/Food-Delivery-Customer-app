import 'react-native-gesture-handler';
import React from 'react';
import {navigationRef} from './navigationHelper';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import Stack from './StackNav';

enableScreens(true);
const Nav = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack />
    </NavigationContainer>
  );
};

export default Nav;
