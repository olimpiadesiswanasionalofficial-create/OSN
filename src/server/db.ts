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
      console.error('Unexpected error on idle Neon PostgreSQL client:', err);
    });
  }
  return pool;
}

/**
 * Automatically creates all tables in Neon PostgreSQL if not already created
 */
export async function ensureDbSchema(): Promise<void> {
  if (schemaInitialized) return;
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
        data JSONB,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

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
    console.error('Error initializing Neon DB schema:', err.message);
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
  };
}

/**
 * Read all participants from Neon PostgreSQL
 */
export async function getAllParticipantsFromDb(): Promise<any[]> {
  await ensureDbSchema();
  const p = getDbPool();
  try {
    const res = await p.query(`
      SELECT * FROM participants 
      ORDER BY updated_at DESC, registered_at DESC
    `);
    return res.rows.map(rowToParticipant);
  } catch (err: any) {
    console.error('Error fetching participants from Neon PostgreSQL:', err.message);
    // Local file fallback if database is temporarily unreachable
    return readLocalJsonParticipants();
  }
}

/**
 * Save / Upsert a single participant record in Neon PostgreSQL
 */
export async function saveParticipantToDb(record: any): Promise<any> {
  await ensureDbSchema();
  const p = getDbPool();

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
  const finalTicketPaidAt = record.finalTicketPaidAt ? new Date(record.finalTicketPaidAt).toISOString() : null;
  const finalTicketAmount = record.finalTicketAmount || null;
  const championRank = record.championRank || null;
  const recommendedChampionRank = record.recommendedChampionRank || null;
  const certificateIssuedDate = record.certificateIssuedDate || null;
  const sessionQuestionIds = record.sessionQuestionIds ? JSON.stringify(record.sessionQuestionIds) : null;

  const fullRecord = { ...record, id, fullName, whatsapp, registeredAt };

  try {
    const query = `
      INSERT INTO participants (
        id, full_name, level, school_name, city_province, whatsapp, email,
        parent_name, full_address, subjects, registered_at, cbt_status,
        simulated_exam, penyisihan_exam, final_exam,
        simulated_attempts, penyisihan_attempts, final_attempts,
        qualification_status, qualification_note, final_ticket_payment_status,
        final_ticket_paid_at, final_ticket_amount, champion_rank,
        recommended_champion_rank, certificate_issued_date, session_question_ids,
        data, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12,
        $13, $14, $15,
        $16, $17, $18,
        $19, $20, $21,
        $22, $23, $24,
        $25, $26, $27,
        $28, NOW()
      )
      ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        level = EXCLUDED.level,
        school_name = EXCLUDED.school_name,
        city_province = EXCLUDED.city_province,
        whatsapp = EXCLUDED.whatsapp,
        email = EXCLUDED.email,
        parent_name = EXCLUDED.parent_name,
        full_address = EXCLUDED.full_address,
        subjects = EXCLUDED.subjects,
        cbt_status = EXCLUDED.cbt_status,
        simulated_exam = COALESCE(EXCLUDED.simulated_exam, participants.simulated_exam),
        penyisihan_exam = COALESCE(EXCLUDED.penyisihan_exam, participants.penyisihan_exam),
        final_exam = COALESCE(EXCLUDED.final_exam, participants.final_exam),
        simulated_attempts = GREATEST(EXCLUDED.simulated_attempts, participants.simulated_attempts),
        penyisihan_attempts = GREATEST(EXCLUDED.penyisihan_attempts, participants.penyisihan_attempts),
        final_attempts = GREATEST(EXCLUDED.final_attempts, participants.final_attempts),
        qualification_status = COALESCE(EXCLUDED.qualification_status, participants.qualification_status),
        qualification_note = COALESCE(EXCLUDED.qualification_note, participants.qualification_note),
        final_ticket_payment_status = COALESCE(EXCLUDED.final_ticket_payment_status, participants.final_ticket_payment_status),
        final_ticket_paid_at = COALESCE(EXCLUDED.final_ticket_paid_at, participants.final_ticket_paid_at),
        final_ticket_amount = COALESCE(EXCLUDED.final_ticket_amount, participants.final_ticket_amount),
        champion_rank = COALESCE(EXCLUDED.champion_rank, participants.champion_rank),
        recommended_champion_rank = COALESCE(EXCLUDED.recommended_champion_rank, participants.recommended_champion_rank),
        certificate_issued_date = COALESCE(EXCLUDED.certificate_issued_date, participants.certificate_issued_date),
        session_question_ids = COALESCE(EXCLUDED.session_question_ids, participants.session_question_ids),
        data = EXCLUDED.data,
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
      JSON.stringify(fullRecord)
    ]);

    // Asynchronously dispatch webhook event
    postVercelWebhook('participant.saved', { id, fullName, whatsapp }).catch(() => {});

    return rowToParticipant(res.rows[0]);
  } catch (err: any) {
    console.error('Error saving participant to Neon PostgreSQL:', err.message);
    // Also save to local JSON as fallback
    saveLocalJsonParticipant(fullRecord);
    return fullRecord;
  }
}

/**
 * Bulk save / upsert participants into Neon PostgreSQL
 */
export async function bulkSaveParticipantsToDb(records: any[]): Promise<{ inserted: number; updated: number; total: number }> {
  await ensureDbSchema();
  const p = getDbPool();

  let inserted = 0;
  let updated = 0;

  for (const item of records) {
    if (!item.fullName) continue;
    try {
      await saveParticipantToDb(item);
      inserted++;
    } catch (e) {
      console.error('Bulk item save error:', e);
    }
  }

  // Count total
  let total = inserted;
  try {
    const countRes = await p.query('SELECT COUNT(*) FROM participants');
    total = parseInt(countRes.rows[0].count, 10);
  } catch {}

  // Post bulk webhook event
  postVercelWebhook('participants.bulk_sync', { count: records.length, total }).catch(() => {});

  return { inserted, updated, total };
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
  await ensureDbSchema();
  const p = getDbPool();

  const column = examType === 'simulasi' ? 'simulated_exam' : examType === 'penyisihan' ? 'penyisihan_exam' : 'final_exam';
  const attemptsCol = examType === 'simulasi' ? 'simulated_attempts' : examType === 'penyisihan' ? 'penyisihan_attempts' : 'final_attempts';

  const res = await p.query(`SELECT * FROM participants WHERE id = $1`, [participantId]);
  if (res.rows.length === 0) {
    throw new Error(`Peserta dengan ID ${participantId} tidak ditemukan.`);
  }

  const existingRow = res.rows[0];
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

  const updateQuery = `
    UPDATE participants SET
      ${column} = $1,
      ${attemptsCol} = $2,
      cbt_status = $3,
      qualification_status = $4,
      qualification_note = $5,
      champion_rank = $6,
      updated_at = NOW()
    WHERE id = $7
    RETURNING *;
  `;

  const updatedRes = await p.query(updateQuery, [
    JSON.stringify(examResult),
    currentAttempts,
    newCbtStatus,
    newQualStatus,
    newQualNote,
    newRank,
    participantId
  ]);

  postVercelWebhook('participant.exam_completed', {
    participantId,
    examType,
    score: examResult.score,
    cbtStatus: newCbtStatus
  }).catch(() => {});

  return rowToParticipant(updatedRes.rows[0]);
}

/**
 * Permanently delete all participants from Neon PostgreSQL
 */
export async function clearAllParticipantsFromDb(): Promise<void> {
  await ensureDbSchema();
  const p = getDbPool();
  await p.query('TRUNCATE TABLE participants');
  
  // Also clear local file
  const dataDir = path.join(process.cwd(), 'data');
  const participantsFile = path.join(dataDir, 'participants.json');
  try {
    if (fs.existsSync(participantsFile)) {
      fs.writeFileSync(participantsFile, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch {}

  postVercelWebhook('participants.cleared', { timestamp: new Date().toISOString() }).catch(() => {});
}

/**
 * Delete a specific participant from Neon PostgreSQL
 */
export async function deleteParticipantFromDb(id: string): Promise<boolean> {
  await ensureDbSchema();
  const p = getDbPool();
  const res = await p.query('DELETE FROM participants WHERE id = $1', [id]);
  postVercelWebhook('participant.deleted', { id }).catch(() => {});
  return (res.rowCount ?? 0) > 0;
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
    return {
      connected: false,
      totalParticipants: 0,
      dbHost: process.env.PGHOST || 'ep-frosty-bird-aw35nhlz-pooler.c-12.us-east-1.aws.neon.tech',
      database: process.env.PGDATABASE || 'neondb',
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
      return JSON.parse(fs.readFileSync(participantsFile, 'utf-8'));
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
    if (idx >= 0) list[idx] = p;
    else list.unshift(p);
    fs.writeFileSync(participantsFile, JSON.stringify(list, null, 2), 'utf-8');
  } catch {}
}
