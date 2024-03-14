import axios, {CreateAxiosDefaults} from 'axios';
import {Keys, getFromAsyncStorage} from '../utils/asyncStorage';

const client = axios.create({
  baseURL: 'http://192.168.147.206:8989',
});

const baseURL = 'http://192.168.147.206:8989';

type headers = CreateAxiosDefaults<any>['headers'];
export const getClient = async (headers?: headers) => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);

  if (!token) return axios.create({baseURL});

  const defaultHeaders = {
    Authorization: 'Bearer ' + token,
    ...headers,
  };

  return axios.create({baseURL, headers: defaultHeaders});
};

export default client;
