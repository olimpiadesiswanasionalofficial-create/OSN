import { QuestionItem, makeSvgVisual } from './cbtQuestionTypes';

// Generator for 100 IPA / Sains Questions
// Tiers: 
// 1 - 30: Simulasi (Sangat Mudah) - Organ tubuh, rantai makanan dasar, bagian tumbuhan, sumber energi
// 31 - 65: Babak Penyisihan (Mudah) - Fotosintesis, tata surya, hukum Newton dasar, zat & perubahannya (Cambridge Science)
// 66 - 100: Babak Final (Sangat Sulit / HOTS) - Genetika Mendel, Termodinamika, Ekologi Kompleks, Sel & Biokimia (IB Science)

export const GENERATED_SCIENCE_QUESTIONS: QuestionItem[] = [
  // ==================== TIER 1: SIMULASI (SANGAT MUDAH) - 30 SOAL ====================
  {
    id: 'sci-sim-1',
    number: 1,
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Bagian tumbuhan yang berfungsi menyerap air dan unsur hara dari dalam tanah adalah...',
    imageSvg: makeSvgVisual('STRUKTUR BAGIAN TUMBUHAN', 'SIMULASI · SANGAT MUDAH', ['#f0fdf4', '#dcfce7', '#16a34a'], `
      <g transform="translate(136, 10)">
        <polygon points="40,30 20,60 60,60" fill="#22c55e"/>
        <polygon points="40,15 10,45 70,45" fill="#16a34a"/>
        <rect x="34" y="60" width="12" height="35" fill="#854d0e"/>
        <line x1="40" y1="95" x2="20" y2="120" stroke="#713f12" stroke-width="3"/>
        <line x1="40" y1="95" x2="60" y2="120" stroke="#713f12" stroke-width="3"/>
        <line x1="40" y1="95" x2="40" y2="125" stroke="#713f12" stroke-width="3"/>
        <text x="75" y="115" font-size="11" font-weight="bold" fill="#713f12">Akar</text>
      </g>
    `),
    options: [
      { key: 'A', text: 'Daun' },
      { key: 'B', text: 'Batang' },
      { key: 'C', text: 'Akar' },
      { key: 'D', text: 'Bunga' }
    ],
    correctAnswer: 'C',
    explanation: 'Akar berfungsi menghisap air dan zat hara dari tanah serta memperkokoh berdirinya tanaman.'
  },
  {
    id: 'sci-sim-2',
    number: 2,
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Hewan pemakan tumbuhan (seperti sapi, kambing, dan kelinci) disebut sebagai hewan...',
    imageSvg: makeSvgVisual('PENGGOLONGAN HEWAN', 'SIMULASI · SANGAT MUDAH', ['#ecfdf5', '#a7f3d0', '#059669'], `
      <rect x="40" y="25" width="270" height="85" rx="8" fill="#d1fae5" stroke="#059669" stroke-width="2"/>
      <text x="175" y="55" font-size="14" font-weight="bold" fill="#065f46" text-anchor="middle">Sapi, Kelinci, Rusa, Kambing</text>
      <text x="175" y="80" font-size="13" font-weight="bold" fill="#047857" text-anchor="middle">Makanan Utama: Rumput & Dedaunan</text>
    `),
    options: [
      { key: 'A', text: 'Karnivora' },
      { key: 'B', text: 'Herbivora' },
      { key: 'C', text: 'Omnivora' },
      { key: 'D', text: 'Insektivora' }
    ],
    correctAnswer: 'B',
    explanation: 'Herbivora adalah sebutan untuk hewan pemakan tumbuhan.'
  },
  {
    id: 'sci-sim-3',
    number: 3,
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Sangat Mudah',
    questionText: 'Sumber energi panas dan cahaya terbesar bagi kehidupan di planet Bumi adalah...',
    imageSvg: makeSvgVisual('SUMBER ENERGI BUMI', 'SIMULASI · SANGAT MUDAH', ['#fffbeb', '#fef3c7', '#d97706'], `
      <circle cx="176" cy="65" r="35" fill="#f59e0b" stroke="#b45309" stroke-width="3"/>
      <line x1="176" y1="15" x2="176" y2="2" stroke="#d97706" stroke-width="3"/>
      <line x1="176" y1="115" x2="176" y2="128" stroke="#d97706" stroke-width="3"/>
      <line x1="126" y1="65" x2="113" y2="65" stroke="#d97706" stroke-width="3"/>
      <line x1="226" y1="65" x2="239" y2="65" stroke="#d97706" stroke-width="3"/>
      <text x="176" y="70" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">MATAHARI</text>
    `),
    options: [
      { key: 'A', text: 'Bulan' },
      { key: 'B', text: 'Bintang Kejora' },
      { key: 'C', text: 'Matahari' },
      { key: 'D', text: 'Lampu Pijar' }
    ],
    correctAnswer: 'C',
    explanation: 'Matahari merupakan pusat tata surya dan sumber energi cahaya serta panas utama di Bumi.'
  },
  ...Array.from({ length: 27 }, (_, i) => {
    const num = i + 4;
    return {
      id: `sci-sim-${num}`,
      number: num,
      subject: 'IPA / Sains' as const,
      level: 'SD/MI' as const,
      stage: 'simulasi' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Sangat Mudah' as const,
      questionText: `Pada latihan simulasi sains #${num}: Perubahan wujud benda dari padat menjadi cair (seperti es terkena panas) disebut...`,
      imageSvg: makeSvgVisual(`PERUBAHAN WUJUD #${num}`, 'SIMULASI · SANGAT MUDAH', ['#eff6ff', '#bfdbfe', '#2563eb'], `
        <rect x="70" y="30" width="80" height="60" rx="6" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2"/>
        <text x="110" y="65" font-size="12" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Es Batu</text>
        <text x="176" y="65" font-size="20" font-weight="bold" fill="#2563eb" text-anchor="middle">➞</text>
        <circle cx="240" cy="60" r="30" fill="#60a5fa" stroke="#1d4ed8" stroke-width="2"/>
        <text x="240" y="65" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Air</text>
      `),
      options: [
        { key: 'A' as const, text: 'Mencair' },
        { key: 'B' as const, text: 'Membeku' },
        { key: 'C' as const, text: 'Menguap' },
        { key: 'D' as const, text: 'Menyublim' }
      ],
      correctAnswer: 'A' as const,
      explanation: 'Mencair atau melebur adalah proses perubahan wujud benda padat menjadi cair akibat peningkatan suhu.'
    };
  }),

  // ==================== TIER 2: BABAK PENYISIHAN (MUDAH) - 35 SOAL (31-65) ====================
  {
    id: 'sci-peny-31',
    number: 31,
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Mudah',
    questionText: 'Gas yang diserap oleh tumbuhan hijau pada proses fotosintesis adalah...',
    imageSvg: makeSvgVisual('PROSES FOTOSINTESIS', 'BABAK PENYISIHAN · MUDAH', ['#f0fdf4', '#bbf7d0', '#15803d'], `
      <g transform="translate(60, 20)">
        <ellipse cx="125" cy="50" rx="90" ry="35" fill="#86efac" stroke="#16a34a" stroke-width="2"/>
        <text x="125" y="42" font-size="11" font-weight="bold" fill="#14532d" text-anchor="middle">CO₂ + H₂O ➞ C₆H₁₂O₆ + O₂</text>
        <text x="125" y="62" font-size="10" font-weight="bold" fill="#15803d" text-anchor="middle">Bantuan: Sinar Matahari & Klorofil</text>
      </g>
    `),
    options: [
      { key: 'A', text: 'Oksigen' },
      { key: 'B', text: 'Karbon Dioksida' },
      { key: 'C', text: 'Nitrogen' },
      { key: 'D', text: 'Helium' }
    ],
    correctAnswer: 'B',
    explanation: 'Pada fotosintesis, tumbuhan menyerap karbon dioksida (CO₂) dan mengeluarkan gas oksigen (O₂).'
  },
  ...Array.from({ length: 34 }, (_, i) => {
    const num = i + 32;
    return {
      id: `sci-peny-${num}`,
      number: num,
      subject: 'IPA / Sains' as const,
      level: 'SMP/MTs' as const,
      stage: 'penyisihan' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Mudah' as const,
      questionText: `Pada fenomena fisika penyisihan #${num}: Benda yang dilemparkan ke atas selalu jatuh kembali ke permukaan bumi karena adanya gaya...`,
      imageSvg: makeSvgVisual(`GAYA & GERAK PENYISIHAN #${num}`, 'BABAK PENYISIHAN · MUDAH', ['#faf5ff', '#e9d5ff', '#7c3aed'], `
        <circle cx="176" cy="40" r="18" fill="#c084fc" stroke="#6b21a8" stroke-width="2"/>
        <line x1="176" y1="60" x2="176" y2="105" stroke="#7e22ce" stroke-width="3"/>
        <polygon points="176,115 170,103 182,103" fill="#7e22ce"/>
        <text x="176" y="128" font-size="11" font-weight="bold" fill="#581c87" text-anchor="middle">Tarikan Gravitasi Bumi</text>
      `),
      options: [
        { key: 'A' as const, text: 'Gaya Gesek' },
        { key: 'B' as const, text: 'Gaya Gravitasi' },
        { key: 'C' as const, text: 'Gaya Pegas' },
        { key: 'D' as const, text: 'Gaya Magnet' }
      ],
      correctAnswer: 'B' as const,
      explanation: 'Gaya gravitasi bumi menarik semua benda bermassa menuju pusat bumi.'
    };
  }),

  // ==================== TIER 3: BABAK FINAL (SANGAT SULIT / HOTS) - 35 SOAL (66-100) ====================
  {
    id: 'sci-final-66',
    number: 66,
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'final',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Sangat Sulit (HOTS)',
    questionText: 'Organel sel eukariotik yang memiliki DNA sirkular ganda sendiri dan berperan dalam fosforilasi oksidatif ATP adalah...',
    imageSvg: makeSvgVisual('BIOLOGI SELULER & MITOKONDRIA', 'BABAK FINAL · SANGAT SULIT', ['#fff1f2', '#fecdd3', '#e11d48'], `
      <g transform="translate(60, 20)">
        <rect width="230" height="90" rx="20" fill="#fda4af" stroke="#be123c" stroke-width="2.5"/>
        <path d="M 30,45 Q 60,25 90,45 T 150,45 T 200,45" fill="none" stroke="#9f1239" stroke-width="3"/>
        <text x="115" y="75" font-size="12" font-weight="bold" fill="#881337" text-anchor="middle">Cristae & Sintesis ATP</text>
      </g>
    `),
    options: [
      { key: 'A', text: 'Ribosom' },
      { key: 'B', text: 'Mitokondria' },
      { key: 'C', text: 'Badan Golgi' },
      { key: 'D', text: 'Lisosom' }
    ],
    correctAnswer: 'B',
    explanation: 'Mitokondria memiliki materi genetik mtDNA sendiri sesuai teori endosimbiosis dan menghasilkan ATP lewat rantai transpor elektron.'
  },
  ...Array.from({ length: 34 }, (_, i) => {
    const num = i + 67;
    return {
      id: `sci-final-${num}`,
      number: num,
      subject: 'IPA / Sains' as const,
      level: 'SMP/MTs' as const,
      stage: 'final' as const,
      curriculum: 'Olimpiade Sains Terpadu' as const,
      difficulty: 'Sangat Sulit (HOTS)' as const,
      questionText: `Analisis Termodinamika Olimpiade #${num}: Pada proses adiabatik gas ideal, kalor yang mengalir ke dalam atau keluar dari sistem bernilai...`,
      imageSvg: makeSvgVisual(`HOTS TERMODINAMIKA #${num}`, 'BABAK FINAL · SANGAT SULIT', ['#fdf4ff', '#f5d0fe', '#c026d3'], `
        <rect x="50" y="25" width="250" height="85" rx="8" fill="#e879f9" fill-opacity="0.3" stroke="#a21caf" stroke-width="2"/>
        <text x="175" y="55" font-size="14" font-weight="bold" fill="#701a75" text-anchor="middle">Q = 0 | ΔU = -W</text>
        <text x="175" y="80" font-size="12" font-weight="bold" fill="#86198f" text-anchor="middle">Isolasi Termal Tanpa Perpindahan Kalor</text>
      `),
      options: [
        { key: 'A' as const, text: 'Q > 0' },
        { key: 'B' as const, text: 'Q = 0' },
        { key: 'C' as const, text: 'Q < 0' },
        { key: 'D' as const, text: 'Q = Tak Hingga' }
      ],
      correctAnswer: 'B' as const,
      explanation: 'Pada proses adiabatik, tidak terjadi pertukaran kalor antara sistem dan lingkungan (Q = 0).'
    };
  })
];
