export interface ExamResultInfo {
  subject: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  status: string;
}

export interface ParticipantRecord {
  id: string;
  fullName: string;
  level: string;
  schoolName: string;
  cityProvince: string;
  whatsapp: string;
  email: string;
  parentName?: string;
  fullAddress?: string;
  subjects: string[];
  registeredAt: string;
  cbtStatus: string;
  simulatedExam?: ExamResultInfo;
  finalExam?: ExamResultInfo;
}

const STORAGE_KEY = 'osn_participants_database_2026';

// Initial pre-registered mock data for demonstration
export const INITIAL_PARTICIPANTS: ParticipantRecord[] = [
  {
    id: "OSN-2026-B-89102",
    fullName: "Dzaliqa Assyafa N",
    level: "SD / MI (Kategori B: Usia 7-12 Tahun)",
    schoolName: "SDN Teladan Bangsa (Kelas 5)",
    cityProvince: "DKI Jakarta",
    whatsapp: "08123456781",
    email: "dzaliqa.assyafa@gmail.com",
    parentName: "H. Nurhadi Santoso",
    fullAddress: "Jl. Tebet Barat Dalam No. 14, Tebet, Jakarta Selatan",
    subjects: ["Matematika", "IPA / Sains"],
    registeredAt: "2026-09-20T08:30:00.000Z",
    cbtStatus: "Selesai Mengerjakan Babak Final (Skor: 95/100)",
    simulatedExam: {
      subject: "Matematika",
      score: 90,
      totalQuestions: 20,
      completedAt: "2026-09-21T11:20:00.000Z",
      status: "Selesai Simulasi (Lulus)"
    },
    finalExam: {
      subject: "Matematika",
      score: 95,
      totalQuestions: 20,
      completedAt: "2026-09-23T14:45:00.000Z",
      status: "Selesai Mengerjakan Babak Final"
    }
  },
  {
    id: "OSN-2026-C-99214",
    fullName: "Annora Geraldqueen S.R",
    level: "SMP / MTs (Kategori C: Usia 13-16 Tahun)",
    schoolName: "SMP Negeri 1 Nusantara",
    cityProvince: "Jawa Timur",
    whatsapp: "08123456782",
    email: "annora.gerald@gmail.com",
    parentName: "Bambang Wijaya",
    fullAddress: "Jl. Pemuda No. 45, Gubeng, Surabaya",
    subjects: ["Bahasa Indonesia", "Bahasa Inggris"],
    registeredAt: "2026-09-21T10:15:00.000Z",
    cbtStatus: "Selesai Simulasi CBT (Skor: 85/100)",
    simulatedExam: {
      subject: "Bahasa Inggris",
      score: 85,
      totalQuestions: 20,
      completedAt: "2026-09-22T09:10:00.000Z",
      status: "Selesai Simulasi CBT"
    }
  },
  {
    id: "OSN-2026-A-77103",
    fullName: "Aqilla Ifra Mikayla",
    level: "PAUD / TK (Kategori A: Usia 4-6 Tahun)",
    schoolName: "TK Prestasi Cemerlang",
    cityProvince: "Jawa Barat",
    whatsapp: "08123456783",
    email: "aqilla.mikayla@gmail.com",
    subjects: ["Bahasa Indonesia"],
    registeredAt: "2026-09-22T14:20:00.000Z",
    cbtStatus: "Aktif & Siap Ujian (Tercatat di Database)"
  },
  {
    id: "OSN-2026-B-88391",
    fullName: "Muhammad Rizky Pratama",
    level: "SD / MI (Kategori B: Usia 7-12 Tahun)",
    schoolName: "Madrasah Ibtidaiyah Al-Fikri",
    cityProvince: "Sumatera Barat",
    whatsapp: "08123456784",
    email: "rizky.pratama@gmail.com",
    subjects: ["Matematika", "IPA / Sains", "Bahasa Inggris"],
    registeredAt: "2026-09-23T09:45:00.000Z",
    cbtStatus: "Selesai Mengerjakan Babak Final (Skor: 100/100)",
    simulatedExam: {
      subject: "IPA / Sains",
      score: 95,
      totalQuestions: 20,
      completedAt: "2026-09-23T10:30:00.000Z",
      status: "Selesai Simulasi (Lulus)"
    },
    finalExam: {
      subject: "IPA / Sains",
      score: 100,
      totalQuestions: 20,
      completedAt: "2026-09-23T15:10:00.000Z",
      status: "Selesai Mengerjakan Babak Final"
    }
  }
];

function normalizePhone(phone: string): string {
  if (!phone) return '';
  return phone.replace(/[^0-9]/g, '').replace(/^62/, '0');
}

function normalizeName(name: string): string {
  if (!name) return '';
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function getAllParticipants(): ParticipantRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PARTICIPANTS));
      return INITIAL_PARTICIPANTS;
    }
    const list: ParticipantRecord[] = JSON.parse(raw);
    return Array.isArray(list) ? list : INITIAL_PARTICIPANTS;
  } catch (err) {
    console.error('Failed to read participants database:', err);
    return INITIAL_PARTICIPANTS;
  }
}

