# 📁 Struktur Proyek Leafyy Mobile

Proyek ini terdiri dari 2 bagian utama: **Backend API** dan **Mobile App (React Native)**

---

## 🗂️ Struktur Folder

```
.Leafyy UTS/
│
├── backend/                    # 🔌 Backend API (Node.js + Express + MySQL)
│   ├── config/
│   │   └── database.js        # Konfigurasi MySQL
│   ├── controllers/
│   │   └── authController.js  # Logic authentication
│   ├── middleware/
│   │   └── auth.js            # JWT middleware
│   ├── routes/
│   │   └── auth.js            # API routes
│   ├── utils/
│   │   └── emailService.js    # Email service (nodemailer)
│   ├── config.env             # Environment variables
│   ├── database.sql           # Database schema
│   ├── server.js              # Entry point server
│   ├── package.json           # Dependencies
│   └── README.md              # Backend documentation
│
└── LeafyyMobile/              # 📱 Mobile App (React Native + Expo)
    ├── src/
    │   ├── components/
    │   │   ├── ui/            # Reusable UI components
    │   │   └── layout/        # Layout components
    │   ├── screens/           # App screens
    │   ├── navigation/        # Navigation setup
    │   ├── context/           # Global state (AuthContext)
    │   └── services/          # API service layer
    ├── assets/                # Images & icons
    ├── App.js                 # Entry point mobile app
    ├── package.json           # Dependencies
    ├── app.json               # Expo configuration
    └── README.md              # Mobile app documentation
```

---

## 🚀 Cara Menjalankan

### **Backend API**

```bash
# Masuk ke folder backend
cd "C:\Users\yudis\Downloads\.Leafyy UTS\backend"

# Install dependencies (pertama kali)
npm install

# Jalankan server
npm start

# Server akan berjalan di: http://localhost:3000
```

### **Mobile App**

```bash
# Masuk ke folder mobile
cd "C:\Users\lenovo\Downloads\.Leafyy UTS\LeafyyMobile"

# Install dependencies (pertama kali)
npm install

# Jalankan app
npm start

# App akan berjalan di: http://localhost:8081
```

---

## 📡 API Endpoints

**Base URL:** `http://localhost:3000/api/auth`

### Endpoints:
- `POST /register` - Daftar akun baru
- `POST /verify-otp` - Verifikasi OTP
- `POST /resend-otp` - Kirim ulang OTP
- `POST /login` - Login user
- `POST /forgot-password` - Request reset password
- `POST /reset-password` - Reset password
- `GET /profile` - Get profile (protected)
- `PUT /profile` - Update profile (protected)

---

## 🗄️ Database

**Database:** `project_mobile`

**Tables:**
- `login` - User data
- `refresh_tokens` - Token management
- `login_history` - Login tracking

**Setup Database:**
```bash
mysql -u root -p
source backend/database.sql
```

---

## ⚙️ Konfigurasi

### Backend (`backend/config.env`):
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=project_mobile
DB_PORT=3306

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

PORT=3000

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Mobile App (`src/services/api.js`):
```javascript
// Untuk testing di emulator
const API_URL = 'http://localhost:3000/api';

// Untuk testing di device fisik
// const API_URL = 'http://192.168.1.XXX:3000/api';
```

---

## 📝 Dokumentasi

### Backend:
- `backend/README.md` - API documentation
- `backend/database.sql` - Database schema

### Mobile App:
- `LeafyyMobile/README.md` - App guide
- `LeafyyMobile/AUTH_DOCUMENTATION.md` - Auth features
- `LeafyyMobile/MYSQL_INTEGRATION.md` - MySQL setup guide

---

## 🛠️ Technology Stack

### Backend:
- Node.js + Express
- MySQL2
- JWT (jsonwebtoken)
- bcryptjs
- nodemailer
- CORS

### Mobile App:
- React Native + Expo
- React Navigation
- AsyncStorage
- React Query (optional)

---

## 🔒 Security Features

1. **Password Hashing** - bcrypt
2. **JWT Authentication** - Token-based
3. **OTP Verification** - Email verification
4. **Password Reset** - Secure token
5. **Protected Routes** - Middleware auth

---

## 🧪 Testing

### Test Backend:
```bash
# Test server
curl http://localhost:3000

# Test register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"Test123"}'
```

### Test Mobile:
1. Scan QR code dengan Expo Go
2. Atau tekan `w` untuk web browser

---

## 📞 Support

- Backend Issues: Check `backend/README.md`
- Mobile App Issues: Check `LeafyyMobile/README.md`
- MySQL Issues: Check `MYSQL_INTEGRATION.md`

---

**Version:** 1.0.0  
**Last Updated:** October 2025  
**Status:** ✅ Production Ready

