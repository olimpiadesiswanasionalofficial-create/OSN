import { QuestionItem, getAllQuestions, getFilteredQuestions } from './cbtQuestionsDb';
import { DUMMY_PARTICIPANTS_2000 } from './dummyParticipants2000';

export { DUMMY_PARTICIPANTS_2000 };

export interface ExamResultInfo {
  subject: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  durationText?: string;
  durationSeconds?: number;
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
  penyisihanExam?: ExamResultInfo;
  finalExam?: ExamResultInfo;
  // Attempt counters (Max 2x access per exam stage)
  simulatedAttempts?: number;
  penyisihanAttempts?: number;
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
  // Stored randomized question sets for participant exam sessions (guarantees 20 unique randomized questions per session)
  sessionQuestionIds?: { [examKey: string]: string[] };
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
    simulatedAttempts: 1,
    penyisihanAttempts: 1,
    finalAttempts: 1,
    simulatedExam: {
      subject: "Matematika",
      score: 90,
      totalQuestions: 20,
      completedAt: "2026-09-21T11:20:00.000Z",
      status: "Selesai Simulasi (Lulus)"
    },
    penyisihanExam: {
      subject: "Matematika",
      score: 92,
      totalQuestions: 20,
      completedAt: "2026-09-22T10:15:00.000Z",
      status: "Selesai Babak Penyisihan (Lolos ke Final)"
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
    id: "OSN-2026-A-89103",
    fullName: "Muhammad Rayhan Santoso",
    level: "PAUD / TK (Kategori A: Usia 4-6 Tahun)",
    schoolName: "TK Teladan Bangsa",
    cityProvince: "DKI Jakarta",
    whatsapp: "08123456781",
    email: "dzaliqa.assyafa@gmail.com",
    parentName: "H. Nurhadi Santoso",
    fullAddress: "Jl. Tebet Barat Dalam No. 14, Tebet, Jakarta Selatan",
    subjects: ["Matematika", "Bahasa Indonesia"],
    registeredAt: "2026-09-20T08:35:00.000Z",
    cbtStatus: "Aktif & Siap Ujian (Tercatat di Database)",
    qualificationStatus: 'lolos',
    qualificationNote: 'Dinyatakan Lolos ke Babak Final',
    finalTicketPaymentStatus: 'unpaid',
    simulatedAttempts: 1,
    penyisihanAttempts: 1,
    simulatedExam: {
      subject: "Matematika",
      score: 95,
      totalQuestions: 20,
      completedAt: "2026-09-21T14:15:00.000Z",
      status: "Selesai Simulasi (Lulus)"
    },
    penyisihanExam: {
      subject: "Matematika",
      score: 90,
      totalQuestions: 20,
      completedAt: "2026-09-22T11:20:00.000Z",
      status: "Selesai Babak Penyisihan (Lolos ke Final)"
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
    cbtStatus: "Selesai Babak Penyisihan (Lolos Final)",
    qualificationStatus: 'lolos',
    qualificationNote: 'Dinyatakan Lolos ke Babak Final',
    finalTicketPaymentStatus: 'unpaid',
    simulatedAttempts: 1,
    penyisihanAttempts: 1,
    simulatedExam: {
      subject: "Bahasa Inggris",
      score: 85,
      totalQuestions: 20,
      completedAt: "2026-09-22T09:40:00.000Z",
      status: "Selesai Simulasi (Lulus)"
    },
    penyisihanExam: {
      subject: "Bahasa Inggris",
      score: 88,
      totalQuestions: 20,
      completedAt: "2026-09-22T14:30:00.000Z",
      status: "Selesai Babak Penyisihan (Lolos ke Final)"
    }
  },
  {
    id: "OSN-2026-A-77123",
    fullName: "Kenzo Alvaro Pratama",
    level: "PAUD / TK (Kategori A: Usia 4-6 Tahun)",
    schoolName: "TK Bintang Ceria",
    cityProvince: "Jawa Barat",
    whatsapp: "08123456783",
    email: "kenzo.alvaro@gmail.com",
    parentName: "Dr. Hendra Gunawan",
    fullAddress: "Komp. Dago Asri No. 8, Coblong, Bandung",
    subjects: ["Matematika", "IPA / Sains"],
    registeredAt: "2026-09-22T14:00:00.000Z",
    qualificationStatus: 'pending',
    finalTicketPaymentStatus: 'unpaid',
    cbtStatus: "Aktif & Siap Ujian (Tercatat di Database)",
    simulatedAttempts: 1,
    simulatedExam: {
      subject: "Matematika",
      score: 80,
      totalQuestions: 20,
      completedAt: "2026-09-22T15:20:00.000Z",
      status: "Selesai Simulasi (Lulus)"
    }
  },
  {
    id: "OSN-2026-B-88391",
    fullName: "Muhammad Rizky Pratama",
    level: "SD / MI (Kategori B: Usia 7-12 Tahun)",
    schoolName: "Madrasah Ibtidaiyah Al-Fikri",
    cityProvince: "Sumatera Barat",
    whatsapp: "08123456784",
    email: "rizky.pratama@gmail.com",
    parentName: "Syamsul Bahri",
    fullAddress: "Jl. Khatib Sulaiman No. 22, Padang Barat, Padang",
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
    simulatedAttempts: 1,
    penyisihanAttempts: 1,
    finalAttempts: 1,
    simulatedExam: {
      subject: "IPA / Sains",
      score: 95,
      totalQuestions: 20,
      completedAt: "2026-09-23T10:30:00.000Z",
      status: "Selesai Simulasi (Lulus)"
    },
    penyisihanExam: {
      subject: "IPA / Sains",
      score: 96,
      totalQuestions: 20,
      completedAt: "2026-09-23T13:00:00.000Z",
      status: "Selesai Babak Penyisihan (Lolos ke Final)"
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

export function normalizePhone(phone: string): string {
  if (!phone) return '';
  let digits = phone.replace(/[^0-9]/g, '');
  if (digits.startsWith('62')) {
    digits = '0' + digits.slice(2);
  } else if (!digits.startsWith('0') && digits.length >= 8) {
    digits = '0' + digits;
  }
  return digits;
}

function normalizeName(name: string): string {
  if (!name) return '';
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function getAllParticipants(): ParticipantRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const customList: ParticipantRecord[] = raw ? JSON.parse(raw) : INITIAL_PARTICIPANTS;
    
    // Efficiently combine custom saved participants with 2,000 dummy records
    const map = new Map<string, ParticipantRecord>();
    for (const d of DUMMY_PARTICIPANTS_2000) {
      map.set(d.id, d);
    }
    // Custom registrations & edits take precedence
    for (const c of customList) {
      map.set(c.id, c);
    }
    return Array.from(map.values());
  } catch (err) {
    console.error('Failed to read participants database:', err);
    return [...INITIAL_PARTICIPANTS, ...DUMMY_PARTICIPANTS_2000];
  }
}

/**
 * Kebijakan Peningkatan Nilai Massal Panitia OSN 2026:
 * - jika nilai < 40 otomatis ditingkatkan ke 75
 * - jika nilai < 50 otomatis ditingkatkan ke 80
 * - jika nilai < 60 otomatis ditingkatkan ke 85
 * - jika nilai < 85 otomatis di tingkatkan ke 95
 * - jika nilai < 95 otomatis di tingkatkan ke 100
 */
export function boostScoreByPolicy(score: number): number {
  if (score < 40) return 75;
  if (score < 50) return 80;
  if (score < 60) return 85;
  if (score < 85) return 95;
  if (score < 95) return 100;
  return score;
}

/**
 * Terapkan peningkatan nilai secara massal ke peserta
 */
export function massBoostScores(stage: 'penyisihan' | 'final' | 'all' = 'penyisihan'): { updatedCount: number; list: ParticipantRecord[] } {
  const all = getAllParticipants();
  let count = 0;

  const updated = all.map(p => {
    let changed = false;
    const nextP = { ...p };

    if ((stage === 'penyisihan' || stage === 'all') && nextP.penyisihanExam) {
      const oldScore = nextP.penyisihanExam.score;
      const newScore = boostScoreByPolicy(oldScore);
      if (newScore !== oldScore) {
        nextP.penyisihanExam = {
          ...nextP.penyisihanExam,
          score: newScore,
          status: newScore >= 60 ? 'Selesai Babak Penyisihan (Lolos ke Final)' : nextP.penyisihanExam.status
        };
        if (newScore >= 60 && nextP.qualificationStatus !== 'lolos') {
          nextP.qualificationStatus = 'lolos';
          nextP.qualificationNote = 'Dinyatakan Lolos ke Babak Final';
        }
        changed = true;
      }
    }

    if ((stage === 'final' || stage === 'all') && nextP.finalExam) {
      const oldScore = nextP.finalExam.score;
      const newScore = boostScoreByPolicy(oldScore);
      if (newScore !== oldScore) {
        nextP.finalExam = {
          ...nextP.finalExam,
          score: newScore
        };
        if (newScore >= 95) nextP.championRank = 'Juara 1';
        else if (newScore >= 90) nextP.championRank = 'Juara 2';
        else if (newScore >= 82) nextP.championRank = 'Juara 3';
        changed = true;
      }
    }

    if (stage === 'all' && nextP.simulatedExam) {
      const oldScore = nextP.simulatedExam.score;
      const newScore = boostScoreByPolicy(oldScore);
      if (newScore !== oldScore) {
        nextP.simulatedExam = {
          ...nextP.simulatedExam,
          score: newScore
        };
        changed = true;
      }
    }

    if (changed) count++;
    return nextP;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('osn_participants_updated'));
  } catch (err) {
    console.error('Failed to save mass score boost:', err);
  }

  return { updatedCount: count, list: updated };
}

/**
 * Otomatis loloskan semua peserta yang memiliki nilai Babak Penyisihan > 60 ke Babak Final
 */
export function autoQualifyParticipantsAbove60(): { qualifiedCount: number; list: ParticipantRecord[] } {
  const all = getAllParticipants();
  let count = 0;

  const updated = all.map(p => {
    const score = p.penyisihanExam ? p.penyisihanExam.score : (p.simulatedExam ? p.simulatedExam.score : 0);
    if (score > 60 && p.qualificationStatus !== 'lolos') {
      count++;
      return {
        ...p,
        qualificationStatus: 'lolos' as const,
        qualificationNote: 'Dinyatakan Lolos ke Babak Final (Nilai > 60)',
        cbtStatus: 'Lolos ke Babak Final'
      };
    }
    return p;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('osn_participants_updated'));
  } catch (err) {
    console.error('Failed to save auto qualify:', err);
  }

  return { qualifiedCount: count, list: updated };
}

/**
 * Manual edit nilai & waktu pengerjaan per peserta
 */
export function manualUpdateParticipantScoreAndTime(
  participantId: string,
  updates: {
    simulasiScore?: number;
    simulasiDuration?: string;
    penyisihanScore?: number;
    penyisihanDuration?: string;
    finalScore?: number;
    finalDuration?: string;
    qualificationStatus?: 'lolos' | 'tidak_lolos' | 'pending';
    championRank?: 'Juara 1' | 'Juara 2' | 'Juara 3' | 'Peserta Final' | 'Belum Dinilai';
  }
): ParticipantRecord | null {
  const all = getAllParticipants();
  const idx = all.findIndex(p => p.id === participantId);
  if (idx === -1) return null;

  const p = { ...all[idx] };

  if (updates.simulasiScore !== undefined || updates.simulasiDuration) {
    p.simulatedExam = {
      subject: p.simulatedExam?.subject || p.subjects[0] || 'Matematika',
      score: updates.simulasiScore !== undefined ? updates.simulasiScore : (p.simulatedExam?.score || 80),
      totalQuestions: 20,
      completedAt: p.simulatedExam?.completedAt || new Date().toISOString(),
      durationText: updates.simulasiDuration || p.simulatedExam?.durationText || '18 Menit 30 Detik',
      status: (updates.simulasiScore || 0) >= 70 ? 'Selesai Simulasi (Lulus)' : 'Selesai Simulasi'
    };
  }

  if (updates.penyisihanScore !== undefined || updates.penyisihanDuration) {
    const score = updates.penyisihanScore !== undefined ? updates.penyisihanScore : (p.penyisihanExam?.score || 85);
    p.penyisihanExam = {
      subject: p.penyisihanExam?.subject || p.subjects[0] || 'Matematika',
      score: score,
      totalQuestions: 20,
      completedAt: p.penyisihanExam?.completedAt || new Date().toISOString(),
      durationText: updates.penyisihanDuration || p.penyisihanExam?.durationText || '17 Menit 45 Detik',
      status: score >= 60 ? 'Selesai Babak Penyisihan (Lolos ke Final)' : 'Selesai Babak Penyisihan'
    };
  }

  if (updates.finalScore !== undefined || updates.finalDuration) {
    const score = updates.finalScore !== undefined ? updates.finalScore : (p.finalExam?.score || 90);
    p.finalExam = {
      subject: p.finalExam?.subject || p.subjects[0] || 'Matematika',
      score: score,
      totalQuestions: 20,
      completedAt: p.finalExam?.completedAt || new Date().toISOString(),
      durationText: updates.finalDuration || p.finalExam?.durationText || '19 Menit 10 Detik',
      status: 'Selesai Mengerjakan Babak Final'
    };
  }

  if (updates.qualificationStatus) {
    p.qualificationStatus = updates.qualificationStatus;
  }

  if (updates.championRank) {
    p.championRank = updates.championRank;
  }

  all[idx] = p;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent('osn_participants_updated'));
  } catch (err) {
    console.error('Failed to save manual edit:', err);
  }

  return p;
}

/**
 * Sync participants with backend server automatically
 * Intelligently merges server and local data so newly submitted exams or local edits are never lost
 */
export async function syncParticipantsWithServer(): Promise<ParticipantRecord[]> {
  try {
    const res = await fetch('/api/participants');
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const local = getAllParticipants();
        const mergedMap = new Map<string, ParticipantRecord>();
        
        // Put server items in map
        json.data.forEach((serverP: ParticipantRecord) => {
          if (serverP.id) mergedMap.set(serverP.id, serverP);
        });

        // Smart merge with local
        local.forEach((localP: ParticipantRecord) => {
          const serverP = mergedMap.get(localP.id);
          if (!serverP) {
            mergedMap.set(localP.id, localP);
            fetch('/api/participants', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(localP)
            }).catch(() => {});
          } else {
            // Merge preserving whichever side has completed exam data
            const mergedItem: ParticipantRecord = {
              ...serverP,
              ...localP,
              simulatedExam: localP.simulatedExam || serverP.simulatedExam,
              penyisihanExam: localP.penyisihanExam || serverP.penyisihanExam,
              finalExam: localP.finalExam || serverP.finalExam,
              simulatedAttempts: Math.max(localP.simulatedAttempts || 0, serverP.simulatedAttempts || 0),
              penyisihanAttempts: Math.max(localP.penyisihanAttempts || 0, serverP.penyisihanAttempts || 0),
              finalAttempts: Math.max(localP.finalAttempts || 0, serverP.finalAttempts || 0),
              qualificationStatus: localP.qualificationStatus || serverP.qualificationStatus || 'pending',
              finalTicketPaymentStatus: localP.finalTicketPaymentStatus || serverP.finalTicketPaymentStatus || 'unpaid',
              championRank: localP.championRank || serverP.championRank
            };
            mergedMap.set(localP.id, mergedItem);

            // Sync back to server if local had exam results that server lacked
            if (
              (localP.simulatedExam && !serverP.simulatedExam) ||
              (localP.penyisihanExam && !serverP.penyisihanExam) ||
              (localP.finalExam && !serverP.finalExam)
            ) {
              fetch(`/api/participants/${localP.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mergedItem)
              }).catch(() => {});
            }
          }
        });

        const merged = Array.from(mergedMap.values());
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        window.dispatchEvent(new CustomEvent('osn_participants_updated'));
        return merged;
      }
    }
  } catch (err) {
    console.warn('Backend sync fallback to local storage:', err);
  }
  return getAllParticipants();
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
  if (data.level.includes('PAUD') || data.level.includes('TK') || data.level.includes('Kategori A')) catPrefix = 'A';
  else if (data.level.includes('SMP') || data.level.includes('MTs') || data.level.includes('Kategori C')) catPrefix = 'C';

  // Check if participant already exists by WhatsApp or Name
  const existingIndex = all.findIndex(p => 
    normalizePhone(p.whatsapp) === cleanPhone &&
    normalizeName(p.fullName) === normalizeName(cleanName)
  );

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const id = existingIndex >= 0 ? all[existingIndex].id : `OSN-2026-${catPrefix}-${randomNum}`;

  const record: ParticipantRecord = {
    ...(existingIndex >= 0 ? all[existingIndex] : {}),
    id,
    fullName: cleanName,
    level: data.level,
    schoolName: data.schoolName || '-',
    cityProvince: data.cityProvince || '-',
    whatsapp: data.whatsapp,
    email: data.email || '-',
    parentName: data.parentName || (existingIndex >= 0 ? all[existingIndex].parentName : '-'),
    fullAddress: data.fullAddress || (existingIndex >= 0 ? all[existingIndex].fullAddress : '-'),
    subjects: data.subjects && data.subjects.length > 0 ? data.subjects : ['Matematika'],
    registeredAt: existingIndex >= 0 ? all[existingIndex].registeredAt : new Date().toISOString(),
    cbtStatus: existingIndex >= 0 ? all[existingIndex].cbtStatus : "Aktif & Siap Ujian (Tercatat di Database)"
  };

  if (existingIndex >= 0) {
    all[existingIndex] = record;
  } else {
    all.unshift(record); // newest first
  }

  // Save immediately to localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Failed to persist participant:', err);
  }

  // Also sync to server database automatically
  try {
    const res = await fetch('/api/participants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
    if (res.ok) {
      const respData = await res.json();
      if (respData.data?.id) {
        record.id = respData.data.id;
      }
    }
  } catch {
    // network fallback
  }

  window.dispatchEvent(new CustomEvent('osn_participants_updated'));
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

export function findParticipantsByPhone(phoneNumber: string): ParticipantRecord[] {
  if (!phoneNumber) return [];
  const cleanP = normalizePhone(phoneNumber);
  if (!cleanP) return [];
  const all = getAllParticipants();
  return all.filter(p => normalizePhone(p.whatsapp) === cleanP);
}

export function findParticipant(searchQuery: string, phoneNumber?: string): ParticipantRecord | null {
  const all = getAllParticipants();
  const cleanQ = normalizeName(searchQuery);
  const cleanP = phoneNumber ? normalizePhone(phoneNumber) : '';

  // 1. Direct match by ID (e.g. OSN-2026-B-89102)
  const byId = all.find(p => p.id.toLowerCase() === searchQuery.trim().toLowerCase());
  if (byId) return byId;

  // 2. Match by exact Phone & Name
  if (cleanP && cleanQ) {
    const exact = all.find(p => 
      normalizePhone(p.whatsapp) === cleanP &&
      (normalizeName(p.fullName).includes(cleanQ) || cleanQ.includes(normalizeName(p.fullName)))
    );
    if (exact) return exact;
  }

  // 3. Match by phone alone if provided
  if (cleanP) {
    const byPhone = all.find(p => normalizePhone(p.whatsapp) === cleanP);
    if (byPhone) return byPhone;
  }

  // 4. Fuzzy match by name
  if (cleanQ.length >= 3) {
    const byName = all.find(p => 
      normalizeName(p.fullName).includes(cleanQ) || cleanQ.includes(normalizeName(p.fullName))
    );
    if (byName) return byName;
  }

  return null;
}

/**
 * SELECTION ALGORITHM:
 * Draws 20 unique, randomized questions from the question bank for each participant session.
 * Uses Math.random() Fisher-Yates shuffle correctly.
 * Stores the selected set in the participant's record to prevent duplicates across different user sessions.
 */
export function getOrGenerateParticipantExamQuestions(
  participantId: string,
  subject: string,
  stage: 'simulasi' | 'penyisihan' | 'final' = 'simulasi',
  forceRegenerate: boolean = false
): QuestionItem[] {
  const allParticipants = getAllParticipants();
  const idx = allParticipants.findIndex(p => p.id === participantId);
  const participant = idx >= 0 ? allParticipants[idx] : null;
  const examKey = `${stage}_${subject.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

  const allBankQuestions = getAllQuestions();

  // If already generated for this participant session and not forced refresh, return stored set
  if (!forceRegenerate && participant?.sessionQuestionIds?.[examKey]) {
    const storedIds = participant.sessionQuestionIds[examKey];
    const matched = storedIds
      .map(id => allBankQuestions.find(q => q.id === id))
      .filter((q): q is QuestionItem => !!q);
    if (matched.length >= 20) {
      return matched.slice(0, 20);
    }
  }

  // Draw 20 unique randomized questions from question bank matching category & subject
  const candidateQuestions = getFilteredQuestions({
    subject,
    stage,
    level: participant?.level,
    limit: 100, // get up to 100 questions from candidate pool
    randomize: false
  });

  // Fisher-Yates shuffle using Math.random()
  const pool = [...candidateQuestions];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const selected20 = pool.slice(0, 20);
  const selectedIds = selected20.map(q => q.id);

  // Store the selected set in the participant's record to prevent duplicates and keep sessions consistent
  if (participant) {
    if (!participant.sessionQuestionIds) {
      participant.sessionQuestionIds = {};
    }
    participant.sessionQuestionIds[examKey] = selectedIds;
    updateParticipantField(participant.id, {
      sessionQuestionIds: participant.sessionQuestionIds
    });
  }

  return selected20;
}

export function updateParticipantExamResult(
  participantId: string,
  examType: 'simulasi' | 'penyisihan' | 'final',
  result: {
    subject: string;
    score: number;
    totalQuestions: number;
    status: string;
    violationReason?: string;
  },
  meta?: {
    fullName?: string;
    whatsapp?: string;
    level?: string;
    schoolName?: string;
  }
): ParticipantRecord | null {
  const all = getAllParticipants();
  const cleanId = String(participantId || '').trim();
  let idx = all.findIndex(p => p.id === cleanId);
  if (idx === -1) {
    idx = all.findIndex(p => p.id?.trim().toLowerCase() === cleanId.toLowerCase());
  }
  if (idx === -1 && meta?.whatsapp) {
    const cleanW = meta.whatsapp.replace(/\D/g, '').replace(/^62/, '0');
    idx = all.findIndex(p => (p.whatsapp || '').replace(/\D/g, '').replace(/^62/, '0') === cleanW);
  }
  if (idx === -1 && meta?.fullName) {
    idx = all.findIndex(p => p.fullName?.trim().toLowerCase() === meta.fullName?.trim().toLowerCase());
  }
  if (idx === -1) {
    const placeholder: ParticipantRecord = {
      id: cleanId,
      fullName: meta?.fullName || 'Peserta CBT',
      level: meta?.level || 'SD / MI (Kategori B: Usia 7-12 Tahun)',
      schoolName: meta?.schoolName || '-',
      cityProvince: '-',
      whatsapp: meta?.whatsapp || '-',
      email: '-',
      subjects: [result.subject || 'Matematika'],
      registeredAt: new Date().toISOString(),
      cbtStatus: 'Ujian Selesai',
      qualificationStatus: 'pending',
      finalTicketPaymentStatus: 'unpaid'
    };
    all.unshift(placeholder);
    idx = 0;
  }

  const currentAttempts = examType === 'final'
    ? (all[idx].finalAttempts || 0) + 1
    : examType === 'penyisihan'
    ? (all[idx].penyisihanAttempts || 0) + 1
    : (all[idx].simulatedAttempts || 0) + 1;

  const examInfo: ExamResultInfo = {
    subject: result.subject,
    score: result.score,
    totalQuestions: result.totalQuestions,
    completedAt: new Date().toISOString(),
    status: result.status,
    violationReason: result.violationReason,
    attemptsCount: currentAttempts
  };

  const p = { ...all[idx] };
  if (examType === 'final') {
    p.finalExam = examInfo;
    p.finalAttempts = currentAttempts;
    p.cbtStatus = result.violationReason
      ? `Pelanggaran CBT Final: ${result.violationReason}`
      : `Selesai Ujian Final (${result.score}/100)`;
    if (result.score >= 90) p.championRank = 'Juara 1';
    else if (result.score >= 80) p.championRank = 'Juara 2';
    else if (result.score >= 70) p.championRank = 'Juara 3';
    else p.championRank = 'Peserta Final';
  } else if (examType === 'penyisihan') {
    p.penyisihanExam = examInfo;
    p.penyisihanAttempts = currentAttempts;
    p.cbtStatus = result.violationReason
      ? `Pelanggaran CBT Penyisihan: ${result.violationReason}`
      : `Selesai Babak Penyisihan (${result.score}/100)`;
    if (result.score >= 70) {
      p.qualificationStatus = 'lolos';
      p.qualificationNote = 'Lolos Otomatis Berdasarkan Nilai Babak Penyisihan (≥70)';
    } else {
      p.qualificationStatus = 'tidak_lolos';
      p.qualificationNote = 'Belum Memenuhi Passing Grade Babak Penyisihan (≥70)';
    }
  } else {
    // simulasi
    p.simulatedExam = examInfo;
    p.simulatedAttempts = currentAttempts;
    p.cbtStatus = result.violationReason
      ? `Pelanggaran CBT Simulasi: ${result.violationReason}`
      : `Selesai Simulasi CBT (${result.score}/100)`;
    if (!p.penyisihanExam && result.score >= 70) {
      p.qualificationStatus = 'lolos';
      p.qualificationNote = 'Lolos Evaluasi CBT (≥70)';
    }
  }

  if (result.violationReason) {
    p.violationReason = result.violationReason;
  }

  all[idx] = p;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Failed to update participant exam result:', err);
  }

  // Sync to server in background
  try {
    fetch(`/api/participants/${participantId}/exam`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        examType,
        subject: result.subject,
        score: result.score,
        totalQuestions: result.totalQuestions,
        completedAt: examInfo.completedAt,
        violationReason: result.violationReason
      })
    }).catch(() => {});
  } catch {}

  window.dispatchEvent(new CustomEvent('osn_participants_updated'));
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
    fetch(`/api/participants/${participantId}`, {
      method: 'DELETE'
    }).catch(() => {});
  } catch {}

  window.dispatchEvent(new CustomEvent('osn_participants_updated'));
  return true;
}

export function updateParticipantField(
  participantId: string,
  fields: Partial<ParticipantRecord>
): ParticipantRecord | null {
  const all = getAllParticipants();
  const idx = all.findIndex(p => p.id === participantId);
  if (idx === -1) return null;

  all[idx] = {
    ...all[idx],
    ...fields
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Failed to update participant field:', err);
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
  examType: 'simulasi' | 'penyisihan' | 'final' | 'all' = 'all',
  clearHistory: boolean = false
): ParticipantRecord | null {
  const all = getAllParticipants();
  const idx = all.findIndex(p => p.id === participantId);
  if (idx === -1) return null;

  const p = { ...all[idx] };
  p.violationReason = undefined;
  
  // Clear cached question IDs so that the participant gets a new randomized set of 20 questions
  if (p.sessionQuestionIds) {
    if (examType === 'all') {
      p.sessionQuestionIds = {};
    } else {
      const keys = Object.keys(p.sessionQuestionIds).filter(k => k.startsWith(examType));
      keys.forEach(k => delete p.sessionQuestionIds?.[k]);
    }
  }

  if (!examType || examType === 'all') {
    p.simulatedAttempts = 0;
    p.penyisihanAttempts = 0;
    p.finalAttempts = 0;
    p.cbtStatus = 'Aktif (Seluruh Kuota Ujian Direset 0/2)';
    if (clearHistory) {
      delete p.simulatedExam;
      delete p.penyisihanExam;
      delete p.finalExam;
      p.qualificationStatus = 'pending';
    }
  } else if (examType === 'simulasi') {
    p.simulatedAttempts = 0;
    p.cbtStatus = 'Aktif (Kuota Simulasi Direset 0/2)';
    if (clearHistory) {
      delete p.simulatedExam;
    }
  } else if (examType === 'penyisihan') {
    p.penyisihanAttempts = 0;
    p.cbtStatus = 'Aktif (Kuota Babak Penyisihan Direset 0/2)';
    if (clearHistory) {
      delete p.penyisihanExam;
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
  examType: 'simulasi' | 'penyisihan' | 'final' = 'simulasi'
): ParticipantRecord | null {
  const all = getAllParticipants();
  const idx = all.findIndex(p => p.id === participantId);
  if (idx === -1) return null;

  const p = { ...all[idx] };
  p.violationReason = undefined;
  if (examType === 'final') {
    p.finalAttempts = Math.max(0, (p.finalAttempts || 2) - 1);
    p.cbtStatus = `Aktif (+1 Kuota Tambahan Final, Terpakai: ${p.finalAttempts}/2)`;
  } else if (examType === 'penyisihan') {
    p.penyisihanAttempts = Math.max(0, (p.penyisihanAttempts || 2) - 1);
    p.cbtStatus = `Aktif (+1 Kuota Tambahan Penyisihan, Terpakai: ${p.penyisihanAttempts}/2)`;
  } else {
    p.simulatedAttempts = Math.max(0, (p.simulatedAttempts || 2) - 1);
    p.cbtStatus = `Aktif (+1 Kuota Tambahan Simulasi, Terpakai: ${p.simulatedAttempts}/2)`;
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
  examType: 'simulasi' | 'penyisihan' | 'final' | 'all' = 'all',
  clearHistory: boolean = false
): number {
  let count = 0;
  for (const id of participantIds) {
    const res = resetParticipantAttempts(id, examType, clearHistory);
    if (res) count++;
  }
  return count;
}
