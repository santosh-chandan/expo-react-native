import LoginScreen from '@/src/features/auth/screens/LoginScreen';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useApp } from '../../src/contexts/AuthContext';

export default function LoginRoute() {
  const { token, loading } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!loading && token) {
      router.replace('/(main)/(user)/account'); // redirect if logged in
    }
  }, [token, loading]);

  if (loading || token) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1976d2" />
      </View>
    );
  }

  return <LoginScreen />;
}
