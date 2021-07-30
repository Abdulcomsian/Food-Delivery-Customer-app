import React, {Fragment, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, TextFamily} from '../../constants';
import {Inputs, Buttons, Cards} from '../../components';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const ForgotPass = ({navigation}: {navigation: object}) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <Fragment>
      <Cards.PasswordReset visible={visible} setVisible={setVisible}/>
      <View style={styles.screenContainer}>
        <Text style={styles.headerStyle}>Forget Password</Text>
        <Text style={styles.subHeaderStyle}>
          Please enter your email address. You will receive a link to create a
          new password via email.
        </Text>
        <Inputs.InputA
          placeHolder={'Your email'}
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
          onPress={() => {
            setVisible(true);
          }}
          style={{
            width: widthPercentageToDP(100) - 60,
            alignSelf: 'center',
            borderRadius: 22,
            height: 48,
            backgroundColor: Colors.red,
          }}
        />
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
    marginBottom: 5,
    fontFamily: TextFamily.ROBOTO_BLACK,
    paddingHorizontal: 15,
    color: Colors.green,
  },
});
export default ForgotPass;
