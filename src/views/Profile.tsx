import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UploadTab from '../components/Profile/UploadsTab';
import FavoriteTab from '../components/Profile/FavoriteTab';
import HistoryTab from '../components/Profile/HistoryTab';
import PlaylistTab from '../components/Profile/PlaylistTab';
import ProfileContainer from '../components/ProfileContainer';
import {useSelector} from 'react-redux';
import {getAuthState} from '../store/auth';

const Tab = createMaterialTopTabNavigator();

interface Props {}

const Profile: FC<Props> = props => {
  const {profile} = useSelector(getAuthState);
  return (
    <View style={styles.container}>
      <ProfileContainer profile={profile} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabbbarStyle,
          tabBarLabelStyle: styles.tabbarLabelStyle,
          tabBarIndicatorStyle: {backgroundColor: '#C2D7EA'},
        }}>
        <Tab.Screen name="Uploads" component={UploadTab} />
        <Tab.Screen name="Playlist" component={PlaylistTab} />
        <Tab.Screen name="Favorites" component={FavoriteTab} />
        <Tab.Screen name="Histories" component={HistoryTab} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbbarStyle: {
    backgroundColor: '#0E3355',
    marginBottom: 10,
  },
  tabbarLabelStyle: {
    color: '#C2D7EA',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default Profile;
