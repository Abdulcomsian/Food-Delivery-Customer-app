/* eslint-disable react-native/no-inline-styles */
import React, {Fragment, useState} from 'react';
import {View, StyleSheet, Text, Keyboard} from 'react-native';
import {Colors, TextFamily} from '@constants';
import {Inputs, Buttons, Cards, AreaLoader} from '@components';
import {emailIsValid, useKeyboard} from '@utils/libs';
import {
  widthPercentageToDP,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//import Auth from '@react-native-firebase/auth';
const ForgotPass = ({navigation}: {navigation: any}) => {
  const [keyBHeight] = useKeyboard();
  const [email, setEmail] = useState<string>('');
  const [errEmail, setErrEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const ValidateFirst = () => {
    Keyboard.dismiss();
    if (emailIsValid(email)) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setVisible(true);
      }, 3000);
    } else {
      setErrEmail('email is not valid');
      return false;
    }
  };
  return (
    <Fragment>
      <Cards.PasswordReset visible={visible} setVisible={setVisible} />
      <View style={styles.screenContainer}>
        <Text style={styles.headerStyle}>Forget Password</Text>
        <Text style={styles.subHeaderStyle}>
          Please enter your email address. You will receive a link to create a
          new password via email.
        </Text>
        <Inputs.InputA
          setValue={(txt: string) => {
            setEmail(txt);
            errEmail && setErrEmail('');
          }}
          value={email}
          error={errEmail}
          placeHolder={'Your email'}
          keyboardType={'email-address'}
          style={{
            width: widthPercentageToDP(100) - 60,
            alignSelf: 'center',
            borderRadius: 22,
            marginBottom: 44,
            height: 48,
          }}
        />
        <Buttons.ButtonA
          title={'Send'}
          onPress={ValidateFirst}
          style={{
            width: widthPercentageToDP(100) - 60,
            alignSelf: 'center',
            borderRadius: 22,
            height: 48,
            backgroundColor: Colors.red,
          }}
        />
      </View>
      {loading && (
        <View style={styles.absolute}>
          <AreaLoader height={hp(100)} />
        </View>
      )}
    </Fragment>
  );
};
const styles = StyleSheet.create({
  screenContainer: {flex: 1, backgroundColor: Colors.white},
  absolute: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
  subHeaderStyle: {
    marginTop: 20,
    marginBottom: 58,
    width: 330,
    fontSize: 17,
    alignSelf: 'center',
    textAlign: 'center',
  },
  headerStyle: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 34,
    marginBottom: 5,
    fontFamily: TextFamily.ROBOTO_BLACK,
    paddingHorizontal: 15,
    color: Colors.green,
  },
});
export default ForgotPass;
