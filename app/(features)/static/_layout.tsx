// app/(main)/_layout.tsx
import { Slot } from 'expo-router';
import React from 'react';

export default function MainLayout() {
  return <Slot />; // just renders the child screens
}
