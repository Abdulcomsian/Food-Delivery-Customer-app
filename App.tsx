/* eslint-disable react-native/no-inline-styles */
/**
 * @format
 **/
import React from 'react';
import {View} from 'react-native';
import {Colors} from './src/constants';
import MainNavigator from './src/navigator';
import {Store, persistor} from './src/redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const App = () => {
  return (
    <MenuProvider>
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <SafeAreaProvider>
          <Provider store={Store}>
            <PersistGate loading={null} persistor={persistor}>
              <MainNavigator />
            </PersistGate>
          </Provider>
        </SafeAreaProvider>
      </View>
    </MenuProvider>
  );
};

export default App;
