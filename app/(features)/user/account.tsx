import React from 'react';
import { Text, View } from 'react-native';
import UserProfileScreen from '../../../src/(features)/user/components/profile';

export default function AccountScreen() {
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
