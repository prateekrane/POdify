import React, {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {Playlist} from '../@types/audio';

interface Props {
  playlist: Playlist;
  onPress?(): void;
}

const PlaylistItem: FC<Props> = ({playlist, onPress}) => {
  const {id, itemsCount, title, visibility} = playlist;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.posterContainer}>
        <Image source={require('../ui/assets/playlisticon.png')} />
      </View>
      <View style={styles.contentContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {title}
        </Text>
        <View style={styles.iconContainer}>
          <Image
            source={
              visibility === 'private'
                ? require('../ui/assets/lock.png')
                : require('../ui/assets/lock.png')
            }
            style={{width: 20, height: 20, alignSelf: 'flex-end'}}
          />
          <Text style={styles.count}>
            {itemsCount}
            {itemsCount > 1 ? ' songs' : ' song'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#9BC9F1',
    margin: 10,
  },
  posterContainer: {
    backgroundColor: '#85B8E4',
    height: 50,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItem: 'center',
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D4778',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    paddingTop: 4,
  },
  count: {
    color: '#0D4778',
  },
});

export default PlaylistItem;
