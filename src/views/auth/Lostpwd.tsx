import AuthInputField from '../../components/form/AuthInputField';
import Form from '../../components/form';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {FC} from 'react';
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
  email: yup
    .string()
    .trim('Email is missing!')
    .email('Invalid email!')
    .required('Email is required!'),
});

interface Props {}

interface InitialValues {
  email: '';
}

const initialValues = {
  email: '',
};

const handleSubmit = async (
  values: InitialValues,
  actions: FormikHelpers<InitialValues>,
) => {
  try {
    const {data} = await client.post('/auth/forget-password', {...values});
    console.log(data);
  } catch (error) {
    console.log('Lost password error: ', error);
  }
};
const LostPwd: FC<Props> = props => {
  const navigation = useNavigation<NavigationProp<AuthStackParamsList>>();
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={signupSchema}>
      <AuthFormContainer
        heading="Forgot Password!"
        subHeading="Did you forgot your password, Dont worry will get it back.">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="honey@email.com"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          />

          <SubmitBtn title="Send Link" />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <AppLink
              title="Sign In"
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            />
            <AppLink
              title="Sign Up"
              onPress={() => {
                navigation.navigate('SignUp');
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
});

export default LostPwd;
