/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Image, Text, ScrollView} from 'react-native';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';
import {Headers} from '../../components';
import {Colors, Images, TextFamily} from '../../constants';
const CartScreen = ({
  navigation,
  route,
}: {
  navigation: object;
  route: object;
}) => {
  const {top, bottom}: EdgeInsets = useSafeAreaInsets();
  let status = 'empty';
  return (
    <View style={styles.ScreenContain}>
      <Headers.HeaderB title={getStatus(status)} />
      {status === 'empty' ? (
        <View style={[styles.emptyCont, {paddingBottom: bottom + 100}]}>
          <Image
            source={Images.basket}
            style={{width: WP(70), height: WP(70)}}
          />
          <Text style={styles.title}>Cart Empty</Text>
          <Text style={styles.text}>
            Good food is always cooking! Go ahead, order some yummy items from
            the menu.
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: bottom + 100,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <Image
            source={Images.preparing}
            style={{width: WP(85), height: WP(85), resizeMode: 'contain'}}
          />
          <Text style={styles.title2}>Your Order Is Preparing</Text>
          <Text style={styles.text}>
            Good food is always cooking! Go ahead, order some yummy items from
            the menu.
          </Text>
          <View style={styles.borderedView}>
            <Text style={styles.text2}>Expected Time : 20 Min</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  emptyCont: {
    marginTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
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
    marginTop: 38,
    backgroundColor: Colors.Grey00,
  },
  text2: {
    fontFamily: TextFamily.ROBOTO_MEDIUM,
    fontSize: 24,
    margin: 20,
    textAlign: 'center',
    color: Colors.red,
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
export default CartScreen;
