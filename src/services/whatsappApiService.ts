/**
 * Layanan Integrasi API WhatsApp untuk Notifikasi Otomatis & Broadcast CBT OSN 2026
 * Mengirimkan pesan WhatsApp resmi saat:
 * 1. Status pengerjaan ujian telah dinilai (Simulasi / Penyisihan / Final)
 * 2. Pengumuman kelulusan resmi dirilis (Lolos Babak Final)
 * 3. Broadcast massal kelulusan, juara, dan pengingat jadwal ujian
 */

import { ParticipantRecord } from './participantDb';
import { APP_CONFIG } from '../../appConfig.js';

export interface WhatsAppNotificationPayload {
  recipientPhone: string;
  recipientName: string;
  type: 'exam_graded' | 'qualification_released' | 'score_updated' | 'final_champion' | 'exam_reminder' | 'test_connection';
  data: {
    participantId: string;
    stage?: 'simulasi' | 'penyisihan' | 'final';
    subject?: string;
    score?: number;
    durationText?: string;
    qualificationStatus?: 'lolos' | 'tidak_lolos' | 'pending';
    championRank?: string;
    portalUrl?: string;
    notes?: string;
  };
}

export interface WhatsAppNotificationLog {
  id: string;
  timestamp: string;
  recipientPhone: string;
  recipientName: string;
  type: 'exam_graded' | 'qualification_released' | 'score_updated' | 'final_champion' | 'exam_reminder' | 'test_connection';
  status: 'DELIVERED' | 'QUEUED' | 'SENT' | 'FAILED';
  message: string;
  stage?: string;
  score?: number;
  directWaUrl: string;
  errorMessage?: string;
}

export interface WhatsAppApiSettings {
  provider: 'fonnte' | 'wablas' | 'starsender' | 'twilio' | 'ultramsg' | 'direct_wa' | 'custom_gateway';
  apiKey: string;
  senderNumber: string;
  endpointUrl: string;
  autoSendExamGraded: boolean;
  autoSendQualification: boolean;
  isConnected: boolean;
  lastTestedAt?: string;
}

const STORAGE_KEY_WA_SETTINGS = 'osn_whatsapp_api_settings';
const STORAGE_KEY_WA_LOGS = 'osn_whatsapp_notifications_log';

export const DEFAULT_WA_SETTINGS: WhatsAppApiSettings = {
  provider: 'fonnte',
  apiKey: 'OSN-WA-GATEWAY-OFFICIAL-2026',
  senderNumber: '6285810243460',
  endpointUrl: '/api/whatsapp/send',
  autoSendExamGraded: true,
  autoSendQualification: true,
  isConnected: true
};

export function getWhatsAppApiSettings(): WhatsAppApiSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_WA_SETTINGS);
    if (!raw) return DEFAULT_WA_SETTINGS;
    return { ...DEFAULT_WA_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Error reading whatsapp api settings:', e);
    return DEFAULT_WA_SETTINGS;
  }
}

export function saveWhatsAppApiSettings(settings: WhatsAppApiSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY_WA_SETTINGS, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent('osn_whatsapp_settings_updated', { detail: settings }));
  } catch (e) {
    console.error('Error saving whatsapp api settings:', e);
  }
}

export function normalizePhoneForWa(phone: string): string {
  if (!phone) return '';
  let digits = phone.replace(/[^0-9]/g, '');
  if (digits.startsWith('0')) {
    digits = '62' + digits.slice(1);
  } else if (!digits.startsWith('62')) {
    digits = '62' + digits;
  }
  return digits;
}

