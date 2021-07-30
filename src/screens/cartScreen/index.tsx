/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, Fragment} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Colors, Images, TextFamily} from '../../constants';
import getShadow from '../../utils/shadow';
import {getPriceFormat} from '../../utils/libs';
import {Cards, Headers, BottomSheet} from '../../components';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';
import textFamily from '../../constants/textFamily';
const CARTScreen = ({
  navigation,
  route,
}: {
  navigation: object;
  route: object;
}) => {
  const {top, bottom}: EdgeInsets = useSafeAreaInsets();
  const cart = 'empty';
  return (
    <View style={styles.ScreenContain}>
      <Headers.HeaderB title={'My Order'} />
      {cart === 'empty' ? (
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
          }}></ScrollView>
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
  ScreenContain: {flex: 1, backgroundColor: Colors.white},
});
export default CARTScreen;
