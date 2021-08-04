import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import MapView, {Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import getShadow from '../../utils/shadow';
import {Colors, Images} from '../../constants';
const MApScreen = ({
  navigation,
  route,
}: {
  navigation: object;
  route: object;
}) => {
  const {top, bottom} = useSafeAreaInsets();
  return (
    <View style={styles.screenCont}>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          draggable
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          //image={'pin'}
        />
      </MapView>
      <HeaderBackButton
        labelVisible={false}
        canGoBack={true}
        onPress={navigation.goBack}
        style={[styles.back, {top: top + 10}]}
        tintColor={Colors.dark}
      />
      <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.aim, {top: top + 10}]}>
        <Image
          source={Images.aim}
          style={{
            width: 44,
            height: 44,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.cancelBtn}
        onPress={navigation.goBack}>
        <Image
          source={Images.cross}
          resizeMode={'contain'}
          style={{
            width: 32,
            height: 32,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.85} style={styles.okBtn}>
        <Image
          source={Images.ok}
          resizeMode={'contain'}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  aim: {
    width: 45,
    height: 45,
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 5,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    ...getShadow(3),
  },
  back: {
    height: 45,
    position: 'absolute',
    top: 15,
    left: 5,
    zIndex: 5,
    borderRadius: 23,
    alignItems: 'center',
  },
  okBtn: {
    width: 54,
    height: 54,
    position: 'absolute',
    bottom: 60,
    right: 15,
    zIndex: 5,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    ...getShadow(3, Colors.green),
  },
  cancelBtn: {
    width: 54,
    height: 54,
    position: 'absolute',
    bottom: 60,
    left: 15,
    zIndex: 5,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    ...getShadow(3, Colors.green),
  },
  screenCont: {flex: 1, backgroundColor: Colors.white},
});

export default MApScreen;
