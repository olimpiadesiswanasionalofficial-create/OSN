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

let cachedAccessToken: string | null = null;
let isSigningIn = false;

// Initialize Auth listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else if (!user) {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const signInWithGoogleWorkspace = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Gagal mendapatkan access token Google Workspace.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Workspace sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logoutGoogleWorkspace = async () => {
  await signOut(auth);
  cachedAccessToken = null;
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

  // 2. Prepare Rows
  const headers = [
    'No',
    'No Peserta',
    'Nama Lengkap',
    'Nomor WhatsApp',
    'Jenjang',
    'Bidang Sains',
    'Asal Sekolah',
    'Provinsi',
    'Kab/Kota',
    'Status Ujian',
    'Nilai Terakhir',
    'Tanggal Daftar'
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
    p.cityProvince || '-',
    p.finalExam ? `Final (Skor: ${p.finalExam.score})` : (p.simulatedExam ? `Simulasi (Skor: ${p.simulatedExam.score})` : 'Belum Ujian'),
    p.finalExam ? p.finalExam.score : (p.simulatedExam ? p.simulatedExam.score : '-'),
    p.registeredAt ? new Date(p.registeredAt).toLocaleString('id-ID') : '-'
  ]);

  const values = [headers, ...rows];

  // 3. Append values
  const appendRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED`,
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
