import React, {Fragment} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';
import {Images, Colors, TextFamily} from '../../constants';
import {InitialUserInterface} from '../../constants/interfaces';
import getShadow from '../../utils/shadow';
import {Buttons, Inputs} from '../../components';
const EditProfileScreen = () => {
  const {loggedIn, detail} = useSelector(
    ({USER}: {USER: InitialUserInterface}) => USER,
  );
  const {top, bottom}: EdgeInsets = useSafeAreaInsets();
  return (
    <Fragment>
      <View style={styles.cont}>
        <TouchableOpacity
          onPress={() => {}}
          activeOpacity={0.85}
          style={styles.camBtn}>
          <Image source={Images.avatar} style={styles.image} />
          <View style={styles.cameraView}>
            <Image source={Images.camera} style={styles.camera} />
          </View>
        </TouchableOpacity>
        <View style={styles.inputCont}>
          <ScrollView>
            <Inputs.InputB placeHolder={'Username'} />
            <Inputs.InputB placeHolder={'Email'} />
            <Inputs.InputB placeHolder={'Phone'} keyboardType="phone-pad" />
            <Inputs.InputB placeHolder={'Gender'} />
            <Inputs.InputB placeHolder={'Address'} border={false} />
          </ScrollView>
        </View>
      </View>
      <Buttons.ButtonA
        title={'Done'}
        onPress={() => {}}
        // eslint-disable-next-line react-native/no-inline-styles
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
    paddingTop: WP(20) + 20,
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
    ...getShadow(3),
    paddingTop: WP(40),
    paddingHorizontal: 20,
  },
});

export default EditProfileScreen;
