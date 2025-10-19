# 🌱 Leafyy Mobile - Smart Plant Monitoring App

Aplikasi mobile untuk monitoring dan merawat tanaman dengan sensor pintar dan automasi.

## 📱 Teknologi

- **React Native** - Framework mobile
- **Expo** - Development platform
- **React Navigation** - Navigasi mobile
- **JavaScript (ES6+)** - Programming language

## 🚀 Cara Menjalankan

### 1. Install Dependencies
```bash
npm install
```

### 2. Jalankan Aplikasi
```bash
npm start
```

### 3. Akses Aplikasi

Setelah server berjalan, Anda akan melihat QR code di terminal:

#### Option A: Di Smartphone (Recommended)
1. Install **Expo Go** app dari:
   - [Play Store (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [App Store (iOS)](https://apps.apple.com/app/expo-go/id982107779)
2. Scan QR code yang muncul di terminal
3. Aplikasi akan terbuka di Expo Go

#### Option B: Di Emulator
- Tekan `a` untuk Android emulator (harus sudah install Android Studio)
- Tekan `i` untuk iOS simulator (hanya macOS dengan Xcode)

#### Option C: Di Web Browser
- Tekan `w` untuk membuka di browser web

## 📂 Struktur Proyek

```
LeafyyMobile/
├── App.js                  # Entry point aplikasi
├── index.js               # Main index
├── app.json               # Expo configuration
├── src/
│   ├── components/        # Komponen UI reusable
│   │   ├── ui/           # Basic UI components
│   │   │   ├── Card.js
│   │   │   ├── Button.js
│   │   │   ├── Progress.js
│   │   │   ├── Text.js
│   │   │   └── index.js
│   │   └── layout/
│   │       └── MobileShell.js
│   ├── screens/          # Halaman aplikasi
│   │   ├── Dashboard.js  # Halaman utama
│   │   ├── Devices.js    # Manajemen device
│   │   ├── Settings.js   # Pengaturan
│   │   ├── Login.js      # Halaman login
│   │   └── Onboarding.js # Onboarding
│   └── navigation/
│       └── AppNavigator.js # Setup navigasi
└── assets/               # Images & icons

```

## ✨ Fitur Utama

### 🏠 Dashboard
- Overview kondisi tanaman
- Monitoring kelembaban tanah (Soil Moisture)
- Monitor suhu (Temperature)
- Monitor cahaya (Sunlight)
- Chart history data sensor
- Jadwal penyiraman otomatis
- Daftar tanaman dengan status

### 📟 Devices
- Daftar sensor terhubung
- Status koneksi real-time
- Battery monitoring
- Tambah device baru
- Pengaturan device

### ⚙️ Settings
- Pengaturan profil
- Notifikasi
- Plant library
- Watering schedule
- Device management
- Dark mode
- Help & support

## 🛠️ Troubleshooting

### Port sudah digunakan
Jika mendapat error "Port is being used", matikan proses Node.js:
```bash
# Windows
taskkill /F /IM node.exe

# Linux/Mac
killall node
```

Lalu jalankan ulang:
```bash
npm start
```

### Clear cache
Jika ada masalah dengan cache:
```bash
npm start -- --clear
```

### Install ulang dependencies
Jika ada masalah dengan package:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 Scripts

- `npm start` - Jalankan development server
- `npm run android` - Jalankan di Android
- `npm run ios` - Jalankan di iOS
- `npm run web` - Jalankan di web browser

## 🎨 Desain

Aplikasi menggunakan design system modern dengan:
- Color scheme: Blue (#3b82f6) sebagai primary color
- Typography: SF Pro (iOS) / Roboto (Android)
- Components: Card-based layout dengan shadow
- Icons: Ionicons dari @expo/vector-icons

## 📱 Platform Support

- ✅ Android (5.0+)
- ✅ iOS (13.0+)
- ✅ Web (untuk testing)

## 🔧 Development

Aplikasi ini dibangun dengan:
- JavaScript ES6+
- React Hooks (useState, useEffect)
- React Native StyleSheet
- React Navigation v7
- Expo SDK ~54

## 📄 License

Private project

---

Dibuat dengan ❤️ untuk monitoring tanaman pintar 🌱

