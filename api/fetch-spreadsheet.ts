import * as XLSX from 'xlsx';

export default async function handler(req: any, res: any) {
  // CORS Headers allowing https://osn-one.vercel.app and all production origins
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      service: 'OSN Spreadsheet Fetcher Service',
      domain: 'https://osn-one.vercel.app',
      status: 'active'
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const url = body.url || body.spreadsheetUrl;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ success: false, error: 'URL Spreadsheet wajib diisi.' });
    }

    const trimmed = url.trim();
    let fetchUrl = trimmed;

    // Detect Google Sheets URL format
    const googleSheetMatch = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (googleSheetMatch) {
      const sheetId = googleSheetMatch[1];
      const gidMatch = trimmed.match(/[#&?]gid=([0-9]+)/);
      const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '';
      fetchUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv${gidParam}`;
    }

    const response = await fetch(fetchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
        'Accept': 'text/csv,text/plain,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,*/*'
      }
    });

    if (!response.ok) {
      // Secondary fallback to gviz endpoint
      if (googleSheetMatch) {
        const sheetId = googleSheetMatch[1];
        const gidMatch = trimmed.match(/[#&?]gid=([0-9]+)/);
        const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '';
        const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv${gidParam}`;
        const gvizRes = await fetch(gvizUrl);
        if (gvizRes.ok) {
          const csvText = await gvizRes.text();
          const wb = XLSX.read(csvText, { type: 'string' });
          if (wb.SheetNames && wb.SheetNames.length > 0) {
            const sheet = wb.Sheets[wb.SheetNames[0]];
            const parsedRows = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, { defval: '' });
            return res.status(200).json({
              success: true,
              total: parsedRows.length,
              rows: parsedRows,
              sheetName: wb.SheetNames[0]
            });
          }
        }
      }

      return res.status(400).json({
        success: false,
        error: `Gagal membaca spreadsheet (${response.status} ${response.statusText}). Pastikan link disetel 'Siapa saja yang memiliki link dapat melihat' (Anyone with the link can view) atau gunakan tab 'Upload File Excel/CSV'.`
      });
    }

    const contentType = response.headers.get('content-type') || '';
    let workbook: XLSX.WorkBook;

    if (contentType.includes('spreadsheet') || contentType.includes('octet-stream')) {
      const arrayBuffer = await response.arrayBuffer();
      workbook = XLSX.read(Buffer.from(arrayBuffer), { type: 'buffer' });
    } else {
      const text = await response.text();
      workbook = XLSX.read(text, { type: 'string' });
    }

    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      return res.status(400).json({ success: false, error: 'File spreadsheet tidak memiliki lembar kerja (sheet).' });
    }

    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<Record<string, any>>(firstSheet, { defval: '' });

    return res.status(200).json({
      success: true,
      total: rows.length,
      rows: rows,
      sheetName: workbook.SheetNames[0]
    });
  } catch (error: any) {
    console.error('Error fetching spreadsheet url in serverless function:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Gagal memproses spreadsheet dari link.'
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};
