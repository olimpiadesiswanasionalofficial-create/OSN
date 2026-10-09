export interface EventScheduleConfig {
  registrationOpenDate: string;  // e.g. "25 Agustus – 11 September 2026"
  registrationDesc?: string;
  penyisihanDate: string;        // e.g. "12 September 2026"
  penyisihanDesc?: string;
  finalDate: string;             // e.g. "19 September 2026"
  finalDesc?: string;
  announcementDate: string;      // e.g. "20 September 2026"
  announcementDesc?: string;
  updatedAt?: string;
}

const STORAGE_SCHEDULE_KEY = 'osn_event_schedule_config_2026';

export const DEFAULT_EVENT_SCHEDULE: EventScheduleConfig = {
  registrationOpenDate: "25 Agustus – 11 September 2026",
  registrationDesc: "Pendaftaran online mudah & praktis. Terbuka untuk seluruh siswa di Indonesia tanpa kuota zonasi.",
  penyisihanDate: "12 September 2026",
  penyisihanDesc: "Ujian online aman dari rumah via sistem CBT mutakhir anti-kecurangan. Penyisihan GRATIS untuk semua peserta.",
  finalDate: "19 September 2026",
  finalDesc: "Babak penentuan medalis nasional dan perebutan gelar Juara Umum OSN tingkat nasional.",
  announcementDate: "20 September 2026",
  announcementDesc: "Pengumuman resmi juara, penerbitan sertifikat QR-Code & pengiriman paket piala/medali fisik ke alamat pemenang.",
  updatedAt: new Date().toISOString()
};

export function getEventSchedule(): EventScheduleConfig {
  try {
    const raw = localStorage.getItem(STORAGE_SCHEDULE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_SCHEDULE_KEY, JSON.stringify(DEFAULT_EVENT_SCHEDULE));
      return DEFAULT_EVENT_SCHEDULE;
    }
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_EVENT_SCHEDULE,
      ...parsed
    };
  } catch (err) {
    console.error('Failed to parse event schedule:', err);
    return DEFAULT_EVENT_SCHEDULE;
  }
}

export function saveEventSchedule(schedule: Partial<EventScheduleConfig>): EventScheduleConfig {
  try {
    const current = getEventSchedule();
    const updated: EventScheduleConfig = {
      ...current,
      ...schedule,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_SCHEDULE_KEY, JSON.stringify(updated));

    // Also sync to server in background
    fetch('/api/schedule-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schedule: updated })
    }).catch(() => {});

    // Dispatch a custom event so other components (App.tsx, etc.) update reactively
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        try {
          window.dispatchEvent(new CustomEvent('osn_schedule_updated', { detail: updated }));
        } catch {}
      }, 0);
    }

    return updated;
  } catch (err) {
    console.error('Failed to save event schedule:', err);
    return { ...DEFAULT_EVENT_SCHEDULE, ...schedule };
  }
}
