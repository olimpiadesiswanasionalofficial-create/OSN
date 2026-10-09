import * as XLSX from 'xlsx';
import { ParticipantRecord, getAllParticipants, saveAllParticipants } from './participantDb';

export interface ParseResult {
  success: boolean;
  participants: ParticipantRecord[];
  totalRawRows: number;
  validCount: number;
  warnings: string[];
  errors: string[];
}

/**
 * Standardize phone number from spreadsheet
 * Handles scientific notation from Excel (e.g. 8.12345E+11) and string variations
 */
export function cleanPhoneNumber(raw: any): string {
  if (raw === null || raw === undefined) return '';
  let str = String(raw).trim();

  // If number formatted as scientific notation
  if (/^[0-9]+(\.[0-9]+)?e\+[0-9]+$/i.test(str)) {
    const num = Number(str);
    if (!isNaN(num)) {
      str = BigInt(Math.floor(num)).toString();
    }
  }

  // Remove all non-digits
  let digits = str.replace(/\D/g, '');
  if (!digits) return '';

  if (digits.startsWith('62')) {
    digits = '0' + digits.slice(2);
  } else if (!digits.startsWith('0') && digits.length >= 8) {
    digits = '0' + digits;
  }
  return digits;
}

/**
 * Detect educational level from various text inputs
 */
export function normalizeCategoryLevel(raw: any): string {
  const s = String(raw || '').toLowerCase().trim();
  if (s.includes('paud') || s.includes('tk') || s.includes('kategori a') || s.includes('a:') || s.includes('ra') || s.includes('4-6')) {
    return 'PAUD / TK (Kategori A: Usia 4-6 Tahun)';
  }
  if (s.includes('smp') || s.includes('mts') || s.includes('kategori c') || s.includes('c:') || s.includes('13-16') || s.includes('menengah')) {
    return 'SMP / MTs (Kategori C: Usia 13-16 Tahun)';
  }
  // Default to SD / MI
  return 'SD / MI (Kategori B: Usia 7-12 Tahun)';
}

/**
 * Generate unique Participant ID based on Level
 */
export function generateParticipantId(level: string, seed: number = 0): string {
  const letter = level.includes('PAUD') || level.includes('A:')
    ? 'A'
    : level.includes('SMP') || level.includes('C:')
    ? 'C'
    : 'B';
  const randomNum = Math.floor(10000 + Math.random() * 89999 + seed);
  return `OSN-2026-${letter}-${randomNum}`;
}

/**
 * Normalize subject choices
 */
export function parseSubjectsList(raw: any): string[] {
  if (!raw) return ['Matematika'];
  if (Array.isArray(raw)) return raw.map(s => String(s).trim()).filter(Boolean);
  
  const text = String(raw);
  const parts = text.split(/[,;/+&|\n]+/).map(s => s.trim()).filter(Boolean);
  if (parts.length === 0) return ['Matematika'];

  return parts.map(p => {
    const lower = p.toLowerCase();
    if (lower.includes('mat')) return 'Matematika';
    if (lower.includes('ipa') || lower.includes('sains') || lower.includes('science')) return 'IPA / Sains';
    if (lower.includes('inggris') || lower.includes('english')) return 'Bahasa Inggris';
    if (lower.includes('indo')) return 'Bahasa Indonesia';
    return p;
  });
}

/**
 * Normalize header names to identify key fields regardless of casing or formatting
 */
