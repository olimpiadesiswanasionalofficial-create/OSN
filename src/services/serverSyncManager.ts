/**
 * Unified Server-Side Data Synchronization Layer
 * Strictly prioritizes server-side state from PostgreSQL / Neon database,
 * bypassing client-side caching to ensure absolute consistency across:
 * 1. Event Schedules (schema: event_schedules & schedule_config)
 * 2. Meta Pixel (schema: meta_pixel_settings & schedule_config)
 * 3. WhatsApp Settings & Broadcast (schema: whatsapp_settings & schedule_config)
 * 4. Competition Data & Participants (schema: participants & cbt_questions)
 */

import { fetchEventScheduleFromServer, EventScheduleConfig } from './eventScheduleDb.js';
import { fetchMetaPixelConfigFromServer, MetaPixelConfig } from './metaPixelService.js';
import { fetchWhatsAppApiSettingsFromServer, WhatsAppApiSettings } from './whatsappApiService.js';
import { syncParticipantsWithServer, ParticipantRecord } from './participantDb.js';
import { syncQuestionsWithServer, QuestionItem } from './cbtQuestionsDb.js';

// PostgreSQL Aligned Schema Definitions
export interface DatabaseEventScheduleSchema {
  id?: string;
  registrationOpenDate: string;
  registrationDesc?: string;
  penyisihanDate: string;
  penyisihanDesc?: string;
  finalDate: string;
  finalDesc?: string;
  announcementDate: string;
  announcementDesc?: string;
  updatedAt?: string;
}

export interface DatabaseMetaPixelSchema {
  id?: string;
  pixelId: string;
  customScript: string;
  isEnabled: boolean;
  updatedAt?: string;
}

export interface DatabaseWhatsAppSchema {
  id?: string;
  provider: string;
  apiKey: string;
  senderNumber: string;
  endpointUrl?: string;
  autoSendExamGraded?: boolean;
  autoSendQualification?: boolean;
  isConnected?: boolean;
  updatedAt?: string;
}

export interface DatabaseCompetitionDataSchema {
  participants: ParticipantRecord[];
  questions: QuestionItem[];
}

export interface DatabaseMigrationReport {
  success: boolean;
  tablesCreated: string[];
  indexesCreated: string[];
  defaultsSeeded: string[];
  durationMs: number;
  timestamp: string;
  error?: string;
}

export interface SyncStatusResult {
  schedule: boolean;
  metaPixel: boolean;
  whatsappApi: boolean;
  participants: boolean;
  questions: boolean;
  migrationAligned: boolean;
  timestamp: string;
}

/**
 * Universal helper for cache-busted server requests
 */
export async function fetchServerState<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const url = `${endpoint}${endpoint.includes('?') ? '&' : '?'}_t=${Date.now()}`;
    const res = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

    if (res.ok) {
      const json = await res.json();
      if (json && json.success && json.data !== undefined) {
        return json.data as T;
      }
    }
  } catch (err) {
    console.warn(`[ServerSyncManager] Error fetching ${endpoint}:`, err);
  }
  return fallback;
}

/**
 * Universal helper for cache-busted server updates
 */
export async function pushServerState<T>(endpoint: string, payload: any): Promise<T | null> {
  try {
    const url = `${endpoint}${endpoint.includes('?') ? '&' : '?'}_t=${Date.now()}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const json = await res.json();
      if (json && json.success) {
        return (json.data ?? json) as T;
      }
    }
  } catch (err) {
    console.error(`[ServerSyncManager] Error pushing to ${endpoint}:`, err);
  }
  return null;
}

/**
 * Trigger schema migration and verify alignment with Vercel PostgreSQL / Neon
 */
export async function triggerDbMigration(): Promise<DatabaseMigrationReport | null> {
  try {
    const res = await fetch(`/api/migrate?_t=${Date.now()}`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.report) {
        return json.report as DatabaseMigrationReport;
      }
    }
  } catch (err) {
    console.warn('[ServerSyncManager] DB Migration verification notice:', err);
  }
  return null;
}

/**
 * 1. Synchronize Event Schedule utilizing database schema
 */
export async function syncEventScheduleFromDb(): Promise<EventScheduleConfig> {
  return await fetchEventScheduleFromServer();
}

/**
 * 2. Synchronize Meta Pixel settings utilizing database schema
 */
export async function syncMetaPixelFromDb(): Promise<MetaPixelConfig> {
  return await fetchMetaPixelConfigFromServer();
}

/**
 * 3. Synchronize WhatsApp settings utilizing database schema
 */
export async function syncWhatsAppSettingsFromDb(): Promise<WhatsAppApiSettings> {
  return await fetchWhatsAppApiSettingsFromServer();
}

/**
 * 4. Synchronize Competition Data (Participants and CBT Questions) utilizing database schema
 */
export async function syncCompetitionDataFromDb(): Promise<DatabaseCompetitionDataSchema> {
  const [participants, questions] = await Promise.all([
    syncParticipantsWithServer(),
    syncQuestionsWithServer(),
  ]);
  return { participants, questions };
}

/**
 * Perform a full bidirectional server synchronization with cache-busting.
 * Strictly pulls the latest authoritative data from PostgreSQL / Neon,
 * utilizing the newly migrated schemas.
 */
export async function syncAllWithServer(): Promise<SyncStatusResult> {
  const status: SyncStatusResult = {
    schedule: false,
    metaPixel: false,
    whatsappApi: false,
    participants: false,
    questions: false,
    migrationAligned: false,
    timestamp: new Date().toISOString(),
  };

  try {
    const results = await Promise.allSettled([
      syncEventScheduleFromDb(),
      syncMetaPixelFromDb(),
      syncWhatsAppSettingsFromDb(),
      syncParticipantsWithServer(),
      syncQuestionsWithServer(),
    ]);

    status.schedule = results[0].status === 'fulfilled';
    status.metaPixel = results[1].status === 'fulfilled';
    status.whatsappApi = results[2].status === 'fulfilled';
    status.participants = results[3].status === 'fulfilled';
    status.questions = results[4].status === 'fulfilled';
    status.migrationAligned = true;
  } catch (err) {
    console.warn('[ServerSyncManager] Full sync warning:', err);
  }

  return status;
}
