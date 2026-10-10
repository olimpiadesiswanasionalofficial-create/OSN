import { postVercelWebhook, getDbPool, ensureDbSchema, VERCEL_WEBHOOK_URL } from '../src/server/db.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      const { event, data } = req.body || {};
      const eventType = event || 'custom.trigger';
      await postVercelWebhook(eventType, data || req.body);
      return res.status(200).json({
        success: true,
        message: 'Webhook event dipicu dan diteruskan ke Vercel Connect trigger.',
        target: VERCEL_WEBHOOK_URL,
        event: eventType,
      });
    }

    if (req.method === 'GET') {
      await ensureDbSchema();
      const p = getDbPool();
      const logsRes = await p.query('SELECT * FROM webhook_logs ORDER BY created_at DESC LIMIT 20');
      return res.status(200).json({
        success: true,
        target: VERCEL_WEBHOOK_URL,
        logs: logsRes.rows,
      });
    }

    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error?.message || 'Error processing webhook',
    });
  }
}
