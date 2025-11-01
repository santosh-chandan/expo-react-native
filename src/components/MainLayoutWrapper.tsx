// Import the router from Expo Router to navigate between pages
import { useRouter } from 'expo-router';

// Import React and hooks (for managing component state)
import React, { ReactNode, useState } from 'react';

// Import components and APIs from React Native core
import {
  Animated, // For fade/scale animation of dropdown
  Easing, // For easing animation timing
  StyleSheet, // For creating style objects
  Text,
  TouchableOpacity, // For clickable menu items
  View,
} from 'react-native';

// Import Material Design components from react-native-paper
import { Divider, IconButton, Surface } from 'react-native-paper';

// Import SafeAreaView to avoid notches and top padding issues on devices
import { SafeAreaView } from 'react-native-safe-area-context';

// Import your authentication context (to access token and logout)
import { useApp } from '../contexts/AuthContext';

// --------------------------
// Define Props for the layout
// --------------------------
type Props = {
  children: ReactNode;    // The page content to render inside layout
  topBarTitle?: string;   // Optional title shown in top bar
};

// ---------------------------
// Main layout wrapper component
// ---------------------------
export default function MainLayoutWrapper({ children, topBarTitle }: Props) {
  // Extract token (for login state) and logout function from AuthContext
  const { token, logout } = useApp();

  // Access the router instance for navigation
  const router = useRouter();

  // Local state to show/hide the dropdown menu
  const [visible, setVisible] = useState(false);

  // Animated opacity value for fade + scale effect
  const opacity = useState(new Animated.Value(0))[0];

  // ------------------------------------
  // Function: toggleMenu() — show/hide dropdown
  // ------------------------------------
  const toggleMenu = () => {
    if (visible) {
      // If currently visible, fade out to opacity 0
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => setVisible(false)); // Hide after animation completes
    } else {
      // If currently hidden, set visible and fade in
      setVisible(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        easing: Easing.out(Easing.ease), // Smooth easing curve
        useNativeDriver: true,
      }).start();
    }
  };

  // ------------------------------------
  // Function: handleNavigate(path)
  // Closes dropdown and navigates to a given route
  // ------------------------------------
  const handleNavigate = (path: string) => {
    toggleMenu(); // Close menu smoothly
    setTimeout(() => router.push(path as any), 150); // Navigate after fade-out
  };

  // --------------------
  // Component render area
  // --------------------
  return (
    // SafeAreaView keeps layout below system bars (notch-safe)
    <SafeAreaView style={styles.container}>

      {/* Only show the top bar if the user is logged in (has a token) */}
      {token && (
        <View style={styles.topBar}>
          {/* Title text on left side */}
          <Text style={styles.titleText}>{topBarTitle || 'My App'}</Text>

          {/* Right side — three-dot button */}
          <View style={{ position: 'relative' }}>
            <IconButton
              icon="dots-vertical" // 3-dot vertical menu icon
              size={24}
              iconColor="#fff"
              onPress={toggleMenu} // Opens or closes dropdown
            />

            {/* Animated dropdown menu — shown only when visible */}
            {visible && (
              <Animated.View
                style={[
                  styles.menuContainer,
                  {
                    opacity,                     // Fade in/out
                    transform: [{ scale: opacity }], // Scale with opacity
                  },
                ]}
              >
                {/* Surface gives elevation (shadow) background */}
                <Surface style={styles.surface}>
                  {/* Wrap the menu content in a View with overflow hidden */}
                  <View style={styles.menuInner}>
                    {/* Menu item — Home */}
                    <TouchableOpacity
                      onPress={() => handleNavigate('/static/home')}
                      style={styles.menuItem}
                    >
                      <Text style={styles.menuText}>Home</Text>
                    </TouchableOpacity>

                    {/* Menu item — About */}
                    <TouchableOpacity
                      onPress={() => handleNavigate('/static/about')}
                      style={styles.menuItem}
                    >
                      <Text style={styles.menuText}>About</Text>
                    </TouchableOpacity>

                    {/* Menu item — Contact */}
                    <TouchableOpacity
                      onPress={() => handleNavigate('/static/contact')}
                      style={styles.menuItem}
                    >
                      <Text style={styles.menuText}>Contact</Text>
                    </TouchableOpacity>

                    {/* Divider separates Logout visually */}
                    <Divider />

                    {/* Menu item — Logout */}
                    <TouchableOpacity
                      onPress={() => {
                        toggleMenu(); // Close dropdown
                        logout();     // Call logout action
                      }}
                      style={styles.menuItem}
                    >
                      <Text style={[styles.menuText, { color: 'red' }]}>
                        Logout
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Surface>
              </Animated.View>
            )}
          </View>
        </View>
      )}

      {/* Main page content area */}
      <View style={{ flex: 1 }}>{children}</View>

      {/* Footer shown only when logged in */}
      {token && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Polo App</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

// --------------------
// Styles for the layout
// --------------------
const styles = StyleSheet.create({
  // Base layout container (fills entire screen)
  container: { flex: 1 },

  // Top navigation bar
  topBar: {
    backgroundColor: '#1976d2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',       // horizontal layout
    justifyContent: 'space-between', // space between title & button
    alignItems: 'center',
    zIndex: 20,
  },

  // Top bar title text style
  titleText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  // Dropdown container (absolute under 3-dot icon)
  menuContainer: {
    position: 'absolute',
    top: 40,   // drop below icon
    right: 0,  // align right
    zIndex: 1000,
  },

  // Surface wrapper — white box with shadow
  surface: {
    elevation: 4,
    borderRadius: 6,
    backgroundColor: '#fff',
    overflow: 'hidden',
    minWidth: 160,
  },

  // Each menu item padding
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  // apply clipping here instead of Surface
  menuInner:{
    borderRadius: 6,
    overflow: 'hidden',
  },

  // Menu item text
  menuText: {
    fontSize: 16,
    color: '#333',
  },

  // Footer layout
  footer: {
    backgroundColor: '#1976d2',
    padding: 10,
    alignItems: 'center',
  },

  // Footer text style
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});
