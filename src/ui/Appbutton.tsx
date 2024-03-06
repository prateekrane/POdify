import React from 'react';
import colors from '../utils/colors';
import {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface Props {
  title: string;
  onPress?(): void;
  borderRadius?: number;
  width?: number | string;
}

const AppButton: FC<Props> = ({title, onPress, borderRadius, width}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {borderRadius: borderRadius || 23},
        {width: width || '100%'},
      ]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    //EDECEC
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#3770AC',
  },
  title: {
    color: '#2B75C3',
    fontSize: 18,
  },
});
export default AppButton;
