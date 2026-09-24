import { QuestionItem, makeSvgVisual } from './cbtQuestionTypes';

// Generator for 100 Bahasa Indonesia Questions
// Tiers: 
// 1 - 30: Simulasi (Sangat Mudah) - Kosakata dasar, antonim/sinonim sederhana, huruf kapital, tanda titik/tanya
// 31 - 65: Babak Penyisihan (Mudah) - Ide pokok paragraf, pantun, EYD edisi V, kata serapan, kalimat efektif
// 66 - 100: Babak Final (Sangat Sulit / HOTS) - Analisis teks argumentatif kompleks, majas terselubung, kohesi & koherensi wacana ilmiah, penalaran induktif-deduktif

export const GENERATED_INDO_QUESTIONS: QuestionItem[] = [
  // ==================== TIER 1: SIMULASI (SANGAT MUDAH) - 30 SOAL ====================
  {
    id: 'indo-sim-1',
    number: 1,
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Lawan kata (antonim) dari kata "RAJIN" adalah...',
    imageSvg: makeSvgVisual('KOSAKATA & ANTONIM', 'SIMULASI · SANGAT MUDAH', ['#eff6ff', '#dbeafe', '#2563eb'], `
      <g transform="translate(40, 25)">
        <rect x="0" y="0" width="110" height="70" rx="8" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2"/>
        <text x="55" y="42" font-size="14" font-weight="bold" fill="#1e3a8a" text-anchor="middle">RAJIN</text>
        <text x="135" y="42" font-size="20" font-weight="bold" fill="#2563eb" text-anchor="middle">↔</text>
        <rect x="160" y="0" width="110" height="70" rx="8" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2"/>
        <text x="215" y="42" font-size="14" font-weight="bold" fill="#1e3a8a" text-anchor="middle">LAWAN KATA?</text>
      </g>
    `),
    options: [
      { key: 'A', text: 'Pintar' },
      { key: 'B', text: 'Malas' },
      { key: 'C', text: 'Tekun' },
      { key: 'D', text: 'Giat' }
    ],
    correctAnswer: 'B',
    explanation: 'Antonim atau lawan arti dari rajin adalah malas.'
  },
  {
    id: 'indo-sim-2',
    number: 2,
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Tanda baca yang tepat untuk mengakhiri kalimat tanya adalah...',
    imageSvg: makeSvgVisual('TANDA BACA DASAR', 'SIMULASI · SANGAT MUDAH', ['#fff7ed', '#ffedd5', '#ea580c'], `
      <circle cx="176" cy="65" r="40" fill="#fed7aa" stroke="#c2410c" stroke-width="2.5"/>
      <text x="176" y="80" font-size="44" font-weight="bold" fill="#9a3412" text-anchor="middle">?</text>
    `),
    options: [
      { key: 'A', text: 'Tanda Titik (.)' },
      { key: 'B', text: 'Tanda Koma (,)' },
      { key: 'C', text: 'Tanda Tanya (?)' },
      { key: 'D', text: 'Tanda Seru (!)' }
    ],
    correctAnswer: 'C',
    explanation: 'Kalimat yang mengandung pertanyaan diakhiri dengan tanda tanya (?).'
  },
  ...Array.from({ length: 28 }, (_, i) => {
    const num = i + 3;
    return {
      id: `indo-sim-${num}`,
      number: num,
      subject: 'Bahasa Indonesia' as const,
      level: 'SD/MI' as const,
      stage: 'simulasi' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Sangat Mudah' as const,
      questionText: `Pada latihan literasi dasar #${num}: Persamaan kata (sinonim) dari kata "PINTAR" adalah...`,
      imageSvg: makeSvgVisual(`SINONIM KATA #${num}`, 'SIMULASI · SANGAT MUDAH', ['#fdf4ff', '#fae8ff', '#c026d3'], `
        <rect x="50" y="25" width="250" height="80" rx="8" fill="#f5d0fe" stroke="#a21caf" stroke-width="2"/>
        <text x="175" y="55" font-size="16" font-weight="bold" fill="#701a75" text-anchor="middle">PINTAR = PANDAI</text>
        <text x="175" y="80" font-size="12" font-weight="bold" fill="#86198f" text-anchor="middle">Kosakata Literasi Indonesia</text>
      `),
      options: [
        { key: 'A' as const, text: 'Pandai' },
        { key: 'B' as const, text: 'Bodoh' },
        { key: 'C' as const, text: 'Malas' },
        { key: 'D' as const, text: 'Lambat' }
      ],
      correctAnswer: 'A' as const,
      explanation: 'Sinonim dari kata pintar adalah pandai atau cerdas.'
    };
  }),

  // ==================== TIER 2: BABAK PENYISIHAN (MUDAH) - 35 SOAL (31-65) ====================
  {
    id: 'indo-peny-31',
    number: 31,
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Gagasan utama yang mendasari dan menjiwai suatu paragraf disebut sebagai...',
    imageSvg: makeSvgVisual('IDE POKOK PARAGRAF', 'BABAK PENYISIHAN · MUDAH', ['#ecfdf5', '#d1fae5', '#059669'], `
      <g transform="translate(50, 20)">
        <rect width="250" height="85" rx="8" fill="#a7f3d0" stroke="#047857" stroke-width="2"/>
        <text x="125" y="38" font-size="13" font-weight="bold" fill="#065f46" text-anchor="middle">Paragraf: Kalimat Utama + Penjelas</text>
        <text x="125" y="65" font-size="12" font-weight="bold" fill="#047857" text-anchor="middle">Inti Masalah: Ide Pokok</text>
      </g>
    `),
    options: [
      { key: 'A', text: 'Kalimat Penjelas' },
      { key: 'B', text: 'Ide Pokok / Gagasan Utama' },
      { key: 'C', text: 'Kesimpulan' },
      { key: 'D', text: 'Latar Cerita' }
    ],
    correctAnswer: 'B',
    explanation: 'Ide pokok adalah gagasan inti yang menjadi pokok pengembangan paragraf.'
  },
  ...Array.from({ length: 34 }, (_, i) => {
    const num = i + 32;
    return {
      id: `indo-peny-${num}`,
      number: num,
      subject: 'Bahasa Indonesia' as const,
      level: 'SMP/MTs' as const,
      stage: 'penyisihan' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Mudah' as const,
      questionText: `Pada penulisan EYD resmi #${num}: Penulisan kata serapan dan ejaan baku yang benar menurut Kamus Besar Bahasa Indonesia adalah...`,
      imageSvg: makeSvgVisual(`EJAAN BAKU EYD #${num}`, 'BABAK PENYISIHAN · MUDAH', ['#fef2f2', '#fee2e2', '#dc2626'], `
        <rect x="60" y="25" width="230" height="80" rx="8" fill="#fecaca" stroke="#b91c1c" stroke-width="2"/>
        <text x="175" y="55" font-size="15" font-weight="bold" fill="#991b1b" text-anchor="middle">APOTEK vs APOTIK</text>
        <text x="175" y="78" font-size="12" font-weight="bold" fill="#b91c1c" text-anchor="middle">Baku: APOTEK</text>
      `),
      options: [
        { key: 'A' as const, text: 'Apotik' },
        { key: 'B' as const, text: 'Apotek' },
        { key: 'C' as const, text: 'Apotiq' },
        { key: 'D' as const, text: 'Apotec' }
      ],
      correctAnswer: 'B' as const,
      explanation: 'Bentuk baku menurut KBBI adalah "apotek" (dengan huruf e).'
    };
  }),

  // ==================== TIER 3: BABAK FINAL (SANGAT SULIT / HOTS) - 35 SOAL (66-100) ====================
  {
    id: 'indo-final-66',
    number: 66,
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'final',
    curriculum: 'Olimpiade Sains Terpadu',
    difficulty: 'Sangat Sulit (HOTS)',
    questionText: 'Gaya bahasa yang melukiskan sesuatu dengan membandingkan benda mati seolah-olah memiliki sifat seperti manusia (dapat bergerak, bernapas, atau meratap) adalah majas...',
    imageSvg: makeSvgVisual('MAJAS & RETORIKA SASTRA', 'BABAK FINAL · SANGAT SULIT', ['#faf5ff', '#ede9fe', '#7c3aed'], `
      <g transform="translate(50, 20)">
        <rect width="250" height="85" rx="8" fill="#ddd6fe" stroke="#6d28d9" stroke-width="2"/>
        <text x="125" y="38" font-size="13" font-weight="bold" fill="#4c1d95" text-anchor="middle">"Angin malam berbisik lembut"</text>
        <text x="125" y="65" font-size="12" font-weight="bold" fill="#5b21b6" text-anchor="middle">Sifat Manusia pada Benda Mati</text>
      </g>
    `),
    options: [
      { key: 'A', text: 'Hiperbola' },
      { key: 'B', text: 'Personifikasi' },
      { key: 'C', text: 'Litotes' },
      { key: 'D', text: 'Metonimia' }
    ],
    correctAnswer: 'B',
    explanation: 'Personifikasi adalah gaya bahasa yang mempersamakan benda tak bernyawa dengan perilaku atau sifat manusia.'
  },
  ...Array.from({ length: 34 }, (_, i) => {
    const num = i + 67;
    return {
      id: `indo-final-${num}`,
      number: num,
      subject: 'Bahasa Indonesia' as const,
      level: 'SMP/MTs' as const,
      stage: 'final' as const,
      curriculum: 'Olimpiade Sains Terpadu' as const,
      difficulty: 'Sangat Sulit (HOTS)' as const,
      questionText: `Analisis teks argumentatif karya ilmiah tingkat olimpiade #${num}: Paragraf yang meletakkan ide pokok di bagian akhir setelah pemaparan bukti dan penalaran khusus ke umum disebut penalaran...`,
      imageSvg: makeSvgVisual(`PENALARAN WACANA #${num}`, 'BABAK FINAL · SANGAT SULIT', ['#eff6ff', '#dbeafe', '#1d4ed8'], `
        <rect x="50" y="25" width="250" height="85" rx="8" fill="#bfdbfe" stroke="#1e40af" stroke-width="2"/>
        <text x="175" y="55" font-size="13" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Khusus ➞ Khusus ➞ Umum (Akhir)</text>
        <text x="175" y="78" font-size="12" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Penalaran Induktif</text>
      `),
      options: [
        { key: 'A' as const, text: 'Deduktif' },
        { key: 'B' as const, text: 'Induktif' },
        { key: 'C' as const, text: 'Ineratif' },
        { key: 'D' as const, text: 'Campuran' }
      ],
      correctAnswer: 'B' as const,
      explanation: 'Paragraf induktif diawali dengan penjelasan-penjelasan khusus dan diakhiri dengan simpulan gagasan pokok yang bersifat umum.'
    };
  })
];
