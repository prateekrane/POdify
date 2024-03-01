import AuthNavigation from './src/navigation/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar animated={true} backgroundColor="#61dafb" hidden={true} />
        <AuthNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
