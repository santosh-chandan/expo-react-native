import React, { useState } from 'react';
import { View } from 'react-native';
import { useApp } from '../../../contexts/AuthContext';
import AuthForm from '../components/AuthForm';

export default function RegisterScreen({ navigation }: any) {
  const { register, error } = useApp();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    await register(name, username, password, confirmPassword);
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <AuthForm
        fields={[
          { label: 'Name', value: name, onChange: setName },
          { label: 'Username', value: username, onChange: setUsername },
          { label: 'Password', value: password, onChange: setPassword, secure: true },
          { label: 'Confirm Password', value: confirmPassword, onChange: setConfirmPassword, secure: true },
        ]}
        onSubmit={handleSubmit}
        submitLabel="Register"
        error={error}
      />
    </View>
  );
}
