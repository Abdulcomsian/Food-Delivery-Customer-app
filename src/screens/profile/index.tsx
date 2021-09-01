/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';
import {HeaderBackButton} from '@react-navigation/stack';
import {Images, Colors, TextFamily} from '@constants';
import getShadow from '@utils/shadow';
import Actions from '@redux/actions';
import {InitialUserInterface} from '@constants/interfaces';
import {navigate} from '@navigatorHelper';
const ProfileScreen = ({
  navigation,
  route,
}: {
  navigation: object;
  route: object;
}) => {
  const {loggedIn, detail} = useSelector(
    ({USER}: {USER: InitialUserInterface}) => USER,
  );
  const dispatch = useDispatch();
  const {top, bottom}: EdgeInsets = useSafeAreaInsets();
  return (
    <View style={styles.cont}>
      <Image source={Images.avatar} style={styles.image} />
      <Text style={styles.name}>{detail.name}</Text>
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{
          width: '100%',
          paddingHorizontal: 15,
          paddingTop: 30,
          paddingBottom: Platform.OS === 'android' ? 10 : bottom + 10,
        }}>
        {[
          {title: 'My Orders', nav: 'myOrders'},
          {title: 'My Favorite', nav: 'wishlist'},
          {title: 'My Notification', nav: 'alerts'},
          {title: 'Terms & Condition', nav: ''},
          {title: 'Help', nav: ''},
          {title: 'Logout', nav: ''},
        ].map(({title, nav}, index) => (
          <ProfileBtn
            navigation={navigation}
            key={'_Btn' + index}
            title={title}
            nav={nav}
            dispatch={dispatch}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const ProfileBtn = ({
  title = '',
  nav,
  dispatch,
  navigation,
}: {
  title: string;
  nav: string;
  dispatch: Function;
  navigation: any;
}) => (
  <TouchableOpacity
    style={[
      styles.profileBtn,
      {backgroundColor: title === 'Logout' ? Colors.iosRedL : Colors.white},
    ]}
    activeOpacity={0.85}
    onPress={() => {
      if (title === 'Logout') {
        Actions.userLogout()(dispatch);
        navigation.goBack();
      } else {
        nav && navigate(nav);
      }
    }}>
    <Text
      style={[
        styles.profileBtnText,
        {color: title === 'Logout' ? Colors.white : Colors.green},
      ]}>
      {title}
    </Text>
    <HeaderBackButton
      labelVisible={false}
      style={{transform: [{rotate: '180deg'}]}}
      tintColor={title === 'Logout' ? Colors.white : Colors.red}
    />
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  image: {width: WP(50), height: WP(50), borderRadius: WP(25)},

  name: {
    marginTop: 15,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    fontSize: 17,
  },
  profileBtnText: {
    fontFamily: TextFamily.ROBOTO_REGULAR,
    fontSize: 18,
  },
  profileBtn: {
    paddingRight: 5,
    paddingLeft: 25,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    ...getShadow(3),
    width: WP(100) - 30,
    marginVertical: 8,
  },
  cont: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
});

export default ProfileScreen;
