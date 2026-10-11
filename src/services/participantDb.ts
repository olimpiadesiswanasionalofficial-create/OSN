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
  // Final Award / Certificate Champion Title (DITENTUKAN OLEH ADMIN, SISTEM HANYA MEMBERIKAN REKOMENDASI)
  championRank?: 'Juara 1' | 'Juara 2' | 'Juara 3' | 'Peserta Final' | 'Belum Dinilai' | 'Belum Ditetapkan' | string;
  recommendedChampionRank?: string;
  certificateIssuedDate?: string;
  // Stored randomized question sets for participant exam sessions (guarantees 20 unique randomized questions per session)
  sessionQuestionIds?: { [examKey: string]: string[] };
}

const STORAGE_KEY = 'osn_participants_database_2026';

import { INITIAL_PARTICIPANTS as SEED_PARTICIPANTS } from './participantSeedData';

// Stored participant database seed
export const INITIAL_PARTICIPANTS: ParticipantRecord[] = SEED_PARTICIPANTS;

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
    if (!raw) {
      if (INITIAL_PARTICIPANTS && INITIAL_PARTICIPANTS.length > 0) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PARTICIPANTS));
        } catch {}
        return INITIAL_PARTICIPANTS;
      }
      return [];
    }
    const parsed: ParticipantRecord[] = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    if (INITIAL_PARTICIPANTS && INITIAL_PARTICIPANTS.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PARTICIPANTS));
      } catch {}
      return INITIAL_PARTICIPANTS;
    }
    return [];
  } catch (err) {
    console.error('Failed to read participants database:', err);
    return INITIAL_PARTICIPANTS || [];
  }
}

/**
 * Hapus seluruh data peserta dan riwayat ujian secara permanen (Reset Total Database)
 */
export function clearAllParticipantsAndHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    safeDispatchParticipantsUpdated();
    if (typeof fetch !== 'undefined') {
      fetch('/api/participants/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }).catch(err => console.warn('Clear server sync error:', err));
    }
  } catch (err) {
    console.error('Failed to clear participants and history:', err);
  }
}

/**
 * Safely dispatch participant updated event asynchronously to prevent updating
 * a component during rendering of another component
 */
export function safeDispatchParticipantsUpdated(): void {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      try {
        window.dispatchEvent(new CustomEvent('osn_participants_updated'));
      } catch {}
    }, 0);
  }
}

/**
 * Simpan seluruh daftar peserta hasil batch edit / modifikasi massal
 */
export function saveAllParticipants(updated: ParticipantRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    safeDispatchParticipantsUpdated();
    // Background sync to server so server file data/participants.json stays 100% synchronized
    if (typeof fetch !== 'undefined') {
      fetch('/api/participants/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participants: updated })
      }).catch(err => console.warn('Background sync to server:', err));
    }
  } catch (err) {
    console.error('Failed to save all participants:', err);
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

  saveAllParticipants(updated);
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

  saveAllParticipants(updated);
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
  saveAllParticipants(all);
  return p;
}

/**
 * Sync participants with hosting server & Neon PostgreSQL database
 * Prioritizes server database as authoritative source of truth
 */
