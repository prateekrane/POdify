import AuthInputField from '../../components/form/AuthInputField';
import Form from '../../components/form';

import {useNavigation, NavigationProp} from '@react-navigation/native';
import {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import SubmitBtn from '../../components/form/SubmitBtn';
import React from 'react';

import AppLink from '../../ui/Applink';

import AuthFormContainer from '../../components/AuthContainer';
import {AuthStackParamsList} from '../../@types/navigatoin';
import {FormikHelpers} from 'formik';
import client from '../../api/client';
const signupSchema = yup.object({
  name: yup
    .string()
    .trim('Name is missing!')
    .min(3, 'Invalid name!')
    .required('Name is required!'),
  email: yup
    .string()
    .trim('Email is missing!')
    .email('Invalid email!')
    .required('Email is required!'),
  password: yup
    .string()
    .trim('Password is missing!')
    .min(8, 'Password is too short!')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      'Password is too simple!',
    )
    .required('Password is required!'),
});

interface Props {}
interface NewUser {
  name: string;
  email: string;
  password: string;
}

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUp: FC<Props> = props => {
  const navigation = useNavigation<NavigationProp<AuthStackParamsList>>();
  const handleSubmit = async (
    values: NewUser,
    actions: FormikHelpers<NewUser>,
  ) => {
    try {
      const {data} = await client.post('/auth/create', {
        ...values,
      });

      navigation.navigate('Verificatoin', {userInfo: data.user});
    } catch (error) {
      console.log('Sign up error: ', error);
    }
  };
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={signupSchema}>
      <AuthFormContainer
        heading="Welcome!"
        subHeading="Lets start with creating an account.">
        <View style={styles.formContainer}>
          <AuthInputField
            name="name"
            placeholder="Honey"
            label="Name"
            containerStyle={styles.marginBottom}
          />
          <AuthInputField
            name="email"
            placeholder="honey@gmail.com"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          />
          <AuthInputField
            name="password"
            placeholder="********"
            label="Password"
            autoCapitalize="none"
            secureTextEntry
            containerStyle={styles.marginBottom}
          />
          <SubmitBtn title="Sign Up" />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <AppLink
              title="I Forgot my password"
              onPress={() => {
                navigation.navigate('Lostpwd');
              }}
            />
            <AppLink
              title="Sign In"
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    // padding in the x direction (left and the right)
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default SignUp;
