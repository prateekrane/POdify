import React, {FC} from 'react';
import {View, StyleSheet, Text, Button, Image, ScrollView} from 'react-native';
import {useFetchLatestAudios} from '../hooks/query';
import {Pressable} from 'react-native';
import LatestUploads from '../components/LatestUploads';
import RecommendedAudio from '../components/RecommendedAudio';

interface Props {}

const Home: FC<Props> = props => {
  const {data, isLoading} = useFetchLatestAudios();

  if (isLoading)
    return (
      <View style={styles.container}>
        <Text style={{color: 'black', fontSize: 25}}>Loading</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <LatestUploads />
      <RecommendedAudio />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Home;
