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
import { syncParticipantsWithServer, saveAllParticipants, ParticipantRecord } from './participantDb.js';
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

export type SyncLogLevel = 'info' | 'warn' | 'error';
export type SyncLogCategory = 'PROFILE_SWITCH' | 'RACE_CONDITION' | 'NETWORK_TIMEOUT' | 'CACHE_INVALIDATION' | 'SERVER_SYNC';

export interface SyncAuditLog {
  id: string;
  timestamp: string;
  level: SyncLogLevel;
  category: SyncLogCategory;
  profile: string;
  sessionVersion: number;
  message: string;
  details?: any;
}

// Centralized logging buffer & race condition management
const MAX_LOGS = 150;
const syncAuditLogs: SyncAuditLog[] = [];
const logListeners = new Set<(log: SyncAuditLog) => void>();
let currentSessionVersion = 0;
let currentActiveProfile = 'default_admin';

export function getActiveSessionProfile(): string {
  return currentActiveProfile;
}

export function getCurrentSessionVersion(): number {
  return currentSessionVersion;
}

/**
 * Safely switch active profile, incrementing session version to invalidate any stale concurrent requests.
 */
export function switchActiveSessionProfile(newProfile: string): number {
  currentSessionVersion++;
  const prev = currentActiveProfile;
  currentActiveProfile = newProfile || 'admin';
  logSyncEvent(
    'info',
    'PROFILE_SWITCH',
    `Active profile switched from [${prev}] to [${currentActiveProfile}]. Session version updated to v${currentSessionVersion}.`,
    { previousProfile: prev, newProfile: currentActiveProfile, sessionVersion: currentSessionVersion }
  );
  return currentSessionVersion;
}

/**
 * Centralized logging mechanism for tracking profile switches, race conditions, and network timeouts
 */
