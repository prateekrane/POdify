import React, {FC} from 'react';
import {View, StyleSheet, Text, Button, Image, ScrollView} from 'react-native';
import {useFetchLatestAudios} from '../hooks/query';
import {Pressable} from 'react-native';
import AudioCard from '../ui/AudioCard';
import PulseAnimationContainer from '../ui/PulseAnimationContainer';
import colors from '../utils/colors';

interface Props {}

const dummyData = new Array(4).fill('');

const LatestUploads: FC<Props> = props => {
  const {data, isLoading} = useFetchLatestAudios();

  if (isLoading)
    return (
      <PulseAnimationContainer>
        <View style={styles.container}>
          <View style={styles.dummyTitleView} />
          <View style={styles.dummyAudioContainer}>
            {dummyData.map((_, index) => {
              return <View style={styles.dummyAudioView} key={index} />;
            })}
          </View>
        </View>
      </PulseAnimationContainer>
    );

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'black',
          fontSize: 25,
          fontWeight: 'bold',
          marginBottom: 15,
          marginLeft: 15,
        }}>
        Latest Uploads
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.map(item => {
          return (
            <AudioCard key={item.id} title={item.title} poster={item.poster} />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
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

export default LatestUploads;
