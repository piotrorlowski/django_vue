import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 1000,
  headers: {},
});

api.interceptors.request.use(
  (reqConfig) => {
    const token = window.localStorage.getItem('authToken');
    const config = reqConfig;
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return reqConfig;
  },
  (err) => Promise.reject(err)
);

export default api;
