import React, {Fragment, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, TextFamily} from '../../constants';
import {Inputs, Buttons, Cards} from '../../components';
import {widthPercentageToDP} from 'react-native-responsive-screen';
const SignUpScreen = ({navigation}: {navigation: object}) => {
  const [date, setDate] = useState<Date | String>('');
  return (
    <Fragment>
      <View style={styles.screenContainer}>
        <Text style={styles.headerStyle}>Create an Account</Text>
        <Inputs.InputA placeHolder={'Username'} style={styles.textField} />
        <Inputs.InputA
          placeHolder={'Email'}
          style={styles.textField}
          keyboardType="email-address"
        />
        <Inputs.InputA
          placeHolder={'Phone'}
          style={styles.textField}
          keyboardType="phone-pad"
        />
        <Inputs.InputDatePicker
          value={date}
          setValue={setDate}
          placeHolder={'Date of birth'}
          style={styles.textField}
        />
        <Inputs.InputA
          placeHolder={'Password'}
          style={styles.textField}
          secureTextEntry={true}
        />
        <Buttons.ButtonA title={'Sign up'} style={styles.signUpBtn} />
        <Text style={styles.tinyTextStyle}>
          By clicking Sign up you agree to the following Terms and Conditions
          without reservation
        </Text>
      </View>
    </Fragment>
  );
};
const styles = StyleSheet.create({
  screenContainer: {flex: 1, backgroundColor: Colors.white},
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
    marginBottom: 50,
    fontFamily: TextFamily.ROBOTO_BLACK,
    paddingHorizontal: 15,
    color: Colors.green,
  },
  textField: {
    width: widthPercentageToDP(100) - 60,
    alignSelf: 'center',
    borderRadius: 22,
    marginVertical: 6,
    height: 48,
  },
  tinyTextStyle: {
    marginTop: 25,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    width: widthPercentageToDP(100) - 60,
    alignSelf: 'center',
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  signUpBtn: {
    width: widthPercentageToDP(100) - 60,
    alignSelf: 'center',
    borderRadius: 22,
    height: 48,
    marginTop: 40,
    backgroundColor: Colors.red,
  },
});
export default SignUpScreen;
