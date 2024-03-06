import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import catchAsyncError from '../api/catchError';
import {upldateNotification} from '../store/notification';
import client from '../api/client';
import {AudioData} from '../@types/audio';
const fetchLatest = async (): Promise<AudioData[]> => {
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
