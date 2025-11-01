import { Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../../src/contexts/AuthContext';

export default function AuthLayout() {
  const { token } = useApp();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#472727ff' }}>
        
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.titleText}>Suntory</Text>

          <View style={styles.linkContainer}>
            {!token && (
              <>
                <Link href="/auth/login" asChild>
                  <TouchableOpacity>
                    <Text style={styles.navText}>Login</Text>
                  </TouchableOpacity>
                </Link>

                <Link href="/auth/register" asChild>
                  <TouchableOpacity>
                    <Text style={styles.navText}>Register</Text>
                  </TouchableOpacity>
                </Link>
              </>
            )}
          </View>
        </View>

        {/* Stack for auth screens */}
        <Stack
          screenOptions={{
            headerShown: false, // hide default header because we use custom top bar
          }}
        >
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  titleText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  navText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
