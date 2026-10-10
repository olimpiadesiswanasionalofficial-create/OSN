import pg from 'pg';
import dotenv from 'dotenv';
import { getDbPool } from './db.js';

dotenv.config();

export interface MigrationReport {
  success: boolean;
  tablesCreated: string[];
  indexesCreated: string[];
  defaultsSeeded: string[];
  durationMs: number;
  timestamp: string;
  error?: string;
}

/**
 * Migration & Initialization Script for Vercel PostgreSQL / Neon
 * Ensures schemas for:
 * 1. Event Schedules (schedule_config & event_schedules)
 * 2. Meta Pixel (meta_pixel_settings & app_settings)
 * 3. WhatsApp Gateway & Broadcast (whatsapp_settings)
 * 4. Competition Data & Participants (participants, cbt_questions, webhook_logs)
 */
export async function runDbMigration(): Promise<MigrationReport> {
  const start = Date.now();
  const pool = getDbPool();
  const tablesCreated: string[] = [];
  const indexesCreated: string[] = [];
  const defaultsSeeded: string[] = [];

  try {
    // 1. PARTICIPANTS TABLE
    await pool.query(`
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
        subjects JSONB DEFAULT '["Matematika"]'::jsonb,
        registered_at TIMESTAMPTZ DEFAULT NOW(),
        cbt_status TEXT DEFAULT 'Aktif & Siap Ujian',
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
        final_ticket_amount NUMERIC DEFAULT 99000,
        champion_rank TEXT,
        recommended_champion_rank TEXT,
        certificate_issued_date TEXT,
        session_question_ids JSONB,
        data JSONB,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    tablesCreated.push('participants');

    // 2. CBT QUESTIONS BANK TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cbt_questions (
        id VARCHAR(100) PRIMARY KEY,
        subject TEXT NOT NULL,
        level TEXT,
        question TEXT NOT NULL,
        options JSONB NOT NULL,
        correct_answer INT DEFAULT 0,
        explanation TEXT,
        image_url TEXT,
        data JSONB,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    tablesCreated.push('cbt_questions');

    // 3. SCHEDULE CONFIG TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS schedule_config (
        key VARCHAR(100) PRIMARY KEY,
        value JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    tablesCreated.push('schedule_config');

    // 4. GENERAL APP SETTINGS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS app_settings (
        key VARCHAR(100) PRIMARY KEY,
        value JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    tablesCreated.push('app_settings');

    // 5. STRUCTURED EVENT SCHEDULES TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS event_schedules (
        id VARCHAR(50) PRIMARY KEY DEFAULT 'current',
        registration_open_date TEXT NOT NULL,
        registration_desc TEXT,
        penyisihan_date TEXT NOT NULL,
        penyisihan_desc TEXT,
        final_date TEXT NOT NULL,
        final_desc TEXT,
        announcement_date TEXT NOT NULL,
        announcement_desc TEXT,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    tablesCreated.push('event_schedules');

    // 6. META PIXEL SETTINGS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS meta_pixel_settings (
        id VARCHAR(50) PRIMARY KEY DEFAULT 'current',
        pixel_id TEXT DEFAULT '',
        custom_script TEXT DEFAULT '',
        is_enabled BOOLEAN DEFAULT FALSE,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    tablesCreated.push('meta_pixel_settings');

    // 7. WHATSAPP SETTINGS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS whatsapp_settings (
        id VARCHAR(50) PRIMARY KEY DEFAULT 'current',
        provider TEXT DEFAULT 'fonnte',
        api_key TEXT DEFAULT '',
        sender_number TEXT DEFAULT '081234567890',
        endpoint_url TEXT DEFAULT '/api/whatsapp/send',
        auto_send_exam_graded BOOLEAN DEFAULT TRUE,
        auto_send_qualification BOOLEAN DEFAULT TRUE,
        is_connected BOOLEAN DEFAULT TRUE,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    tablesCreated.push('whatsapp_settings');

    // 8. WEBHOOK LOGS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS webhook_logs (
        id SERIAL PRIMARY KEY,
        event_type TEXT NOT NULL,
        payload JSONB,
        status TEXT,
        response TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    tablesCreated.push('webhook_logs');

    // CREATE INDEXES FOR FAST QUERIES
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_participants_whatsapp ON participants (whatsapp);
      CREATE INDEX IF NOT EXISTS idx_participants_level ON participants (level);
      CREATE INDEX IF NOT EXISTS idx_participants_qualification ON participants (qualification_status);
      CREATE INDEX IF NOT EXISTS idx_questions_subject ON cbt_questions (subject);
    `);
    indexesCreated.push('idx_participants_whatsapp', 'idx_participants_level', 'idx_participants_qualification', 'idx_questions_subject');

    // SEED DEFAULTS IF EMPTY
    // A. Seed Event Schedule
    const defaultSchedule = {
      registrationOpenDate: "25 Agustus – 11 September 2026",
      registrationDesc: "Pendaftaran online mudah & praktis. Terbuka untuk seluruh siswa di Indonesia tanpa kuota zonasi.",
      penyisihanDate: "12 September 2026",
      penyisihanDesc: "Ujian online aman dari rumah via sistem CBT mutakhir anti-kecurangan. Penyisihan GRATIS untuk semua peserta.",
      finalDate: "19 September 2026",
      finalDesc: "Babak penentuan medalis nasional dan perebutan gelar Juara Umum OSN tingkat nasional.",
      announcementDate: "20 September 2026",
      announcementDesc: "Pengumuman resmi juara, penerbitan sertifikat QR-Code & pengiriman paket piala/medali fisik ke alamat pemenang."
    };

    await pool.query(`
      INSERT INTO schedule_config (key, value, updated_at)
      VALUES ('schedule', $1, NOW())
      ON CONFLICT (key) DO NOTHING;
    `, [JSON.stringify(defaultSchedule)]);

    await pool.query(`
      INSERT INTO event_schedules (
        id, registration_open_date, registration_desc,
        penyisihan_date, penyisihan_desc,
        final_date, final_desc,
        announcement_date, announcement_desc,
        updated_at
      ) VALUES (
        'current', $1, $2, $3, $4, $5, $6, $7, $8, NOW()
      ) ON CONFLICT (id) DO NOTHING;
    `, [
      defaultSchedule.registrationOpenDate, defaultSchedule.registrationDesc,
      defaultSchedule.penyisihanDate, defaultSchedule.penyisihanDesc,
      defaultSchedule.finalDate, defaultSchedule.finalDesc,
      defaultSchedule.announcementDate, defaultSchedule.announcementDesc
    ]);
    defaultsSeeded.push('event_schedules');

    // B. Seed Meta Pixel Settings
    const defaultPixel = {
      pixelId: '',
      customScript: '',
      isEnabled: false
    };

    await pool.query(`
      INSERT INTO schedule_config (key, value, updated_at)
      VALUES ('meta_pixel', $1, NOW())
      ON CONFLICT (key) DO NOTHING;
    `, [JSON.stringify(defaultPixel)]);

    await pool.query(`
      INSERT INTO meta_pixel_settings (id, pixel_id, custom_script, is_enabled, updated_at)
      VALUES ('current', '', '', FALSE, NOW())
      ON CONFLICT (id) DO NOTHING;
    `);
    defaultsSeeded.push('meta_pixel_settings');

    // C. Seed WhatsApp Settings
    const defaultWa = {
      provider: 'fonnte',
      apiKey: 'OSN-WA-GATEWAY-OFFICIAL-2026',
      senderNumber: '6285810243460',
      endpointUrl: '/api/whatsapp/send',
      autoSendExamGraded: true,
      autoSendQualification: true,
      isConnected: true
    };

    await pool.query(`
      INSERT INTO schedule_config (key, value, updated_at)
      VALUES ('whatsapp_api', $1, NOW())
      ON CONFLICT (key) DO NOTHING;
    `, [JSON.stringify(defaultWa)]);

    await pool.query(`
      INSERT INTO whatsapp_settings (id, provider, api_key, sender_number, endpoint_url, auto_send_exam_graded, auto_send_qualification, is_connected, updated_at)
      VALUES ('current', 'fonnte', 'OSN-WA-GATEWAY-OFFICIAL-2026', '6285810243460', '/api/whatsapp/send', TRUE, TRUE, TRUE, NOW())
      ON CONFLICT (id) DO NOTHING;
    `);
    defaultsSeeded.push('whatsapp_settings');

    const duration = Date.now() - start;
    console.log(`[Database Migration] Success! Initialized in ${duration}ms.`);
    return {
      success: true,
      tablesCreated,
      indexesCreated,
      defaultsSeeded,
      durationMs: duration,
      timestamp: new Date().toISOString()
    };
  } catch (err: any) {
    const duration = Date.now() - start;
    console.error('[Database Migration] Failed:', err.message);
    return {
      success: false,
      tablesCreated,
      indexesCreated,
      defaultsSeeded,
      durationMs: duration,
      timestamp: new Date().toISOString(),
      error: err.message
    };
  }
}

// Auto-run if executed directly via node or tsx
if (process.argv[1]?.includes('dbMigration')) {
  runDbMigration().then(res => {
    console.log('Migration Result:', JSON.stringify(res, null, 2));
    process.exit(res.success ? 0 : 1);
  });
}
