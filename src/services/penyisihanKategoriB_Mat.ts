import { QuestionItem } from './cbtQuestionTypes';
import { createPenyisihanSvg } from './simulasiSvgIllustrations';

// SOAL RESMI BABAK PENYISIHAN: MATEMATIKA SD/MI (Kategori B)
// 20 Soal Pilihan Ganda Kurikulum Campuran (Merdeka, Cambridge, Singapore, IB)
// Tingkat Kesulitan: Menengah | 100% Bergambar & Unik

export const PENYISIHAN_B_MATEMATIKA: QuestionItem[] = [
  // --- KURIKULUM MERDEKA (Soal 1 - 5) ---
  {
    id: 'PENY-B-MAT-01',
    number: 1,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Perhatikan model pecahan senilai berikut! Nilai pecahan yang ditunjukkan oleh daerah yang diarsir pada Gambar 1 dan Gambar 2 adalah setara. Berapakah nilai n pada gambar?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Pecahan Senilai', 'Model Pecahan Senilai', '#2563EB',
        `<g transform="translate(40, 15)">
          <rect x="10" y="20" width="130" height="70" rx="8" fill="#EFF6FF" stroke="#2563EB" stroke-width="2"/>
          <rect x="10" y="20" width="65" height="70" fill="#3B82F6"/>
          <text x="75" y="115" font-size="12" font-weight="bold" fill="#1E40AF" text-anchor="middle">Gambar 1: 2/4 = 1/2</text>
          
          <text x="175" y="65" font-size="24" font-weight="bold" fill="#2563EB" text-anchor="middle">=</text>
          
          <rect x="210" y="20" width="130" height="70" rx="8" fill="#EFF6FF" stroke="#2563EB" stroke-width="2"/>
          <rect x="210" y="20" width="65" height="70" fill="#60A5FA"/>
          <line x1="242" y1="20" x2="242" y2="90" stroke="#FFFFFF" stroke-width="1.5"/>
          <line x1="275" y1="20" x2="275" y2="90" stroke="#2563EB" stroke-width="1.5"/>
          <line x1="307" y1="20" x2="307" y2="90" stroke="#FFFFFF" stroke-width="1.5"/>
          <text x="275" y="115" font-size="12" font-weight="bold" fill="#1E40AF" text-anchor="middle">Gambar 2: n/8</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'n = 2' },
      { key: 'B', text: 'n = 3' },
      { key: 'C', text: 'n = 4' },
      { key: 'D', text: 'n = 5' }
    ],
    correctAnswer: 'C',
    explanation: 'Daerah terarsir pada Gambar 1 bernilai 2/4 atau 1/2. Pecahan senilai dengan penyebut 8 adalah 1/2 = 4/8, sehingga nilai n = 4.'
  },
  {
    id: 'PENY-B-MAT-02',
    number: 2,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Sebuah taman kota berbentuk bangun datar gabungan seperti pada sketsa gambar. Berapakah luas total taman tersebut?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Geometri', 'Luas Bangun Datar Gabungan', '#16A34A',
        `<g transform="translate(60, 10)">
          <!-- Persegi panjang bawah -->
          <rect x="40" y="45" width="200" height="60" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/>
          <!-- Persegi atas -->
          <rect x="90" y="5" width="100" height="40" fill="#BBF7D0" stroke="#16A34A" stroke-width="2"/>
          <text x="140" y="28" font-size="11" font-weight="bold" fill="#15803D" text-anchor="middle">Bagian A: 10 m × 4 m</text>
          <text x="140" y="80" font-size="11" font-weight="bold" fill="#15803D" text-anchor="middle">Bagian B: 20 m × 6 m</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '140 m²' },
      { key: 'B', text: '160 m²' },
      { key: 'C', text: '180 m²' },
      { key: 'D', text: '200 m²' }
    ],
    correctAnswer: 'B',
    explanation: 'Luas Bagian A = 10 m × 4 m = 40 m². Luas Bagian B = 20 m × 6 m = 120 m². Luas total = 40 m² + 120 m² = 160 m².'
  },
  {
    id: 'PENY-B-MAT-03',
    number: 3,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Lampu hias merah menyala setiap 6 detik sekali, sedangkan lampu hijau menyala setiap 8 detik sekali. Jika kedua lampu menyala bersamaan pada detik ke-0, pada detik ke berapa kedua lampu akan menyala bersamaan lagi untuk pertama kali?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Bilangan (KPK)', 'Jadwal Nyala Lampu Bersama', '#D97706',
        `<g transform="translate(50, 15)">
          <circle cx="60" cy="50" r="30" fill="#FEE2E2" stroke="#DC2626" stroke-width="2"/>
          <text x="60" y="55" font-size="12" font-weight="bold" fill="#B91C1C" text-anchor="middle">Merah: 6s</text>
          <circle cx="240" cy="50" r="30" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/>
          <text x="240" y="55" font-size="12" font-weight="bold" fill="#15803D" text-anchor="middle">Hijau: 8s</text>
          <path d="M 100 50 Q 150 20 200 50" fill="none" stroke="#D97706" stroke-width="2" stroke-dasharray="4"/>
          <text x="150" y="75" font-size="12" font-weight="800" fill="#B45309" text-anchor="middle">KPK (6, 8) = ?</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Detik ke-14' },
      { key: 'B', text: 'Detik ke-18' },
      { key: 'C', text: 'Detik ke-24' },
      { key: 'D', text: 'Detik ke-48' }
    ],
    correctAnswer: 'C',
    explanation: 'Kelipatan persekutuan terkecil (KPK) dari 6 dan 8: Kelipatan 6 = {6, 12, 18, 24, ...}; Kelipatan 8 = {8, 16, 24, ...}. KPK = 24 detik.'
  },
  {
    id: 'PENY-B-MAT-04',
    number: 4,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Diagram batang berikut menunjukkan data pengunjung perpustakaan sekolah selama 5 hari. Berapakah rata-rata (mean) pengunjung per hari?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Statistika', 'Diagram Batang Pengunjung', '#7C3AED',
        `<g transform="translate(60, 10)">
          <!-- Sumbu X & Y -->
          <line x1="20" y1="100" x2="280" y2="100" stroke="#6B7280" stroke-width="2"/>
          <line x1="20" y1="10" x2="20" y2="100" stroke="#6B7280" stroke-width="2"/>
          <!-- Batang Senin (30) -->
          <rect x="40" y="55" width="25" height="45" fill="#C4B5FD"/>
          <text x="52" y="115" font-size="10" font-weight="bold" fill="#4B5563" text-anchor="middle">Sen</text>
          <!-- Batang Selasa (40) -->
          <rect x="90" y="40" width="25" height="60" fill="#A78BFA"/>
          <text x="102" y="115" font-size="10" font-weight="bold" fill="#4B5563" text-anchor="middle">Sel</text>
          <!-- Batang Rabu (50) -->
          <rect x="140" y="25" width="25" height="75" fill="#8B5CF6"/>
          <text x="152" y="115" font-size="10" font-weight="bold" fill="#4B5563" text-anchor="middle">Rab</text>
          <!-- Batang Kamis (35) -->
          <rect x="190" y="48" width="25" height="52" fill="#7C3AED"/>
          <text x="202" y="115" font-size="10" font-weight="bold" fill="#4B5563" text-anchor="middle">Kam</text>
          <!-- Batang Jumat (45) -->
          <rect x="240" y="32" width="25" height="68" fill="#6D28D9"/>
          <text x="252" y="115" font-size="10" font-weight="bold" fill="#4B5563" text-anchor="middle">Jum</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '38 siswa' },
      { key: 'B', text: '40 siswa' },
      { key: 'C', text: '42 siswa' },
      { key: 'D', text: '45 siswa' }
    ],
    correctAnswer: 'B',
    explanation: 'Total pengunjung = 30 + 40 + 50 + 35 + 45 = 200 siswa. Rata-rata = 200 / 5 hari = 40 siswa per hari.'
  },
  {
    id: 'PENY-B-MAT-05',
    number: 5,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Sebuah bak penampungan air berbentuk kubus memiliki panjang rusuk bagian dalam 80 cm. Jika bak tersebut sudah terisi 3/4 bagian, berapa liter air yang ada di dalam bak?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Bangun Ruang', 'Volume Kubus 3/4 Terisi', '#0284C7',
        `<g transform="translate(100, 10)">
          <rect x="20" y="20" width="80" height="80" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
          <rect x="20" y="40" width="80" height="60" fill="#38BDF8" fill-opacity="0.6"/>
          <text x="60" y="75" font-size="12" font-weight="bold" fill="#0369A1" text-anchor="middle">Air 3/4</text>
          <text x="60" y="115" font-size="11" font-weight="bold" fill="#1E293B" text-anchor="middle">s = 80 cm</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '256 liter' },
      { key: 'B', text: '384 liter' },
      { key: 'C', text: '420 liter' },
      { key: 'D', text: '512 liter' }
    ],
    correctAnswer: 'B',
    explanation: 'Volume total bak = s³ = 80 × 80 × 80 = 512.000 cm³ = 512 liter. Volume air (3/4 bagian) = 3/4 × 512 = 384 liter.'
  },

  // --- CAMBRIDGE PRIMARY (Soal 6 - 10) ---
  {
    id: 'PENY-B-MAT-06',
    number: 6,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Look at the angle diagram on a straight line. Angle x and an angle of 65° form a linear pair on line AB. What is the value of angle x?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Angles', 'Angles on a Straight Line', '#DC2626',
        `<g transform="translate(60, 20)">
          <line x1="20" y1="80" x2="260" y2="80" stroke="#1E293B" stroke-width="3"/>
          <line x1="140" y1="80" x2="210" y2="15" stroke="#DC2626" stroke-width="3"/>
          <path d="M 170 80 A 30 30 0 0 0 162 60" fill="none" stroke="#DC2626" stroke-width="2"/>
          <text x="180" y="65" font-size="12" font-weight="bold" fill="#DC2626">65°</text>
          <path d="M 110 80 A 30 30 0 0 1 145 50" fill="none" stroke="#2563EB" stroke-width="2"/>
          <text x="110" y="65" font-size="12" font-weight="bold" fill="#2563EB">x</text>
          <text x="140" y="105" font-size="11" font-weight="bold" fill="#64748B" text-anchor="middle">Line AB = 180°</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '105°' },
      { key: 'B', text: '115°' },
      { key: 'C', text: '125°' },
      { key: 'D', text: '135°' }
    ],
    correctAnswer: 'B',
    explanation: 'Angles on a straight line add up to 180°. Therefore, x = 180° - 65° = 115°.'
  },
  {
    id: 'PENY-B-MAT-07',
    number: 7,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'A train departs from City A at 08:45 and arrives at City B at 11:15. How long did the journey take?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Time Interval', 'Journey Elapsed Time', '#0D9488',
        `<g transform="translate(60, 20)">
          <rect x="20" y="20" width="100" height="60" rx="10" fill="#CCFBF1" stroke="#0D9488" stroke-width="2"/>
          <text x="70" y="45" font-size="14" font-weight="900" fill="#0F766E" text-anchor="middle">08:45</text>
          <text x="70" y="65" font-size="10" font-weight="bold" fill="#0D9488" text-anchor="middle">Departure</text>
          
          <line x1="130" y1="50" x2="170" y2="50" stroke="#0D9488" stroke-width="3" stroke-dasharray="4"/>
          
          <rect x="180" y="20" width="100" height="60" rx="10" fill="#CCFBF1" stroke="#0D9488" stroke-width="2"/>
          <text x="230" y="45" font-size="14" font-weight="900" fill="#0F766E" text-anchor="middle">11:15</text>
          <text x="230" y="65" font-size="10" font-weight="bold" fill="#0D9488" text-anchor="middle">Arrival</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '2 hours 15 minutes' },
      { key: 'B', text: '2 hours 30 minutes' },
      { key: 'C', text: '2 hours 45 minutes' },
      { key: 'D', text: '3 hours' }
    ],
    correctAnswer: 'B',
    explanation: 'From 08:45 to 09:00 is 15 minutes. From 09:00 to 11:00 is 2 hours. From 11:00 to 11:15 is 15 minutes. Total = 2 hours + 15 min + 15 min = 2 hours 30 minutes.'
  },
  {
    id: 'PENY-B-MAT-08',
    number: 8,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Convert 3.75 into a mixed number in its simplest form. Which of the following is correct?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Number', 'Decimal to Mixed Number', '#4F46E5',
        `<g transform="translate(80, 20)">
          <rect x="20" y="20" width="200" height="60" rx="12" fill="#EEF2FF" stroke="#4F46E5" stroke-width="2"/>
          <text x="120" y="48" font-size="18" font-weight="bold" fill="#3730A3" text-anchor="middle">3.75 = 3 + 75/100</text>
          <text x="120" y="68" font-size="11" font-weight="bold" fill="#4F46E5" text-anchor="middle">Simplify fraction to lowest terms</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '3 1/4' },
      { key: 'B', text: '3 1/2' },
      { key: 'C', text: '3 3/4' },
      { key: 'D', text: '3 4/5' }
    ],
    correctAnswer: 'C',
    explanation: '3.75 = 3 and 75/100. Simplifying 75/100 by dividing numerator and denominator by 25 yields 3/4. Thus, 3 3/4.'
  },
  {
    id: 'PENY-B-MAT-09',
    number: 9,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Look at the rectangle with perimeter 48 cm. If the width is 9 cm, what is the length of the rectangle?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Perimeter', 'Perimeter of a Rectangle', '#EA580C',
        `<g transform="translate(60, 15)">
          <rect x="30" y="25" width="220" height="60" rx="6" fill="#FFF7ED" stroke="#EA580C" stroke-width="2"/>
          <text x="140" y="20" font-size="12" font-weight="bold" fill="#C2410C" text-anchor="middle">Length (L) = ?</text>
          <text x="260" y="60" font-size="12" font-weight="bold" fill="#C2410C">9 cm</text>
          <text x="140" y="60" font-size="13" font-weight="bold" fill="#9A3412" text-anchor="middle">Perimeter = 48 cm</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '12 cm' },
      { key: 'B', text: '15 cm' },
      { key: 'C', text: '18 cm' },
      { key: 'D', text: '21 cm' }
    ],
    correctAnswer: 'B',
    explanation: 'Perimeter = 2 × (Length + Width) = 48. Length + Width = 24. Length = 24 - 9 = 15 cm.'
  },
  {
    id: 'PENY-B-MAT-10',
    number: 10,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'A recipe uses flour and sugar in the ratio 4 : 3. If Sarah uses 360 g of flour, how much sugar does she need?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Ratio', 'Ratio of Flour to Sugar', '#10B981',
        `<g transform="translate(60, 20)">
          <rect x="20" y="20" width="120" height="30" fill="#D1FAE5" stroke="#10B981" stroke-width="1.5"/>
          <text x="80" y="40" font-size="11" font-weight="bold" fill="#065F46" text-anchor="middle">Flour (4 parts) = 360g</text>
          <rect x="20" y="60" width="90" height="30" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
          <text x="65" y="80" font-size="11" font-weight="bold" fill="#92400E" text-anchor="middle">Sugar (3 parts) = ?</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '240 g' },
      { key: 'B', text: '270 g' },
      { key: 'C', text: '300 g' },
      { key: 'D', text: '320 g' }
    ],
    correctAnswer: 'B',
    explanation: '4 parts = 360 g, so 1 part = 360 / 4 = 90 g. 3 parts of sugar = 3 × 90 g = 270 g.'
  },

  // --- SINGAPORE CURRICULUM (Soal 11 - 15) ---
  {
    id: 'PENY-B-MAT-11',
    number: 11,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Using the Singapore Bar Model below: Ali and Ben have $180 altogether. Ali has twice as much money as Ben. How much money does Ali have?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Bar Model', 'Comparison Bar Model', '#8B5CF6',
        `<g transform="translate(50, 15)">
          <text x="30" y="35" font-size="12" font-weight="bold" fill="#6D28D9">Ali:</text>
          <rect x="65" y="20" width="70" height="25" fill="#DDD6FE" stroke="#8B5CF6" stroke-width="1.5"/>
          <rect x="135" y="20" width="70" height="25" fill="#DDD6FE" stroke="#8B5CF6" stroke-width="1.5"/>
          
          <text x="30" y="70" font-size="12" font-weight="bold" fill="#6D28D9">Ben:</text>
          <rect x="65" y="55" width="70" height="25" fill="#DDD6FE" stroke="#8B5CF6" stroke-width="1.5"/>
          
          <path d="M 215 20 C 235 20 235 80 215 80" fill="none" stroke="#6D28D9" stroke-width="2"/>
          <text x="245" y="55" font-size="14" font-weight="bold" fill="#4C1D95">Total = $180</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '$60' },
      { key: 'B', text: '$90' },
      { key: 'C', text: '$120' },
      { key: 'D', text: '$140' }
    ],
    correctAnswer: 'C',
    explanation: 'Total units = 2 units (Ali) + 1 unit (Ben) = 3 units. 3 units = $180, so 1 unit = $60. Ali has 2 units = 2 × $60 = $120.'
  },
  {
    id: 'PENY-B-MAT-12',
    number: 12,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Look at the balance scale model. 3 identical cubes balance with 1 cube plus a 14 kg weight. What is the mass of one cube?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Balance Model', 'Algebraic Balance Scale', '#059669',
        `<g transform="translate(60, 20)">
          <!-- Balance beam -->
          <line x1="20" y1="50" x2="260" y2="50" stroke="#334155" stroke-width="4"/>
          <polygon points="140,50 130,85 150,85" fill="#64748B"/>
          <!-- Left pan: 3 cubes -->
          <rect x="40" y="25" width="20" height="20" fill="#34D399" stroke="#059669" stroke-width="1.5"/>
          <rect x="65" y="25" width="20" height="20" fill="#34D399" stroke="#059669" stroke-width="1.5"/>
          <rect x="90" y="25" width="20" height="20" fill="#34D399" stroke="#059669" stroke-width="1.5"/>
          <text x="75" y="15" font-size="10" font-weight="bold" fill="#065F46" text-anchor="middle">3 cubes</text>
          <!-- Right pan: 1 cube + 14 kg -->
          <rect x="180" y="25" width="20" height="20" fill="#34D399" stroke="#059669" stroke-width="1.5"/>
          <circle cx="225" cy="35" r="14" fill="#FDE047" stroke="#CA8A04" stroke-width="1.5"/>
          <text x="225" y="39" font-size="9" font-weight="bold" fill="#854D0E" text-anchor="middle">14 kg</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '5 kg' },
      { key: 'B', text: '6 kg' },
      { key: 'C', text: '7 kg' },
      { key: 'D', text: '8 kg' }
    ],
    correctAnswer: 'C',
    explanation: 'Equation: 3c = c + 14. Subtract 1c from both sides: 2c = 14 kg, so c = 7 kg.'
  },
  {
    id: 'PENY-B-MAT-13',
    number: 13,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'A bookstore sells a storybook with an original price of $40 at a 25% discount. What is the discounted selling price of the book?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Percentage', 'Percentage Discount Model', '#E11D48',
        `<g transform="translate(60, 20)">
          <rect x="20" y="20" width="240" height="30" rx="4" fill="#FFE4E6" stroke="#E11D48" stroke-width="1.5"/>
          <!-- 25% discount section -->
          <rect x="200" y="20" width="60" height="30" fill="#FDA4AF"/>
          <text x="230" y="40" font-size="11" font-weight="bold" fill="#9F1239" text-anchor="middle">25% Off</text>
          <text x="110" y="40" font-size="11" font-weight="bold" fill="#BE123C" text-anchor="middle">75% Selling Price</text>
          <text x="140" y="75" font-size="12" font-weight="bold" fill="#881337" text-anchor="middle">Original Price = $40 (100%)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '$28' },
      { key: 'B', text: '$30' },
      { key: 'C', text: '$32' },
      { key: 'D', text: '$35' }
    ],
    correctAnswer: 'B',
    explanation: 'Discount amount = 25% × $40 = 1/4 × $40 = $10. Discounted price = $40 - $10 = $30.'
  },
  {
    id: 'PENY-B-MAT-14',
    number: 14,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'A car travels at an average speed of 60 km/h. How many kilometers will the car travel in 2 hours and 30 minutes?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Speed & Distance', 'Speed, Distance, Time', '#0284C7',
        `<g transform="translate(60, 20)">
          <rect x="30" y="20" width="220" height="50" rx="8" fill="#F0F9FF" stroke="#0284C7" stroke-width="2"/>
          <text x="140" y="42" font-size="12" font-weight="bold" fill="#0369A1" text-anchor="middle">Speed = 60 km/h</text>
          <text x="140" y="60" font-size="12" font-weight="bold" fill="#0284C7" text-anchor="middle">Time = 2.5 hours (2 h 30 min)</text>
          <text x="140" y="90" font-size="11" font-weight="800" fill="#075985" text-anchor="middle">Distance = Speed × Time</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '120 km' },
      { key: 'B', text: '140 km' },
      { key: 'C', text: '150 km' },
      { key: 'D', text: '160 km' }
    ],
    correctAnswer: 'C',
    explanation: 'Distance = Speed × Time = 60 km/h × 2.5 hours = 150 km.'
  },
  {
    id: 'PENY-B-MAT-15',
    number: 15,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Mrs. Tan had some apples. She gave 2/5 of her apples to her neighbor and had 24 apples left. How many apples did Mrs. Tan have at first?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Fraction Model', 'Part-Whole Fraction Model', '#D97706',
        `<g transform="translate(60, 20)">
          <!-- 5 equal boxes -->
          <rect x="20" y="20" width="40" height="35" fill="#FED7AA" stroke="#D97706" stroke-width="1.5"/>
          <rect x="60" y="20" width="40" height="35" fill="#FED7AA" stroke="#D97706" stroke-width="1.5"/>
          <text x="60" y="70" font-size="10" font-weight="bold" fill="#9A3412" text-anchor="middle">2/5 given</text>
          
          <rect x="100" y="20" width="40" height="35" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
          <rect x="140" y="20" width="40" height="35" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
          <rect x="180" y="20" width="40" height="35" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
          <text x="160" y="70" font-size="10" font-weight="bold" fill="#92400E" text-anchor="middle">3/5 left = 24 apples</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '36 apples' },
      { key: 'B', text: '40 apples' },
      { key: 'C', text: '44 apples' },
      { key: 'D', text: '48 apples' }
    ],
    correctAnswer: 'B',
    explanation: 'The remaining portion is 1 - 2/5 = 3/5. 3 units = 24 apples, so 1 unit = 24 / 3 = 8 apples. Total apples at first = 5 units = 5 × 8 = 40 apples.'
  },

  // --- INTERNATIONAL BACCALAUREATE (IB PYP) (Soal 16 - 20) ---
  {
    id: 'PENY-B-MAT-16',
    number: 16,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'An inquiry team plans a class hydroponic garden with a budget of Rp 500.000. They spend 40% on nutrient kits, 35% on seed packets, and save the remainder. How much money is saved?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Real-world Budget', 'Budget Allocation Pie Chart', '#047857',
        `<g transform="translate(60, 20)">
          <!-- Circular budget representation -->
          <circle cx="70" cy="50" r="35" fill="#ECFDF5" stroke="#047857" stroke-width="2"/>
          <text x="70" y="45" font-size="10" font-weight="bold" fill="#065F46" text-anchor="middle">Nutrient 40%</text>
          <text x="70" y="60" font-size="10" font-weight="bold" fill="#047857" text-anchor="middle">Seeds 35%</text>
          
          <rect x="130" y="25" width="130" height="50" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5"/>
          <text x="195" y="45" font-size="11" font-weight="bold" fill="#15803D" text-anchor="middle">Saved = 25%</text>
          <text x="195" y="62" font-size="10" font-weight="bold" fill="#16A34A" text-anchor="middle">Budget: Rp 500.000</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Rp 100.000' },
      { key: 'B', text: 'Rp 125.000' },
      { key: 'C', text: 'Rp 150.000' },
      { key: 'D', text: 'Rp 175.000' }
    ],
    correctAnswer: 'B',
    explanation: 'Remainder percentage = 100% - (40% + 35%) = 25%. Money saved = 25% × Rp 500.000 = 1/4 × Rp 500.000 = Rp 125.000.'
  },
  {
    id: 'PENY-B-MAT-17',
    number: 17,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Investigate the geometric tessellation pattern shown. Pattern 1 has 1 square, Pattern 2 has 4 squares, and Pattern 3 has 9 squares. How many small squares will Pattern 6 have?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Pattern Investigation', 'Square Number Patterns', '#6366F1',
        `<g transform="translate(60, 20)">
          <!-- Pattern 1 -->
          <rect x="20" y="40" width="20" height="20" fill="#E0E7FF" stroke="#4F46E5" stroke-width="1.5"/>
          <text x="30" y="75" font-size="10" font-weight="bold" fill="#4338CA" text-anchor="middle">P1 = 1</text>
          <!-- Pattern 2 -->
          <rect x="70" y="30" width="30" height="30" fill="#C7D2FE" stroke="#4F46E5" stroke-width="1.5"/>
          <line x1="85" y1="30" x2="85" y2="60" stroke="#4F46E5"/>
          <line x1="70" y1="45" x2="100" y2="45" stroke="#4F46E5"/>
          <text x="85" y="75" font-size="10" font-weight="bold" fill="#4338CA" text-anchor="middle">P2 = 4</text>
          <!-- Pattern 3 -->
          <rect x="130" y="20" width="40" height="40" fill="#A5B4FC" stroke="#4F46E5" stroke-width="1.5"/>
          <text x="150" y="75" font-size="10" font-weight="bold" fill="#4338CA" text-anchor="middle">P3 = 9</text>
          <text x="210" y="50" font-size="12" font-weight="bold" fill="#312E81">P6 = n² = ?</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '25 kotak' },
      { key: 'B', text: '30 kotak' },
      { key: 'C', text: '36 kotak' },
      { key: 'D', text: '42 kotak' }
    ],
    correctAnswer: 'C',
    explanation: 'The pattern represents square numbers (n²): P1 = 1² = 1; P2 = 2² = 4; P3 = 3² = 9. For Pattern 6: 6² = 36 small squares.'
  },
  {
    id: 'PENY-B-MAT-18',
    number: 18,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'In an environmental science project, a map has a scale of 1 : 50.000. If the distance between two mangrove reserves on the map is 6 cm, what is the actual distance in kilometers?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Scale & Mapping', 'Scale Ratio 1 : 50.000', '#B45309',
        `<g transform="translate(60, 20)">
          <rect x="20" y="20" width="240" height="50" rx="8" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
          <line x1="40" y1="45" x2="160" y2="45" stroke="#B45309" stroke-width="3"/>
          <circle cx="40" cy="45" r="4" fill="#92400E"/>
          <circle cx="160" cy="45" r="4" fill="#92400E"/>
          <text x="100" y="38" font-size="11" font-weight="bold" fill="#B45309" text-anchor="middle">6 cm on map</text>
          <text x="210" y="48" font-size="11" font-weight="bold" fill="#92400E">Actual = ? km</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '2,5 km' },
      { key: 'B', text: '3,0 km' },
      { key: 'C', text: '3,5 km' },
      { key: 'D', text: '4,0 km' }
    ],
    correctAnswer: 'B',
    explanation: 'Actual distance = 6 cm × 50.000 = 300.000 cm. Converting to kilometers: 300.000 cm / 100.000 = 3,0 km.'
  },
  {
    id: 'PENY-B-MAT-19',
    number: 19,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Students spin an 8-sector fair spinner where 2 sectors are Blue, 3 are Green, 2 are Yellow, and 1 is Red. What is the probability of the spinner landing on Green?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Probability Inquiry', 'Fair Probability Spinner', '#0D9488',
        `<g transform="translate(60, 15)">
          <circle cx="80" cy="50" r="35" fill="#F0FDFA" stroke="#0D9488" stroke-width="2"/>
          <line x1="80" y1="15" x2="80" y2="85" stroke="#0D9488"/>
          <line x1="45" y1="50" x2="115" y2="50" stroke="#0D9488"/>
          <line x1="55" y1="25" x2="105" y2="75" stroke="#0D9488"/>
          <line x1="55" y1="75" x2="105" y2="25" stroke="#0D9488"/>
          
          <rect x="140" y="25" width="120" height="50" rx="8" fill="#CCFBF1" stroke="#0D9488" stroke-width="1.5"/>
          <text x="200" y="45" font-size="11" font-weight="bold" fill="#0F766E" text-anchor="middle">Total sectors = 8</text>
          <text x="200" y="62" font-size="11" font-weight="bold" fill="#115E59" text-anchor="middle">Green sectors = 3</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '1/8' },
      { key: 'B', text: '2/8 atau 1/4' },
      { key: 'C', text: '3/8' },
      { key: 'D', text: '1/2' }
    ],
    correctAnswer: 'C',
    explanation: 'Probability P(Green) = (Number of favorable outcomes) / (Total outcomes) = 3 / 8.'
  },
  {
    id: 'PENY-B-MAT-20',
    number: 20,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'A science club conducted an experiment measuring plant height over 4 weeks: Week 1 (5 cm), Week 2 (9 cm), Week 3 (14 cm), Week 4 (20 cm). What was the greatest weekly growth in height?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Data Analysis', 'Weekly Growth Line Graph', '#15803D',
        `<g transform="translate(60, 15)">
          <line x1="20" y1="85" x2="240" y2="85" stroke="#64748B" stroke-width="2"/>
          <line x1="20" y1="15" x2="20" y2="85" stroke="#64748B" stroke-width="2"/>
          <!-- Points -->
          <circle cx="50" cy="70" r="4" fill="#16A34A"/>
          <text x="50" y="98" font-size="9" font-weight="bold" fill="#334155" text-anchor="middle">W1 (5cm)</text>
          <circle cx="100" cy="55" r="4" fill="#16A34A"/>
          <text x="100" y="98" font-size="9" font-weight="bold" fill="#334155" text-anchor="middle">W2 (9cm)</text>
          <circle cx="150" cy="40" r="4" fill="#16A34A"/>
          <text x="150" y="98" font-size="9" font-weight="bold" fill="#334155" text-anchor="middle">W3 (14cm)</text>
          <circle cx="200" cy="20" r="4" fill="#16A34A"/>
          <text x="200" y="98" font-size="9" font-weight="bold" fill="#334155" text-anchor="middle">W4 (20cm)</text>
          <polyline points="50,70 100,55 150,40 200,20" fill="none" stroke="#16A34A" stroke-width="2"/>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '4 cm (W1 ke W2)' },
      { key: 'B', text: '5 cm (W2 ke W3)' },
      { key: 'C', text: '6 cm (W3 ke W4)' },
      { key: 'D', text: '7 cm (W2 ke W4)' }
    ],
    correctAnswer: 'C',
    explanation: 'Weekly growths: Week 1 to 2 = 9 - 5 = 4 cm; Week 2 to 3 = 14 - 9 = 5 cm; Week 3 to 4 = 20 - 14 = 6 cm. The greatest weekly growth was 6 cm.'
  }
];
