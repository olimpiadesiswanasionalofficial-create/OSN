import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { APP_CONFIG } from './appConfig.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google Gen AI client with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Dynamic system instruction derived from appConfig.js
const systemInstruction = `
Anda adalah Senior Academic Consultant & Penasihat Resmi dari ${APP_CONFIG.brandName} (${APP_CONFIG.businessType}) yang diselenggarakan resmi oleh ${APP_CONFIG.organizer}.
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
- Penyelenggara: ${APP_CONFIG.organizer}
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

// Production-ready API endpoint for AI consultation & product recommendation
app.post('/api/recommendation', async (req: Request, res: Response) => {
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
Minat / Mata Pelajaran Favorit: "${interest || 'Sains / Matematika / Bahasa / Teknologi'}"

Mohon berikan rekomendasi terbaik, motivasi berprestasi, dan panduan langkah selanjutnya.
`;

    // Check if API key is present
    if (!process.env.GEMINI_API_KEY) {
      // High-quality intelligent fallback response when running in environments without API key set
      const selectedProduct =
        APP_CONFIG.products.find((p) =>
          interest ? p.name.toLowerCase().includes(interest.toLowerCase()) : false
        ) || APP_CONFIG.products[0];

      return res.json({
        success: true,
        reply: `Halo Generasi Emas Indonesia! Di ${APP_CONFIG.brandName}, kami percaya bahwa "${APP_CONFIG.tagline}".\n\nBerdasarkan jenjang ${studentLevel || 'pendidikan Anda'} dan minat Anda pada ${interest || 'akademik'}, kami sangat merekomendasikan Anda untuk mengikuti "${selectedProduct.name}". Kompetisi ini dirancang khusus untuk mengasah penalaran tingkat tinggi (HOTS), memberikan sertifikat nasional ber-barcode, serta kesempatan meraih medali fisik eksklusif!\n\nJangan ragu untuk mengambil langkah pertama menuju masa depan gemilang. Silakan klik tombol 'Daftar Sekarang' di website atau hubungi panitia via WhatsApp resmi kami di ${APP_CONFIG.contact.displayPhone}.`,
        recommendedProduct: selectedProduct,
      });
    }

    // Call Gemini 3.8 Flash model
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'Terima kasih atas antusiasme Anda. Silakan hubungi panitia melalui WhatsApp untuk panduan pendaftaran.';

    // Infer recommended product if relevant
    let recommendedProduct = null;
    for (const prod of APP_CONFIG.products) {
      if (
        replyText.toLowerCase().includes(prod.name.toLowerCase()) ||
        replyText.toLowerCase().includes(prod.id.toLowerCase())
      ) {
        recommendedProduct = prod;
        break;
      }
    }
    if (!recommendedProduct) {
      recommendedProduct = APP_CONFIG.products[0];
    }

    return res.json({
      success: true,
      reply: replyText,
      recommendedProduct,
    });
  } catch (error: any) {
    console.error('Error in /api/recommendation:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kendala teknis pada sistem rekomendasi.',
      details: error?.message || 'Unknown error',
    });
  }
});

// Endpoint to retrieve public business configuration
app.get('/api/config', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: APP_CONFIG,
  });
});

// Server-side persistent storage for Participants Database
const dataDir = path.join(__dirname, 'data');
const participantsFile = path.join(dataDir, 'participants.json');

function getStoredParticipants(): any[] {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(participantsFile)) {
      const initialData = [
        {
          id: "OSN-2026-B-89102",
          fullName: "Dzaliqa Assyafa N",
          level: "SD / MI (Kategori B: Usia 7-12 Tahun)",
          schoolName: "SDN Teladan Bangsa (Kelas 5)",
          cityProvince: "DKI Jakarta",
          whatsapp: "08123456781",
          email: "dzaliqa.assyafa@gmail.com",
          subjects: ["Matematika", "IPA / Sains"],
          registeredAt: "2026-09-20T08:30:00.000Z",
          cbtStatus: "Aktif & Siap Ujian (Tercatat di Database)"
        },
        {
          id: "OSN-2026-C-99214",
          fullName: "Annora Geraldqueen S.R",
          level: "SMP / MTs (Kategori C: Usia 13-16 Tahun)",
          schoolName: "SMP Negeri 1 Nusantara",
          cityProvince: "Jawa Timur",
          whatsapp: "08123456782",
          email: "annora.gerald@gmail.com",
          subjects: ["Bahasa Indonesia", "Bahasa Inggris"],
          registeredAt: "2026-09-21T10:15:00.000Z",
          cbtStatus: "Aktif & Siap Ujian (Tercatat di Database)"
        }
      ];
      fs.writeFileSync(participantsFile, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const raw = fs.readFileSync(participantsFile, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading participants database:', err);
    return [];
  }
}

function saveStoredParticipants(list: any[]) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(participantsFile, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving participants database:', err);
  }
}

// Endpoint to list participants (for Admin portal)
app.get('/api/participants', (_req: Request, res: Response) => {
  const participants = getStoredParticipants();
  res.json({
    success: true,
    data: participants,
    total: participants.length
  });
});

