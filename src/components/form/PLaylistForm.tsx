import React, {FC, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import BasicModalContainer from '../../ui/BasicModalContainer';

import colors from '../../utils/colors';

export interface PlaylistInfo {
  title: string;
  private: boolean;
}

interface Props {
  visible: boolean;
  onRequestClose(): void;
  onSubmit(value: PlaylistInfo): void;
}

const PlaylistForm: FC<Props> = ({visible, onSubmit, onRequestClose}) => {
  const [playlistInfo, setPlaylistInfo] = useState({
    title: '',
    private: false,
  });
  const handleSubmit = () => {
    onSubmit(playlistInfo);
    handleClose();
  };

  const handleClose = () => {
    setPlaylistInfo({title: '', private: false});
    onRequestClose();
  };
  return (
    <BasicModalContainer visible={visible} onRequestClose={handleClose}>
      <View>
        <Text style={styles.title}>Create New Playlist</Text>
        <TextInput
          onChangeText={txt => {
            setPlaylistInfo({...playlistInfo, title: txt});
          }}
          placeholder="Title"
          placeholderTextColor={'#548ABD'}
          style={styles.input}
          value={playlistInfo.title}
        />
        <TouchableOpacity
          onPress={() => {
            setPlaylistInfo({...playlistInfo, private: !playlistInfo.private});
          }}
          style={styles.privateSelector}>
          {playlistInfo.private ? (
            // <FileSelector icon="radio-on" />
            <TouchableOpacity>
              <Image
                source={require('../../ui/assets/radio-on.png')}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          ) : (
            // <FileSelector icon="radio-off" />
            <TouchableOpacity>
              <Image
                source={require('../../ui/assets/radio-off.png')}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          )}
          <Text style={styles.privateLabel}>Private</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
          <Text style={{color: '#033B6D'}}>Create</Text>
        </TouchableOpacity>
      </View>
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: '#033B6D',
    fontWeight: '700',
  },
  input: {
    height: 45,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    color: '#033C71',
  },
  privateSelector: {
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
  },
  privateLabel: {
    color: colors.PRIMARY,
    marginLeft: 5,
  },
  submitBtn: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    borderRadius: 7,
    backgroundColor: '#9DC9F0',
  },
});

export default PlaylistForm;
