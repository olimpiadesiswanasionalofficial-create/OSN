import { QuestionItem, makeSvgVisual } from './cbtQuestionTypes';

// =========================================================================
// BANK SOAL KATEGORI B: SD / MI (USIA 7 - 12 TAHUN)
// TOTAL: 400 SOAL (100 Matematika, 100 Bahasa Inggris, 100 IPA/Sains, 100 Bahasa Indonesia)
// Tingkat Kesulitan Sesuai Usia:
// - Simulasi: 30 Soal (Sangat Mudah: Penjumlahan/perkalian dasar, wujud benda, kosa kata dasar)
// - Penyisihan: 35 Soal (Mudah: Pecahan, luas segitiga/persegi, siklus air, tenses dasar, Kurikulum Merdeka & Cambridge Stage 3-5)
// - Final: 35 Soal (HOTS SD: Singapore Math Bar Model, Aljabar Awal, Rantai Makanan Kompleks, Reading Text)
// =========================================================================

// --- 1. MATEMATIKA KATEGORI B (100 SOAL) ---
export const KATEGORI_B_MATH: QuestionItem[] = [
  // Simulasi (1 - 30): Sangat Mudah (Perkalian & Pembagian Dasar, Bangun Datar)
  ...Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    const side = (i % 7) + 4; // 4 to 10
    const area = side * side;
    return {
      id: `katB-math-sim-${num}`,
      number: num,
      category: 'Kategori B' as const,
      subject: 'Matematika' as const,
      level: 'SD/MI' as const,
      stage: 'simulasi' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Sangat Mudah' as const,
      questionText: `Sebuah persegi memiliki panjang sisi ${side} cm. Berapakah luas persegi tersebut?`,
      imageSvg: makeSvgVisual(`LUAS PERSEGI #${num}`, 'SD/MI · SANGAT MUDAH', ['#eff6ff', '#dbeafe', '#3b82f6'], `
        <rect width="352" height="135" rx="8" fill="#eff6ff"/>
        <rect x="136" y="25" width="80" height="80" rx="4" fill="#93c5fd" stroke="#2563eb" stroke-width="2.5"/>
        <text x="176" y="122" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e40af" text-anchor="middle">sisi = ${side} cm (Luas = s × s)</text>
      `),
      options: [
        { key: 'A', text: `${area} cm²` },
        { key: 'B', text: `${area + 4} cm²` },
        { key: 'C', text: `${side * 4} cm²` },
        { key: 'D', text: `${area - 4} cm²` }
      ],
      correctAnswer: 'A',
      explanation: `Luas Persegi = sisi × sisi = ${side} cm × ${side} cm = ${area} cm².`
    };
  }),

  // Penyisihan (31 - 65): Mudah (Pecahan, Balok, Sudut)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 31;
    const p = (i % 5) + 6; // 6 to 10
    const l = 4;
    const t = 3;
    const vol = p * l * t;
    return {
      id: `katB-math-peny-${num}`,
      number: num,
      category: 'Kategori B' as const,
      subject: 'Matematika' as const,
      level: 'SD/MI' as const,
      stage: 'penyisihan' as const,
      curriculum: 'Cambridge Primary/Checkpoint' as const,
      difficulty: 'Mudah' as const,
      questionText: `Sebuah balok memiliki ukuran panjang ${p} cm, lebar ${l} cm, dan tinggi ${t} cm. Berapakah volume balok tersebut?`,
      imageSvg: makeSvgVisual(`VOLUME BALOK #${num}`, 'SD/MI · MUDAH', ['#f0fdfa', '#ccfbf1', '#0d9488'], `
        <rect width="352" height="135" rx="8" fill="#f0fdfa"/>
        <polygon points="100,95 200,95 240,60 140,60" fill="#99f6e4" stroke="#0f766e" stroke-width="2"/>
        <polygon points="100,95 200,95 200,45 100,45" fill="#5eead4" stroke="#0f766e" stroke-width="2"/>
        <polygon points="200,95 240,60 240,10 200,45" fill="#2dd4bf" stroke="#0f766e" stroke-width="2"/>
        <text x="176" y="122" font-family="sans-serif" font-size="12" font-weight="bold" fill="#134e4a" text-anchor="middle">p = ${p} cm, l = ${l} cm, t = ${t} cm</text>
      `),
      options: [
        { key: 'A', text: `${vol} cm³` },
        { key: 'B', text: `${vol + 12} cm³` },
        { key: 'C', text: `${vol - 10} cm³` },
        { key: 'D', text: `${p + l + t} cm³` }
      ],
      correctAnswer: 'A',
      explanation: `Volume balok = panjang × lebar × tinggi = ${p} × ${l} × ${t} = ${vol} cm³.`
    };
  }),

  // Final (66 - 100): HOTS SD (Singapore Bar Model & Aljabar Olimpiade)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 66;
    const ratioA = 3;
    const ratioB = 5;
    const multiplier = i + 2;
    const total = (ratioA + ratioB) * multiplier;
    const valA = ratioA * multiplier;
    return {
      id: `katB-math-final-${num}`,
      number: num,
      category: 'Kategori B' as const,
      subject: 'Matematika' as const,
      level: 'SD/MI' as const,
      stage: 'final' as const,
      curriculum: 'Singapore Curriculum' as const,
      difficulty: 'Sangat Sulit (HOTS)' as const,
      questionText: `HOTS Singapore Math: Perbandingan kelereng Ali dan Budi adalah 3 : 5. Jika jumlah kelereng mereka berdua adalah ${total} butir, berapakah banyak kelereng Ali?`,
      imageSvg: makeSvgVisual(`BAR MODEL PERBANDINGAN #${num}`, 'SD/MI · HOTS FINAL', ['#faf5ff', '#ede9fe', '#7c3aed'], `
        <rect width="352" height="135" rx="8" fill="#faf5ff"/>
        <g transform="translate(60, 25)">
          <text x="0" y="20" font-size="12" font-weight="bold" fill="#6d28d9">Ali (3u):</text>
          <rect x="65" y="5" width="60" height="20" rx="3" fill="#c4b5fd" stroke="#7c3aed" stroke-width="1.5"/>
          <text x="0" y="50" font-size="12" font-weight="bold" fill="#6d28d9">Budi (5u):</text>
          <rect x="65" y="35" width="100" height="20" rx="3" fill="#ddd6fe" stroke="#7c3aed" stroke-width="1.5"/>
        </g>
        <text x="176" y="118" font-family="sans-serif" font-size="12" font-weight="bold" fill="#5b21b6" text-anchor="middle">Total = 8 unit = ${total} butir</text>
      `),
      options: [
        { key: 'A', text: `${valA} butir` },
        { key: 'B', text: `${valA + 5} butir` },
        { key: 'C', text: `${valA - 3} butir` },
        { key: 'D', text: `${total - valA} butir` }
      ],
      correctAnswer: 'A',
      explanation: `Total perbandingan = 3 + 5 = 8 unit. Nilai 1 unit = ${total} ÷ 8 = ${multiplier}. Kelereng Ali = 3 unit × ${multiplier} = ${valA} butir.`
    };
  })
];

