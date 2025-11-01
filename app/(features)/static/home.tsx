import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useApp } from '../../../src/contexts/AuthContext';

export default function Home() {
  const router = useRouter();
  const { token, logout } = useApp(); // get auth info
  // console.log("heelo");

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      {
        !token && (
          <>
            <Text style={{ fontSize: 22, marginBottom: 12 }}>Welcome to My App</Text>
            <TouchableOpacity
              style={{ padding: 12, backgroundColor: '#1976d2', borderRadius: 8 }}
              onPress={() => router.push('/auth/login')} // ✅ correct
            >
              <Text style={{ color: '#fff' }}>Login</Text>
            </TouchableOpacity>
          </>)
      }

      <TouchableOpacity
        style={{ marginTop: 12 }}
        onPress={
          () => {
            if (token) {
              router.push('/blog/list' as any)
            } else {
              router.push('/auth/login');
            }
          }
        } // correct
      >
        <Text>Read blogs</Text>
      </TouchableOpacity>
    </View>
  );
}
