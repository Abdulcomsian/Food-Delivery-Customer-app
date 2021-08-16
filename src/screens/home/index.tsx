/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, Fragment} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  ImageBackground,
} from 'react-native';
import {Colors, Images, TextFamily} from '../../constants';
import getShadow from '../../utils/shadow';
import {Cards, Headers, BottomSheet} from '../../components';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';
import {Platform} from 'react-native';
const HomeScreen = ({
  navigation,
  route,
}: {
  navigation: object;
  route: object;
}) => {
  const {top, bottom}: EdgeInsets = useSafeAreaInsets();
  const [locEModal, setLocEModal] = useState<boolean>(false);
  // useEffect(() => {
  //   setLocEModal(true);
  // }, []);
  return (
    <Fragment>
      <Cards.LocationEnabler visible={locEModal} setVisible={setLocEModal} />
      <View style={styles.ScreenContain}>
        <Headers.HeaderA />
        <Headers.SearchBar />
        <ScrollView
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: bottom + 100,
          }}>
          <ScrollView horizontal={true} contentContainerStyle={styles.rowify}>
            {[1, 2, 3, 4].map((item, index) => {
              return (
                <View key={'Item' + index} style={styles.PopularCardView}>
                  <View style={styles.TrapezoidStyle} />
                  <Image source={Images.burger} style={styles.FoodStyle} />
                  <Text style={styles.FoodTitle}>Burger</Text>
                </View>
              );
            })}
          </ScrollView>
          <TouchableOpacity style={styles.card} activeOpacity={0.85}>
            <View style={{flex: 1}}>
              <Text style={styles.cardTitle}>Black Friday Deal here !</Text>
              <Text style={styles.cardSubTitle}>
                Get 20% deal for you on all pizza bucket.Enjoy this Friday with
                amazing deal.
              </Text>
            </View>
            <Image source={Images.whiteRightArrow} style={styles.whiteArrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.TextBtn} activeOpacity={0.85}>
            <View style={{flex: 1}}>
              <Text style={styles.TextBtntitle}>Discover new places</Text>
            </View>
            <Image source={Images.redRightArrow} style={styles.whiteArrow} />
          </TouchableOpacity>
          <ScrollView
            horizontal={true}
            contentContainerStyle={[styles.rowify, {paddingHorizontal: 7}]}>
            {[1, 2, 3, 4].map((item, index) => {
              return <Cards.FoodCard1 key={'Food_' + index} />;
            })}
          </ScrollView>
          <TouchableOpacity style={styles.TextBtn} activeOpacity={0.85}>
            <View style={{flex: 1}}>
              <Text style={styles.TextBtntitle}>Featured</Text>
            </View>
            <Image source={Images.redRightArrow} style={styles.whiteArrow} />
          </TouchableOpacity>
          <ScrollView
            horizontal={true}
            contentContainerStyle={[styles.rowify, {paddingHorizontal: 7}]}>
            {[1, 2, 3, 4].map((item, index) => {
              return <Cards.FoodCard2 key={'FoodCard_' + index} />;
            })}
          </ScrollView>
          <TouchableOpacity style={styles.TextBtn} activeOpacity={0.85}>
            <View style={{flex: 1}}>
              <Text style={styles.TextBtntitle}>All Restaurants</Text>
            </View>
          </TouchableOpacity>
          {[
            {discount: '30%'},
            {},
            {discount: '30%'},
            {delivery: 100},
            {until: '12:00 PM'},
            {},
          ].map((item, index) => {
            return (
              <View key={'_RestCard' + index} style={styles.RestaurantCard}>
                <TouchableOpacity style={styles.heartPos} activeOpacity={0.85}>
                  <Image source={Images.favOff} style={styles.heart} />
                </TouchableOpacity>
                <View style={styles.tab2}>
                  <Text style={styles.time2}>20-25 mins</Text>
                </View>
                <ImageBackground
                  source={Images.food}
                  style={[
                    styles.landScapeImage,
                    {opacity: item.until ? 0.3 : 1},
                  ]}>
                  <View style={styles.overlay} />
                </ImageBackground>
                {item.until && item.until !== '' && (
                  <Text style={styles.until}>Closed Until {'12:00 PM'}</Text>
                )}
                {!(item.until && item.until !== '') && (
                  <Fragment>
                    {item.discount && item.discount !== '' && (
                      <View style={styles.discount}>
                        <Text style={styles.disTiny}>Flat</Text>
                        <Text style={styles.disper}>{item.discount}</Text>
                        <Text style={styles.disTiny}>Off</Text>
                      </View>
                    )}
                    {item.delivery !== undefined && item.delivery !== 0 ? (
                      <View
                        style={[
                          styles.redPending2,
                          {backgroundColor: Colors.green2},
                        ]}>
                        <Text style={styles.tinyDetail2x}>
                          Delivery:Rs.{item.delivery}
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.redPending2}>
                        <Text style={styles.tinyDetail2x}>Free Delivery</Text>
                      </View>
                    )}
                  </Fragment>
                )}
                <View
                  style={[
                    styles.rowify,
                    {justifyContent: 'space-between', paddingHorizontal: 12},
                  ]}>
                  <Text style={styles.restName}>Burger King</Text>
                  <Text style={styles.price}>£. 18.00</Text>
                </View>
                <View
                  style={[
                    styles.rowify,
                    {
                      justifyContent: 'space-between',
                      paddingHorizontal: 12,
                      marginTop: 3,
                      marginBottom: 14,
                    },
                  ]}>
                  <Text style={styles.address}>72 Cecil Street,NORTH RYDE</Text>
                  <View style={styles.rowify}>
                    <Image source={Images.star} style={styles.star} />
                    <Text style={[styles.tinyDetail1, {marginHorizontal: 3}]}>
                      4.6
                    </Text>
                    <Text style={styles.tinyDetail2}>(128 ratings)</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </Fragment>
  );
};
const styles = StyleSheet.create({
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
    width: widthPercentageToDP(100) - 30,
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
    width: widthPercentageToDP(100) - 30,
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
    width: widthPercentageToDP(100) - 30,
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
    zIndex: 3,
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
    zIndex: 3,
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
    ...getShadow(Platform.OS === 'android' ? 0 : 4, Colors.transparent),
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
export default HomeScreen;

const Heart = ({style, ...rest}: {style: ViewStyle}) => (
  <View {...rest} style={[styles.heartx, style]}>
    <View style={styles.leftHeart} />
    <View style={styles.rightHeart} />
  </View>
);
