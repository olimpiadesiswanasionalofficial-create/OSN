# OLIMPIADE SISWA NASIONAL (OSN)
### Platform Olimpiade Online Berstandar Nasional & Enterprise Grade
**Slogan:** *"BERANI MENCOBA UNTUK MASA DEPAN GEMILANG"*

---

## 🌟 Ikhtisar Aplikasi

**Olimpiade Siswa Nasional** adalah aplikasi web bisnis kelas atas (*Luxury & Enterprise Grade*) yang dirancang khusus untuk menyelenggarakan kompetisi sains, matematika, informatika/AI, dan literasi bahasa secara daring (online) bagi siswa jenjang SD/MI, SMP/MTs, dan SMA/MA/SMK di 38 provinsi di seluruh Indonesia.

Website ini dibangun dengan arsitektur **Monorepo Production-Ready**:
- **Frontend**: React 18+ (Vite), Tailwind CSS, Google Font *Plus Jakarta Sans*, Lucide React Icons, dan *Micro-interactions*.
- **Backend**: Express.js (Node.js ESM) dengan SDK Resmi Google Gen AI (`@google/genai`) terintegrasi model `gemini-3.8-flash`.
- **Whitelabel System**: Terpusat pada `appConfig.js` yang dibaca dinamis oleh Frontend dan Backend.
- **cPanel Shared Hosting Ready**: Mendukung penuh cPanel Node.js Selector (Satelitweb & provider cPanel lainnya) dengan entry point `app.js`.

---

## 🏛️ Struktur Direktori Proyek

```
├── appConfig.js            # Pusat konfigurasi bisnis dinamis (Whitelabel)
├── app.js                  # Entry point Node.js Selector cPanel (Express + Static Asset Manager)
├── server.ts / server.js   # Server development & API proxy fullstack
├── index.html              # HTML entry point utama (Google Font Plus Jakarta Sans + SEO Meta)
├── metadata.json           # Metadata spesifikasi Google AI Studio Applet
├── package.json            # Root dependencies & build scripts
├── src/                    # Source code React (Vite Root Applet)
│   ├── App.tsx             # Komponen utama UI luxury, filter, modal checkout & AI Drawer
│   ├── index.css           # Tailwind CSS & custom luxury scrollbar styling
│   └── main.tsx            # React DOM mounting
├── client/                 # Sub-modul Client untuk deployment monorepo independen
│   ├── package.json
│   ├── index.html
│   ├── tailwind.config.js
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
└── README.md               # Dokumentasi lengkap & panduan deployment
```

---

## ✨ Fitur Unggulan Sistem

1. **Branding & Visual Luxury Kontras Tinggi**:
   - Logo heraldic geometris SVG dengan aksen emas murni (*Gold Accent `#D4AF37`*) dan typography badge tegas.
   - Tipografi elegan Google Font **Plus Jakarta Sans** di seluruh antarmuka.
2. **Stabilitas Aset Gambar 100% (Zero Broken Image)**:
   - Menggunakan foto direct Ultra-HD Unsplash royalty-free yang aktif.
   - Dilengkapi komponen `ImageWithFallback` otomatis jika terjadi gangguan jaringan pengguna.
3. **Interactive Filter & Product Grid**:
   - Filter instan kategori: Sains & Matematika, Informatika & AI, Bahasa & Literasi, serta Masterclass Pembinaan.
   - Rincian fasilitas: Piagam QR Code resmi, medali fisik lapis emas, dan simulasi CBT.
4. **Formulir Pendaftaran & Checkout Instan**:
   - Modal registrasi lengkap (Nama, Jenjang, Sekolah, Provinsi, No. WhatsApp, Email).
   - Generator tautan konfirmasi WhatsApp otomatis ke panitia dengan format pesan terstruktur rapi.
5. **Konsultan Akademik AI (Gemini 3.8 Flash)**:
   - Drawer interaktif dengan floating button beranimasi pulse.
   - Terhubung langsung ke endpoint `/api/recommendation`.
   - Memberikan rekomendasi lomba sesuai jenjang dan minat siswa, serta memotivasi siswa sesuai slogan brand.
6. **Pusat Bantuan & FAQ Accordion**:
   - Accordion interaktif untuk pertanyaan regulasi, pengakuan sertifikat SNBP/PPDB, dan jadwal ujian.

---

## ⚙️ Dynamic Configuration Whitelabel (`appConfig.js`)

Seluruh data bisnis, kontak, warna tema, paket produk olimpiade, galeri foto, dan pertanyaan FAQ dikelola dalam satu file konfigurasi:

```javascript
export const APP_CONFIG = {
  brandName: "OLIMPIADE SISWA NASIONAL",
  businessType: "OLIMPIADE ONLINE",
  tagline: "BERANI MENCOBA UNTUK MASA DEPAN GEMILANG",
  description: "OLIMPIADE ONLINE YANG DI ADAKAN DI SELURUH INDONESIA",
  themeColor: {
    primary: "#1A1615",  // Dark Executive Accent
    accent: "#D4AF37",   // Gold Luxury Accent
    bgLight: "#FAF8F5"   // Warm Neutral Ivory
  },
  contact: {
    whatsapp: "6281234567890",
    displayPhone: "+62 812-3456-7890",
    email: "info@satelitweb.com",
    address: "Jl. Utama Bisnis No. 1, Jakarta Pusat, Indonesia"
  },
  // products, gallery, testimonials, faq...
};
```

