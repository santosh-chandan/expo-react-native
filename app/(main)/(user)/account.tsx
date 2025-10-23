import UserProfileScreen from '@/src/features/user/screens/ProfileScreen';
import React from 'react';
import { Text, View } from 'react-native';

export default function ProfileScreen() {
  console.log("ProfileScreen mounted");
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22 }}>Welcome to your Profile!</Text>
      <View>
        <UserProfileScreen/>
      </View>
    </View>
  );
}
