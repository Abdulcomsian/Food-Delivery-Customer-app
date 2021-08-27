/* eslint-disable react-native/no-inline-styles */
import React, {Fragment, useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Keyboard} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
//import Actions from '../../redux/actions';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import PhoneInput from 'react-native-phone-number-input';
import {useDispatch} from 'react-redux';
import {Colors, TextFamily} from '@constants';
import {Buttons} from '@components';
const PhoneScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const dispatch = useDispatch();
  const {top, bottom} = useSafeAreaInsets();
  const [value, setValue] = useState<string>('');
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
//   useEffect(() => {
//     Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
//     Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
//     return () => {
//       Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
//       Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
//     };
//   }, []);
//   const _keyboardDidShow = () => setKeyboardStatus(true);
//   const _keyboardDidHide = () => setKeyboardStatus(false);
  return (
    <Fragment>
      <View style={phoneVerifyStyle.container}>
        <Text style={phoneVerifyStyle.title}>Verify your phone number</Text>
        <Text style={[phoneVerifyStyle.subTitle, {marginBottom: 60}]}>
          We have sent you an SMS with a code to number +92 905070017
        </Text>
        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          defaultCode={'US'}
          layout="first"
          onChangeText={text => {
            setValue(text);
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
          }}
          textInputProps={{keyboardType: 'phone-pad', returnKeyType: 'done'}}
          containerStyle={{
            borderRadius: 24,
            backgroundColor: Colors.GreyTransparent5,
          }}
          textContainerStyle={{
            backgroundColor: Colors.transparent,
          }}
          withDarkTheme
          //withShadow
          autoFocus
        />
      </View>

      <Buttons.ButtonA
        title={'Next'}
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

export default PhoneScreen;

const phoneVerifyStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: WP(100),
    paddingHorizontal: 15,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  header: {
    height: 56,
    width: WP(100) - 30,
    justifyContent: 'center',
    marginBottom: 30,
  },
  title: {
    width: 260,
    fontSize: 34,
    fontFamily: TextFamily.ROBOTO_BLACK,
    textAlign: 'center',
    color: Colors.green,
  },
  subTitle: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    color: Colors.dark,
    textAlign: 'center',
    width: 340,
  },
  subTitle2: {
    color: Colors.red,
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: Colors.red,
    width: WP(100),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  btnTitle: {
    fontSize: 17,
    color: Colors.white,
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    fontSize: 30,
    color: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  cellV: {
    width: 60,
    height: 60,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: Colors.Grey3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Grey3,
  },
  cellFilledV: {
    backgroundColor: Colors.red,
    width: 60,
    height: 60,
    borderRadius: 26,
  },
  focusCellV: {
    borderColor: Colors.red,
    width: 60,
    height: 60,
    borderRadius: 26,
  },
});
