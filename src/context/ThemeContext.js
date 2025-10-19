import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from storage on app start
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('@theme');
      if (savedTheme) {
        setIsDarkMode(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('@theme', JSON.stringify(newTheme));
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  // Theme colors that match our green branding
  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      // Background colors
      background: isDarkMode ? '#1a1a1a' : '#03624C',
      surface: isDarkMode ? '#2a2a2a' : 'rgba(255, 255, 255, 0.15)',
      card: isDarkMode ? '#333333' : 'rgba(255, 255, 255, 0.15)',
      
      // Text colors
      text: isDarkMode ? '#ffffff' : '#ffffff',
      textSecondary: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.8)',
      textMuted: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.7)',
      
      // Accent colors
      primary: isDarkMode ? '#4ade80' : '#E5F3E5',
      secondary: isDarkMode ? '#22c55e' : '#B8D4B8',
      
      // Border colors
      border: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
      
      // Status colors
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      
      // Navigation
      tabBarBackground: isDarkMode ? '#1a1a1a' : '#03624C',
      tabBarActive: isDarkMode ? '#4ade80' : '#E5F3E5',
      tabBarInactive: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : '#B8D4B8',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
