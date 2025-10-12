import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from storage on app start
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('@user');
      const token = await AsyncStorage.getItem('@token');
      
      console.log('📱 Loading user from storage...');
      console.log('User data:', userData);
      console.log('Token:', token ? 'exists' : 'not found');
      
      if (userData && token) {
        const parsedUser = JSON.parse(userData);
        console.log('✅ Parsed user:', parsedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        console.log('❌ No user data found');
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('🔐 Logging in...', email);
      const response = await API.login(email, password);
      
      console.log('📥 Login response:', response);
      
      if (response.success) {
        const { user, token } = response.data;
        
        console.log('✅ Login successful!');
        console.log('User data:', user);
        console.log('Token:', token ? 'received' : 'missing');
        
        // Save to storage
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        await AsyncStorage.setItem('@token', token);
        
        console.log('💾 Saved to AsyncStorage');
        
        setUser(user);
        setIsAuthenticated(true);
        
        return { success: true };
      } else {
        console.log('❌ Login failed:', response.message);
        
        // Check if requires verification
        if (response.requiresVerification) {
          return { 
            success: false, 
            error: response.message,
            requiresVerification: true,
            userId: response.userId
          };
        }
        
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      return { success: false, error: 'Terjadi kesalahan saat login' };
    }
  };

  const saveUser = async (userData, token) => {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(userData));
      await AsyncStorage.setItem('@token', token);
      setUser(userData);
      setIsAuthenticated(true);
      console.log('💾 User saved to storage:', userData);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const register = async (userData) => {
    try {
      const response = await API.register(userData);
      
      if (response.success) {
        // Registrasi berhasil, perlu verifikasi OTP
        return { 
          success: true, 
          message: 'Registrasi berhasil! Silakan verifikasi OTP.',
          data: response.data // Pass data dari backend
        };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Terjadi kesalahan saat mendaftar' };
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const response = await API.verifyOTP(email, otp);
      
      if (response.success) {
        const { user, token } = response.data;
        
        // Save to storage
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        await AsyncStorage.setItem('@token', token);
        
        setUser(user);
        setIsAuthenticated(true);
        
        return { success: true };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      return { success: false, error: 'Terjadi kesalahan saat verifikasi OTP' };
    }
  };

  const logout = async () => {
    try {
      // Clear storage
      await AsyncStorage.removeItem('@user');
      await AsyncStorage.removeItem('@token');
      
      setUser(null);
      setIsAuthenticated(false);
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'Terjadi kesalahan saat logout' };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await API.forgotPassword(email);
      
      if (response.success) {
        return { success: true };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      return { success: false, error: 'Terjadi kesalahan saat mengirim email' };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const response = await API.resetPassword(token, newPassword);
      
      if (response.success) {
        return { success: true };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Reset password error:', error);
      return { success: false, error: 'Terjadi kesalahan saat reset password' };
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await API.updateProfile(userData);
      
      if (response.success) {
        const updatedUser = { ...user, ...response.data.user };
        await AsyncStorage.setItem('@user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        return { success: true };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: 'Terjadi kesalahan saat update profil' };
    }
  };

  const resendOTP = async (email) => {
    try {
      const response = await API.resendOTP(email);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      return { success: false, error: 'Terjadi kesalahan saat mengirim OTP' };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    saveUser,
    verifyOTP,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    resendOTP,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
