import {
  getDbHealthStatus,
  postVercelWebhook,
  getDbPool,
  ensureDbSchema,
  VERCEL_WEBHOOK_URL
} from '../src/server/db.js';
import { runDbMigration } from '../src/server/dbMigration.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
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

  // 1. DATABASE SCHEMA MIGRATION
  if (action === 'migrate' || url.includes('/migrate')) {
    try {
      const report = await runDbMigration();
      return res.status(200).json({
        success: report.success,
        message: 'PostgreSQL database schema migration & alignment complete.',
        report
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message });
    }
  }

  // 2. WEBHOOK TRIGGER & LOGS
  if (action === 'webhook' || url.includes('/webhook')) {
    try {
      if (req.method === 'POST') {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { event, data } = body || {};
        const eventType = event || 'custom.trigger';
        await postVercelWebhook(eventType, data || body);
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
      return res.status(500).json({ success: false, error: error?.message || 'Error processing webhook' });
    }
  }

  // 3. SYSTEM SYNC STATUS / HEALTH (Default)
  try {
    const health = await getDbHealthStatus();
    return res.status(200).json({
      success: true,
      status: 'online',
      system: 'OSN 2026 API Serverless Gateway',
      domain: 'https://osn-one.vercel.app',
      database: health,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error?.message || 'Error checking system sync status',
    });
  }
}
