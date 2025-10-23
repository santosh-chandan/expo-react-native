import MainLayoutWrapper from '@/src/components/MainLayoutWrapper';
import { Slot, usePathname } from 'expo-router';
import React from 'react';
import { AppProvider } from '../src/contexts/AuthContext';

export default function Layout() {

  const pathname = usePathname();
  // Landing page should not have header/footer
  const isLanding = pathname === '/landing';

  return (
    <AppProvider>
      {isLanding ? (
        <Slot />
      ) : (
        <MainLayoutWrapper topBarTitle="Suntory">
          <Slot />
        </MainLayoutWrapper>
      )}
    </AppProvider>
  );
  
}
