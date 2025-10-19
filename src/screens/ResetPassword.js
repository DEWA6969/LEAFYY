import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Text, Input } from '../components/ui';
import { Ionicons } from '@expo/vector-icons';

export default function ResetPassword({ route, navigation }) {
  const { token } = route.params || {};
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password baru wajib diisi';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password harus mengandung huruf besar, kecil, dan angka';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    if (validateForm()) {
      // TODO: Implement reset password API call
      console.log('Resetting password with token:', token);
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Success Icon */}
          <View style={styles.successIconContainer}>
            <Ionicons name="checkmark-circle" size={80} color="#10b981" />
          </View>

          {/* Title */}
          <View style={styles.textContent}>
            <Text variant="h1" style={styles.title}>Password Berhasil Diubah!</Text>
            <Text variant="body" style={styles.subtitle}>
              Password Anda telah berhasil diperbarui. Silakan login dengan password baru Anda.
            </Text>
          </View>

          {/* Action Button */}
          <Button 
            style={styles.successButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text variant="body" style={styles.successButtonText}>
              Login Sekarang
            </Text>
          </Button>
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
            <Ionicons name="key-outline" size={64} color="#ffffff" />
          </View>

          {/* Title */}
          <View style={styles.textContent}>
            <Text variant="h1" style={styles.title}>Buat Password Baru</Text>
            <Text variant="body" style={styles.subtitle}>
              Password baru Anda harus berbeda dengan password sebelumnya
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Password Baru"
              placeholder="Masukkan password baru"
              value={formData.password}
              onChangeText={(text) => updateField('password', text)}
              secureTextEntry={!showPassword}
              icon="lock-closed-outline"
              error={errors.password}
            />
            
            {/* Password Requirements */}
            <View style={styles.requirementsContainer}>
              <Text variant="caption" style={styles.requirementsTitle}>
                Password harus mengandung:
              </Text>
              <PasswordRequirement 
                met={formData.password.length >= 8}
                text="Minimal 8 karakter"
              />
              <PasswordRequirement 
                met={/[a-z]/.test(formData.password)}
                text="Huruf kecil (a-z)"
              />
              <PasswordRequirement 
                met={/[A-Z]/.test(formData.password)}
                text="Huruf besar (A-Z)"
              />
              <PasswordRequirement 
                met={/\d/.test(formData.password)}
                text="Angka (0-9)"
              />
            </View>

            <Input
              label="Konfirmasi Password"
              placeholder="Masukkan ulang password"
              value={formData.confirmPassword}
              onChangeText={(text) => updateField('confirmPassword', text)}
              secureTextEntry={!showConfirmPassword}
              icon="lock-closed-outline"
              error={errors.confirmPassword}
            />
          </View>

          {/* Reset Button */}
          <Button style={styles.resetButton} onPress={handleReset}>
            <Text variant="body" style={styles.resetButtonText}>
              Reset Password
            </Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function PasswordRequirement({ met, text }) {
  return (
    <View style={styles.requirementItem}>
      <Ionicons 
        name={met ? "checkmark-circle" : "ellipse-outline"} 
        size={16} 
        color={met ? "#10b981" : "#d1d5db"} 
      />
      <Text 
        variant="caption" 
        style={[
          styles.requirementText, 
          met && styles.requirementTextMet
        ]}
      >
        {text}
      </Text>
    </View>
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
    width: 140,
    height: 140,
    borderRadius: 70,
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
  },
  form: {
    width: '100%',
    marginBottom: 24,
  },
  requirementsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginTop: -12,
    marginBottom: 16,
  },
  requirementsTitle: {
    color: '#e5e7eb',
    fontWeight: '600',
    marginBottom: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  requirementText: {
    color: '#d1d5db',
    marginLeft: 8,
  },
  requirementTextMet: {
    color: '#10b981',
  },
  resetButton: {
    backgroundColor: '#2CC295',
    paddingVertical: 16,
  },
  resetButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  successButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
  },
  successButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
