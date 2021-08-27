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
import getShadow from '@utils/shadow';
import {getPriceFormat} from '@utils/libs';
import {useSelector} from 'react-redux';
import {
  OrdersStatesInterface,
  InitialUserInterface,
} from '@constants/interfaces';
import {Cards, Headers, BottomSheet} from '@components';
import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';
const CARTFilledScreen = ({
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
  const cartArr = Object.entries(cart);
  console.log('QTY', cartArr);
  const itemTotal = cartArr.reduce(
    (pre, cur) => pre + cur[1].price * cur[1].qty,
    0,
  );
  return (
    <View style={styles.ScreenContain}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}>
        <View style={styles.box}>
          <View style={styles.topBoxView}>
            <Text style={styles.hotelTitle}>Pasta's Dinner</Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.location}
                  style={{width: 23, height: 23, marginRight: 7}}
                />
                <Text
                  style={{
                    fontSize: 15,
                    marginRight: 7,
                    color: Colors.Grey6,
                    fontFamily: TextFamily.ROBOTO_REGULAR,
                  }}>
                  72 Cecil Street,NORTH RYDE
                </Text>
              </View>
              <View
                style={{
                  padding: 5,
                  paddingHorizontal: 8,
                  backgroundColor: Colors.red,
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.white,
                    fontFamily: TextFamily.ROBOTO_REGULAR,
                  }}>
                  Free Delivery
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.BottomBoxView}>
            {cartArr.map((item, index) => {
              const {name, price, qty, id} = item[1];
              return (
                <View
                  key={'_' + id}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: Colors.Grey3,
                    paddingVertical: 16,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: TextFamily.ROBOTO_MEDIUM,
                    }}>
                    {name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 3,
                    }}>
                    <Text
                      style={{
                        color: Colors.Grey7,
                        fontSize: 14,
                        fontFamily: TextFamily.ROBOTO_REGULAR,
                      }}>
                      {name} x{qty}
                    </Text>
                    <Text
                      style={{
                        color: Colors.Grey7,
                        fontSize: 14,
                        fontFamily: TextFamily.ROBOTO_REGULAR,
                      }}>{`£ ${getPriceFormat(price)}`}</Text>
                  </View>
                </View>
              );
            })}
            <View
              style={{
                borderColor: Colors.Grey4,
                paddingVertical: 16,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: TextFamily.ROBOTO_LIGHT,
                  color: Colors.red,
                }}>
                Add more items +
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[styles.box, {backgroundColor: Colors.white, marginTop: 16}]}>
          <View style={styles.topBoxView}>
            <Text style={styles.DeliverToTitle}>Deliver to</Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  marginRight: 7,
                  color: Colors.Grey7,
                  fontFamily: TextFamily.ROBOTO_REGULAR,
                }}>
                72 Cecil Street,NORTH RYDE
              </Text>
            </View>
            <View
              style={{
                borderColor: Colors.Grey4,
                paddingVertical: 16,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: TextFamily.ROBOTO_LIGHT,
                  color: Colors.red,
                  textDecorationLine: 'underline',
                }}>
                Change Address
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: Colors.green,
          width: '100%',
          padding: 15,
          paddingBottom: (Platform.OS === 'ios' ? bottom : 0) + 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}>
        <View
          style={{
            width: '100%',
            paddingVertical: 7,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.text2}>Sub total</Text>
          <Text style={styles.text2}>£. {getPriceFormat(itemTotal)}</Text>
        </View>
        <View
          style={{
            width: '100%',
            paddingVertical: 7,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.text2}>Tax & Fees</Text>
          <Text style={styles.text2}>£. {getPriceFormat(0)}</Text>
        </View>
        <View
          style={{
            width: '100%',
            paddingVertical: 7,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.text2}>Delivery</Text>
          <Text style={styles.text2}>Free</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('checkout');
          }}
          activeOpacity={0.85}
          style={{
            marginTop: 10,
            width: '100%',
            height: Platform.OS === 'android' ? 48 : 44,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            backgroundColor: Colors.red,
            borderRadius: 8,
          }}>
          <Text style={styles.text2}>Proceed Your Order</Text>
          <Text style={styles.text2}>£. {getPriceFormat(itemTotal)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  topBoxView: {paddingVertical: 16, paddingHorizontal: 15},
  BottomBoxView: {
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  hotelTitle: {fontSize: 24, fontFamily: TextFamily.ROBOTO_BLACK},
  DeliverToTitle: {
    fontSize: 22,
    fontFamily: TextFamily.ROBOTO_MEDIUM,
    color: Colors.green,
  },
  box: {
    ...getShadow(5),
    borderRadius: 10,
    backgroundColor: Colors.Grey00,
  },
  emptyCont: {
    marginTop: 10,
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
  text: {
    fontFamily: TextFamily.ROBOTO_REGULAR,
    fontSize: 17,
    textAlign: 'center',
    color: Colors.Grey5,
  },
  text2: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  ScreenContain: {flex: 1, backgroundColor: Colors.white},
});
export default CARTFilledScreen;
