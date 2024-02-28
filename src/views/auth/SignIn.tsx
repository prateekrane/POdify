import AuthInputField from '../../components/form/AuthInputField';
import Form from '../../components/form';

import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import SubmitBtn from '../../components/form/SubmitBtn';
import React from 'react';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import AppLink from '../../ui/Applink';

import AuthFormContainer from '../../components/AuthContainer';
import {AuthStackParamsList} from '../../@types/navigatoin';
import {FormikHelpers} from 'formik';
import client from '../../api/client';
const signupSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing!')
    .email('Invalid email!')
    .required('Email is required!'),
  password: yup
    .string()
    .trim('Password is missing!')
    .min(8, 'Password is too short!')

    .required('Password is required!'),
});

interface Props {}

interface SignInUserInfo {
  email: string;
  password: string;
}

const initialValues = {
  email: '',
  password: '',
};

const SignIn: FC<Props> = props => {
  const navigation = useNavigation<NavigationProp<AuthStackParamsList>>();

  const handleSubmit = async (
    values: SignInUserInfo,
    actions: FormikHelpers<SignInUserInfo>,
  ) => {
    try {
      const {data} = await client.post('/auth/sign-in', {...values});
      console.log(data);
    } catch (error) {
      console.log('Sign in error: ', error);
    }
  };
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={signupSchema}>
      <AuthFormContainer heading="Welcome Back!">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="honey@email.com"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          />
          <AuthInputField
            name="password"
            placeholder="*************"
            label="Password"
            autoCapitalize="none"
            secureTextEntry
            containerStyle={styles.marginBottom}
          />
          <SubmitBtn title="Sign In" />
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
              title="Sign Up"
              onPress={() => navigation.navigate('SignUp')}
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
});

export default SignIn;
