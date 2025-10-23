import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useApp } from '../../../contexts/AuthContext';
import AuthForm from '../components/AuthForm';

export default function LoginScreen({ navigation }: any) {
  const { login, error, loading } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const handleSubmit = async () => {
    await login(email, password);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <AuthForm
          fields={[
            { label: 'Username', value: email, onChange: setEmail },
            { label: 'Password', value: password, onChange: setPassword, secure: true },
          ]}
          onSubmit={handleSubmit}
          submitLabel="Login"
          error={error}
        />
      )}
    </View>
  );
}
