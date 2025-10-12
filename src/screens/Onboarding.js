import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text } from '../components/ui';

export default function Onboarding() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop'
          }}
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.textContent}>
          <Text variant="h1" style={styles.title}>Smart Plant Monitoring</Text>
          <Text variant="body" style={styles.subtitle}>
            Keep your plants healthy with real-time monitoring, automated watering, and personalized care recommendations.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button style={styles.primaryButton}>
            <Text variant="body" style={styles.primaryButtonText}>Continue</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 16,
    marginBottom: 32,
  },
  textContent: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

