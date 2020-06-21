import axios from 'axios';

const fakeapi = axios.create({
  baseURL: 'http://192.168.1.6:3333',
});

export default fakeapi;
