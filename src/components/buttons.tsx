/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text, TextStyle, ViewStyle} from 'react-native';
import {Colors, TextFamily} from '@constants';
import {HeaderBackButton, HeaderBackground} from '@react-navigation/stack';
const ButtonA = ({
  style = {},
  textStyle = {},
  title = '',
  onPress = () => {},
  renderNextIcon = false,
  renderNextIconColor = '#fff',
}: {
  style?: ViewStyle;
  title?: string;
  renderNextIconColor?: string;
  textStyle?: TextStyle;
  onPress?: Function;
  renderNextIcon?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        borderRadius: 6,
        height: 44,
        backgroundColor: Colors.black,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        ...style,
      }}>
      <Text
        style={{
          color: Colors.white,
          fontSize: 17,
          fontFamily: TextFamily.ROBOTO_REGULAR,
          ...textStyle,
        }}>
        {title}
      </Text>
      {renderNextIcon && (
        <HeaderBackButton
          labelVisible={false}
          style={{
            transform: [{rotate: '180deg'}],
            alignSelf: 'flex-end',
            position: 'absolute',
            right: 10,
          }}
          tintColor={renderNextIconColor}
        />
      )}
    </TouchableOpacity>
  );
};

export default {ButtonA};
