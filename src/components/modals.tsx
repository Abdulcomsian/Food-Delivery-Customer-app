import React from 'react';
import {View, Modal, StyleSheet, Image, Text} from 'react-native';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {Colors, Images, TextFamily} from '@constants';
import {navigationRef} from '@navigatorHelper';
import {StackActions} from '@react-navigation/native';
import Buttons from './buttons';
const OrderSuccessFullyReceived = ({
  visible = false,
  setVisiblity = () => {},
}: {
  visible: boolean;
  setVisiblity?: Function;
}) => {
  const onPress = ({indc = true}: {indc?: boolean}): void => {
    setVisiblity(false);
    setTimeout(() => {
      indc
        ? navigationRef.current.dispatch(StackActions.popToTop())
        : navigationRef.current.navigate('cart');
    }, 700);
  };
  return (
    <Modal
      visible={visible}
      onRequestClose={() => false}
      animationType={'fade'}
      transparent={true}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={Images.check2} style={{width: 120, height: 120}} />
          <Text style={styles.successText}>
            Your Order Successfully Received.
          </Text>
          <Text style={styles.subTile}>
            You can track the delivery in the "Orders" sections.
          </Text>
          <Buttons.ButtonA
            onPress={onPress}
            title="Continue Shopping"
            style={{
              backgroundColor: Colors.red,
              ...styles.btn,
            }}
          />
          <Buttons.ButtonA
            onPress={() => onPress({indc: false})}
            title="Track Your Order"
            textStyle={{color: Colors.Grey6}}
            style={{
              backgroundColor: Colors.transparent,
              ...styles.btn,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparentBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {marginTop: 15},
  subTile: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: TextFamily.ROBOTO_LIGHT,
  },
  successText: {
    width: 260,
    textAlign: 'center',
    marginTop: 30,
    fontSize: 24,
    color: Colors.green,
    fontFamily: TextFamily.ROBOTO_BLACK,
  },
  card: {
    borderRadius: 25,
    backgroundColor: Colors.white,
    padding: 30,
    paddingTop: 50,
    width: WP(85),
    minHeight: WP(90),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default {OrderSuccessFullyReceived};
