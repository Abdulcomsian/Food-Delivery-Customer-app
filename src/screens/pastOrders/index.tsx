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
  Pressable,
} from 'react-native';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';
import {Images, Colors, TextFamily} from '../../constants';
import getShadow from '../../utils/shadow';
import {navigateWithParams} from '../../navigator/navigationHelper';
import {getPriceFormat} from '../../utils/libs';
import {InitialUserInterface} from '../../constants/interfaces';
import {useSelector} from 'react-redux';
const PastOrdersScreen = ({
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
    <ScrollView
      style={styles.cont}
      contentContainerStyle={{
        width: '100%',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: Platform.OS === 'android' ? 10 : bottom + 10,
      }}>
      {[
        {
          title: 'Pizza Hut',
          price: 18,
          des: '2 Large Pizza',
          time: '23-12-2019 23:33',
        },
        {
          title: 'Pizza Hut',
          price: 18,
          des: '2 Large Pizza',
          time: '23-12-2019 23:33',
        },
        {
          title: 'Pizza Hut',
          price: 18,
          des: '2 Large Pizza',
          time: '23-12-2019 23:33',
        },
        {
          title: 'Pizza Hut',
          price: 18,
          des: '2 Large Pizza',
          time: '23-12-2019 23:33',
        },
        {
          title: 'Pizza Hut',

          price: 18,
          des: '2 Large Pizza',
          time: '23-12-2019 23:33',
        },
      ].map(({title, des, time, price}, index) => (
        <OrderBtn
          key={'_Btn' + index}
          title={title}
          des={des}
          time={time}
          price={price}
        />
      ))}
    </ScrollView>
  );
};

const OrderBtn = ({
  title = '',
  des = '',
  time = '',
  price = 0,
}: {
  title: string;
  des: string;
  time: string;
  price: number;
}) => {
  const onPress = () => navigateWithParams('orderDetail', {orderNumber: 1111});
  return (
    <View style={styles.orderBtn}>
      <Pressable onPress={onPress}>
        <Image
          source={Images.foodx}
          style={{width: 100, height: 100, borderRadius: 4, marginRight: 20}}
        />
      </Pressable>
      <View style={{width: WP(100) - 185}}>
        <Pressable onPress={onPress}>
          <View style={styles.rowify}>
            <Text style={styles.itemText} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.priceText}>£. {getPriceFormat(price)} </Text>
          </View>
          <Text style={[styles.infoText, {marginBottom: 8}]}>{des}</Text>
        </Pressable>
        <View style={styles.rowify}>
          <Pressable onPress={onPress}>
            <Text style={styles.infoText}>{time}</Text>
          </Pressable>
          <TouchableOpacity activeOpacity={0.85} style={styles.reOrderBtn}>
            <Text style={styles.reOrderText}>REORDER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  rowify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    flex: 1,
    fontSize: 24,
    fontFamily: TextFamily.ROBOTO_BLACK,
    marginBottom: 8,
  },
  image: {width: WP(50), height: WP(50), borderRadius: WP(25)},
  infoText: {
    fontSize: 15,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    color: Colors.Grey6,
  },
  reOrderText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  reOrderBtn: {
    height: 30,
    paddingHorizontal: 10,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    color: Colors.red,
    fontSize: 18,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  orderBtnText: {
    color: Colors.green,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    fontSize: 18,
  },
  orderBtn: {
    paddingRight: 15,
    paddingLeft: 20,
    height: 145,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    ...getShadow(3),
    width: WP(100) - 30,
    marginVertical: 8,
  },
  cont: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default PastOrdersScreen;
