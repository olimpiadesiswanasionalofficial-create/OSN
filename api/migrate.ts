import { runDbMigration } from '../src/server/dbMigration.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const report = await runDbMigration();
    return res.status(200).json({
      success: report.success,
      message: 'PostgreSQL database schema migration & alignment complete.',
      report
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