// Endpoint to record a new registration automatically to database
app.post('/api/participants', (req: Request, res: Response) => {
  try {
    const { fullName, level, schoolName, cityProvince, whatsapp, email, subjects, parentName, fullAddress, id } = req.body;
    if (!fullName || !whatsapp) {
      return res.status(400).json({ success: false, error: 'Nama Lengkap dan Nomor WhatsApp wajib diisi.' });
    }

    const currentList = getStoredParticipants();
    const cleanPhone = String(whatsapp).replace(/[^0-9]/g, '').replace(/^62/, '0');
    
    // Check if already registered
    const existingIndex = currentList.findIndex((p: any) => {
      const pPhone = String(p.whatsapp).replace(/[^0-9]/g, '').replace(/^62/, '0');
      return pPhone === cleanPhone && p.fullName.toLowerCase() === String(fullName).trim().toLowerCase();
    });

    const newRecord = {
      id: id || (existingIndex >= 0 ? currentList[existingIndex].id : `OSN-2026-${Math.floor(1000 + Math.random() * 9000)}`),
      fullName: String(fullName).trim(),
      level: level || 'SD / MI (Kategori B: Usia 7-12 Tahun)',
      schoolName: schoolName || '-',
      cityProvince: cityProvince || '-',
      whatsapp: String(whatsapp).trim(),
      email: email || '-',
      parentName: parentName || '-',
      fullAddress: fullAddress || '-',
      subjects: Array.isArray(subjects) && subjects.length > 0 ? subjects : ['Matematika'],
      registeredAt: new Date().toISOString(),
      cbtStatus: 'Aktif & Siap Ujian (Tercatat di Database)'
    };

    if (existingIndex >= 0) {
      currentList[existingIndex] = newRecord;
    } else {
      currentList.unshift(newRecord);
    }

    saveStoredParticipants(currentList);

    return res.json({
      success: true,
      message: 'Pendaftaran otomatis tercatat pada sistem & database.',
      data: newRecord
    });
  } catch (error: any) {
    console.error('Error in POST /api/participants:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Gagal menyimpan data ke database.' });
  }
});

// Update participant exam results / progress (Simulasi or Final)
app.post('/api/participants/:id/exam', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { examType, subject, score, totalQuestions, completedAt } = req.body;
    const currentList = getStoredParticipants();
    const idx = currentList.findIndex((p: any) => p.id === id);

    if (idx === -1) {
      return res.status(404).json({ success: false, error: 'Peserta tidak ditemukan.' });
    }

    const p = currentList[idx];
    if (examType === 'final') {
      p.finalExam = {
        subject,
        score,
        totalQuestions,
        completedAt: completedAt || new Date().toISOString(),
        status: 'Selesai Mengerjakan Babak Final'
      };
      p.cbtStatus = 'Selesai Ujian Final (Lulus Evaluasi)';
    } else {
      p.simulatedExam = {
        subject,
        score,
        totalQuestions,
        completedAt: completedAt || new Date().toISOString(),
        status: 'Selesai Mengerjakan Simulasi CBT'
      };
      p.cbtStatus = 'Selesai Simulasi CBT';
    }

    currentList[idx] = p;
    saveStoredParticipants(currentList);

    return res.json({ success: true, data: p });
  } catch (error: any) {
    console.error('Error in POST /api/participants/:id/exam:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Gagal update status ujian.' });
  }
});

// Reset participant attempts / quota
app.post('/api/participants/:id/reset', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { examType, clearHistory, extraAttempt } = req.body;
    const currentList = getStoredParticipants();
    const idx = currentList.findIndex((p: any) => p.id === id);

    if (idx === -1) {
      return res.status(404).json({ success: false, error: 'Peserta tidak ditemukan.' });
    }

    const p = currentList[idx];
    delete p.violationReason;

    if (extraAttempt) {
      if (examType === 'final') {
        p.finalAttempts = Math.max(0, (p.finalAttempts || 2) - 1);
        p.cbtStatus = `Aktif (+1 Kuota Tambahan Final, Terpakai: ${p.finalAttempts}/2)`;
      } else {
        p.simulatedAttempts = Math.max(0, (p.simulatedAttempts || 2) - 1);
        p.cbtStatus = `Aktif (+1 Kuota Tambahan Penyisihan, Terpakai: ${p.simulatedAttempts}/2)`;
      }
    } else if (!examType || examType === 'all') {
      p.simulatedAttempts = 0;
      p.finalAttempts = 0;
      p.cbtStatus = 'Aktif (Kuota Ujian Direset 0/2)';
      if (clearHistory) {
        delete p.simulatedExam;
        delete p.finalExam;
        p.qualificationStatus = 'pending';
      }
    } else if (examType === 'simulasi') {
      p.simulatedAttempts = 0;
      p.cbtStatus = 'Aktif (Kuota Penyisihan Direset 0/2)';
      if (clearHistory) {
        delete p.simulatedExam;
        p.qualificationStatus = 'pending';
      }
    } else if (examType === 'final') {
      p.finalAttempts = 0;
      p.cbtStatus = 'Aktif (Kuota Final Direset 0/2)';
      if (clearHistory) {
        delete p.finalExam;
      }
    }

    currentList[idx] = p;
    saveStoredParticipants(currentList);
    return res.json({ success: true, message: 'Kuota berhasil di-reset.', data: p });
  } catch (error: any) {
    console.error('Error in POST /api/participants/:id/reset:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Gagal reset kuota peserta.' });
  }
});

