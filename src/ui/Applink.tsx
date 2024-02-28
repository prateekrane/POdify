import React from 'react';
import {FC} from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  title: string;
  onPress?(): void;
  active?: boolean;
}

const AppLink: FC<Props> = ({title, active = true, onPress}) => {
  return (
    <Pressable
      onPress={active ? onPress : null}
      style={{opacity: active ? 1 : 0.4}}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default AppLink;

const styles = StyleSheet.create({
  title: {
    color: 'black',
    borderBottomWidth: 1,
  },
});
