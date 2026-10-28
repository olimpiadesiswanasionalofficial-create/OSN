import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { ParticipantRecord } from './participantDb';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// All required Workspace scopes for Sheets, Contacts, Drive
export const WORKSPACE_SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/spreadsheets.readonly',
  'https://www.googleapis.com/auth/contacts',
  'https://www.googleapis.com/auth/contacts.readonly',
  'https://www.googleapis.com/auth/contacts.other.readonly',
  'https://www.googleapis.com/auth/directory.readonly',
  'https://www.googleapis.com/auth/user.phonenumbers.read',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.metadata.readonly'
];

const provider = new GoogleAuthProvider();
WORKSPACE_SCOPES.forEach(scope => provider.addScope(scope));
provider.setCustomParameters({ prompt: 'select_account' });

const STORAGE_TOKEN_KEY = 'osn_google_workspace_access_token';
const STORAGE_USER_KEY = 'osn_google_workspace_user_profile';

let cachedAccessToken: string | null = (typeof window !== 'undefined' ? sessionStorage.getItem(STORAGE_TOKEN_KEY) || localStorage.getItem(STORAGE_TOKEN_KEY) : null);
let isSigningIn = false;

export function getStoredGoogleSession(): { user: any; token: string } | null {
  if (typeof window === 'undefined') return null;
  const token = sessionStorage.getItem(STORAGE_TOKEN_KEY) || localStorage.getItem(STORAGE_TOKEN_KEY);
  const userRaw = sessionStorage.getItem(STORAGE_USER_KEY) || localStorage.getItem(STORAGE_USER_KEY);
  if (token && userRaw) {
    try {
      return { user: JSON.parse(userRaw), token };
    } catch {}
  }
  return null;
}

export function saveStoredGoogleSession(user: any, token: string): void {
  if (typeof window === 'undefined') return;
  cachedAccessToken = token;
  sessionStorage.setItem(STORAGE_TOKEN_KEY, token);
  sessionStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
  localStorage.setItem(STORAGE_TOKEN_KEY, token);
  localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
}

export function clearStoredGoogleSession(): void {
  if (typeof window === 'undefined') return;
  cachedAccessToken = null;
  sessionStorage.removeItem(STORAGE_TOKEN_KEY);
  sessionStorage.removeItem(STORAGE_USER_KEY);
  localStorage.removeItem(STORAGE_TOKEN_KEY);
  localStorage.removeItem(STORAGE_USER_KEY);
}

// Initialize Auth listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else if (!user) {
      const stored = getStoredGoogleSession();
      if (!stored && onAuthFailure) {
        onAuthFailure();
      }
    }
  });
};

export const setCustomAccessToken = (token: string, profile?: { displayName: string; email: string }): { user: any; accessToken: string } => {
  const dummyUser = {
    displayName: profile?.displayName || 'Admin Panitia Google',
    email: profile?.email || 'admin.workspace@osn-pusat.org',
    photoURL: ''
  };
  saveStoredGoogleSession(dummyUser, token);
  return { user: dummyUser, accessToken: token };
};

export const signInWithGoogleWorkspace = async (): Promise<{ user: User | any; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Gagal mendapatkan access token Google Workspace dari penyedia otentikasi.');
    }
    const token = credential.accessToken;
    saveStoredGoogleSession({
      displayName: result.user.displayName || result.user.email,
      email: result.user.email,
      photoURL: result.user.photoURL
    }, token);
    return { user: result.user, accessToken: token };
  } catch (error: any) {
    console.error('Google Workspace sign in error:', error);
    const code = error?.code || '';
    if (code === 'auth/popup-blocked') {
      throw new Error('Jendela popup otorisasi Google diblokir peramban. Mohon izinkan popup untuk situs ini atau gunakan token akses.');
    } else if (code === 'auth/cancelled-popup-request' || code === 'auth/popup-closed-by-user') {
      throw new Error('Proses login Google dibatalkan oleh pengguna.');
    } else if (code === 'auth/unauthorized-domain') {
      throw new Error('Domain https://osn-one.vercel.app perlu ditambahkan ke Firebase Console > Authentication > Settings > Authorized Domains (atau Google Cloud Console OAuth Authorized JavaScript Origins: https://osn-one.vercel.app). Anda juga dapat langsung menggunakan opsi tempel Access Token Google Workspace di bawah.');
    }
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  if (cachedAccessToken) return cachedAccessToken;
  const stored = getStoredGoogleSession();
  if (stored) {
    cachedAccessToken = stored.token;
    return stored.token;
  }
  return null;
};

