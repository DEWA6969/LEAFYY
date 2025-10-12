import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from './src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TestUserData() {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    checkStorage();
  }, []);

  const checkStorage = async () => {
    console.log('=== CHECKING STORAGE ===');
    const userData = await AsyncStorage.getItem('@user');
    const token = await AsyncStorage.getItem('@token');
    console.log('User from storage:', userData);
    console.log('Token from storage:', token);
    console.log('User from context:', user);
    console.log('Is authenticated:', isAuthenticated);
    console.log('======================');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test User Data</Text>
      
      <View style={styles.section}>
        <Text style={styles.label}>From Context:</Text>
        <Text style={styles.value}>User: {user ? JSON.stringify(user, null, 2) : 'NULL'}</Text>
        <Text style={styles.value}>Is Authenticated: {isAuthenticated ? 'YES' : 'NO'}</Text>
      </View>

      <Button title="Check Storage" onPress={checkStorage} />
      <Button title="Clear Storage" onPress={async () => {
        await AsyncStorage.clear();
        console.log('✅ Storage cleared!');
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  value: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
});

