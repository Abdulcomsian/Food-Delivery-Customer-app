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
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';
import {Images, Colors, TextFamily} from '../../constants';
import getShadow from '../../utils/shadow';
import {InitialUserInterface} from '../../constants/interfaces';
import {useSelector} from 'react-redux';
import {navigate} from '../../navigator/navigationHelper';
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
        ].map(({title, nav}, index) => (
          <ProfileBtn key={'_Btn' + index} title={title} nav={nav} />
        ))}
      </ScrollView>
    </View>
  );
};

const ProfileBtn = ({title = '', nav}: {title: string; nav: string}) => (
  <TouchableOpacity
    style={styles.profileBtn}
    activeOpacity={0.85}
    onPress={() => {
      nav && navigate(nav);
    }}>
    <Text style={styles.profileBtnText}>{title}</Text>
    <Image
      source={Images.redRightArrow}
      style={{width: 27, height: 22, resizeMode: 'contain'}}
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
    color: Colors.green,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    fontSize: 18,
  },
  profileBtn: {
    paddingRight: 15,
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
