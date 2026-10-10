import {
  getAllParticipantsFromDb,
  saveParticipantToDb,
  deleteParticipantFromDb,
  clearAllParticipantsFromDb,
} from '../../src/server/db.js';

export default async function handler(req: any, res: any) {
  // CORS Headers
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

  try {
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
      const { fullName, whatsapp } = req.body || {};
      if (!fullName || !whatsapp) {
        return res.status(400).json({
          success: false,
          error: 'Nama Lengkap dan Nomor WhatsApp wajib diisi.',
        });
      }

      const saved = await saveParticipantToDb(req.body);
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