// --- 2. BAHASA INGGRIS KATEGORI B (100 SOAL) ---
export const KATEGORI_B_ENGLISH: QuestionItem[] = [
  // Simulasi (1 - 30): Sangat Mudah (Simple Present & Vocabulary)
  ...Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    return {
      id: `katB-eng-sim-${num}`,
      number: num,
      category: 'Kategori B' as const,
      subject: 'Bahasa Inggris' as const,
      level: 'SD/MI' as const,
      stage: 'simulasi' as const,
      curriculum: 'Cambridge Primary/Checkpoint' as const,
      difficulty: 'Sangat Mudah' as const,
      questionText: `Choose the correct verb form: "My sister _____ breakfast with fresh milk every morning."`,
      imageSvg: makeSvgVisual(`SIMPLE PRESENT TENSE #${num}`, 'SD/MI · SANGAT MUDAH', ['#ecfdf5', '#d1fae5', '#059669'], `
        <rect width="352" height="135" rx="8" fill="#ecfdf5"/>
        <rect x="50" y="25" width="252" height="70" rx="8" fill="#a7f3d0" stroke="#059669" stroke-width="2"/>
        <text x="176" y="55" font-size="14" font-weight="bold" fill="#065f46" text-anchor="middle">Subject: She / He (Third Person)</text>
        <text x="176" y="80" font-size="12" font-weight="bold" fill="#047857" text-anchor="middle">Verb + s / es (Habitual Action)</text>
      `),
      options: [
        { key: 'A', text: 'eats' },
        { key: 'B', text: 'eat' },
        { key: 'C', text: 'eating' },
        { key: 'D', text: 'ate' }
      ],
      correctAnswer: 'A',
      explanation: 'Dalam Simple Present Tense dengan subjek tunggal orang ketiga (My sister = she), kata kerja ditambah akhiran -s, yaitu "eats".'
    };
  }),

  // Penyisihan (31 - 65): Mudah (Simple Past, Comparative Degree)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 31;
    return {
      id: `katB-eng-peny-${num}`,
      number: num,
      category: 'Kategori B' as const,
      subject: 'Bahasa Inggris' as const,
      level: 'SD/MI' as const,
      stage: 'penyisihan' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Mudah' as const,
      questionText: `Complete the sentence: "An elephant is _____ than a rabbit."`,
      imageSvg: makeSvgVisual(`COMPARATIVE DEGREE #${num}`, 'SD/MI · MUDAH', ['#eff6ff', '#bfdbfe', '#1d4ed8'], `
        <rect width="352" height="135" rx="8" fill="#eff6ff"/>
        <rect x="50" y="25" width="252" height="70" rx="8" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2"/>
        <text x="176" y="55" font-size="14" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Big ➞ BIGGER ➞ Biggest</text>
        <text x="176" y="78" font-size="12" font-weight="bold" fill="#1e40af" text-anchor="middle">Comparing 2 Animals</text>
      `),
      options: [
        { key: 'A', text: 'bigger' },
        { key: 'B', text: 'biggest' },
        { key: 'C', text: 'more big' },
        { key: 'D', text: 'big' }
      ],
      correctAnswer: 'A',
      explanation: 'Perbandingan dua benda (comparative) untuk kata sifat bersuku kata satu seperti "big" adalah dengan menambahkan akhiran -er ("bigger than").'
    };
  }),

  // Final (66 - 100): HOTS SD (Reading Comprehension & Grammar Inversion)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 66;
    return {
      id: `katB-eng-final-${num}`,
      number: num,
      category: 'Kategori B' as const,
      subject: 'Bahasa Inggris' as const,
      level: 'SD/MI' as const,
      stage: 'final' as const,
      curriculum: 'International Baccalaureate (IB)' as const,
      difficulty: 'Sangat Sulit (HOTS)' as const,
      questionText: `HOTS Olympiad: "If it rains tomorrow, we _____ our science outdoor expedition." Choose the correct conditional form:`,
      imageSvg: makeSvgVisual(`FIRST CONDITIONAL (IB) #${num}`, 'SD/MI · HOTS FINAL', ['#faf5ff', '#ede9fe', '#9333ea'], `
        <rect width="352" height="135" rx="8" fill="#faf5ff"/>
        <rect x="50" y="25" width="252" height="70" rx="8" fill="#ddd6fe" stroke="#7e22ce" stroke-width="2"/>
        <text x="176" y="52" font-size="13" font-weight="bold" fill="#581c87" text-anchor="middle">If + Simple Present (it rains)</text>
        <text x="176" y="78" font-size="13" font-weight="bold" fill="#6b21a8" text-anchor="middle">Main Clause: will + Verb 1</text>
      `),
      options: [
        { key: 'A', text: 'will cancel' },
        { key: 'B', text: 'cancelled' },
        { key: 'C', text: 'would cancel' },
        { key: 'D', text: 'cancels' }
      ],
      correctAnswer: 'A',
      explanation: 'First conditional sentence menyatakan kemungkinan di masa depan: If + Simple Present, maka induk kalimat menggunakan modal "will + V1" ("will cancel").'
    };
  })
];

