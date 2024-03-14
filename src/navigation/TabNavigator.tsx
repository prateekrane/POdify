import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../views/Home';
import Profile from '../views/Profile';

import Uplaod from '../views/Uplaod';
import colors from '../utils/colors';
import {View, Image} from 'react-native';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#B0D1F3',
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {fontSize: 15, fontWeight: 'bold'},
          tabBarIcon: () => {
            return (
              <View>
                <Image
                  source={require('../ui/assets/home.png')}
                  style={{width: 20, height: 20}}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {fontSize: 15, fontWeight: 'bold'},
          tabBarIcon: () => {
            return (
              <View>
                <Image
                  source={require('../ui/assets/profile.png')}
                  style={{width: 20, height: 20}}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="UploadScreen"
        component={Uplaod}
        options={{
          tabBarLabel: 'Upload',
          tabBarLabelStyle: {fontSize: 15, fontWeight: 'bold'},
          tabBarIcon: () => {
            return (
              <View>
                <Image
                  source={require('../ui/assets/upload.png')}
                  style={{width: 20, height: 20}}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
