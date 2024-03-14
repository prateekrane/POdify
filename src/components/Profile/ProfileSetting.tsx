import AvatarField from '../../ui/AvatarField';
import ImageCropPicker from 'react-native-image-crop-picker';
import colors from '../../utils/colors';
import React, {FC, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  PermissionsAndroid,
} from 'react-native';

import AppButton from '../../ui/Appbutton';
import {getClient} from '../../api/client';
import catchAsyncError from '../../api/catchError';
import {upldateNotification} from '../../store/notification';
import {useDispatch, useSelector} from 'react-redux';
import {Keys, removeFromAsyncStorage} from '../../utils/asyncStorage';
import {
  getAuthState,
  updateLoggedInState,
  updateProfile,
} from '../../store/auth';
import deepEqual from 'deep-equal';
import ImagePicker from 'react-native-image-crop-picker';
import {getPermissionToReadImages} from '../../utils/Helper';
interface Props {}
interface ProfileInfo {
  name: string;
  avatar?: string;
}

const ProfileSettings: FC<Props> = props => {
  // const [busy, setBusy] = useState(false);
  const [userInfo, setUserInfo] = useState<ProfileInfo>({name: ''});
  const dispatch = useDispatch();
  const {profile} = useSelector(getAuthState);

  const isSame = deepEqual(userInfo, {
    name: profile?.name,
    avatar: profile?.avatar,
  });

  const handleLogout = async (fromAll?: boolean) => {
    try {
      const endpoint = '/auth/log-out?fromAll=' + (fromAll ? 'yes' : '');
      const client = await getClient();
      await client.post(endpoint);
      await removeFromAsyncStorage(Keys.AUTH_TOKEN);
      dispatch(updateProfile(null));
      dispatch(updateLoggedInState(false));
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(upldateNotification({message: errorMessage, type: 'error'}));
    }
  };
  const handleSubmit = async () => {
    // setBusy(true);
    try {
      if (!userInfo.name.trim())
        return dispatch(
          upldateNotification({message: 'Name is required', type: 'error'}),
        );
      const fromData = new FormData();
      fromData.append('name', userInfo.name);

      if (userInfo.avatar) {
        fromData.append('avatar', {
          name: 'avatar',
          type: 'image/png',
          uri: userInfo.avatar,
        });
      }

      const client = await getClient({'Content-Type': 'multipart/form-data'});
      const {data} = await client.post('/auth/update-profile', fromData);
      dispatch(updateProfile(data.profile));
      dispatch(
        upldateNotification({message: 'Profile updated', type: 'success'}),
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(upldateNotification({message: errorMessage, type: 'error'}));
    }
    // setBusy(false);
  };

  const handleImageSelect = async () => {
    try {
      await getPermissionToReadImages();
      const {path} = await ImagePicker.openPicker({
        cropping: true,
        width: 300,
        height: 300,
      });
      setUserInfo({...userInfo, avatar: JSON.stringify(path)});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (profile) setUserInfo({name: profile.name, avatar: profile.avatar});
  }, [profile]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile Settings</Text>
      </View>

      <View style={styles.settingOptionsContainer}>
        <View style={styles.avatarContainer}>
          <AvatarField source={userInfo?.avatar} />

          <TouchableOpacity
            onPress={handleImageSelect}
            style={styles.paddingLeft}>
            <Text style={styles.linkText}>Update Profile Image</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          onChangeText={text => {
            setUserInfo({...userInfo, name: text});
          }}
          style={styles.nameInput}
          value={userInfo.name}
        />
        <View style={styles.emailConainer}>
          <Text style={styles.email}>{profile?.email}</Text>
          <Image
            source={require('../../ui/assets/verified.png')}
            style={{height: 20, width: 20}}
          />
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Logout</Text>
      </View>

      <View style={styles.settingOptionsContainer}>
        <TouchableOpacity
          onPress={() => {
            handleLogout(true);
          }}
          style={styles.logoutBtn}>
          <Image
            source={require('../../ui/assets/logout.png')}
            style={{height: 24, width: 24}}
          />
          <Text style={styles.logoutBtnTitle}>Logout From All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleLogout();
          }}
          style={styles.logoutBtn}>
          <Image
            source={require('../../ui/assets/logout.png')}
            style={{height: 24, width: 24}}
          />
          <Text style={styles.logoutBtnTitle}>Logout</Text>
        </TouchableOpacity>
      </View>

      {!isSame ? (
        <View style={styles.marginTop}>
          <AppButton onPress={handleSubmit} title="Update" borderRadius={7} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#073567',
    paddingBottom: 5,
    marginTop: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#13549B',
  },
  settingOptionsContainer: {
    marginTop: 15,
    paddingLeft: 15,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: '#073567',
    fontStyle: 'italic',
  },
  paddingLeft: {
    paddingLeft: 15,
  },
  nameInput: {
    color: '#073567',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#073567',
    borderRadius: 7,
    marginTop: 15,
  },
  emailConainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  email: {
    color: '#073567',
    marginRight: 10,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  logoutBtnTitle: {
    color: colors.CONTRAST,
    fontSize: 18,
    marginLeft: 5,
  },
  marginTop: {
    marginTop: 15,
  },
});

export default ProfileSettings;
