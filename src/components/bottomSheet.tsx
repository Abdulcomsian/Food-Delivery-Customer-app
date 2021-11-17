/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useMemo, useCallback, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  Keyboard,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import BottomSheet from '@gorhom/bottom-sheet';
import {useDispatch} from 'react-redux';
import Actions from '@redux/actions';
import {navigate} from '@navigatorHelper';
import {Colors, Images, TextFamily} from '@constants';
import {emailIsValid, useKeyboard} from '@utils/libs';
import APIs from '@utils/APIs';
import Auth from '@react-native-firebase/auth';
import Inputs from './inputs';
import Buttons from './buttons';
const BottomSheetSheetA = ({status}: {status: boolean}) => {
  const dispatch = useDispatch();
  const {bottom} = useSafeAreaInsets();
  const FilterBottomSheet = useRef<BottomSheet>(null);
  const snapFilterBottomPoints = useMemo(() => [0, 470 + bottom], []);
  const handleFilterBottomSheetChanges = useCallback((index: number) => {
    index === 0 && handleIt(false);
  }, []);
  const handleIt = (open = true) => {
    FilterBottomSheet.current?.[open ? 'expand' : 'close']();
    !open && Actions.closeBottomFilter()(dispatch);
  };
  useEffect(() => {
    handleIt(status);
  }, [status]);
  return (
    <BottomSheet
      ref={FilterBottomSheet}
      index={1}
      backdropComponent={() =>
        status ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              handleIt(false);
            }}
            style={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              //height: hp(100),
              backgroundColor: '#00000088',
              position: 'absolute',
            }}
          />
        ) : null
      }
      handleComponent={() => (
        <View
          style={{
            flex: 1,
            marginVertical: 15,
            zIndex: 210,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: WP(10),
              height: 4,
              backgroundColor: Colors.Grey3,
            }}
          />
        </View>
      )}
      snapPoints={snapFilterBottomPoints}
      onChange={handleFilterBottomSheetChanges}>
      <View
        style={{
          flex: 1,
          paddingBottom: 30 + bottom,
        }}>
        <View
          style={[
            style.rowify,
            {
              //paddingHorizontal: 15,
              width: '100%',
              height: 38,
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: Colors.Grey3,
              marginBottom: 22,
            },
          ]}>
          <Text style={style.HeaderBtnText}>Reset</Text>
          <Text style={style.HeaderBtnText}>Filters</Text>
          <Text
            style={[style.HeaderBtnText, {color: Colors.red}]}
            onPress={() => {
              handleIt(false);
            }}>
            Done
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            marginBottom: 22,
          }}>
          <Text style={style.HeaderText}>CUISINES</Text>
          <ScrollView
            style={{height: 90}}
            contentContainerStyle={{
              flexDirection: 'row',
              width: '100%',
              flexWrap: 'wrap',
              paddingHorizontal: 15,
            }}>
            {[
              'American',
              'Asia',
              'Shushi',
              'Pizza',
              'Desserts',
              'Fast Food',
              'Vietnamese',
            ].map((itm, index) => {
              return (
                <TouchableOpacity
                  key={itm + '_' + index}
                  activeOpacity={0.85}
                  style={{
                    paddingHorizontal: 22,
                    paddingVertical: 6,
                    borderRadius: 15,
                    borderWidth: 1,
                    margin: 4,
                    borderColor: index === 5 ? Colors.red : Colors.Grey4,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: TextFamily.ROBOTO_LIGHT,
                      color: index === 5 ? Colors.red : Colors.Grey4,
                    }}>
                    {itm}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            width: '100%',
          }}>
          <Text style={style.HeaderText}>SORT BY</Text>
          <ScrollView
            style={{width: '100%', height: 205}}
            contentContainerStyle={{
              width: '100%',
            }}>
            {[
              'Top Rated',
              'Nearest Me',
              'Cost High to Low',
              'Cost High to Low',
              'Most Popular',
            ].map((itm, index) => {
              return (
                <TouchableOpacity
                  key={itm + '_' + index}
                  activeOpacity={0.85}
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 15,
                    borderBottomWidth: 1,
                    borderColor: Colors.Grey3,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: TextFamily.ROBOTO_REGULAR,
                      color: index === 0 ? Colors.red : Colors.dark,
                    }}>
                    {itm}
                  </Text>
                  {index === 0 && (
                    <Image
                      source={Images.tick}
                      style={{width: 18, height: 18, resizeMode: 'contain'}}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </BottomSheet>
  );
};
const BottomSheetLogin = ({status = false}: {status?: boolean}) => {
  const [keyBHeight] = useKeyboard();
  const dispatch = useDispatch();
  const {bottom} = useSafeAreaInsets();
  const FilterBottomSheet = useRef<BottomSheet>(null);
  const [email, setEmail] = useState<string>('');
  const [errEmail, setErrEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errPassword, setErrPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const snapFilterBottomPoints = useMemo(
    () => [0, 455 + (keyBHeight ? keyBHeight : bottom)],
    [keyBHeight, bottom],
  );
  const handleFilterBottomSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    index === 0 && handleIt(false);
  }, []);
  const handleItCallback = useCallback((open = true) => {
    FilterBottomSheet.current?.[open ? 'expand' : 'close']();
    !open && Actions.closeBottomLogin()(dispatch);
  }, []);
  const handleIt = (open = true) => {
    FilterBottomSheet.current?.[open ? 'expand' : 'close']();
    !open && Actions.closeBottomLogin()(dispatch);
  };
  useEffect(() => {
    handleItCallback(status);
  }, [status, handleItCallback]);
  const validateFirst = () => {
    Keyboard.dismiss();
    if (password.length < 8) {
      setErrPassword('password should be equal or more then 8 characters');
      return false;
    }
    if (emailIsValid(email)) {
      letsTryLogin(email, password);
    } else {
      setErrEmail('email is not valid');
      return false;
    }
  };
  const letsTryLogin = (Email: string, Password: string) => {
    Auth()
      .signInWithEmailAndPassword(Email, Password)
      .then(({user}) => {
        if (user.uid) {
          APIs.getLocalDBUserDetail(user.uid).then(payload => {
            if (payload) {
              handleIt(false);
              Actions.letAuthorizeUser(payload)(dispatch);
            }
          });
        }
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          setErrPassword('wrong password');
        } else if (error.code === 'auth/user-not-found') {
          setErrEmail('User not found');
        }
      });
  };
  return (
    <BottomSheet
      ref={FilterBottomSheet}
      index={1}
      backdropComponent={() =>
        status ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              handleIt(false);
            }}
            style={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              //height: hp(100),
              backgroundColor: '#00000088',
              position: 'absolute',
            }}
          />
        ) : null
      }
      handleComponent={() => null}
      snapPoints={snapFilterBottomPoints}
      onChange={handleFilterBottomSheetChanges}>
      <View
        style={{
          flex: 1,
          paddingBottom: 30 + bottom,
        }}>
        <Text style={style.LoginHeaderText}>Welcome back</Text>
        <Text style={style.LoginsubHeaderText}>Login to your account</Text>
        <Inputs.InputA
          style={{width: WP(100) - 50, alignSelf: 'center'}}
          placeHolder="Email"
          value={email}
          keyboardType="email-address"
          setValue={(txt: string) => {
            setEmail(txt);
            errEmail && setErrEmail('');
          }}
          error={errEmail}
        />
        <Inputs.InputA
          style={{width: WP(100) - 50, alignSelf: 'center'}}
          placeHolder="Password"
          value={password}
          secureTextEntry={secureTextEntry}
          setValue={(txt: string) => {
            setPassword(txt);
            errPassword && setErrPassword('');
          }}
          error={errPassword}
        />
        <Buttons.ButtonA
          onPress={validateFirst}
          title={'Login'}
          style={{
            backgroundColor: Colors.red,
            width: WP(100) - 50,
            alignSelf: 'center',
            marginTop: 27,
            marginBottom: 32,
          }}
        />
        <Text
          onPress={() => {
            handleIt(false);
            setTimeout(() => {
              navigate('forgotPassword');
            }, 700);
          }}
          style={[
            style.LoginButtomText,
            {color: Colors.dark, marginBottom: 60},
          ]}>
          Forgot your password?
        </Text>
        <Text style={style.LoginButtomText}>
          Don't have and account?{' '}
          <Text
            style={{color: Colors.red}}
            onPress={() => {
              handleIt(false);
              setTimeout(() => {
                navigate('signUp');
              }, 700);
            }}>
            Sign up
          </Text>
        </Text>
      </View>
    </BottomSheet>
  );
};
const style = StyleSheet.create({
  rowify: {flexDirection: 'row'},
  HeaderBtnText: {
    fontSize: 17,
    textAlign: 'center',
    fontFamily: TextFamily.ROBOTO_LIGHT,
    paddingHorizontal: 15,
  },
  HeaderText: {
    fontSize: 15,
    marginBottom: 13,
    fontFamily: TextFamily.ROBOTO_LIGHT,
    paddingHorizontal: 15,
    color: Colors.Grey5,
  },
  LoginButtomText: {
    fontSize: 17,
    textAlign: 'center',
    fontFamily: TextFamily.ROBOTO_REGULAR,
    color: Colors.Grey6,
  },
  LoginsubHeaderText: {
    fontSize: 17,
    marginBottom: 33,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    paddingHorizontal: 15,
    textAlign: 'center',
    color: Colors.Grey7,
  },
  LoginHeaderText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 34,
    marginBottom: 5,
    fontFamily: TextFamily.ROBOTO_BLACK,
    paddingHorizontal: 15,
    color: Colors.green,
  },
});
export default {BottomSheetSheetA, BottomSheetLogin};
