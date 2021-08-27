import React, {Fragment} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Buttons, Inputs} from '@components';
import {Colors, Images} from '@constants';
const PickUpStoreSearch = ({
  route,
  navigation,
}: {
  route: object;
  navigation: object;
}) => {
  const {top, bottom} = useSafeAreaInsets();
  return (
    <Fragment>
      <View style={Styles.cont}>
        <Inputs.InputC placeHolder="Search" icon={Images.search} />
        <Inputs.InputC placeHolder="City" />
        <Inputs.InputC placeHolder="Store" />
      </View>
      <Buttons.ButtonA
        title="Next"
        onPress={() => navigation.navigate('home')}
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

const Styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
});
export default PickUpStoreSearch;
