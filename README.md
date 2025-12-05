# Aplikasi Chat Real-time

Aplikasi mobile chat real-time yang memungkinkan multiple users berkomunikasi secara langsung menggunakan Firebase Firestore sebagai database. Pesan yang dikirim akan langsung muncul di semua device yang terkoneksi tanpa perlu refresh.

## Deskripsi

Aplikasi ini dibangun untuk demonstrasi komunikasi real-time pada perangkat mobile. Ketika user mengirim pesan, pesan tersebut disimpan ke Firebase Firestore dan secara otomatis ter-sync ke semua client yang sedang membuka aplikasi. Aplikasi menggunakan Firebase Anonymous Authentication untuk autentikasi user, sehingga user hanya perlu memasukkan nama tanpa perlu registrasi.

**Fitur Utama:**
- Login dengan nama (tanpa password)
- Kirim dan terima pesan secara real-time
- Tampilan pesan berbeda untuk pengirim (kanan/biru) dan penerima (kiri/abu-abu)
- Menampilkan nama pengirim di setiap pesan
- Auto-scroll ke pesan terbaru
- Sinkronisasi otomatis di semua device

## Teknologi

**Frontend:**
- React Native 0.82.1 - Framework cross-platform untuk membangun aplikasi mobile
- TypeScript - Superset JavaScript dengan static typing
- React Navigation - Library untuk navigasi antar screen

**Backend:**
- Firebase Firestore - NoSQL cloud database dengan real-time sync
- Firebase Authentication - Anonymous auth untuk identifikasi user

## Arsitektur Aplikasi

```
User 1 (Mobile) ──┐
                  │
User 2 (Mobile) ──┼──> Firebase Firestore (Cloud Database)
                  │
User 3 (Mobile) ──┘
```

Semua pesan disimpan di Firebase Firestore collection `messages`. Setiap perubahan di database akan otomatis dipush ke semua client yang sedang listen.

## Cara Menjalankan

### 1. Install Dependencies
Masuk ke folder project dan install semua package yang dibutuhkan:
```bash
cd ChatApp
npm install
```

### 2. Setup Android Emulator
Buka Android Studio, kemudian:
- Klik **Device Manager** (icon HP di toolbar kanan)
- Klik **Create Device**
- Pilih **Phone → Pixel 5 → Next**
- Pilih **System Image**: API 33 (Android 13) atau API 34
- Download system image jika belum ada
- Klik **Next → Finish**
- Klik tombol **▶️** untuk menjalankan emulator

### 3. Verifikasi Device
Pastikan emulator sudah terdeteksi:
```bash
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" devices
```

Output yang diharapkan:
```
List of devices attached
emulator-5554    device
```

### 4. Run Aplikasi
Buka 2 terminal:

**Terminal 1** - Metro Bundler (JavaScript bundler):
```bash
cd ChatApp
npm start
```

**Terminal 2** - Build & install aplikasi:
```bash
cd ChatApp
npx react-native run-android
```

Build pertama akan memakan waktu 5-10 menit karena download dependencies dan compile kode native.

### 5. Testing
1. Aplikasi akan terbuka otomatis di emulator
2. Masukkan nama Anda di halaman login
3. Klik **Masuk Chat**
4. Ketik pesan dan klik **Kirim**

**Testing Multi-User:**
Untuk test chat antar user, jalankan aplikasi di 2 emulator/device berbeda dengan nama user berbeda.

## Struktur Project

```
mobileChatApp/
├── ChatApp/                    # Root React Native project
│   ├── android/               # Native Android code
│   │   └── app/
│   │       ├── build.gradle          # Android build config
│   │       └── google-services.json  # Firebase config
│   ├── screens/               # UI Screens
│   │   ├── LoginScreen.tsx           # Screen untuk input nama user
│   │   └── ChatScreen.tsx            # Screen untuk chat room
│   ├── App.tsx                       # Entry point, setup navigation
│   ├── package.json                  # NPM dependencies
│   └── tsconfig.json                 # TypeScript configuration
├── firebase.ts                # Firebase initialization & config
└── README.md                  # Dokumentasi
```

## Penjelasan File Utama

### `firebase.ts`
File konfigurasi Firebase yang berisi:
- Inisialisasi Firebase app dengan API key
- Setup Firestore database
- Setup Anonymous Authentication
- Export functions untuk operasi database

### `App.tsx`
Komponen utama yang:
- Melakukan anonymous sign in ke Firebase
- Setup navigation stack (LoginScreen → ChatScreen)
- Mengelola state user authentication

### `LoginScreen.tsx`
Screen pertama yang user lihat:
- Input field untuk nama user
- Validasi: nama tidak boleh kosong
- Navigate ke ChatScreen setelah submit

### `ChatScreen.tsx`
Screen utama chat yang:
- Menampilkan daftar pesan dengan FlatList
- Real-time listener untuk perubahan di Firestore
- Input field untuk ketik pesan baru
- Fungsi untuk kirim pesan ke database

## Cara Kerja Real-time Sync

1. **User mengirim pesan:**
   - User ketik pesan → klik Kirim
   - App panggil `addDoc()` untuk save ke Firestore
   - Firestore menyimpan dengan timestamp otomatis

2. **Semua client menerima update:**
   - App menggunakan `onSnapshot()` listener
   - Setiap ada perubahan di collection `messages`
   - Listener trigger update otomatis
   - UI re-render dengan pesan terbaru

3. **Data structure di Firestore:**
```javascript
messages (collection)
  └── [auto-id] (document)
      ├── text: "Halo!"
      ├── user: "Ahmad"
      └── createdAt: Timestamp(2024-12-05 10:30:00)
```

## Troubleshooting

### Emulator tidak terdeteksi
**Gejala:** `adb devices` tidak menampilkan device

**Solusi:**
- Pastikan emulator sudah fully booted (sudah sampai home screen)
- Restart ADB: 
  ```bash
  & "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" kill-server
  & "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" start-server
  ```

### Build gagal (Gradle error)
**Gejala:** Error saat `run-android`

**Solusi:**
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### Metro bundler error
**Gejala:** Red screen "Unable to connect to metro"

**Solusi:**
```bash
# Kill semua proses React Native/Metro
npx react-native start --reset-cache
```

### Firebase connection error
**Gejala:** Pesan tidak tersimpan/tidak muncul

**Solusi:**
- Cek internet connection
- Pastikan `google-services.json` ada di `android/app/`
- Buka Firebase Console, pastikan Firestore sudah enabled
- Cek Firestore Rules membolehkan read/write

---

**Tugas PBP - Universitas Diponegoro**  
Semester 5 - Pemrograman Berbasis Platform  
Topik: Komunikasi Aplikasi Perangkat Bergerak dalam Jaringan
