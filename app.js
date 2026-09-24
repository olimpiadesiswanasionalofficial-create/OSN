/**
 * ENTRY POINT CPANEL NODE.JS SELECTOR & PRODUCTION SERVER
 * File: app.js
 * 
 * Sesuai spesifikasi cPanel Shared Hosting (Satelitweb & cPanel Provider Lain):
 * - Otomatis mendeteksi dynamic PORT dari process.env.PORT
 * - Menyajikan static assets dari folder client/dist atau dist
 * - Catch-all fallback route untuk menjamin React SPA tidak pernah 404 saat di-refresh
 * - Endpoint AI Recommendation terintegrasi langsung dengan @google/genai
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { APP_CONFIG } from './appConfig.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Inisialisasi Google Gen AI Client dengan telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// System Instruction dinamis membaca dari appConfig.js
const systemInstruction = `
Anda adalah Senior Academic Consultant & Penasihat Resmi dari ${APP_CONFIG.brandName} (${APP_CONFIG.businessType}) yang diselenggarakan oleh ${APP_CONFIG.organizer}.
Slogan Brand: "${APP_CONFIG.tagline}".
Slogan Sekunder: "${APP_CONFIG.sloganSecondary}".
Deskripsi Brand: "${APP_CONFIG.description}".

Daftar Kategori Kompetisi & Program Unggulan Kami:
${APP_CONFIG.products
  .map(
    (p, idx) =>
      `${idx + 1}. ${p.name} (${p.category}) - Untuk Jenjang: ${p.level}. Status: Penyisihan GRATIS. Fasilitas: ${p.features.join(', ')}.`
  )
  .join('\n')}

Kontak Resmi Panitia:
- WhatsApp Call Center: ${APP_CONFIG.contact.displayPhone} (+${APP_CONFIG.contact.whatsapp})
- Penyelenggara Resmi: ${APP_CONFIG.organizer}
- Email: ${APP_CONFIG.contact.email}
- Kantor: ${APP_CONFIG.contact.address}

Prinsip & Gaya Komunikasi Anda:
1. Bersikap ramah, santun, berwibawa, penuh motivasi, dan profesional (Executive Education Tone).
2. Tanamkan semangat slogan: "${APP_CONFIG.tagline}".
3. Tekankan bahwa Babak Penyisihan adalah GRATIS dan peserta boleh mengikuti lebih dari satu mata pelajaran.
4. Bantu siswa atau orang tua memilih bidang olimpiade yang paling cocok berdasarkan minat, bakat, atau jenjang sekolahnya (PAUD/TK, SD/MI, SMP/MTs).
5. Jelaskan nilai tambah sertifikat resmi ber-QR code nasional dari LKP Prestasi Nusantara, medali fisik lapis emas, serta piala trofi juara umum.
6. Berikan ajakan ramah (call-to-action) untuk mendaftar sekarang atau berkonsultasi via WhatsApp resmi di ${APP_CONFIG.contact.displayPhone}.
7. Jawab secara padat, inspiratif, dan terstruktur (2 - 4 paragraf atau dengan bullet points yang rapi).
`;

// Endpoint Rekomendasi AI Konsultan Akademik
app.post('/api/recommendation', async (req, res) => {
  try {
    const { message, history, studentLevel, interest } = req.body;

    if (!message && !interest) {
      return res.status(400).json({
        success: false,
        error: 'Pesan atau minat peserta wajib diisi.',
      });
    }

    const userPrompt = `
Pertanyaan / Pesan Pengguna: "${message || 'Saya ingin tahu olimpiade apa yang paling cocok untuk saya.'}"
Jenjang Pendidikan Pengguna: "${studentLevel || 'Belum ditentukan'}"
Minat / Mata Pelajaran Favorit: "${interest || 'Sains / Matematika / Bahasa / IPS'}"

Mohon berikan rekomendasi terbaik, motivasi berprestasi, dan panduan langkah selanjutnya.
`;

    // Jika GEMINI_API_KEY belum diset di cPanel, berikan respons pintar fallback
    if (!process.env.GEMINI_API_KEY) {
      const selectedProduct =
        APP_CONFIG.products.find((p) =>
          interest ? p.name.toLowerCase().includes(interest.toLowerCase()) : false
        ) || APP_CONFIG.products[0];

      return res.json({
        success: true,
        reply: `Halo Generasi Emas Indonesia! Di ${APP_CONFIG.brandName} (${APP_CONFIG.organizer}), kami percaya bahwa "${APP_CONFIG.tagline}".\n\nBerdasarkan jenjang ${studentLevel || 'pendidikan Anda'} dan minat pada bidang ${interest || 'akademik'}, kami merekomendasikan Anda untuk mengikuti "${selectedProduct.name}". Babak penyisihan kompetisi ini dapat diikuti secara GRATIS tanpa biaya pendaftaran awal, dan dilengkapi sertifikat digital ber-QR code resmi serta piala bagi para pemenang!\n\nJangan ragu untuk mengambil langkah pertama menuju masa depan gemilang. Silakan klik tombol 'Daftar Sekarang' di website atau hubungi panitia via WhatsApp resmi kami di ${APP_CONFIG.contact.displayPhone}.`,
        recommendedProduct: selectedProduct,
      });
    }

    // Panggil model Gemini 3.8 Flash
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'Terima kasih atas pertanyaan Anda. Silakan hubungi WhatsApp panitia di ' + APP_CONFIG.contact.displayPhone + ' untuk panduan lebih lanjut.';

    // Cari produk paling relevan dari teks rekomendasi
    let bestProduct = APP_CONFIG.products[0];
    for (const prod of APP_CONFIG.products) {
      if (
        replyText.toLowerCase().includes(prod.name.toLowerCase()) ||
        replyText.toLowerCase().includes(prod.category.toLowerCase())
      ) {
        bestProduct = prod;
        break;
      }
    }

    return res.json({
      success: true,
      reply: replyText,
      recommendedProduct: bestProduct,
    });
  } catch (error) {
    console.error('Error in /api/recommendation:', error);
    return res.json({
      success: true,
      reply: `Halo! Di ${APP_CONFIG.brandName} (${APP_CONFIG.organizer}), kami mendukung siswa untuk "${APP_CONFIG.tagline}". Untuk jenjang ${req.body.studentLevel || 'sekolah Anda'}, kompetisi ${APP_CONFIG.products[0].name} adalah opsi terpopuler dengan babak penyisihan GRATIS. Hubungi kami via WhatsApp ${APP_CONFIG.contact.displayPhone} untuk konsultasi langsung.`,
      recommendedProduct: APP_CONFIG.products[0],
    });
  }
});

// Deteksi folder build dist (Mendukung monorepo /client/dist atau root /dist)
let staticPath = path.resolve(__dirname, 'dist');
if (!fs.existsSync(staticPath)) {
  const clientDist = path.resolve(__dirname, 'client', 'dist');
  if (fs.existsSync(clientDist)) {
    staticPath = clientDist;
  }
}

if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(staticPath, 'index.html'));
  });
} else {
  console.log(`[INFO] Static build directory not found at ${staticPath}. Running API mode.`);
}

app.listen(PORT, () => {
  console.log(`[OK] ${APP_CONFIG.brandName} server listening on port ${PORT}`);
});

export default app;
