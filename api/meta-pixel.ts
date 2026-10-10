import { getSettingFromDb, saveSettingToDb } from '../src/server/db.js';

const DEFAULT_PIXEL_CONFIG = {
  pixelId: '',
  customScript: '',
  isEnabled: false
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
      const data = await getSettingFromDb('meta_pixel', DEFAULT_PIXEL_CONFIG);
      return res.status(200).json({ success: true, data });
    } catch (err: any) {
      return res.status(200).json({ success: true, data: DEFAULT_PIXEL_CONFIG });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const config = body?.config || body;
      const saved = await saveSettingToDb('meta_pixel', config);
      return res.status(200).json({
        success: true,
        message: 'Pengaturan Meta Pixel berhasil disimpan dan disinkronkan ke server database.',
        data: saved
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
