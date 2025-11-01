// Import core React tools
import React, { useEffect, useState } from 'react';

// Import basic UI components from React Native
import { Alert, Platform, Text, View } from 'react-native';

// Import specific Expo libraries for SMS and call intent handling
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as IntentLauncher from 'expo-intent-launcher';
import * as SMS from 'expo-sms';
// Import the Expo Router hook for navigation
import { useRouter } from 'expo-router';

// Define and export the LandingScreen component
export default function LandingScreen() {
  // useState → manages a local boolean state "granted"
  // Initially false, becomes true when both actions are available
  const [granted, setGranted] = useState(false);

  const [loading, setLoading] = useState(true); // while checking stored permissions
  // useRouter gives access to navigation functions like push(), replace(), etc.
  const router = useRouter();

  // async function to check SMS and CALL availability
  const askPermissions = async () => {
  try {
    const phoneNumber = '1234567890';

    if (Platform.OS === 'android') {
      try {
        await IntentLauncher.startActivityAsync('android.intent.action.DIAL', {
          data: `tel:${phoneNumber}`,
        });
      } catch {
        Alert.alert('Dialer not available on this device');
      }
    }

    const isSmsAvailable = Platform.OS === 'android' ? await SMS.isAvailableAsync() : true;
    if (!isSmsAvailable) {
      Alert.alert('SMS not available', 'Your device does not support SMS.');
      return;
    }

    // Mark permissions granted and navigate
    setGranted(true);
    await AsyncStorage.setItem('permissions_granted', 'true');
    router.replace('/auth/login');
  } catch (e) {
    console.warn(e);
    Alert.alert('Error', 'Something went wrong while requesting permissions.');
  }
};

useEffect(() => {
    // Check if permissions were already granted before
    const checkStoredPermission = async () => {
    const stored = await AsyncStorage.getItem('permissions_granted');
    if (stored === 'true') {
        // Already granted, move to login directly
        router.replace('/auth/login');
    } else {
        // Not granted, show permission button
        askPermissions();
        setLoading(false);
    }
    };
    checkStoredPermission();
  }, []);

  // Render the landing page UI
  return (
    // View acts like a <div> in web
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* App Title */}
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Welcome to Polo App</Text>
    </View>
  );
}
