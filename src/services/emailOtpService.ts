// Layanan Verifikasi Email dengan Kode OTP 6 Digit untuk Pendaftaran Peserta OSN 2026
// Mencegah pendaftaran fiktif dan memastikan keabsahan email peserta / wali murid

export interface OtpRecord {
  email: string;
  code: string;
  createdAt: number;
  expiresAt: number;
}

const STORAGE_KEY_OTP = 'osn_email_otp_cache';
const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 menit

export function generateAndSendEmailOtp(email: string): { success: boolean; code?: string; message: string } {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
    return {
      success: false,
      message: 'Format alamat email tidak valid.'
    };
  }

  // Buat kode 6 digit numerik unik
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const now = Date.now();

  const record: OtpRecord = {
    email: cleanEmail,
    code,
    createdAt: now,
    expiresAt: now + OTP_EXPIRY_MS
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY_OTP);
    const map: Record<string, OtpRecord> = raw ? JSON.parse(raw) : {};
    map[cleanEmail] = record;
    localStorage.setItem(STORAGE_KEY_OTP, JSON.stringify(map));
  } catch (e) {
    console.error('Failed to store OTP in storage:', e);
  }

  // Simulasi pengiriman email resmi dengan log dan notifikasi
  console.log(`[OSN 2026 OFFICIAL EMAIL GATEWAY] Kode OTP Verifikasi Email untuk ${cleanEmail}: ${code}`);

  return {
    success: true,
    code,
    message: `Kode verifikasi 6-digit telah dikirimkan ke email ${cleanEmail}. Periksa kotak masuk / folder spam Anda.`
  };
}

export function verifyEmailOtp(email: string, inputCode: string): { success: boolean; message: string } {
  const cleanEmail = email.trim().toLowerCase();
  const cleanCode = inputCode.trim();

  if (!cleanCode || cleanCode.length !== 6) {
    return {
      success: false,
      message: 'Kode OTP harus berupa 6 digit angka.'
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY_OTP);
    if (!raw) {
      return {
        success: false,
        message: 'Kode OTP belum diminta atau sudah kedaluwarsa. Silakan kirim ulang kode.'
      };
    }

    const map: Record<string, OtpRecord> = JSON.parse(raw);
    const record = map[cleanEmail];

    if (!record) {
      return {
        success: false,
        message: 'Kode OTP untuk email ini tidak ditemukan. Silakan kirim kode terlebih dahulu.'
      };
    }

    if (Date.now() > record.expiresAt) {
      delete map[cleanEmail];
      localStorage.setItem(STORAGE_KEY_OTP, JSON.stringify(map));
      return {
        success: false,
        message: 'Kode OTP telah kedaluwarsa (berlaku 10 menit). Silakan minta kode baru.'
      };
    }

    if (record.code !== cleanCode) {
      return {
        success: false,
        message: 'Kode verifikasi OTP salah! Pastikan 6 digit angka sesuai.'
      };
    }

    // OTP Valid! Hapus setelah berhasil diverifikasi
    delete map[cleanEmail];
    localStorage.setItem(STORAGE_KEY_OTP, JSON.stringify(map));

    return {
      success: true,
      message: 'Email berhasil diverifikasi resmi oleh sistem OSN 2026!'
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Terjadi kesalahan saat memverifikasi OTP.'
    };
  }
}
