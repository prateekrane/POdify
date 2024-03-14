import React, {FC} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

interface Props {
  source?: string;
}

const AvatarField: FC<Props> = ({source}) => {
  return (
    <View style={{margin: 16}}>
      {source ? (
        <Image source={{uri: source}} style={styles.avatarImage} />
      ) : (
        <View style={styles.avatarImage}>
          <Image source={require('../ui/assets/mic.png')} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: '#97C9F4',
  },
});

export default AvatarField;
