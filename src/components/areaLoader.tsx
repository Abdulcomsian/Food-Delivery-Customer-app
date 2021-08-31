import React from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet} from 'react-native';

const source = require('../assets/lottie/lf30_editor_fo9zrqeg.json');

const Loader = ({
  animateIt = true,
  height = 0,
}: {
  animateIt?: boolean;
  height?: number;
}) => {
  return (
    <View style={[LoaderStyle.cont, height !== 0 && {height}]}>
      {animateIt && (
        <LottieView
          style={LoaderStyle.LottieView}
          source={source}
          autoPlay
          loop
        />
      )}
    </View>
  );
};
const LoaderStyle = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LottieView: {height: 200, width: 200},
});
export default Loader;
