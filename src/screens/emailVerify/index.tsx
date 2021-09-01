/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import Actions from '@redux/actions';
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {Buttons} from '@components';
import {Colors} from '@constants';
import {userModel} from '@constants/interfaces';
const PhoneVerifyScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {email}: userModel = route.params;
  const dispatch = useDispatch();
  const {top, bottom} = useSafeAreaInsets();
  const checkAndRegisterToDB = () => {
    auth()
      .currentUser?.reload()
      .then(cc => {
        console.log('here', cc);
        auth().currentUser?.emailVerified === true
          ? (Actions.letAuthorizeUser(route.params)(dispatch),
            setTimeout(navigation.goBack, 700))
          : Alert.alert('Error', 'You need to verify your email first');
      });
  };
  return (
    <View
      style={[
        phoneVerifyStyle.container,
        {paddingTop: top, paddingBottom: bottom},
      ]}>
      <Text style={phoneVerifyStyle.title}>Email Verification</Text>
      <Text style={[phoneVerifyStyle.subTitle, {marginBottom: 60}]}>
        Please verify your email ({email.toString()})
      </Text>
      <View
        style={{
          width: 300,
          alignSelf: 'center',
          height: '30%',
          justifyContent: 'space-between',
        }}>
        <Buttons.ButtonA title={'Open my email client app'} />
        <Buttons.ButtonA
          title={'Email verified'}
          renderNextIcon={true}
          renderNextIconColor={Colors.white}
          style={{backgroundColor: Colors.red}}
          onPress={checkAndRegisterToDB}
        />
      </View>
      <Text
        style={[
          phoneVerifyStyle.subTitle,
          {color: Colors.Grey6, marginTop: 110},
        ]}>
        Didn't you received any email verification?
      </Text>
      <Text style={phoneVerifyStyle.subTitle2}>
        Resend a new email verification link.
      </Text>
    </View>
  );
};

export default PhoneVerifyScreen;

const phoneVerifyStyle = StyleSheet.create({
  container: {
    height: HP(100),
    width: WP(100),
    paddingHorizontal: 15,
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
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    color: Colors.green,
  },
  subTitle: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
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