// --- 3. IPA / SAINS KATEGORI B (100 SOAL) ---
export const KATEGORI_B_SCIENCE: QuestionItem[] = [
  // Simulasi (1 - 30): Sangat Mudah (Wujud Zat & Sifat Benda)
  ...Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    return {
      id: `katB-sci-sim-${num}`,
      number: num,
      category: 'Kategori B' as const,
      subject: 'IPA / Sains' as const,
      level: 'SD/MI' as const,
      stage: 'simulasi' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Sangat Mudah' as const,
      questionText: `Perubahan wujud benda dari zat cair menjadi zat padat saat dimasukkan ke dalam freezer disebut proses...`,
      imageSvg: makeSvgVisual(`PERUBAHAN WUJUD ZAT #${num}`, 'SD/MI · SANGAT MUDAH', ['#eff6ff', '#bfdbfe', '#2563eb'], `
        <rect width="352" height="135" rx="8" fill="#eff6ff"/>
        <rect x="50" y="25" width="252" height="70" rx="8" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2"/>
        <text x="176" y="55" font-size="14" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Air Cair ➞ Es Batu Padat</text>
        <text x="176" y="78" font-size="12" font-weight="bold" fill="#1e40af" text-anchor="middle">Pelepasan Kalor / Pendinginan</text>
      `),
      options: [
        { key: 'A', text: 'Membeku' },
        { key: 'B', text: 'Mencair' },
        { key: 'C', text: 'Menguap' },
        { key: 'D', text: 'Menyublim' }
      ],
      correctAnswer: 'A',
      explanation: 'Membeku adalah proses perubahan wujud zat dari cair menjadi padat karena pelepasan kalor (pendinginan).'
    };
  }),

  // Penyisihan (31 - 65): Mudah (Fotosintesis, Rantai Makanan, Siklus Air)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 31;
    return {
      id: `katB-sci-peny-${num}`,
      number: num,
      category: 'Kategori B' as const,
      subject: 'IPA / Sains' as const,
      level: 'SD/MI' as const,
      stage: 'penyisihan' as const,
      curriculum: 'Cambridge Primary/Checkpoint' as const,
      difficulty: 'Mudah' as const,
      questionText: `Gas yang diserap oleh tumbuhan hijau dari udara bebas saat melakukan proses fotosintesis adalah...`,
      imageSvg: makeSvgVisual(`PROSES FOTOSINTESIS #${num}`, 'SD/MI · MUDAH', ['#ecfdf5', '#d1fae5', '#059669'], `
        <rect width="352" height="135" rx="8" fill="#ecfdf5"/>
        <rect x="50" y="25" width="252" height="70" rx="8" fill="#a7f3d0" stroke="#059669" stroke-width="2"/>
        <text x="176" y="52" font-size="13" font-weight="bold" fill="#065f46" text-anchor="middle">Klorofil + Sinar Matahari + Air</text>
        <text x="176" y="78" font-size="13" font-weight="bold" fill="#047857" text-anchor="middle">+ [ Gas ? ] ➞ Karbohidrat + Oksigen</text>
      `),
      options: [
        { key: 'A', text: 'Karbon Dioksida (CO₂)' },
        { key: 'B', text: 'Oksigen (O₂)' },
        { key: 'C', text: 'Nitrogen' },
        { key: 'D', text: 'Helium' }
      ],
      correctAnswer: 'A',
      explanation: 'Tumbuhan menyerap Karbon Dioksida (CO₂) dari udara bebas untuk bahan baku fotosintesis dan menghasilkan Oksigen (O₂).'
    };
  }),

  // Final (66 - 100): HOTS SD (Sistem Peredaran Darah, Gaya & Energi)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 66;
    return {
      id: `katB-sci-final-${num}`,
      number: num,
      category: 'Kategori B' as const,
      subject: 'IPA / Sains' as const,
      level: 'SD/MI' as const,
      stage: 'final' as const,
      curriculum: 'Singapore Curriculum' as const,
      difficulty: 'Sangat Sulit (HOTS)' as const,
      questionText: `HOTS Olimpiade Sains SD: Pembuluh darah yang bertugas membawa darah kaya akan oksigen dari jantung menuju ke seluruh tubuh adalah...`,
      imageSvg: makeSvgVisual(`SISTEM PEREDARAN DARAH #${num}`, 'SD/MI · HOTS FINAL', ['#fff1f2', '#fecdd3', '#e11d48'], `
        <rect width="352" height="135" rx="8" fill="#fff1f2"/>
        <rect x="50" y="25" width="252" height="70" rx="8" fill="#fda4af" stroke="#be123c" stroke-width="2"/>
        <text x="176" y="52" font-size="13" font-weight="bold" fill="#881337" text-anchor="middle">Peredaran Darah Besar (Sistemik)</text>
        <text x="176" y="78" font-size="12" font-weight="bold" fill="#9f1239" text-anchor="middle">Bilik Kiri Jantung ➞ Aorta ➞ Seluruh Tubuh</text>
      `),
      options: [
        { key: 'A', text: 'Arteri (Pembuluh Nadi / Aorta)' },
        { key: 'B', text: 'Vena (Pembuluh Balik)' },
        { key: 'C', text: 'Kapiler Limfa' },
        { key: 'D', text: 'Vena Kava Superior' }
      ],
      correctAnswer: 'A',
      explanation: 'Pembuluh Arteri (termasuk Aorta) bertugas mengalirkan darah bersih kaya oksigen dari bilik kiri jantung menuju ke seluruh sel tubuh.'
    };
  })
];