---

## 🚀 Panduan Menjalankan di Komputer Lokal (Development)

### 1. Prasyarat
- Node.js versi 18.x atau 20.x LTS ke atas.
- NPM versi 9.x atau yang lebih baru.

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menyiapkan Environment Variables
Buat file `.env` di root direktori (salin dari `.env.example`):
```env
PORT=3000
GEMINI_API_KEY="AIzaSy... (API Key Gemini Anda)"
```
*(Catatan: Sistem memiliki fallback cerdas jika API key belum diisi, sehingga aplikasi tetap berjalan tanpa crash).*

### 4. Menjalankan Server Development
```bash
npm run dev
```
Akses aplikasi melalui peramban web di: `http://localhost:3000`

### 5. Menguji Build Produksi
```bash
npm run build
npm start
```

---

## 🌐 Panduan Lengkap Deployment ke cPanel Shared Hosting (Satelitweb)

Panduan langkah demi langkah untuk mengunggah dan menjalankan aplikasi ini pada cPanel hosting yang dilengkapi fitur **Setup Node.js App** (CloudLinux / cPanel Node.js Selector):

### Langkah 1: Build Aset Frontend
Sebelum diunggah, lakukan proses build agar aset statis terkompilasi ke dalam folder `dist`:
```bash
npm run build
```

### Langkah 2: Persiapan File untuk Unggah
Siapkan file dan folder berikut untuk diunggah ke hosting (dapat dikemas dalam bentuk `.zip`):
- `app.js` (Entry point cPanel)
- `appConfig.js`
- `package.json`
- `dist/` (Folder hasil build frontend)
- `.env` (Berisi konfigurasi environment)

*(Catatan: Folder `node_modules` TIDAK PERLU diunggah, karena dependensi akan di-install langsung di terminal cPanel).*

### Langkah 3: Konfigurasi di cPanel "Setup Node.js App"
1. Masuk ke cPanel akun **Satelitweb** Anda.
2. Pada menu **Software**, klik **Setup Node.js App**.
3. Klik tombol **Create Application**:
   - **Node.js version**: Pilih versi **18.x** atau **20.x** (disarankan versi LTS terbaru).
   - **Application mode**: Pilih **Production**.
   - **Application root**: Masukkan direktori aplikasi Anda (misal: `osn-app` atau direktori sub-domain).
   - **Application URL**: Pilih domain atau subdomain utama Anda.
   - **Application startup file**: Masukkan `app.js`.
4. Klik **Create**.

### Langkah 4: Unggah File ke File Manager
1. Buka **File Manager** cPanel.
2. Masuk ke direktori yang Anda tentukan di Application Root (misal: `osn-app`).
3. Unggah file zip tadi dan ekstrak isinya.
4. Pastikan struktur file di root folder tersebut memuat:
   `app.js`, `appConfig.js`, `package.json`, `.env`, dan folder `dist/`.

### Langkah 5: Pasang Dependensi (Install Dependencies)
1. Kembali ke menu **Setup Node.js App** di cPanel.
2. Pada aplikasi yang baru dibuat, klik ikon edit (pensil).
3. Salin perintah virtual environment yang tertera di bagian atas (contoh: `source /home/user/nodevenv/osn-app/20/bin/activate && cd /home/user/osn-app`).
4. Buka menu **Terminal** di cPanel, tempel perintah tersebut dan tekan Enter.
5. Jalankan perintah instalasi dependensi:
   ```bash
   npm install --omit=dev
   ```
6. Atau Anda cukup mengklik tombol **Run NPM Install** pada panel cPanel Node.js App.

### Langkah 6: Environment Variables di cPanel
Pada bagian **Environment variables** di menu Setup Node.js App, tambahkan:
- `NODE_ENV`: `production`
- `GEMINI_API_KEY`: Masukkan Google Gemini API Key Anda.

### Langkah 7: Restart Aplikasi
1. Klik tombol **Restart Application** di panel cPanel.
2. Buka domain/website Anda di browser.
3. Uji refresh halaman pada rute mana pun (berkat catch-all route di `app.js`, SPA tidak akan pernah mengalami error 404).

---

## 🔒 Keamanan & Praktik Terbaik (Enterprise Standards)
- **Zero API Key Leakage**: API Key Gemini hanya diakses di sisi server (Node.js) via `process.env.GEMINI_API_KEY` dan tidak pernah terekspos ke bundle browser client.
- **Safe Image Handling**: URL Unsplash direct aktif dengan query parameter resolusi optimal & fallback otomatis.
- **Mobile First Accessibility**: Tombol sentuh minimal 44px, kontras rasio warna tinggi memenuhi standar WCAG AA.
- **Resilient Fallback**: Sistem AI konsultasi dilengkapi mekanisme penanganan otomatis jika kuota API habis atau server offline.

---
*Dikembangkan dengan dedikasi tinggi untuk kemajuan pendidikan dan prestasi generasi muda Indonesia.*
