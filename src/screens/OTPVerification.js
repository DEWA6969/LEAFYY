import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Button, Text } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function OTPVerification({ route, navigation }) {
  const { userId, email, username } = route.params;
  const { saveUser } = useAuth();
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
  
  const inputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOTPChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      Alert.alert('Error', 'Silakan masukkan 6 digit kode OTP');
      return;
    }

    try {
      setLoading(true);
      console.log('🔐 Verifying OTP:', otpCode);
      
      const response = await api.verifyOTP(email, otpCode);
      
      setLoading(false);
      
      if (response.success) {
        console.log('✅ OTP verified!');
        
        // Save user data
        await saveUser(response.data.user, response.data.token);
        
        Alert.alert(
          'Berhasil!',
          'Email Anda telah diverifikasi. Selamat datang di Leafyy!',
          [
            {
              text: 'OK',
              onPress: () => navigation.replace('MainTabs')
            }
          ]
        );
      } else {
        Alert.alert('Verifikasi Gagal', response.message || 'Kode OTP tidak valid');
      }
    } catch (error) {
      setLoading(false);
      console.error('❌ Verify OTP error:', error);
      Alert.alert('Error', 'Tidak dapat terhubung ke server');
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;

    try {
      setResending(true);
      console.log('📧 Resending OTP...');
      
      const response = await api.resendOTP(email);
      
      setResending(false);
      
      if (response.success) {
        setTimer(60);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        Alert.alert('Berhasil', 'Kode OTP baru telah dikirim ke email Anda');
      } else {
        Alert.alert('Gagal', response.message || 'Gagal mengirim ulang OTP');
      }
    } catch (error) {
      setResending(false);
      console.error('❌ Resend OTP error:', error);
      Alert.alert('Error', 'Tidak dapat terhubung ke server');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text variant="h1" style={styles.titleLeafyy}>LEAFYY</Text>
            <Text variant="h1" style={styles.titleTech}>TECH</Text>
          </View>
          <Text variant="h2" style={styles.pageTitle}>Verifikasi Email</Text>
          <Text variant="body" style={styles.subtitle}>
            Kami telah mengirim kode 6 digit ke
          </Text>
          <Text variant="body" style={styles.email}>{email}</Text>
        </View>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => inputRefs.current[index] = ref}
              style={[
                styles.otpInput,
                digit && styles.otpInputFilled
              ]}
              value={digit}
              onChangeText={value => handleOTPChange(value, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Verify Button */}
        <Button 
          style={styles.verifyButton} 
          onPress={handleVerify}
          disabled={loading || otp.join('').length !== 6}
        >
          <Text variant="body" style={styles.buttonText}>
            {loading ? 'Memverifikasi...' : 'Verifikasi'}
          </Text>
        </Button>

        {/* Resend OTP */}
        <View style={styles.resendContainer}>
          <Text variant="caption" style={styles.resendText}>
            Tidak menerima kode?{' '}
          </Text>
          <TouchableOpacity 
            onPress={handleResend}
            disabled={timer > 0 || resending}
          >
            <Text 
              variant="caption" 
              style={[
                styles.resendLink,
                (timer > 0 || resending) && styles.resendDisabled
              ]}
            >
              {resending ? 'Mengirim...' : timer > 0 ? `Kirim ulang (${timer}s)` : 'Kirim Ulang'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View style={styles.infoBox}>
          <Text variant="caption" style={styles.infoText}>
            💡 Kode OTP berlaku selama 10 menit
          </Text>
          <Text variant="caption" style={styles.infoText}>
            📧 Cek folder spam jika tidak menemukan email
          </Text>
        </View>

        {/* Back to Register */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text variant="caption" style={styles.backText}>
            ← Kembali ke Registrasi
          </Text>
        </TouchableOpacity>
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
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
  },
  email: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
    marginTop: 4,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 32,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
    backgroundColor: '#fff',
  },
  otpInputFilled: {
    borderColor: '#10b981',
    backgroundColor: '#ecfdf5',
  },
  verifyButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  resendText: {
    color: '#6b7280',
    fontSize: 14,
  },
  resendLink: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '600',
  },
  resendDisabled: {
    color: '#9ca3af',
  },
  infoBox: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ffc107',
    marginBottom: 24,
  },
  infoText: {
    color: '#856404',
    fontSize: 13,
    marginVertical: 4,
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  backText: {
    color: '#6b7280',
    fontSize: 14,
  },
});

