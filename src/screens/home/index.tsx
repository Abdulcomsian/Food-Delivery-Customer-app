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
import {Colors, TextFamily} from '@constants';
import getShadow from '@utils/shadow';
import {banner, foodPlace, foodCategorie} from '@constants/interfaces';
import {Cards, Headers, Loader} from '@components';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';
import {HeaderBackButton} from '@react-navigation/stack';
import APIS from '@utils/APIs';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
//import {isItOpenNow} from '@utils/libs';
const HomeScreen = ({navigation}: {navigation: object}) => {
  const {bottom}: EdgeInsets = useSafeAreaInsets();
  const [featuredFoodCat, setFeaturedFoodCat] = useState<Array<foodCategorie>>(
    [],
  );
  const [banners, setBanners] = useState<Array<banner>>([]);
  const [newPlaces, setNewPlaces] = useState<Array<foodPlace>>([]);
  const [allPlaces, setAllPlaces] = useState<Array<foodPlace>>([]);
  const [featuredPlaces, setFeaturedPlaces] = useState<Array<foodPlace>>([]);
  const [locEModal, setLocEModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    APIS.getHomePublicData()
      .then(res => {
        if (res) {
          const {
            featuredFoods,
            banners: bnners,
            foodPlaces,
            allFoodPlace,
            featuredFoodPlaces,
          } = res;
          setFeaturedFoodCat(featuredFoods);
          setBanners(bnners);
          setNewPlaces(foodPlaces);
          setAllPlaces(allFoodPlace);
          setFeaturedPlaces(featuredFoodPlaces);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    //setLocEModal(true);
  }, []);
  return (
    <Fragment>
      <Loader visible={loading} />
      <Cards.LocationEnabler visible={locEModal} setVisible={setLocEModal} />
      <View style={styles.ScreenContain}>
        <Headers.HeaderA />
        <Headers.SearchBar />

        {!loading && (
          <ScrollView
            contentContainerStyle={{
              paddingTop: 10,
              paddingBottom: bottom + 100,
            }}>
            {featuredFoodCat.length > 0 && (
              <ScrollView
                horizontal={true}
                contentContainerStyle={styles.rowify}>
                {featuredFoodCat.map((item, index) => {
                  return (
                    <TouchableWithoutFeedback key={'Item' + index}>
                      <View style={styles.PopularCardView}>
                        <View style={styles.TrapezoidStyle} />
                        <Image
                          source={{uri: item.image}}
                          style={styles.FoodStyle}
                        />
                        <Text style={styles.FoodTitle}>{item.name}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </ScrollView>
            )}
            {banners.length > 0 && (
              <TouchableOpacity style={styles.card} activeOpacity={0.85}>
                <View style={{flex: 1}}>
                  <Text style={styles.cardTitle}>{banners[0].heading}</Text>
                  <Text style={styles.cardSubTitle}>
                    {banners[0].subHeading}
                  </Text>
                </View>
                <HeaderBackButton
                  labelVisible={false}
                  style={{transform: [{rotate: '180deg'}], width: 20}}
                  tintColor={Colors.white}
                />
              </TouchableOpacity>
            )}
            {newPlaces.length > 0 && (
              <Fragment>
                <HeadingLabel
                  title="Discover new places"
                  navigation={navigation}
                />
                <ScrollView
                  horizontal={true}
                  contentContainerStyle={[
                    styles.rowify,
                    {paddingHorizontal: 7},
                  ]}>
                  {newPlaces.map((item, index) => {
                    return (
                      <Cards.FoodCard1
                        key={'Food_' + index}
                        restaurant={item}
                        navigation={navigation}
                      />
                    );
                  })}
                </ScrollView>
              </Fragment>
            )}
            {featuredPlaces.length > 0 && (
              <Fragment>
                <HeadingLabel title="Featured" navigation={navigation} />
                <ScrollView
                  horizontal={true}
                  contentContainerStyle={[
                    styles.rowify,
                    {paddingHorizontal: 7},
                  ]}>
                  {featuredPlaces.map((item, index) => {
                    return (
                      <Cards.FoodCard2
                        key={'FoodCard_' + index}
                        restaurant={item}
                        navigation={navigation}
                      />
                    );
                  })}
                </ScrollView>
              </Fragment>
            )}
            {allPlaces.length > 0 && (
              <Fragment>
                <HeadingLabel title="All Restaurants" navigation={navigation} />
                {allPlaces.map((item: foodPlace, index: number) => {
                  //const [opened, Start, End] = isItOpenNow(item.timing);
                  return (
                    <Cards.RestaurantCard
                      key={'_RestCard' + index}
                      navigation={navigation}
                      restaurant={item}
                    />
                  );
                })}
              </Fragment>
            )}
          </ScrollView>
        )}
      </View>
    </Fragment>
  );
};
const HeadingLabel = ({
  title = '',
  navigation = undefined,
  screenKey = '',
}: {
  title?: string;
  navigation?: any;
  screenKey?: string;
}) => (
  <TouchableOpacity
    style={styles.TextBtn}
    activeOpacity={0.85}
    onPress={() => {
      navigation && screenKey && navigation.navigate(screenKey);
    }}>
    <View style={{flex: 1}}>
      <Text style={styles.TextBtntitle}>{title}</Text>
    </View>
    <HeaderBackButton
      labelVisible={false}
      style={{transform: [{rotate: '180deg'}]}}
      tintColor={Colors.red}
    />
  </TouchableOpacity>
);
const styles = StyleSheet.create({
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
  FoodStyle: {
    width: 85,
    height: 85,
    borderRadius: 43,
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
});
export default HomeScreen;
