import React, {FC} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import DocumentPicker, {
  DocumentPickerOptions,
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {SupportedPlatforms} from 'react-native-document-picker/lib/typescript/fileTypes';
interface Props {
  icon?: string;
  btnTitle?: string;
  style?: StyleProp<ViewStyle>;
  onSelect(file: DocumentPickerResponse): void;
  options: DocumentPickerOptions<SupportedPlatforms>;
}

const FileSelector: FC<Props> = ({
  icon,
  onSelect,
  options,
  style,
  btnTitle,
}) => {
  let iconImage;
  if (icon) {
    switch (icon) {
      case 'image-outliner.png':
        iconImage = require('../ui/assets/image-outliner.png');
        break;
      case 'file-music-outliner.png':
        iconImage = require('../ui/assets/file-music-outliner.png');
        break;
      case 'radio-on':
        iconImage = require('../ui/assets/radio-on.png');
        break;
      case 'radio-off':
        iconImage = require('../ui/assets/radio-off.png');
        break;
      // Add more cases for each possible icon
      default:
        // Set a default image or handle the case when the icon is not recognized
        iconImage = null;
        break;
    }
  }
  const handleDocumentSelect = async () => {
    try {
      const document = await DocumentPicker.pick(options);
      const file = document[0];
      onSelect(file);
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.log('Error message is:-', error);
      }
    }
  };
  return (
    <TouchableOpacity
      onPress={handleDocumentSelect}
      style={[styles.btnContainer, style]}>
      <View style={styles.iconContainer}>
        {iconImage && <Image source={iconImage} style={styles.icon} />}
      </View>
      <Text style={styles.btnTitle}>{btnTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 70,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: '#045AB4',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  btnTitle: {
    color: '#045AB4',
    marginTop: 5,
  },
});

export default FileSelector;
