import { recordExamInDb, saveParticipantToDb } from '../../src/server/db.js';

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

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const body = req.body || {};
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
      return res.status(400).json({
        success: false,
        error: 'ID Peserta wajib diisi.',
      });
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
      // If not yet in database, create the participant and record their exam
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
  } catch (error: any) {
    console.error('API Error in /api/participants/exam:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Gagal menyimpan hasil ujian ke database',
    });
  }
}
