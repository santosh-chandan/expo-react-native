// src/features/user/UserProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../../../contexts/AuthContext'; // to get logout & token
import { getUserProfile } from '../api.js';

export default function UserProfileScreen() {
  const { logout } = useApp(); // logout method from context
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("UserProfileScreen mounted");
    // Fetch user profile on mount
    (async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (err: any) {
        console.log(err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{profile?.name}</Text>

        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{profile?.username}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{profile?.email}</Text>
      </View>

      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { padding: 15, borderRadius: 8, backgroundColor: '#f4f4f4', marginBottom: 20 },
  label: { fontWeight: 'bold' },
  value: { marginBottom: 10 },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
});