function normalizeHeaderKey(header: string): string {
  return String(header || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Maps raw spreadsheet rows into ParticipantRecord objects
 */
export function mapRowsToParticipants(rows: Record<string, any>[]): { participants: ParticipantRecord[]; warnings: string[] } {
  const warnings: string[] = [];
  const participants: ParticipantRecord[] = [];

  rows.forEach((row, index) => {
    // Find matching keys
    const entries = Object.entries(row);
    let idVal = '';
    let nameVal = '';
    let phoneVal = '';
    let levelVal = '';
    let schoolVal = '';
    let cityVal = '';
    let emailVal = '';
    let parentVal = '';
    let addressVal = '';
    let subjectVal = '';
    let statusVal = '';
    let scoreSimulasiVal: any = null;
    let scorePenyisihanVal: any = null;
    let scoreFinalVal: any = null;
    let rankVal = '';
    let qualVal = '';
    let paymentVal = '';

    for (const [key, val] of entries) {
      const norm = normalizeHeaderKey(key);
      const strVal = val !== undefined && val !== null ? String(val).trim() : '';

      if (['id', 'nopeserta', 'nomorpeserta', 'idpeserta', 'participantid', 'nomor'].includes(norm)) {
        idVal = strVal;
      } else if (['nama', 'namalengkap', 'namapeserta', 'namasiswa', 'fullname', 'name', 'namaanak'].includes(norm)) {
        nameVal = strVal;
      } else if (['whatsapp', 'nowa', 'nomorwhatsapp', 'nowhatsapp', 'nohp', 'nomorhp', 'telepon', 'phone', 'hp', 'kontak', 'kontakwali'].includes(norm)) {
        phoneVal = strVal;
      } else if (['jenjang', 'kategori', 'tingkat', 'level', 'kelas', 'grade', 'kategorijenjang'].includes(norm)) {
        levelVal = strVal;
      } else if (['sekolah', 'asalsekolah', 'namasekolah', 'school', 'instansi', 'madrasah', 'tk', 'sd', 'smp'].includes(norm)) {
        schoolVal = strVal;
      } else if (['kota', 'kabupaten', 'provinsi', 'kotakabupaten', 'kabkota', 'city', 'domisili', 'wilayah'].includes(norm)) {
        cityVal = strVal;
      } else if (['email', 'surel', 'mail', 'alamatemail'].includes(norm)) {
        emailVal = strVal;
      } else if (['namaorangtua', 'orangtua', 'wali', 'namawali', 'parent', 'ayah', 'ibu', 'namaayahibu'].includes(norm)) {
        parentVal = strVal;
      } else if (['alamat', 'alamatlengkap', 'address', 'tempattinggal'].includes(norm)) {
        addressVal = strVal;
      } else if (['matapelajaran', 'mapel', 'bidang', 'subject', 'bidangsains', 'lomba', 'pilihanlomba', 'pilihanmapel'].includes(norm)) {
        subjectVal = strVal;
      } else if (['status', 'statuscbt', 'cbtstatus'].includes(norm)) {
        statusVal = strVal;
      } else if (['nilaisimulasi', 'skorsimulasi', 'simulasi'].includes(norm)) {
        scoreSimulasiVal = strVal;
      } else if (['nilaipenyisihan', 'skorpenyisihan', 'penyisihan', 'nilai'].includes(norm)) {
        scorePenyisihanVal = strVal;
      } else if (['nilaifinal', 'skorfinal', 'final'].includes(norm)) {
        scoreFinalVal = strVal;
      } else if (['juara', 'medali', 'rank', 'championrank', 'peringkat'].includes(norm)) {
        rankVal = strVal;
      } else if (['kelulusan', 'statuskelulusan', 'lolosfinal', 'kualifikasi'].includes(norm)) {
        qualVal = strVal;
      } else if (['tiketfinal', 'closing', 'pembayaran', 'bayar'].includes(norm)) {
        paymentVal = strVal;
      }
    }

    // Skip row if completely empty or no name
    if (!nameVal && !phoneVal && !idVal) {
      return;
    }

    if (!nameVal) {
      warnings.push(`Baris ${index + 1}: Nama peserta tidak ditemukan, dilewati.`);
      return;
    }

    const cleanPhone = cleanPhoneNumber(phoneVal) || '08123456789';
    const cleanLevel = normalizeCategoryLevel(levelVal);
    const finalId = idVal ? idVal.trim().toUpperCase() : generateParticipantId(cleanLevel, index);
    const subjects = parseSubjectsList(subjectVal);

    // Build participant record
    const participant: ParticipantRecord = {
      id: finalId,
      fullName: nameVal.trim(),
      level: cleanLevel,
      schoolName: schoolVal || 'Sekolah Peserta OSN',
      cityProvince: cityVal || 'Indonesia',
      whatsapp: cleanPhone,
      email: emailVal || `${nameVal.toLowerCase().replace(/[^a-z0-9]/g, '')}@osn-prestasi.id`,
      parentName: parentVal || '-',
      fullAddress: addressVal || '-',
      subjects: subjects,
      registeredAt: new Date().toISOString(),
      cbtStatus: statusVal || 'Aktif & Siap Ujian (Tercatat di Database)',
      qualificationStatus: (qualVal.toLowerCase().includes('lolos') || (scorePenyisihanVal && Number(scorePenyisihanVal) >= 60))
        ? 'lolos'
        : (qualVal.toLowerCase().includes('tidak') ? 'tidak_lolos' : 'pending'),
      finalTicketPaymentStatus: paymentVal.toLowerCase().includes('lunas') || paymentVal.toLowerCase().includes('closing')
        ? 'paid_closing'
        : 'unpaid',
      simulatedAttempts: scoreSimulasiVal ? 1 : 0,
      penyisihanAttempts: scorePenyisihanVal ? 1 : 0,
      finalAttempts: scoreFinalVal ? 1 : 0
    };

    if (scoreSimulasiVal && !isNaN(Number(scoreSimulasiVal))) {
      const sc = Number(scoreSimulasiVal);
      participant.simulatedExam = {
        subject: subjects[0] || 'Matematika',
        score: sc,
        totalQuestions: 20,
        completedAt: new Date().toISOString(),
        status: sc >= 60 ? 'Selesai Simulasi (Lulus)' : 'Selesai Simulasi'
      };
    }

    if (scorePenyisihanVal && !isNaN(Number(scorePenyisihanVal))) {
      const sc = Number(scorePenyisihanVal);
      participant.penyisihanExam = {
        subject: subjects[0] || 'Matematika',
        score: sc,
        totalQuestions: 20,
        completedAt: new Date().toISOString(),
        status: sc >= 60 ? 'Selesai Babak Penyisihan (Lolos ke Final)' : 'Selesai Babak Penyisihan'
      };
      if (sc >= 60) {
        participant.qualificationStatus = 'lolos';
        participant.qualificationNote = 'Dinyatakan Lolos ke Babak Final';
      }
    }

    if (scoreFinalVal && !isNaN(Number(scoreFinalVal))) {
      const sc = Number(scoreFinalVal);
      participant.finalExam = {
        subject: subjects[0] || 'Matematika',
        score: sc,
        totalQuestions: 20,
        completedAt: new Date().toISOString(),
        status: 'Selesai Mengerjakan Babak Final'
      };
      if (sc >= 95) participant.championRank = 'Juara 1';
      else if (sc >= 90) participant.championRank = 'Juara 2';
      else if (sc >= 82) participant.championRank = 'Juara 3';
      else participant.championRank = 'Peserta Final';
    } else if (rankVal) {
      participant.championRank = rankVal;
    }

    participants.push(participant);
  });

  return { participants, warnings };
}

/**
 * Parse an uploaded Spreadsheet / CSV / Excel file
 */
export async function parseSpreadsheetFile(file: File): Promise<ParseResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      return {
        success: false,
        participants: [],
        totalRawRows: 0,
        validCount: 0,
        warnings: [],
        errors: ['File Spreadsheet kosong atau tidak memiliki lembar kerja (worksheet).']
      };
    }

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const rawRows = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, { defval: '' });

    if (!rawRows || rawRows.length === 0) {
      return {
        success: false,
        participants: [],
        totalRawRows: 0,
        validCount: 0,
        warnings: [],
        errors: ['Lembar kerja Spreadsheet tidak berisi data peserta.']
      };
    }

    const { participants, warnings: mapWarnings } = mapRowsToParticipants(rawRows);

    if (participants.length === 0) {
      return {
        success: false,
        participants: [],
        totalRawRows: rawRows.length,
        validCount: 0,
        warnings: mapWarnings,
        errors: ['Tidak ada data peserta yang valid ditemukan. Pastikan kolom memuat Nama Peserta.']
      };
    }

    return {
      success: true,
      participants,
      totalRawRows: rawRows.length,
      validCount: participants.length,
      warnings: [...warnings, ...mapWarnings],
      errors: []
    };
  } catch (err: any) {
    console.error('Error parsing spreadsheet file:', err);
    return {
      success: false,
      participants: [],
      totalRawRows: 0,
      validCount: 0,
      warnings: [],
      errors: [err?.message || 'Gagal membaca format file Spreadsheet.']
    };
  }
}

