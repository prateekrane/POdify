import React, {ReactNode} from 'react';
import {FC} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CircleUI from '../ui/CircleUI';
import colors from '../utils/colors';

interface Props {
  children: ReactNode;
  heading?: string;
  subHeading?: string;
}

const AuthFormContainer: FC<Props> = ({children, heading, subHeading}) => {
  return (
    <View style={styles.container}>
      <CircleUI size={200} position="top-left" />
      <CircleUI size={200} position="top-right" />
      <View style={styles.headercontainer}>
        <Image
          source={require('../ui/assets/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subheading}>{subHeading}</Text>
      </View>
      <CircleUI size={200} position="bottom-left" />
      <CircleUI size={200} position="bottom-right" />
      {children}
    </View>
  );
};
export default AuthFormContainer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0D1F3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',

    height: 80,
    width: '100%',
  },
  heading: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    padding: 5,
  },
  subheading: {fontSize: 16, color: 'black'},
  headercontainer: {width: '100%', marginBottom: 20},
});
