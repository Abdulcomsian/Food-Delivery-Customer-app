/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, Fragment} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {Colors, Images, TextFamily} from '@constants';
import {Modals} from '@components';
import {useSelector} from 'react-redux';
import {
  OrdersStatesInterface,
  InitialUserInterface,
} from '@constants/interfaces';
import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';
const CheckOutScreen = ({
  navigation,
  route,
}: {
  navigation: object;
  route: object;
}) => {
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
  const {top, bottom}: EdgeInsets = useSafeAreaInsets();
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <View style={styles.ScreenContain}>
      <Modals.OrderSuccessFullyReceived
        visible={visible}
        setVisiblity={setVisible}
      />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingBottom: 10,
          paddingTop: 40,
          paddingHorizontal: 15,
        }}>
        <Text style={styles.title}>DELIVERY ADDRESS</Text>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.boxBtn,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}>
          <View>
            <Text style={styles.textA}>Delivery Address</Text>
            <Text style={styles.textB}>72 Cecil Street,NORTH RYDE</Text>
          </View>
          <Image source={Images.check} style={{width: 28, height: 28}} />
        </TouchableOpacity>
        <Text style={[styles.title, {marginTop: 46}]}>PAYMENT METHOD</Text>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.boxBtn,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Image
              source={Images.visa}
              style={{
                width: 28,
                height: 28,
                marginRight: 16,
                resizeMode: 'contain',
              }}
            />
            <Text style={styles.textB}>**** **** **** 5967</Text>
          </View>
          <Image source={Images.check} style={{width: 28, height: 28}} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.boxBtn,
            {
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Image
              source={Images.money}
              style={{
                width: 28,
                height: 28,
                marginRight: 16,
                resizeMode: 'contain',
              }}
            />
            <Text style={styles.textB}>72 Cecil Street,NORTH RYDE</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
        activeOpacity={0.85}
        style={[
          {
            height: Platform.OS === 'android' ? 60 : 50 + bottom,
            paddingBottom: Platform.OS === 'android' ? 0 : bottom,
          },
          styles.bottomBtn,
        ]}>
        <Text style={styles.text2}>Payment</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  boxBtn: {
    backgroundColor: Colors.Grey0,
    height: 66,
    borderRadius: 4,
    padding: 12,
  },
  bottomBtn: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Colors.red,
  },
  textA: {
    fontSize: 14,
    color: Colors.red,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    marginBottom: 5,
  },
  textB: {
    fontSize: 17,
    color: Colors.black,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  title: {
    fontFamily: TextFamily.ROBOTO_MEDIUM,
    fontSize: 14,
    color: Colors.green,
    marginBottom: 16,
  },
  text2: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  ScreenContain: {flex: 1, backgroundColor: Colors.white},
});
export default CheckOutScreen;
