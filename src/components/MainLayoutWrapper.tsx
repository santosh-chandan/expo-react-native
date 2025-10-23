// src/components/MainLayoutWrapper.tsx
import { Link } from 'expo-router';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../src/contexts/AuthContext'; // import your auth context

type Props = {
  children: ReactNode;
  topBarTitle?: string; // optional title for top bar
};

export default function MainLayoutWrapper({ children, topBarTitle }: Props) {
  const { token, logout } = useApp(); // get auth info

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Top Bar - only show if logged in */}
      {token && (
        <View style={styles.topBar}>
          <Text style={styles.titleText}>{topBarTitle || 'My App'}</Text>
          <View style={styles.linkContainer}>
            {token ? (
                <>
                  <Link href="/" asChild>
                    <TouchableOpacity>
                      <Text style={styles.navText}>Home</Text>
                    </TouchableOpacity>
                  </Link>

                  <Link href="/about" asChild>
                    <TouchableOpacity>
                      <Text style={styles.navText}>About</Text>
                    </TouchableOpacity>
                  </Link>

                  <Link href="/contact" asChild>
                    <TouchableOpacity>
                      <Text style={styles.navText}>Contact</Text>
                    </TouchableOpacity>
                  </Link>

                  <TouchableOpacity onPress={logout}>
                    <Text style={styles.navText}>Logout</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Link href="/login" asChild>
                    <TouchableOpacity>
                      <Text style={styles.navText}>Login</Text>
                    </TouchableOpacity>
                  </Link>

                  <Link href="/register" asChild>
                    <TouchableOpacity>
                      <Text style={styles.navText}>Register</Text>
                    </TouchableOpacity>
                  </Link>
                </>
              )}
            </View>
        </View>
      )}

      {/* Main Content */}
      <View style={{ flex: 1 }}>{children}</View>

      {/* Footer - only show if logged in */}
      {token && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Polo App</Text>
        </View>
      )}
    </SafeAreaView>
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
    marginBottom: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  navText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#1976d2',
    padding: 10,
    alignItems: 'center',
  },
  footerText: { color: '#fff', fontSize: 14 },
});
