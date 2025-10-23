import { Tabs, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useApp } from '../../../src/contexts/AuthContext';

export default function UserLayout() {
    const { user } = useApp();
    const router = useRouter();

    useEffect(() => {
    if (!user) {
        // No user = redirect to login
        router.replace('/(auth)/login');
    }
    }, [user]);

    // Show loader while checking
    if (!user) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
        </View>
    );
    }

    // User is logged in
    return (
        <Tabs
            screenOptions={{
                headerShown: true,         // Show header for each tab
                tabBarActiveTintColor: '#1976d2',
                tabBarStyle: { backgroundColor: '#fff', height: 60 },
                
                headerTitleAlign: 'center',
                //headerStyle: { backgroundColor: '#1976d2', height: 60 }, // control height
                //headerTintColor: '#fff', // title text color
                headerTitleStyle: { fontSize: 18, fontWeight: '600' }, // text style
  
            }}
        >
        <Tabs.Screen
            name="account"
            options={{ title: 'Profile' }}
        />
        <Tabs.Screen
            name="myblog"
            options={{ title: 'My Blogs' }}
        />
        </Tabs>
    );
}
