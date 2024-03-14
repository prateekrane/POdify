import React, {FC} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {UserProfile} from '../store/auth';
import AvatarField from '../ui/AvatarField';
import {number} from 'yup';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ProfileNavigatorStackParamList} from '../@types/navigatoin';

interface Props {
  profile?: UserProfile | null;
}

const ProfileContainer: FC<Props> = ({profile}) => {
  const {navigate} =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();
  if (!profile) return null;
  return (
    <View style={styles.container}>
      <AvatarField source={profile.avatar} />
      <View>
        <Text style={styles.profileName}>{profile.name}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.email}>{profile.email}</Text>
          <Image
            source={require('../ui/assets/verified.png')}
            style={{height: 20, width: 20}}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.profileActionLink}>
            Followers:-
            {profile.followers}
          </Text>
          <Text style={styles.profileActionLink}>
            Following:-
            {profile.followings === undefined ? 0 : profile.followings}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigate('ProfileSettings')}>
        <Image
          source={require('../ui/assets/setting.png')}
          style={styles.settingIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileContainer;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0E5999',
  },
  email: {
    color: '#0A79D8',
    marginRight: 10,
  },
  profileActionLink: {
    backgroundColor: '#6292BB',
    color: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 5,
  },
  settingIcon: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
