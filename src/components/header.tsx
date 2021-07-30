import React, {Fragment} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Images, TextFamily} from '../constants';
import Badge from './badge';
import {navigate} from '../navigator/navigationHelper';
import {useDispatch, useSelector} from 'react-redux';
import Actions from '../redux/actions';
import getShadow from '../utils/shadow';
import {InitialUserInterface} from '../constants/interfaces';
const activeOpacity = 0.85;
const HeaderA = ({
  navigation,
  title = '',
  renderRight = true,
  renderChild1 = false,
}: {
  navigation?: any;
  title?: string;
  renderRight?: boolean;
  renderChild1?: boolean;
}) => {
  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {loggedIn} = useSelector(
    ({USER}: {USER: InitialUserInterface}) => USER,
  );
  return (
    <View
      style={[HeaderAStyle.headerCont, {height: 56 + top, paddingTop: top}]}>
      <View style={HeaderAStyle.headerSubCont}>
        <View style={HeaderAStyle.LeftCont}>
          <TouchableOpacity activeOpacity={activeOpacity}>
            <Text style={HeaderAStyle.smallText}>Deliver to</Text>
            <View style={HeaderAStyle.rowify}>
              <Text style={HeaderAStyle.normalText}>Selected Location</Text>
              <Image source={Images.dropDown} style={HeaderAStyle.dropDown} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={HeaderAStyle.rightLeftCont}>
          {renderRight && (
            <Fragment>
              {renderChild1 ? (
                <TouchableOpacity
                  style={HeaderAStyle.nBtn}
                  activeOpacity={activeOpacity}>
                  <Badge count={7} />
                  <Image
                    source={Images.notification}
                    style={HeaderAStyle.notification}
                  />
                </TouchableOpacity>
              ) : (
                <View style={HeaderAStyle.nBtn} />
              )}
              <TouchableOpacity
                style={HeaderAStyle.Btn}
                onPress={() => {
                  loggedIn
                    ? navigate('profile')
                    : Actions.toggleBottomLogin()(dispatch);
                }}
                activeOpacity={activeOpacity}>
                <Image source={Images.avatar} style={HeaderAStyle.avatar} />
              </TouchableOpacity>
            </Fragment>
          )}
        </View>
      </View>
    </View>
  );
};
const HeaderB = ({
  navigation,
  title = '',
}: {
  navigation?: any;
  title?: string;
}) => {
  const {top} = useSafeAreaInsets();
  return (
    <View
      style={[
        HeaderAStyle.headerCont,
        {height: 56 + top, paddingTop: top, ...getShadow(1)},
      ]}>
      <View style={[HeaderAStyle.headerSubCont, {justifyContent: 'center'}]}>
        <Text style={[HeaderAStyle.title, {fontSize: 18}]}>{title}</Text>
      </View>
    </View>
  );
};
const SearchBar = () => {
  const dispatch = useDispatch();
  return (
    <View style={SearchBarStyle.container}>
      <View style={SearchBarStyle.searchView}>
        <TouchableOpacity style={SearchBarStyle.Btn}>
          <Image style={SearchBarStyle.icon} source={Images.search} />
        </TouchableOpacity>
        <TextInput
          style={SearchBarStyle.searchInput}
          placeholder={'Search'}
          placeholderTextColor={Colors.Grey5}
          returnKeyType="search"
          onSubmitEditing={() => {}}
        />
        <TouchableOpacity
          style={SearchBarStyle.Btn}
          onPress={() => {
            Actions.toggleBottomFilter()(dispatch);
          }}
          activeOpacity={activeOpacity}>
          <Image style={SearchBarStyle.icon} source={Images.filter} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const HeaderAStyle = StyleSheet.create({
  LeftCont: {},
  dropDown: {width: 12, height: 12, resizeMode: 'contain', marginLeft: 15},
  rightLeftCont: {
    flexDirection: 'row',
    width: 48 + 35,
  },
  smallText: {
    color: Colors.Grey5,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    fontSize: 13,
  },
  normalText: {
    color: Colors.dark,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    fontSize: 16,
  },
  rowify: {flexDirection: 'row', alignItems: 'center'},
  headerCont: {
    width: wp(100),
    backgroundColor: Colors.white,
    paddingLeft: 15,
    paddingRight: 12,
    zIndex: 5,
  },
  title: {
    fontSize: 16,
    marginRight: 3,
    width: wp(45),
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  menuIcon: {width: 21, height: 21},
  notification: {width: 23, height: 23, resizeMode: 'contain'},
  Btn: {
    width: 48,
    height: 48,
    justifyContent: 'center',
  },
  nBtn: {
    width: 35,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {width: 48, height: 48, resizeMode: 'contain'},
  headerSubCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
const SearchBarStyle = StyleSheet.create({
  container: {
    height: 56,
    zIndex: 3,
    paddingHorizontal: 15,
    alignItems: 'center',
    ...getShadow(3),
  },
  searchView: {
    height: 48,
    width: '100%',
    borderRadius: 8,
    backgroundColor: Colors.Grey1,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    //paddingBottom: 0,
    paddingHorizontal: 2,
    fontSize: 16,
  },
  icon: {width: 22, height: 22, resizeMode: 'contain'},
});
export default {HeaderA, SearchBar, HeaderB};
