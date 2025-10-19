# 🔌 Leafyy Mobile - Backend API

Backend API untuk aplikasi Leafyy Mobile menggunakan Node.js, Express, dan MySQL.

## 📋 Prerequisites

- Node.js v14+ 
- MySQL 5.7+ atau MariaDB
- npm atau yarn

## 🚀 Setup & Installation

### 1. Setup Database

Buka MySQL dan jalankan script SQL:

```bash
# Login ke MySQL
mysql -u root -p

# Jalankan script database
source database.sql

# Atau copy-paste isi database.sql ke MySQL
```

Database akan membuat:
- Database: `project_mobile`
- Tabel: `login`, `refresh_tokens`, `login_history`

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Konfigurasi Environment

Edit file `config.env` sesuai dengan konfigurasi MySQL Anda:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=project_mobile
DB_PORT=3306

JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d

PORT=3000
```

### 4. Jalankan Server

```bash
# Development mode (dengan nodemon)
npm run dev

# Production mode
npm start
```

Server akan berjalan di `http://localhost:3000`

---

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### 1. Register
**POST** `/auth/register`

Body:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Registrasi berhasil! Silakan verifikasi OTP",
  "data": {
    "email": "john@example.com",
    "username": "john_doe",
    "otpCode": "123456"
  }
}
```

---

#### 2. Verify OTP
**POST** `/auth/verify-otp`

Body:
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

Response:
```json
{
  "success": true,
  "message": "Verifikasi berhasil!",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "name": null,
      "avatar": null
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### 3. Login
**POST** `/auth/login`

Body:
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login berhasil!",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "name": null,
      "avatar": null
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### 4. Resend OTP
**POST** `/auth/resend-otp`

Body:
```json
{
  "email": "john@example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "OTP baru telah dikirim",
  "data": {
    "otpCode": "654321"
  }
}
```

---

#### 5. Forgot Password
**POST** `/auth/forgot-password`

Body:
```json
{
  "email": "john@example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "Link reset password telah dikirim ke email Anda",
  "data": {
    "resetToken": "abc123def456..."
  }
}
```

---

#### 6. Reset Password
**POST** `/auth/reset-password`

Body:
```json
{
  "token": "abc123def456...",
  "newPassword": "NewPassword123"
}
```

Response:
```json
{
  "success": true,
  "message": "Password berhasil diubah!"
}
```

---

#### 7. Get Profile (Protected)
**GET** `/auth/profile`

Headers:
```
Authorization: Bearer <your_token_here>
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "name": "John Doe",
      "avatar": null,
      "created_at": "2025-10-07T10:00:00.000Z",
      "last_login": "2025-10-07T12:00:00.000Z"
    }
  }
}
```

---

#### 8. Update Profile (Protected)
**PUT** `/auth/profile`

Headers:
```
Authorization: Bearer <your_token_here>
```

Body:
```json
{
  "name": "John Doe Updated",
  "avatar": "https://example.com/avatar.jpg"
}
```

Response:
```json
{
  "success": true,
  "message": "Profil berhasil diupdate",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "name": "John Doe Updated",
      "avatar": "https://example.com/avatar.jpg"
    }
  }
}
```

---

## 🔒 Authentication

API menggunakan JWT (JSON Web Token) untuk authentication.

### Cara Menggunakan Token:

1. Setelah login/register berhasil, simpan token yang diterima
2. Untuk endpoint yang protected, kirim token di header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 🗄️ Database Schema

### Tabel: `login`

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| username | VARCHAR(50) | Username unik |
| email | VARCHAR(100) | Email unik |
| password | VARCHAR(255) | Password (hashed) |
| name | VARCHAR(100) | Nama lengkap |
| avatar | VARCHAR(255) | URL avatar |
| is_verified | BOOLEAN | Status verifikasi |
| otp_code | VARCHAR(6) | Kode OTP |
| otp_expires | DATETIME | Waktu expire OTP |
| reset_token | VARCHAR(255) | Token reset password |
| reset_token_expires | DATETIME | Waktu expire token |
| created_at | TIMESTAMP | Waktu dibuat |
| updated_at | TIMESTAMP | Waktu update |
| last_login | TIMESTAMP | Login terakhir |

---

## 🧪 Testing dengan Postman/Thunder Client

### Import Collection
Import file `Leafyy_API.postman_collection.json` ke Postman

### Test Flow:
1. Register → Dapat OTP
2. Verify OTP → Dapat token
3. Login → Dapat token
4. Get Profile (dengan token)
5. Update Profile (dengan token)

---

## ⚠️ Error Handling

Semua error response mengikuti format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

### Common Error Codes:
- `400` - Bad Request (validasi gagal)
- `401` - Unauthorized (token invalid/expired)
- `404` - Not Found (resource tidak ditemukan)
- `500` - Internal Server Error

---

## 🔐 Security Features

1. **Password Hashing**: Menggunakan bcrypt
2. **JWT Authentication**: Token-based auth
3. **OTP Verification**: Email/phone verification
4. **Password Reset**: Secure token-based reset
5. **SQL Injection Prevention**: Prepared statements
6. **CORS**: Configured untuk keamanan

---

## 📝 TODO

- [ ] Implement email sending (nodemailer)
- [ ] Add rate limiting
- [ ] Add refresh token mechanism
- [ ] Add input sanitization
- [ ] Add request logging
- [ ] Add API documentation (Swagger)
- [ ] Add unit tests
- [ ] Add social login (Google, Facebook)

---

## 🤝 Support

Jika ada masalah atau pertanyaan, contact developer.

---

**Version**: 1.0.0  
**Last Updated**: October 2025
