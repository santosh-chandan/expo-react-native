
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:4001/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach token automatically
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getUserProfile = async () => {
    const response = await API.get('/user/profile');
    return response.data
}
