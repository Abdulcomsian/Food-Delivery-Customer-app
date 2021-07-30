/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React, {Fragment} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import getShadow from '../utils/shadow';
import {objectIsEmpty} from '../utils/libs';
import Actions from '../redux/actions';
import {Colors, Images} from '../constants';
import {Badge} from '../components';
import {
  OrdersStatesInterface,
  InitialUserInterface,
} from '../constants/interfaces';
import {navigate} from '../navigator/navigationHelper';
//---------------------------------------------------------------------
import Home from '../screens/home';
import Wishlist from '../screens/favourite';
import Cart from '../screens/cartScreen';
import Notification from '../screens/home';
import Account from '../screens/home';
//---------------------------------------------------------------------
const {Navigator, Screen} = createBottomTabNavigator();

const BottomTabs = () => {
  const {bottom} = useSafeAreaInsets();
  return (
    <Navigator tabBar={props => <TabBar {...props} bottom={bottom} />}>
      <Screen name="homeTab" component={Home} />
      <Screen name="wishlist" component={Wishlist} />
      <Screen name="cart" component={Cart} />
      <Screen name="notification" component={Notification} />
      <Screen name="account" component={Account} />
    </Navigator>
  );
};
const TabBar = ({
  state,
  descriptors,
  navigation,
  bottom = 0,
}: {
  bottom?: number;
  navigation: object;
  descriptors: object;
  state: object;
}) => {
  const dispatch = useDispatch();
  const {loggedIn, cart} = useSelector(
    ({
      USER,
      ORDER,
    }: {
      USER: InitialUserInterface;
      ORDER: OrdersStatesInterface;
    }) => ({
      ...USER,
      ...ORDER,
    }),
  );
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  const cartArr = Object.entries(cart);
  return (
    <Fragment>
      <TouchableOpacity
        activeOpacity={0.95}
        accessibilityRole="button"
        onPress={() => {
          const isFocused = state.index === 2;
          const event = navigation.emit({
            type: 'tabPress',
            target: state.routes[2].key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            objectIsEmpty(cart)
              ? navigation.navigate('cart')
              : navigate('cartFilled');
          }
        }}
        onLongPress={() => {
          navigation.emit({
            type: 'tabLongPress',
            target: state.routes[2].key,
          });
        }}
        style={{
          position: 'absolute',
          bottom: bottom + 32,
          right: wp(50) - 32,
          width: 64,
          height: 64,
          borderRadius: 32,
          ...getShadow(5),
          backgroundColor: Colors.red,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 200,
        }}>
        <Badge count={cartArr.length} style={{right: 10, top: 10}} />
        <Image
          style={{width: 30, height: 30, resizeMode: 'contain'}}
          source={Images.cart}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          height: 63 + bottom,
          paddingBottom: bottom,
          width: wp(100),
          alignSelf: 'center',
          position: 'absolute',
          bottom: 0,
          zIndex: 199,
          ...getShadow(3),
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              if (route.name === 'notification' || route.name === 'account') {
                loggedIn
                  ? navigation.navigate(route.name)
                  : Actions.toggleBottomLogin()(dispatch);
              } else navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          const icon =
            route.name === 'homeTab'
              ? Images[`home${isFocused ? 'Tabbed' : ''}`]
              : route.name === 'wishlist'
              ? Images[`favorite${isFocused ? 'Tabbed' : ''}`]
              : route.name === 'notification'
              ? Images[`notification${isFocused ? 'Tabbed' : ''}`]
              : Images[`account${isFocused ? 'Tabbed' : ''}`];

          return index !== 2 ? (
            <TouchableOpacity
              activeOpacity={1}
              key={'_Tab' + index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                //...getShadow(4),
                flex: index === 2 ? 1.5 : 1,
                justifyContent: 'center',
                alignItems: 'center',
                //backgroundColor:index === 2 ? Colors.transparent : Colors.white,
                backgroundColor: Colors.white,
                borderBottomLeftRadius: index === 0 ? 20 : 0,
                borderTopLeftRadius: index === 0 ? 20 : 0,
                borderBottomRightRadius: index === 4 ? 20 : 0,
                borderTopRightRadius: index === 4 ? 20 : 0,
              }}>
              {index === 3 && (
                <Badge count={9} style={{right: '26%', top: 15}} />
              )}
              <Image
                style={{width: 23, height: 23, resizeMode: 'contain'}}
                source={icon}
              />
            </TouchableOpacity>
          ) : (
            <View
              key={'_Tab' + index}
              style={{
                //...getShadow(4),
                flex: 1.5,
                justifyContent: 'center',
                alignItems: 'center',
                //backgroundColor:index === 2 ? Colors.transparent : Colors.white,
                // backgroundColor: Colors.white,
              }}
            />
          );
        })}
      </View>
    </Fragment>
  );
};
export default BottomTabs;
