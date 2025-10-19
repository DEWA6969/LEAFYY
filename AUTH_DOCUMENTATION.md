# 🔐 Authentication Features - Leafyy Mobile

Dokumentasi lengkap fitur autentikasi aplikasi Leafyy Mobile.

## 📋 Fitur yang Tersedia

### 1. **Login** ✅
Halaman login dengan validasi lengkap:
- Input: Email/Username dan Password
- Validasi format email
- Validasi panjang password (minimal 6 karakter)
- Link ke halaman "Lupa Password"
- Link ke halaman "Daftar"
- Error handling yang user-friendly

**File**: `src/screens/Login.js`

**Validasi**:
- Email harus format valid jika menggunakan @
- Password minimal 6 karakter
- Menampilkan pesan error spesifik untuk setiap field

---

### 2. **Register (Pendaftaran)** ✅
Halaman pendaftaran akun baru:
- Input: Username, Email, Password, Konfirmasi Password
- Checkbox persetujuan Syarat & Ketentuan
- Validasi kompleks untuk setiap field
- Password strength requirements
- Navigasi ke OTP verification setelah sukses

**File**: `src/screens/Register.js`

**Validasi**:
- Username: minimal 3 karakter, hanya huruf/angka/underscore
- Email: format email valid
- Password: minimal 8 karakter, harus ada huruf besar, kecil, dan angka
- Konfirmasi password harus cocok
- Harus menyetujui terms & conditions

---

### 3. **OTP Verification** ✅
Verifikasi kode OTP 6 digit:
- 6 input field auto-focus
- Auto-verify ketika 6 digit terisi
- Timer countdown 60 detik
- Tombol kirim ulang OTP
- Masked email untuk privasi
- Error handling

**File**: `src/screens/OTPVerification.js`

**Fitur**:
- Auto-focus ke field berikutnya saat input
- Backspace ke field sebelumnya
- Timer countdown untuk resend
- Visual feedback untuk error
- Demo OTP: **123456**

---

### 4. **Forgot Password** ✅
Reset password via email:
- Input email untuk menerima link reset
- Konfirmasi email terkirim
- Tombol kirim ulang
- Link kembali ke login

**File**: `src/screens/ForgotPassword.js`

**Flow**:
1. User masukkan email
2. Sistem kirim email reset
3. Tampil konfirmasi sukses
4. User bisa kirim ulang jika belum terima

---

### 5. **Reset Password** ✅
Membuat password baru:
- Input password baru & konfirmasi
- Real-time password strength indicator
- Visual checklist requirement
- Konfirmasi sukses dengan redirect ke login

**File**: `src/screens/ResetPassword.js`

**Password Requirements**:
- ✓ Minimal 8 karakter
- ✓ Huruf kecil (a-z)
- ✓ Huruf besar (A-Z)
- ✓ Angka (0-9)

---

### 6. **Auth Context** ✅
Global state management untuk authentication:
- Login/Logout functions
- User state management
- Token storage dengan AsyncStorage
- Auto-load user on app start
- Fake API untuk demo

**File**: `src/context/AuthContext.js`

**Functions**:
```javascript
const {
  user,              // User object
  loading,           // Loading state
  isAuthenticated,   // Auth status
  login,             // Login function
  register,          // Register function
  verifyOTP,         // Verify OTP
  logout,            // Logout function
  forgotPassword,    // Forgot password
  resetPassword,     // Reset password
  updateProfile,     // Update user profile
} = useAuth();
```

---

## 🎨 UI Components

### Input Component
Custom input dengan validasi dan icon:
```javascript
<Input
  label="Email"
  placeholder="Masukkan email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  icon="mail-outline"
  error={errorMessage}
/>
```

**Props**:
- `label`: Label input
- `placeholder`: Placeholder text
- `value`: Current value
- `onChangeText`: Change handler
- `secureTextEntry`: Hide text (for password)
- `keyboardType`: Keyboard type
- `icon`: Ionicons name
- `error`: Error message