export const logoutGoogleWorkspace = async () => {
  try {
    await signOut(auth);
  } catch {}
  clearStoredGoogleSession();
};

// ---------------- Google Sheets Integration ----------------
export interface GoogleSheetInfo {
  spreadsheetId: string;
  spreadsheetUrl: string;
  title: string;
}

export async function exportParticipantsToGoogleSheet(
  participants: ParticipantRecord[],
  sheetTitle: string = `Data Peserta OSN 2026 - ${new Date().toLocaleDateString('id-ID')}`
): Promise<GoogleSheetInfo> {
  const token = await getAccessToken();
  if (!token) throw new Error('Silakan Sign in dengan Google terlebih dahulu.');

  // 1. Create Spreadsheet in Google Sheets
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: { title: sheetTitle }
    })
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Gagal membuat Google Sheet baru.');
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;
  const spreadsheetUrl = sheetData.spreadsheetUrl;
  const firstSheetTitle = sheetData.sheets?.[0]?.properties?.title || 'Sheet1';

  // 2. Prepare Detailed Rows
  const headers = [
    'No',
    'No Peserta',
    'Nama Lengkap',
    'Nomor WhatsApp',
    'Jenjang Kategori',
    'Mata Pelajaran',
    'Asal Sekolah',
    'Kabupaten / Kota',
    'Alamat Lengkap',
    'Nama Wali Murid',
    'Email Wali',
    'Status CBT',
    'Nilai Simulasi',
    'Nilai Penyisihan',
    'Nilai Final',
    'Status Kelulusan',
    'Status Tiket Final (Closing)',
    'Rekomendasi Juara',
    'Juara Ditetapkan Admin',
    'Tanggal Terdaftar'
  ];

  const rows = participants.map((p, idx) => [
    idx + 1,
    p.id || '-',
    p.fullName || '-',
    p.whatsapp || '-',
    p.level || '-',
    p.subjects ? p.subjects.join(', ') : 'Matematika',
    p.schoolName || '-',
    p.cityProvince || '-',
    p.fullAddress || '-',
    p.parentName || '-',
    p.email || '-',
    p.cbtStatus || 'Aktif & Siap Ujian',
    p.simulatedExam ? p.simulatedExam.score : '-',
    p.penyisihanExam ? p.penyisihanExam.score : '-',
    p.finalExam ? p.finalExam.score : '-',
    p.qualificationStatus === 'lolos' ? 'LOLOS FINAL' : (p.qualificationStatus === 'tidak_lolos' ? 'TIDAK LOLOS' : 'MENUNGGU HASIL'),
    p.finalTicketPaymentStatus === 'paid_closing' ? 'LUNAS (RP 99.000)' : 'BELUM BAYAR',
    p.recommendedChampionRank || '-',
    p.championRank || 'Belum Ditetapkan',
    p.registeredAt ? new Date(p.registeredAt).toLocaleString('id-ID') : '-'
  ]);

  const values = [headers, ...rows];

  // 3. Append values to the resolved sheet
  const appendRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(firstSheetTitle)}!A1:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ values })
    }
  );

  if (!appendRes.ok) {
    const err = await appendRes.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Gagal memasukkan data ke Google Sheet.');
  }

  return {
    spreadsheetId,
    spreadsheetUrl,
    title: sheetTitle
  };
}

// ---------------- Google Drive Integration ----------------
export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  createdTime?: string;
  size?: string;
}

