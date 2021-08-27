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
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {Cards} from '@components';
import {OrdersStatesInterface} from '@constants/interfaces';
import {Colors, TextFamily, Images} from '@constants';
import {getPriceFormat} from '@utils/libs';
import getShadow from '@utils/shadow';
import ACTIONS from '@redux/actions';
const Restaurant = ({
  navigation,
  route,
}: {
  navigation: object;
  route: object;
}) => {
  const dispatch = useDispatch();
  const {cart} = useSelector(
    ({ORDER}: {ORDER: OrdersStatesInterface}) => ORDER,
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [hotelMenu, setHotelMenu] = useState<Array<any>>([]);
  const [selectedItem, setSelectedItem] = useState<object>({ff: ''});
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    setHotelMenu(menus);
    return () => {
      StatusBar.setBarStyle('dark-content');
    };
  }, []);
  const {top, bottom} = useSafeAreaInsets();

  return (
    <Fragment>
      <Cards.ChooseSubItem
        visiblity={visibility}
        cart={cart}
        setVisiblity={setVisibility}
        item={selectedItem}
      />
      <ScrollView style={styles.screenCont} bounces={false}>
        <ImageBackground
          source={Images.food}
          style={{width: WP(100), height: 340}}>
          <View style={styles.overlay} />
          <View style={[styles.ViewContentCont, {paddingTop: top}]}>
            <View style={styles.rowify}>
              <TouchableOpacity
                style={[styles.heartPos, {alignItems: 'flex-start'}]}
                activeOpacity={0.85}
                onPress={navigation.goBack}>
                <Image source={Images.leftArrow} style={styles.arrow} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.heartPos, {alignItems: 'flex-end'}]}
                activeOpacity={0.85}>
                <Image source={Images.favOff} style={styles.heart} />
              </TouchableOpacity>
            </View>
            <View style={styles.imageBottomView}>
              {/* <View
              style={[styles.redPending, {backgroundColor: Colors.green2}]}>
              <Text style={styles.tinyDetail2x}>
                Delivery:Rs.{item.delivery}
              </Text>
            </View> */}
              <View style={styles.redPending}>
                <Text style={styles.tinyDetail2x}>Free Delivery</Text>
              </View>
              <Text
                style={styles.imageMainTitle}
                numberOfLines={2}>{`Pasta's Dinner`}</Text>
              <View style={styles.rowify2}>
                <Image source={Images.location} style={styles.location} />
                <Text style={styles.address} numberOfLines={1}>
                  Murre Road, Rawalpindi
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
                  <Text style={styles.rating}>4.5</Text>
                  <Text style={styles.rater}>{`(${787} Ratings)`}</Text>
                </View>
                <View style={styles.tab}>
                  <Text style={styles.time2}>20-25 mins</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
        <CatBar
          items={hotelMenu}
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
        {hotelMenu.map(({items}, idx) => {
          return idx === selectedIndex ? (
            <View
              key={'_SelectCatView' + idx}
              style={{paddingBottom: Platform.OS === 'android' ? 10 : bottom}}>
              {items.map((item, indx) => {
                return (
                  <View
                    key={'_SelectCatMenu' + indx}
                    style={{width: WP(100), padding: 15, paddingVertical: 7}}>
                    <View
                      key={'_SelectCatMenu' + indx}
                      style={{
                        width: '100%',
                        height: 80,
                        ...getShadow(4),
                        borderRadius: 8,
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={item.image}
                          style={{width: 72, height: 51, borderRadius: 4}}
                        />
                        <Text
                          style={{
                            marginLeft: 13,
                            marginBottom: 10,
                            fontFamily: TextFamily.ROBOTO_BOLD,
                            fontSize: Platform.OS === 'android' ? 20 : 18,
                            textTransform: 'capitalize',
                          }}>
                          {item.name}
                        </Text>
                      </View>
                      <View>
                        {indx % 2 === 0 ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <TouchableOpacity
                              activeOpacity={0.85}
                              onPress={() => {
                                ACTIONS.updateCart(item, false)(dispatch);
                              }}
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: Colors.green,
                                marginRight: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  color: Colors.green,
                                  fontFamily: TextFamily.ROBOTO_REGULAR,
                                  fontSize: Platform.OS === 'android' ? 17 : 16,
                                }}>
                                -
                              </Text>
                            </TouchableOpacity>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: Colors.green,
                                fontFamily: TextFamily.ROBOTO_REGULAR,
                                fontSize: Platform.OS === 'android' ? 17 : 16,
                              }}>
                              {cart[item.id] !== undefined
                                ? cart[item.id].qty
                                : 0}
                            </Text>
                            <TouchableOpacity
                              activeOpacity={0.85}
                              onPress={() => {
                                ACTIONS.updateCart(item)(dispatch);
                              }}
                              style={{
                                marginLeft: 10,
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: Colors.green,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  textAlignVertical: 'center',
                                  color: Colors.green,

                                  fontFamily: TextFamily.ROBOTO_REGULAR,
                                  fontSize: Platform.OS === 'android' ? 17 : 16,
                                }}>
                                +
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              setVisibility(true);
                              setSelectedItem(item);
                            }}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: 24,
                              borderWidth: 1,
                              borderColor: Colors.green,
                              paddingHorizontal: 10,
                              borderRadius: 4,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                color: Colors.green,
                                fontFamily: TextFamily.ROBOTO_REGULAR,
                                fontSize: Platform.OS === 'android' ? 17 : 16,
                              }}>
                              Choose
                            </Text>
                          </TouchableOpacity>
                        )}
                        <Text
                          style={{
                            textAlign: 'center',
                            color: Colors.red,
                            fontFamily: TextFamily.ROBOTO_BOLD,
                            marginTop: 4,
                            fontSize: Platform.OS === 'android' ? 17 : 16,
                          }}>{`$${getPriceFormat(item.price)}`}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : null;
        })}
      </ScrollView>
    </Fragment>
  );
};
const CatBar = ({
  items = [],
  setSelectedIndex = () => {},
  selectedIndex = 0,
}: {
  items?: Array<any>;
  selectedIndex?: number;
  setSelectedIndex?: Function;
}) => (
  <View style={{height: 56, width: WP(100), ...getShadow(3)}}>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {items.map((item, index) => {
        return (
          <CatBtn
            item={item}
            key={'_MenuCat' + index}
            index={index}
            setSelectedIndex={setSelectedIndex}
            selectedIndex={selectedIndex}
          />
        );
      })}
    </ScrollView>
  </View>
);
const CatBtn = ({
  item = {},
  index = 0,
  setSelectedIndex = () => {},
  selectedIndex = 0,
}: {
  item: object;
  index: number;
  selectedIndex: number;
  setSelectedIndex: Function;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.catBtn}
      onPress={() => {
        setSelectedIndex(index);
      }}>
      <Text
        numberOfLines={1}
        style={[
          styles.catText,
          {
            color: index === selectedIndex ? Colors.green : Colors.dark,
          },
        ]}>
        {item.cat}
      </Text>
      {index === selectedIndex && <View style={styles.greenBar} />}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  catBtn: {
    height: 56,
    width: Platform.OS === 'android' ? 110 : 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenBar: {
    borderRadius: 2,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: Colors.green,
    height: 3,
  },
  catText: {
    textAlign: 'center',
    fontSize: Platform.OS === 'android' ? 17 : 16,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    textTransform: 'uppercase',
    width: '100%',
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
  tab: {
    ...getShadow(3),
    borderRadius: 6,
    zIndex: 3,
    alignSelf: 'flex-end',
  },
  time2: {
    fontSize: 12,
    color: Colors.GreyTransparent6,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    margin: 6,
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
  tinyDetail2x: {
    fontSize: 11,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    color: Colors.white,
  },
  rowify: {
    marginBottom: 65,
    flexDirection: 'row',
    alignItems: 'center',
    width: WP(100) - 30,
    height: 48,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  ViewContentCont: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 10,
  },
  redPending: {
    height: 20,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 90,
    borderRadius: 3,
    backgroundColor: Colors.red,
  },
  screenCont: {flex: 1, backgroundColor: Colors.white},
  menuListsCont: {width: WP(100), backgroundColor: Colors.yellow, height: 56},
});
const menus = [
  {
    id: 1,
    cat: 'Burgers',
    items: [
      {name: 'tingA', price: 2, image: Images.foodx, id: 1},
      {name: 'tingB', price: 8, image: Images.foodx, id: 2},
      {name: 'tingC', price: 9, image: Images.foodx, id: 3},
      {name: 'tingD', price: 10, image: Images.foodx, id: 4},
      {name: 'tingE', price: 1, image: Images.foodx, id: 5},
      {name: 'tingF', price: 5, image: Images.foodx, id: 6},
      {name: 'tingI', price: 11, image: Images.foodx, id: 7},
      {name: 'tingJ', price: 15, image: Images.foodx, id: 8},
      {name: 'tingK', price: 0.5, image: Images.foodx, id: 9},
    ],
  },
  {
    cat: 'Pizza',
    id: 2,
    items: [
      {name: 'tingXA', price: 2, image: Images.foodx, id: 11},
      {name: 'tingXB', price: 8, image: Images.foodx, id: 12},
      {name: 'tingXC', price: 9, image: Images.foodx, id: 13},
      {name: 'tingXD', price: 10, image: Images.foodx, id: 14},
      {name: 'tingXE', price: 1, image: Images.foodx, id: 15},
      {name: 'tingXF', price: 5, image: Images.foodx, id: 16},
      {name: 'tingXI', price: 11, image: Images.foodx, id: 17},
      {name: 'tingXJ', price: 15, image: Images.foodx, id: 18},
      {name: 'tingXK', price: 0.5, image: Images.foodx, id: 19},
    ],
  },
  {cat: 'Pasta', id: 3, items: []},
  {cat: 'BBQ', id: 4, items: []},
  {cat: 'Beverage', id: 5, items: []},
  {cat: 'Desserts', id: 6, items: []},
  {cat: 'Others', id: 7, items: []},
];
export default Restaurant;