// Update specific fields of participant
app.patch('/api/participants/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const currentList = getStoredParticipants();
    const idx = currentList.findIndex((p: any) => p.id === id);

    if (idx === -1) {
      return res.status(404).json({ success: false, error: 'Peserta tidak ditemukan.' });
    }

    currentList[idx] = { ...currentList[idx], ...req.body };
    saveStoredParticipants(currentList);
    return res.json({ success: true, data: currentList[idx] });
  } catch (error: any) {
    console.error('Error in PATCH /api/participants/:id:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Gagal memperbarui data peserta.' });
  }
});

// Delete participant
app.delete('/api/participants/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let currentList = getStoredParticipants();
    const beforeLen = currentList.length;
    currentList = currentList.filter((p: any) => p.id !== id);

    if (currentList.length === beforeLen) {
      return res.status(404).json({ success: false, error: 'Peserta tidak ditemukan.' });
    }

    saveStoredParticipants(currentList);
    return res.json({ success: true, message: 'Peserta berhasil dihapus dari database.' });
  } catch (error: any) {
    console.error('Error in DELETE /api/participants/:id:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Gagal menghapus peserta.' });
  }
});

// Questions API
const questionsFile = path.join(dataDir, 'cbt_questions.json');
app.get('/api/questions', (_req: Request, res: Response) => {
  try {
    if (fs.existsSync(questionsFile)) {
      const data = JSON.parse(fs.readFileSync(questionsFile, 'utf-8'));
      return res.json({ success: true, data });
    }
  } catch (e) {
    console.error('Error reading questions file:', e);
  }
  return res.json({ success: true, data: [] });
});

app.post('/api/questions', (req: Request, res: Response) => {
  try {
    const { questions } = req.body;
    if (Array.isArray(questions)) {
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(questionsFile, JSON.stringify(questions, null, 2), 'utf-8');
      return res.json({ success: true, message: 'Soal berhasil disimpan pada server database.' });
    }
    return res.status(400).json({ success: false, error: 'Data soal tidak valid.' });
  } catch (e: any) {
    console.error('Error saving questions:', e);
    return res.status(500).json({ success: false, error: e?.message });
  }
});

// Schedule & Event Dates Configuration endpoints
const scheduleFile = path.join(dataDir, 'schedule.json');

app.get('/api/schedule-config', (_req: Request, res: Response) => {
  try {
    if (fs.existsSync(scheduleFile)) {
      const data = JSON.parse(fs.readFileSync(scheduleFile, 'utf-8'));
      return res.json({ success: true, data });
    }
  } catch (e) {
    console.error('Error reading schedule file:', e);
  }
  return res.json({
    success: true,
    data: {
      registrationOpenDate: "25 Agustus – 11 September 2026",
      registrationDesc: "Pendaftaran online mudah & praktis. Terbuka untuk seluruh siswa di Indonesia tanpa kuota zonasi.",
      penyisihanDate: "12 September 2026",
      penyisihanDesc: "Ujian online aman dari rumah via sistem CBT mutakhir anti-kecurangan. Penyisihan GRATIS untuk semua peserta.",
      finalDate: "19 September 2026",
      finalDesc: "Babak penentuan medalis nasional dan perebutan gelar Juara Umum OSN tingkat nasional.",
      announcementDate: "20 September 2026",
      announcementDesc: "Pengumuman resmi juara, penerbitan sertifikat QR-Code & pengiriman paket piala/medali fisik ke alamat pemenang."
    }
  });
});

app.post('/api/schedule-config', (req: Request, res: Response) => {
  try {
    const { schedule } = req.body;
    if (schedule && typeof schedule === 'object') {
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(scheduleFile, JSON.stringify(schedule, null, 2), 'utf-8');
      return res.json({ success: true, message: 'Jadwal event olimpiade berhasil diperbarui.', data: schedule });
    }
    return res.status(400).json({ success: false, error: 'Data jadwal tidak valid.' });
  } catch (e: any) {
    console.error('Error saving schedule config:', e);
    return res.status(500).json({ success: false, error: e?.message });
  }
});



// Setup dev server with Vite middleware or serve static production build
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        port: 3000,
        host: '0.0.0.0',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Check multiple potential static build locations for cPanel / generic hosting
    const distPath = fs.existsSync(path.join(__dirname, 'dist'))
      ? path.join(__dirname, 'dist')
      : path.join(__dirname, 'client/dist');

    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    } else {
      console.warn('Production static files not found at dist or client/dist.');
    }
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[OSN Server] Server is running on port ${PORT} (mode: ${isProd ? 'production' : 'development'})`);
  });
}

startServer();
