import React, {FC, ReactNode} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';

import {Playlist} from '../@types/audio';
import BasicModalContainer from '../ui/BasicModalContainer';
import colors from '../utils/colors';

interface Props {
  visible: boolean;
  onRequestClose(): void;
  list: Playlist[];
  onCreateNewPress(): void;
  onPlaylistPress(item: Playlist): void;
}

interface ListItemProps {
  title: string;
  icon: ReactNode;
  onPress?(): void;
}

const ListItem: FC<ListItemProps> = ({title, icon, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.listItemContainer}>
      {icon}
      <Text style={styles.listItemTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const PlayListModal: FC<Props> = ({
  list,
  visible,
  onCreateNewPress,
  onRequestClose,
  onPlaylistPress,
}) => {
  return (
    <BasicModalContainer visible={visible} onRequestClose={onRequestClose}>
      {/* we want to render playlists */}
      <ScrollView>
        {list.map(item => {
          return (
            <ListItem
              onPress={() => {
                onPlaylistPress(item);
              }}
              key={item.id}
              icon={
                <Image
                  source={
                    item.visibility === 'public'
                      ? require('../ui/assets/global.png')
                      : require('../ui/assets/lock.png')
                  }
                  style={{width: 25, height: 25}}
                />
              }
              title={item.title}
            />
          );
        })}
      </ScrollView>

      {/* create playlist (new) button */}
      <ListItem
        icon={
          <Image
            source={require('../ui/assets/plus.png')}
            style={{width: 25, height: 25}}
          />
        }
        title="Create New"
        onPress={onCreateNewPress}
      />
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
  listItemContainer: {flexDirection: 'row', alignItems: 'center', height: 45},
  listItemTitle: {fontSize: 16, color: colors.PRIMARY, marginLeft: 5},
});

export default PlayListModal;
