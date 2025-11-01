import { Slot, usePathname } from 'expo-router';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import MainLayoutWrapper from '../src/components/MainLayoutWrapper';
import { AppProvider } from '../src/contexts/AuthContext';

export default function Layout() {
  const pathname = usePathname();

  const isLanding = pathname === '/landing';
  const isAuth = pathname.startsWith('/auth');

  return (
    // Wrap everything ONCE inside PaperProvider
    <PaperProvider>
      <AppProvider>
        {isLanding || isAuth ? (
          <Slot />
        ) : (
          <MainLayoutWrapper topBarTitle="Suntory">
            <Slot />
          </MainLayoutWrapper>
        )}
      </AppProvider>
    </PaperProvider>
  );
}
