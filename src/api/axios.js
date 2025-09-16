// src/api/axios.js
import axios from 'axios';
import axiosRetry from 'axios-retry';

const API_BASE = 'https://backserver-3.onrender.com//api/';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// retries on network errors or idempotent requests
axiosRetry(api, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => axiosRetry.isNetworkOrIdempotentRequestError(error),
});

// attach access token automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// response interceptor: attempt refresh if 401
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const { data } = await axios.post(API_BASE + 'token/refresh/', { refresh: refreshToken });
          localStorage.setItem('access_token', data.access);
          api.defaults.headers.Authorization = `Bearer ${data.access}`;
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return api(originalRequest);
        } catch (err) {
          // refresh failed — drop tokens and redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
          return Promise.reject(err);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
