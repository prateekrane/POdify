import React from 'react';
import {View} from 'react-native';
import colors from '../utils/colors';
import {FC} from 'react';

interface Props {
  size: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const CircleUI: FC<Props> = ({size, position}) => {
  let stylePosition = {};

  // Calculate position based on the prop
  switch (position) {
    case 'top-left':
      stylePosition = {top: -size / 2, left: -size / 2};
      break;
    case 'top-right':
      stylePosition = {top: -size / 2, right: -size / 2};
      break;
    case 'bottom-left':
      stylePosition = {bottom: -size / 2, left: -size / 2};
      break;
    case 'bottom-right':
      stylePosition = {bottom: -size / 2, right: -size / 2};
      break;
    default:
      break;
  }

  return (
    <View
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        backgroundColor: '#77A7D9',
        opacity: 0.4,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        ...stylePosition, // Spread the calculated position properties
      }}>
      <View
        style={{
          height: size / 1.5,
          width: size / 1.5,
          borderRadius: size / 2,
          backgroundColor: '#77A7D9',
          opacity: 0.6,
        }}
      />
    </View>
  );
};

export default CircleUI;
