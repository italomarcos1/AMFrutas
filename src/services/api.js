import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://amfrutas.pt/api-v2',
  baseURL: 'http://192.168.0.11:8000/api-v2',
});

export default api;
