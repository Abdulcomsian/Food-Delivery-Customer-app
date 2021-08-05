/* eslint-disable react-native/no-inline-styles */
import React, {Fragment, useEffect} from 'react';
import {
  StatusBar,
  Platform,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
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
import OrderServing from '../screens/orderServing';
import ForgotPass from '../screens/forgotPassword';
import RestaurantMenu from '../screens/restaurantMenu';
import cartFilled from '../screens/cartFilledScreen';
import checkout from '../screens/checkoutScreen';
import Profile from '../screens/profile';
import EditProfile from '../screens/editProfile ';
import pastOrders from '../screens/pastOrders';
import orderDetails from '../screens/orderDetail';
import Notication from '../screens/notifications';
import PhoneVerification from '../screens/phoneVerify';
import PhoneNumber from '../screens/phoneNumber';
import MapScreen from '../screens/mapScreen';
import NewAddressScreen from '../screens/newAddressScreen';
import AllAddressScreen from '../screens/allAddressScreen';
import StoreSearchScreen from '../screens/searchPickupStore';
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
          name={'orderServing'}
          component={OrderServing}
          options={{
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerTitle: '',
            headerTitleStyle: {
              fontSize: 18,
              textAlign: 'center',
              fontFamily: TextFamily.ROBOTO_BLACK,
            },
            headerStyle: getShadow(1),
            headerTintColor: Colors.dark,
          }}
        />
        <Screen
          name={'storeSearch'}
          component={StoreSearchScreen}
          options={{
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerTitle: 'Search Pickup Store',
            headerTitleStyle: {
              fontSize: 18,
              textAlign: 'center',
              fontFamily: TextFamily.ROBOTO_BLACK,
            },
            headerStyle: {...getShadow(1)},
            headerTintColor: Colors.dark,
          }}
        />
        <Screen
          name={'profile'}
          component={Profile}
          options={({navigation, route}) => ({
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => navigation.navigate('editProfile')}
                style={{paddingHorizontal: 15}}>
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    fontFamily: TextFamily.ROBOTO_REGULAR,
                    color: Colors.red,
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
            ),
            headerBackTitleVisible: false,
            headerTitle: 'My Profile',
            headerTitleStyle: {
              fontSize: 18,
              textAlign: 'center',
              fontFamily: TextFamily.ROBOTO_BLACK,
            },
            headerStyle: {...getShadow(1)},
            headerTintColor: Colors.dark,
          })}
        />
        <Screen
          name={'editProfile'}
          component={EditProfile}
          options={{
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerTitle: 'Edit Profile',
            headerTitleStyle: {
              fontSize: 18,
              textAlign: 'center',
              fontFamily: TextFamily.ROBOTO_BLACK,
            },
            headerStyle: {...getShadow(1)},
            headerTintColor: Colors.dark,
          }}
        />
        <Screen
          name={'myOrders'}
          component={pastOrders}
          options={{
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerTitle: 'My Orders',
            headerTitleStyle: {
              fontSize: 18,
              textAlign: 'center',
              fontFamily: TextFamily.ROBOTO_BLACK,
            },
            headerStyle: {...getShadow(1)},
            headerTintColor: Colors.dark,
          }}
        />
        <Screen
          name={'orderDetail'}
          component={orderDetails}
          options={{headerShown: false}}
        />
        <Screen
          name={'phoneVerification'}
          component={PhoneVerification}
          options={{
            headerStyle: getShadow(0),
            headerBackTitleVisible: false,
            headerTintColor: Colors.dark,
            headerTitle: '',
          }}
        />
        <Screen
          name={'phoneNumber'}
          component={PhoneNumber}
          options={{
            headerStyle: getShadow(0),
            headerBackTitleVisible: false,
            headerTintColor: Colors.dark,
            headerTitle: '',
          }}
        />
        <Screen
          name={'map'}
          component={MapScreen}
          options={{
            headerShown: false,
            headerStyle: getShadow(0),
            headerBackTitleVisible: false,
            headerTintColor: Colors.dark,
            headerTitle: '',
          }}
        />
        <Screen
          name={'newAddress'}
          component={NewAddressScreen}
          options={{
            //headerShown: false,
            headerStyle: getShadow(1),
            headerBackTitleVisible: false,
            headerTintColor: Colors.dark,
            headerTitle: 'New Address',
          }}
        />
        <Screen
          name={'allAddress'}
          component={AllAddressScreen}
          options={{
            headerStyle: getShadow(1),
            headerBackTitleVisible: false,
            headerTintColor: Colors.dark,
            headerTitle: 'My Addresses',
          }}
        />
        <Screen
          name={'alerts'}
          component={Notication}
          options={{
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerTitle: 'Notifications',
            headerTitleStyle: {
              fontSize: 18,
              textAlign: 'center',
              fontFamily: TextFamily.ROBOTO_BLACK,
            },
            headerStyle: getShadow(1),
            headerTintColor: Colors.dark,
          }}
        />
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
