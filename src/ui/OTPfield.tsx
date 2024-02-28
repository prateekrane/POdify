import React from 'react';
import colors from '../utils/colors';
import {FC, forwardRef} from 'react';
import {View, StyleSheet, TextInput, TextInputProps} from 'react-native';

interface Props extends TextInputProps {
  ref: any;
}

const OTPField = forwardRef<TextInput, Props>((props, ref) => {
  return (
    <TextInput
      {...props}
      ref={ref}
      style={[styles.input, props.style]}
      placeholderTextColor="#85BBF4"
      keyboardType="numeric"
    />
  );
});

const styles = StyleSheet.create({
  input: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#3770AC',
    borderWidth: 2,
    textAlign: 'center',
    color: '#3770AC',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 0,
  },
});

export default OTPField;