/**
 * Fetch and parse a Spreadsheet URL (e.g. Google Sheets link, CSV link)
 */
export async function fetchAndParseSpreadsheetUrl(url: string): Promise<ParseResult> {
  try {
    const trimmed = url.trim();
    if (!trimmed) {
      return {
        success: false,
        participants: [],
        totalRawRows: 0,
        validCount: 0,
        warnings: [],
        errors: ['Link Spreadsheet wajib diisi.']
      };
    }

    // Call server proxy to bypass CORS
    const response = await fetch('/api/participants/fetch-spreadsheet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: trimmed })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Server merespon dengan status ${response.status}`);
    }

    const resJson = await response.json();
    if (!resJson.success || !Array.isArray(resJson.rows)) {
      throw new Error(resJson.error || 'Gagal memproses data dari spreadsheet URL.');
    }

    const { participants, warnings } = mapRowsToParticipants(resJson.rows);

    return {
      success: true,
      participants,
      totalRawRows: resJson.rows.length,
      validCount: participants.length,
      warnings,
      errors: []
    };
  } catch (err: any) {
    console.error('Error fetching spreadsheet url:', err);
    return {
      success: false,
      participants: [],
      totalRawRows: 0,
      validCount: 0,
      warnings: [],
      errors: [err?.message || 'Gagal mengambil data dari URL Spreadsheet.']
    };
  }
}

