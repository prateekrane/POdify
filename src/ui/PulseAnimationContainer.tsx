import React, {FC, ReactNode, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  children: ReactNode;
}

const PulseAnimationContainer: FC<Props> = ({children}) => {
  const oppacitySharedValue = useSharedValue(1);

  const oppacity = useAnimatedStyle(() => {
    return {
      opacity: oppacitySharedValue.value,
    };
  });

  useEffect(() => {
    oppacitySharedValue.value = withRepeat(
      withTiming(0.3, {duration: 1000}),
      -1,
      true,
    );
  }, []);

  return <Animated.View style={oppacity}>{children}</Animated.View>;
};

const styles = StyleSheet.create({
  container: {},
});

export default PulseAnimationContainer;
