import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {Colors, TextFamily} from '@constants';
const BadgeSize = 18;
const Badge = ({
  count = 0,
  style = {},
}: {
  count?: number;
  style?: ViewStyle;
}) => {
  return !isNaN(count) && count !== 0 ? (
    <View style={[BadgeStyle.Badge, style]}>
      <Text style={BadgeStyle.BadgeText}>{count + ''}</Text>
    </View>
  ) : null;
};
const BadgeStyle = StyleSheet.create({
  Badge: {
    position: 'absolute',
    backgroundColor: Colors.green,
    top: 5,
    right: 2,
    zIndex: 5,
    minWidth: BadgeSize,
    minHeight: BadgeSize,
    borderRadius: BadgeSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BadgeText: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
});
export default Badge;