export async function saveParticipant(data: {
  fullName: string;
  level: string;
  schoolName: string;
  cityProvince: string;
  whatsapp: string;
  email: string;
  parentName?: string;
  fullAddress?: string;
  subjects: string[];
}): Promise<ParticipantRecord> {
  const all = getAllParticipants();
  
  // Clean phone and name
  const cleanPhone = normalizePhone(data.whatsapp);
  const cleanName = data.fullName.trim();

  // Determine prefix based on level
  let catPrefix = 'B';
  if (data.level.includes('PAUD') || data.level.includes('TK')) catPrefix = 'A';
  else if (data.level.includes('SMP') || data.level.includes('MTs')) catPrefix = 'C';

  // Check if participant already exists by WhatsApp or Name
  const existingIndex = all.findIndex(p => 
    normalizePhone(p.whatsapp) === cleanPhone &&
    normalizeName(p.fullName) === normalizeName(cleanName)
  );

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const id = existingIndex >= 0 ? all[existingIndex].id : `OSN-2026-${catPrefix}-${randomNum}`;

  const record: ParticipantRecord = {
    id,
    fullName: cleanName,
    level: data.level,
    schoolName: data.schoolName,
    cityProvince: data.cityProvince,
    whatsapp: data.whatsapp,
    email: data.email,
    parentName: data.parentName || '-',
    fullAddress: data.fullAddress || '-',
    subjects: data.subjects && data.subjects.length > 0 ? data.subjects : ['Matematika'],
    registeredAt: new Date().toISOString(),
    cbtStatus: "Aktif & Siap Ujian (Tercatat di Database)"
  };

  if (existingIndex >= 0) {
    all[existingIndex] = record;
  } else {
    all.unshift(record); // newest first
  }

  // Save to localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Failed to persist participant:', err);
  }

  // Also sync to server database in background
  try {
    fetch('/api/participants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    }).catch(() => {/* ignore network fallback */});
  } catch {
    // Ignore
  }

  return record;
}

export async function saveMultipleParticipants(
  list: Array<{
    fullName: string;
    level: string;
    schoolName: string;
    cityProvince: string;
    whatsapp: string;
    email: string;
    parentName?: string;
    fullAddress?: string;
    subjects: string[];
  }>
): Promise<ParticipantRecord[]> {
  const results: ParticipantRecord[] = [];
  for (const item of list) {
    const saved = await saveParticipant(item);
    results.push(saved);
  }
  return results;
}

export function findParticipant(fullNameOrId: string, whatsappInput?: string): ParticipantRecord | null {
  const all = getAllParticipants();
  const searchName = normalizeName(fullNameOrId);
  const searchPhone = whatsappInput ? normalizePhone(whatsappInput) : normalizePhone(fullNameOrId);

  // 1. Direct match by WhatsApp and Name
  if (fullNameOrId && whatsappInput) {
    const matchBoth = all.find(p => {
      const matchPhone = normalizePhone(p.whatsapp) === searchPhone;
      const matchName = normalizeName(p.fullName).includes(searchName) || searchName.includes(normalizeName(p.fullName));
      return matchPhone || matchName;
    });
    if (matchBoth) return matchBoth;
  }

  // 2. Match by exact Participant ID
  const matchId = all.find(p => p.id.toUpperCase() === fullNameOrId.trim().toUpperCase());
  if (matchId) return matchId;

  // 3. Match by WhatsApp number
  if (searchPhone) {
    const matchPhone = all.find(p => normalizePhone(p.whatsapp) === searchPhone);
    if (matchPhone) return matchPhone;
  }

  // 4. Match by Full Name
  if (searchName) {
    const matchName = all.find(p => {
      const pName = normalizeName(p.fullName);
      return pName === searchName || pName.includes(searchName) || searchName.includes(pName);
    });
    if (matchName) return matchName;
  }

  return null;
}

export async function updateParticipantExamResult(
  participantId: string,
  result: {
    examType: 'simulasi' | 'final';
    subject: string;
    score: number;
    totalQuestions: number;
  }
): Promise<ParticipantRecord | null> {
  const all = getAllParticipants();
  const idx = all.findIndex(p => p.id === participantId);
  if (idx === -1) return null;

  const p = all[idx];
  const examInfo: ExamResultInfo = {
    subject: result.subject,
    score: result.score,
    totalQuestions: result.totalQuestions,
    completedAt: new Date().toISOString(),
    status: result.examType === 'final' ? 'Selesai Mengerjakan Babak Final' : 'Selesai Simulasi CBT'
  };

  if (result.examType === 'final') {
    p.finalExam = examInfo;
    p.cbtStatus = `Selesai Babak Final (Skor: ${result.score}/100)`;
  } else {
    p.simulatedExam = examInfo;
    p.cbtStatus = `Selesai Simulasi CBT (Skor: ${result.score}/100)`;
  }

  all[idx] = p;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Failed to update participant exam result:', err);
  }

  // Also sync to server database
  try {
    fetch(`/api/participants/${participantId}/exam`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        examType: result.examType,
        subject: result.subject,
        score: result.score,
        totalQuestions: result.totalQuestions,
        completedAt: examInfo.completedAt
      })
    }).catch(() => {});
  } catch {}

  return p;
}
