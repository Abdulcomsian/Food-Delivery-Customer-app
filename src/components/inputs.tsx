import React, {Fragment, useEffect, useState} from 'react';
import DatePicker from 'react-native-modal-datetime-picker';
import {
  TextInput,
  View,
  ViewStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  KeyboardTypeOptions,
} from 'react-native';
import {Colors, TextFamily} from '../constants';
import {getCustomData} from '../utils/libs';
const InputA = ({
  secureTextEntry = false,
  keyboardType = 'default',
  value = '',
  setValue = (e: string) => {},
  style = {},
  placeHolder = '',
}: {
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  value?: string;
  setValue?: Function;
  style?: ViewStyle;
  placeHolder?: string;
}) => {
  return (
    <View style={{...Styles.inputView, ...style}}>
      <TextInput
        keyboardType={keyboardType}
        returnKeyType={keyboardType === 'phone-pad' ? 'done' : 'default'}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={setValue}
        placeholder={placeHolder}
        placeholderTextColor={Colors.Grey7}
        style={Styles.inputStyle}
      />
    </View>
  );
};
const InputDatePicker = ({
  secureTextEntry = false,
  value = new Date(),
  setValue = e => {},
  style = {},
  placeHolder = '',
}: {
  secureTextEntry?: boolean;
  value?: Date | String;
  setValue?: Function;
  style?: ViewStyle;
  placeHolder?: string;
}) => {
  const [visible, setVisible] = useState(false);
  const [localDate, setLocalDate] = useState(new Date());
  return (
    <View style={{...Styles.inputView, ...style}}>
      <DatePicker
        display={'inline'}
        textColor={Colors.black}
        themeVariant="light"
        isDarkModeEnabled={false}
        date={new Date()}
        mode="date"
        isVisible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onConfirm={date => {
          setVisible(false);
          setValue(date);
        }}
        onHide={() => {}}
        maximumDate={new Date()}
      />
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
        activeOpacity={0.85}
        style={Styles.overlay}
      />
      <TextInput
        contextMenuHidden={true}
        selectTextOnFocus={false}
        editable={false}
        secureTextEntry={secureTextEntry}
        value={value ? getCustomData(value) : ''}
        placeholder={placeHolder}
        placeholderTextColor={Colors.Grey7}
        style={Styles.inputStyle}
      />
    </View>
  );
};
const Styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 5,
  },
  inputView: {
    borderRadius: 6,
    height: 44,
    backgroundColor: Colors.GreyTransparent5,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  inputStyle: {
    height: '90%',
    textAlignVertical: 'center',
    width: '100%',
    fontSize: 17,
    letterSpacing: -0.41,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
});
export default {InputA, InputDatePicker};