export async function listDriveFiles(pageSize: number = 15): Promise<GoogleDriveFile[]> {
  const token = await getAccessToken();
  if (!token) throw new Error('Silakan Sign in dengan Google terlebih dahulu.');

  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files?pageSize=${pageSize}&fields=files(id,name,mimeType,webViewLink,createdTime,size)&orderBy=modifiedTime desc`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Gagal memuat file Google Drive.');
  }

  const data = await res.json();
  return data.files || [];
}

export async function uploadTextFileToDrive(
  fileName: string,
  content: string,
  mimeType: string = 'text/plain'
): Promise<GoogleDriveFile> {
  const token = await getAccessToken();
  if (!token) throw new Error('Silakan Sign in dengan Google terlebih dahulu.');

  const metadata = {
    name: fileName,
    mimeType: mimeType
  };

  const form = new FormData();
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  );
  form.append('file', new Blob([content], { type: mimeType }));

  const res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: form
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Gagal mengupload file ke Google Drive.');
  }

  return await res.json();
}

// ---------------- Google Contacts (People API) Integration ----------------
export interface GoogleContactPerson {
  resourceName?: string;
  displayName: string;
  phoneNumber?: string;
  email?: string;
}

export async function listGoogleContacts(): Promise<GoogleContactPerson[]> {
  const token = await getAccessToken();
  if (!token) throw new Error('Silakan Sign in dengan Google terlebih dahulu.');

  const res = await fetch(
    'https://people.googleapis.com/v1/people/me/connections?personFields=names,phoneNumbers,emailAddresses&pageSize=100',
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Gagal memuat kontak dari Google Contacts.');
  }

  const data = await res.json();
  const connections = data.connections || [];

  return connections.map((c: any) => ({
    resourceName: c.resourceName,
    displayName: c.names?.[0]?.displayName || 'Tanpa Nama',
    phoneNumber: c.phoneNumbers?.[0]?.value || '',
    email: c.emailAddresses?.[0]?.value || ''
  }));
}

export async function syncParticipantToGoogleContacts(p: ParticipantRecord): Promise<void> {
  const token = await getAccessToken();
  if (!token) throw new Error('Silakan Sign in dengan Google terlebih dahulu.');

  const cleanPhone = (p.whatsapp || '').replace(/[^0-9]/g, '');
  const formattedPhone = cleanPhone.startsWith('0') ? '+62' + cleanPhone.slice(1) : (cleanPhone.startsWith('62') ? '+' + cleanPhone : cleanPhone);

  const contactPayload = {
    names: [
      {
        givenName: p.fullName,
        familyName: `[OSN ${p.level ? p.level.split(' ')[0] : 'Siswa'}]`
      }
    ],
    phoneNumbers: formattedPhone ? [{ value: formattedPhone, type: 'mobile' }] : [],
    organizations: p.schoolName
      ? [
          {
            name: p.schoolName,
            title: `Peserta OSN - ${p.subjects ? p.subjects.join(', ') : 'Sains'} (${p.cityProvince || ''})`
          }
        ]
      : []
  };

  const res = await fetch('https://people.googleapis.com/v1/people:createContact', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contactPayload)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Gagal menambahkan kontak ke Google Contacts.');
  }
}

/**
 * Unduh langsung data peserta dalam format CSV berstandar Google Sheets / Excel
 * dengan UTF-8 BOM agar langsung rapi saat dibuka di Google Drive / Google Sheets.
 */
export function exportParticipantsToGoogleSheetsCsv(
  participants: ParticipantRecord[],
  filenamePrefix: string = 'Data_Peserta_GoogleSheets_OSN2026'
): void {
  const headers = [
    'No',
    'No Peserta',
    'Nama Lengkap',
    'Nomor WhatsApp',
    'Jenjang Kategori',
    'Mata Pelajaran',
    'Asal Sekolah',
    'Kabupaten / Kota',
    'Alamat Lengkap',
    'Nama Wali Murid',
    'Email Wali',
    'Status CBT',
    'Nilai Simulasi',
    'Nilai Penyisihan',
    'Nilai Final',
    'Status Kelulusan',
    'Status Tiket Final (Closing)',
    'Juara / Medali',
    'Tanggal Terdaftar'
  ];

  const rows = participants.map((p, idx) => [
    idx + 1,
    p.id || '',
    p.fullName || '',
    p.whatsapp ? `'${p.whatsapp}` : '', // prefix single quote so Sheets keeps 0 / +62
    p.level || '',
    p.subjects ? p.subjects.join('; ') : 'Matematika',
    p.schoolName || '',
    p.cityProvince || '',
    p.fullAddress || '',
    p.parentName || '',
    p.email || '',
    p.cbtStatus || '',
    p.simulatedExam ? p.simulatedExam.score : '',
    p.penyisihanExam ? p.penyisihanExam.score : '',
    p.finalExam ? p.finalExam.score : '',
    p.qualificationStatus === 'lolos' ? 'LOLOS FINAL' : (p.qualificationStatus === 'tidak_lolos' ? 'TIDAK LOLOS' : 'MENUNGGU HASIL'),
    p.finalTicketPaymentStatus === 'paid_closing' ? 'LUNAS (RP 99.000)' : 'BELUM BAYAR',
    p.championRank || 'Belum Ditetapkan',
    p.registeredAt ? new Date(p.registeredAt).toLocaleString('id-ID') : ''
  ]);

  const csvContent = [
    headers.map(h => `"${String(h).replace(/"/g, '""')}"`).join(','),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  ].join('\r\n');

  // Add UTF-8 BOM so Google Sheets and Excel detect UTF-8 characters automatically
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filenamePrefix}_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ---------------- Google Form & Spreadsheet Live Sync API ----------------
export interface GoogleSyncConfig {
  isEnabled: boolean;
  autoSyncOnRegistration: boolean;
  autoSyncGoogleForm: boolean;
  autoSyncSpreadsheet: boolean;
  googleFormUrl: string;
  googleFormViewUrl: string;
  googleSpreadsheetId: string;
  googleSpreadsheetUrl: string;
  googleAppsScriptUrl?: string;
  fieldMappings: {
    fullName: string;
    whatsapp: string;
    level: string;
    schoolName: string;
    cityProvince: string;
    subjects: string;
    parentName: string;
    email: string;
  };
  lastSyncedAt?: string | null;
  totalSynced: number;
}