/**
 * Save and sync imported participants to both Server and Local Storage
 */
export async function saveImportedParticipants(
  newParticipants: ParticipantRecord[],
  options: { mergeWithExisting: boolean } = { mergeWithExisting: true }
): Promise<{ success: boolean; total: number; inserted: number; updated: number; message: string }> {
  try {
    // 1. Send to server bulk endpoint for permanent storage
    const serverRes = await fetch('/api/participants/bulk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        participants: newParticipants,
        mode: options.mergeWithExisting ? 'merge' : 'replace'
      })
    });

    let serverData: any = null;
    if (serverRes.ok) {
      serverData = await serverRes.json();
    }

    // 2. Also update local storage immediately
    const existing = getAllParticipants();
    const map = new Map<string, ParticipantRecord>();

    if (options.mergeWithExisting) {
      existing.forEach(p => map.set(p.id, p));
    }

    let inserted = 0;
    let updated = 0;

    newParticipants.forEach(p => {
      if (map.has(p.id)) {
        updated++;
        const prev = map.get(p.id)!;
        map.set(p.id, {
          ...prev,
          ...p,
          simulatedExam: p.simulatedExam || prev.simulatedExam,
          penyisihanExam: p.penyisihanExam || prev.penyisihanExam,
          finalExam: p.finalExam || prev.finalExam,
          simulatedAttempts: Math.max(p.simulatedAttempts || 0, prev.simulatedAttempts || 0),
          penyisihanAttempts: Math.max(p.penyisihanAttempts || 0, prev.penyisihanAttempts || 0),
          finalAttempts: Math.max(p.finalAttempts || 0, prev.finalAttempts || 0)
        });
      } else {
        inserted++;
        map.set(p.id, p);
      }
    });

    const finalMerged = Array.from(map.values());
    saveAllParticipants(finalMerged);

    return {
      success: true,
      total: finalMerged.length,
      inserted: serverData?.inserted ?? inserted,
      updated: serverData?.updated ?? updated,
      message: serverData?.message || `Berhasil memasukkan ${newParticipants.length} data peserta ke sistem (${inserted} baru, ${updated} diperbarui).`
    };
  } catch (err: any) {
    console.error('Error saving imported participants:', err);
    throw new Error(err?.message || 'Gagal menyimpan peserta ke database.');
  }
}

