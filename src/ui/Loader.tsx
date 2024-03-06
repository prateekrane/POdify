import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

export default function Loader() {
  return (
    <LottieView
      autoPlay
      style={{
        width: 200,
        height: 200,
      }}
      source={require('../ui/assets/loading.json')}
    />
  );
}

const styles = StyleSheet.create({});
