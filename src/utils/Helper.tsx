import {PermissionsAndroid} from 'react-native';

export const getPermissionToReadImages = async () => {
  await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    PermissionsAndroid.PERMISSIONS.CAMERA,
  ]);
};
