import { getSettingFromDb, saveSettingToDb } from '../src/server/db.js';

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

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const data = await getSettingFromDb('schedule', DEFAULT_SCHEDULE);
      return res.status(200).json({ success: true, data });
    } catch (err: any) {
      return res.status(200).json({ success: true, data: DEFAULT_SCHEDULE });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const schedule = body?.schedule || body;
      if (!schedule || typeof schedule !== 'object') {
        return res.status(400).json({ success: false, error: 'Data jadwal tidak valid' });
      }
      const saved = await saveSettingToDb('schedule', schedule);
      return res.status(200).json({
        success: true,
        message: 'Jadwal pelaksanaan olimpiade berhasil disimpan dan disinkronkan ke server database.',
        data: saved
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