export interface GoogleSyncLog {
  id: string;
  timestamp: string;
  participantId: string;
  participantName: string;
  whatsapp: string;
  target: 'google_form' | 'google_spreadsheet' | 'both';
  status: 'success' | 'warning' | 'error';
  details: string;
  sourceIp?: string;
  device?: string;
}

export async function fetchGoogleSyncConfig(): Promise<GoogleSyncConfig | null> {
  try {
    const res = await fetch(`/api/google-sync/config?_t=${Date.now()}`);
    if (res.ok) {
      const json = await res.json();
      if (json && json.success) return json.data;
    }
  } catch (err) {
    console.warn('Failed to fetch Google sync config:', err);
  }
  return null;
}

export async function saveGoogleSyncConfigToServer(config: Partial<GoogleSyncConfig>): Promise<GoogleSyncConfig | null> {
  try {
    const res = await fetch('/api/google-sync/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.success) return json.data;
    }
  } catch (err) {
    console.warn('Failed to save Google sync config:', err);
  }
  return null;
}

export async function fetchGoogleSyncLogs(): Promise<GoogleSyncLog[]> {
  try {
    const res = await fetch(`/api/google-sync/logs?_t=${Date.now()}`);
    if (res.ok) {
      const json = await res.json();
      if (json && json.success) return json.data;
    }
  } catch (err) {
    console.warn('Failed to fetch Google sync logs:', err);
  }
  return [];
}

export async function triggerGoogleSyncTest(sampleData?: any): Promise<{ success: boolean; message: string; result?: any }> {
  try {
    const res = await fetch('/api/google-sync/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sampleData || {})
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Gagal menghubungi server sync.' };
  }
}

export async function triggerGoogleSyncAll(): Promise<{ success: boolean; message: string; totalSynced?: number }> {
  try {
    const res = await fetch('/api/google-sync/sync-all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Gagal sinkronisasi massal.' };
  }
}


