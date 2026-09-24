export interface ExamResultInfo {
  subject: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  status: string;
  violationReason?: string;
  attemptsCount?: number;
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
  // Attempt counters (Max 2x access per exam stage)
  simulatedAttempts?: number;
  finalAttempts?: number;
  // Anti-Cheat Violation Reason
  violationReason?: string;
  // Social Media Following Confirmation
  hasFollowedSocial?: boolean;
  socialFollowedAt?: string;
  // Babak Penyisihan Qualification Status (Ditentukan Admin)
  qualificationStatus?: 'pending' | 'lolos' | 'tidak_lolos';
  qualificationNote?: string;
  // Tiket Final Payment Closing Status
  finalTicketPaymentStatus?: 'unpaid' | 'pending_verification' | 'paid_closing';
  finalTicketPaidAt?: string;
  finalTicketAmount?: number;
  // Final Award / Certificate Champion Title
  championRank?: 'Juara 1' | 'Juara 2' | 'Juara 3' | 'Peserta Final' | 'Belum Dinilai';
  certificateIssuedDate?: string;
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
    cbtStatus: "Tiket Final Lunas (Closing BCA Rp 99.000)",
    qualificationStatus: 'lolos',
    qualificationNote: 'Dinyatakan Lolos ke Babak Final',
    finalTicketPaymentStatus: 'paid_closing',
    finalTicketPaidAt: "2026-09-22T13:10:00.000Z",
    finalTicketAmount: 99000,
    championRank: 'Juara 2',
    certificateIssuedDate: "2026-09-23T16:00:00.000Z",
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
    cbtStatus: "Selesai Simulasi CBT (Lolos Penyisihan)",
    qualificationStatus: 'lolos',
    qualificationNote: 'Dinyatakan Lolos ke Babak Final',
    finalTicketPaymentStatus: 'unpaid',
    championRank: 'Belum Dinilai',
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
    qualificationStatus: 'pending',
    finalTicketPaymentStatus: 'unpaid',
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
    cbtStatus: "Tiket Final Lunas (Closing BCA Rp 99.000)",
    qualificationStatus: 'lolos',
    qualificationNote: 'Dinyatakan Lolos ke Babak Final',
    finalTicketPaymentStatus: 'paid_closing',
    finalTicketPaidAt: "2026-09-23T11:00:00.000Z",
    finalTicketAmount: 99000,
    championRank: 'Juara 1',
    certificateIssuedDate: "2026-09-23T16:00:00.000Z",
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
    violationReason?: string;
  }
): Promise<ParticipantRecord | null> {
  const all = getAllParticipants();
  const idx = all.findIndex(p => p.id === participantId);
  if (idx === -1) return null;

  const p = all[idx];

  // Increment attempts count
  if (result.examType === 'final') {
    p.finalAttempts = (p.finalAttempts || 0) + 1;
  } else {
    p.simulatedAttempts = (p.simulatedAttempts || 0) + 1;
  }

  const currentAttempts = result.examType === 'final' ? p.finalAttempts : p.simulatedAttempts;

  let statusText = result.examType === 'final' ? 'Selesai Mengerjakan Babak Final' : 'Selesai Simulasi CBT';
  if (result.violationReason) {
    statusText = `Diskualifikasi: ${result.violationReason}`;
  }

  const examInfo: ExamResultInfo = {
    subject: result.subject,
    score: result.score,
    totalQuestions: result.totalQuestions,
    completedAt: new Date().toISOString(),
    status: statusText,
    violationReason: result.violationReason,
    attemptsCount: currentAttempts
  };

  if (result.examType === 'final') {
    p.finalExam = examInfo;
    if (result.violationReason) {
      p.violationReason = result.violationReason;
    }
    p.cbtStatus = result.violationReason
      ? `Final Terhenti (Pelanggaran Anti-Contek)`
      : `Selesai Babak Final (Skor: ${result.score}/100, Percobaan ke-${currentAttempts}/2)`;
  } else {
    p.simulatedExam = examInfo;
    p.cbtStatus = `Selesai Simulasi CBT (Skor: ${result.score}/100, Percobaan ke-${currentAttempts}/2)`;
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
        completedAt: examInfo.completedAt,
        violationReason: result.violationReason,
        attemptsCount: currentAttempts
      })
    }).catch(() => {});
  } catch {}

  return p;
}

