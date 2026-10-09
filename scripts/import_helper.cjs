const fs = require('fs');
const path = require('path');

// Read existing participants
const participantsFile = path.join(__dirname, '../data/participants.json');
let participants = [];
if (fs.existsSync(participantsFile)) {
  try {
    participants = JSON.parse(fs.readFileSync(participantsFile, 'utf8'));
  } catch (e) {
    participants = [];
  }
}

// Function to normalize category
function normalizeLevel(catStr) {
  const s = String(catStr || '').toUpperCase();
  if (s.includes('KATEGORI A') || s.includes('4–6') || s.includes('PAUD') || s.includes('TK')) {
    return 'PAUD / TK (Kategori A: Usia 4-6 Tahun)';
  }
  if (s.includes('KATEGORI C') || s.includes('SMP') || s.includes('MTS') || s.includes('13-16') || s.includes('9-12')) {
    return 'SMP / MTs (Kategori C: Usia 13-16 Tahun)';
  }
  return 'SD / MI (Kategori B: Usia 7-12 Tahun)';
}

// Function to normalize phone
function cleanPhone(raw) {
  let digits = String(raw || '').replace(/\D/g, '');
  if (digits.startsWith('62')) {
    digits = '0' + digits.slice(2);
  } else if (!digits.startsWith('0') && digits.length >= 8) {
    digits = '0' + digits;
  }
  return digits;
}

// Function to normalize subjects
function parseSubjects(raw) {
  if (!raw) return ['Matematika'];
  const text = String(raw);
  // Split by comma, semicolon, plus, ampersand or newlines (do not split on / so SAINS/IPA stays intact)
  const parts = text.split(/[,;+&|\n]+/).map(s => s.trim()).filter(Boolean);
  if (parts.length === 0) return ['Matematika'];
  const mapped = parts.map(p => {
    const lower = p.toLowerCase();
    if (lower.includes('mat')) return 'Matematika';
    if (lower.includes('ipa') || lower.includes('sains')) return 'IPA / Sains';
    if (lower.includes('inggris') || lower.includes('english')) return 'Bahasa Inggris';
    if (lower.includes('indo')) return 'Bahasa Indonesia';
    if (lower.includes('ips')) return 'IPS';
    return p;
  });
  // Always deduplicate
  const unique = Array.from(new Set(mapped));
  return unique.length > 0 ? unique : ['Matematika'];
}

// Function to parse CSV text into records with proper handling of quotes and multiline fields
function parseCSV(csvText) {
  if (!csvText || typeof csvText !== 'string') return [];

  // Parse CSV character by character
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const c = csvText[i];
    const next = csvText[i + 1];

    if (c === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push(field);
      field = '';
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') {
        i++;
      }
      row.push(field);
      field = '';
      if (row.length > 1 || (row.length === 1 && row[0].trim() !== '')) {
        rows.push(row);
      }
      row = [];
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  if (rows.length < 2) return [];

  const results = [];
  // Skip header row
  for (let i = 1; i < rows.length; i++) {
    const fields = rows[i];
    if (!fields || fields.length < 4) continue;

    // Fields: Timestamp(0), NAMA WALI(1), NOMOR WHATSAPP(2), NAMA ANAK(3), NAMA SEKOLAH(4), ALAMAT(5), KOTA(6), MAPEL(7), KATEGORI(8), EMAIL(9), WA_FIX(10)
    const rawNamaAnak = (fields[3] || '').trim();
    if (!rawNamaAnak || rawNamaAnak.toLowerCase() === 'tidak ada' || rawNamaAnak === '-' || rawNamaAnak.startsWith(',')) {
      continue;
    }

    const namaAnak = rawNamaAnak.replace(/^["']|["']$/g, '').trim();
    const namaWali = (fields[1] || '-').replace(/^["']|["']$/g, '').trim();
    const rawWA = fields[10] || fields[2] || '';
    const phone = cleanPhone(rawWA);
    const sekolah = (fields[4] || '-').replace(/^["']|["']$/g, '').trim();
    const alamat = (fields[5] || '-').replace(/^["']|["']$/g, '').trim();
    const kota = (fields[6] || '-').replace(/^["']|["']$/g, '').trim();
    const mapel = parseSubjects(fields[7]);
    const kategori = normalizeLevel(fields[8]);
    const email = (fields[9] || '-').replace(/^["']|["']$/g, '').trim();
    const registeredAt = (fields[0] || '').trim() || new Date().toISOString();

    const letter = kategori.includes('PAUD') ? 'A' : kategori.includes('SMP') ? 'C' : 'B';
    const randNum = Math.floor(10000 + Math.random() * 89999);
    const id = `OSN-2026-${letter}-${randNum}`;

    results.push({
      id,
      fullName: namaAnak,
      parentName: namaWali,
      whatsapp: phone,
      schoolName: sekolah,
      fullAddress: alamat,
      cityProvince: kota,
      subjects: mapel,
      level: kategori,
      email: email,
      registeredAt,
      cbtStatus: 'Aktif & Siap Ujian (Tercatat di Database)',
      simulatedAttempts: 0,
      penyisihanAttempts: 0,
      finalAttempts: 0,
      qualificationStatus: 'pending',
      finalTicketPaymentStatus: 'unpaid'
    });
  }
  return results;
}

module.exports = { parseCSV, cleanPhone, normalizeLevel, parseSubjects };
