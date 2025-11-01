import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Create Axios instance
const API = axios.create({
  baseURL: 'http://localhost:4001/api',
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor to attach access token
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Flag to prevent multiple refresh requests at the same time
let isRefreshing = false;
let failedQueue: any[] = [];

// Function to process queued requests after token refresh
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor to handle 401 (unauthorized)
API.interceptors.response.use(
  (response) => response, // just return response if successful
  async (error) => {
    const originalRequest = error.config;

    // Check if 401 and not retrying yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue requests while token is refreshing
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token available');

        // Call refresh token endpoint
        const { data } = await API.post('/auth/refresh', { token: refreshToken });

        // Save new access token
        await AsyncStorage.setItem('accessToken', data.accessToken);

        // Update header and retry original request
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        processQueue(null, data.accessToken);

        return API(originalRequest);
      } catch (err) {
        processQueue(err, null);
        // logout user or remove tokens if refresh fails
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Login API
export const loginApi = async (email: string, password: string) => {
  const { data } = await API.post('/auth/login', { email, password });
  await AsyncStorage.setItem('accessToken', data.accessToken);
  await AsyncStorage.setItem('refreshToken', data.refreshToken);
  return data;
};

// Register API
export const registerApi = async (name: string, email: string, password: string, confirmPassword: string) => {
  const { data } = await API.post('/user/register', {
    name,
    email,
    password,
    confirm_password: confirmPassword,
  });
  return data;
};

// Logout API
export const logoutApi = async () => {
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
};