export function deleteParticipant(participantId: string): boolean {
  const all = getAllParticipants();
  const filtered = all.filter(p => p.id !== participantId);
  if (filtered.length === all.length) return false;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete participant:', err);
  }

  try {
    fetch(`/api/participants/${participantId}`, { method: 'DELETE' }).catch(() => {});
  } catch {}

  window.dispatchEvent(new CustomEvent('osn_participants_updated'));
  return true;
}

export function updateParticipantField(participantId: string, fields: Partial<ParticipantRecord>): ParticipantRecord | null {
  const all = getAllParticipants();
  const idx = all.findIndex(p => p.id === participantId);
  if (idx === -1) return null;

  all[idx] = { ...all[idx], ...fields };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Failed to update participant:', err);
  }

  try {
    fetch(`/api/participants/${participantId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    }).catch(() => {});
  } catch {}

  window.dispatchEvent(new CustomEvent('osn_participants_updated'));
  return all[idx];
}

export function confirmFinalTicketPayment(participantId: string, amount: number = 99000): ParticipantRecord | null {
  return updateParticipantField(participantId, {
    finalTicketPaymentStatus: 'paid_closing',
    finalTicketPaidAt: new Date().toISOString(),
    finalTicketAmount: amount,
    cbtStatus: 'Tiket Final Lunas (Siap Ujian Final)'
  });
}

export function resetParticipantAttempts(
  participantId: string,
  examType: 'simulasi' | 'final' | 'all' = 'all',
  clearHistory: boolean = false
): ParticipantRecord | null {
  const all = getAllParticipants();
  const idx = all.findIndex(p => p.id === participantId);
  if (idx === -1) return null;

  const p = { ...all[idx] };
  p.violationReason = undefined;
  if (!examType || examType === 'all') {
    p.simulatedAttempts = 0;
    p.finalAttempts = 0;
    p.cbtStatus = 'Aktif (Kuota Ujian Direset 0/2)';
    if (clearHistory) {
      delete p.simulatedExam;
      delete p.finalExam;
      p.qualificationStatus = 'pending';
    }
  } else if (examType === 'simulasi') {
    p.simulatedAttempts = 0;
    p.cbtStatus = 'Aktif (Kuota Penyisihan Direset 0/2)';
    if (clearHistory) {
      delete p.simulatedExam;
      p.qualificationStatus = 'pending';
    }
  } else if (examType === 'final') {
    p.finalAttempts = 0;
    p.cbtStatus = 'Aktif (Kuota Final Direset 0/2)';
    if (clearHistory) {
      delete p.finalExam;
    }
  }

  all[idx] = p;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Failed to reset attempts:', err);
  }

  // Sync to server in background
  try {
    fetch(`/api/participants/${participantId}/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ examType, clearHistory })
    }).catch(() => {});
  } catch {}

  window.dispatchEvent(new CustomEvent('osn_participants_updated'));
  return p;
}

export function grantExtraAttempt(
  participantId: string,
  examType: 'simulasi' | 'final' = 'simulasi'
): ParticipantRecord | null {
  const all = getAllParticipants();
  const idx = all.findIndex(p => p.id === participantId);
  if (idx === -1) return null;

  const p = { ...all[idx] };
  p.violationReason = undefined;
  if (examType === 'final') {
    p.finalAttempts = Math.max(0, (p.finalAttempts || 2) - 1);
    p.cbtStatus = `Aktif (+1 Kuota Tambahan Final, Terpakai: ${p.finalAttempts}/2)`;
  } else {
    p.simulatedAttempts = Math.max(0, (p.simulatedAttempts || 2) - 1);
    p.cbtStatus = `Aktif (+1 Kuota Tambahan Penyisihan, Terpakai: ${p.simulatedAttempts}/2)`;
  }

  all[idx] = p;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Failed to grant extra attempt:', err);
  }

  try {
    fetch(`/api/participants/${participantId}/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ examType, extraAttempt: true })
    }).catch(() => {});
  } catch {}

  window.dispatchEvent(new CustomEvent('osn_participants_updated'));
  return p;
}

export function bulkResetParticipantAttempts(
  participantIds: string[],
  examType: 'simulasi' | 'final' | 'all' = 'all',
  clearHistory: boolean = false
): number {
  let count = 0;
  for (const id of participantIds) {
    const res = resetParticipantAttempts(id, examType, clearHistory);
    if (res) count++;
  }
  return count;
}


