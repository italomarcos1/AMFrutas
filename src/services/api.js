import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sandbox.amfrutas.pt/api-v2',
});

export default api;
