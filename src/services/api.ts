import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.12.85.12:5000',
});

export default api;
