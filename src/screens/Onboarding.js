import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, Text } from '../components/ui';

// 1. Definisikan konten untuk setiap halaman onboarding
const onboardingSteps = [
  {
    key: '1',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1073',
    title: 'Welcome to Leafyy',
    subtitle: 'Keep your plants healthy with real-time monitoring and personalized care recommendations.',
  },
  {
    key: '2',
    image: 'https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=400&h=300&fit=crop',
    title: 'Automated Watering',
    subtitle: 'Set up smart watering schedules and never worry about forgetting to water your plants again.',
  },
  {
    key: '3',
    image: 'https://images.unsplash.com/photo-1491147334573-44cbb4602074?w=400&h=300&fit=crop',
    title: 'Grow Smarter',
    subtitle: 'Get insights and tips to help your garden thrive. Let\'s get started!',
  },
];

export default function Onboarding({ navigation }) {
  // 2. Gunakan state untuk melacak halaman saat ini
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentStep = onboardingSteps[currentIndex];
  const isLastStep = currentIndex === onboardingSteps.length - 1;

  // 3. Fungsi untuk pindah ke halaman berikutnya atau ke Login
  const handleNext = () => {
    if (isLastStep) {
      // Jika di halaman terakhir, pindah ke halaman Login
      navigation.replace('Login');
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Fungsi untuk kembali ke halaman sebelumnya
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Konten akan berubah berdasarkan currentIndex */}
        <Image
          source={{ uri: currentStep.image }}
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.textContent}>
          <Text variant="h1" style={styles.title}>{currentStep.title}</Text>
          <Text variant="body" style={styles.subtitle}>{currentStep.subtitle}</Text>
        </View>

        {/* 4. Indikator halaman (dots) */}
        <View style={styles.dotsContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* 5. Tombol navigasi dinamis */}
        <View style={styles.buttonContainer}>
          {currentIndex > 0 && ( // Tampilkan tombol 'Back' jika bukan halaman pertama
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          <Button style={styles.primaryButton} onPress={handleNext}>
            <Text variant="body" style={styles.primaryButtonText}>
              {/* Ganti teks tombol di halaman terakhir */}
              {isLastStep ? 'Get Started' : 'Continue'}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

// Tambahkan beberapa style baru
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03624C',
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
    marginBottom: 48, // Tambah jarak
  },
  textContent: {
    alignItems: 'center',
    marginBottom: 32,
    minHeight: 150, // Beri tinggi minimum agar layout stabil
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    color: '#ff6b35',
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 48,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#3b82f6',
    width: 24,
  },
  dotInactive: {
    backgroundColor: '#d1d5db',
    width: 8,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    flex: 1, // Agar tombol mengisi ruang yang tersedia
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  backButton: {
    padding: 16,
    marginRight: 16,
  },
  backButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});