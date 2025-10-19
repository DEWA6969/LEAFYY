import AsyncStorage from '@react-native-async-storage/async-storage';

// Base API URL - use LAN IP so Expo Go/real device can reach backend
// Replace with your PC's IPv4 if it changes
const API_URL = 'http://192.168.54.13:3000/api';

class API {
  // Helper function to get headers
  async getHeaders() {
    const token = await AsyncStorage.getItem('@token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  // Register
  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        return (
          data || {
            success: false,
            message: `HTTP error ${response.status}`,
          }
        );
      }
      return data;
    } catch (error) {
      console.error('Register API error:', error);
      return {
        success: false,
        message: error.message.includes('Network') 
          ? 'Tidak dapat terhubung ke server. Pastikan backend sudah running.'
          : 'Terjadi kesalahan saat mendaftar',
      };
    }
  }

  // Verify OTP
  async verifyOTP(userId, otp) {
    try {
      const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, otp }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Verify OTP API error:', error);
      return {
        success: false,
        message: error.message.includes('Network') 
          ? 'Tidak dapat terhubung ke server. Pastikan backend sudah running.'
          : 'Terjadi kesalahan saat verifikasi OTP',
      };
    }
  }

  // Resend OTP
  async resendOTP(userId) {
    try {
      const response = await fetch(`${API_URL}/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Resend OTP API error:', error);
      return {
        success: false,
        message: error.message.includes('Network') 
          ? 'Tidak dapat terhubung ke server. Pastikan backend sudah running.'
          : 'Terjadi kesalahan saat mengirim ulang OTP',
      };
    }
  }

  // Login
  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        // Pass through server error payload (e.g., requiresVerification, userId, message)
        return (
          data || {
            success: false,
            message: `HTTP error ${response.status}`,
          }
        );
      }
      return data;
    } catch (error) {
      console.error('Login API error:', error);
      return {
        success: false,
        message: error.message.includes('Network') 
          ? 'Tidak dapat terhubung ke server. Pastikan backend sudah running.'
          : 'Terjadi kesalahan saat login',
      };
    }
  }

  // Forgot Password
  async forgotPassword(email) {
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Forgot password API error:', error);
      return {
        success: false,
        message: 'Tidak dapat terhubung ke server',
      };
    }
  }

  // Reset Password
  async resetPassword(token, newPassword) {
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Reset password API error:', error);
      return {
        success: false,
        message: 'Tidak dapat terhubung ke server',
      };
    }
  }

  // Get Profile
  async getProfile() {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'GET',
        headers,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get profile API error:', error);
      return {
        success: false,
        message: 'Tidak dapat terhubung ke server',
      };
    }
  }

  // Update Profile
  async updateProfile(userData) {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Update profile API error:', error);
      return {
        success: false,
        message: 'Tidak dapat terhubung ke server',
      };
    }
  }
}

export default new API();
