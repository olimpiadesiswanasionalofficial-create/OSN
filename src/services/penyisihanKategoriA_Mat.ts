import { QuestionItem } from './cbtQuestionTypes';
import { createPenyisihanSvg } from './simulasiSvgIllustrations';

// SOAL RESMI BABAK PENYISIHAN: MATEMATIKA PAUD/TK (Kategori A)
// 20 Soal Pilihan Ganda Kurikulum Campuran (Merdeka, Cambridge, Singapore, IB)
// Tingkat Kesulitan: Menengah | 100% Bergambar & Unik

export const PENYISIHAN_A_MATEMATIKA: QuestionItem[] = [
  // --- KURIKULUM MERDEKA (Soal 1 - 5) ---
  {
    id: 'PENY-A-MAT-01',
    number: 1,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Perhatikan gambar! Doni memiliki 4 buah mangga di keranjang, lalu diberi 3 buah mangga lagi oleh Ibu. Berapakah jumlah seluruh mangga Doni sekarang?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Penjumlahan', 'Penjumlahan Buah Mangga', '#16A34A',
        `<g transform="translate(40, 15)">
          <rect x="10" y="20" width="130" height="85" rx="14" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/>
          <text x="75" y="60" font-size="28" text-anchor="middle">🥭🥭🥭🥭</text>
          <text x="75" y="92" font-size="12" font-weight="800" fill="#15803D" text-anchor="middle">4 Mangga Doni</text>
          <text x="175" y="68" font-size="26" font-weight="900" fill="#16A34A" text-anchor="middle">+</text>
          <rect x="210" y="20" width="120" height="85" rx="14" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
          <text x="270" y="60" font-size="28" text-anchor="middle">🥭🥭🥭</text>
          <text x="270" y="92" font-size="12" font-weight="800" fill="#B45309" text-anchor="middle">3 Mangga Ibu</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '6 buah mangga' },
      { key: 'B', text: '7 buah mangga' },
      { key: 'C', text: '8 buah mangga' }
    ],
    correctAnswer: 'B',
    explanation: '4 mangga ditambah 3 mangga sama dengan 7 mangga (4 + 3 = 7).'
  },
  {
    id: 'PENY-A-MAT-02',
    number: 2,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Di atas meja ada 6 potong kue bolu. Adik memakan 2 potong kue tersebut. Berapakah sisa kue bolu yang masih ada di atas meja?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Pengurangan', 'Pengurangan Kue Meja', '#EA580C',
        `<g transform="translate(30, 20)">
          <rect x="20" y="20" width="340" height="80" rx="12" fill="#FFEDD5" stroke="#EA580C" stroke-width="1.5"/>
          <text x="60" y="60" font-size="30">🍰</text>
          <text x="110" y="60" font-size="30">🍰</text>
          <text x="160" y="60" font-size="30">🍰</text>
          <text x="210" y="60" font-size="30">🍰</text>
          <text x="260" y="60" font-size="30" opacity="0.3">🍰</text>
          <line x1="250" y1="35" x2="285" y2="70" stroke="#DC2626" stroke-width="4"/>
          <text x="310" y="60" font-size="30" opacity="0.3">🍰</text>
          <line x1="300" y1="35" x2="335" y2="70" stroke="#DC2626" stroke-width="4"/>
          <text x="190" y="125" font-size="13" font-weight="800" fill="#9A3412" text-anchor="middle">6 Kue dikurangi 2 Kue (Dimakan)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '3 potong' },
      { key: 'B', text: '4 potong' },
      { key: 'C', text: '5 potong' }
    ],
    correctAnswer: 'B',
    explanation: '6 potong kue mula-mula dikurangi 2 potong kue yang dimakan menghasilkan sisa 4 potong (6 - 2 = 4).'
  },
  {
    id: 'PENY-A-MAT-03',
    number: 3,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Manakah di antara ketiga bentuk di bawah ini yang merupakan bangun Segitiga?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Bentuk Datar', 'Mengenal Bangun Segitiga', '#2563EB',
        `<g transform="translate(40, 20)">
          <!-- Bentuk A: Lingkaran -->
          <circle cx="50" cy="55" r="30" fill="#BFDBFE" stroke="#1D4ED8" stroke-width="2.5"/>
          <text x="50" y="110" font-size="13" font-weight="900" fill="#1E3A8A" text-anchor="middle">Bentuk (1)</text>
          <!-- Bentuk B: Segitiga -->
          <polygon points="175,25 145,85 205,85" fill="#FED7AA" stroke="#EA580C" stroke-width="2.5"/>
          <text x="175" y="110" font-size="13" font-weight="900" fill="#9A3412" text-anchor="middle">Bentuk (2)</text>
          <!-- Bentuk C: Persegi -->
          <rect x="270" y="25" width="60" height="60" rx="4" fill="#BBF7D0" stroke="#16A34A" stroke-width="2.5"/>
          <text x="300" y="110" font-size="13" font-weight="900" fill="#14532D" text-anchor="middle">Bentuk (3)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Bentuk (1)' },
      { key: 'B', text: 'Bentuk (2)' },
      { key: 'C', text: 'Bentuk (3)' }
    ],
    correctAnswer: 'B',
    explanation: 'Bentuk (2) memiliki 3 sisi lurus dan 3 sudut, yaitu bentuk bangun segitiga.'
  },
  {
    id: 'PENY-A-MAT-04',
    number: 4,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Kelompokkan benda-benda ini! Manakah kelompok yang memiliki jumlah benda paling banyak?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Perbandingan', 'Membandingkan Banyak Benda', '#9333EA',
        `<g transform="translate(30, 20)">
          <rect x="10" y="15" width="100" height="90" rx="10" fill="#F3E8FF" stroke="#9333EA" stroke-width="1.5"/>
          <text x="60" y="55" font-size="24" text-anchor="middle">🍎🍎🍎</text>
          <text x="60" y="90" font-size="12" font-weight="800" fill="#6B21A8" text-anchor="middle">Kelompok A (3)</text>
          <rect x="130" y="15" width="100" height="90" rx="10" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.5"/>
          <text x="180" y="48" font-size="20" text-anchor="middle">🍌🍌🍌</text>
          <text x="180" y="72" font-size="20" text-anchor="middle">🍌🍌</text>
          <text x="180" y="95" font-size="12" font-weight="800" fill="#854D0E" text-anchor="middle">Kelompok B (5)</text>
          <rect x="250" y="15" width="100" height="90" rx="10" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.5"/>
          <text x="300" y="48" font-size="20" text-anchor="middle">🍓🍓</text>
          <text x="300" y="72" font-size="20" text-anchor="middle">🍓🍓</text>
          <text x="300" y="95" font-size="12" font-weight="800" fill="#9D174D" text-anchor="middle">Kelompok C (4)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Kelompok A (Apel)' },
      { key: 'B', text: 'Kelompok B (Pisang)' },
      { key: 'C', text: 'Kelompok C (Stroberi)' }
    ],
    correctAnswer: 'B',
    explanation: 'Kelompok B memiliki 5 buah pisang, yang merupakan jumlah terbanyak dibandingkan apel (3) dan stroberi (4).'
  },
  {
    id: 'PENY-A-MAT-05',
    number: 5,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Lihat gambar timbangan sederhana! Benda manakah yang posisinya berada LEBIH TINGGI (lebih ringan)?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Pengukuran', 'Timbangan Ringan & Berat', '#0D9488',
        `<g transform="translate(50, 20)">
          <!-- Tiang penyangga -->
          <polygon points="160,110 145,130 175,130" fill="#475569"/>
          <!-- Lengan miring -->
          <line x1="60" y1="60" x2="260" y2="100" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
          <circle cx="160" cy="80" r="6" fill="#0F172A"/>
          <!-- Sisi kiri (atas/ringan): Balon -->
          <line x1="60" y1="60" x2="60" y2="85" stroke="#94A3B8" stroke-width="2"/>
          <text x="60" y="105" font-size="30" text-anchor="middle">🎈</text>
          <text x="60" y="130" font-size="11" font-weight="800" fill="#0F766E" text-anchor="middle">Balon (A)</text>
          <!-- Sisi kanan (bawah/berat): Batu -->
          <line x1="260" y1="100" x2="260" y2="115" stroke="#94A3B8" stroke-width="2"/>
          <text x="260" y="135" font-size="30" text-anchor="middle">🪨</text>
          <text x="260" y="150" font-size="11" font-weight="800" fill="#0F766E" text-anchor="middle">Batu (B)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Balon (A)' },
      { key: 'B', text: 'Batu (B)' },
      { key: 'C', text: 'Keduanya sama tinggi' }
    ],
    correctAnswer: 'A',
    explanation: 'Balon (A) posisinya terangkat ke atas karena lebih ringan daripada batu yang turun ke bawah.'
  },

  // --- CAMBRIDGE EARLY YEARS (Soal 6 - 10) ---
  {
    id: 'PENY-A-MAT-06',
    number: 6,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Look at the sequence of colored circles! Which color comes next?\nMerah, Biru, Merah, Biru, Merah, ... ?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Repeating Pattern', 'Circle Color Pattern', '#DC2626',
        `<g transform="translate(40, 30)">
          <circle cx="30" cy="50" r="22" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>
          <text x="30" y="55" font-size="10" font-weight="800" fill="#FFFFFF" text-anchor="middle">Merah</text>
          <circle cx="85" cy="50" r="22" fill="#3B82F6" stroke="#1D4ED8" stroke-width="2"/>
          <text x="85" y="55" font-size="10" font-weight="800" fill="#FFFFFF" text-anchor="middle">Biru</text>
          <circle cx="140" cy="50" r="22" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>
          <text x="140" y="55" font-size="10" font-weight="800" fill="#FFFFFF" text-anchor="middle">Merah</text>
          <circle cx="195" cy="50" r="22" fill="#3B82F6" stroke="#1D4ED8" stroke-width="2"/>
          <text x="195" y="55" font-size="10" font-weight="800" fill="#FFFFFF" text-anchor="middle">Biru</text>
          <circle cx="250" cy="50" r="22" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>
          <text x="250" y="55" font-size="10" font-weight="800" fill="#FFFFFF" text-anchor="middle">Merah</text>
          <circle cx="310" cy="50" r="24" fill="#F1F5F9" stroke="#64748B" stroke-width="2" stroke-dasharray="4,4"/>
          <text x="310" y="58" font-size="20" font-weight="900" fill="#0F172A" text-anchor="middle">?</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Kuning' },
      { key: 'B', text: 'Biru' },
      { key: 'C', text: 'Merah' }
    ],
    correctAnswer: 'B',
    explanation: 'Polanya adalah Merah, Biru berselang-seling. Setelah lingkaran Merah berikutnya adalah lingkaran Biru.'
  },
  {
    id: 'PENY-A-MAT-07',
    number: 7,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Count the dots on the two dice! How many total dots are there on both dice together?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Addition', 'Count Dots on Dice', '#7C3AED',
        `<g transform="translate(70, 20)">
          <!-- Dadu 1: 3 titik -->
          <rect x="20" y="20" width="80" height="80" rx="14" fill="#FFFFFF" stroke="#475569" stroke-width="3"/>
          <circle cx="40" cy="40" r="6" fill="#1E293B"/>
          <circle cx="60" cy="60" r="6" fill="#1E293B"/>
          <circle cx="80" cy="80" r="6" fill="#1E293B"/>
          <!-- Tanda + -->
          <text x="130" y="68" font-size="28" font-weight="900" fill="#7C3AED" text-anchor="middle">+</text>
          <!-- Dadu 2: 5 titik -->
          <rect x="160" y="20" width="80" height="80" rx="14" fill="#FFFFFF" stroke="#475569" stroke-width="3"/>
          <circle cx="180" cy="40" r="6" fill="#DC2626"/>
          <circle cx="220" cy="40" r="6" fill="#DC2626"/>
          <circle cx="200" cy="60" r="6" fill="#DC2626"/>
          <circle cx="180" cy="80" r="6" fill="#DC2626"/>
          <circle cx="220" cy="80" r="6" fill="#DC2626"/>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '7 dots' },
      { key: 'B', text: '8 dots' },
      { key: 'C', text: '9 dots' }
    ],
    correctAnswer: 'B',
    explanation: 'Dadu pertama memiliki 3 titik dan dadu kedua memiliki 5 titik. Totalnya: 3 + 5 = 8 titik.'
  },
  {
    id: 'PENY-A-MAT-08',
    number: 8,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Look at the picture! Where is the cat located relative to the box? Di manakah posisi kucing terhadap kardus?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Spatial Position', 'Cat and Box Position', '#2563EB',
        `<g transform="translate(100, 20)">
          <rect x="60" y="35" width="100" height="75" rx="8" fill="#D97706" stroke="#92400E" stroke-width="2.5"/>
          <text x="110" y="80" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">KARDUS</text>
          <!-- Kucing di dalam kardus (tampak kepala mengintip) -->
          <text x="110" y="42" font-size="34" text-anchor="middle">🐱</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Di dalam kardus (Inside)' },
      { key: 'B', text: 'Di bawah kardus (Under)' },
      { key: 'C', text: 'Di belakang kardus (Behind)' }
    ],
    correctAnswer: 'A',
    explanation: 'Kucing berada di dalam kardus (inside the box) dengan kepala yang menyembul keluar.'
  },
  {
    id: 'PENY-A-MAT-09',
    number: 9,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Which pencil is the SHORTEST? Manakah pensil yang PALING PENDEK?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Length Comparison', 'Shortest Pencil', '#D97706',
        `<g transform="translate(50, 20)">
          <text x="20" y="35" font-size="12" font-weight="900" fill="#1E293B">A:</text>
          <rect x="50" y="24" width="220" height="15" rx="5" fill="#3B82F6"/>
          <text x="20" y="65" font-size="12" font-weight="900" fill="#1E293B">B:</text>
          <rect x="50" y="54" width="90" height="15" rx="5" fill="#EF4444"/>
          <text x="20" y="95" font-size="12" font-weight="900" fill="#1E293B">C:</text>
          <rect x="50" y="84" width="160" height="15" rx="5" fill="#10B981"/>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Pensil A' },
      { key: 'B', text: 'Pensil B' },
      { key: 'C', text: 'Pensil C' }
    ],
    correctAnswer: 'B',
    explanation: 'Pensil B memiliki ukuran panjang yang paling pendek dibandingkan pensil A dan pensil C.'
  },
  {
    id: 'PENY-A-MAT-10',
    number: 10,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Which 3D shape looks like a ball? Bangun ruang manakah yang berbentuk BOLA (Sphere)?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · 3D Shapes', 'Sphere vs Cube', '#4F46E5',
        `<g transform="translate(60, 20)">
          <!-- Bentuk A: Kubus -->
          <rect x="30" y="30" width="55" height="55" rx="4" fill="#C7D2FE" stroke="#4338CA" stroke-width="2.5"/>
          <text x="57" y="105" font-size="12" font-weight="800" fill="#312E81" text-anchor="middle">Bentuk (1)</text>
          <!-- Bentuk B: Bola -->
          <circle cx="160" cy="55" r="30" fill="url(#ballGrad)" stroke="#BE185D" stroke-width="2"/>
          <defs><radialGradient id="ballGrad" cx="35%" cy="35%"><stop offset="0%" stop-color="#FBCFE8"/><stop offset="100%" stop-color="#DB2777"/></radialGradient></defs>
          <text x="160" y="105" font-size="12" font-weight="800" fill="#831843" text-anchor="middle">Bentuk (2)</text>
          <!-- Bentuk C: Tabung -->
          <rect x="240" y="30" width="50" height="55" rx="14" fill="#BBF7D0" stroke="#15803D" stroke-width="2.5"/>
          <text x="265" y="105" font-size="12" font-weight="800" fill="#14532D" text-anchor="middle">Bentuk (3)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Bentuk (1) - Kubus' },
      { key: 'B', text: 'Bentuk (2) - Bola' },
      { key: 'C', text: 'Bentuk (3) - Tabung' }
    ],
    correctAnswer: 'B',
    explanation: 'Bentuk (2) adalah bangun ruang bola (sphere) yang bulat sempurna seperti bola mainan.'
  },

  // --- SINGAPORE CURRICULUM (Soal 11 - 15) ---
  {
    id: 'PENY-A-MAT-11',
    number: 11,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Number Bond (Ikatan Angka Singapore Math): Angka 5 dapat dipecah menjadi 2 dan angka berapa pada tanda tanya (?)?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore Math · Number Bond', 'Number Bond of 5', '#0284C7',
        `<g transform="translate(110, 20)">
          <!-- Lingkaran Atas (Whole) -->
          <circle cx="80" cy="25" r="22" fill="#0284C7" stroke="#0369A1" stroke-width="2"/>
          <text x="80" y="32" font-size="18" font-weight="900" fill="#FFFFFF" text-anchor="middle">5</text>
          <!-- Garis penghubung -->
          <line x1="65" y1="45" x2="35" y2="75" stroke="#64748B" stroke-width="2.5"/>
          <line x1="95" y1="45" x2="125" y2="75" stroke="#64748B" stroke-width="2.5"/>
          <!-- Part 1 -->
          <circle cx="35" cy="85" r="20" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
          <text x="35" y="92" font-size="16" font-weight="900" fill="#0369A1" text-anchor="middle">2</text>
          <!-- Part 2 (?) -->
          <circle cx="125" cy="85" r="20" fill="#FEF08A" stroke="#CA8A04" stroke-width="2"/>
          <text x="125" y="92" font-size="18" font-weight="900" fill="#854D0E" text-anchor="middle">?</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '2' },
      { key: 'B', text: '3' },
      { key: 'C', text: '4' }
    ],
    correctAnswer: 'B',
    explanation: 'Pada Number Bond: 2 + 3 = 5. Jadi angka yang tepat untuk melengkapi ikatan angka adalah 3.'
  },
  {
    id: 'PENY-A-MAT-12',
    number: 12,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Ten Frame (Kerangka 10): Berapa banyak kotak yang masih KOSONG agar kerangka 10 ini penuh?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore Math · Ten Frame', 'Ten Frame Counting', '#059669',
        `<g transform="translate(60, 25)">
          <!-- Grid 2x5 Ten Frame -->
          <rect x="20" y="10" width="250" height="90" rx="8" fill="#F8FAFC" stroke="#334155" stroke-width="3"/>
          <line x1="20" y1="55" x2="270" y2="55" stroke="#94A3B8" stroke-width="2"/>
          <line x1="70" y1="10" x2="70" y2="100" stroke="#94A3B8" stroke-width="2"/>
          <line x1="120" y1="10" x2="120" y2="100" stroke="#94A3B8" stroke-width="2"/>
          <line x1="170" y1="10" x2="170" y2="100" stroke="#94A3B8" stroke-width="2"/>
          <line x1="220" y1="10" x2="220" y2="100" stroke="#94A3B8" stroke-width="2"/>
          <!-- 6 Counter Terisi (Merah) -->
          <circle cx="45" cy="32" r="14" fill="#EF4444"/>
          <circle cx="95" cy="32" r="14" fill="#EF4444"/>
          <circle cx="145" cy="32" r="14" fill="#EF4444"/>
          <circle cx="195" cy="32" r="14" fill="#EF4444"/>
          <circle cx="245" cy="32" r="14" fill="#EF4444"/>
          <circle cx="45" cy="77" r="14" fill="#EF4444"/>
          <!-- Kotak Bawah 4 Kosong -->
          <text x="145" y="125" font-size="12" font-weight="800" fill="#065F46" text-anchor="middle">Terisi: 6 Lingkaran Merah</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '3 kotak kosong' },
      { key: 'B', text: '4 kotak kosong' },
      { key: 'C', text: '5 kotak kosong' }
    ],
    correctAnswer: 'B',
    explanation: 'Pada Ten Frame ada 10 kotak total. Sudah terisi 6 kotak, sehingga kotak yang masih kosong adalah 10 - 6 = 4 kotak.'
  },
  {
    id: 'PENY-A-MAT-13',
    number: 13,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Bandingkan 2 kelompok kelereng berikut! Berapa selisih LEBIH BANYAK kelompok kelereng ungu dibanding kelereng kuning?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore Math · Difference', 'One-to-One Matching', '#8B5CF6',
        `<g transform="translate(60, 20)">
          <text x="30" y="45" font-size="13" font-weight="900" fill="#6D28D9">Ungu:</text>
          <text x="90" y="45" font-size="24">🟣🟣🟣🟣🟣🟣</text>
          <text x="30" y="85" font-size="13" font-weight="900" fill="#B45309">Kuning:</text>
          <text x="90" y="85" font-size="24">🟡🟡🟡🟡</text>
          <text x="175" y="120" font-size="12" font-weight="800" fill="#4C1D95" text-anchor="middle">Ungu ada 6, Kuning ada 4</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Lebih banyak 1 kelereng' },
      { key: 'B', text: 'Lebih banyak 2 kelereng' },
      { key: 'C', text: 'Lebih banyak 3 kelereng' }
    ],
    correctAnswer: 'B',
    explanation: 'Kelompok ungu ada 6 dan kuning ada 4. Selisih lebih banyaknya adalah 6 - 4 = 2 kelereng.'
  },
  {
    id: 'PENY-A-MAT-14',
    number: 14,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Balok susun manakah yang tersusun dari tepat 5 buah kubus satuan?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore Math · Block Counting', 'Counting Cube Towers', '#F59E0B',
        `<g transform="translate(50, 20)">
          <!-- Menara A (4 kubus) -->
          <g transform="translate(30, 10)">
            <rect x="0" y="60" width="30" height="20" rx="3" fill="#60A5FA" stroke="#1D4ED8"/>
            <rect x="0" y="40" width="30" height="20" rx="3" fill="#60A5FA" stroke="#1D4ED8"/>
            <rect x="0" y="20" width="30" height="20" rx="3" fill="#60A5FA" stroke="#1D4ED8"/>
            <rect x="0" y="0" width="30" height="20" rx="3" fill="#60A5FA" stroke="#1D4ED8"/>
            <text x="15" y="100" font-size="12" font-weight="900" fill="#1E3A8A" text-anchor="middle">Menara (A)</text>
          </g>
          <!-- Menara B (5 kubus) -->
          <g transform="translate(130, 0)">
            <rect x="0" y="70" width="30" height="18" rx="3" fill="#FBBF24" stroke="#B45309"/>
            <rect x="0" y="52" width="30" height="18" rx="3" fill="#FBBF24" stroke="#B45309"/>
            <rect x="0" y="34" width="30" height="18" rx="3" fill="#FBBF24" stroke="#B45309"/>
            <rect x="0" y="16" width="30" height="18" rx="3" fill="#FBBF24" stroke="#B45309"/>
            <rect x="0" y="-2" width="30" height="18" rx="3" fill="#FBBF24" stroke="#B45309"/>
            <text x="15" y="110" font-size="12" font-weight="900" fill="#92400E" text-anchor="middle">Menara (B)</text>
          </g>
          <!-- Menara C (6 kubus) -->
          <g transform="translate(230, -10)">
            <rect x="0" y="80" width="30" height="16" rx="3" fill="#34D399" stroke="#047857"/>
            <rect x="0" y="64" width="30" height="16" rx="3" fill="#34D399" stroke="#047857"/>
            <rect x="0" y="48" width="30" height="16" rx="3" fill="#34D399" stroke="#047857"/>
            <rect x="0" y="32" width="30" height="16" rx="3" fill="#34D399" stroke="#047857"/>
            <rect x="0" y="16" width="30" height="16" rx="3" fill="#34D399" stroke="#047857"/>
            <rect x="0" y="0" width="30" height="16" rx="3" fill="#34D399" stroke="#047857"/>
            <text x="15" y="120" font-size="12" font-weight="900" fill="#065F46" text-anchor="middle">Menara (C)</text>
          </g>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Menara (A)' },
      { key: 'B', text: 'Menara (B)' },
      { key: 'C', text: 'Menara (C)' }
    ],
    correctAnswer: 'B',
    explanation: 'Menara (B) tersusun dari tepat 5 buah kubus satuan bertingkat.'
  },
  {
    id: 'PENY-A-MAT-15',
    number: 15,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Dua bagian piza ini digabungkan. Berapakah nilai pecahan gambar lingkaran piza utuh jika sudah terisi setengah bagian?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore Math · Halves', 'Half Pizza Visual', '#DC2626',
        `<g transform="translate(100, 20)">
          <!-- Setengah pizza terisi -->
          <path d="M 100,60 A 45,45 0 0,0 100,150 Z" fill="#F87171" stroke="#DC2626" stroke-width="2"/>
          <text x="70" y="105" font-size="18">🍕</text>
          <!-- Setengah garis putus-putus -->
          <path d="M 100,60 A 45,45 0 0,1 100,150 Z" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2" stroke-dasharray="4,4"/>
          <text x="145" y="110" font-size="12" font-weight="800" fill="#475569" text-anchor="middle">Setengah (1/2)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Satu per dua (Setengah)' },
      { key: 'B', text: 'Satu utuh penuh' },
      { key: 'C', text: 'Satu per empat' }
    ],
    correctAnswer: 'A',
    explanation: 'Bagian piza yang berwarna merah menunjukkan setengah (1/2) dari lingkaran piza utuh.'
  },

  // --- INTERNATIONAL BACCALAUREATE (IB PYP) (Soal 16 - 20) ---
  {
    id: 'PENY-A-MAT-16',
    number: 16,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'IB Inquiry: Budi mengelompokkan mainan berdasarkan roda. Manakah mainan yang TIDAK memiliki roda (tidak termasuk dalam kelompok)?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Classification', 'Grouping by Attributes', '#0891B2',
        `<g transform="translate(40, 20)">
          <rect x="15" y="15" width="90" height="85" rx="12" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
          <text x="60" y="60" font-size="34" text-anchor="middle">🚗</text>
          <text x="60" y="88" font-size="10" font-weight="800" fill="#0369A1" text-anchor="middle">Mobil (A)</text>
          <rect x="135" y="15" width="90" height="85" rx="12" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
          <text x="180" y="60" font-size="34" text-anchor="middle">🚲</text>
          <text x="180" y="88" font-size="10" font-weight="800" fill="#0369A1" text-anchor="middle">Sepeda (B)</text>
          <rect x="255" y="15" width="90" height="85" rx="12" fill="#FEF2F2" stroke="#EF4444" stroke-width="2"/>
          <text x="300" y="60" font-size="34" text-anchor="middle">🧸</text>
          <text x="300" y="88" font-size="10" font-weight="800" fill="#B91C1C" text-anchor="middle">Boneka (C)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Mobil (A)' },
      { key: 'B', text: 'Sepeda (B)' },
      { key: 'C', text: 'Boneka beruang (C)' }
    ],
    correctAnswer: 'C',
    explanation: 'Mobil dan sepeda adalah kendaraan beroda, sedangkan boneka beruang tidak memiliki roda sehingga tidak termasuk kelompok.'
  },
  {
    id: 'PENY-A-MAT-17',
    number: 17,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'IB Time Awareness: Jam dinding menunjukkan jarum pendek di angka 3 dan jarum panjang di angka 12. Pukul berapakah itu?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Clock Reading', 'Telling Time on the Hour', '#4338CA',
        `<g transform="translate(130, 15)">
          <circle cx="70" cy="55" r="45" fill="#FFFFFF" stroke="#312E81" stroke-width="3"/>
          <text x="70" y="24" font-size="10" font-weight="900" fill="#1E1B4B" text-anchor="middle">12</text>
          <text x="106" y="59" font-size="10" font-weight="900" fill="#1E1B4B" text-anchor="middle">3</text>
          <text x="70" y="93" font-size="10" font-weight="900" fill="#1E1B4B" text-anchor="middle">6</text>
          <text x="34" y="59" font-size="10" font-weight="900" fill="#1E1B4B" text-anchor="middle">9</text>
          <circle cx="70" cy="55" r="4" fill="#DC2626"/>
          <!-- Jarum panjang ke 12 -->
          <line x1="70" y1="55" x2="70" y2="26" stroke="#1E1B4B" stroke-width="3" stroke-linecap="round"/>
          <!-- Jarum pendek ke 3 -->
          <line x1="70" y1="55" x2="96" y2="55" stroke="#DC2626" stroke-width="3.5" stroke-linecap="round"/>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Pukul 12.00 tepat' },
      { key: 'B', text: 'Pukul 03.00 tepat' },
      { key: 'C', text: 'Pukul 06.00 tepat' }
    ],
    correctAnswer: 'B',
    explanation: 'Jarum pendek menunjukkan jam (angka 3) dan jarum panjang menunjukkan menit (angka 12), artinya pukul 03.00 tepat.'
  },
  {
    id: 'PENY-A-MAT-18',
    number: 18,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'IB Data & Graph: Lihat diagram balok buah kesukaan teman-teman! Buah apakah yang PALING SEDIKIT disukai?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Pictograph', 'Favorite Fruit Bar Chart', '#E11D48',
        `<g transform="translate(60, 20)">
          <!-- Batang Pisang (4) -->
          <rect x="30" y="30" width="35" height="60" rx="4" fill="#FBBF24"/>
          <text x="47" y="24" font-size="11" font-weight="900" fill="#78350F" text-anchor="middle">4</text>
          <text x="47" y="105" font-size="16" text-anchor="middle">🍌</text>
          <!-- Batang Apel (6) -->
          <rect x="95" y="10" width="35" height="80" rx="4" fill="#EF4444"/>
          <text x="112" y="6" font-size="11" font-weight="900" fill="#991B1B" text-anchor="middle">6</text>
          <text x="112" y="105" font-size="16" text-anchor="middle">🍎</text>
          <!-- Batang Jeruk (2) -->
          <rect x="160" y="60" width="35" height="30" rx="4" fill="#FB923C"/>
          <text x="177" y="54" font-size="11" font-weight="900" fill="#9A3412" text-anchor="middle">2</text>
          <text x="177" y="105" font-size="16" text-anchor="middle">🍊</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Pisang' },
      { key: 'B', text: 'Apel' },
      { key: 'C', text: 'Jeruk' }
    ],
    correctAnswer: 'C',
    explanation: 'Batang jeruk memiliki tinggi paling rendah dengan nilai 2 orang, yang artinya paling sedikit disukai.'
  },
  {
    id: 'PENY-A-MAT-19',
    number: 19,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Berapakah angka yang TEPAT di antara angka 7 dan angka 9 pada garis bilangan?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Number Line', 'Missing Number on Number Line', '#2563EB',
        `<g transform="translate(40, 30)">
          <!-- Garis bilangan panah -->
          <line x1="20" y1="50" x2="320" y2="50" stroke="#0F172A" stroke-width="3"/>
          <!-- Titik 6 -->
          <circle cx="50" cy="50" r="5" fill="#0F172A"/>
          <text x="50" y="80" font-size="16" font-weight="900" fill="#1E293B" text-anchor="middle">6</text>
          <!-- Titik 7 -->
          <circle cx="115" cy="50" r="5" fill="#0F172A"/>
          <text x="115" y="80" font-size="16" font-weight="900" fill="#1E293B" text-anchor="middle">7</text>
          <!-- Titik ? -->
          <circle cx="180" cy="50" r="8" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
          <text x="180" y="82" font-size="18" font-weight="900" fill="#B45309" text-anchor="middle">?</text>
          <!-- Titik 9 -->
          <circle cx="245" cy="50" r="5" fill="#0F172A"/>
          <text x="245" y="80" font-size="16" font-weight="900" fill="#1E293B" text-anchor="middle">9</text>
          <!-- Titik 10 -->
          <circle cx="310" cy="50" r="5" fill="#0F172A"/>
          <text x="310" y="80" font-size="16" font-weight="900" fill="#1E293B" text-anchor="middle">10</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '8' },
      { key: 'B', text: '10' },
      { key: 'C', text: '6' }
    ],
    correctAnswer: 'A',
    explanation: 'Urutan bilangan yang benar adalah 6, 7, 8, 9, 10. Bilangan di antara 7 dan 9 adalah 8.'
  },
  {
    id: 'PENY-A-MAT-20',
    number: 20,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Manakah bentuk simetri yang jika dilipat menjadi dua bagian akan pas menutupi satu sama lain?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Symmetry', 'Symmetry Fold Line', '#059669',
        `<g transform="translate(60, 20)">
          <!-- Hati dengan garis simetri -->
          <g transform="translate(60, 10)">
            <path d="M 50,30 A 18,18 0 0,0 14,30 Q 14,55 50,85 Q 86,55 86,30 A 18,18 0 0,0 50,30 Z" fill="#F43F5E"/>
            <line x1="50" y1="10" x2="50" y2="95" stroke="#FFFFFF" stroke-width="2.5" stroke-dasharray="3,3"/>
            <text x="50" y="115" font-size="12" font-weight="800" fill="#9F1239" text-anchor="middle">Hati (Simetris)</text>
          </g>
          <!-- Garis tak beraturan -->
          <g transform="translate(180, 10)">
            <polygon points="30,20 80,40 50,85 10,60" fill="#CBD5E1"/>
            <text x="45" y="115" font-size="12" font-weight="800" fill="#475569" text-anchor="middle">Tak Beraturan</text>
          </g>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Bentuk Hati (Kiri)' },
      { key: 'B', text: 'Bentuk Tak Beraturan (Kanan)' },
      { key: 'C', text: 'Keduanya tidak simetris' }
    ],
    correctAnswer: 'A',
    explanation: 'Bentuk hati memiliki garis simetri lipat di tengah sehingga sisi kiri dan kanan sama persis.'
  }
];
