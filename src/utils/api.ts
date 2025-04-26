import axios from 'axios';

export const API_URL = 'https://linkvault-backend-5buj.onrender.com/api';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// You can also add interceptors here
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);