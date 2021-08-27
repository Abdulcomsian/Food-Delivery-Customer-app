/* eslint-disable react-native/no-inline-styles */
import {useEffect} from 'react';
import React, {Fragment, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  ImageBackground,
  Platform,
  TextInput,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Button from './buttons';
import getShadow from '@utils/shadow';
import {getPriceFormat, objectIsEmpty} from '@utils/libs';
import {navigate, navigationRef, navigateWithParams} from '@navigatorHelper';
import Actions from '@redux/actions';
import {Headers} from '@components';
import {Colors, Images, TextFamily} from '@constants';

const LocationEnabler = ({
  visible = false,
  setVisible = () => {},
}: {
  visible?: boolean;
  setVisible?: Function;
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType={'fade'}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <View style={cardStyles.container}>
        <View style={cardStyles.card}>
          <Image
            source={Images.enableLocation}
            style={cardStyles.locatorImage}
          />
          <Text style={[cardStyles.common, cardStyles.mainTitle]}>
            Enable Your Location
          </Text>
          <Text style={[cardStyles.common, cardStyles.subTitle]}>
            Please allow to use your location to show nearby restaurant on the
            map.
          </Text>
          <Button.ButtonA
            title={'Enable Location'}
            style={cardStyles.Btn}
            onPress={() => {
              setVisible(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
const PasswordReset = ({
  visible = false,
  setVisible = () => {},
}: {
  visible?: boolean;
  setVisible?: Function;
}) => {
  const dispatch = useDispatch();
  return (
    <Modal
      transparent
      visible={visible}
      animationType={'fade'}
      onRequestClose={() => false}>
      <View style={cardStyles.container}>
        <View style={cardStyles.card}>
          <Image
            source={Images.passwordReset}
            style={cardStyles.locatorImage}
          />
          <Text style={[cardStyles.common, cardStyles.mainTitle]}>
            Your password has been reset
          </Text>
          <Text style={[cardStyles.common, cardStyles.subTitle]}>
            You'll shortly receive an email with a code to setup a new password.
          </Text>
          <Button.ButtonA
            title={'Login'}
            style={cardStyles.Btn}
            textStyle={{}}
            onPress={() => {
              setVisible(false);
              setTimeout(() => {
                navigationRef.current.goBack();
                Actions.toggleBottomLogin()(dispatch);
              }, 700);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
const FoodCard1 = () => {
  return (
    <View style={foodStyles.PortraitViewA}>
      <TouchableOpacity style={foodStyles.heartPos} activeOpacity={0.85}>
        <Image source={Images.favOff} style={foodStyles.heart} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => {
          navigateWithParams('restaurantMenu', {restaurantId: 123});
        }}>
        <ImageBackground source={Images.food} style={foodStyles.PortraitImageA}>
          <View style={foodStyles.overlay} />
        </ImageBackground>
        <Text style={foodStyles.FoodTitleB} numberOfLines={1}>
          Burger
        </Text>
        <Text style={foodStyles.FoodTitleC} numberOfLines={1}>
          72 Cecil Street,NORTH RYDE
        </Text>
        <View style={[foodStyles.rowify, {justifyContent: 'space-between'}]}>
          <Image source={Images.star} style={foodStyles.star} />
          <Text style={foodStyles.tinyDetail1}>4.6</Text>
          <Text style={foodStyles.tinyDetail2}>(128 ratings)</Text>
          <View style={foodStyles.redPending}>
            <Text style={foodStyles.tinyDetail3}>Free Delivery</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const FoodCard2 = () => {
  return (
    <TouchableOpacity activeOpacity={0.85} style={foodStyles.PortraitViewB}>
      <Image source={Images.food} style={foodStyles.PortraitImageB} />
      <View style={foodStyles.tab}>
        <Text style={foodStyles.time}>20-25 mins</Text>
      </View>
      <Text style={foodStyles.FoodTitleB} numberOfLines={1}>
        Burger
      </Text>
      <Text style={foodStyles.FoodTitleC} numberOfLines={1}>
        72 Cecil Street,NORTH RYDE
      </Text>
    </TouchableOpacity>
  );
};
const ChooseSubItem = ({
  visiblity = false,
  setVisiblity = () => {},
  item = {},
  cart = {},
}: {
  visiblity?: boolean;
  setVisiblity?: Function;
  item?: object;
  cart?: object;
}) => {
  const {bottom} = useSafeAreaInsets();
  const [Selected, setSelected] = useState(0);
  const [qty, setQty] = useState(0);
  const qtyManipulate = (isAdd = true) => {
    isAdd ? setQty(qty + 1) : qty > 0 && setQty(qty - 1);
  };
  const initilize = () => {
    setSelected(0);
    setQty(0);
  };
  useEffect(() => {
    visiblity && initilize();
  }, [visiblity]);
  return (
    <Modal
      //presentationStyle="fullScreen"
      visible={visiblity}
      onRequestClose={() => {
        setVisiblity(false);
        return true;
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}>
        <Headers.HeaderB
          title={'Choose Your Order'}
          back={true}
          onBackPress={() => {
            setVisiblity(false);
          }}
        />
        {!objectIsEmpty(item) && (
          <Fragment>
            <View style={{flex: 1, paddingHorizontal: 15}}>
              <View
                style={{
                  flex: 1,
                  ...getShadow(3),
                  marginTop: 10,
                  borderRadius: 8,
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 60,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    backgroundColor: Colors.Grey1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                  }}>
                  <Text
                    style={{fontSize: 24, fontFamily: TextFamily.ROBOTO_BLACK}}>
                    Chiken Pizza
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: TextFamily.ROBOTO_BOLD,
                      color: Colors.red,
                    }}>
                    £. {getPriceFormat(18)}
                  </Text>
                </View>
                <ScrollView
                  style={{flex: 1}}
                  contentContainerStyle={{
                    paddingHorizontal: 10,
                    width: '100%',
                  }}>
                  {[
                    {name: 'small', price: 6},
                    {name: 'medium', price: 9},
                    {name: 'large', price: 12},
                  ].map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => setSelected(index)}
                        activeOpacity={0.85}
                        key={'_item' + index}
                        style={{
                          width: '100%',
                          height: 60,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderBottomWidth: 1,
                          borderBottomColor: Colors.Grey2,
                        }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <Selector selected={index === Selected} />
                          <Text
                            numberOfLines={1}
                            style={{
                              flex: 1,
                              fontSize: 16,
                              fontFamily: TextFamily.ROBOTO_MEDIUM,
                              textTransform: 'capitalize',
                              marginLeft: 8,
                            }}>
                            {item.name}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: TextFamily.ROBOTO_MEDIUM,
                            color: Colors.Grey6,
                            marginLeft: 10,
                          }}>
                          £.{getPriceFormat(item.price)}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                  <TouchableOpacity
                    onPress={() => {}}
                    activeOpacity={0.85}
                    style={{
                      width: '100%',
                      height: 60,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottomWidth: 1,
                      borderBottomColor: Colors.Grey2,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: TextFamily.ROBOTO_REGULAR,
                          color: Colors.red,
                        }}>
                        Add extra cheese +
                      </Text>
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>
              {/* <Text
                style={{
                  marginBottom: 14,
                  ,
                  fontSize: 16,
                  fontFamily: TextFamily.ROBOTO_REGULAR,
                }}>
                Add Note
              </Text> */}
              <TextInput
                placeholder={'Add Note'}
                placeholderTextColor={Colors.Grey6}
                style={{
                  width: '100%',
                  height: 30 * 5,
                  borderRadius: 8,
                  borderColor: Colors.dark,
                  borderWidth: 1,
                  padding: 10,
                  marginTop: 24,
                  marginBottom: 24,
                }}
                numberOfLines={5}
              />
            </View>
            <View
              style={[
                {
                  height: Platform.OS === 'android' ? 88 : bottom + 88,
                  paddingBottom: bottom,
                },
                ChooseOrder.bottomPart,
              ]}>
              <View style={ChooseOrder.rightPart}>
                <TouchableOpacity
                  style={ChooseOrder.sqBtn}
                  onPress={() => qtyManipulate(false)}>
                  <Text style={ChooseOrder.sqBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={ChooseOrder.count}>{qty}</Text>
                <TouchableOpacity
                  style={ChooseOrder.sqBtn}
                  onPress={qtyManipulate}>
                  <Text style={ChooseOrder.sqBtnText}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={ChooseOrder.recBtn}>
                <Text style={ChooseOrder.recBtnText}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          </Fragment>
        )}
      </View>
    </Modal>
  );
};
const Selector = ({selected = false}: {selected?: boolean}) => (
  <View
    style={{
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 3,
      borderColor: Colors.Grey3,
      backgroundColor: selected ? Colors.red : Colors.white,
    }}
  />
);
export default {
  LocationEnabler,
  PasswordReset,
  FoodCard1,
  ChooseSubItem,
  FoodCard2,
};

//-----------------------------------------------
const cardStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.transparentBlack,
  },
  common: {
    marginVertical: 15,
  },
  Btn: {marginTop: 20, backgroundColor: Colors.red},
  mainTitle: {
    color: Colors.green,
    fontSize: 24,
    textAlign: 'center',
    fontFamily: TextFamily.ROBOTO_BLACK,
  },
  subTitle: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: TextFamily.ROBOTO_LIGHT,
  },
  card: {
    width: wp(81),
    backgroundColor: '#FFF',
    borderRadius: 22,
    paddingHorizontal: wp(8),
    paddingVertical: wp(11),
    justifyContent: 'center',
    alignItems: 'center',
  },
  locatorImage: {width: wp(30), height: wp(30), marginBottom: 15},
});
const foodStyles = StyleSheet.create({
  disTiny: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  disper: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  until: {
    position: 'absolute',
    alignSelf: 'center',
    top: 125,
    fontFamily: TextFamily.ROBOTO_BLACK,
    fontSize: 25,
    color: Colors.green2,
  },
  whiteArrow: {width: 20, height: 20, resizeMode: 'contain'},
  star: {width: 11, height: 11, resizeMode: 'contain'},
  address: {fontSize: 16, color: Colors.Grey6},
  restName: {fontSize: 31, fontFamily: TextFamily.ROBOTO_REGULAR},
  price: {
    fontSize: 16,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    color: Colors.darkBrown,
  },
  tab: {
    ...getShadow(3),
    borderRadius: 6,
    position: 'absolute',
    right: 9,
    top: 105,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.dark,
    opacity: 0.3,
    borderRadius: 6,
  },
  discount: {
    width: 55,
    height: 77,
    position: 'absolute',
    top: 0,
    zIndex: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green2,
    borderRadius: 6,
  },
  landScapeImage: {
    width: wp(100) - 30,
    height: 275,
    borderRadius: 6,
    marginBottom: 12,
  },
  tab2: {
    ...getShadow(3),
    borderRadius: 6,
    position: 'absolute',
    right: 30,
    top: 260,
    zIndex: 3,
  },
  RestaurantCard: {
    ...getShadow(3),
    alignSelf: 'center',
    width: wp(100) - 30,
    marginBottom: 22,
    borderRadius: 6,
  },
  tinyDetail1: {
    fontSize: 13,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    color: Colors.dark,
  },
  redPending: {
    paddingVertical: 2,
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 6,
    backgroundColor: Colors.red,
  },
  redPending2: {
    paddingVertical: 2,
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 6,
    backgroundColor: Colors.red,
    position: 'absolute',
    top: 10,
    left: 15,
  },
  tinyDetail2x: {
    fontSize: 11,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    color: Colors.white,
  },
  tinyDetail2: {
    fontSize: 13,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    color: Colors.Grey6,
  },
  tinyDetail3: {
    fontSize: 11,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    color: Colors.white,
  },
  tinyDetail4: {},
  time: {
    fontSize: 12,
    color: Colors.GreyTransparent6,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    margin: 6,
  },
  time2: {
    fontSize: 14,
    color: Colors.GreyTransparent6,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    margin: 6,
  },
  PortraitImageA: {
    borderRadius: 6,
    height: 250,
    width: 200,
    resizeMode: 'cover',
    marginBottom: 18,
  },
  PortraitImageB: {
    borderRadius: 6,
    height: 120,
    width: 165,
    resizeMode: 'cover',
    marginBottom: 18,
  },
  heart: {width: 25, height: 25, resizeMode: 'contain'},
  heartPos: {
    top: 8,
    position: 'absolute',
    right: 3,
    zIndex: 8,
    width: 48,
    height: 48,
    borderRadius: 24,
    //...getShadow(3, Colors.Grey0),
    justifyContent: 'center',
    alignItems: 'center',
  },
  PortraitViewA: {
    borderRadius: 6,
    width: 200,
    marginHorizontal: 8,
  },
  PortraitViewB: {
    borderRadius: 6,
    width: 165,
    marginHorizontal: 8,
  },
  TextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 28,
    marginBottom: 20,
  },
  TextBtntitle: {
    fontSize: 28,
    color: Colors.green,
    fontFamily: TextFamily.ROBOTO_BLACK,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(100) - 30,
    paddingHorizontal: 15,
    marginTop: 30,
    borderRadius: 6,
    alignSelf: 'center',
    height: 115,
    ...getShadow(2, Colors.green),
  },
  cardTitle: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    marginBottom: 10,
  },
  cardSubTitle: {
    fontSize: 14,
    width: '90%',
    fontFamily: TextFamily.ROBOTO_LIGHT,
    color: Colors.white,
  },
  ScreenContain: {flex: 1, backgroundColor: Colors.white},
  rowify: {flexDirection: 'row', alignItems: 'center'},
  shapedCont: {
    borderTopLeftRadius: 800,
    backgroundColor: Colors.dark,
    height: 60,
    width: 60,
  },
  PopularCardView: {
    marginHorizontal: 5,
    height: 140,
    paddingHorizontal: 5,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  FoodTitle: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    fontFamily: TextFamily.ROBOTO_REGULAR,
    textAlign: 'center',
    fontSize: 16,
  },
  FoodTitleB: {
    fontFamily: TextFamily.ROBOTO_REGULAR,
    fontSize: 17,
  },
  FoodTitleC: {
    fontFamily: TextFamily.ROBOTO_LIGHT,
    fontSize: 13,
    color: Colors.Grey6,
  },
  FoodStyle: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
  },
  TrapezoidStyle: {
    width: 105,
    borderBottomColor: Colors.white,
    borderBottomWidth: 100,
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderRadius: 5,
    borderRightColor: Colors.transparent,
    borderLeftColor: Colors.transparent,
    ...getShadow(4, Colors.transparent),
  },
  heartx: {
    width: 50,
    height: 50,
  },
  heartShape: {
    width: 30,
    height: 45,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#6427d1',
  },
  leftHeart: {
    transform: [{rotate: '-45deg'}],
    left: 5,
  },
  rightHeart: {
    transform: [{rotate: '45deg'}],
    right: 5,
  },
});
const ChooseOrder = StyleSheet.create({
  count: {
    color: Colors.dark,
    fontSize: 34,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  sqBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green,
    borderRadius: 4,
  },
  sqBtnText: {fontSize: 27, color: Colors.white},
  bottomPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    width: '100%',
    ...getShadow(4),
  },
  recBtn: {
    backgroundColor: Colors.red,
    width: 142,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  recBtnText: {
    color: Colors.white,
    fontFamily: TextFamily.ROBOTO_MEDIUM,
    fontSize: 16,
  },
  rightPart: {
    width: 154,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
