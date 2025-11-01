import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginApi, logoutApi, registerApi } from '../services/apis/api';

type AppContextType = {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, username: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // important
  const [error, setError] = useState<string | null>(null);

  // Load token from AsyncStorage on app start
  useEffect(() => {
    (async () => {
      try {
        const storedToken = await AsyncStorage.getItem('accessToken');
        const storedUser = await AsyncStorage.getItem('user');
        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (err) {
        console.log('Error loading token from storage:', err);
      } finally {
        setLoading(false); // important: loading finished
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const data = await loginApi(email, password);

      setToken(data.accessToken);
      setUser(data.user);
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));

      router.replace('/user/account');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const register = async (name: string, username: string, password: string, confirmPassword: string) => {
    try {
      setError(null);
      await registerApi(name, username, password, confirmPassword);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const logout = async () => {
    await logoutApi();
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('user');
    setToken(null);
    setUser(null);
    router.replace('/auth/login');
  };

  return (
    <AppContext.Provider value={{ user, token, loading, error, login, register, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
