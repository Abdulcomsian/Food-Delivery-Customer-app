import React, {Fragment} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Buttons, Inputs} from '@components';
import {Colors} from '@constants';
const NewAddressScreen = ({
  navigation,
  route,
}: {
  navigation: object;
  route: object;
}) => {
  const {top, bottom} = useSafeAreaInsets();
  return (
    <Fragment>
      <View style={styles.screenCont}>
        <Inputs.InputC placeHolder="City" />
        <Inputs.InputC placeHolder="Area" />
        <Inputs.InputC placeHolder="Sub Area" />
        <Inputs.InputC placeHolder="PostCode" />
        <Inputs.InputC placeHolder="Address" area={true} />
      </View>
      <Buttons.ButtonA
        title="Next"
        onPress={() => navigation.navigate('allAddress')}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: Colors.red,
          paddingBottom: bottom,
          height: bottom + 48,
          borderRadius: 0,
        }}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  back: {
    height: 45,
    position: 'absolute',
    top: 15,
    left: 5,
    zIndex: 5,
    borderRadius: 23,
    alignItems: 'center',
  },

  screenCont: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
});

export default NewAddressScreen;
