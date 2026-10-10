import { getSettingFromDb, saveSettingToDb } from '../src/server/db.js';

const DEFAULT_WA_SETTINGS = {
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

  if (req.method === 'GET') {
    try {
      const data = await getSettingFromDb('whatsapp_api', DEFAULT_WA_SETTINGS);
      return res.status(200).json({ success: true, data: { ...DEFAULT_WA_SETTINGS, ...data } });
    } catch (err: any) {
      return res.status(200).json({ success: true, data: DEFAULT_WA_SETTINGS });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const settings = body?.settings || body;
      const saved = await saveSettingToDb('whatsapp_api', settings);
      return res.status(200).json({
        success: true,
        message: 'Pengaturan WhatsApp API & Broadcast Gateway berhasil disinkronkan ke server database.',
        data: saved
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
