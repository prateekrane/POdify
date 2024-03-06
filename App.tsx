import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';
import AppNavigator from './src/navigation';
import {clearAsyncStorage} from './src/utils/asyncStorage';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StatusBar animated={true} backgroundColor="#61dafb" hidden={true} />
        <AppNavigator />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
