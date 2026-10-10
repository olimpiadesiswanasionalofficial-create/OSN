/**
 * Unified Server-Side Data Synchronization Layer
 * Strictly prioritizes server-side state from PostgreSQL / Neon database,
 * bypassing client-side caching to ensure absolute consistency.
 */

import { fetchEventScheduleFromServer } from './eventScheduleDb.js';
import { fetchMetaPixelConfigFromServer } from './metaPixelService.js';
import { fetchWhatsAppApiSettingsFromServer } from './whatsappApiService.js';
import { syncParticipantsWithServer } from './participantDb.js';
import { syncQuestionsWithServer } from './cbtQuestionsDb.js';

export interface SyncStatusResult {
  schedule: boolean;
  metaPixel: boolean;
  whatsappApi: boolean;
  participants: boolean;
  questions: boolean;
  timestamp: string;
}

/**
 * Perform a full bidirectional server synchronization with cache-busting.
 * Strictly pulls the latest authoritative data from PostgreSQL / Neon.
 */
export async function syncAllWithServer(): Promise<SyncStatusResult> {
  const status: SyncStatusResult = {
    schedule: false,
    metaPixel: false,
    whatsappApi: false,
    participants: false,
    questions: false,
    timestamp: new Date().toISOString(),
  };

  try {
    const results = await Promise.allSettled([
      fetchEventScheduleFromServer(),
      fetchMetaPixelConfigFromServer(),
      fetchWhatsAppApiSettingsFromServer(),
      syncParticipantsWithServer(),
      syncQuestionsWithServer(),
    ]);

    status.schedule = results[0].status === 'fulfilled';
    status.metaPixel = results[1].status === 'fulfilled';
    status.whatsappApi = results[2].status === 'fulfilled';
    status.participants = results[3].status === 'fulfilled';
    status.questions = results[4].status === 'fulfilled';
  } catch (err) {
    console.warn('[ServerSyncManager] Full sync warning:', err);
  }

  return status;
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
