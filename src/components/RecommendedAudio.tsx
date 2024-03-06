import React, {FC} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

import {useFetchRecommendedAudios} from '../hooks/query';
import GridView from '../ui/GridView';
import PulseAnimationContainer from '../ui/PulseAnimationContainer';
import colors from '../utils/colors';

interface Props {}

const dummyData = new Array(6).fill('');

const RecommendedAudios: FC<Props> = props => {
  const {data, isLoading} = useFetchRecommendedAudios();

  const getPoster = (poster?: string) => {
    return poster ? {uri: poster} : require('../ui/assets/music.jpeg');
  };
  if (isLoading) {
    return (
      <PulseAnimationContainer>
        <View style={styles.container}>
          <View style={styles.dummyTitleView} />
          <GridView
            col={3}
            data={dummyData}
            renderItem={item => {
              return (
                <View
                  style={{
                    width: '100%',
                    aspectRatio: 1,
                    backgroundColor: colors.INACTIVE_CONTRAST,
                    borderRadius: 5,
                  }}
                />
              );
            }}
          />
        </View>
      </PulseAnimationContainer>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Uploads</Text>
      <GridView
        col={3}
        data={data || []}
        renderItem={item => {
          return (
            <TouchableOpacity>
              <Image
                source={getPoster(item.poster)}
                style={{width: '100%', aspectRatio: 1, borderRadius: 7}}
              />
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dummyTitleView: {
    height: 20,
    width: 150,
    backgroundColor: colors.INACTIVE_CONTRAST,
    marginBottom: 15,
    borderRadius: 5,
    // marginTop: 10,
  },
  dummyAudioView: {
    height: 100,
    width: 100,
    backgroundColor: colors.INACTIVE_CONTRAST,
    marginRight: 15,
    borderRadius: 5,
  },
  dummyAudioContainer: {
    flexDirection: 'row',
  },
});

export default RecommendedAudios;
