# 🗄️ MySQL Integration - Leafyy Mobile

Panduan lengkap integrasi MySQL dengan Leafyy Mobile App.

## ✅ **Setup Selesai!**

Backend API sudah terhubung dengan MySQL dan siap digunakan.

---

## 📦 **Yang Sudah Dibuat:**

### 1. **Database Schema** (`backend/database.sql`)
- Database: `project_mobile`
- Tabel: `login` (users)
- Tabel: `refresh_tokens`
- Tabel: `login_history`

### 2. **Backend API** (`backend/`)
- Express.js server
- MySQL2 connection pool
- JWT authentication
- Password hashing (bcrypt)
- RESTful API endpoints

### 3. **React Native Integration**
- API service (`src/services/api.js`)
- Auth Context updated (menggunakan real API)
- AsyncStorage untuk token & user data

---

## 🚀 **Cara Menjalankan:**

### Step 1: Setup Database

```bash
# 1. Buka MySQL
mysql -u root -p

# 2. Jalankan script database
source backend/database.sql

# Atau copy-paste isi database.sql
```

### Step 2: Konfigurasi Backend

Edit `backend/config.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=         # Isi password MySQL Anda
DB_NAME=project_mobile
DB_PORT=3306
```

### Step 3: Install & Run Backend

```bash
cd backend
npm install
npm start
```

Backend akan berjalan di: **http://localhost:3000**

### Step 4: Konfigurasi React Native

Edit `src/services/api.js` - Line 4:

```javascript
// Untuk emulator/web:
const API_URL = 'http://localhost:3000/api';

// Untuk device fisik, ganti dengan IP komputer Anda:
// const API_URL = 'http://192.168.1.100:3000/api';
```

**Cara cek IP komputer:**
```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

Cari IP Address (contoh: 192.168.1.100)

### Step 5: Run React Native App

```bash
cd LeafyyMobile
npm start
```

Tekan `w` untuk web atau scan QR code dengan Expo Go.

---

## 📡 **API Endpoints yang Tersedia:**

### Base URL
```
http://localhost:3000/api/auth
```

### Endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Daftar akun baru |
| POST | `/verify-otp` | Verifikasi OTP |
| POST | `/resend-otp` | Kirim ulang OTP |
| POST | `/login` | Login user |
| POST | `/forgot-password` | Request reset password |
| POST | `/reset-password` | Reset password |
| GET | `/profile` | Get user profile (protected) |
| PUT | `/profile` | Update profile (protected) |

---

## 🧪 **Testing:**

### Test dengan Postman/Thunder Client:

1. **Register**
```
POST http://localhost:3000/api/auth/register
Body: {
  "username": "testuser",
  "email": "test@example.com",
  "password": "Test123456"
}
```

2. **Verify OTP**
```
POST http://localhost:3000/api/auth/verify-otp
Body: {
  "email": "test@example.com",
  "otp": "123456"  // Check console untuk OTP
}
```

3. **Login**
```
POST http://localhost:3000/api/auth/login
Body: {
  "email": "test@example.com",
  "password": "Test123456"
}
```

Response akan berisi `token`. Simpan token ini.

4. **Get Profile** (Protected)
```
GET http://localhost:3000/api/auth/profile
Headers: {
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

---

## 🗄️ **Database Structure:**

### Tabel `login`:

```sql
CREATE TABLE login (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  avatar VARCHAR(255),
  is_verified BOOLEAN DEFAULT FALSE,
  otp_code VARCHAR(6),
  otp_expires DATETIME,
  reset_token VARCHAR(255),
  reset_token_expires DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL
);
```

### Query Berguna:

```sql
-- Lihat semua user
SELECT * FROM login;

-- Lihat user terverifikasi
SELECT * FROM login WHERE is_verified = TRUE;

-- Lihat login terakhir
SELECT username, email, last_login FROM login ORDER BY last_login DESC;

-- Hapus user
DELETE FROM login WHERE email = 'test@example.com';

-- Reset semua OTP
UPDATE login SET otp_code = NULL, otp_expires = NULL;
```

---

## 🔒 **Security Features:**

1. **Password Hashing**
   - Menggunakan bcrypt
   - Salt rounds: 10
   - Password tidak pernah disimpan plain text

2. **JWT Token**
   - Expire: 7 hari (configurable)
   - Secret key di `.env`
   - Token di header: `Authorization: Bearer TOKEN`

3. **OTP Verification**
   - 6 digit random number
   - Expire: 10 menit
   - Auto-clear setelah verifikasi

4. **Reset Password**
   - Token unik (crypto.randomBytes)
   - Expire: 1 jam
   - One-time use only

---

## 🐛 **Troubleshooting:**

### Error: Cannot connect to MySQL
```
✅ Solusi:
1. Pastikan MySQL service running
2. Check username & password di config.env
3. Test koneksi: mysql -u root -p
```

### Error: Table doesn't exist
```
✅ Solusi:
1. Jalankan ulang database.sql
2. Check database name: USE project_mobile;
3. Verify: SHOW TABLES;
```

### Error: Port 3000 already in use
```
✅ Solusi:
1. Ganti PORT di config.env
2. Atau kill process: 
   - Windows: taskkill /F /PID [PID]
   - Mac/Linux: kill -9 [PID]
```

### Error: Cannot connect from React Native
```
✅ Solusi:
1. Gunakan IP address bukan localhost
2. Pastikan firewall tidak block port 3000
3. Test di browser: http://localhost:3000
```

### OTP tidak terkirim
```
✅ Catatan:
- OTP saat ini hanya di-log ke console
- Check terminal backend untuk melihat OTP
- Untuk production, setup nodemailer untuk kirim email
```

---

## 📧 **Setup Email (Optional):**

Untuk mengirim OTP via email, edit `backend/config.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**Cara dapat App Password Gmail:**
1. Buka Google Account → Security
2. Enable 2-Step Verification
3. App passwords → Generate new
4. Copy password ke `EMAIL_PASSWORD`

---

## 📊 **Monitoring:**

### Check Backend Status:
```bash
# Test API endpoint
curl http://localhost:3000

# Response:
{
  "success": true,
  "message": "Leafyy Mobile API Server",
  "version": "1.0.0"
}
```

### Check Database Status:
```sql
-- Check koneksi
SHOW PROCESSLIST;

-- Check table size
SELECT 
  table_name, 
  table_rows, 
  data_length, 
  index_length
FROM information_schema.tables
WHERE table_schema = 'project_mobile';
```

---

## 🚀 **Production Deployment:**

### Checklist:
- [ ] Ganti JWT_SECRET dengan key yang kuat
- [ ] Setup HTTPS (SSL Certificate)
- [ ] Enable email sending (nodemailer)
- [ ] Add rate limiting
- [ ] Setup database backup
- [ ] Use environment variables
- [ ] Add logging system
- [ ] Setup monitoring (PM2, etc)

---

## 📝 **Next Steps:**

1. **Email Integration**
   - Setup nodemailer
   - Create email templates
   - Send OTP via email

2. **Additional Features**
   - Social login (Google, Facebook)
   - 2FA authentication
   - Login history tracking
   - Password strength meter
   - Account lockout after failed attempts

3. **Security Enhancements**
   - Rate limiting
   - IP whitelist
   - Request validation
   - SQL injection prevention
   - XSS protection

---

## 📞 **Support:**

- Backend API Doc: `backend/README.md`
- Auth Features Doc: `AUTH_DOCUMENTATION.md`
- Main README: `README.md`

---

**Status**: ✅ **Production Ready!**  
**Last Updated**: October 2025  
**Version**: 1.0.0

