import { QuestionItem } from './cbtQuestionTypes';
import { createPenyisihanSvg } from './simulasiSvgIllustrations';

// SOAL RESMI BABAK PENYISIHAN: IPA / SAINS PAUD/TK (Kategori A)
// 20 Soal Pilihan Ganda Kurikulum Campuran (Merdeka, Cambridge, Singapore, IB)
// Tingkat Kesulitan: Menengah | 100% Bergambar & Unik

export const PENYISIHAN_A_IPA: QuestionItem[] = [
  // --- KURIKULUM MERDEKA (Soal 1 - 5) ---
  {
    id: 'PENY-A-IPA-01',
    number: 1,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Panca indra apakah yang kita gunakan untuk mendengarkan kicauan burung di pagi hari?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Panca Indra', 'Indra Pendengaran', '#0284C7',
        `<g transform="translate(60, 20)">
          <!-- Gambar Telinga -->
          <rect x="20" y="20" width="100" height="90" rx="14" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
          <text x="70" y="70" font-size="40" text-anchor="middle">👂</text>
          <text x="70" y="98" font-size="11" font-weight="800" fill="#0369A1" text-anchor="middle">Telinga (A)</text>
          <!-- Gambar Mata -->
          <rect x="135" y="20" width="100" height="90" rx="14" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
          <text x="185" y="70" font-size="40" text-anchor="middle">👁️</text>
          <text x="185" y="98" font-size="11" font-weight="800" fill="#B45309" text-anchor="middle">Mata (B)</text>
          <!-- Gambar Hidung -->
          <rect x="250" y="20" width="100" height="90" rx="14" fill="#FCE7F3" stroke="#DB2777" stroke-width="2"/>
          <text x="300" y="70" font-size="40" text-anchor="middle">👃</text>
          <text x="300" y="98" font-size="11" font-weight="800" fill="#9D174D" text-anchor="middle">Hidung (C)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Telinga (A)' },
      { key: 'B', text: 'Mata (B)' },
      { key: 'C', text: 'Hidung (C)' }
    ],
    correctAnswer: 'A',
    explanation: 'Telinga adalah indra pendengaran yang berfungsi untuk menangkap suara kicauan burung.'
  },
  {
    id: 'PENY-A-IPA-02',
    number: 2,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Manakah bagian tumbuhan yang berada di dalam tanah dan berfungsi menyerap air?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Bagian Tumbuhan', 'Struktur Tanaman & Akar', '#15803D',
        `<g transform="translate(100, 15)">
          <!-- Daun & Batang -->
          <line x1="100" y1="25" x2="100" y2="85" stroke="#15803D" stroke-width="6"/>
          <ellipse cx="80" cy="40" rx="18" ry="10" fill="#4ADE80" stroke="#15803D"/>
          <ellipse cx="120" cy="55" rx="18" ry="10" fill="#4ADE80" stroke="#15803D"/>
          <!-- Garis Tanah -->
          <line x1="20" y1="85" x2="180" y2="85" stroke="#78350F" stroke-width="3"/>
          <text x="175" y="80" font-size="10" font-weight="800" fill="#78350F">Tanah</text>
          <!-- Akar di bawah tanah -->
          <path d="M 100,85 Q 85,110 70,125 M 100,85 Q 100,115 100,135 M 100,85 Q 115,110 130,125" stroke="#B45309" stroke-width="3.5" fill="none"/>
          <text x="100" y="152" font-size="12" font-weight="900" fill="#92400E" text-anchor="middle">Akar Tanaman</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Bunga' },
      { key: 'B', text: 'Daun' },
      { key: 'C', text: 'Akar' }
    ],
    correctAnswer: 'C',
    explanation: 'Akar berada di dalam tanah dan bertugas menyerap air serta zat hara untuk tanaman.'
  },
  {
    id: 'PENY-A-IPA-03',
    number: 3,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Hewan apakah di bawah ini yang hidup dan bernapas di dalam air menggunakan insang?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Habitat Hewan', 'Hewan Air vs Darat', '#0891B2',
        `<g transform="translate(60, 20)">
          <rect x="20" y="20" width="90" height="85" rx="12" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
          <text x="65" y="65" font-size="34" text-anchor="middle">🐟</text>
          <text x="65" y="92" font-size="11" font-weight="800" fill="#0369A1" text-anchor="middle">Ikan (A)</text>
          <rect x="135" y="20" width="90" height="85" rx="12" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
          <text x="180" y="65" font-size="34" text-anchor="middle">🐱</text>
          <text x="180" y="92" font-size="11" font-weight="800" fill="#B45309" text-anchor="middle">Kucing (B)</text>
          <rect x="250" y="20" width="90" height="85" rx="12" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/>
          <text x="295" y="65" font-size="34" text-anchor="middle">🐔</text>
          <text x="295" y="92" font-size="11" font-weight="800" fill="#15803D" text-anchor="middle">Ayam (C)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Ikan (A)' },
      { key: 'B', text: 'Kucing (B)' },
      { key: 'C', text: 'Ayam (C)' }
    ],
    correctAnswer: 'A',
    explanation: 'Ikan hidup di air dan bernapas dengan insang, sedangkan kucing dan ayam hidup di darat.'
  },
  {
    id: 'PENY-A-IPA-04',
    number: 4,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Benda apakah yang menerangi bumi di siang hari dan memberikan rasa hangat bagi tubuh kita?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Benda Langit', 'Matahari di Siang Hari', '#EA580C',
        `<g transform="translate(130, 20)">
          <!-- Matahari ceria -->
          <circle cx="70" cy="55" r="32" fill="#FBBF24" stroke="#EA580C" stroke-width="3"/>
          <circle cx="60" cy="50" r="4" fill="#78350F"/>
          <circle cx="80" cy="50" r="4" fill="#78350F"/>
          <path d="M 58,62 Q 70,72 82,62" stroke="#78350F" stroke-width="2.5" fill="none"/>
          <!-- Sinar matahari -->
          <line x1="70" y1="12" x2="70" y2="0" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
          <line x1="70" y1="98" x2="70" y2="110" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
          <line x1="27" y1="55" x2="15" y2="55" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
          <line x1="113" y1="55" x2="125" y2="55" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Bulan' },
      { key: 'B', text: 'Matahari' },
      { key: 'C', text: 'Bintang' }
    ],
    correctAnswer: 'B',
    explanation: 'Matahari menyinari bumi di waktu siang hari serta memberikan panas dan cahaya alami.'
  },
  {
    id: 'PENY-A-IPA-05',
    number: 5,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Apa yang akan terjadi pada es batu jika diletakkan di tempat yang panas terkena sinar matahari?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Perubahan Benda', 'Es Batu Meleleh', '#0284C7',
        `<g transform="translate(90, 20)">
          <!-- Wadah es -->
          <rect x="20" y="45" width="100" height="60" rx="10" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
          <text x="70" y="80" font-size="28" text-anchor="middle">🧊</text>
          <text x="70" y="125" font-size="11" font-weight="800" fill="#0369A1" text-anchor="middle">Es Batu Padat</text>
          <!-- Panah -->
          <text x="145" y="78" font-size="22" font-weight="900" fill="#EA580C" text-anchor="middle">→</text>
          <text x="145" y="55" font-size="18" text-anchor="middle">☀️</text>
          <!-- Cair -->
          <rect x="175" y="45" width="100" height="60" rx="10" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/>
          <text x="225" y="80" font-size="28" text-anchor="middle">💧💧</text>
          <text x="225" y="125" font-size="11" font-weight="800" fill="#15803D" text-anchor="middle">Mencair Menjadi Air</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Mencair menjadi air' },
      { key: 'B', text: 'Berubah menjadi batu' },
      { key: 'C', text: 'Tetap beku dan semakin keras' }
    ],
    correctAnswer: 'A',
    explanation: 'Es batu terkena panas akan meleleh atau mencair menjadi zat cair (air).'
  },

  // --- CAMBRIDGE PRIMARY SCIENCE (Soal 6 - 10) ---
  {
    id: 'PENY-A-IPA-06',
    number: 6,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Cambridge Science: Which object is a LIVING THING (Benda Hidup yang bisa tumbuh dan bernapas)?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Living Things', 'Living vs Non-Living', '#16A34A',
        `<g transform="translate(60, 20)">
          <!-- Pohon (Living) -->
          <rect x="20" y="20" width="90" height="85" rx="12" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/>
          <text x="65" y="65" font-size="34" text-anchor="middle">🌳</text>
          <text x="65" y="92" font-size="11" font-weight="800" fill="#15803D" text-anchor="middle">Pohon (A)</text>
          <!-- Mobil (Non living) -->
          <rect x="135" y="20" width="90" height="85" rx="12" fill="#F1F5F9" stroke="#64748B" stroke-width="2"/>
          <text x="180" y="65" font-size="34" text-anchor="middle">🚗</text>
          <text x="180" y="92" font-size="11" font-weight="800" fill="#334155" text-anchor="middle">Mobil (B)</text>
          <!-- Batu (Non living) -->
          <rect x="250" y="20" width="90" height="85" rx="12" fill="#F1F5F9" stroke="#64748B" stroke-width="2"/>
          <text x="295" y="65" font-size="34" text-anchor="middle">🪨</text>
          <text x="295" y="92" font-size="11" font-weight="800" fill="#334155" text-anchor="middle">Batu (C)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Pohon (A)' },
      { key: 'B', text: 'Mobil (B)' },
      { key: 'C', text: 'Batu (C)' }
    ],
    correctAnswer: 'A',
    explanation: 'Pohon adalah makhluk hidup (living thing) karena dapat tumbuh, membutuhkan air dan sinar matahari.'
  },
  {
    id: 'PENY-A-IPA-07',
    number: 7,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Look at the picture! What do birds use to fly high in the sky? Bagian tubuh manakah yang digunakan burung untuk terbang?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Animal Bodies', 'Bird Wings for Flying', '#8B5CF6',
        `<g transform="translate(130, 20)">
          <!-- Burung dengan sayap terbentang -->
          <text x="70" y="65" font-size="50" text-anchor="middle">🦅</text>
          <text x="70" y="115" font-size="13" font-weight="900" fill="#6D28D9" text-anchor="middle">Sayap Burung (Wings)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Sayap (Wings)' },
      { key: 'B', text: 'Paruh (Beak)' },
      { key: 'C', text: 'Ekor (Tail)' }
    ],
    correctAnswer: 'A',
    explanation: 'Burung menggunakan sayap (wings) yang memiliki bulu khusus untuk terbang di udara.'
  },
  {
    id: 'PENY-A-IPA-08',
    number: 8,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Which animal baby hatches from an EGG? Anak hewan manakah yang menetas dari TELUR?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Animal Offspring', 'Hatching from Egg', '#D97706',
        `<g transform="translate(80, 20)">
          <!-- Telur menetas jadi anak ayam -->
          <text x="50" y="60" font-size="34">🥚</text>
          <text x="110" y="60" font-size="24">→</text>
          <text x="160" y="60" font-size="34">🐣</text>
          <text x="120" y="110" font-size="13" font-weight="900" fill="#92400E" text-anchor="middle">Telur menetas menjadi anak ayam</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Anak kucing' },
      { key: 'B', text: 'Anak ayam' },
      { key: 'C', text: 'Anak sapi' }
    ],
    correctAnswer: 'B',
    explanation: 'Ayam berkembang biak dengan bertelur, sehingga anak ayam menetas dari cangkang telur.'
  },
  {
    id: 'PENY-A-IPA-09',
    number: 9,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Which clothes should we wear when it is RAINY and cold? Pakaian manakah yang tepat saat cuaca HUJAN dan dingin?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Weather & Clothing', 'Rainy Day Wear', '#2563EB',
        `<g transform="translate(60, 20)">
          <!-- Payung & Jas Hujan -->
          <rect x="20" y="20" width="120" height="90" rx="14" fill="#DBEAFE" stroke="#2563EB" stroke-width="2"/>
          <text x="80" y="65" font-size="34" text-anchor="middle">🧥 ☂️</text>
          <text x="80" y="95" font-size="11" font-weight="800" fill="#1E40AF" text-anchor="middle">Jas Hujan & Payung (A)</text>
          <!-- Baju renang -->
          <rect x="180" y="20" width="120" height="90" rx="14" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
          <text x="240" y="65" font-size="34" text-anchor="middle">🩱 🕶️</text>
          <text x="240" y="95" font-size="11" font-weight="800" fill="#92400E" text-anchor="middle">Baju Renang (B)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Jas hujan dan payung (A)' },
      { key: 'B', text: 'Baju renang dan kacamata hitam (B)' },
      { key: 'C', text: 'Kaos tipis tanpa lengan' }
    ],
    correctAnswer: 'A',
    explanation: 'Saat hujan kita mengenakan jas hujan atau membawa payung agar terlindung dari air hujan dan kedinginan.'
  },
  {
    id: 'PENY-A-IPA-10',
    number: 10,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Which sense organ do we use to TASTE sweet ice cream? Organ manakah yang digunakan untuk MENGECAP rasa manis es krim?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Sense of Taste', 'Tasting with Tongue', '#E11D48',
        `<g transform="translate(100, 20)">
          <rect x="20" y="20" width="180" height="85" rx="14" fill="#FFE4E6" stroke="#E11D48" stroke-width="2"/>
          <text x="75" y="70" font-size="38">👅</text>
          <text x="135" y="70" font-size="38">🍦</text>
          <text x="110" y="95" font-size="12" font-weight="800" fill="#9F1239" text-anchor="middle">Lidah mengecap Es Krim</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Lidah (Tongue)' },
      { key: 'B', text: 'Hidung (Nose)' },
      { key: 'C', text: 'Telinga (Ear)' }
    ],
    correctAnswer: 'A',
    explanation: 'Lidah memiliki bintil pengecap yang dapat merasakan manis, asin, asam, dan pahit.'
  },

  // --- SINGAPORE SCIENCE (Soal 11 - 15) ---
  {
    id: 'PENY-A-IPA-11',
    number: 11,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Singapore Science: Eksperimen Benda di Air. Benda manakah yang TERAPUNG di permukaan air?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore Science · Float & Sink', 'Floating vs Sinking Experiment', '#0284C7',
        `<g transform="translate(70, 20)">
          <!-- Kolam Air -->
          <rect x="20" y="40" width="220" height="70" rx="8" fill="#BAE6FD" stroke="#0284C7" stroke-width="2"/>
          <!-- Permukaan air -->
          <line x1="20" y1="55" x2="240" y2="55" stroke="#0369A1" stroke-width="2" stroke-dasharray="4,4"/>
          <!-- Bebek karet (Terapung di atas) -->
          <text x="60" y="52" font-size="28" text-anchor="middle">🦆</text>
          <text x="60" y="25" font-size="10" font-weight="900" fill="#0369A1" text-anchor="middle">Bebek Karet (Terapung)</text>
          <!-- Koin besi (Tenggelam di dasar) -->
          <circle cx="180" cy="95" r="10" fill="#CBD5E1" stroke="#475569" stroke-width="2"/>
          <text x="180" y="125" font-size="10" font-weight="900" fill="#334155" text-anchor="middle">Koin Besi (Tenggelam)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Bebek karet mainan' },
      { key: 'B', text: 'Batu kerikil' },
      { key: 'C', text: 'Koin besi' }
    ],
    correctAnswer: 'A',
    explanation: 'Bebek karet mainan berisi udara sehingga memiliki berat jenis lebih ringan dari air dan terapung di permukaan.'
  },
  {
    id: 'PENY-A-IPA-12',
    number: 12,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Apa yang dibutuhkan oleh biji kacang hijau di dalam pot agar dapat bertumbuh menjadi kecambah hijau?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore Science · Plant Growth', 'Seeds Need Water & Sun', '#15803D',
        `<g transform="translate(100, 20)">
          <text x="40" y="65" font-size="34">🌱</text>
          <text x="100" y="45" font-size="28">☀️</text>
          <text x="100" y="85" font-size="28">💧</text>
          <text x="85" y="120" font-size="12" font-weight="800" fill="#14532D" text-anchor="middle">Air + Sinar Matahari</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Air dan sinar matahari' },
      { key: 'B', text: 'Minyak goreng' },
      { key: 'C', text: 'Es batu saja' }
    ],
    correctAnswer: 'A',
    explanation: 'Biji tanaman memerlukan air, tanah, dan cahaya matahari untuk berkecambah dan bertumbuh subur.'
  },
  {
    id: 'PENY-A-IPA-13',
    number: 13,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Hewan pemakan rumput: Makanan utama apakah yang dimakan oleh sapi dan kambing di padang rumput?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore Science · Herbivore', 'Animals & Their Food', '#65A30D',
        `<g transform="translate(80, 20)">
          <text x="50" y="65" font-size="40">🐄</text>
          <text x="110" y="60" font-size="28">→</text>
          <text x="160" y="65" font-size="38">🌿</text>
          <text x="110" y="115" font-size="13" font-weight="900" fill="#3F6212" text-anchor="middle">Sapi Memakan Rumput Hijau</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Rumput hijau' },
      { key: 'B', text: 'Daging ayam' },
      { key: 'C', text: 'Ikan laut' }
    ],
    correctAnswer: 'A',
    explanation: 'Sapi dan kambing adalah hewan herbivora yang memakan rumput dan dedaunan hijau.'
  },
  {
    id: 'PENY-A-IPA-14',
    number: 14,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Magnet dapat menarik benda yang terbuat dari bahan apa?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore Science · Magnets', 'Magnet Attracts Metals', '#DC2626',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="40">🧲</text>
          <text x="100" y="60" font-size="24">→</text>
          <text x="145" y="65" font-size="34">📎 🔩</text>
          <text x="100" y="115" font-size="12" font-weight="900" fill="#991B1B" text-anchor="middle">Magnet Menarik Logam & Besi</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Besi dan logam (Klip kertas)' },
      { key: 'B', text: 'Kertas tisu' },
      { key: 'C', text: 'Balon karet' }
    ],
    correctAnswer: 'A',
    explanation: 'Magnet memiliki gaya tarik magnetik yang dapat menarik benda-benda berbahan besi atau logam.'
  },
  {
    id: 'PENY-A-IPA-15',
    number: 15,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Saat kita menyalakan senter ke arah tangan kita, bayangan hitam yang terbentuk di dinding terjadi karena apa?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore Science · Light & Shadow', 'Forming Shadows', '#475569',
        `<g transform="translate(60, 20)">
          <!-- Senter -->
          <text x="30" y="65" font-size="30">🔦</text>
          <!-- Berkas cahaya -->
          <polygon points="65,45 130,25 130,85 65,65" fill="#FEF08A" opacity="0.6"/>
          <!-- Tangan penghalang -->
          <text x="140" y="65" font-size="30">🖐️</text>
          <!-- Bayangan gelap -->
          <rect x="220" y="25" width="8" height="60" fill="#0F172A"/>
          <text x="240" y="65" font-size="11" font-weight="800" fill="#0F172A">Bayangan di Dinding</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Cahaya terhalang oleh tangan' },
      { key: 'B', text: 'Dinding memancarkan api' },
      { key: 'C', text: 'Tangan kita menjadi dingin' }
    ],
    correctAnswer: 'A',
    explanation: 'Bayangan terbentuk ketika berkas cahaya terhalang oleh suatu benda yang tidak tembus cahaya (seperti tangan).'
  },

  // --- INTERNATIONAL BACCALAUREATE (IB PYP) (Soal 16 - 20) ---
  {
    id: 'PENY-A-IPA-16',
    number: 16,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'IB Inquiry: Menjaga Kebersihan Diri. Aktivitas apakah yang harus kita lakukan sebelum makan agar kuman tidak masuk ke perut?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Personal Hygiene', 'Washing Hands with Soap', '#0D9488',
        `<g transform="translate(110, 20)">
          <text x="50" y="65" font-size="40">🧼</text>
          <text x="110" y="65" font-size="40">🤲</text>
          <text x="80" y="115" font-size="13" font-weight="900" fill="#0F766E" text-anchor="middle">Mencuci Tangan Pakai Sabun</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Mencuci tangan dengan sabun dan air' },
      { key: 'B', text: 'Mengusap tangan ke baju' },
      { key: 'C', text: 'Langsung memegang makanan' }
    ],
    correctAnswer: 'A',
    explanation: 'Mencuci tangan menggunakan sabun membunuh kuman penyakit sebelum kita menyentuh makanan.'
  },
  {
    id: 'PENY-A-IPA-17',
    number: 17,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'IB Inquiry: Daur Hidup Kupu-kupu. Sebelum menjadi kupu-kupu bersayap indah, hewan ini menetas menjadi apa terlebih dahulu?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Life Cycle', 'Butterfly Metamorphosis', '#9333EA',
        `<g transform="translate(60, 20)">
          <text x="40" y="65" font-size="28">🥚 Telur</text>
          <text x="120" y="60" font-size="20">→</text>
          <text x="160" y="65" font-size="28">🐛 Ulat</text>
          <text x="220" y="60" font-size="20">→</text>
          <text x="260" y="65" font-size="28">🦋 Kupu-kupu</text>
          <text x="150" y="115" font-size="12" font-weight="900" fill="#581C87" text-anchor="middle">Metamorfosis Sederhana</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Ulat (Larva)' },
      { key: 'B', text: 'Anak katak' },
      { key: 'C', text: 'Ikan kecil' }
    ],
    correctAnswer: 'A',
    explanation: 'Telur kupu-kupu menetas menjadi ulat (larva), lalu menjadi kepompong, hingga akhirnya menjadi kupu-kupu dewasa.'
  },
  {
    id: 'PENY-A-IPA-18',
    number: 18,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'IB Caring for Environment: Sampah kulit pisang dan sisa sayuran harus dibuang ke mana?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Waste Management', 'Organic Trash Bin', '#16A34A',
        `<g transform="translate(110, 20)">
          <rect x="40" y="25" width="80" height="70" rx="8" fill="#DCFCE7" stroke="#16A34A" stroke-width="2.5"/>
          <text x="80" y="68" font-size="34" text-anchor="middle">🗑️</text>
          <text x="80" y="115" font-size="12" font-weight="900" fill="#14532D" text-anchor="middle">Tempat Sampah</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Tempat sampah' },
      { key: 'B', text: 'Sungai atau selokan' },
      { key: 'C', text: 'Lantai ruang kelas' }
    ],
    correctAnswer: 'A',
    explanation: 'Membuang sampah pada tempat sampah menjaga kebersihan lingkungan dan mencegah banjir serta sarang penyakit.'
  },
  {
    id: 'PENY-A-IPA-19',
    number: 19,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Fenomena Alam: Setelah hujan reda di siang hari dan matahari bersinar, lengkungan warna-warni indah di langit disebut apa?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Sky Phenomena', 'Rainbow After the Rain', '#F43F5E',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">🌈</text>
          <text x="120" y="65" font-size="34">☀️</text>
          <text x="85" y="115" font-size="13" font-weight="900" fill="#BE123C" text-anchor="middle">Pelangi (Rainbow)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Pelangi' },
      { key: 'B', text: 'Petir' },
      { key: 'C', text: 'Asap' }
    ],
    correctAnswer: 'A',
    explanation: 'Pelangi muncul saat tetesan air hujan terkena pembiasan sinar matahari sehingga membentuk pita aneka warna di langit.'
  },
  {
    id: 'PENY-A-IPA-20',
    number: 20,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Hewan nokturnal: Hewan apakah yang biasanya tidur di siang hari dan baru aktif mencari makan di malam hari?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Animal Behavior', 'Nocturnal Owl at Night', '#312E81',
        `<g transform="translate(100, 20)">
          <rect x="20" y="15" width="160" height="90" rx="14" fill="#1E1B4B"/>
          <text x="60" y="68" font-size="40">🦉</text>
          <text x="130" y="68" font-size="36">🌙</text>
          <text x="100" y="125" font-size="12" font-weight="900" fill="#312E81" text-anchor="middle">Burung Hantu & Bulan Malam</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Burung hantu' },
      { key: 'B', text: 'Ayam jago' },
      { key: 'C', text: 'Kupu-kupu' }
    ],
    correctAnswer: 'A',
    explanation: 'Burung hantu adalah hewan malam (nokturnal) yang memiliki penglihatan tajam dalam kegelapan.'
  }
];
