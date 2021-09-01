import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Colors, TextFamily} from '@constants';
import auth from '@react-native-firebase/auth';
import {Inputs, Buttons} from '@components';
import {
  useKeyboard,
  emailIsValid,
  emailExist,
  passwordValidator,
  getCustomData,
} from '@utils/libs';
import APIs from '@utils/APIs';
import {widthPercentageToDP} from 'react-native-responsive-screen';
const SignUpScreen = ({navigation}: {navigation: any}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>('');
  const [displayNameErr, setdisplayNameErr] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [passwordErr, setPasswordErr] = useState<string>('');
  // const [cPassword, setCPassword] = useState<string>('');
  // const [cPasswordErr, setCPasswordErr] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [phoneErr, setPhoneErr] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailErr, setEmailErr] = useState<string>('');
  const [DoB, setDoB] = useState<string>('');
  const [DoBErr, setDoBErr] = useState<string>('');

  const [keyboardHeight] = useKeyboard();

  const letValidFirst = async () => {
    //-----Local Validations
    if (!displayName) {
      setdisplayNameErr('Name required');
      return false;
    }
    if (email === '') {
      setEmailErr('Email is required');
      return false;
    }
    if (!emailIsValid(email)) {
      setEmailErr('That email address is invalid');
      return false;
    }
    if (password.length < 8) {
      setPasswordErr(
        'Password is not valid, password should be more then 7 characters',
      );
      return false;
    }
    // if (cPassword !== password) {
    //   setCPasswordErr('Password should Match');
    //   return false;
    // }
    if (!phone) {
      setPhone('Phone number required');
      return false;
    }
    if (!DoB) {
      setDoBErr('Date of Birth required');
      return false;
    }
    //------Online Validation
    const emailIsExist = await emailExist(email);
    if (!emailIsExist) {
      //const userExist = await userExist(userName);
      Submit();
    } else {
      setEmailErr('Email already exist');
      return false;
    }
  };
  const Submit = () => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(Resp => {
        Resp.user
          .updateProfile({
            displayName,
            //phoneNumber: '+923035191910',
          })
          .then(
            () => {
              Resp.user.sendEmailVerification();
              // database()
              //   .ref('users/' + emailToUniqueString(email))
              //   .set({});
              const locUser = {...Resp.user};
              locUser._user.displayName = displayName;
              console.log('user', JSON.stringify(locUser));
              APIs.signUp({
                email,
                phone,
                fId: locUser._user.uid,
                name: displayName,
                DoB,
              })
                .then((res: any) => {
                  res &&
                    (console.log('UserReg', res),
                    navigation.navigate('emailVerify', res));
                })
                .catch(() => {});
            },
            error => {},
          )
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setEmailErr('Email address already Exist');
        } else if (error.code === 'auth/invalid-email') {
          setEmailErr('That email address is invalid!');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView style={{flex: 1, marginBottom: keyboardHeight}}>
        <Text style={styles.headerStyle}>Create an Account</Text>
        <Inputs.InputA
          error={displayNameErr}
          placeHolder={'Name'}
          style={styles.textField}
          setValue={(txt: string) => {
            setDisplayName(txt);
            displayNameErr && setdisplayNameErr('');
          }}
          value={displayName}
        />
        <Inputs.InputA
          error={emailErr}
          placeHolder={'Email'}
          style={styles.textField}
          keyboardType="email-address"
          setValue={(txt: string) => {
            setEmail(txt);
            emailErr && setEmailErr('');
          }}
          value={email}
        />
        <Inputs.InputA
          error={phoneErr}
          placeHolder={'Phone'}
          max={17}
          style={styles.textField}
          keyboardType="phone-pad"
          setValue={(txt: string) => {
            setPhone(txt);
            phoneErr && setPhoneErr('');
          }}
          value={phone}
        />
        <Inputs.InputDatePicker
          error={DoBErr}
          value={DoB}
          setValue={(e: string) => setDoB(getCustomData(e))}
          placeHolder={'Date of birth'}
          style={styles.textField}
        />
        <Inputs.InputA
          placeHolder={'Password'}
          style={styles.textField}
          secureTextEntry={true}
          setValue={(txt: string) => {
            setPassword(txt);
            passwordErr && setPasswordErr('');
          }}
          value={password}
          error={passwordErr}
        />
        <Buttons.ButtonA
          title={'Sign up'}
          style={styles.signUpBtn}
          onPress={letValidFirst}
        />
        <Text style={styles.tinyTextStyle}>
          By clicking Sign up you agree to the following Terms and Conditions
          without reservation
        </Text>
      </ScrollView>
    </View>
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