/**
 * Generate and download standard Template Spreadsheet for mass participant import
 */
export function downloadParticipantTemplate(format: 'xlsx' | 'csv' = 'xlsx'): void {
  const sampleHeaders = [
    'ID Peserta',
    'Nama Lengkap',
    'Nomor WhatsApp',
    'Jenjang Kategori',
    'Asal Sekolah',
    'Kota/Kabupaten',
    'Mata Pelajaran',
    'Nama Orang Tua / Wali',
    'Alamat Lengkap',
    'Nilai Simulasi',
    'Nilai Penyisihan',
    'Status Kelulusan'
  ];

  const sampleRows = [
    [
      'OSN-2026-A-10001',
      'Kenzo Alvaro Pratama',
      '081234567891',
      'PAUD / TK (Kategori A: Usia 4-6 Tahun)',
      'TK Bintang Ceria',
      'Bandung, Jawa Barat',
      'Matematika; IPA / Sains',
      'Dr. Hendra Gunawan',
      'Jl. Dago Asri No. 8, Bandung',
      '85',
      '90',
      'Lolos'
    ],
    [
      'OSN-2026-B-20002',
      'Dzaliqa Assyafa N',
      '081234567892',
      'SD / MI (Kategori B: Usia 7-12 Tahun)',
      'SDN Teladan Bangsa (Kelas 5)',
      'Jakarta Selatan, DKI Jakarta',
      'Matematika; Bahasa Inggris',
      'H. Nurhadi Santoso',
      'Jl. Tebet Barat Dalam No. 14, Jakarta',
      '90',
      '95',
      'Lolos'
    ],
    [
      'OSN-2026-C-30003',
      'Annora Geraldqueen S.R',
      '081234567893',
      'SMP / MTs (Kategori C: Usia 13-16 Tahun)',
      'SMP Negeri 1 Nusantara',
      'Surabaya, Jawa Timur',
      'Bahasa Inggris; Bahasa Indonesia',
      'Bambang Wijaya',
      'Jl. Pemuda No. 45, Surabaya',
      '88',
      '92',
      'Lolos'
    ]
  ];

  if (format === 'csv') {
    const escapeCsv = (val: any) => `"${String(val ?? '').replace(/"/g, '""')}"`;
    const csvContent = '\uFEFF' + [
      sampleHeaders.map(escapeCsv).join(','),
      ...sampleRows.map(r => r.map(escapeCsv).join(','))
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Format_Import_Peserta_OSN_2026.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else {
    const data = [sampleHeaders, ...sampleRows];
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [
      { wch: 18 },
      { wch: 25 },
      { wch: 16 },
      { wch: 35 },
      { wch: 28 },
      { wch: 22 },
      { wch: 25 },
      { wch: 22 },
      { wch: 30 },
      { wch: 14 },
      { wch: 15 },
      { wch: 16 }
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template Peserta');
    XLSX.writeFile(wb, 'Format_Import_Peserta_OSN_2026.xlsx');
  }
}
