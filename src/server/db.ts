import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const { Pool } = pg;

// Normalizes Neon connection string to ensure valid DNS hostname
export function normalizeConnectionString(rawUrl?: string): string {
  let url = rawUrl || process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL_UNPOOLED;
  
  if (!url) {
    // If not set, use the provided production credentials
    const host = process.env.PGHOST || 'ep-frosty-bird-aw35nhlz-pooler.c-12.us-east-1.aws.neon.tech';
    const user = process.env.PGUSER || 'neondb_owner';
    const pass = process.env.PGPASSWORD || 'npg_xjSyiMqW23Pm';
    const db = process.env.PGDATABASE || 'neondb';
    url = `postgresql://${user}:${pass}@${host}/${db}?sslmode=require`;
  }

  // Fix typo in hostname if user passed us-east-aws instead of us-east-1.aws
  if (url.includes('us-east-aws.neon.tech')) {
    url = url.replace('us-east-aws.neon.tech', 'us-east-1.aws.neon.tech');
  }

  return url;
}

export const VERCEL_WEBHOOK_URL =
  process.env.VERCEL_WEBHOOK_URL || 'https://connect.vercel.com/trigger/scl_73yUAYJiNJUPyT7UQZ0iA';

let pool: pg.Pool | null = null;
let schemaInitialized = false;
let isNeonQuotaExceeded = false;

export function isQuotaError(err: any): boolean {
  if (!err) return false;
  const msg = (err.message || err.toString() || '').toLowerCase();
  return msg.includes('quota') || msg.includes('exceeded') || msg.includes('limit');
}

export function getDbPool(): pg.Pool {
  if (!pool) {
    const connStr = normalizeConnectionString();
    pool = new Pool({
      connectionString: connStr,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 8000,
    });

    pool.on('error', (err) => {
      if (isQuotaError(err)) {
        isNeonQuotaExceeded = true;
        return;
      }
      console.warn('Neon PostgreSQL idle client note:', err.message);
    });
  }
  return pool;
}

/**
 * Automatically creates all tables in Neon PostgreSQL if not already created
 */
