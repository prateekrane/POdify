import React from 'react';
import colors from '../utils/colors';
import {FC} from 'react';
import {TextInputProps, StyleSheet, TextInput} from 'react-native';

interface Props extends TextInputProps {}

const AppInput: FC<Props> = props => {
  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.INACTIVE_CONTRAST}
      style={[styles.input, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: '#3770AC',
    height: 45,
    borderRadius: 25,
    color: '#3770AC',
    padding: 10,
  },
});

export default AppInput;