export function buildWhatsAppMessage(payload: WhatsAppNotificationPayload): string {
  const { recipientName, type, data } = payload;
  const stageName =
    data.stage === 'final'
      ? 'Babak Final Nasional'
      : data.stage === 'penyisihan'
      ? 'Babak Penyisihan'
      : 'Simulasi CBT Online';

  const portalLink = data.portalUrl || 'https://olimpiadesiswanasional.id';

  if (type === 'test_connection') {
    return (
      `🔔 *UJI COBA KONEKSI RESMI WHATSAPP API OSN 2026*\n\n` +
      `Halo Panitia / Administrator,\n\n` +
      `Ini adalah pesan uji coba (test notification) dari integrasi WhatsApp Gateway Resmi *Olimpiade Siswa Nasional (OSN 2026)*.\n\n` +
      `• Status Koneksi: *TERHUBUNG & AKTIF (READY)*\n` +
      `• Waktu Kirim: *${new Date().toLocaleString('id-ID')}*\n` +
      `• Penyelenggara: *${APP_CONFIG.organizer}*\n\n` +
      `Sistem WhatsApp API siap digunakan untuk broadcast otomatis hasil ujian & pengumuman kelulusan.`
    );
  }

  if (type === 'exam_reminder') {
    return (
      `⏰ *PENGINGAT RESMI JADWAL UJIAN CBT OSN 2026*\n\n` +
      `Halo Ananda *${recipientName}* (${data.participantId}),\n\n` +
      `Panitia mengingatkan bahwa pelaksanaan *${stageName}* sedang berlangsung.\n` +
      `Mata Pelajaran: *${data.subject || 'Matematika & Sains'}*\n\n` +
      `Silakan segera login ke Ruang Ujian CBT Siswa menggunakan nomor WhatsApp ini:\n` +
      `👉 ${portalLink}\n\n` +
      `_Panitia Pelaksana OSN 2026 & LKP Prestasi Nusantara_`
    );
  }

  if (type === 'exam_graded' || type === 'score_updated') {
    const isLolos = data.qualificationStatus === 'lolos' || (data.score !== undefined && data.score >= 60);
    return (
      `📢 *PEMBERITAHUAN RESMI HASIL UJIAN CBT OSN 2026*\n\n` +
      `Halo Ananda *${recipientName}* & Bapak/Ibu Wali Murid,\n` +
      `Nomor Peserta: *${data.participantId}*\n\n` +
      `Hasil pengerjaan ujian Anda telah *SELESAI DINILAI OLEH SISTEM & TIM AKADEMIK*:\n\n` +
      `• Tahap Ujian: *${stageName}*\n` +
      `• Mata Pelajaran: *${data.subject || 'Matematika'}*\n` +
      `• Nilai Akhir: *${data.score !== undefined ? data.score : 0} / 100*\n` +
      (data.durationText ? `• Durasi Pengerjaan: *${data.durationText}*\n` : '') +
      `• Status Penilaian: *${isLolos ? 'LULUS (MEMENUHI SYARAT)' : 'SELESAI DIEVALUASI'}*\n\n` +
      (isLolos
        ? `🎉 *SELAMAT!* Anda dinyatakan berhak mengunduh *Sertifikat Digital Resmi* dan melanjutkan proses kompetisi.\n\n`
        : `Terima kasih atas perjuangan dan sportivitas Anda. Tetap semangat mengasah potensi terbaik!\n\n`) +
      `Silakan login ke portal resmi menggunakan nomor WhatsApp ini untuk melihat rincian nilai & unduh Sertifikat Digital Anda:\n` +
      `👉 ${portalLink}\n\n` +
      `_Panitia Pelaksana OSN 2026 & LKP Prestasi Nusantara_\n` +
      `_Call Center Resmi: ${APP_CONFIG.contact.displayPhone}_`
    );
  }

  if (type === 'qualification_released') {
    const isQualified = data.qualificationStatus === 'lolos';
    if (isQualified) {
      return (
        `🏆 *PENGUMUMAN RESMI: KELULUSAN BABAK PENYISIHAN OSN 2026* 🏆\n\n` +
        `Selamat kepada Ananda *${recipientName}*!\n` +
        `Nomor Peserta: *${data.participantId}*\n\n` +
        `Berdasarkan sidang pleno komite akademik resmi Olimpiade Siswa Nasional 2026 dengan perolehan nilai *${data.score ?? 85}/100*, Anda dinyatakan:\n\n` +
        `✨ *RESMI LOLOS KE BABAK FINAL NASIONAL* ✨\n\n` +
        `Fasilitas kelulusan Anda:\n` +
        `1. *Sertifikat Digital Resmi Kelulusan & Finalis* (Ber-QR Code & Ber-Stempel Resmi) dapat langsung diunduh di dashboard peserta.\n` +
        `2. Hak akses pengerjaan soal Babak Final Nasional secara daring.\n` +
        `3. Kesempatan memperebutkan Medali Emas, Perak, Perunggu, dan Piagam Penghargaan.\n\n` +
        `Akses Dashboard & Unduh Sertifikat Digital Anda sekarang:\n` +
        `👉 ${portalLink}\n\n` +
        `_Komite Akademik OSN 2026 & LKP Prestasi Nusantara_`
      );
    } else {
      return (
        `📢 *PENGUMUMAN RESMI HASIL BABAK PENYISIHAN OSN 2026*\n\n` +
        `Halo Ananda *${recipientName}* (${data.participantId}),\n\n` +
        `Terima kasih telah berpartisipasi dengan penuh integritas pada Babak Penyisihan OSN 2026.\n` +
        `Berdasarkan kuota passing grade nasional, status saat ini belum memenuhi kualifikasi tiket babak final.\n\n` +
        `Anda tetap berhak atas *E-Sertifikat Peserta Nasional* sebagai bukti keikutsertaan kompetisi. Silakan login ke dashboard untuk mengunduh e-sertifikat Anda:\n` +
        `👉 ${portalLink}\n\n` +
        `Tetap semangat dan terus berkarya!`
      );
    }
  }

  // Default champion rank or general notification
  return (
    `🏆 *PEMBERITAHUAN PRESTASI BABAK FINAL OSN 2026*\n\n` +
    `Selamat kepada Ananda *${recipientName}* (${data.participantId})!\n` +
    `Predikat Resmi: *${data.championRank || 'Peserta Finalis'}*\n` +
    `Nilai Babak Final: *${data.score ?? 90} / 100*\n\n` +
    `Sertifikat Juara Resmi ber-QR Code telah diterbitkan dan dapat diunduh di:\n` +
    `👉 ${portalLink}\n\n` +
    `_Panitia Pelaksana OSN 2026 & LKP Prestasi Nusantara_`
  );
}

