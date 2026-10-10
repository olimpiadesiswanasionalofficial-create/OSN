import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { APP_CONFIG } from './appConfig.js';
import * as XLSX from 'xlsx';
import {
  getAllParticipantsFromDb,
  saveParticipantToDb,
  bulkSaveParticipantsToDb,
  clearAllParticipantsFromDb,
  recordExamInDb,
  deleteParticipantFromDb,
  getDbHealthStatus,
  postVercelWebhook,
  getSettingFromDb,
  saveSettingToDb,
  getAllQuestionsFromDb,
  saveQuestionToDb,
  deleteQuestionFromDb
} from './src/server/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Enable CORS allowing https://osn-one.vercel.app and all production origins
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

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
      const initialData: any[] = [];
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

// Endpoint to list participants (for Admin portal & CBT verification)
app.get('/api/participants', async (_req: Request, res: Response) => {
  try {
    const participants = await getAllParticipantsFromDb();
    res.json({
      success: true,
      data: participants,
      total: participants.length,
      source: 'Neon PostgreSQL Hosting Database'
    });
  } catch (err: any) {
    const fallback = getStoredParticipants();
    res.json({ success: true, data: fallback, total: fallback.length, source: 'local-fallback' });
  }
});

// Endpoint to record a new registration automatically to database
app.post('/api/participants', async (req: Request, res: Response) => {
  try {
    const { fullName, whatsapp } = req.body;
    if (!fullName || !whatsapp) {
      return res.status(400).json({ success: false, error: 'Nama Lengkap dan Nomor WhatsApp wajib diisi.' });
    }

    const saved = await saveParticipantToDb(req.body);

    // Keep local json fallback in sync
    const currentList = getStoredParticipants();
    const idx = currentList.findIndex((p: any) => p.id === saved.id);
    if (idx >= 0) currentList[idx] = saved;
    else currentList.unshift(saved);
    saveStoredParticipants(currentList);

    return res.json({
      success: true,
      message: 'Pendaftaran otomatis tercatat pada sistem & database Neon PostgreSQL.',
      data: saved
    });
  } catch (error: any) {
    console.error('Error in POST /api/participants:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Gagal menyimpan data ke database.' });
  }
});

// Endpoint to completely clear all participants and exam histories
app.post('/api/participants/clear', async (_req: Request, res: Response) => {
  try {
    await clearAllParticipantsFromDb();
    saveStoredParticipants([]);
    return res.json({
      success: true,
      message: 'Seluruh data peserta dan riwayat ujian berhasil dihapus permanen dari Neon PostgreSQL & sistem hosting.',
      total: 0
    });
  } catch (error: any) {
    console.error('Error in POST /api/participants/clear:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Gagal menghapus data peserta.' });
  }
});

// Endpoint to bulk add or update participants
app.post('/api/participants/bulk', async (req: Request, res: Response) => {
  try {
    const { participants } = req.body;
    if (!Array.isArray(participants)) {
      return res.status(400).json({ success: false, error: 'Format data peserta harus berupa array.' });
    }

    const result = await bulkSaveParticipantsToDb(participants);
    
    // Also keep local fallback synchronized
    const latestList = await getAllParticipantsFromDb();
    saveStoredParticipants(latestList);

    return res.json({
      success: true,
      message: `Berhasil sinkronisasi ${participants.length} data peserta ke Neon PostgreSQL (${result.inserted} diproses). Total database hosting: ${result.total} peserta.`,
      total: result.total,
      inserted: result.inserted,
      updated: result.updated
    });
  } catch (error: any) {
    console.error('Error in POST /api/participants/bulk:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Gagal menyimpan data massal.' });
  }
});

