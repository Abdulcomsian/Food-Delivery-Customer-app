import React, {Fragment, useState} from 'react';
import DatePicker from 'react-native-modal-datetime-picker';
import {
  View,
  Text,
  Image,
  TextInput,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  KeyboardTypeOptions,
} from 'react-native';
import {Colors, TextFamily} from '@constants';
const InputA = ({
  secureTextEntry = false,
  keyboardType = 'default',
  value = '',
  setValue = () => {},
  style = {},
  placeHolder = '',
  max = 0,
  error = '',
}: {
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  value?: string;
  setValue?: Function;
  style?: ViewStyle;
  placeHolder?: string;
  max?: number;
  error: string;
}) => {
  return (
    <Fragment>
      <View
        style={{
          ...Styles.inputView,
          ...style,
          borderWidth: error ? StyleSheet.hairlineWidth : 0,
        }}>
        <TextInput
          keyboardType={keyboardType}
          returnKeyType={keyboardType === 'phone-pad' ? 'done' : 'default'}
          secureTextEntry={secureTextEntry}
          value={value}
          maxLength={max ? max : undefined}
          onChangeText={e => setValue(e)}
          placeholder={placeHolder}
          placeholderTextColor={Colors.Grey7}
          style={Styles.inputStyle}
        />
      </View>
      <Errorify error={error} />
    </Fragment>
  );
};
const InputDatePicker = ({
  value = new Date(),
  setValue = e => {},
  style = {},
  placeHolder = '',
  error = '',
}: {
  error: string;
  value?: Date | String;
  setValue?: Function;
  style?: ViewStyle;
  placeHolder?: string;
}) => {
  const [visible, setVisible] = useState(false);
  const [localDate, setLocalDate] = useState(new Date());
  return (
    <Fragment>
      <View
        style={{
          ...Styles.inputView,
          ...style,
          borderWidth: error ? StyleSheet.hairlineWidth : 0,
        }}>
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
          value={value ? value : ''}
          placeholder={placeHolder}
          placeholderTextColor={Colors.Grey7}
          style={Styles.inputStyle}
        />
      </View>
      <Errorify error={error} />
    </Fragment>
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
  error = '',
}: {
  border?: boolean;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  value?: string;
  setValue?: Function;
  style?: ViewStyle;
  placeHolder?: string;
  error: string;
}) => (
  <Fragment>
    <View
      style={{
        ...Styles.inputView2,
        ...style,
        borderBottomWidth: border ? 1 : 0,
        borderWidth: error ? StyleSheet.hairlineWidth : 0,
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
    <Errorify error={error} />
  </Fragment>
);
const InputC = ({
  icon = undefined,
  secureTextEntry = false,
  keyboardType = 'default',
  value = '',
  setValue = (e: string) => {},
  style = {},
  placeHolder = '',
  area = false,
  error = '',
}: {
  error?: string;
  icon?: any;
  area?: boolean;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  value?: string;
  setValue?: Function;
  style?: ViewStyle;
  placeHolder?: string;
}) => (
  <Fragment>
    <View
      style={[
        Styles.inputView3A,
        {
          height: area
            ? Styles.inputView3.height * 3
            : Styles.inputView3.height,
          borderWidth: error ? StyleSheet.hairlineWidth : 0,
        },
      ]}>
      {icon !== undefined && (
        <Image source={icon} style={{width: 30, height: 30, marginLeft: 8}} />
      )}
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
          {
            marginBottom: 0,
            height: area
              ? Styles.inputView3.height * 3
              : Styles.inputView3.height,
            borderWidth: error ? 1 : 0,
          },
        ]}
      />
    </View>
    <Errorify error={error} />
  </Fragment>
);
const Errorify = ({error = ''}: {error?: string}) =>
  error !== '' ? <Text style={Styles.error}>{error}</Text> : null;
const Styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 5,
  },
  error: {
    color: Colors.red,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    fontSize: 12,
    paddingHorizontal: 35,
  },
  inputView: {
    borderRadius: 6,
    height: 44,
    backgroundColor: Colors.GreyTransparent5,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 5,
    borderColor: 'red',
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
    flex: 1,
    marginBottom: 10,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  inputView3A: {
    borderRadius: 8,
    backgroundColor: Colors.Grey1,
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