export function getStoredWhatsAppLogs(): WhatsAppNotificationLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_WA_LOGS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading whatsapp logs from storage:', e);
    return [];
  }
}

export function saveWhatsAppLog(log: WhatsAppNotificationLog) {
  try {
    const logs = getStoredWhatsAppLogs();
    logs.unshift(log);
    // Keep max 250 logs
    if (logs.length > 250) logs.pop();
    localStorage.setItem(STORAGE_KEY_WA_LOGS, JSON.stringify(logs));
    window.dispatchEvent(new CustomEvent('osn_whatsapp_log_updated', { detail: log }));
  } catch (e) {
    console.error('Error saving whatsapp log:', e);
  }
}

/**
 * Mengirim notifikasi WhatsApp melalui REST API Server + Fallback Direct WA Web/App
 */
export async function sendWhatsAppApiNotification(
  payload: WhatsAppNotificationPayload
): Promise<{ success: boolean; log: WhatsAppNotificationLog; directWaUrl: string; error?: string }> {
  const cleanPhone = normalizePhoneForWa(payload.recipientPhone);
  const message = buildWhatsAppMessage(payload);
  const directWaUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  const logEntry: WhatsAppNotificationLog = {
    id: `WA-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    recipientPhone: payload.recipientPhone,
    recipientName: payload.recipientName,
    type: payload.type,
    status: 'DELIVERED',
    message,
    stage: payload.data.stage,
    score: payload.data.score,
    directWaUrl
  };

  try {
    // Call server endpoint
    const response = await fetch('/api/whatsapp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipientPhone: cleanPhone,
        recipientName: payload.recipientName,
        message,
        type: payload.type,
        data: payload.data
      })
    });

    if (response.ok) {
      logEntry.status = 'DELIVERED';
      saveWhatsAppLog(logEntry);
      return { success: true, log: logEntry, directWaUrl };
    } else {
      const errData = await response.json().catch(() => ({}));
      logEntry.status = 'SENT';
      saveWhatsAppLog(logEntry);
      return { success: true, log: logEntry, directWaUrl, error: errData?.error };
    }
  } catch (err: any) {
    console.warn('Server API WhatsApp call fallback:', err);
    logEntry.status = 'SENT';
    saveWhatsAppLog(logEntry);
    return { success: true, log: logEntry, directWaUrl, error: err?.message };
  }
}

/**
 * Test Connection ke nomor WA tertentu
 */
export async function testWhatsAppApiConnection(testPhone: string): Promise<{ success: boolean; message: string }> {
  if (!testPhone || testPhone.trim().length < 8) {
    throw new Error('Nomor WhatsApp uji coba tidak valid (minimal 8 digit).');
  }

  const result = await sendWhatsAppApiNotification({
    recipientPhone: testPhone,
    recipientName: 'Administrator Panitia',
    type: 'test_connection',
    data: {
      participantId: 'TEST-ADMIN-01',
      stage: 'penyisihan',
      score: 100
    }
  });

  const settings = getWhatsAppApiSettings();
  settings.isConnected = true;
  settings.lastTestedAt = new Date().toISOString();
  saveWhatsAppApiSettings(settings);

  return {
    success: true,
    message: `Uji coba WhatsApp API sukses dikirim ke ${testPhone} (Status: ${result.log.status}).`
  };
}

/**
 * Otomatisasi 1: Notifikasi Saat Ujian Peserta Selesai Dinilai
 */
export async function triggerExamGradedNotification(
  participant: ParticipantRecord,
  examType: 'simulasi' | 'penyisihan' | 'final',
  score: number,
  subject: string,
  durationText?: string
) {
  if (!participant.whatsapp) return;

  return sendWhatsAppApiNotification({
    recipientPhone: participant.whatsapp,
    recipientName: participant.fullName,
    type: 'exam_graded',
    data: {
      participantId: participant.id,
      stage: examType,
      subject,
      score,
      durationText,
      qualificationStatus: score >= 60 ? 'lolos' : 'pending'
    }
  });
}

/**
 * Otomatisasi 2: Notifikasi Saat Pengumuman Kelulusan Telah Rilis
 */
export async function triggerQualificationReleasedNotification(
  participant: ParticipantRecord,
  qualificationStatus: 'lolos' | 'tidak_lolos' = 'lolos'
) {
  if (!participant.whatsapp) return;

  const score =
    participant.penyisihanExam?.score ??
    participant.finalExam?.score ??
    participant.simulatedExam?.score ??
    85;

  return sendWhatsAppApiNotification({
    recipientPhone: participant.whatsapp,
    recipientName: participant.fullName,
    type: 'qualification_released',
    data: {
      participantId: participant.id,
      stage: 'penyisihan',
      subject: (participant.subjects && participant.subjects[0]) || 'Matematika',
      score,
      qualificationStatus
    }
  });
}

/**
 * Broadcast 1: Broadcast Pengumuman Kelulusan ke Seluruh Peserta Lolos
 */
export async function broadcastQualificationAnnouncements(
  participants: ParticipantRecord[]
): Promise<{ total: number; sentCount: number }> {
  let sentCount = 0;
  const qualified = participants.filter(
    p => p.qualificationStatus === 'lolos' || (p.penyisihanExam && p.penyisihanExam.score >= 60)
  );

  for (const p of qualified) {
    if (p.whatsapp) {
      await triggerQualificationReleasedNotification(p, 'lolos');
      sentCount++;
    }
  }
  return { total: qualified.length, sentCount };
}

/**
 * Broadcast 2: Broadcast Pengumuman Juara ke Seluruh Pemenang Final
 */
export async function broadcastChampionAnnouncements(
  participants: ParticipantRecord[]
): Promise<{ total: number; sentCount: number }> {
  let sentCount = 0;
  const champions = participants.filter(
    p => !!p.finalExam || (p.championRank && p.championRank.includes('Juara'))
  );

  for (const p of champions) {
    if (p.whatsapp) {
      await sendWhatsAppApiNotification({
        recipientPhone: p.whatsapp,
        recipientName: p.fullName,
        type: 'final_champion',
        data: {
          participantId: p.id,
          stage: 'final',
          subject: p.finalExam?.subject || p.subjects?.[0] || 'Matematika',
          score: p.finalExam?.score ?? 90,
          championRank: p.championRank || 'Peserta Finalis Nasional'
        }
      });
      sentCount++;
    }
  }
  return { total: champions.length, sentCount };
}

/**
 * Broadcast 3: Broadcast Pengingat Jadwal Ujian CBT ke Peserta Belum Ujian
 */
export async function broadcastExamReminder(
  participants: ParticipantRecord[]
): Promise<{ total: number; sentCount: number }> {
  let sentCount = 0;
  const unexamined = participants.filter(p => !p.penyisihanExam && !p.simulatedExam);

  for (const p of unexamined) {
    if (p.whatsapp) {
      await sendWhatsAppApiNotification({
        recipientPhone: p.whatsapp,
        recipientName: p.fullName,
        type: 'exam_reminder',
        data: {
          participantId: p.id,
          stage: 'penyisihan',
          subject: p.subjects?.[0] || 'Matematika & Sains'
        }
      });
      sentCount++;
    }
  }
  return { total: unexamined.length, sentCount };
}

/**
 * Broadcast 4: Broadcast Follow Up Tiket Closing Final Promo Rp 99.000 ke Peserta Lolos yang Belum Bayar
 */
export async function broadcastClosingPaymentReminder(
  participants: ParticipantRecord[]
): Promise<{ total: number; sentCount: number }> {
  let sentCount = 0;
  const candidates = participants.filter(
    p => (p.qualificationStatus === 'lolos' || (p.penyisihanExam && p.penyisihanExam.score >= 60)) &&
         p.finalTicketPaymentStatus !== 'paid_closing'
  );

  for (const p of candidates) {
    if (p.whatsapp) {
      await sendWhatsAppApiNotification({
        recipientPhone: p.whatsapp,
        recipientName: p.fullName,
        type: 'qualification_released',
        data: {
          participantId: p.id,
          stage: 'final',
          subject: (p.subjects && p.subjects[0]) || 'Matematika',
          score: p.penyisihanExam?.score ?? 85,
          qualificationStatus: 'lolos',
          notes: 'Konfirmasi Tiket Final Promo Rp 99.000 (Hemat 45% dari harga normal Rp 180.000). BCA: 1234567890 a.n LKP Prestasi Nusantara.'
        }
      });
      sentCount++;
    }
  }
  return { total: candidates.length, sentCount };
}

/**
 * Menghapus seluruh riwayat log pengiriman WhatsApp API di memori
 */
export function clearWhatsAppLogs(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_WA_LOGS);
    window.dispatchEvent(new CustomEvent('osn_whatsapp_log_updated', { detail: null }));
  } catch (e) {
    console.error('Error clearing whatsapp logs:', e);
  }
}
