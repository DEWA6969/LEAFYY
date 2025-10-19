import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigator />
        <StatusBar style="light" backgroundColor="transparent" translucent />
      </AuthProvider>
    </ThemeProvider>
  );
}
