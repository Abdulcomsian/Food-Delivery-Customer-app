/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Platform,
  FlatList,
  Image,
  View,
  Text,
} from 'react-native';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';
import {Images, Colors, TextFamily} from '@constants';
import getShadow from '@utils/shadow';
import {navigateWithParams} from '@navigatorHelper';
import {getPriceFormat, getFormattedDate} from '@utils/libs';
import APIs from '@utils/APIs';
import {InitialUserInterface, order} from '@constants/interfaces';
import {useSelector} from 'react-redux';
const PastOrdersScreen = () => {
  const {loggedIn, detail} = useSelector(
    ({USER}: {USER: InitialUserInterface}) => USER,
  );
  const [orders, setOrders] = useState<Array<order>>([]);
  const [page, setPage] = useState<number>(1);
  const [isMore, setIsMore] = useState<boolean>(true);
  const [fetching, setFetching] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {bottom}: EdgeInsets = useSafeAreaInsets();

  const FirstTimeLoad = (refrshing: boolean = false) => {
    refrshing && (setFetching(true), setRefreshing(true));
    APIs.getOrderList({uid: 1})
      .then(r => {
        if (Array.isArray(r)) {
          setOrders(r);
          setIsMore(r.length === 20);
          setPage(2);
        } else if (refrshing) {
          setIsMore(false);
          setPage(1);
        }
      })
      .finally(() => {
        setFetching(false);
        refrshing && setRefreshing(false);
      });
  };
  const appendMore = () => {
    if (isMore && !fetching) {
      setFetching(true);
      APIs.getOrderList({uid: 1, page})
        .then(r => {
          if (Array.isArray(r)) {
            r.length > 0 && setOrders([...orders, ...r]);
            setIsMore(r.length === 20);
            setPage(page + 1);
          }
        })
        .finally(() => {
          setFetching(false);
        });
    }
  };
  useEffect(FirstTimeLoad, []);
  return (
    <FlatList
      style={styles.cont}
      contentContainerStyle={{
        width: '100%',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: Platform.OS === 'android' ? 10 : bottom + 10,
      }}
      refreshing={refreshing}
      onEndReachedThreshold={0.7}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item: order) => '_Order' + item.id + item.orderNumber}
      data={orders}
      renderItem={({item}) => {
        return <OrderBtn {...item} />;
      }}
      onEndReached={appendMore}
      onRefresh={() => FirstTimeLoad(true)}
      ListFooterComponent={() =>
        fetching && !refreshing ? (
          <ActivityIndicator style={{alignSelf: 'center'}} />
        ) : null
      }
    />
  );
};

const OrderBtn = (item: order) => {
  const onPress = () => navigateWithParams('orderDetail', {orderItem: item});
  const totalPrice =
    item.deliveryCharges +
    item.items.reduce((pre, {qty, price: prize}) => {
      return prize * qty + pre;
    }, 0);
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
              {item?.foodProvider}
            </Text>
            <Text style={styles.priceText}>
              £. {getPriceFormat(totalPrice)}
            </Text>
          </View>
          <Text
            style={[
              styles.infoText,
              {marginBottom: 8},
            ]}>{`${item.items[0].qty} ${item.items[0].name}`}</Text>
        </Pressable>
        <View style={styles.rowify}>
          <Pressable onPress={onPress}>
            <Text style={styles.infoText}>
              {getFormattedDate(item?.created_at, true)}
            </Text>
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
