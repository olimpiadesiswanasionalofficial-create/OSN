import { getDbHealthStatus } from '../../src/server/db.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const health = await getDbHealthStatus();
    return res.status(200).json({
      success: true,
      service: 'OSN PostgreSQL Serverless Sync',
      timestamp: new Date().toISOString(),
      domain: 'https://osn-one.vercel.app',
      database: health,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error?.message || 'Error checking database sync status',
    });
  }
}
