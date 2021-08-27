/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, Fragment} from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {Buttons} from '@components';
import {Colors, TextFamily, Images} from '@constants';
import {order} from '@constants/interfaces';
import {getPriceFormat} from '@utils/libs';
import getShadow from '@utils/shadow';
const OrderDetail = ({
  navigation,
  route,
}: {
  navigation: object;
  route: object;
}) => {
  const dispatch = useDispatch();
  const {orderItem}: {orderItem: order} = route.params;
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    return () => {
      StatusBar.setBarStyle('dark-content');
    };
  }, []);
  const {top, bottom} = useSafeAreaInsets();
  const subTotal = orderItem.items.reduce((pre, {qty, price: prize}) => {
    return prize * qty + pre;
  }, 0);
  return (
    <Fragment>
      <View style={styles.screenCont}>
        <ImageBackground
          source={{uri: orderItem.Avatar}}
          style={{width: WP(100), height: 340}}>
          <View style={styles.overlay} />
          <View style={{paddingTop: top}}>
            <View style={styles.rowify}>
              <TouchableOpacity
                style={[styles.heartPos, {alignItems: 'flex-start'}]}
                activeOpacity={0.85}
                onPress={navigation.goBack}>
                <Image source={Images.leftArrow} style={styles.arrow} />
              </TouchableOpacity>
            </View>
            <View style={styles.imageBottomView}>
              <Text style={styles.imageMainTitle} numberOfLines={2}>
                {orderItem.foodProvider}
              </Text>
              <View style={styles.rowify2}>
                <Image source={Images.location} style={styles.location} />
                <Text style={styles.address} numberOfLines={1}>
                  {orderItem.foodProviderAddress}
                </Text>
              </View>
              <View
                style={[
                  styles.rowify2,
                  {
                    paddingLeft: 15,
                    marginTop: 16,
                    justifyContent: 'space-between',
                  },
                ]}>
                <View style={[styles.rowify2, {paddingLeft: 0}]}>
                  <Image source={Images.star} style={styles.star} />
                  <Text style={styles.rating}>{orderItem.reviewStars}</Text>
                  <Text
                    style={
                      styles.rater
                    }>{`(${orderItem.ratings} Ratings)`}</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
        <ScrollView
          style={styles.absolute}
          contentContainerStyle={{
            padding: 15,
            width: '100%',
          }}>
          <View
            style={{
              padding: 15,
              width: '100%',
              backgroundColor: Colors.white,
              borderRadius: 8,
              ...getShadow(4),
              marginBottom: 30,
            }}>
            <Text
              style={{
                fontSize: 28,
                fontFamily: TextFamily.ROBOTO_REGULAR,
                color: Colors.green,
                marginBottom: 10,
              }}>
              Delivered to
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: TextFamily.ROBOTO_REGULAR,
                color: Colors.dark,
                marginBottom: 8,
              }}>
              Order number:#{orderItem.orderNumber}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: TextFamily.ROBOTO_REGULAR,
                color: Colors.dark,
              }}>
              {orderItem.Address}
            </Text>
          </View>
          <View
            style={{
              padding: 15,
              width: '100%',
              backgroundColor: Colors.white,
              borderRadius: 8,
              ...getShadow(4),
            }}>
            {orderItem.items.map((item, index) => (
              <View
                key={'_' + item.name + '_' + index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: TextFamily.ROBOTO_REGULAR,
                    marginBottom: 10,
                    color: Colors.dark,
                  }}>
                  {item.qty} x {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: TextFamily.ROBOTO_REGULAR,
                    color: Colors.dark,
                    marginBottom: 8,
                  }}>
                  $. {getPriceFormat(item.price)}
                </Text>
              </View>
            ))}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                borderTopWidth: 1,
                borderColor: Colors.Grey4,
                paddingTop: 20,
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: TextFamily.ROBOTO_REGULAR,
                  marginBottom: 10,
                  color: Colors.dark,
                }}>
                Subtotal
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: TextFamily.ROBOTO_REGULAR,
                  color: Colors.dark,
                  marginBottom: 8,
                }}>
                $. {getPriceFormat(subTotal)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: TextFamily.ROBOTO_REGULAR,
                  marginBottom: 10,
                  color: Colors.dark,
                }}>
                Delivery Fee
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: TextFamily.ROBOTO_REGULAR,
                  color: Colors.dark,
                  marginBottom: 8,
                }}>
                $. {getPriceFormat(orderItem.deliveryCharges)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                borderTopWidth: 1,
                borderColor: Colors.Grey4,
                paddingTop: 20,
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: TextFamily.ROBOTO_REGULAR,
                  marginBottom: 10,
                  color: Colors.dark,
                }}>
                Total (inc. VAT)
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: TextFamily.ROBOTO_REGULAR,
                  color: Colors.dark,
                  marginBottom: 8,
                }}>
                $. {getPriceFormat(subTotal + orderItem.deliveryCharges)}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <Buttons.ButtonA
        title={'Reorder'}
        onPress={() => {}}
        style={{
          borderRadius: 0,
          height: bottom ? 55 + bottom : 64,
          paddingBottom: bottom,
          backgroundColor: Colors.red,
        }}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 270,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
  address: {
    fontSize: 15,
    color: Colors.Grey3,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  rater: {
    fontSize: 16,
    marginLeft: 10,
    color: Colors.Grey4,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  rating: {
    fontSize: 17,
    color: Colors.white,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.black,
    opacity: 0.3,
  },
  imageMainTitle: {
    paddingHorizontal: 15,
    marginVertical: 10,
    color: Colors.white,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    fontSize: 30,
  },
  rowify2: {
    paddingHorizontal: 15,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBottomView: {width: WP(100), alignSelf: 'center'},
  arrow: {width: 20, height: 20, resizeMode: 'contain'},
  heart: {width: 25, height: 25, resizeMode: 'contain'},
  location: {width: 23, height: 23, resizeMode: 'contain', marginRight: 5},
  star: {width: 16, height: 16, resizeMode: 'contain', marginRight: 7},
  heartPos: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rowify: {
    marginBottom: 45,
    flexDirection: 'row',
    alignItems: 'center',
    width: WP(100) - 30,
    height: 48,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  screenCont: {flex: 1, backgroundColor: Colors.white},
});

export default OrderDetail;
