import {useFormikContext} from 'formik';
import React from 'react';
import {FC} from 'react';
import {StyleSheet} from 'react-native';
import AppButton from '../../ui/Appbutton';
interface Props {
  title: string;
}

const SubmitBtn: FC<Props> = props => {
  const {handleSubmit} = useFormikContext();
  return <AppButton onPress={handleSubmit} title={props.title} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default SubmitBtn;
