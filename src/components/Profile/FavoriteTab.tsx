import React, {FC} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {useFetchFavorite} from '../../hooks/query';
import AudioListLoadingUI from '../../ui/AudioListLoadingUI';
import EmptyRecords from '../../ui/EmptyRecords';
import AudioListItem from '../../ui/AudioListItem';

interface Props {}

const FavoriteTab: FC<Props> = props => {
  const {data, isLoading} = useFetchFavorite();

  if (isLoading) return <AudioListLoadingUI />;

  if (!data?.length)
    return <EmptyRecords title="There is no Favorite audio yet" />;
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
});

export default FavoriteTab;
