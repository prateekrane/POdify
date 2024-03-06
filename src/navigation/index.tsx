import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAuthState,
  updateBusyState,
  updateLoggedInState,
  updateProfile,
} from '../../src/store/auth';
import AuthNavigator from './AuthNavigation';
import TabNavigator from './TabNavigator';
import React from 'react';
import {Keys, getFromAsyncStorage} from '../utils/asyncStorage';
import client from '../api/client';
import Loader from '../ui/Loader';
import {View} from 'react-native';
import colors from '../utils/colors';
import {RootState} from '../store';
import AppNotification from '../components/form/AppNotification';
interface Props {}

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#B0D1F3',
    primary: '#045AB4',
  },
};

const AppNavigator: FC<Props> = props => {
  const {loggedIn, busy} = useSelector(getAuthState);
  // const loggedIn = useSelector(
  //   (state: RootState) => getAuthState(state).loggedIn,
  // );
  // const busy = useSelector((state: RootState) => getAuthState(state).busy);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateBusyState(true));
    const fetchAuthInfo = async () => {
      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        if (!token) {
          //   return dispatch(updateBusyState(false));
        }
        const {data} = await client.get('/auth/is-auth', {
          headers: {Authorization: `Bearer ${token}`},
        });

        dispatch(updateProfile(data.profile));
        dispatch(updateLoggedInState(true));
      } catch (error) {
        console.log('Auth Error: ', error);
      }
      dispatch(updateBusyState(false));
    };
    fetchAuthInfo();
  }, []);

  return (
    <NavigationContainer theme={AppTheme}>
      {/* {busy ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: colors.OVERLAY,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}>
          <Loader />
        </View>
      ) : null} */}
      <AppNotification />
      {loggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
