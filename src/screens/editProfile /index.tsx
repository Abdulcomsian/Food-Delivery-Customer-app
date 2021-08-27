/* eslint-disable react-native/no-inline-styles */

import React, {Fragment} from 'react';
import {StyleSheet, ScrollView, Image, View} from 'react-native';
import {useSelector} from 'react-redux';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';
import {Images, Colors, TextFamily} from '@constants';
import {InitialUserInterface} from '@constants/interfaces';
import Hooks from '@hooks';
import getShadow from '@utils/shadow';
import {Buttons, Inputs, ImageTaker} from '@components';
const EditProfileScreen = () => {
  const {loggedIn, detail} = useSelector(
    ({USER}: {USER: InitialUserInterface}) => USER,
  );
  const [keyBoardHeight] = Hooks.useKeyboard();
  const {top, bottom}: EdgeInsets = useSafeAreaInsets();
  return (
    <Fragment>
      <View
        style={[
          styles.cont,
          {paddingTop: (keyBoardHeight === 0 ? WP(20) : 0) + 20},
        ]}>
        {keyBoardHeight === 0 && (
          <View style={styles.camBtn}>
            <ImageTaker>
              <Fragment>
                <Image source={Images.avatar} style={styles.image} />
                <View style={styles.cameraView}>
                  <Image source={Images.camera} style={styles.camera} />
                </View>
              </Fragment>
            </ImageTaker>
          </View>
        )}
        <View
          style={[
            styles.inputCont,
            {paddingTop: keyBoardHeight === 0 ? WP(40) : 20},
          ]}>
          <ScrollView>
            <Inputs.InputB placeHolder={'Username'} />
            <Inputs.InputB placeHolder={'Email'} keyboardType="email-address" />
            <Inputs.InputB placeHolder={'Phone'} keyboardType="phone-pad" />
            <Inputs.InputB placeHolder={'Gender'} />
            <Inputs.InputB placeHolder={'Address'} border={false} />
          </ScrollView>
        </View>
      </View>
      <Buttons.ButtonA
        title={'Done'}
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
  cont: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  camBtn: {position: 'absolute', top: 20, zIndex: 10},
  image: {width: WP(40), height: WP(40), borderRadius: WP(20)},
  camera: {
    width: WP(6),
    height: WP(6),
  },
  cameraView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WP(10),
    height: WP(10),
    borderRadius: WP(5),
    backgroundColor: Colors.red,
    zIndex: 5,
    bottom: WP(4),
    right: WP(4),
    resizeMode: 'contain',
    position: 'absolute',
  },
  inputCont: {
    width: WP(100) - 30,
    borderRadius: 8,
    paddingHorizontal: 20,
    ...getShadow(3),
  },
});

export default EditProfileScreen;
