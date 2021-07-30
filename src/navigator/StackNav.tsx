import React, {Fragment, useEffect} from 'react';
import {StatusBar, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {useSelector} from 'react-redux';
import {Colors, TextFamily} from '../constants';
import {AppStatesInterface} from '../constants/interfaces';
import {BottomSheet} from '../components';
import getShadow from '../utils/shadow';
//======================[Screens]====================================
import Home from './TabNav';
import SignUp from '../screens/signUp';
import ForgotPass from '../screens/forgotPassword';
import RestaurantMenu from '../screens/restaurantMenu';
import cartFilled from '../screens/cartFilledScreen';
import checkout from '../screens/checkoutScreen';
//===================================================================
const {Navigator, Screen} = createStackNavigator();

const Stack = () => {
  const {filterBottomSheet, loginBottomSheet} = useSelector(
    ({APP}: {APP: AppStatesInterface}) => APP,
  );
  useEffect(() => {
    Platform.OS === 'android' &&
      (StatusBar.setTranslucent(true),
      StatusBar.setBackgroundColor(Colors.transparent));
    StatusBar.setBarStyle('dark-content', true);
    SplashScreen.hide();
  }, []);
  return (
    <Fragment>
      <Navigator headerMode={'screen'}>
        <Screen name={'home'} component={Home} options={{headerShown: false}} />
        <Screen
          name={'signUp'}
          component={SignUp}
          options={{
            headerBackTitleVisible: false,
            headerTitle: '',
            headerStyle: getShadow(0),
            headerTintColor: Colors.dark,
          }}
        />
        <Screen
          name={'forgotPassword'}
          component={ForgotPass}
          options={{
            headerBackTitleVisible: false,
            headerTitle: '',
            headerStyle: getShadow(0),
            headerTintColor: Colors.dark,
          }}
        />
        <Screen
          name={'cartFilled'}
          component={cartFilled}
          options={{
            headerBackTitleVisible: false,
            headerTitle: 'My Order',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 18,
              fontFamily: TextFamily.ROBOTO_BOLD,
              color: Colors.black,
            },
            headerStyle: getShadow(1),
            headerTintColor: Colors.dark,
          }}
        />
         <Screen
          name={'checkout'}
          component={checkout}
          options={{
            headerBackTitleVisible: false,
            headerTitle: 'Checkout',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 18,
              fontFamily: TextFamily.ROBOTO_BOLD,
              color: Colors.black,
            },
            headerStyle: getShadow(1),
            headerTintColor: Colors.dark,
          }}
        />
        <Screen
          name={'restaurantMenu'}
          component={RestaurantMenu}
          options={{headerShown: false}}
        />
      </Navigator>
      <BottomSheet.BottomSheetSheetA status={filterBottomSheet} />
      <BottomSheet.BottomSheetLogin status={loginBottomSheet} />
    </Fragment>
  );
};

export default Stack;