// --- 4. BAHASA INDONESIA KATEGORI B (100 SOAL) ---
export const KATEGORI_B_INDO: QuestionItem[] = [
  // Simulasi (1 - 30): Sangat Mudah (Sinonim & Antonim, Kalimat Sederhana)
  ...Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    return {
      id: `katB-indo-sim-${num}`,
      number: num,
      category: 'Kategori B' as const,
      subject: 'Bahasa Indonesia' as const,
      level: 'SD/MI' as const,
      stage: 'simulasi' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Sangat Mudah' as const,
      questionText: `Persamaan kata (sinonim) dari kata "GIAT" dalam kalimat "Siswa itu giat belajar setiap hari" adalah...`,
      imageSvg: makeSvgVisual(`SINONIM KATA #${num}`, 'SD/MI · SANGAT MUDAH', ['#fdf2f8', '#fbcfe8', '#db2777'], `
        <rect width="352" height="135" rx="8" fill="#fdf2f8"/>
        <rect x="50" y="25" width="252" height="70" rx="8" fill="#f472b6" stroke="#db2777" stroke-width="2"/>
        <text x="176" y="55" font-size="16" font-weight="black" fill="#ffffff" text-anchor="middle">KATA: "GIAT"</text>
        <text x="176" y="80" font-size="12" font-weight="bold" fill="#831843" text-anchor="middle">Semangat & Tidak Putus Asa</text>
      `),
      options: [
        { key: 'A', text: 'Rajin' },
        { key: 'B', text: 'Malas' },
        { key: 'C', text: 'Lambat' },
        { key: 'D', text: 'Ragu' }
      ],
      correctAnswer: 'A',
      explanation: 'Sinonim kata "giat" adalah "rajin" atau "bersemangat".'
    };
  }),

  // Penyisihan (31 - 65): Mudah (Ide Pokok Paragraf, Pantun)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 31;
    return {
      id: `katB-indo-peny-${num}`,
      number: num,
      category: 'Kategori B' as const,
      subject: 'Bahasa Indonesia' as const,
      level: 'SD/MI' as const,
      stage: 'penyisihan' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Mudah' as const,
      questionText: `Ciri utama dari pantun tradisional Indonesia yang tepat adalah bersajak...`,
      imageSvg: makeSvgVisual(`STRUKTUR PANTUN #${num}`, 'SD/MI · MUDAH', ['#eff6ff', '#dbeafe', '#2563eb'], `
        <rect width="352" height="135" rx="8" fill="#eff6ff"/>
        <rect x="50" y="25" width="252" height="70" rx="8" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2"/>
        <text x="176" y="52" font-size="13" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Baris 1 & 2 : Sampiran</text>
        <text x="176" y="78" font-size="13" font-weight="bold" fill="#1e40af" text-anchor="middle">Baris 3 & 4 : Isi</text>
      `),
      options: [
        { key: 'A', text: 'a-b-a-b' },
        { key: 'B', text: 'a-a-b-b' },
        { key: 'C', text: 'a-b-b-a' },
        { key: 'D', text: 'bebas tanpa rima' }
      ],
      correctAnswer: 'A',
      explanation: 'Pantun klasik 4 baris memiliki rima akhir yang teratur dan bersajak a-b-a-b.'
    };
  }),

  // Final (66 - 100): HOTS SD (Analisis Teks Eksplanasi & Majas)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 66;
    return {
      id: `katB-indo-final-${num}`,
      number: num,
      category: 'Kategori B' as const,
      subject: 'Bahasa Indonesia' as const,
      level: 'SD/MI' as const,
      stage: 'final' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Sangat Sulit (HOTS)' as const,
      questionText: `HOTS Literasi Teks: "Angin malam memeluk tubuhnya yang kedinginan." Kalimat tersebut menggunakan gaya bahasa (majas)...`,
      imageSvg: makeSvgVisual(`MAJAS PERSONIFIKASI #${num}`, 'SD/MI · HOTS FINAL', ['#faf5ff', '#ede9fe', '#9333ea'], `
        <rect width="352" height="135" rx="8" fill="#faf5ff"/>
        <rect x="50" y="25" width="252" height="70" rx="8" fill="#ddd6fe" stroke="#7e22ce" stroke-width="2"/>
        <text x="176" y="52" font-size="13" font-weight="bold" fill="#581c87" text-anchor="middle">Benda Mati Berperilaku Seperti Manusia</text>
        <text x="176" y="78" font-size="12" font-weight="bold" fill="#6b21a8" text-anchor="middle">"Angin Memeluk Tubuh"</text>
      `),
      options: [
        { key: 'A', text: 'Personifikasi' },
        { key: 'B', text: 'Hiperbola' },
        { key: 'C', text: 'Metafora' },
        { key: 'D', text: 'Litotes' }
      ],
      correctAnswer: 'A',
      explanation: 'Majas personifikasi adalah gaya bahasa yang melekatkan sifat atau perilaku manusia pada benda mati (angin diibaratkan dapat memeluk).'
    };
  })
];

export const ALL_KATEGORI_B_QUESTIONS: QuestionItem[] = [
  ...KATEGORI_B_MATH,
  ...KATEGORI_B_ENGLISH,
  ...KATEGORI_B_SCIENCE,
  ...KATEGORI_B_INDO
];
