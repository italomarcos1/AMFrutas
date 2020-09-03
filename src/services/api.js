import axios from 'axios';

const api = axios.create({
  baseURL: 'https://amfrutas.pt/api-v2',
});

export default api;