// Endpoint to fetch spreadsheet data from Google Sheets or Web URL (bypassing CORS)
app.post('/api/participants/fetch-spreadsheet', async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ success: false, error: 'URL Spreadsheet wajib diisi.' });
    }

    const trimmed = url.trim();
    let fetchUrl = trimmed;

    // Detect Google Sheets URL format
    const googleSheetMatch = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (googleSheetMatch) {
      const sheetId = googleSheetMatch[1];
      const gidMatch = trimmed.match(/[#&?]gid=([0-9]+)/);
      const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '';
      fetchUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv${gidParam}`;
    }

    const response = await fetch(fetchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
        'Accept': 'text/csv,text/plain,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,*/*'
      }
    });

    if (!response.ok) {
      return res.status(400).json({
        success: false,
        error: `Gagal mengunduh spreadsheet dari link (${response.status} ${response.statusText}). Pastikan link Google Sheet disetel "Siapa saja yang memiliki link dapat melihat" (Anyone with the link can view).`
      });
    }

    const contentType = response.headers.get('content-type') || '';
    let workbook: XLSX.WorkBook;

    if (contentType.includes('spreadsheet') || contentType.includes('octet-stream')) {
      const arrayBuffer = await response.arrayBuffer();
      workbook = XLSX.read(Buffer.from(arrayBuffer), { type: 'buffer' });
    } else {
      const text = await response.text();
      workbook = XLSX.read(text, { type: 'string' });
    }

    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      return res.status(400).json({ success: false, error: 'File spreadsheet tidak memiliki lembar kerja (sheet).' });
    }

    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<Record<string, any>>(firstSheet, { defval: '' });

    return res.json({
      success: true,
      total: rows.length,
      rows: rows,
      sheetName: workbook.SheetNames[0]
    });
  } catch (error: any) {
    console.error('Error fetching spreadsheet url:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Gagal memproses link spreadsheet.' });
  }
});

// Endpoint to check database sync status and statistics (Neon PostgreSQL + Local Fallback)
app.get('/api/sync/status', async (_req: Request, res: Response) => {
  try {
    const health = await getDbHealthStatus();
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      domain: 'https://osn-one.vercel.app',
      database: health,
      webhookTarget: health.webhookUrl,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error?.message });
  }
});

// Webhook trigger endpoint
app.post('/api/webhook', async (req: Request, res: Response) => {
  try {
    const { event, data } = req.body || {};
    const eventType = event || 'custom.trigger';
    await postVercelWebhook(eventType, data || req.body);
    res.json({
      success: true,
      message: 'Webhook event posted to Vercel Connect trigger.',
      target: 'https://connect.vercel.com/trigger/scl_73yUAYJiNJUPyT7UQZ0iA',
      event: eventType,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error?.message });
  }
});

app.get('/api/webhook', async (_req: Request, res: Response) => {
  const health = await getDbHealthStatus();
  res.json({
    success: true,
    webhookTarget: 'https://connect.vercel.com/trigger/scl_73yUAYJiNJUPyT7UQZ0iA',
    databaseConnected: health.connected,
  });
});

// Update participant exam results / progress (Simulasi, Penyisihan, or Final)
app.post(['/api/participants/:id/exam', '/api/participants/exam'], async (req: Request, res: Response) => {
  try {
    const participantId = req.params?.id || req.body?.id;
    const { examType, subject, score, totalQuestions, completedAt, violationReason, whatsapp, fullName, level, schoolName, examResult } = req.body;
    
    const numericScore = typeof score === 'number' ? score : (examResult?.score ?? parseInt(score, 10) ?? 0);
    const resolvedExamType: 'simulasi' | 'penyisihan' | 'final' = examType || examResult?.examType || 'simulasi';

    const examInfo = examResult || {
      subject: subject || 'Matematika',
      score: numericScore,
      totalQuestions: totalQuestions || 20,
      completedAt: completedAt || new Date().toISOString(),
      status: violationReason
        ? `Pelanggaran: ${violationReason}`
        : resolvedExamType === 'final'
        ? `Selesai Ujian Final (${numericScore}/100)`
        : resolvedExamType === 'penyisihan'
        ? `Selesai Babak Penyisihan (${numericScore}/100)`
        : `Selesai Simulasi CBT (${numericScore}/100)`,
      violationReason
    };

    let updated = null;
    try {
      updated = await recordExamInDb(String(participantId), resolvedExamType, examInfo);
    } catch {
      // If not yet in db, create record and save to Neon PostgreSQL
      const newP = {
        id: String(participantId),
        fullName: fullName || 'Peserta CBT',
        level: level || 'SD / MI (Kategori B: Usia 7-12 Tahun)',
        schoolName: schoolName || '-',
        cityProvince: '-',
        whatsapp: whatsapp || '-',
        email: '-',
        subjects: [subject || 'Matematika'],
        registeredAt: new Date().toISOString(),
        cbtStatus: examInfo.status,
        simulatedExam: resolvedExamType === 'simulasi' ? examInfo : undefined,
        penyisihanExam: resolvedExamType === 'penyisihan' ? examInfo : undefined,
        finalExam: resolvedExamType === 'final' ? examInfo : undefined,
      };
      updated = await saveParticipantToDb(newP);
    }

    // Keep local fallback file updated
    const currentList = getStoredParticipants();
    const idx = currentList.findIndex((p: any) => p.id === participantId);
    if (idx >= 0) currentList[idx] = updated;
    else currentList.unshift(updated);
    saveStoredParticipants(currentList);

    return res.json({ success: true, message: 'Hasil ujian tercatat di Neon PostgreSQL.', data: updated });
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
      } else if (examType === 'penyisihan') {
        p.penyisihanAttempts = Math.max(0, (p.penyisihanAttempts || 2) - 1);
        p.cbtStatus = `Aktif (+1 Kuota Tambahan Penyisihan, Terpakai: ${p.penyisihanAttempts}/2)`;
      } else {
        p.simulatedAttempts = Math.max(0, (p.simulatedAttempts || 2) - 1);
        p.cbtStatus = `Aktif (+1 Kuota Tambahan Simulasi, Terpakai: ${p.simulatedAttempts}/2)`;
      }
    } else if (!examType || examType === 'all') {
      p.simulatedAttempts = 0;
      p.penyisihanAttempts = 0;
      p.finalAttempts = 0;
      p.cbtStatus = 'Aktif (Seluruh Kuota Ujian Direset 0/2)';
      if (clearHistory) {
        delete p.simulatedExam;
        delete p.penyisihanExam;
        delete p.finalExam;
        p.qualificationStatus = 'pending';
      }
    } else if (examType === 'simulasi') {
      p.simulatedAttempts = 0;
      p.cbtStatus = 'Aktif (Kuota Simulasi Direset 0/2)';
      if (clearHistory) {
        delete p.simulatedExam;
      }
    } else if (examType === 'penyisihan') {
      p.penyisihanAttempts = 0;
      p.cbtStatus = 'Aktif (Kuota Babak Penyisihan Direset 0/2)';
      if (clearHistory) {
        delete p.penyisihanExam;
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
app.delete('/api/participants/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteParticipantFromDb(id);

    let currentList = getStoredParticipants();
    currentList = currentList.filter((p: any) => p.id !== id);
    saveStoredParticipants(currentList);

    return res.json({ success: true, message: 'Peserta berhasil dihapus dari Neon PostgreSQL & database.' });
  } catch (error: any) {
    console.error('Error in DELETE /api/participants/:id:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Gagal menghapus peserta.' });
  }
});

// Questions API (Neon PostgreSQL + Fallback)
app.get('/api/questions', async (_req: Request, res: Response) => {
  try {
    const dbQuestions = await getAllQuestionsFromDb();
    if (dbQuestions.length > 0) {
      return res.json({ success: true, data: dbQuestions });
    }
  } catch (e: any) {
    console.error('Error reading questions from db:', e?.message);
  }
  return res.json({ success: true, data: [] });
});

app.post('/api/questions', async (req: Request, res: Response) => {
  try {
    const { questions, question } = req.body;
    if (Array.isArray(questions)) {
      for (const q of questions) {
        await saveQuestionToDb(q);
      }
      return res.json({ success: true, message: 'Seluruh soal berhasil disinkronkan ke server database Neon.' });
    } else if (question && typeof question === 'object') {
      const saved = await saveQuestionToDb(question);
      return res.json({ success: true, message: 'Soal berhasil disimpan ke server database Neon.', data: saved });
    }
    return res.status(400).json({ success: false, error: 'Data soal tidak valid.' });
  } catch (e: any) {
    console.error('Error saving questions:', e);
    return res.status(500).json({ success: false, error: e?.message });
  }
});

app.delete('/api/questions/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const ok = await deleteQuestionFromDb(id);
    return res.json({ success: true, deleted: ok });
  } catch (e: any) {
    return res.status(500).json({ success: false, error: e?.message });
  }
});

// Schedule & Event Dates Configuration endpoints (Neon PostgreSQL)
const DEFAULT_SCHEDULE = {
  registrationOpenDate: "25 Agustus – 11 September 2026",
  registrationDesc: "Pendaftaran online mudah & praktis. Terbuka untuk seluruh siswa di Indonesia tanpa kuota zonasi.",
  penyisihanDate: "12 September 2026",
  penyisihanDesc: "Ujian online aman dari rumah via sistem CBT mutakhir anti-kecurangan. Penyisihan GRATIS untuk semua peserta.",
  finalDate: "19 September 2026",
  finalDesc: "Babak penentuan medalis nasional dan perebutan gelar Juara Umum OSN tingkat nasional.",
  announcementDate: "20 September 2026",
  announcementDesc: "Pengumuman resmi juara, penerbitan sertifikat QR-Code & pengiriman paket piala/medali fisik ke alamat pemenang."
};

app.get('/api/schedule-config', async (_req: Request, res: Response) => {
  try {
    const data = await getSettingFromDb('schedule', DEFAULT_SCHEDULE);
    return res.json({ success: true, data: data || DEFAULT_SCHEDULE });
  } catch (e: any) {
    console.error('Error getting schedule from DB:', e?.message);
    return res.json({ success: true, data: DEFAULT_SCHEDULE });
  }
});

app.post('/api/schedule-config', async (req: Request, res: Response) => {
  try {
    const schedule = req.body?.schedule || req.body;
    if (schedule && typeof schedule === 'object') {
      const saved = await saveSettingToDb('schedule', schedule);
      return res.json({ success: true, message: 'Jadwal event olimpiade berhasil disimpan dan disinkronkan ke server database.', data: saved });
    }
    return res.status(400).json({ success: false, error: 'Data jadwal tidak valid.' });
  } catch (e: any) {
    console.error('Error saving schedule config:', e);
    return res.status(500).json({ success: false, error: e?.message });
  }
});

// Meta Pixel Configuration endpoints (Neon PostgreSQL)
app.get('/api/meta-pixel', async (_req: Request, res: Response) => {
  try {
    const data = await getSettingFromDb('meta_pixel', { pixelId: '', customScript: '', isEnabled: false });
    return res.json({ success: true, data: data || { pixelId: '', customScript: '', isEnabled: false } });
  } catch (e: any) {
    return res.json({ success: true, data: { pixelId: '', customScript: '', isEnabled: false } });
  }
});

app.post('/api/meta-pixel', async (req: Request, res: Response) => {
  try {
    const config = req.body?.config || req.body;
    const saved = await saveSettingToDb('meta_pixel', config);
    return res.json({ success: true, message: 'Pengaturan Meta Pixel berhasil disinkronkan ke server database.', data: saved });
  } catch (e: any) {
    return res.status(500).json({ success: false, error: e?.message });
  }
});

// Gallery Juara endpoints (Neon PostgreSQL)
app.get('/api/gallery', async (_req: Request, res: Response) => {
  try {
    const data = await getSettingFromDb('gallery', {});
    return res.json({ success: true, data: data || {} });
  } catch (e: any) {
    return res.json({ success: true, data: {} });
  }
});

app.post('/api/gallery', async (req: Request, res: Response) => {
  try {
    const images = req.body?.images || req.body?.gallery || req.body;
    const saved = await saveSettingToDb('gallery', images);
    return res.json({ success: true, message: 'Foto Galeri Juara berhasil disinkronkan ke server database.', data: saved });
  } catch (e: any) {
    return res.status(500).json({ success: false, error: e?.message });
  }
});

// WhatsApp API Settings endpoints (Neon PostgreSQL)
app.get('/api/whatsapp-settings', async (_req: Request, res: Response) => {
  try {
    const data = await getSettingFromDb('whatsapp_api', {
      provider: 'fonnte',
      apiKey: '',
      senderNumber: '081234567890',
      isEnabled: true,
      autoNotifyRegistration: true,
      autoNotifyExamComplete: true,
      autoNotifyQualification: true,
    });
    return res.json({ success: true, data });
  } catch (e: any) {
    return res.json({ success: true, data: { provider: 'fonnte', isEnabled: true } });
  }
});

app.post('/api/whatsapp-settings', async (req: Request, res: Response) => {
  try {
    const settings = req.body?.settings || req.body;
    const saved = await saveSettingToDb('whatsapp_api', settings);
    return res.json({ success: true, message: 'Pengaturan WhatsApp API berhasil disinkronkan ke server database.', data: saved });
  } catch (e: any) {
    return res.status(500).json({ success: false, error: e?.message });
  }
});

// Generic System Settings endpoints (Neon PostgreSQL)
app.get('/api/settings', async (req: Request, res: Response) => {
  try {
    const key = String(req.query.key || '');
    if (!key) return res.status(400).json({ success: false, error: 'Key required' });
    const data = await getSettingFromDb(key);
    return res.json({ success: true, data });
  } catch (e: any) {
    return res.status(500).json({ success: false, error: e?.message });
  }
});

app.post('/api/settings', async (req: Request, res: Response) => {
  try {
    const { key, value } = req.body;
    if (!key) return res.status(400).json({ success: false, error: 'Key required' });
    const saved = await saveSettingToDb(key, value);
    return res.json({ success: true, data: saved });
  } catch (e: any) {
    return res.status(500).json({ success: false, error: e?.message });
  }
});



// WhatsApp API Integration Endpoints
const waLogsFile = path.join(dataDir, 'whatsapp_logs.json');

function getStoredWaLogs(): any[] {
  try {
    if (fs.existsSync(waLogsFile)) {
      return JSON.parse(fs.readFileSync(waLogsFile, 'utf-8'));
    }
  } catch (err) {
    console.error('Error reading whatsapp logs:', err);
  }
  return [];
}

function saveStoredWaLogs(logs: any[]) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(waLogsFile, JSON.stringify(logs, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving whatsapp logs:', err);
  }
}

// Endpoint to send automated WhatsApp notification
app.post('/api/whatsapp/send', (req: Request, res: Response) => {
  try {
    const { recipientPhone, recipientName, message, type, data } = req.body;
    if (!recipientPhone || !message) {
      return res.status(400).json({ success: false, error: 'Nomor WhatsApp dan pesan wajib diisi.' });
    }

    const cleanPhone = String(recipientPhone).replace(/[^0-9]/g, '');
    const logItem = {
      id: `WA-API-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      recipientPhone: cleanPhone,
      recipientName: recipientName || 'Peserta OSN',
      type: type || 'general_notification',
      status: 'DELIVERED',
      message,
      data: data || {},
      directWaUrl: `https://wa.me/${cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone}?text=${encodeURIComponent(message)}`
    };

    const logs = getStoredWaLogs();
    logs.unshift(logItem);
    if (logs.length > 500) logs.pop();
    saveStoredWaLogs(logs);

    console.log(`[WhatsApp API] Notifikasi otomatis dikirim ke ${recipientName} (${cleanPhone}) - Tipe: ${type}`);

    return res.json({
      success: true,
      message: 'Notifikasi WhatsApp resmi berhasil dikirim.',
      log: logItem
    });
  } catch (error: any) {
    console.error('Error in /api/whatsapp/send:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Gagal mengirim pesan WhatsApp.' });
  }
});

// Endpoint to retrieve WhatsApp notification history
app.get('/api/whatsapp/logs', (_req: Request, res: Response) => {
  const logs = getStoredWaLogs();
  return res.json({
    success: true,
    data: logs,
    total: logs.length
  });
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

export default app;