export async function ensureDbSchema(): Promise<void> {
  if (schemaInitialized || isNeonQuotaExceeded) return;
  const p = getDbPool();
  try {
    await p.query(`
      CREATE TABLE IF NOT EXISTS participants (
        id VARCHAR(100) PRIMARY KEY,
        full_name TEXT NOT NULL,
        level TEXT,
        school_name TEXT,
        city_province TEXT,
        whatsapp VARCHAR(50),
        email TEXT,
        parent_name TEXT,
        full_address TEXT,
        subjects JSONB,
        registered_at TIMESTAMPTZ,
        cbt_status TEXT,
        simulated_exam JSONB,
        penyisihan_exam JSONB,
        final_exam JSONB,
        simulated_attempts INT DEFAULT 0,
        penyisihan_attempts INT DEFAULT 0,
        final_attempts INT DEFAULT 0,
        qualification_status TEXT DEFAULT 'pending',
        qualification_note TEXT,
        final_ticket_payment_status TEXT DEFAULT 'unpaid',
        final_ticket_paid_at TIMESTAMPTZ,
        final_ticket_amount NUMERIC,
        champion_rank TEXT,
        recommended_champion_rank TEXT,
        certificate_issued_date TEXT,
        session_question_ids JSONB,
        violation_reason TEXT,
        violation_timestamp TIMESTAMPTZ,
        data JSONB,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      ALTER TABLE participants ADD COLUMN IF NOT EXISTS violation_reason TEXT;
      ALTER TABLE participants ADD COLUMN IF NOT EXISTS violation_timestamp TIMESTAMPTZ;
      ALTER TABLE participants ADD COLUMN IF NOT EXISTS is_closing BOOLEAN DEFAULT FALSE;

      -- Gatekeeper function: validates closing status before allowing final round access
      CREATE OR REPLACE FUNCTION check_participant_final_access(p_id VARCHAR)
      RETURNS BOOLEAN AS $$
      DECLARE
        flag_closing BOOLEAN;
        ticket_stat TEXT;
      BEGIN
        SELECT is_closing, final_ticket_payment_status INTO flag_closing, ticket_stat
        FROM participants WHERE id = p_id;
        IF flag_closing = TRUE OR ticket_stat = 'paid_closing' THEN
          RETURN TRUE;
        ELSE
          RETURN FALSE;
        END IF;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TABLE IF NOT EXISTS cbt_questions (
        id VARCHAR(100) PRIMARY KEY,
        subject TEXT,
        level TEXT,
        question TEXT,
        options JSONB,
        correct_answer INT,
        explanation TEXT,
        image_url TEXT,
        data JSONB,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS schedule_config (
        key VARCHAR(100) PRIMARY KEY,
        value JSONB,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS webhook_logs (
        id SERIAL PRIMARY KEY,
        event_type TEXT,
        payload JSONB,
        status TEXT,
        response TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    schemaInitialized = true;
  } catch (err: any) {
    if (isQuotaError(err)) {
      isNeonQuotaExceeded = true;
      console.warn('[Neon PostgreSQL] Quota exceeded on remote database. Running in high-availability local database mode.');
      return;
    }
    console.warn('Neon DB schema initialization note:', err.message);
  }
}

/**
 * Post webhook event to Vercel Connect trigger:
 * https://connect.vercel.com/trigger/scl_73yUAYJiNJUPyT7UQZ0iA
 */
export async function postVercelWebhook(eventType: string, payload: any): Promise<void> {
  const p = getDbPool();
  const eventData = {
    event: eventType,
    timestamp: new Date().toISOString(),
    domain: 'https://osn-one.vercel.app',
    data: payload,
  };

  try {
    let resStatus = 'attempted';
    let resBody = '';

    try {
      const res = await fetch(VERCEL_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'OSN-Neon-Sync/1.0',
        },
        body: JSON.stringify(eventData),
      });
      resStatus = `${res.status} ${res.statusText}`;
      resBody = await res.text();
    } catch (fetchErr: any) {
      resStatus = `error: ${fetchErr.message}`;
    }

    // Record webhook event in PostgreSQL
    await p.query(
      `INSERT INTO webhook_logs (event_type, payload, status, response) VALUES ($1, $2, $3, $4)`,
      [eventType, JSON.stringify(eventData), resStatus, resBody.slice(0, 1000)]
    );
  } catch (err: any) {
    console.warn('Webhook logging warning:', err.message);
  }
}

/**
 * Convert a DB row back to ParticipantRecord format
 */
function rowToParticipant(row: any): any {
  const base = row.data && typeof row.data === 'object' ? row.data : {};
  return {
    ...base,
    id: row.id,
    fullName: row.full_name,
    level: row.level,
    schoolName: row.school_name,
    cityProvince: row.city_province,
    whatsapp: row.whatsapp,
    email: row.email,
    parentName: row.parent_name,
    fullAddress: row.full_address,
    subjects: row.subjects || base.subjects || ['Matematika'],
    registeredAt: row.registered_at ? new Date(row.registered_at).toISOString() : base.registeredAt,
    cbtStatus: row.cbt_status || base.cbtStatus || 'Aktif & Siap Ujian',
    simulatedExam: row.simulated_exam || base.simulatedExam,
    penyisihanExam: row.penyisihan_exam || base.penyisihanExam,
    finalExam: row.final_exam || base.finalExam,
    simulatedAttempts: row.simulated_attempts ?? base.simulatedAttempts ?? 0,
    penyisihanAttempts: row.penyisihan_attempts ?? base.penyisihanAttempts ?? 0,
    finalAttempts: row.final_attempts ?? base.finalAttempts ?? 0,
    qualificationStatus: row.qualification_status || base.qualificationStatus || 'pending',
    qualificationNote: row.qualification_note || base.qualificationNote,
    finalTicketPaymentStatus: row.final_ticket_payment_status || base.finalTicketPaymentStatus || 'unpaid',
    finalTicketPaidAt: row.final_ticket_paid_at ? new Date(row.final_ticket_paid_at).toISOString() : base.finalTicketPaidAt,
    finalTicketAmount: row.final_ticket_amount ? Number(row.final_ticket_amount) : base.finalTicketAmount,
    championRank: row.champion_rank || base.championRank,
    recommendedChampionRank: row.recommended_champion_rank || base.recommendedChampionRank,
    certificateIssuedDate: row.certificate_issued_date || base.certificateIssuedDate,
    sessionQuestionIds: row.session_question_ids || base.sessionQuestionIds,
    violationReason: row.violation_reason || base.violationReason || row.final_exam?.violationReason || row.penyisihan_exam?.violationReason || undefined,
    isClosing: row.is_closing !== null && row.is_closing !== undefined
      ? Boolean(row.is_closing)
      : Boolean(row.final_ticket_payment_status === 'paid_closing' || base.isClosing),
  };
}

/**
 * Read all participants from Neon PostgreSQL (with guaranteed local JSON fallback)
 */
export async function getAllParticipantsFromDb(): Promise<any[]> {
  if (isNeonQuotaExceeded) {
    return readLocalJsonParticipants();
  }
  try {
    await ensureDbSchema();
    if (isNeonQuotaExceeded) return readLocalJsonParticipants();
    const p = getDbPool();
    const res = await p.query(`
      SELECT * FROM participants 
      ORDER BY updated_at DESC, registered_at DESC
    `);
    if (res.rows && res.rows.length > 0) {
      const list = res.rows.map(rowToParticipant);
      // Keep local JSON synced with latest DB state
      saveLocalJsonParticipantsBulk(list);
      return list;
    }
    // If Neon database has 0 rows, fallback to local JSON file
    return readLocalJsonParticipants();
  } catch (err: any) {
    if (isQuotaError(err)) {
      isNeonQuotaExceeded = true;
      console.warn('[Neon PostgreSQL] Quota exceeded on participants query. Seamlessly serving from local participants database.');
    } else {
      console.warn('Neon PostgreSQL query notice:', err.message);
    }
    return readLocalJsonParticipants();
  }
}

/**
 * Save / Upsert a single participant record in Neon PostgreSQL & local JSON
 */
export async function saveParticipantToDb(record: any): Promise<any> {
  const id = record.id || `OSN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const fullName = String(record.fullName || '').trim();
  const level = record.level || 'SD / MI (Kategori B: Usia 7-12 Tahun)';
  const schoolName = record.schoolName || '-';
  const cityProvince = record.cityProvince || '-';
  const whatsapp = String(record.whatsapp || '').trim();
  const email = record.email || '-';
  const parentName = record.parentName || '-';
  const fullAddress = record.fullAddress || '-';
  const subjects = JSON.stringify(Array.isArray(record.subjects) && record.subjects.length > 0 ? record.subjects : ['Matematika']);
  const registeredAt = record.registeredAt ? new Date(record.registeredAt).toISOString() : new Date().toISOString();
  const cbtStatus = record.cbtStatus || 'Aktif & Siap Ujian (Tercatat di Database)';
  const simulatedExam = record.simulatedExam ? JSON.stringify(record.simulatedExam) : null;
  const penyisihanExam = record.penyisihanExam ? JSON.stringify(record.penyisihanExam) : null;
  const finalExam = record.finalExam ? JSON.stringify(record.finalExam) : null;
  const simulatedAttempts = record.simulatedAttempts || 0;
  const penyisihanAttempts = record.penyisihanAttempts || 0;
  const finalAttempts = record.finalAttempts || 0;
  const qualificationStatus = record.qualificationStatus || 'pending';
  const qualificationNote = record.qualificationNote || null;
  const finalTicketPaymentStatus = record.finalTicketPaymentStatus || 'unpaid';
  const isClosing = Boolean(record.isClosing || record.finalTicketPaymentStatus === 'paid_closing');
  const finalTicketPaidAt = record.finalTicketPaidAt ? new Date(record.finalTicketPaidAt).toISOString() : null;
  const finalTicketAmount = record.finalTicketAmount || null;
  const championRank = record.championRank || null;
  const recommendedChampionRank = record.recommendedChampionRank || null;
  const certificateIssuedDate = record.certificateIssuedDate || null;
  const sessionQuestionIds = record.sessionQuestionIds ? JSON.stringify(record.sessionQuestionIds) : null;
  const violationReason = record.violationReason || null;

  const fullRecord = { ...record, id, fullName, whatsapp, registeredAt, isClosing };

  // Guaranteed immediate local save for real-time synchronization across all profiles
  saveLocalJsonParticipant(fullRecord);

  if (!isNeonQuotaExceeded) {
    try {
      await ensureDbSchema();
      if (!isNeonQuotaExceeded) {
        const p = getDbPool();
        const query = `
          INSERT INTO participants (
            id, full_name, level, school_name, city_province, whatsapp, email,
            parent_name, full_address, subjects, registered_at, cbt_status,
            simulated_exam, penyisihan_exam, final_exam,
            simulated_attempts, penyisihan_attempts, final_attempts,
            qualification_status, qualification_note, final_ticket_payment_status,
            final_ticket_paid_at, final_ticket_amount, champion_rank,
            recommended_champion_rank, certificate_issued_date, session_question_ids,
            violation_reason, is_closing, data, updated_at
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7,
            $8, $9, $10, $11, $12,
            $13, $14, $15,
            $16, $17, $18,
            $19, $20, $21,
            $22, $23, $24,
            $25, $26, $27,
            $28, $29, $30, NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            full_name = EXCLUDED.full_name,
            level = COALESCE(EXCLUDED.level, participants.level),
            school_name = COALESCE(NULLIF(EXCLUDED.school_name, '-'), participants.school_name, EXCLUDED.school_name),
            city_province = COALESCE(NULLIF(EXCLUDED.city_province, '-'), participants.city_province, EXCLUDED.city_province),
            whatsapp = COALESCE(NULLIF(EXCLUDED.whatsapp, ''), participants.whatsapp, EXCLUDED.whatsapp),
            email = COALESCE(NULLIF(EXCLUDED.email, '-'), participants.email, EXCLUDED.email),
            parent_name = COALESCE(NULLIF(EXCLUDED.parent_name, '-'), participants.parent_name, EXCLUDED.parent_name),
            full_address = COALESCE(NULLIF(EXCLUDED.full_address, '-'), participants.full_address, EXCLUDED.full_address),
            subjects = COALESCE(EXCLUDED.subjects, participants.subjects),
            cbt_status = COALESCE(EXCLUDED.cbt_status, participants.cbt_status),
            simulated_exam = COALESCE(EXCLUDED.simulated_exam, participants.simulated_exam),
            penyisihan_exam = COALESCE(EXCLUDED.penyisihan_exam, participants.penyisihan_exam),
            final_exam = COALESCE(EXCLUDED.final_exam, participants.final_exam),
            simulated_attempts = GREATEST(COALESCE(EXCLUDED.simulated_attempts, 0), COALESCE(participants.simulated_attempts, 0)),
            penyisihan_attempts = GREATEST(COALESCE(EXCLUDED.penyisihan_attempts, 0), COALESCE(participants.penyisihan_attempts, 0)),
            final_attempts = COALESCE(EXCLUDED.final_attempts, participants.final_attempts, 0),
            qualification_status = COALESCE(EXCLUDED.qualification_status, participants.qualification_status),
            qualification_note = COALESCE(EXCLUDED.qualification_note, participants.qualification_note),
            final_ticket_payment_status = COALESCE(EXCLUDED.final_ticket_payment_status, participants.final_ticket_payment_status),
            is_closing = COALESCE(EXCLUDED.is_closing, participants.is_closing, FALSE),
            final_ticket_paid_at = EXCLUDED.final_ticket_paid_at,
            final_ticket_amount = COALESCE(EXCLUDED.final_ticket_amount, participants.final_ticket_amount),
            champion_rank = COALESCE(EXCLUDED.champion_rank, participants.champion_rank),
            recommended_champion_rank = EXCLUDED.recommended_champion_rank,
            certificate_issued_date = COALESCE(EXCLUDED.certificate_issued_date, participants.certificate_issued_date),
            session_question_ids = COALESCE(EXCLUDED.session_question_ids, participants.session_question_ids),
            violation_reason = COALESCE(EXCLUDED.violation_reason, participants.violation_reason),
            data = COALESCE(EXCLUDED.data, participants.data),
            updated_at = NOW()
          RETURNING *;
        `;

        const res = await p.query(query, [
          id, fullName, level, schoolName, cityProvince, whatsapp, email,
          parentName, fullAddress, subjects, registeredAt, cbtStatus,
          simulatedExam, penyisihanExam, finalExam,
          simulatedAttempts, penyisihanAttempts, finalAttempts,
          qualificationStatus, qualificationNote, finalTicketPaymentStatus,
          finalTicketPaidAt, finalTicketAmount, championRank,
          recommendedChampionRank, certificateIssuedDate, sessionQuestionIds,
          violationReason,
          isClosing,
          JSON.stringify(fullRecord)
        ]);

        postVercelWebhook('participant.saved', { id, fullName, whatsapp }).catch(() => {});
        return rowToParticipant(res.rows[0]);
      }
    } catch (err: any) {
      if (isQuotaError(err)) {
        isNeonQuotaExceeded = true;
        console.warn('[Neon PostgreSQL] Quota exceeded while saving participant. Safely stored in local persistence.');
      } else {
        console.warn('Neon save participant note:', err.message);
      }
    }
  }

  return fullRecord;
}

/**
 * Bulk save / upsert participants into Neon PostgreSQL
 */
export async function bulkSaveParticipantsToDb(records: any[]): Promise<{ inserted: number; updated: number; total: number }> {
  try {
    await ensureDbSchema();
  } catch {}

  let inserted = 0;
  let updated = 0;

  for (const item of records) {
    if (!item.fullName) continue;
    try {
      await saveParticipantToDb(item);
      inserted++;
    } catch (e) {
      saveLocalJsonParticipant(item);
      inserted++;
    }
  }

  // Also ensure local JSON file has all records merged
  saveLocalJsonParticipantsBulk(records);

  // Count total
  let total = inserted;
  try {
    const p = getDbPool();
    const countRes = await p.query('SELECT COUNT(*) FROM participants');
    total = parseInt(countRes.rows[0].count, 10);
  } catch {
    total = readLocalJsonParticipants().length;
  }

  // Post bulk webhook event
  postVercelWebhook('participants.bulk_sync', { count: records.length, total }).catch(() => {});

  return { inserted, updated, total };
}

/**
 * Patch / update partial fields of a participant in Neon PostgreSQL
 */
export async function patchParticipantInDb(id: string, updates: any): Promise<any> {
  const cleanId = String(id || updates?.id || '').trim();
  if (!cleanId) throw new Error('ID peserta wajib diisi.');

  let existing: any = null;
  try {
    await ensureDbSchema();
    const p = getDbPool();
    const res = await p.query(`SELECT * FROM participants WHERE id = $1`, [cleanId]);
    if (res.rows.length > 0) {
      existing = rowToParticipant(res.rows[0]);
    }
  } catch (err) {}

  if (!existing) {
    const local = readLocalJsonParticipants().find(x => x.id === cleanId);
    existing = local || {
      id: cleanId,
      fullName: updates.fullName || 'Peserta OSN',
      whatsapp: updates.whatsapp || '-',
      registeredAt: new Date().toISOString(),
      cbtStatus: 'Aktif di Database'
    };
  }

  const nextIsClosing = updates.isClosing !== undefined
    ? Boolean(updates.isClosing)
    : (updates.finalTicketPaymentStatus !== undefined
        ? (updates.finalTicketPaymentStatus === 'paid_closing')
        : existing.isClosing);

  const nextPaymentStatus = updates.finalTicketPaymentStatus !== undefined
    ? updates.finalTicketPaymentStatus
    : (updates.isClosing !== undefined
        ? (updates.isClosing ? 'paid_closing' : 'unpaid')
        : existing.finalTicketPaymentStatus);

  const merged = {
    ...existing,
    ...updates,
    id: cleanId,
    // Safeguard: preserve existing exam results for simulasi & penyisihan
    simulatedExam: updates.simulatedExam !== undefined ? updates.simulatedExam : existing.simulatedExam,
    penyisihanExam: updates.penyisihanExam !== undefined ? updates.penyisihanExam : existing.penyisihanExam,
    finalExam: updates.finalExam !== undefined ? updates.finalExam : existing.finalExam,
    finalAttempts: updates.finalAttempts !== undefined ? updates.finalAttempts : existing.finalAttempts,
    isClosing: nextIsClosing,
    finalTicketPaymentStatus: nextPaymentStatus,
    qualificationStatus: updates.qualificationStatus !== undefined ? updates.qualificationStatus : existing.qualificationStatus,
    championRank: updates.championRank !== undefined ? updates.championRank : existing.championRank,
  };
  return await saveParticipantToDb(merged);
}

/**
 * Server-side gatekeeper function in the database schema that checks the 'isClosing' flag
 * for participants before returning the final round exam access, ensuring only users marked
 * as closed can see the final round materials.
 */
export async function verifyFinalRoundExamAccess(participantId: string): Promise<{
  allowed: boolean;
  isClosing: boolean;
  participant?: any;
  reason?: string;
}> {
  const cleanId = String(participantId || '').trim();
  if (!cleanId) {
    return {
      allowed: false,
      isClosing: false,
      reason: 'ID Peserta tidak valid.',
    };
  }

  // 1. Try PostgreSQL database schema gatekeeper
  if (!isNeonQuotaExceeded) {
    try {
      await ensureDbSchema();
      if (!isNeonQuotaExceeded) {
        const p = getDbPool();
        const res = await p.query(
          `SELECT id, full_name, level, qualification_status, final_ticket_payment_status, is_closing
           FROM participants WHERE id = $1`,
          [cleanId]
        );
        if (res.rows.length > 0) {
          const row = res.rows[0];
          const isClosed = Boolean(row.is_closing === true || row.final_ticket_payment_status === 'paid_closing');
          if (isClosed) {
            return {
              allowed: true,
              isClosing: true,
              participant: rowToParticipant(row),
            };
          } else {
            return {
              allowed: false,
              isClosing: false,
              participant: rowToParticipant(row),
              reason: 'Akses Ujian Babak Final dikunci. Hanya peserta yang telah diverifikasi Closing (Tiket Final Lunas) yang dapat mengakses materi ini.',
            };
          }
        }
      }
    } catch (err: any) {
      if (isQuotaError(err)) isNeonQuotaExceeded = true;
    }
  }

  // 2. Local replica fallback
  const localList = readLocalJsonParticipants();
  const participant = localList.find((p: any) => p.id === cleanId);
  if (!participant) {
    return {
      allowed: false,
      isClosing: false,
      reason: `Peserta dengan ID ${cleanId} tidak ditemukan di database.`,
    };
  }

  const isClosed = Boolean(participant.isClosing || participant.finalTicketPaymentStatus === 'paid_closing');
  if (isClosed) {
    return {
      allowed: true,
      isClosing: true,
      participant,
    };
  }

  return {
    allowed: false,
    isClosing: false,
    participant,
    reason: 'Akses Ujian Babak Final dikunci. Hanya peserta yang telah diverifikasi Closing (Tiket Final Lunas) yang dapat mengakses materi ini.',
  };
}

/**
 * Reset participant attempts and clear violations
 */
export async function resetParticipantInDb(
  participantId: string,
  examType: string = 'all',
  clearHistory: boolean = false
): Promise<any> {
  const cleanId = String(participantId).trim();
  let current: any = null;
  try {
    await ensureDbSchema();
    const p = getDbPool();
    const res = await p.query(`SELECT * FROM participants WHERE id = $1`, [cleanId]);
    if (res.rows.length > 0) {
      current = rowToParticipant(res.rows[0]);
    }
  } catch (err) {}

  if (!current) {
    const local = readLocalJsonParticipants().find(x => x.id === cleanId);
    if (local) current = { ...local };
  }
  if (!current) return null;

  delete current.violationReason;

  if (!examType || examType === 'all') {
    current.simulatedAttempts = 0;
    current.penyisihanAttempts = 0;
    current.finalAttempts = 0;
    current.cbtStatus = 'Aktif (Seluruh Kuota Ujian Direset: Bebas Pengerjaan)';
    if (clearHistory) {
      delete current.simulatedExam;
      delete current.penyisihanExam;
      delete current.finalExam;
      current.qualificationStatus = 'pending';
    }
  } else if (examType === 'simulasi') {
    current.simulatedAttempts = 0;
    current.cbtStatus = 'Aktif (Simulasi Bebas Pengerjaan)';
    if (clearHistory) delete current.simulatedExam;
  } else if (examType === 'penyisihan') {
    current.penyisihanAttempts = 0;
    current.cbtStatus = 'Aktif (Penyisihan Direset)';
    if (clearHistory) {
      delete current.penyisihanExam;
      current.qualificationStatus = 'pending';
    }
  } else if (examType === 'final') {
    current.finalAttempts = 0;
    current.cbtStatus = 'Aktif (Final Direset)';
    if (clearHistory) delete current.finalExam;
  }

  return await saveParticipantToDb(current);
}

/**
 * Record an exam submission in Neon PostgreSQL
 */
export async function recordExamInDb(
  participantId: string,
  examType: 'simulasi' | 'penyisihan' | 'final',
  examResult: any,
  additionalUpdates?: any
): Promise<any> {
  const column = examType === 'simulasi' ? 'simulated_exam' : examType === 'penyisihan' ? 'penyisihan_exam' : 'final_exam';
  const attemptsCol = examType === 'simulasi' ? 'simulated_attempts' : examType === 'penyisihan' ? 'penyisihan_attempts' : 'final_attempts';

  let existingRow: any = null;
  try {
    await ensureDbSchema();
    const p = getDbPool();
    const res = await p.query(`SELECT * FROM participants WHERE id = $1`, [participantId]);
    if (res.rows.length > 0) {
      existingRow = res.rows[0];
    }
  } catch (err) {}

  if (!existingRow) {
    const local = readLocalJsonParticipants().find(x => x.id === participantId);
    if (local) {
      existingRow = {
        id: local.id,
        full_name: local.fullName,
        cbt_status: local.cbtStatus,
        qualification_status: local.qualificationStatus,
        qualification_note: local.qualificationNote,
        champion_rank: local.championRank,
        simulated_attempts: local.simulatedAttempts || 0,
        penyisihan_attempts: local.penyisihanAttempts || 0,
        final_attempts: local.finalAttempts || 0,
        data: local
      };
    } else {
      existingRow = {
        id: participantId,
        full_name: 'Peserta CBT',
        cbt_status: 'Aktif',
        qualification_status: 'pending',
        qualification_note: null,
        champion_rank: null,
        simulated_attempts: 0,
        penyisihan_attempts: 0,
        final_attempts: 0,
        data: {}
      };
    }
  }

  const currentAttempts = (existingRow[attemptsCol] || 0) + 1;

  let newCbtStatus = existingRow.cbt_status;
  let newQualStatus = existingRow.qualification_status;
  let newQualNote = existingRow.qualification_note;
  let newRank = existingRow.champion_rank;

  if (examType === 'simulasi') {
    newCbtStatus = 'Selesai Simulasi (Siap Babak Penyisihan)';
  } else if (examType === 'penyisihan') {
    if (examResult.score >= 60) {
      newCbtStatus = 'Selesai Babak Penyisihan (Lolos ke Babak Final)';
      newQualStatus = 'lolos';
      newQualNote = 'Dinyatakan Lolos ke Babak Final';
    } else {
      newCbtStatus = 'Selesai Babak Penyisihan';
    }
  } else if (examType === 'final') {
    newCbtStatus = 'Selesai Babak Final (Menunggu Pengumuman Juara)';
    if (examResult.score >= 95) newRank = 'Juara 1';
    else if (examResult.score >= 90) newRank = 'Juara 2';
    else if (examResult.score >= 80) newRank = 'Juara 3';
    else newRank = 'Peserta Final';
  }

  if (additionalUpdates?.cbtStatus) newCbtStatus = additionalUpdates.cbtStatus;
  if (additionalUpdates?.qualificationStatus) newQualStatus = additionalUpdates.qualificationStatus;
  if (additionalUpdates?.championRank) newRank = additionalUpdates.championRank;

  const baseData = existingRow.data && typeof existingRow.data === 'object' ? existingRow.data : {};
  const mergedData: any = {
    ...baseData,
    id: participantId,
    [examType === 'simulasi' ? 'simulatedExam' : examType === 'penyisihan' ? 'penyisihanExam' : 'finalExam']: examResult,
    cbtStatus: newCbtStatus,
    qualificationStatus: newQualStatus,
    qualificationNote: newQualNote,
    championRank: newRank,
    violationReason: examResult.violationReason || undefined,
    [examType === 'simulasi' ? 'simulatedAttempts' : examType === 'penyisihan' ? 'penyisihanAttempts' : 'finalAttempts']: currentAttempts,
  };

  // Always save to local json
  saveLocalJsonParticipant(mergedData);

  try {
    const p = getDbPool();
    const updateQuery = `
      UPDATE participants SET
        ${column} = $1,
        ${attemptsCol} = $2,
        cbt_status = $3,
        qualification_status = $4,
        qualification_note = $5,
        champion_rank = $6,
        violation_reason = $7,
        data = $8,
        updated_at = NOW()
      WHERE id = $9
      RETURNING *;
    `;

    const updatedRes = await p.query(updateQuery, [
      JSON.stringify(examResult),
      currentAttempts,
      newCbtStatus,
      newQualStatus,
      newQualNote,
      newRank,
      examResult.violationReason || null,
      JSON.stringify(mergedData),
      participantId
    ]);

    postVercelWebhook('participant.exam_completed', {
      participantId,
      examType,
      score: examResult.score,
      cbtStatus: newCbtStatus
    }).catch(() => {});

    if (updatedRes.rows && updatedRes.rows.length > 0) {
      return rowToParticipant(updatedRes.rows[0]);
    }
  } catch (err: any) {
    if (isQuotaError(err)) {
      isNeonQuotaExceeded = true;
      console.warn('[Neon PostgreSQL] Quota exceeded on recording exam. Safely saved in local storage.');
    } else {
      console.warn('Neon exam recording note:', err.message);
    }
  }

  return mergedData;
}

/**
 * Permanently delete all participants from Neon PostgreSQL and local storage
 */
export async function clearAllParticipantsFromDb(): Promise<void> {
  // Clear local file first
  const dataDir = path.join(process.cwd(), 'data');
  const participantsFile = path.join(dataDir, 'participants.json');
  try {
    if (fs.existsSync(participantsFile)) {
      fs.writeFileSync(participantsFile, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch {}

  if (!isNeonQuotaExceeded) {
    try {
      await ensureDbSchema();
      if (!isNeonQuotaExceeded) {
        const p = getDbPool();
        await p.query('TRUNCATE TABLE participants');
      }
    } catch (err: any) {
      if (isQuotaError(err)) isNeonQuotaExceeded = true;
    }
  }

  postVercelWebhook('participants.cleared', { timestamp: new Date().toISOString() }).catch(() => {});
}

/**
 * Delete a specific participant from Neon PostgreSQL and local storage
 */
export async function deleteParticipantFromDb(id: string): Promise<boolean> {
  // Delete from local file
  try {
    const participantsFile = path.join(process.cwd(), 'data', 'participants.json');
    if (fs.existsSync(participantsFile)) {
      const list = JSON.parse(fs.readFileSync(participantsFile, 'utf-8'));
      const filtered = list.filter((p: any) => p.id !== id);
      fs.writeFileSync(participantsFile, JSON.stringify(filtered, null, 2), 'utf-8');
    }
  } catch {}

  let deleted = false;
  if (!isNeonQuotaExceeded) {
    try {
      await ensureDbSchema();
      if (!isNeonQuotaExceeded) {
        const p = getDbPool();
        const res = await p.query('DELETE FROM participants WHERE id = $1', [id]);
        deleted = (res.rowCount ?? 0) > 0;
      }
    } catch (err: any) {
      if (isQuotaError(err)) isNeonQuotaExceeded = true;
    }
  }

  postVercelWebhook('participant.deleted', { id }).catch(() => {});
  return deleted;
}

/**
 * Get application setting from Neon PostgreSQL schedule_config/settings table with local fallback
 */
export async function getSettingFromDb(key: string, defaultValue: any = null): Promise<any> {
  // First check local persistence
  const localVal = readLocalSetting(key);
  if (localVal !== null && localVal !== undefined) {
    return localVal;
  }

  if (isNeonQuotaExceeded) {
    return defaultValue;
  }

  try {
    await ensureDbSchema();
    if (isNeonQuotaExceeded) return defaultValue;
    const p = getDbPool();
    const res = await p.query('SELECT value FROM schedule_config WHERE key = $1', [key]);
    if (res.rows.length > 0 && res.rows[0].value !== null) {
      saveLocalSetting(key, res.rows[0].value);
      return res.rows[0].value;
    }
  } catch (err: any) {
    if (isQuotaError(err)) {
      isNeonQuotaExceeded = true;
      console.warn(`[Neon PostgreSQL] Quota exceeded for setting ${key}.`);
    } else {
      console.warn(`Notice fetching setting ${key}:`, err.message);
    }
  }
  return defaultValue;
}

/**
 * Save / Update application setting into Neon PostgreSQL schedule_config table and local file
 */
export async function saveSettingToDb(key: string, value: any): Promise<any> {
  saveLocalSetting(key, value);

  if (!isNeonQuotaExceeded) {
    try {
      await ensureDbSchema();
      if (!isNeonQuotaExceeded) {
        const p = getDbPool();
        const res = await p.query(`
          INSERT INTO schedule_config (key, value, updated_at)
          VALUES ($1, $2, NOW())
          ON CONFLICT (key) DO UPDATE
          SET value = EXCLUDED.value,
              updated_at = NOW()
          RETURNING value
        `, [key, JSON.stringify(value)]);
        postVercelWebhook(`settings.${key}.updated`, { key, value }).catch(() => {});
        return res.rows[0]?.value ?? value;
      }
    } catch (err: any) {
      if (isQuotaError(err)) {
        isNeonQuotaExceeded = true;
        console.warn(`[Neon PostgreSQL] Quota exceeded when saving setting ${key}. Safely saved to local storage.`);
      } else {
        console.warn(`Notice saving setting ${key}:`, err.message);
      }
    }
  }

  return value;
}

/**
 * Get all questions from Neon PostgreSQL with local file fallback
 */
export async function getAllQuestionsFromDb(): Promise<any[]> {
  const localQuestions = readLocalQuestions();
  if (localQuestions.length > 0) {
    return localQuestions;
  }

  if (isNeonQuotaExceeded) {
    return [];
  }

  try {
    await ensureDbSchema();
    if (isNeonQuotaExceeded) return [];
    const p = getDbPool();
    const res = await p.query('SELECT * FROM cbt_questions ORDER BY updated_at DESC');
    if (res.rows.length > 0) {
      const mapped = res.rows.map((r: any) => ({
        id: r.id,
        subject: r.subject,
        level: r.level,
        questionText: r.question,
        options: r.options,
        correctAnswer: r.correct_answer,
        explanation: r.explanation,
        imageUrl: r.image_url,
        ...(r.data && typeof r.data === 'object' ? r.data : {})
      }));
      saveLocalQuestions(mapped);
      return mapped;
    }
  } catch (err: any) {
    if (isQuotaError(err)) {
      isNeonQuotaExceeded = true;
      console.warn('[Neon PostgreSQL] Quota exceeded when fetching questions.');
    } else {
      console.warn('Notice fetching questions from DB:', err.message);
    }
  }
  return [];
}

/**
 * Save a single question to Neon PostgreSQL & local storage
 */
export async function saveQuestionToDb(q: any): Promise<any> {
  saveLocalQuestion(q);

  if (!isNeonQuotaExceeded) {
    try {
      await ensureDbSchema();
      if (!isNeonQuotaExceeded) {
        const p = getDbPool();
        const res = await p.query(`
          INSERT INTO cbt_questions (id, subject, level, question, options, correct_answer, explanation, image_url, data, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
          ON CONFLICT (id) DO UPDATE
          SET subject = EXCLUDED.subject,
              level = EXCLUDED.level,
              question = EXCLUDED.question,
              options = EXCLUDED.options,
              correct_answer = EXCLUDED.correct_answer,
              explanation = EXCLUDED.explanation,
              image_url = EXCLUDED.image_url,
              data = EXCLUDED.data,
              updated_at = NOW()
          RETURNING *
        `, [
          q.id,
          q.subject || 'Matematika',
          q.level || 'SD / MI',
          q.questionText || q.question || '',
          JSON.stringify(q.options || []),
          q.correctAnswer ?? 0,
          q.explanation || '',
          q.imageUrl || q.imageSvg || null,
          JSON.stringify(q)
        ]);
        postVercelWebhook('question.saved', { id: q.id, subject: q.subject }).catch(() => {});
        return res.rows[0];
      }
    } catch (err: any) {
      if (isQuotaError(err)) {
        isNeonQuotaExceeded = true;
        console.warn('[Neon PostgreSQL] Quota exceeded when saving question. Stored in local persistence.');
      } else {
        console.warn('Notice saving question to DB:', err.message);
      }
    }
  }

  return q;
}

/**
 * Delete a question from Neon PostgreSQL & local storage
 */
export async function deleteQuestionFromDb(id: string): Promise<boolean> {
  deleteLocalQuestion(id);

  if (!isNeonQuotaExceeded) {
    try {
      await ensureDbSchema();
      if (!isNeonQuotaExceeded) {
        const p = getDbPool();
        const res = await p.query('DELETE FROM cbt_questions WHERE id = $1', [id]);
        postVercelWebhook('question.deleted', { id }).catch(() => {});
        return (res.rowCount ?? 0) > 0;
      }
    } catch (err: any) {
      if (isQuotaError(err)) {
        isNeonQuotaExceeded = true;
      }
    }
  }

  return true;
}

/**
 * Get database connectivity & health status
 */
export async function getDbHealthStatus(): Promise<{
  connected: boolean;
  totalParticipants: number;
  dbHost: string;
  database: string;
  latencyMs: number;
  webhookUrl: string;
  error?: string;
}> {
  const start = Date.now();
  if (isNeonQuotaExceeded) {
    const total = readLocalJsonParticipants().length;
    return {
      connected: true,
      totalParticipants: total,
      dbHost: 'local-fallback (Neon quota protected)',
      database: 'neondb_local',
      latencyMs: Date.now() - start,
      webhookUrl: VERCEL_WEBHOOK_URL,
    };
  }
  const p = getDbPool();
  try {
    await ensureDbSchema();
    const testRes = await p.query('SELECT NOW() as now, COUNT(*) as count FROM participants');
    const latency = Date.now() - start;
    const total = parseInt(testRes.rows[0].count, 10);
    return {
      connected: true,
      totalParticipants: total,
      dbHost: process.env.PGHOST || 'ep-frosty-bird-aw35nhlz-pooler.c-12.us-east-1.aws.neon.tech',
      database: process.env.PGDATABASE || 'neondb',
      latencyMs: latency,
      webhookUrl: VERCEL_WEBHOOK_URL,
    };
  } catch (err: any) {
    const total = readLocalJsonParticipants().length;
    return {
      connected: true,
      totalParticipants: total,
      dbHost: 'local-fallback',
      database: 'neondb',
      latencyMs: Date.now() - start,
      webhookUrl: VERCEL_WEBHOOK_URL,
      error: err.message,
    };
  }
}

// Fallback helpers for file system
function readLocalJsonParticipants(): any[] {
  try {
    const participantsFile = path.join(process.cwd(), 'data', 'participants.json');
    if (fs.existsSync(participantsFile)) {
      const data = JSON.parse(fs.readFileSync(participantsFile, 'utf-8'));
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }

    // Auto-restore from raw_spreadsheet.csv if participants.json was ever missing or emptied
    const csvFile = path.join(process.cwd(), 'data', 'raw_spreadsheet.csv');
    if (fs.existsSync(csvFile)) {
      try {
        const { parseCSV } = require('../../scripts/import_helper.cjs');
        const csvContent = fs.readFileSync(csvFile, 'utf-8');
        const restored = parseCSV(csvContent);
        if (Array.isArray(restored) && restored.length > 0) {
          fs.writeFileSync(participantsFile, JSON.stringify(restored, null, 2), 'utf-8');
          return restored;
        }
      } catch {}
    }
  } catch {}
  return [];
}

function saveLocalJsonParticipant(p: any): void {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    const participantsFile = path.join(dataDir, 'participants.json');
    let list: any[] = [];
    if (fs.existsSync(participantsFile)) {
      list = JSON.parse(fs.readFileSync(participantsFile, 'utf-8'));
    }
    const idx = list.findIndex((item) => item.id === p.id);
    if (idx >= 0) {
      const prev = list[idx];
      const nextIsClosing = p.isClosing !== undefined
        ? Boolean(p.isClosing)
        : (p.finalTicketPaymentStatus !== undefined
            ? (p.finalTicketPaymentStatus === 'paid_closing')
            : prev.isClosing);
      const nextPaymentStatus = p.finalTicketPaymentStatus !== undefined
        ? p.finalTicketPaymentStatus
        : (p.isClosing !== undefined
            ? (p.isClosing ? 'paid_closing' : 'unpaid')
            : prev.finalTicketPaymentStatus);

      list[idx] = {
        ...prev,
        ...p,
        simulatedExam: p.simulatedExam !== undefined ? p.simulatedExam : prev.simulatedExam,
        penyisihanExam: p.penyisihanExam !== undefined ? p.penyisihanExam : prev.penyisihanExam,
        finalExam: p.finalExam !== undefined ? p.finalExam : prev.finalExam,
        finalAttempts: p.finalAttempts !== undefined ? p.finalAttempts : (p.finalExam === null || p.finalExam === undefined ? 0 : prev.finalAttempts),
        isClosing: nextIsClosing,
        finalTicketPaymentStatus: nextPaymentStatus,
        qualificationStatus: p.qualificationStatus !== undefined ? p.qualificationStatus : prev.qualificationStatus,
        championRank: p.championRank !== undefined ? p.championRank : prev.championRank,
      };
    } else {
      list.unshift(p);
    }
    fs.writeFileSync(participantsFile, JSON.stringify(list, null, 2), 'utf-8');
  } catch {}
}

function saveLocalJsonParticipantsBulk(records: any[]): void {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    const participantsFile = path.join(dataDir, 'participants.json');
    let list: any[] = [];
    if (fs.existsSync(participantsFile)) {
      list = JSON.parse(fs.readFileSync(participantsFile, 'utf-8'));
    }
    const map = new Map<string, any>();
    for (const item of list) {
      if (item.id) map.set(item.id, item);
    }
    for (const item of records) {
      if (!item.id) continue;
      const prev = map.get(item.id);
      if (prev) {
        const nextIsClosing = item.isClosing !== undefined
          ? Boolean(item.isClosing)
          : (item.finalTicketPaymentStatus !== undefined
              ? (item.finalTicketPaymentStatus === 'paid_closing')
              : prev.isClosing);
        const nextPaymentStatus = item.finalTicketPaymentStatus !== undefined
          ? item.finalTicketPaymentStatus
          : (item.isClosing !== undefined
              ? (item.isClosing ? 'paid_closing' : 'unpaid')
              : prev.finalTicketPaymentStatus);

        map.set(item.id, {
          ...prev,
          ...item,
          simulatedExam: item.simulatedExam !== undefined ? item.simulatedExam : prev.simulatedExam,
          penyisihanExam: item.penyisihanExam !== undefined ? item.penyisihanExam : prev.penyisihanExam,
          finalExam: item.finalExam !== undefined ? item.finalExam : prev.finalExam,
          finalAttempts: item.finalAttempts !== undefined ? item.finalAttempts : (item.finalExam === null || item.finalExam === undefined ? 0 : prev.finalAttempts),
          isClosing: nextIsClosing,
          finalTicketPaymentStatus: nextPaymentStatus,
          qualificationStatus: item.qualificationStatus !== undefined ? item.qualificationStatus : prev.qualificationStatus,
          championRank: item.championRank !== undefined ? item.championRank : prev.championRank,
        });
      } else {
        map.set(item.id, item);
      }
    }
    fs.writeFileSync(participantsFile, JSON.stringify(Array.from(map.values()), null, 2), 'utf-8');
  } catch {}
}

function readLocalSetting(key: string): any {
  try {
    const settingsFile = path.join(process.cwd(), 'data', 'settings.json');
    if (fs.existsSync(settingsFile)) {
      const data = JSON.parse(fs.readFileSync(settingsFile, 'utf-8'));
      if (data && data[key] !== undefined) return data[key];
    }
  } catch {}
  return null;
}

function saveLocalSetting(key: string, value: any): void {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    const settingsFile = path.join(dataDir, 'settings.json');
    let data: Record<string, any> = {};
    if (fs.existsSync(settingsFile)) {
      try {
        data = JSON.parse(fs.readFileSync(settingsFile, 'utf-8'));
      } catch {}
    }
    data[key] = value;
    fs.writeFileSync(settingsFile, JSON.stringify(data, null, 2), 'utf-8');
  } catch {}
}

function readLocalQuestions(): any[] {
  try {
    const qFile = path.join(process.cwd(), 'data', 'cbt_questions.json');
    if (fs.existsSync(qFile)) {
      const parsed = JSON.parse(fs.readFileSync(qFile, 'utf-8'));
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [];
}

function saveLocalQuestions(questions: any[]): void {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    const qFile = path.join(dataDir, 'cbt_questions.json');
    fs.writeFileSync(qFile, JSON.stringify(questions, null, 2), 'utf-8');
  } catch {}
}

function saveLocalQuestion(q: any): void {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    const qFile = path.join(dataDir, 'cbt_questions.json');
    let list: any[] = [];
    if (fs.existsSync(qFile)) {
      try { list = JSON.parse(fs.readFileSync(qFile, 'utf-8')); } catch {}
    }
    const idx = list.findIndex((item) => item.id === q.id);
    if (idx >= 0) list[idx] = q;
    else list.unshift(q);
    fs.writeFileSync(qFile, JSON.stringify(list, null, 2), 'utf-8');
  } catch {}
}

function deleteLocalQuestion(id: string): void {
  try {
    const qFile = path.join(process.cwd(), 'data', 'cbt_questions.json');
    if (fs.existsSync(qFile)) {
      const list = JSON.parse(fs.readFileSync(qFile, 'utf-8'));
      const filtered = list.filter((item: any) => item.id !== id);
      fs.writeFileSync(qFile, JSON.stringify(filtered, null, 2), 'utf-8');
    }
  } catch {}
}