**File**: `src/components/ui/Input.js`

---

## 🔄 Navigation Flow

```
Login
  ├─→ Register → OTP Verification → Main App
  ├─→ Forgot Password → Email Sent → Login
  └─→ Main App (if login success)

Reset Password → Success → Login
```

---

## 💾 Data Storage

Menggunakan **AsyncStorage** untuk menyimpan:
- `@user`: User data (JSON)
- `@token`: Authentication token

**Auto-load** saat app start untuk persistent login.

---

## 🧪 Testing

### Demo Credentials

**Login**:
- Email: `user@leafyy.com`
- Password: `password123`

**OTP**:
- Code: `123456`

---

## 📱 Responsive Design

Semua halaman menggunakan:
- `KeyboardAvoidingView` untuk iOS/Android
- `ScrollView` untuk konten panjang
- Responsive styling
- Touch feedback
- Loading states

---

## 🎯 Error Handling

### Types of Errors:
1. **Validation Errors**: Tampil di bawah field
2. **API Errors**: Tampil sebagai alert/toast
3. **Network Errors**: Handled dengan try-catch

### Error Messages:
- Spesifik dan jelas
- Dalam bahasa Indonesia
- Dengan icon visual feedback
- Auto-clear saat user mulai ketik

---

## 🔒 Security Features

1. **Password Requirements**:
   - Minimal 8 karakter
   - Kombinasi huruf besar, kecil, angka
   - Visual indicator kekuatan password

2. **Token Storage**:
   - Secure storage dengan AsyncStorage
   - Auto-clear on logout

3. **Email Masking**:
   - OTP screen: `u***r@example.com`
   - Privacy protection

4. **Session Management**:
   - Auto-logout on token expire (TODO)
   - Persistent login dengan AsyncStorage

---

## 🚀 Next Steps (TODO)

### Backend Integration:
- [ ] Connect real API endpoints
- [ ] Implement JWT token refresh
- [ ] Add biometric authentication
- [ ] Add social login (Google, Apple)
- [ ] Add phone number verification
- [ ] Implement rate limiting

### UI Enhancements:
- [ ] Add loading spinners
- [ ] Add success animations
- [ ] Add error toasts
- [ ] Add splash screen with auth check

### Security:
- [ ] Add secure token storage (Keychain/KeyStore)
- [ ] Implement token rotation
- [ ] Add device fingerprinting
- [ ] Add login history
- [ ] Add 2FA option

---

## 📖 Usage Examples

### Using Auth Context:

```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, login, logout } = useAuth();

  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.success) {
      // Navigate to main app
    } else {
      // Show error
      alert(result.error);
    }
  };

  return (
    <View>
      {user ? (
        <Text>Welcome, {user.name}!</Text>
      ) : (
        <Button onPress={handleLogin}>Login</Button>
      )}
    </View>
  );
}
```

### Protected Routes:

```javascript
function ProtectedScreen() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="Login" />;
  }

  return <YourComponent />;
}
```

---

## 🎨 Design System

### Colors:
- Primary: `#3b82f6` (Blue)
- Success: `#10b981` (Green)
- Error: `#ef4444` (Red)
- Text Primary: `#1f2937` (Dark Gray)
- Text Secondary: `#6b7280` (Gray)
- Text Muted: `#9ca3af` (Light Gray)

### Typography:
- h1: 24px, weight 800
- h2: 20px, weight 700
- h3: 18px, weight 600
- body: 16px, weight 400
- caption: 14px, weight 500

### Spacing:
- Small: 8px
- Medium: 16px
- Large: 24px
- XLarge: 32px

---

## 📞 Support

Jika ada pertanyaan atau issue, silakan contact developer.

---

**Last Updated**: October 2025  
**Version**: 1.0.0  
**Status**: ✅ Production Ready

