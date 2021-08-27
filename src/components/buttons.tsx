/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text, TextStyle, ViewStyle} from 'react-native';
import {Colors, TextFamily} from '@constants';
const ButtonA = ({
  style = {},
  textStyle = {},
  title = '',
  onPress = () => {},
}: {
  style?: ViewStyle;
  title?: string;
  textStyle?: TextStyle;
  onPress?: Function;
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
    </TouchableOpacity>
  );
};

export default {ButtonA};
