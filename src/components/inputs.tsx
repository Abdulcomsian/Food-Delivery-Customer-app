import React, {Fragment, useEffect, useState} from 'react';
import DatePicker from 'react-native-modal-datetime-picker';
import {
  TextInput,
  View,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  KeyboardTypeOptions,
  Text,
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
const InputB = ({
  border = true,
  secureTextEntry = false,
  keyboardType = 'default',
  value = '',
  setValue = (e: string) => {},
  style = {},
  placeHolder = '',
}: {
  border?: boolean;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  value?: string;
  setValue?: Function;
  style?: ViewStyle;
  placeHolder?: string;
}) => (
  <View
    style={{
      ...Styles.inputView2,
      ...style,
      ...{borderBottomWidth: border ? 1 : 0},
    }}>
    <Text style={Styles.placeholder}>{placeHolder}</Text>
    <TextInput
      keyboardType={keyboardType}
      returnKeyType={keyboardType === 'phone-pad' ? 'done' : 'default'}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={setValue}
      placeholder={placeHolder}
      placeholderTextColor={Colors.Grey7}
      style={Styles.inputStyle2}
    />
  </View>
);
const InputC = ({
  border = true,
  secureTextEntry = false,
  keyboardType = 'default',
  value = '',
  setValue = (e: string) => {},
  style = {},
  placeHolder = '',
  area = false,
}: {
  area?: boolean;
  border?: boolean;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  value?: string;
  setValue?: Function;
  style?: ViewStyle;
  placeHolder?: string;
}) => (
  <TextInput
    keyboardType={keyboardType}
    returnKeyType={keyboardType === 'phone-pad' ? 'done' : 'default'}
    secureTextEntry={secureTextEntry}
    value={value}
    numberOfLines={area ? 3 : 1}
    onChangeText={setValue}
    placeholder={placeHolder}
    placeholderTextColor={Colors.Grey7}
    style={[
      Styles.inputView3,
      {height: area ? Styles.inputView3.height * 3 : Styles.inputView3.height},
    ]}
  />
);
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
  inputView2: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: Colors.Grey5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    //paddingHorizontal: 20,
    width: '100%',
    marginBottom: 20,
  },
  inputView3: {
    height: 48,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: Colors.Grey1,
    width: '100%',
    marginBottom: 10,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  inputStyle2: {
    textAlignVertical: 'center',
    //width: '100%',
    color: Colors.dark,
    fontSize: 17,
    letterSpacing: -0.41,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  placeholder: {
    color: Colors.Grey5,
    fontSize: 17,
    fontFamily: TextFamily.ROBOTO_REGULAR,
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
export default {InputA, InputB, InputC, InputDatePicker};
