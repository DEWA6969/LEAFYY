import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Button, Text, Input } from '../components/ui';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function Register({ navigation }) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username wajib diisi';
    } else if (formData.username.length < 4) {
      newErrors.username = 'Username minimal 4 karakter';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username hanya boleh huruf, angka, dan underscore';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password harus mengandung huruf besar, kecil, dan angka';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    // Terms validation
    if (!agreedToTerms) {
      newErrors.terms = 'Anda harus menyetujui syarat dan ketentuan';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      console.log('📝 Registering user:', formData.email);
      
      const result = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      
      setLoading(false);
      
      console.log('✅ Register result:', result);
      
      if (result.success) {
        // Navigate to OTP verification
        Alert.alert(
          'Berhasil!',
          'Kode OTP telah dikirim ke email Anda. Silakan cek email dan masukkan kode verifikasi.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('OTPVerification', {
                  userId: result.data.userId,
                  email: formData.email,
                  username: formData.username,
                });
              }
            }
          ]
        );
      } else {
        Alert.alert(
          'Registrasi Gagal',
          result.error || 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.'
        );
      }
    } catch (error) {
      setLoading(false);
      console.error('❌ Register error:', error);
      Alert.alert(
        'Error',
        'Tidak dapat terhubung ke server. Pastikan backend sudah running.'
      );
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Logo */}
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
            onError={(error) => console.log('Logo load error:', error)}
            onLoad={() => console.log('Logo loaded successfully')}
          />
          
          {/* Title */}
          <View style={styles.textContent}>
            <View style={styles.titleContainer}>
              <Text variant="h1" style={styles.titleLeafyy}>LEAFYY</Text>
              <Text variant="h1" style={styles.titleTech}>TECH</Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Username"
              placeholder="Masukkan username"
              value={formData.username}
              onChangeText={(text) => updateField('username', text)}
              autoCapitalize="none"
              icon="person-outline"
              error={errors.username}
            />

            <Input
              label="Email"
              placeholder="Masukkan email"
              value={formData.email}
              onChangeText={(text) => updateField('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
              error={errors.email}
            />

            <Input
              label="Password"
              placeholder="Masukkan password"
              value={formData.password}
              onChangeText={(text) => updateField('password', text)}
              secureTextEntry={!showPassword}
              icon="lock-closed-outline"
              error={errors.password}
            />
            <Text variant="caption" style={styles.passwordHint}>
              Minimal 8 karakter, kombinasi huruf besar, kecil, dan angka
            </Text>

            <Input
              label="Konfirmasi Password"
              placeholder="Masukkan ulang password"
              value={formData.confirmPassword}
              onChangeText={(text) => updateField('confirmPassword', text)}
              secureTextEntry={!showConfirmPassword}
              icon="lock-closed-outline"
              error={errors.confirmPassword}
            />

            {/* Terms and Conditions */}
            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => setAgreedToTerms(!agreedToTerms)}
            >
              <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
                {agreedToTerms && (
                  <Ionicons name="checkmark" size={16} color="#ffffff" />
                )}
              </View>
              <Text variant="caption" style={styles.checkboxText}>
                Saya setuju dengan{' '}
                <Text style={styles.linkText}>Syarat & Ketentuan</Text>
                {' '}dan{' '}
                <Text style={styles.linkText}>Kebijakan Privasi</Text>
              </Text>
            </TouchableOpacity>
            {errors.terms && (
              <Text variant="caption" style={styles.errorText}>{errors.terms}</Text>
            )}
          </View>

          {/* Register Button */}
          <View style={styles.buttonContainer}>
            <Button 
              style={styles.registerButton} 
              onPress={handleRegister}
              disabled={loading}
            >
              <Text variant="body" style={styles.registerButtonText}>
                {loading ? 'Mendaftar...' : 'Daftar'}
              </Text>
            </Button>
            
            {/* Login Link */}
            <TouchableOpacity 
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
            >
              <Text variant="body" style={styles.loginLinkText}>
                Sudah punya akun? <Text style={styles.loginLinkTextBold}>Masuk</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 20,
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
  logo: {
    height: 50,
    width: 120,
    alignSelf: 'center',
    marginBottom: 24,
  },
  textContent: {
    alignItems: 'center',
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  titleLeafyy: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 24,
  },
  titleTech: {
    color: '#ff6b35',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 24,
    marginLeft: 6,
  },
  pageTitle: {
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#e5e7eb',
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    width: '100%',
    marginBottom: 24,
  },
  passwordHint: {
    color: '#e5e7eb',
    marginTop: -12,
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2CC295',
    borderColor: '#2CC295',
  },
  checkboxText: {
    flex: 1,
    color: '#e5e7eb',
    lineHeight: 20,
  },
  linkText: {
    color: '#2CC295',
    fontWeight: '500',
  },
  errorText: {
    color: '#ef4444',
    marginTop: 4,
  },
  buttonContainer: {
    width: '100%',
  },
  registerButton: {
    backgroundColor: '#2CC295',
    paddingVertical: 16,
    marginBottom: 16,
  },
  registerButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  loginLink: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#e5e7eb',
    textAlign: 'center',
  },
  loginLinkTextBold: {
    color: '#2CC295',
    fontWeight: '600',
  },
});
