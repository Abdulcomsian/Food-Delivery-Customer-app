/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';
import {Colors, Images, TextFamily} from '../../constants';
const OrderServingScreen = ({
  navigation,
  route,
}: {
  navigation: object;
  route: object;
}) => {
  const {top, bottom}: EdgeInsets = useSafeAreaInsets();
  let status = 'ontheWay';
  useEffect(() => {
    navigation.setOptions({
      headerTitle: getStatus(status),
    });
  }, []);
  return (
    <View style={styles.ScreenContain}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <Image
          source={status === 'preparing' ? Images.preparing : Images.rider}
          style={{width: WP(85), height: WP(85), resizeMode: 'contain'}}
        />
        <Text style={styles.title2}>
          {status === 'preparing'
            ? 'Your Order Is Preparing'
            : 'Rider is On The Way'}
        </Text>
        <Text style={styles.text}>
          {status === 'preparing'
            ? 'Good food is always cooking! Go ahead, order some yummy items from the menu.'
            : "Your food's ready your order on the way."}
        </Text>
        <View style={styles.borderedView}>
          <Text style={styles.text2}>Expected Time : 20 Min</Text>
        </View>

        {status === 'ontheWay' && (
          <View style={styles.cont}>
            <Text style={styles.text4}>Order Detail</Text>
            <View style={styles.flexifyRow}>
              <Text style={styles.text3A}>Order Number</Text>
              <Text style={styles.text3B}>12345</Text>
            </View>
            <View style={styles.flexifyRow}>
              <Text style={styles.text3A}>Order From</Text>
              <Text style={styles.text3B}>Pasta's Dinner</Text>
            </View>
            <View style={styles.flexifyRow}>
              <Text style={styles.text3A}>Delivery Address</Text>
              <Text style={styles.text3B}>Home Address</Text>
            </View>
          </View>
        )}
      </ScrollView>
      {status === 'ontheWay' && (
        <TouchableOpacity
          onPress={() => {}}
          activeOpacity={0.85}
          style={[
            {
              height: Platform.OS === 'android' ? 60 : 50 + bottom,
              paddingBottom: Platform.OS === 'android' ? 0 : bottom,
            },
            styles.bottomBtn,
          ]}>
          <Text style={styles.text3}>Chat With Rider</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  text3A: {
    fontFamily: TextFamily.ROBOTO_MEDIUM,
    color: Colors.dark,
    fontSize: 16,
  },
  text3B: {
    fontFamily: TextFamily.ROBOTO_REGULAR,
    color: Colors.Grey7,
    fontSize: 16,
  },
  flexifyRow: {
    marginVertical: 4,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyCont: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  bottomBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Colors.red,
  },
  cont: {
    width: '100%',
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: TextFamily.ROBOTO_MEDIUM,
    fontSize: 24,
    textAlign: 'center',
    color: Colors.Grey5,
    marginBottom: 16,
  },
  title2: {
    fontFamily: TextFamily.ROBOTO_BLACK,
    fontSize: 24,
    textAlign: 'center',
    color: Colors.green,
    marginTop: 35,
    marginBottom: 16,
  },
  text: {
    fontFamily: TextFamily.ROBOTO_REGULAR,
    fontSize: 17,
    textAlign: 'center',
    color: Colors.Grey5,
  },
  borderedView: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.red,
    marginVertical: 38,
    backgroundColor: Colors.Grey00,
  },
  text2: {
    fontFamily: TextFamily.ROBOTO_MEDIUM,
    fontSize: 24,
    margin: 20,
    textAlign: 'center',
    color: Colors.red,
  },
  text3: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  text4: {
    color: Colors.green,
    fontSize: 24,
    marginBottom: 30,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  ScreenContain: {flex: 1, backgroundColor: Colors.white},
});

const getStatus = (status?: string) => {
  let text = 'My Order';
  switch (status) {
    case 'preparing':
      text = 'Order Preparing';
      break;
    case 'ontheWay':
      text = 'Track Your Order';
      break;
    default:
      text = 'My Order';
      break;
  }
  return text;
};
export default OrderServingScreen;