export async function syncParticipantsWithServer(): Promise<ParticipantRecord[]> {
  try {
    const res = await fetch(`/api/participants?_t=${Date.now()}`, {
      headers: { 'Cache-Control': 'no-cache' },
      cache: 'no-store'
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const serverData: ParticipantRecord[] = json.data;
        const local = getAllParticipants();

        // Intelligent bidirectional merge: keep all participants, preserve completed exams & latest status
        const mergedMap = new Map<string, ParticipantRecord>();

        // 1. Local records first
        for (const p of local) {
          if (p.id) mergedMap.set(p.id, p);
        }

        // 2. Merge server records
        for (const s of serverData) {
          if (!s.id) continue;
          const loc = mergedMap.get(s.id);
          if (!loc) {
            mergedMap.set(s.id, s);
          } else {
            mergedMap.set(s.id, {
              ...loc,
              ...s,
              simulatedExam: s.simulatedExam || loc.simulatedExam,
              penyisihanExam: s.penyisihanExam || loc.penyisihanExam,
              finalExam: s.finalExam || loc.finalExam,
              finalTicketPaymentStatus: s.finalTicketPaymentStatus || loc.finalTicketPaymentStatus,
              violationReason: s.violationReason ?? loc.violationReason,
              cbtStatus: s.cbtStatus || loc.cbtStatus,
              qualificationStatus: s.qualificationStatus && s.qualificationStatus !== 'pending' ? s.qualificationStatus : (loc.qualificationStatus || s.qualificationStatus),
              simulatedAttempts: Math.max(s.simulatedAttempts || 0, loc.simulatedAttempts || 0),
              penyisihanAttempts: Math.max(s.penyisihanAttempts || 0, loc.penyisihanAttempts || 0),
              finalAttempts: Math.max(s.finalAttempts || 0, loc.finalAttempts || 0),
            });
          }
        }

        // Push any local-only records to server in background
        const serverIdSet = new Set(serverData.map(p => p.id));
        const unsavedLocal = local.filter(l => l.id && !serverIdSet.has(l.id));
        if (unsavedLocal.length > 0) {
          fetch('/api/participants/bulk', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ participants: unsavedLocal })
          }).catch(() => {});
        }

        const mergedList = Array.from(mergedMap.values());
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedList));
        safeDispatchParticipantsUpdated();
        return mergedList;
      } else if (json.success && Array.isArray(json.data) && json.data.length === 0) {
        // Server database is empty -> push local seed participants to populate server!
        const local = getAllParticipants();
        if (local.length > 0) {
          fetch('/api/participants/bulk', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ participants: local })
          }).catch(() => {});
        }
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

  safeDispatchParticipantsUpdated();
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
  if (participant && idx >= 0) {
    if (!participant.sessionQuestionIds) {
      participant.sessionQuestionIds = {};
    }
    participant.sessionQuestionIds[examKey] = selectedIds;
    allParticipants[idx] = { ...participant };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allParticipants));
    } catch {}
    try {
      fetch(`/api/participants/${participant.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionQuestionIds: participant.sessionQuestionIds })
      }).catch(() => {});
    } catch {}
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
    durationText?: string;
    durationSeconds?: number;
    completedAt?: string;
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
    completedAt: result.completedAt || new Date().toISOString(),
    durationText: result.durationText || '20 Menit',
    durationSeconds: result.durationSeconds || 1200,
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
    
    // PERMINTAAN USER: Juara dan pemenang maupun medali jangan ditentukan otomatis oleh sistem.
    // Ditentukan oleh admin (sistem hanya memberikan rekomendasi siapa juara dan pemenang maupun medali).
    if (result.score >= 90) p.recommendedChampionRank = 'Juara 1';
    else if (result.score >= 80) p.recommendedChampionRank = 'Juara 2';
    else if (result.score >= 70) p.recommendedChampionRank = 'Juara 3';
    else p.recommendedChampionRank = 'Peserta Final';

    // Jika belum pernah ditentukan oleh admin, status awal adalah Belum Ditetapkan (Menunggu Admin)
    if (!p.championRank || p.championRank === 'Belum Dinilai' || p.championRank === 'Belum Ditetapkan') {
      p.championRank = 'Belum Ditetapkan';
    }
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
        durationText: examInfo.durationText,
        durationSeconds: examInfo.durationSeconds,
        violationReason: result.violationReason,
        fullName: meta?.fullName || p.fullName,
        whatsapp: meta?.whatsapp || p.whatsapp,
        level: meta?.level || p.level,
        schoolName: meta?.schoolName || p.schoolName
      })
    }).catch(() => {});
  } catch {}

  safeDispatchParticipantsUpdated();
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

  safeDispatchParticipantsUpdated();
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
    fetch(`/api/participants/${encodeURIComponent(participantId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    }).catch(() => {});
  } catch {}

  safeDispatchParticipantsUpdated();
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
    p.cbtStatus = 'Aktif (Seluruh Kuota Ujian Direset: Simulasi Unlimited, Resmi 0/1)';
    if (clearHistory) {
      delete p.simulatedExam;
      delete p.penyisihanExam;
      delete p.finalExam;
      p.qualificationStatus = 'pending';
    }
  } else if (examType === 'simulasi') {
    p.simulatedAttempts = 0;
    p.cbtStatus = 'Aktif (Kuota Simulasi Unlimited)';
    if (clearHistory) {
      delete p.simulatedExam;
    }
  } else if (examType === 'penyisihan') {
    p.penyisihanAttempts = 0;
    p.cbtStatus = 'Aktif (Kuota Babak Penyisihan Direset 0/1)';
    if (clearHistory) {
      delete p.penyisihanExam;
      p.qualificationStatus = 'pending';
    }
  } else if (examType === 'final') {
    p.finalAttempts = 0;
    p.cbtStatus = 'Aktif (Kuota Final Direset 0/1)';
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
    fetch(`/api/participants/${encodeURIComponent(participantId)}/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ examType, clearHistory })
    }).catch(() => {});
    fetch(`/api/participants/${encodeURIComponent(participantId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ violationReason: null, cbtStatus: p.cbtStatus })
    }).catch(() => {});
  } catch {}

  safeDispatchParticipantsUpdated();
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

  safeDispatchParticipantsUpdated();
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
