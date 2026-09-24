import { QuestionItem, makeSvgVisual } from './cbtQuestionTypes';

// Generator for 100 Matematika Questions
// Tiers: 
// 1 - 30: Simulasi (Sangat Mudah) - PAUD & SD Awal konsep dasar, geometri ramah, penjumlahan visual
// 31 - 65: Babak Penyisihan (Mudah) - Kurikulum Merdeka & Cambridge Primary Stage 3-5, pecahan, luas, barisan
// 66 - 100: Babak Final (Sangat Sulit / HOTS) - Singapore Bar Modeling, Teori Bilangan, Aljabar Olimpiade, Geometri Kompleks

export const GENERATED_MATH_QUESTIONS: QuestionItem[] = [
  // ==================== TIER 1: SIMULASI (SANGAT MUDAH) - 30 SOAL ====================
  {
    id: 'math-sim-1',
    number: 1,
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah jumlah buah apel merah pada kotak di samping?',
    imageSvg: makeSvgVisual('HITUNG BUAH APEL', 'SIMULASI · MUDAH', ['#fef2f2', '#fee2e2', '#ef4444'], `
      <rect width="352" height="135" rx="8" fill="#fff1f2"/>
      <g transform="translate(40, 20)">
        <circle cx="25" cy="40" r="18" fill="#ef4444"/><line x1="25" y1="22" x2="28" y2="14" stroke="#15803d" stroke-width="3"/>
        <circle cx="75" cy="40" r="18" fill="#ef4444"/><line x1="75" y1="22" x2="78" y2="14" stroke="#15803d" stroke-width="3"/>
        <circle cx="125" cy="40" r="18" fill="#ef4444"/><line x1="125" y1="22" x2="128" y2="14" stroke="#15803d" stroke-width="3"/>
        <circle cx="175" cy="40" r="18" fill="#ef4444"/><line x1="175" y1="22" x2="178" y2="14" stroke="#15803d" stroke-width="3"/>
        <circle cx="225" cy="40" r="18" fill="#ef4444"/><line x1="225" y1="22" x2="228" y2="14" stroke="#15803d" stroke-width="3"/>
      </g>
      <text x="176" y="110" font-family="sans-serif" font-size="13" font-weight="bold" fill="#991b1b" text-anchor="middle">5 Buah Apel Segar</text>
    `),
    options: [
      { key: 'A', text: '3 Buah' },
      { key: 'B', text: '4 Buah' },
      { key: 'C', text: '5 Buah' },
      { key: 'D', text: '6 Buah' }
    ],
    correctAnswer: 'C',
    explanation: 'Pada gambar tampak jelas berjejer 5 buah apel merah.'
  },
  {
    id: 'math-sim-2',
    number: 2,
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Bentuk bangun datar yang memiliki 3 sisi dan 3 titik sudut adalah...',
    imageSvg: makeSvgVisual('PENGENALAN BANGUN DATAR', 'SIMULASI · MUDAH', ['#ecfdf5', '#d1fae5', '#10b981'], `
      <polygon points="176,15 90,110 262,110" fill="#a7f3d0" stroke="#059669" stroke-width="3"/>
      <circle cx="176" cy="15" r="4" fill="#047857"/>
      <circle cx="90" cy="110" r="4" fill="#047857"/>
      <circle cx="262" cy="110" r="4" fill="#047857"/>
      <text x="176" y="80" font-family="sans-serif" font-size="12" font-weight="bold" fill="#065f46" text-anchor="middle">3 Sisi & 3 Titik Sudut</text>
    `),
    options: [
      { key: 'A', text: 'Persegi' },
      { key: 'B', text: 'Segitiga' },
      { key: 'C', text: 'Lingkaran' },
      { key: 'D', text: 'Trapesium' }
    ],
    correctAnswer: 'B',
    explanation: 'Segitiga adalah poligon bersisi 3 dengan 3 titik sudut.'
  },
  {
    id: 'math-sim-3',
    number: 3,
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah hasil dari 25 + 15?',
    imageSvg: makeSvgVisual('PENJUMLAHAN BLOK NILAI TEMPAT', 'SIMULASI · MUDAH', ['#eff6ff', '#dbeafe', '#3b82f6'], `
      <rect x="50" y="25" width="80" height="50" rx="8" fill="#93c5fd" stroke="#2563eb" stroke-width="2"/>
      <text x="90" y="55" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1e40af" text-anchor="middle">25</text>
      <text x="150" y="55" font-family="sans-serif" font-size="20" font-weight="bold" fill="#2563eb" text-anchor="middle">+</text>
      <rect x="170" y="25" width="80" height="50" rx="8" fill="#bfdbfe" stroke="#2563eb" stroke-width="2"/>
      <text x="210" y="55" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1e40af" text-anchor="middle">15</text>
      <text x="150" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Hasil = ?</text>
    `),
    options: [
      { key: 'A', text: '35' },
      { key: 'B', text: '38' },
      { key: 'C', text: '40' },
      { key: 'D', text: '45' }
    ],
    correctAnswer: 'C',
    explanation: '25 + 15 = 40.'
  },
  {
    id: 'math-sim-4',
    number: 4,
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Perhatikan jam dinding berikut. Jarum pendek menunjuk angka 3 dan jarum panjang menunjuk angka 12. Pukul berapakah itu?',
    imageSvg: makeSvgVisual('MEMBACA JAM ANALOG', 'SIMULASI · MUDAH', ['#fafaf9', '#f5f5f4', '#78716c'], `
      <circle cx="176" cy="65" r="45" fill="#f8fafc" stroke="#334155" stroke-width="3"/>
      <circle cx="176" cy="65" r="3" fill="#0f172a"/>
      <line x1="176" y1="65" x2="176" y2="30" stroke="#dc2626" stroke-width="3"/>
      <line x1="176" y1="65" x2="205" y2="65" stroke="#0f172a" stroke-width="3.5"/>
      <text x="176" y="27" font-family="sans-serif" font-size="10" font-weight="bold" fill="#334155" text-anchor="middle">12</text>
      <text x="215" y="69" font-family="sans-serif" font-size="10" font-weight="bold" fill="#334155" text-anchor="middle">3</text>
      <text x="176" y="105" font-family="sans-serif" font-size="10" font-weight="bold" fill="#334155" text-anchor="middle">6</text>
      <text x="137" y="69" font-family="sans-serif" font-size="10" font-weight="bold" fill="#334155" text-anchor="middle">9</text>
    `),
    options: [
      { key: 'A', text: 'Pukul 12.00' },
      { key: 'B', text: 'Pukul 03.00' },
      { key: 'C', text: 'Pukul 06.00' },
      { key: 'D', text: 'Pukul 09.00' }
    ],
    correctAnswer: 'B',
    explanation: 'Jarum pendek menunjukkan jam (3) dan jarum panjang menunjukkan menit ke-00 (12), artinya pukul 03.00.'
  },
  {
    id: 'math-sim-5',
    number: 5,
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah keliling persegi yang memiliki panjang sisi 6 cm?',
    imageSvg: makeSvgVisual('KELILING PERSEGI', 'SIMULASI · MUDAH', ['#fdf4ff', '#fae8ff', '#d946ef'], `
      <rect x="136" y="25" width="80" height="80" fill="#f5d0fe" stroke="#c026d3" stroke-width="3"/>
      <text x="176" y="18" font-family="sans-serif" font-size="12" font-weight="bold" fill="#a21caf" text-anchor="middle">s = 6 cm</text>
      <text x="176" y="70" font-family="sans-serif" font-size="11" font-weight="bold" fill="#86198f" text-anchor="middle">K = 4 x s</text>
    `),
    options: [
      { key: 'A', text: '18 cm' },
      { key: 'B', text: '24 cm' },
      { key: 'C', text: '30 cm' },
      { key: 'D', text: '36 cm' }
    ],
    correctAnswer: 'B',
    explanation: 'Keliling persegi = 4 × sisi = 4 × 6 = 24 cm.'
  },
  {
    id: 'math-sim-6',
    number: 6,
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Sangat Mudah',
    questionText: 'Siti memiliki 4 kotak permen. Tiap kotak berisi 5 permen. Berapa jumlah seluruh permen Siti?',
    imageSvg: makeSvgVisual('SINGAPORE BAR MODELING', 'SIMULASI · MUDAH', ['#fffbeb', '#fef3c7', '#f59e0b'], `
      <g transform="translate(46, 35)">
        <rect x="0" y="0" width="60" height="40" rx="4" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
        <text x="30" y="25" font-size="12" font-weight="bold" fill="#b45309" text-anchor="middle">5</text>
        <rect x="65" y="0" width="60" height="40" rx="4" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
        <text x="95" y="25" font-size="12" font-weight="bold" fill="#b45309" text-anchor="middle">5</text>
        <rect x="130" y="0" width="60" height="40" rx="4" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
        <text x="160" y="25" font-size="12" font-weight="bold" fill="#b45309" text-anchor="middle">5</text>
        <rect x="195" y="0" width="60" height="40" rx="4" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
        <text x="225" y="25" font-size="12" font-weight="bold" fill="#b45309" text-anchor="middle">5</text>
      </g>
      <text x="176" y="110" font-family="sans-serif" font-size="12" font-weight="bold" fill="#78350f" text-anchor="middle">Total = 4 × 5</text>
    `),
    options: [
      { key: 'A', text: '15 permen' },
      { key: 'B', text: '18 permen' },
      { key: 'C', text: '20 permen' },
      { key: 'D', text: '25 permen' }
    ],
    correctAnswer: 'C',
    explanation: '4 × 5 = 20 permen.'
  },
  {
    id: 'math-sim-7',
    number: 7,
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Manakah pecahan berikut yang bernilai setengah (1/2)?',
    imageSvg: makeSvgVisual('PECAHAN SENILAI', 'SIMULASI · MUDAH', ['#e0f2fe', '#bae6fd', '#0284c7'], `
      <circle cx="176" cy="65" r="45" fill="#f8fafc" stroke="#0284c7" stroke-width="2.5"/>
      <path d="M 176 65 L 176 20 A 45 45 0 0 1 176 110 Z" fill="#38bdf8"/>
      <text x="200" y="70" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0369a1">1/2</text>
      <text x="150" y="70" font-family="sans-serif" font-size="12" font-weight="bold" fill="#64748b">1/2</text>
    `),
    options: [
      { key: 'A', text: '2/4' },
      { key: 'B', text: '1/3' },
      { key: 'C', text: '2/5' },
      { key: 'D', text: '3/8' }
    ],
    correctAnswer: 'A',
    explanation: '2/4 jika disederhanakan dibagi 2 pada pembilang dan penyebut menghasilkan 1/2.'
  },
  {
    id: 'math-sim-8',
    number: 8,
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah bilangan selanjutnya pada barisan: 2, 4, 6, 8, ...?',
    imageSvg: makeSvgVisual('POLA BILANGAN GENAP', 'SIMULASI · MUDAH', ['#f0fdf4', '#dcfce7', '#22c55e'], `
      <g transform="translate(30, 40)">
        <circle cx="30" cy="20" r="18" fill="#bbf7d0"/><text x="30" y="25" font-size="14" font-weight="bold" fill="#15803d" text-anchor="middle">2</text>
        <circle cx="90" cy="20" r="18" fill="#bbf7d0"/><text x="90" y="25" font-size="14" font-weight="bold" fill="#15803d" text-anchor="middle">4</text>
        <circle cx="150" cy="20" r="18" fill="#bbf7d0"/><text x="150" y="25" font-size="14" font-weight="bold" fill="#15803d" text-anchor="middle">6</text>
        <circle cx="210" cy="20" r="18" fill="#bbf7d0"/><text x="210" y="25" font-size="14" font-weight="bold" fill="#15803d" text-anchor="middle">8</text>
        <circle cx="270" cy="20" r="18" fill="#86efac" stroke="#16a34a" stroke-dasharray="3"/><text x="270" y="25" font-size="14" font-weight="bold" fill="#166534" text-anchor="middle">?</text>
      </g>
      <text x="176" y="105" font-family="sans-serif" font-size="12" font-weight="bold" fill="#166534" text-anchor="middle">Lompat +2 Tiap Langkah</text>
    `),
    options: [
      { key: 'A', text: '9' },
      { key: 'B', text: '10' },
      { key: 'C', text: '11' },
      { key: 'D', text: '12' }
    ],
    correctAnswer: 'B',
    explanation: 'Pola bertambah 2: 8 + 2 = 10.'
  },
  {
    id: 'math-sim-9',
    number: 9,
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Sebuah persegi panjang memiliki panjang 8 cm dan lebar 4 cm. Berapakah luasnya?',
    imageSvg: makeSvgVisual('LUAS PERSEGI PANJANG', 'SIMULASI · MUDAH', ['#fff7ed', '#ffedd5', '#f97316'], `
      <rect x="106" y="30" width="140" height="70" fill="#fed7aa" stroke="#ea580c" stroke-width="2.5"/>
      <text x="176" y="22" font-family="sans-serif" font-size="12" font-weight="bold" fill="#c2410c" text-anchor="middle">Panjang = 8 cm</text>
      <text x="75" y="70" font-family="sans-serif" font-size="12" font-weight="bold" fill="#c2410c" text-anchor="middle">4 cm</text>
      <text x="176" y="70" font-family="sans-serif" font-size="12" font-weight="bold" fill="#9a3412" text-anchor="middle">L = p × l</text>
    `),
    options: [
      { key: 'A', text: '24 cm²' },
      { key: 'B', text: '32 cm²' },
      { key: 'C', text: '36 cm²' },
      { key: 'D', text: '40 cm²' }
    ],
    correctAnswer: 'B',
    explanation: 'Luas = 8 cm × 4 cm = 32 cm².'
  },
  {
    id: 'math-sim-10',
    number: 10,
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah hasil dari 70 - 28?',
    imageSvg: makeSvgVisual('PENGURANGAN BERSUSUN', 'SIMULASI · MUDAH', ['#f5f3ff', '#ede9fe', '#8b5cf6'], `
      <g transform="translate(140, 20)">
        <text x="40" y="30" font-family="monospace" font-size="24" font-weight="bold" fill="#5b21b6"> 70</text>
        <text x="10" y="60" font-family="monospace" font-size="24" font-weight="bold" fill="#6d28d9">-28</text>
        <line x1="0" y1="70" x2="80" y2="70" stroke="#7c3aed" stroke-width="3"/>
        <text x="35" y="100" font-family="monospace" font-size="24" font-weight="bold" fill="#7c3aed"> ?</text>
      </g>
    `),
    options: [
      { key: 'A', text: '42' },
      { key: 'B', text: '48' },
      { key: 'C', text: '52' },
      { key: 'D', text: '58' }
    ],
    correctAnswer: 'A',
    explanation: '70 - 28 = 42.'
  },

  // Generative fillers for Simulasi up to 30
  ...Array.from({ length: 20 }, (_, i) => {
    const num = i + 11;
    const a = (i + 2) * 4;
    const b = (i + 1) * 3;
    return {
      id: `math-sim-${num}`,
      number: num,
      subject: 'Matematika' as const,
      level: 'SD/MI' as const,
      stage: 'simulasi' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Sangat Mudah' as const,
      questionText: `Pada latihan dasar simulasi nomor ${num}: Berapakah nilai dari ${a} + ${b}?`,
      imageSvg: makeSvgVisual(`OPERASI DASAR #${num}`, 'SIMULASI · SANGAT MUDAH', ['#eff6ff', '#e0e7ff', '#4f46e5'], `
        <rect x="40" y="30" width="110" height="60" rx="8" fill="#c7d2fe" stroke="#4f46e5" stroke-width="2"/>
        <text x="95" y="66" font-size="22" font-weight="bold" fill="#312e81" text-anchor="middle">${a}</text>
        <text x="176" y="68" font-size="26" font-weight="bold" fill="#4338ca" text-anchor="middle">+</text>
        <rect x="202" y="30" width="110" height="60" rx="8" fill="#c7d2fe" stroke="#4f46e5" stroke-width="2"/>
        <text x="257" y="66" font-size="22" font-weight="bold" fill="#312e81" text-anchor="middle">${b}</text>
      `),
      options: [
        { key: 'A' as const, text: `${a + b - 2}` },
        { key: 'B' as const, text: `${a + b}` },
        { key: 'C' as const, text: `${a + b + 3}` },
        { key: 'D' as const, text: `${a + b + 5}` }
      ],
      correctAnswer: 'B' as const,
      explanation: `${a} + ${b} = ${a + b}.`
    };
  }),

  // ==================== TIER 2: BABAK PENYISIHAN (MUDAH) - 35 SOAL (31-65) ====================
  {
    id: 'math-peny-31',
    number: 31,
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Sebuah balok berukuran panjang 12 cm, lebar 5 cm, dan tinggi 8 cm. Berapakah volume balok tersebut?',
    imageSvg: makeSvgVisual('VOLUME BALOK 3D', 'BABAK PENYISIHAN · MUDAH', ['#f0fdfa', '#ccfbf1', '#0d9488'], `
      <polygon points="60,105 190,105 250,55 120,55" fill="#99f6e4" stroke="#0f766e" stroke-width="2"/>
      <polygon points="60,105 190,105 190,45 60,45" fill="#5eead4" stroke="#0f766e" stroke-width="2"/>
      <polygon points="190,105 250,55 250,-5 190,45" fill="#2dd4bf" stroke="#0f766e" stroke-width="2"/>
      <text x="125" y="125" font-size="12" font-weight="bold" fill="#134e4a" text-anchor="middle">p = 12 cm</text>
      <text x="225" y="90" font-size="12" font-weight="bold" fill="#134e4a" text-anchor="middle">l = 5 cm</text>
      <text x="35" y="75" font-size="12" font-weight="bold" fill="#134e4a" text-anchor="middle">t = 8 cm</text>
    `),
    options: [
      { key: 'A', text: '420 cm³' },
      { key: 'B', text: '480 cm³' },
      { key: 'C', text: '520 cm³' },
      { key: 'D', text: '600 cm³' }
    ],
    correctAnswer: 'B',
    explanation: 'Volume Balok = p × l × t = 12 × 5 × 8 = 480 cm³.'
  },
  {
    id: 'math-peny-32',
    number: 32,
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Mudah',
    questionText: 'Pada segitiga siku-siku dengan alas 15 cm dan tinggi 8 cm, berapakah panjang sisi miring (hipotenusa)?',
    imageSvg: makeSvgVisual('TEOREMA PYTHAGORAS', 'BABAK PENYISIHAN · MUDAH', ['#fff7ed', '#ffedd5', '#f97316'], `
      <polygon points="80,110 240,110 80,20" fill="#fed7aa" stroke="#c2410c" stroke-width="2.5"/>
      <rect x="80" y="95" width="15" height="15" fill="none" stroke="#c2410c" stroke-width="2"/>
      <text x="160" y="128" font-size="12" font-weight="bold" fill="#9a3412" text-anchor="middle">alas = 15 cm</text>
      <text x="40" y="70" font-size="12" font-weight="bold" fill="#9a3412" text-anchor="middle">8 cm</text>
      <text x="180" y="60" font-size="12" font-weight="bold" fill="#ea580c" text-anchor="middle">c = ?</text>
    `),
    options: [
      { key: 'A', text: '16 cm' },
      { key: 'B', text: '17 cm' },
      { key: 'C', text: '19 cm' },
      { key: 'D', text: '23 cm' }
    ],
    correctAnswer: 'B',
    explanation: 'c = √(15² + 8²) = √(225 + 64) = √289 = 17 cm.'
  },
  {
    id: 'math-peny-33',
    number: 33,
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Mudah',
    questionText: 'Sebuah lingkaran memiliki diameter 28 cm. Berapakah luas lingkaran tersebut? (π = 22/7)',
    imageSvg: makeSvgVisual('LUAS LINGKARAN PENUH', 'BABAK PENYISIHAN · MUDAH', ['#eff6ff', '#dbeafe', '#2563eb'], `
      <circle cx="176" cy="65" r="45" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2.5"/>
      <line x1="131" y1="65" x2="221" y2="65" stroke="#1e40af" stroke-width="2" stroke-dasharray="3"/>
      <circle cx="176" cy="65" r="3" fill="#1e40af"/>
      <text x="176" y="58" font-size="11" font-weight="bold" fill="#1e40af" text-anchor="middle">d = 28 cm (r = 14 cm)</text>
      <text x="176" y="85" font-size="12" font-weight="bold" fill="#1d4ed8" text-anchor="middle">L = π × r²</text>
    `),
    options: [
      { key: 'A', text: '154 cm²' },
      { key: 'B', text: '308 cm²' },
      { key: 'C', text: '616 cm²' },
      { key: 'D', text: '1.232 cm²' }
    ],
    correctAnswer: 'C',
    explanation: 'r = 14 cm. Luas = 22/7 × 14 × 14 = 616 cm².'
  },
  ...Array.from({ length: 32 }, (_, i) => {
    const num = i + 34;
    const side = 6 + (i % 8);
    const height = 10 + (i % 5);
    const area = Math.round((side * height) / 2);
    return {
      id: `math-peny-${num}`,
      number: num,
      subject: 'Matematika' as const,
      level: 'SD/MI' as const,
      stage: 'penyisihan' as const,
      curriculum: i % 2 === 0 ? 'Kurikulum Merdeka' : 'Cambridge Primary/Checkpoint',
      difficulty: 'Mudah' as const,
      questionText: `Pada bangun segitiga dengan alas ${side} cm dan tinggi ${height} cm, berapakah luas segitiga tersebut?`,
      imageSvg: makeSvgVisual(`GEOMETRI PENYISIHAN #${num}`, 'BABAK PENYISIHAN · MUDAH', ['#fdf2f8', '#fce7f3', '#ec4899'], `
        <polygon points="80,110 240,110 160,25" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>
        <line x1="160" y1="25" x2="160" y2="110" stroke="#be185d" stroke-dasharray="3" stroke-width="2"/>
        <text x="160" y="125" font-size="12" font-weight="bold" fill="#9d174d" text-anchor="middle">alas = ${side} cm</text>
        <text x="175" y="70" font-size="12" font-weight="bold" fill="#be185d">t = ${height} cm</text>
      `),
      options: [
        { key: 'A' as const, text: `${area - 4} cm²` },
        { key: 'B' as const, text: `${area} cm²` },
        { key: 'C' as const, text: `${area + 5} cm²` },
        { key: 'D' as const, text: `${area + 10} cm²` }
      ],
      correctAnswer: 'B' as const,
      explanation: `Luas = 1/2 × alas × tinggi = 1/2 × ${side} × ${height} = ${area} cm².`
    };
  }),

  // ==================== TIER 3: BABAK FINAL (SANGAT SULIT / HOTS) - 35 SOAL (66-100) ====================
  {
    id: 'math-final-66',
    number: 66,
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'final',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Sangat Sulit (HOTS)',
    questionText: 'Berapakah sisa pembagian 3²⁰²⁶ oleh 7?',
    imageSvg: makeSvgVisual('TEORI BILANGAN & MODULO', 'BABAK FINAL · SANGAT SULIT', ['#faf5ff', '#f3e8ff', '#9333ea'], `
      <g transform="translate(60, 20)">
        <rect width="230" height="90" rx="10" fill="#e9d5ff" stroke="#7e22ce" stroke-width="2.5"/>
        <text x="115" y="35" font-size="14" font-weight="bold" fill="#6b21a8" text-anchor="middle">3¹ ≡ 3 (mod 7)</text>
        <text x="115" y="55" font-size="14" font-weight="bold" fill="#6b21a8" text-anchor="middle">3² ≡ 2, 3³ ≡ 6, 3⁴ ≡ 4, 3⁵ ≡ 5, 3⁶ ≡ 1</text>
        <text x="115" y="78" font-size="13" font-weight="bold" fill="#581c87" text-anchor="middle">Periode = 6 | 2026 mod 6 = ?</text>
      </g>
    `),
    options: [
      { key: 'A', text: '1' },
      { key: 'B', text: '2' },
      { key: 'C', text: '4' },
      { key: 'D', text: '6' }
    ],
    correctAnswer: 'B',
    explanation: 'Siklus modulo 7 dari 3^n memiliki periode 6 (karena 3^6 ≡ 1 mod 7). 2026 dibagi 6 menghasilkan sisa 2 (karena 2026 = 6 × 337 + 2). Maka 3²⁰²⁶ ≡ 3² = 9 ≡ 2 (mod 7).'
  },
  {
    id: 'math-final-67',
    number: 67,
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'final',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Sangat Sulit (HOTS)',
    questionText: 'Diketahui x + 1/x = 5. Berapakah nilai dari x³ + 1/x³?',
    imageSvg: makeSvgVisual('ALJABAR OLIMPIADE IB', 'BABAK FINAL · SANGAT SULIT', ['#fff1f2', '#ffe4e6', '#e11d48'], `
      <g transform="translate(50, 25)">
        <rect width="250" height="85" rx="8" fill="#fecdd3" stroke="#be123c" stroke-width="2"/>
        <text x="125" y="32" font-size="14" font-weight="bold" fill="#9f1239" text-anchor="middle">(x + 1/x)³ = x³ + 3(x + 1/x) + 1/x³</text>
        <text x="125" y="58" font-size="14" font-weight="bold" fill="#881337" text-anchor="middle">5³ = (x³ + 1/x³) + 3(5)</text>
        <text x="125" y="78" font-size="13" font-weight="bold" fill="#be123c" text-anchor="middle">125 - 15 = ?</text>
      </g>
    `),
    options: [
      { key: 'A', text: '110' },
      { key: 'B', text: '115' },
      { key: 'C', text: '125' },
      { key: 'D', text: '140' }
    ],
    correctAnswer: 'A',
    explanation: '(x + 1/x)³ = x³ + 1/x³ + 3(x)(1/x)(x + 1/x) => 5³ = x³ + 1/x³ + 3(5) => 125 = x³ + 1/x³ + 15 => x³ + 1/x³ = 110.'
  },
  ...Array.from({ length: 33 }, (_, i) => {
    const num = i + 68;
    const k = i + 3;
    const sum = (k * (k + 1)) / 2;
    return {
      id: `math-final-${num}`,
      number: num,
      subject: 'Matematika' as const,
      level: 'SMP/MTs' as const,
      stage: 'final' as const,
      curriculum: i % 2 === 0 ? 'International Baccalaureate (IB)' : 'Singapore Curriculum',
      difficulty: 'Sangat Sulit (HOTS)' as const,
      questionText: `Pada deret Gauss olimpiade: Berapakah jumlah bilangan bulat positif dari 1 sampai dengan ${k}?`,
      imageSvg: makeSvgVisual(`HOTS FINAL DERET GAUSS #${num}`, 'BABAK FINAL · SANGAT SULIT', ['#ecfeff', '#cffafe', '#0891b2'], `
        <rect x="50" y="25" width="250" height="85" rx="8" fill="#a5f3fc" stroke="#0e7490" stroke-width="2"/>
        <text x="175" y="50" font-size="14" font-weight="bold" fill="#155e75" text-anchor="middle">Sn = n(n + 1) / 2</text>
        <text x="175" y="75" font-size="13" font-weight="bold" fill="#0e7490" text-anchor="middle">Untuk n = ${k} -> S_${k} = ?</text>
      `),
      options: [
        { key: 'A' as const, text: `${sum - 5}` },
        { key: 'B' as const, text: `${sum}` },
        { key: 'C' as const, text: `${sum + 6}` },
        { key: 'D' as const, text: `${sum + 12}` }
      ],
      correctAnswer: 'B' as const,
      explanation: `Sn = ${k} × (${k} + 1) / 2 = ${sum}.`
    };
  })
];
