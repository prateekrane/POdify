import React from 'react';
import colors from '../utils/colors';
import {FC} from 'react';
import {StyleSheet, Text} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  title: string;
  onPress?(): void;
}

const AppButton: FC<Props> = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
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
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#3770AC',
  },
  title: {
    color: '#2B75C3',
    fontSize: 18,
  },
});
export default AppButton;
