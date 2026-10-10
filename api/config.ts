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

const DEFAULT_PIXEL = {
  pixelId: '',
  customScript: '',
  isEnabled: false
};

const DEFAULT_WA = {
  provider: 'fonnte',
  apiKey: 'OSN-WA-GATEWAY-OFFICIAL-2026',
  senderNumber: '6285810243460',
  endpointUrl: '/api/whatsapp/send',
  autoSendExamGraded: true,
  autoSendQualification: true,
  isConnected: true,
  isEnabled: true,
  autoNotifyRegistration: true,
  autoNotifyExamComplete: true,
  autoNotifyQualification: true,
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

  const url = req.url || '';
  const queryKey = req.query?.key;

  // Determine configuration target:
  let key = 'general';
  let defaultVal: any = {};

  if (queryKey === 'schedule' || queryKey === 'schedule_config' || url.includes('schedule')) {
    key = 'schedule_config';
    defaultVal = DEFAULT_SCHEDULE;
  } else if (queryKey === 'pixel' || queryKey === 'meta_pixel' || url.includes('meta-pixel') || url.includes('pixel')) {
    key = 'meta_pixel';
    defaultVal = DEFAULT_PIXEL;
  } else if (queryKey === 'gallery' || queryKey === 'gallery_custom_images' || url.includes('gallery')) {
    key = 'gallery_custom_images';
    defaultVal = {};
  } else if (queryKey === 'whatsapp' || queryKey === 'whatsapp_api' || queryKey === 'whatsapp_settings' || url.includes('whatsapp')) {
    key = 'whatsapp_api';
    defaultVal = DEFAULT_WA;
  } else if (queryKey) {
    key = String(queryKey);
    defaultVal = {};
  }

  const KNOWN_KEYS = ['schedule', 'schedule_config', 'pixel', 'meta_pixel', 'gallery', 'gallery_custom_images', 'whatsapp', 'whatsapp_api', 'whatsapp_settings'];

  try {
    if (req.method === 'GET') {
      const customKey = req.query?.key && !KNOWN_KEYS.includes(String(req.query?.key))
        ? String(req.query.key)
        : key;
      const data = await getSettingFromDb(customKey, defaultVal);
      const merged = (defaultVal && typeof defaultVal === 'object' && !Array.isArray(defaultVal))
        ? { ...defaultVal, ...(data || {}) }
        : data;
      return res.status(200).json({ success: true, key: customKey, data: merged });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const targetKey = body?.key || (req.query?.key && !KNOWN_KEYS.includes(String(req.query?.key)) ? String(req.query.key) : key);
      
      let payload = body?.value !== undefined ? body.value : body?.schedule || body?.config || body?.images || body?.settings || body;
      
      // If gallery, check images property
      if (key === 'gallery_custom_images' && body?.images) {
        payload = body.images;
      }

      const saved = await saveSettingToDb(targetKey, payload);
      return res.status(200).json({
        success: true,
        message: `Pengaturan ${targetKey} berhasil disimpan dan disinkronkan ke server database Neon PostgreSQL.`,
        data: saved
      });
    }

    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('API Error in /api/config:', err);
    return res.status(500).json({ success: false, error: err?.message || 'Server error' });
  }
}
