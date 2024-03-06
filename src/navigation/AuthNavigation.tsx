import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SignUp from '../views/auth/SignUp';
import SignIn from '../views/auth/SignIn';
import LostPwd from '../views/auth/Lostpwd';
import Verification from '../views/auth/Verification';
import {AuthStackParamsList} from '../@types/navigatoin';
import {useSelector} from 'react-redux';
import {getAuthState} from '../store/auth';
const Stack = createStackNavigator<AuthStackParamsList>();
const AuthNavigation = () => {
  const authState = useSelector(getAuthState);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Lostpwd" component={LostPwd} />
      <Stack.Screen name="Verificatoin" component={Verification} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
