import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import catchAsyncError from '../api/catchError';
import {upldateNotification} from '../store/notification';

import {AudioData, Playlist} from '../@types/audio';
import {Keys, getFromAsyncStorage} from '../utils/asyncStorage';
import {getClient} from '../api/client';

const fetchLatest = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/audio/latest');
  return data.audios;
};
export const useFetchLatestAudios = () => {
  const dispatch = useDispatch();
  return useQuery(['latest-uplaods'], {
    queryFn: () => fetchLatest(),
    onError(err) {
      const errorMEssage = catchAsyncError(err);
      dispatch(upldateNotification({message: errorMEssage, type: 'error'}));
    },
  });
};

const fetchRecommended = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/profile/recommended');
  return data.audios;
};
export const useFetchRecommendedAudios = () => {
  const dispatch = useDispatch();
  return useQuery(['recommended'], {
    queryFn: () => fetchRecommended(),
    onError(err) {
      const errorMEssage = catchAsyncError(err);
      dispatch(upldateNotification({message: errorMEssage, type: 'error'}));
    },
  });
};
const fetchPlaylist = async (): Promise<Playlist[]> => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
  const client = await getClient();
  const {data} = await client('/playlist/by-profile', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return data.playlist;
};

export const useFetchPlaylist = () => {
  const dispatch = useDispatch();
  return useQuery(['playlist'], {
    queryFn: () => fetchPlaylist(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(upldateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchUploadsByProfile = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/profile/uploads');
  return data.audios;
};

export const useFetchUploadsByProfile = () => {
  const dispatch = useDispatch();
  return useQuery(['uploads-by-profile'], {
    queryFn: () => fetchUploadsByProfile(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(upldateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchFavorites = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/favorite');
  return data.audios;
};

export const useFetchFavorite = () => {
  const dispatch = useDispatch();
  return useQuery(['favorite'], {
    queryFn: () => fetchFavorites(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(upldateNotification({message: errorMessage, type: 'error'}));
    },
  });
};
