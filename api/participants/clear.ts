import { clearAllParticipantsFromDb } from '../../src/server/db.js';

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
    await clearAllParticipantsFromDb();
    return res.status(200).json({
      success: true,
      message: 'Seluruh data peserta dan riwayat ujian berhasil dihapus permanen dari sistem & Neon PostgreSQL.',
      total: 0,
    });
  } catch (error: any) {
    console.error('API Error in /api/participants/clear:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Database error during clearing',
    });
  }
}
