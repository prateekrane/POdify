import React, {FC, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import FileSelector from '../components/FileSelector';
import AppButton from '../ui/Appbutton';
import CategorySelector from '../components/CategorySelector';
import {categories} from '../utils/categories';
import {DocumentPickerResponse, types} from 'react-native-document-picker';
import * as yup from 'yup';
import {Keys, getFromAsyncStorage} from '../utils/asyncStorage';
import client from '../api/client';
import Progress from '../ui/Progress';
import {mapRange} from '../utils/math';
import catchAsyncError from '../api/catchError';
import {upldateNotification} from '../store/notification';
import {useDispatch} from 'react-redux';

interface Props {}

interface FromFields {
  title: string;
  category: string;
  about: string;
  file?: DocumentPickerResponse;
  poster?: DocumentPickerResponse;
}

const defaultForm: FromFields = {
  title: '',
  category: '',
  about: '',
  file: undefined,
  poster: undefined,
};
const audioInfoSchema = yup.object().shape({
  title: yup.string().trim().required('Title is missing!'),
  category: yup.string().oneOf(categories, 'Category is missing!'),
  about: yup.string().trim().required('About is missing!'),
  file: yup.object().shape({
    uri: yup.string().required('Audio file is missing!'),
    name: yup.string().required('Audio file is missing!'),
    type: yup.string().required('Audio file is missing!'),
    size: yup.number().required('Audio file is missing!'),
  }),
  poster: yup.object().shape({
    uri: yup.string(),
    name: yup.string(),
    type: yup.string(),
    size: yup.number(),
  }),
});
const Upload: FC<Props> = props => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [audioInfo, setAudioInfo] = useState({
    ...defaultForm,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const handleUpload = async () => {
    setBusy(true);
    try {
      const finalData = await audioInfoSchema.validate(audioInfo);

      const formData = new FormData();

      formData.append('title', finalData.title);
      formData.append('about', finalData.about);
      formData.append('category', finalData.category);
      formData.append('file', {
        name: finalData.file.name,
        type: finalData.file.type,
        uri: finalData.file.uri,
      });

      if (finalData.poster.uri)
        formData.append('poster', {
          name: finalData.poster.name,
          type: finalData.poster.type,
          uri: finalData.poster.uri,
        });

      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);

      console.log(token);

      const {data} = await client.post('/audio/create', formData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data;',
        },
        onUploadProgress(progressEvent) {
          const uploaded = mapRange({
            inputMin: 0,
            inputMax: progressEvent.total || 0,
            outputMin: 0,
            outputMax: 100,
            inputValue: progressEvent.loaded,
          });

          if (uploaded >= 100) {
            setAudioInfo({...defaultForm});
            setBusy(false);
          }
          setUploadProgress(Math.floor(uploaded));
        },
      });

      console.log(data);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(upldateNotification({message: errorMessage, type: 'error'}));
    }
    setBusy(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.btnContainer}>
        <FileSelector
          icon="image-outliner.png"
          btnTitle="Select Poster"
          options={{type: [types.images]}}
          onSelect={poster => {
            setAudioInfo({...audioInfo, poster});
          }}
        />
        <FileSelector
          icon="file-music-outliner.png"
          btnTitle="Select Audio"
          options={{type: [types.audio]}}
          onSelect={file => {
            setAudioInfo({...audioInfo, file});
          }}
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor={'#7999BC'}
          onChangeText={text => {
            setAudioInfo({...audioInfo, title: text});
          }}
          value={audioInfo.title}
        />
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => setShowCategoryModal(true)}
            style={styles.CategorySelector}>
            <View style={styles.inner}>
              <Text style={styles.CategorySelectorTitle}>Category</Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              marginLeft: -90,
              justifyContent: 'center',
              height: 30,
              width: '40%',
              marginTop: 25,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              alignItems: 'center',
            }}>
            <Text style={styles.selectedCategory}>{audioInfo.category}</Text>
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="About"
          placeholderTextColor={'#7999BC'}
          multiline
          numberOfLines={10}
          onChangeText={text => {
            setAudioInfo({...audioInfo, about: text});
          }}
          value={audioInfo.about}
        />
        <CategorySelector
          visible={showCategoryModal}
          onRequestClose={() => {
            setShowCategoryModal(false);
          }}
          title="Category"
          data={categories}
          renderItem={item => {
            return <Text style={styles.category}>{item}</Text>;
          }}
          onSelect={item => {
            setAudioInfo({...audioInfo, category: item});
          }}
        />
        <View style={{marginVertical: 20, width: '80%'}}>
          {busy ? <Progress progress={uploadProgress} /> : null}
        </View>
        <AppButton
          borderRadius={7}
          title="Submit"
          width={'80%'}
          onPress={handleUpload}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    marginTop: 16,
  },
  formContainer: {
    marginTop: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#045AB4',
    borderRadius: 7,
    padding: 10,
    fontSize: 18,
    width: '80%',
    color: 'black',
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  category: {
    padding: 10,
    color: '#0A3E72',
  },
  CategorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  CategorySelectorTitle: {
    color: '#2965A2',
    fontSize: 15,
    fontWeight: 'bold',
  },
  selectedCategory: {
    color: '#053361',
    fontSize: 20,
    fontStyle: 'italic',
  },
  categoryContainer: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    backgroundColor: 'red',
  },

  inputContainer: {
    width: '80%',
    borderWidth: 2,
    borderColor: '#045AB4',
    borderRadius: 7,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  inner: {
    borderColor: '',
    borderWidth: 1,
    width: '60%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A1C0DD',
    borderRadius: 7,
  },
});

export default Upload;
