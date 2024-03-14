import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useFetchUploadsByProfile} from '../../hooks/query';
import AudioListLoadingUI from '../../ui/AudioListLoadingUI';
import EmptyRecords from '../../ui/EmptyRecords';
import AudioListItem from '../../ui/AudioListItem';

interface Props {}

const UploadsTab: FC<Props> = props => {
  const {data, isLoading} = useFetchUploadsByProfile();

  // from here to

  if (isLoading) return <AudioListLoadingUI />;

  if (!data?.length)
    return <EmptyRecords title="There is no audio uploaded yet" />;

  return (
    <ScrollView style={styles.container}>
      {data?.map(item => {
        return <AudioListItem audio={item} key={item.id} />;
      })}
    </ScrollView>
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

export default UploadsTab;
