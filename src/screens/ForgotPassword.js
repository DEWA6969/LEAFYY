import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Text, Input } from '../components/ui';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setError('Email wajib diisi');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Format email tidak valid');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateEmail()) {
      // TODO: Implement forgot password API call
      console.log('Sending reset link to:', email);
      setIsSubmitted(true);
    }
  };

  const handleResend = () => {
    if (validateEmail()) {
      console.log('Resending reset link to:', email);
    }
  };

  if (isSubmitted) {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Success Icon */}
          <View style={styles.successIconContainer}>
            <Ionicons name="mail-open-outline" size={64} color="#10b981" />
          </View>

          {/* Title */}
          <View style={styles.textContent}>
            <Text variant="h1" style={styles.title}>Email Terkirim!</Text>
            <Text variant="body" style={styles.subtitle}>
              Kami telah mengirimkan link reset password ke
            </Text>
            <Text variant="body" style={styles.email}>{email}</Text>
            <Text variant="caption" style={styles.hint}>
              Silakan cek inbox atau folder spam email Anda
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.buttonContainer}>
            <Button 
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text variant="body" style={styles.primaryButtonText}>
                Kembali ke Login
              </Text>
            </Button>

            <TouchableOpacity 
              style={styles.resendButton}
              onPress={handleResend}
            >
              <Text variant="body" style={styles.resendButtonText}>
                Tidak menerima email? <Text style={styles.resendButtonTextBold}>Kirim Ulang</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Ionicons name="lock-closed-outline" size={64} color="#ffffff" />
          </View>

          {/* Title */}
          <View style={styles.textContent}>
            <Text variant="h1" style={styles.title}>Lupa Password?</Text>
            <Text variant="body" style={styles.subtitle}>
              Masukkan email Anda dan kami akan mengirimkan link untuk reset password
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="Masukkan email Anda"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (error) setError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
              error={error}
            />
          </View>

          {/* Submit Button */}
          <View style={styles.buttonContainer}>
            <Button style={styles.submitButton} onPress={handleSubmit}>
              <Text variant="body" style={styles.submitButtonText}>
                Kirim Link Reset
              </Text>
            </Button>

            <TouchableOpacity 
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
            >
              <Ionicons name="arrow-back" size={16} color="#2CC295" />
              <Text variant="body" style={styles.loginLinkText}>
                Kembali ke Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03624C',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 32,
  },
  successIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 32,
  },
  textContent: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: '#e5e7eb',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
  email: {
    color: '#2CC295',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 12,
  },
  hint: {
    color: '#d1d5db',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  form: {
    width: '100%',
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#2CC295',
    paddingVertical: 16,
    marginBottom: 16,
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#2CC295',
    paddingVertical: 16,
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  loginLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  loginLinkText: {
    color: '#2CC295',
    fontWeight: '500',
  },
  resendButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  resendButtonText: {
    color: '#e5e7eb',
    textAlign: 'center',
  },
  resendButtonTextBold: {
    color: '#2CC295',
    fontWeight: '600',
  },
});
