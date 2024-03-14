import React, {FC} from 'react';

import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {AudioData} from '../@types/audio';

interface Props {
  audio: AudioData;
  onPress?(): void;
}

const AudioListItem: FC<Props> = ({audio, onPress}) => {
  const getSource = (poster?: string) => {
    return poster ? {uri: poster} : require('../ui/assets/music.jpeg');
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.listItem} key={audio.id}>
      <Image source={getSource(audio.poster)} style={styles.poster} />
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {audio.title}
        </Text>
        <Text style={styles.Owner} numberOfLines={1} ellipsizeMode="tail">
          by:-
          {audio.owner.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  poster: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  title: {
    color: '#306696',
    fontWeight: '700',
  },
  Owner: {
    color: '#0D375C',
    fontWeight: '700',
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#9BC9F1',
    marginBottom: 15,
    borderRadius: 5,
    margin: 10,
  },
  titleContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AudioListItem;
