import React, {Fragment} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import MapView, {Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import getShadow from '../../utils/shadow';
import {Buttons, Inputs} from '../../components';
import {Colors, Images, TextFamily} from '../../constants';
import {ScrollView} from 'react-native-gesture-handler';
const AllAddressScreen = ({
  navigation,
  route,
}: {
  navigation: object;
  route: object;
}) => {
  const {top, bottom} = useSafeAreaInsets();
  return (
    <Fragment>
      <ScrollView
        style={styles.screenCont}
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 15,
        }}>
        {[1, 2, 3].map((item, index) => (
          <TouchableOpacity
            key={'_add' + index}
            style={{
              ...getShadow(3),
              height: 85,
              marginVertical: 6,
              padding: 10,
              justifyContent: 'center',
              borderRadius: 8,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: TextFamily.ROBOTO_REGULAR,
                color: Colors.dark,
              }}>
              Your Address
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 12,
              }}>
              <Image
                source={Images.house}
                style={{width: 30, height: 30, backgroundColor: Colors.Grey6}}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: TextFamily.ROBOTO_REGULAR,
                  color: Colors.Grey5,
                  marginLeft: 10,
                }}>
                Store: Delivery Store
              </Text>
            </View>
            <Check checked={index === 2} />
          </TouchableOpacity>
        ))}
        <View
          style={{
            height: 60,
            width: '100%',
            paddingLeft: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.white,
          }}>
          <Text
            onPress={() => {}}
            style={{
              fontFamily: TextFamily.ROBOTO_REGULAR,
              fontSize: 16,
              color: Colors.red,
              textDecorationLine: 'underline',
            }}>
            Add New Address +
          </Text>
        </View>
      </ScrollView>

      <Buttons.ButtonA
        title="Next"
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
const Check = ({checked = false}: {checked?: boolean}) => {
  return (
    <View
      style={{
        position: 'absolute',
        width: 45,
        height: 45,
        top: 25,
        right: 10,
        zIndex: 5,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: checked ? Colors.green : Colors.Grey1,
        backgroundColor: checked ? Colors.white : Colors.Grey1,
      }}>
      <Image
        source={checked ? Images.ok2 : Images.ok}
        resizeMode={'contain'}
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
        }}
      />
    </View>
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
  },
});

export default AllAddressScreen;
