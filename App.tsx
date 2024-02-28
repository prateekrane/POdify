import AuthNavigation from './src/navigation/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar animated={true} backgroundColor="#61dafb" hidden={true} />
      <AuthNavigation />
    </NavigationContainer>
  );
};

export default App;
