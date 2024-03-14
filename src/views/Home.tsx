import React, {FC, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useFetchLatestAudios, useFetchPlaylist} from '../hooks/query';
import {Pressable} from 'react-native';
import LatestUploads from '../components/LatestUploads';
import RecommendedAudio from '../components/RecommendedAudio';
import OptionsModal from '../components/OptionsModel';
import {AudioData, Playlist} from '../@types/audio';

import {Keys, getFromAsyncStorage} from '../utils/asyncStorage';
import catchAsyncError from '../api/catchError';
import {useDispatch} from 'react-redux';
import {upldateNotification} from '../store/notification';
import PlayListModal from '../components/PlayListModal';
import PlaylistForm, {PlaylistInfo} from '../components/form/PLaylistForm';
import {getClient} from '../api/client';

interface Props {}

const Home: FC<Props> = props => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AudioData>();
  const [showPlaylistsModal, setShowPlaylistsModal] = useState(false);

  const [showPlaylistForm, setShowPlaylistForm] = useState(false);

  const {data} = useFetchPlaylist();

  const dispatch = useDispatch();
  const handleOnFavPress = async () => {
    if (!selectedAudio) return;
    //send request with the audio id that we want to add to fav
    try {
      const client = await getClient();
      const {data} = await client.post('/favorite?audioId=' + selectedAudio.id);
      setSelectedAudio(undefined);
      setShowOptions(false);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(upldateNotification({message: errorMessage, type: 'error'}));
    }
  };

  // if (isLoading)
  //   return (
  //     <View style={styles.container}>
  //       <Text style={{color: 'black', fontSize: 25}}>Loading</Text>
  //     </View>
  //   );
  const handleOnLongPress = (audio: AudioData) => {
    setSelectedAudio(audio);
    setShowOptions(true);
  };
  const handleOnAddToPlaylist = () => {
    setShowOptions(false);
    setShowPlaylistsModal(true);
  };
  const handlePlaylistSubmit = async (value: PlaylistInfo) => {
    if (!value.title.trim()) return;

    try {
      const client = await getClient();
      const {data} = await client.post('/playlist/create', {
        resId: selectedAudio?.id,
        title: value.title,
        visibility: value.private ? 'private' : 'public',
      });

      console.log(data);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      console.log(errorMessage);
    }
  };

  const updatePlaylist = async (item: Playlist) => {
    try {
      const client = await getClient();
      const {data} = await client.patch('/playlist', {
        id: item.id,
        item: selectedAudio?.id,
        title: item.title,
        visibility: item.visibility,
      });

      setSelectedAudio(undefined);
      setShowPlaylistsModal(false);
      dispatch(
        upldateNotification({
          message: 'New audio added.' + item.title,
          type: 'success',
        }),
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      console.log(errorMessage);
    }
  };
  return (
    <View style={styles.container}>
      <LatestUploads
        onAudioPress={item => {
          console.log(item);
        }}
        onAudioLongPress={handleOnLongPress}
      />
      <RecommendedAudio
        onAudioPress={item => {
          console.log(item);
        }}
        onAudioLongPress={handleOnLongPress}
      />
      <OptionsModal
        visible={showOptions}
        onRequestClose={() => {
          setShowOptions(false);
        }}
        options={[
          {
            title: 'Add to playlist',
            icon: require('../ui/assets/app_playlist.png'),
            onPress: handleOnAddToPlaylist,
          },
          {
            title: 'Add to favorites',
            icon: require('../ui/assets/heart.png'),
            onPress: handleOnFavPress,
          },
        ]}
        renderItem={item => {
          return (
            <TouchableOpacity
              onPress={item.onPress}
              style={styles.optionContainer}>
              <Image source={item.icon} style={{width: 30, height: 30}} />
              <Text style={styles.optionTitle}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <PlayListModal
        visible={showPlaylistsModal}
        onRequestClose={() => setShowPlaylistsModal(false)}
        list={data || []}
        onCreateNewPress={() => {
          setShowPlaylistsModal(false);
          setShowPlaylistForm(true);
        }}
        onPlaylistPress={updatePlaylist}
      />
      <PlaylistForm
        visible={showPlaylistForm}
        onRequestClose={() => setShowPlaylistForm(false)}
        onSubmit={handlePlaylistSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  optionContainer: {
    flexDirection: 'row',

    paddingVertical: 10,
  },
  optionTitle: {
    color: 'black',
    fontSize: 16,
    alignItems: 'center',
    marginLeft: 5,
  },
});

export default Home;
