import {FC, useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import AppLink from '../../ui/Applink';
import AuthFormContainer from '../../components/AuthContainer';
import OTPField from '../../ui/OTPfield';
import AppButton from '../../ui/Appbutton';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamsList} from '../../@types/navigatoin';
import client from '../../api/client';

type Props = NativeStackScreenProps<AuthStackParamsList, 'Verificatoin'>;

const otpFields = new Array(6).fill('');

const Verification: FC<Props> = ({route}) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamsList>>();
  const [otp, setOtp] = useState([...otpFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [countDown, setCountDown] = useState(60);
  const [canSendNewOtpRequest, setCanSendNewOtpRequest] = useState(false);
  const {userInfo} = route.params;

  const inputRef = useRef<TextInput>(null);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];

    if (value === 'Backspace') {
      // moves to the previous only if the field is empty
      if (!newOtp[index]) setActiveOtpIndex(index - 1);
      newOtp[index] = '';
    } else {
      // update otp and move to the next
      setActiveOtpIndex(index + 1);
      newOtp[index] = value;
    }

    setOtp([...newOtp]);
  };
  const isValidOtp = otp.every(value => {
    return value.trim();
  });

  const handleSubmit = async () => {
    if (!isValidOtp) return;

    try {
      const {data} = await client.post('/auth/verify-email', {
        userId: userInfo.id,
        token: otp.join(''),
      });
      navigation.navigate('SignIn');
    } catch (error) {
      // console.log('Error inside verifaication : ', error);
      Alert.alert('Error', 'Invalid OTP');
    }
  };
  const requestForOTP = async () => {
    setCountDown(60);
    setCanSendNewOtpRequest(false);
    try {
      await client.post('/auth/re-verify-email', {
        userId: userInfo.id,
      });
    } catch (error) {
      console.log('Requesting for new OTP: ', error);
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (canSendNewOtpRequest) return;
    const intervalId = setInterval(() => {
      setCountDown(oldCountDown => {
        if (oldCountDown <= 0) {
          setCanSendNewOtpRequest(true);
          clearInterval(intervalId);
          return 0;
        }
        return oldCountDown - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [canSendNewOtpRequest]);

  return (
    <AuthFormContainer heading="Check your Email ID!!">
      <View style={styles.inputContainer}>
        {otpFields.map((_, index) => {
          return (
            <OTPField
              ref={activeOtpIndex === index ? inputRef : null}
              key={index}
              placeholder="*"
              onKeyPress={({nativeEvent}) => {
                handleChange(nativeEvent.key, index);
              }}
            />
          );
        })}
      </View>
      <View style={styles.btndiff}>
        <AppButton title="Submit" onPress={handleSubmit} />
      </View>
      <View style={styles.linkContainer}>
        {countDown > 0 ? (
          <Text style={styles.countDown}>{countDown} sec</Text>
        ) : null}
        <AppLink
          active={canSendNewOtpRequest}
          title="Re-send OTP"
          onPress={requestForOTP}
        />
      </View>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  linkContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  btndiff: {
    width: '100%',
  },
  countDown: {
    color: 'black',
    marginRight: 7,
  },
});

export default Verification;
