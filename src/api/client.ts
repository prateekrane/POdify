import axios from 'axios';

const client = axios.create({
  baseURL: 'http://192.168.79.206:8989',
});

export default client;