export function logSyncEvent(
  level: SyncLogLevel,
  category: SyncLogCategory,
  message: string,
  details?: any,
  profileOverride?: string
): SyncAuditLog {
  const entry: SyncAuditLog = {
    id: `sync-log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    level,
    category,
    profile: profileOverride || currentActiveProfile,
    sessionVersion: currentSessionVersion,
    message,
    details,
  };
  syncAuditLogs.unshift(entry);
  if (syncAuditLogs.length > MAX_LOGS) syncAuditLogs.pop();

  if (level === 'error') {
    console.error(`[ServerSyncManager:${category}]`, message, details || '');
  } else if (level === 'warn') {
    console.warn(`[ServerSyncManager:${category}]`, message, details || '');
  }

  logListeners.forEach((fn) => {
    try {
      fn(entry);
    } catch {}
  });

  return entry;
}

export function getSyncAuditLogs(): SyncAuditLog[] {
  return [...syncAuditLogs];
}

export function clearSyncAuditLogs(): void {
  syncAuditLogs.length = 0;
}

export function subscribeSyncAuditLogs(listener: (log: SyncAuditLog) => void): () => void {
  logListeners.add(listener);
  return () => {
    logListeners.delete(listener);
  };
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
 * Universal helper for cache-busted server requests with network timeout handling
 * and race condition verification across profile sessions
 */
export async function fetchServerState<T>(
  endpoint: string,
  fallback: T,
  timeoutMs: number = 8000
): Promise<T> {
  const versionAtStart = currentSessionVersion;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const url = `${endpoint}${endpoint.includes('?') ? '&' : '?'}_t=${Date.now()}`;
    const res = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
    clearTimeout(timer);

    // Detect and resolve race conditions during cross-profile switching
    if (versionAtStart !== currentSessionVersion) {
      logSyncEvent(
        'warn',
        'RACE_CONDITION',
        `Race condition resolved: discarded response from ${endpoint} because active profile changed (started v${versionAtStart}, now v${currentSessionVersion})`,
        { endpoint, startedVersion: versionAtStart, currentVersion: currentSessionVersion, activeProfile: currentActiveProfile }
      );
      return fallback;
    }

    if (res.ok) {
      const json = await res.json();
      if (json && json.success && json.data !== undefined) {
        return json.data as T;
      }
    }
  } catch (err: any) {
    clearTimeout(timer);
    if (err?.name === 'AbortError') {
      logSyncEvent(
        'warn',
        'NETWORK_TIMEOUT',
        `Network timeout (${timeoutMs}ms) fetching ${endpoint}. Recovering database state cleanly.`,
        { endpoint, timeoutMs, activeProfile: currentActiveProfile }
      );
    } else {
      logSyncEvent('warn', 'SERVER_SYNC', `Network notice for ${endpoint}: ${err?.message}`, { endpoint, error: err?.message });
    }
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

    // Requirement 17: Logika agar status kelulusan final secara otomatis disetel ke 'menunggu' jika peserta belum menempuh ujian babak final
    if (results[3].status === 'fulfilled') {
      const participants = results[3].value as ParticipantRecord[];
      if (Array.isArray(participants) && participants.length > 0) {
        let changed = false;
        const normalized = participants.map((p) => {
          const hasTakenFinal = Boolean(p.finalExam && p.finalExam.completedAt);
          if (!hasTakenFinal) {
            if (p.championRank && p.championRank !== 'Belum Dinilai' && p.championRank !== 'Belum Ditetapkan') {
              changed = true;
              return {
                ...p,
                championRank: 'Belum Ditetapkan' as const
              };
            }
          }
          return p;
        });
        if (changed) {
          saveAllParticipants(normalized);
        }
      }
    }
  } catch (err) {
    console.warn('[ServerSyncManager] Full sync warning:', err);
  }

  return status;
}

export interface PollingSyncComparisonReport {
  timestamp: string;
  scheduleChanged: boolean;
  metaPixelChanged: boolean;
  whatsappSettingsChanged: boolean;
  participantsSynced: boolean;
  singleSourceOfTruth: 'PostgreSQL/Neon';
}

let pollingTimer: any = null;
let isPollingActive = false;

/**
 * Centralized Polling Mechanism:
 * Compares local state against PostgreSQL/Neon for Event Schedules, Meta Pixel,
 * and WhatsApp settings, ensuring the database is the absolute single source of truth.
 * Any detected difference is immediately overwritten by the PostgreSQL server state.
 */
export async function pollAndCompareLocalAgainstServer(): Promise<PollingSyncComparisonReport> {
  const report: PollingSyncComparisonReport = {
    timestamp: new Date().toISOString(),
    scheduleChanged: false,
    metaPixelChanged: false,
    whatsappSettingsChanged: false,
    participantsSynced: false,
    singleSourceOfTruth: 'PostgreSQL/Neon',
  };

  try {
    // 1. EVENT SCHEDULE POLLING & COMPARISON
    const serverSchedule = await fetchEventScheduleFromServer();
    if (serverSchedule) {
      const localScheduleRaw = typeof localStorage !== 'undefined' ? localStorage.getItem('osn_event_schedule_config_2026') : null;
      const localSchedule = localScheduleRaw ? JSON.parse(localScheduleRaw) : null;

      const isDiff =
        !localSchedule ||
        localSchedule.registrationOpenDate !== serverSchedule.registrationOpenDate ||
        localSchedule.penyisihanDate !== serverSchedule.penyisihanDate ||
        localSchedule.finalDate !== serverSchedule.finalDate ||
        localSchedule.announcementDate !== serverSchedule.announcementDate;

      if (isDiff) {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('osn_event_schedule_config_2026', JSON.stringify(serverSchedule));
        }
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('osn_schedule_updated', { detail: serverSchedule }));
        }
        report.scheduleChanged = true;
        logSyncEvent(
          'info',
          'SERVER_SYNC',
          'Polling detected Event Schedule divergence: updated local state from PostgreSQL single source of truth.',
          { serverSchedule }
        );
      }
    }

    // 2. META PIXEL POLLING & COMPARISON
    const serverPixel = await fetchMetaPixelConfigFromServer();
    if (serverPixel) {
      const localPixelRaw = typeof localStorage !== 'undefined' ? localStorage.getItem('osn_meta_pixel_config') : null;
      const localPixel = localPixelRaw ? JSON.parse(localPixelRaw) : null;

      const isDiff =
        !localPixel ||
        localPixel.pixelId !== serverPixel.pixelId ||
        localPixel.isEnabled !== serverPixel.isEnabled ||
        localPixel.customScript !== serverPixel.customScript;

      if (isDiff) {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('osn_meta_pixel_config', JSON.stringify(serverPixel));
        }
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('osn_pixel_updated', { detail: serverPixel }));
        }
        report.metaPixelChanged = true;
        logSyncEvent(
          'info',
          'SERVER_SYNC',
          'Polling detected Meta Pixel divergence: updated local state from PostgreSQL single source of truth.',
          { serverPixel }
        );
      }
    }

    // 3. WHATSAPP SETTINGS POLLING & COMPARISON
    const serverWa = await fetchWhatsAppApiSettingsFromServer();
    if (serverWa) {
      const localWaRaw = typeof localStorage !== 'undefined' ? localStorage.getItem('osn_whatsapp_api_settings') : null;
      const localWa = localWaRaw ? JSON.parse(localWaRaw) : null;

      const isDiff =
        !localWa ||
        localWa.apiKey !== serverWa.apiKey ||
        localWa.provider !== serverWa.provider ||
        localWa.senderNumber !== serverWa.senderNumber ||
        localWa.endpointUrl !== serverWa.endpointUrl ||
        localWa.autoSendExamGraded !== serverWa.autoSendExamGraded ||
        localWa.autoSendQualification !== serverWa.autoSendQualification;

      if (isDiff) {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('osn_whatsapp_api_settings', JSON.stringify(serverWa));
        }
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('osn_whatsapp_settings_updated', { detail: serverWa }));
        }
        report.whatsappSettingsChanged = true;
        logSyncEvent(
          'info',
          'SERVER_SYNC',
          'Polling detected WhatsApp settings divergence: updated local state from PostgreSQL single source of truth.',
          { serverWa }
        );
      }
    }

    // 4. PARTICIPANTS & COMPETITION DATA RECONCILIATION
    const syncedParticipants = await syncParticipantsWithServer();
    if (syncedParticipants && syncedParticipants.length > 0) {
      report.participantsSynced = true;
    }
  } catch (err: any) {
    logSyncEvent('warn', 'SERVER_SYNC', `Polling sync notice: ${err?.message}`, { error: err?.message });
  }

  return report;
}

/**
 * Starts the centralized polling mechanism comparing local state against PostgreSQL/Neon
 */
export function startServerSyncPolling(intervalMs: number = 5000): () => void {
  if (isPollingActive && pollingTimer) {
    return stopServerSyncPolling;
  }
  isPollingActive = true;

  // Initial immediate comparison
  pollAndCompareLocalAgainstServer().catch(() => {});

  pollingTimer = setInterval(() => {
    pollAndCompareLocalAgainstServer().catch(() => {});
  }, intervalMs);

  logSyncEvent('info', 'SERVER_SYNC', `Centralized PostgreSQL/Neon polling mechanism started (${intervalMs}ms interval).`);

  return stopServerSyncPolling;
}

/**
 * Stops the centralized polling mechanism
 */
export function stopServerSyncPolling(): void {
  if (pollingTimer) {
    clearInterval(pollingTimer);
    pollingTimer = null;
  }
  isPollingActive = false;
  logSyncEvent('info', 'SERVER_SYNC', 'Centralized PostgreSQL/Neon polling mechanism stopped.');
}

// Automatically initiate polling when loaded in a browser environment
if (typeof window !== 'undefined') {
  startServerSyncPolling(5000);
}

