import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Button, Text, Input } from '../components/ui';
import { useAuth } from '../context/AuthContext';

export default function Login({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email atau username wajib diisi';
    } else if (email.includes('@') && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!password) {
      newErrors.password = 'Password wajib diisi';
    } else if (password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      console.log('🔐 Attempting login...', email);
      
      const result = await login(email, password);
      
      setLoading(false);
      
      if (result.success) {
        console.log('✅ Login successful! Navigating to Dashboard...');
        navigation.replace('MainTabs');
      } else if (result.requiresVerification) {
        // User needs to verify email first
        Alert.alert(
          'Email Belum Diverifikasi',
          result.error,
          [
            {
              text: 'Verifikasi Sekarang',
              onPress: () => navigation.navigate('OTPVerification', {
                userId: result.userId,
                email: email,
                username: email, // We don't have username here, use email
              })
            },
            {
              text: 'Nanti',
              style: 'cancel'
            }
          ]
        );
      } else {
        Alert.alert('Login Gagal', result.error || 'Email atau password salah');
      }
    } catch (error) {
      setLoading(false);
      console.error('❌ Login error:', error);
      Alert.alert('Error', 'Tidak dapat terhubung ke server');
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
              label="Email atau Username"
              placeholder="Masukkan email atau username"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="person-outline"
              error={errors.email}
            />

            <Input
              label="Password"
              placeholder="Masukkan password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: null });
              }}
              secureTextEntry={!showPassword}
              icon="lock-closed-outline"
              error={errors.password}
            />

            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text variant="caption" style={styles.forgotPasswordText}>
                Lupa Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <View style={styles.buttonContainer}>
            <Button 
              style={styles.loginButton} 
              onPress={handleLogin}
              disabled={loading}
            >
              <Text variant="body" style={styles.loginButtonText}>
                {loading ? 'Masuk...' : 'Masuk'}
              </Text>
            </Button>
            
            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text variant="caption" style={styles.dividerText}>ATAU</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Register Link */}
            <TouchableOpacity 
              style={styles.registerButton}
              onPress={() => navigation.navigate('Register')}
            >
              <Text variant="body" style={styles.registerButtonText}>
                Belum punya akun? <Text style={styles.registerButtonTextBold}>Daftar</Text>
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
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  logo: {
    height: 60,
    width: 150,
    alignSelf: 'center',
    marginBottom: 32,
  },
  textContent: {
    alignItems: 'center',
    marginBottom: 32,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleLeafyy: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 28,
  },
  titleTech: {
    color: '#ff6b35',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 28,
    marginLeft: 8,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
  },
  forgotPasswordText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
  },
  loginButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ffffff',
  },
  dividerText: {
    color: '#ffffff',
    marginHorizontal: 16,
  },
  registerButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#e5e7eb',
    textAlign: 'center',
  },
  registerButtonTextBold: {
    color: '#2CC295',
    fontWeight: '600',
  },
});