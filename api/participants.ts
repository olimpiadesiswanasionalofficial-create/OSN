import {
  getAllParticipantsFromDb,
  saveParticipantToDb,
  bulkSaveParticipantsToDb,
  deleteParticipantFromDb,
  clearAllParticipantsFromDb,
  recordExamInDb,
} from '../src/server/db.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = req.url || '';
  const action = req.query?.action;
  const isBulk = action === 'bulk' || url.includes('/bulk');
  const isClear = action === 'clear' || url.includes('/clear');
  const isExam = action === 'exam' || url.includes('/exam');

  try {
    // 1. CLEAR ALL PARTICIPANTS
    if (isClear) {
      if (req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
      }
      await clearAllParticipantsFromDb();
      return res.status(200).json({
        success: true,
        message: 'Seluruh data peserta dan riwayat ujian berhasil dihapus permanen dari sistem & Neon PostgreSQL.',
        total: 0,
      });
    }

    // 2. BULK SAVE PARTICIPANTS
    if (isBulk) {
      if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
      }
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const participants = body?.participants || body;
      if (!Array.isArray(participants)) {
        return res.status(400).json({ success: false, error: 'Format data peserta harus berupa array.' });
      }
      const result = await bulkSaveParticipantsToDb(participants);
      return res.status(200).json({
        success: true,
        message: `Berhasil sinkronisasi ${participants.length} data peserta ke Neon PostgreSQL (${result.inserted} berhasil). Total database: ${result.total} peserta.`,
        total: result.total,
        inserted: result.inserted,
        updated: result.updated,
      });
    }

    // 3. RECORD EXAM RESULT
    if (isExam) {
      if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
      }
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const participantId = body.id || req.query?.id;
      const {
        examType,
        examResult,
        additionalUpdates,
        subject,
        score,
        totalQuestions,
        completedAt,
        violationReason,
        fullName,
        whatsapp,
        level,
        schoolName,
      } = body;

      if (!participantId) {
        return res.status(400).json({ success: false, error: 'ID Peserta wajib diisi.' });
      }

      const resolvedExamType: 'simulasi' | 'penyisihan' | 'final' =
        examType || examResult?.examType || 'simulasi';
      const numericScore =
        typeof score === 'number'
          ? score
          : examResult?.score !== undefined
          ? Number(examResult.score)
          : parseInt(score, 10) || 0;

      const resolvedExamInfo =
        examResult || {
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
          violationReason,
        };

      let updatedParticipant = null;
      try {
        updatedParticipant = await recordExamInDb(
          String(participantId),
          resolvedExamType,
          resolvedExamInfo,
          additionalUpdates
        );
      } catch {
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
          cbtStatus: resolvedExamInfo.status,
          simulatedExam: resolvedExamType === 'simulasi' ? resolvedExamInfo : undefined,
          penyisihanExam: resolvedExamType === 'penyisihan' ? resolvedExamInfo : undefined,
          finalExam: resolvedExamType === 'final' ? resolvedExamInfo : undefined,
        };
        updatedParticipant = await saveParticipantToDb(newP);
      }

      return res.status(200).json({
        success: true,
        message: 'Hasil ujian berhasil disimpan permanen di database server Neon PostgreSQL.',
        data: updatedParticipant,
      });
    }

    // 4. STANDARD PARTICIPANTS CRUD
    if (req.method === 'GET') {
      const list = await getAllParticipantsFromDb();
      return res.status(200).json({
        success: true,
        data: list,
        total: list.length,
        source: 'Neon PostgreSQL Hosting Database',
      });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { fullName, whatsapp } = body || {};
      if (!fullName || !whatsapp) {
        return res.status(400).json({
          success: false,
          error: 'Nama Lengkap dan Nomor WhatsApp wajib diisi.',
        });
      }

      const saved = await saveParticipantToDb(body);
      return res.status(200).json({
        success: true,
        message: 'Data peserta berhasil tersimpan dan tersinkronisasi di Neon PostgreSQL.',
        data: saved,
      });
    }

    if (req.method === 'DELETE') {
      const id = req.query?.id || req.body?.id;
      if (id) {
        await deleteParticipantFromDb(String(id));
        return res.status(200).json({
          success: true,
          message: `Peserta ${id} berhasil dihapus dari Neon PostgreSQL.`,
        });
      } else {
        await clearAllParticipantsFromDb();
        return res.status(200).json({
          success: true,
          message: 'Seluruh peserta berhasil dihapus permanen dari Neon PostgreSQL.',
        });
      }
    }

    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } catch (error: any) {
    console.error('API Error in /api/participants:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Database server error',
    });
  }
}
