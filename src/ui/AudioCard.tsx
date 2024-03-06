import React from 'react';
import {FC} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

interface Props {
  title: string;
  poster?: string;
}

const AudioCard: FC<Props> = ({title, poster}) => {
  const scource = poster
    ? {
        uri: poster,
      }
    : require('../ui/assets/music.jpeg');
  return (
    <Pressable
      onPress={() => {
        console.log('on audio Press');
      }}
      onLongPress={() => {
        console.log('on audio LongPress');
      }}
      style={{width: 100, marginRight: 15}}>
      <Image
        source={scource}
        style={{height: 100, aspectRatio: 1, borderRadius: 7}}
      />
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{
          color: 'black',
          fontWeight: '500',
          fontSize: 16,
          marginTop: 5,
        }}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AudioCard;
