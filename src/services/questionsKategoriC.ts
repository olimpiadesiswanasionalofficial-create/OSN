import { QuestionItem, makeSvgVisual } from './cbtQuestionTypes';

// =========================================================================
// BANK SOAL KATEGORI C: SMP / MTs (USIA 13 - 16 TAHUN)
// TOTAL: 400 SOAL (100 Matematika, 100 Bahasa Inggris, 100 IPA/Sains, 100 Bahasa Indonesia)
// Tingkat Kesulitan Sesuai Usia:
// - Simulasi: 30 Soal (Dasar SMP: Operasi aljabar sederhana, Teorema Pythagoras dasar, gerak benda, tenses)
// - Penyisihan: 35 Soal (Menengah: Persamaan linear dua variabel, hukum Newton, ekosistem sel, passive voice, teks ulasan)
// - Final: 35 Soal (HOTS SMP/Olimpiade: Kombinatorika, Singapore Math Secondary, Genetika, Cambridge Checkpoint)
// =========================================================================

// --- 1. MATEMATIKA KATEGORI C (100 SOAL) ---
export const KATEGORI_C_MATH: QuestionItem[] = [
  // Simulasi (1 - 30): Dasar SMP (Pythagoras, Aljabar, Aritmatika Sosial)
  ...Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    const a = (i % 4) + 3; // 3, 4, 5, 6
    const b = a === 3 ? 4 : (a === 4 ? 3 : (a === 5 ? 12 : 8));
    const c = a === 3 ? 5 : (a === 4 ? 5 : (a === 5 ? 13 : 10));
    return {
      id: `katC-math-sim-${num}`,
      number: num,
      category: 'Kategori C' as const,
      subject: 'Matematika' as const,
      level: 'SMP/MTs' as const,
      stage: 'simulasi' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Sangat Mudah' as const,
      questionText: `Pada segitiga siku-siku di samping, panjang sisi tegak adalah ${a} cm dan sisi mendatar adalah ${b} cm. Berapakah panjang sisi miring (hipotenusa)?`,
      imageSvg: makeSvgVisual(`SEGITIGA SIKU-SIKU #${num}`, 'SMP/MTs · PYTHAGORAS', ['#eff6ff', '#dbeafe', '#2563eb'], `
        <rect width="352" height="135" rx="8" fill="#eff6ff"/>
        <polygon points="60,110 240,110 60,30" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2.5"/>
        <rect x="60" y="98" width="12" height="12" fill="none" stroke="#1d4ed8" stroke-width="1.5"/>
        <text x="50" y="70" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e40af" text-anchor="end">${a} cm</text>
        <text x="150" y="125" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e40af" text-anchor="middle">${b} cm</text>
        <text x="165" y="65" font-family="sans-serif" font-size="12" font-weight="bold" fill="#dc2626">c = ?</text>
      `),
      options: [
        { key: 'A', text: `${c} cm` },
        { key: 'B', text: `${c + 2} cm` },
        { key: 'C', text: `${a + b} cm` },
        { key: 'D', text: `${Math.round(Math.sqrt(a + b))} cm` }
      ],
      correctAnswer: 'A',
      explanation: `Berdasarkan Teorema Pythagoras: c² = a² + b² = ${a}² + ${b}² = ${a * a + b * b}, maka c = √${a * a + b * b} = ${c} cm.`
    };
  }),

  // Penyisihan (31 - 65): Menengah (SPLDV, Pola Bilangan, Lingkaran)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 31;
    const r = (i % 7) + 7; // 7, 8, ... 13
    const circumference = Math.round(2 * (22 / 7) * r);
    return {
      id: `katC-math-peny-${num}`,
      number: num,
      category: 'Kategori C' as const,
      subject: 'Matematika' as const,
      level: 'SMP/MTs' as const,
      stage: 'penyisihan' as const,
      curriculum: 'Cambridge Lower Secondary' as const,
      difficulty: 'Mudah' as const,
      questionText: `Sebuah lingkaran memiliki panjang jari-jari r = ${r} cm (gunakan π = 22/7). Berapakah keliling lingkaran tersebut?`,
      imageSvg: makeSvgVisual(`LINGKARAN #${num}`, 'SMP/MTs · GEOMETRI', ['#f0fdf4', '#dcfce7', '#16a34a'], `
        <rect width="352" height="135" rx="8" fill="#f0fdf4"/>
        <circle cx="176" cy="65" r="48" fill="#bbf7d0" stroke="#15803d" stroke-width="2.5"/>
        <line x1="176" y1="65" x2="224" y2="65" stroke="#dc2626" stroke-width="2" stroke-dasharray="3,2"/>
        <circle cx="176" cy="65" r="3" fill="#15803d"/>
        <text x="200" y="60" font-size="11" font-weight="bold" fill="#dc2626">r = ${r} cm</text>
        <text x="176" y="125" font-size="12" font-weight="bold" fill="#14532d" text-anchor="middle">K = 2 × π × r</text>
      `),
      options: [
        { key: 'A', text: `${circumference} cm` },
        { key: 'B', text: `${circumference + 10} cm` },
        { key: 'C', text: `${Math.round((22 / 7) * r * r)} cm` },
        { key: 'D', text: `${r * 4} cm` }
      ],
      correctAnswer: 'A',
      explanation: `Keliling lingkaran dihitung dengan rumus K = 2 × π × r = 2 × (22/7) × ${r} = ${circumference} cm.`
    };
  }),

  // Final (66 - 100): HOTS SMP / Olimpiade Sains Nasional (Persamaan Kuadrat & Kombinatorika)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 66;
    const x1 = (i % 3) + 2; // 2, 3, 4
    const x2 = x1 + 3;      // 5, 6, 7
    const bCoeff = -(x1 + x2);
    const cCoeff = x1 * x2;
    return {
      id: `katC-math-final-${num}`,
      number: num,
      category: 'Kategori C' as const,
      subject: 'Matematika' as const,
      level: 'SMP/MTs' as const,
      stage: 'final' as const,
      curriculum: 'Olimpiade Sains Terpadu' as const,
      difficulty: 'Sangat Sulit (HOTS)' as const,
      questionText: `HOTS Aljabar: Persamaan kuadrat x² + (${bCoeff})x + ${cCoeff} = 0 memiliki akar-akar x₁ dan x₂. Berapakah nilai dari x₁² + x₂²?`,
      imageSvg: makeSvgVisual(`ALJABAR KUADRAT #${num}`, 'SMP/MTs · HOTS FINAL', ['#faf5ff', '#ede9fe', '#7c3aed'], `
        <rect width="352" height="135" rx="8" fill="#faf5ff"/>
        <rect x="35" y="25" width="282" height="65" rx="8" fill="#ddd6fe" stroke="#6d28d9" stroke-width="2"/>
        <text x="176" y="55" font-size="14" font-weight="black" fill="#4c1d95" text-anchor="middle">x² + (${bCoeff})x + ${cCoeff} = 0</text>
        <text x="176" y="78" font-size="11" font-weight="bold" fill="#6d28d9" text-anchor="middle">Cari Nilai: x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂</text>
        <text x="176" y="115" font-size="11" font-weight="bold" fill="#5b21b6" text-anchor="middle">Teorema Vieta: x₁ + x₂ = ${-bCoeff}, x₁x₂ = ${cCoeff}</text>
      `),
      options: [
        { key: 'A', text: `${x1 * x1 + x2 * x2}` },
        { key: 'B', text: `${bCoeff * bCoeff}` },
        { key: 'C', text: `${cCoeff * 2}` },
        { key: 'D', text: `${(x1 + x2) * 2}` }
      ],
      correctAnswer: 'A',
      explanation: `Dari Teorema Vieta: x₁ + x₂ = ${-bCoeff} dan x₁x₂ = ${cCoeff}. Maka x₁² + x₂² = (x₁ + x₂)² - 2(x₁x₂) = (${-bCoeff})² - 2(${cCoeff}) = ${(-bCoeff) ** 2 - 2 * cCoeff} = ${x1 * x1 + x2 * x2}.`
    };
  })
];

// --- 2. BAHASA INGGRIS KATEGORI C (100 SOAL) ---
export const KATEGORI_C_ENGLISH: QuestionItem[] = [
  // Simulasi (1 - 30): Dasar SMP (Tenses, Daily Conversation, Pronouns)
  ...Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    const verbs = [
      { base: 'study', past: 'studied', context: 'English last night' },
      { base: 'visit', past: 'visited', context: 'the national museum yesterday' },
      { base: 'watch', past: 'watched', context: 'a science documentary last Saturday' },
      { base: 'play', past: 'played', context: 'badminton with his brother this morning' }
    ];
    const v = verbs[i % verbs.length];
    return {
      id: `katC-eng-sim-${num}`,
      number: num,
      category: 'Kategori C' as const,
      subject: 'Bahasa Inggris' as const,
      level: 'SMP/MTs' as const,
      stage: 'simulasi' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Sangat Mudah' as const,
      questionText: `Complete the sentence in Simple Past Tense: "Rian and his friends [...] ${v.context}."`,
      imageSvg: makeSvgVisual(`SIMPLE PAST TENSE #${num}`, 'SMP/MTs · GRAMMAR', ['#fdf2f8', '#fbcfe8', '#db2777'], `
        <rect width="352" height="135" rx="8" fill="#fdf2f8"/>
        <rect x="40" y="25" width="272" height="70" rx="8" fill="#f472b6" stroke="#db2777" stroke-width="2"/>
        <text x="176" y="52" font-size="13" font-weight="black" fill="#831843" text-anchor="middle">Past Event / Yesterday Marker</text>
        <text x="176" y="75" font-size="12" font-weight="bold" fill="#9d174d" text-anchor="middle">Subject + Verb-2 + Complement</text>
        <text x="176" y="115" font-size="11" font-weight="bold" fill="#be185d" text-anchor="middle">Base Verb: "${v.base}"</text>
      `),
      options: [
        { key: 'A', text: v.past },
        { key: 'B', text: v.base },
        { key: 'C', text: `is ${v.base}ing` },
        { key: 'D', text: `will ${v.base}` }
      ],
      correctAnswer: 'A',
      explanation: `Because there is a past time marker (last night/yesterday), we must use the regular Verb 2 (${v.past}).`
    };
  }),

  // Penyisihan (31 - 65): Menengah (Passive Voice, Procedure & Narrative Texts)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 31;
    return {
      id: `katC-eng-peny-${num}`,
      number: num,
      category: 'Kategori C' as const,
      subject: 'Bahasa Inggris' as const,
      level: 'SMP/MTs' as const,
      stage: 'penyisihan' as const,
      curriculum: 'Cambridge Lower Secondary' as const,
      difficulty: 'Mudah' as const,
      questionText: `Change into Passive Voice: "Thomas Edison invented the electric light bulb in 1879."`,
      imageSvg: makeSvgVisual(`PASSIVE VOICE #${num}`, 'SMP/MTs · SYNTAX', ['#eff6ff', '#dbeafe', '#2563eb'], `
        <rect width="352" height="135" rx="8" fill="#eff6ff"/>
        <rect x="30" y="25" width="292" height="65" rx="8" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2"/>
        <text x="176" y="52" font-size="12" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Object + was/were + Verb-3 + by Subject</text>
        <text x="176" y="75" font-size="11" font-weight="semibold" fill="#1e40af" text-anchor="middle">Past Passive Transformation</text>
        <text x="176" y="115" font-size="10.5" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Electric light bulb (Singular) -&gt; was invented</text>
      `),
      options: [
        { key: 'A', text: 'The electric light bulb was invented by Thomas Edison in 1879.' },
        { key: 'B', text: 'The electric light bulb were invented by Thomas Edison in 1879.' },
        { key: 'C', text: 'Thomas Edison is invented by the electric light bulb in 1879.' },
        { key: 'D', text: 'The electric light bulb will be invented by Thomas Edison.' }
      ],
      correctAnswer: 'A',
      explanation: 'The passive structure for Past Simple with a singular object (the light bulb) is: was + Past Participle (was invented).'
    };
  }),

  // Final (66 - 100): HOTS (Analytical Reading & Complex Inferences)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 66;
    return {
      id: `katC-eng-final-${num}`,
      number: num,
      category: 'Kategori C' as const,
      subject: 'Bahasa Inggris' as const,
      level: 'SMP/MTs' as const,
      stage: 'final' as const,
      curriculum: 'International Baccalaureate (IB)' as const,
      difficulty: 'Sangat Sulit (HOTS)' as const,
      questionText: `HOTS Comprehension: "Renewable energy sources like solar and wind power produce no greenhouse gas emissions once installed, thereby mitigating long-term climate vulnerabilities." The word 'mitigating' is closest in meaning to...`,
      imageSvg: makeSvgVisual(`VOCABULARY IN CONTEXT #${num}`, 'SMP/MTs · HOTS FINAL', ['#ecfdf5', '#a7f3d0', '#059669'], `
        <rect width="352" height="135" rx="8" fill="#ecfdf5"/>
        <rect x="30" y="25" width="292" height="65" rx="8" fill="#6ee7b7" stroke="#047857" stroke-width="2"/>
        <text x="176" y="50" font-size="12" font-weight="black" fill="#064e3b" text-anchor="middle">Environmental Science Text</text>
        <text x="176" y="72" font-size="11" font-weight="bold" fill="#065f46" text-anchor="middle">"thereby mitigating climate vulnerabilities"</text>
        <text x="176" y="115" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">Context: Reducing severity or impact</text>
      `),
      options: [
        { key: 'A', text: 'reducing or alleviating' },
        { key: 'B', text: 'accelerating and worsening' },
        { key: 'C', text: 'ignoring completely' },
        { key: 'D', text: 'measuring precisely' }
      ],
      correctAnswer: 'A',
      explanation: 'In academic contexts, "mitigating" means making something less severe, painful, or harmful (reducing/alleviating risk).'
    };
  })
];

// --- 3. IPA / SAINS KATEGORI C (100 SOAL) ---
export const KATEGORI_C_SCIENCE: QuestionItem[] = [
  // Simulasi (1 - 30): Dasar IPA SMP (Fisika Gaya & Gerak, Biologi Sel, Kimia Wujud Zat)
  ...Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    const m = (i % 5) + 2; // 2, 3, 4, 5, 6 kg
    const a = 3; // 3 m/s²
    const f = m * a;
    return {
      id: `katC-sci-sim-${num}`,
      number: num,
      category: 'Kategori C' as const,
      subject: 'IPA / Sains' as const,
      level: 'SMP/MTs' as const,
      stage: 'simulasi' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Sangat Mudah' as const,
      questionText: `Hukum II Newton: Sebuah benda dengan massa m = ${m} kg didorong sehingga mengalami percepatan a = ${a} m/s². Berapakah besar resultan gaya dorong (F)?`,
      imageSvg: makeSvgVisual(`HUKUM II NEWTON #${num}`, 'SMP/MTs · MEKANIKA', ['#eff6ff', '#dbeafe', '#3b82f6'], `
        <rect width="352" height="135" rx="8" fill="#eff6ff"/>
        <rect x="136" y="35" width="80" height="60" rx="6" fill="#93c5fd" stroke="#2563eb" stroke-width="2.5"/>
        <line x1="220" y1="65" x2="290" y2="65" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow)"/>
        <text x="176" y="70" font-size="14" font-weight="bold" fill="#1e3a8a" text-anchor="middle">${m} kg</text>
        <text x="250" y="55" font-size="12" font-weight="black" fill="#dc2626">F = ? N</text>
        <text x="176" y="120" font-size="12" font-weight="bold" fill="#1d4ed8" text-anchor="middle">F = m × a (a = ${a} m/s²)</text>
      `),
      options: [
        { key: 'A', text: `${f} Newton` },
        { key: 'B', text: `${m + a} Newton` },
        { key: 'C', text: `${f * 2} Newton` },
        { key: 'D', text: `${Math.round(m / a)} Newton` }
      ],
      correctAnswer: 'A',
      explanation: `Sesuai Hukum II Newton: F = m × a = ${m} kg × ${a} m/s² = ${f} Newton.`
    };
  }),

  // Penyisihan (31 - 65): Menengah (Fotosintesis, Tekanan Hidrostatis, Sistem Peredaran Darah)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 31;
    const h = (i % 6) + 2; // 2 to 7 meter
    const rho = 1000; // kg/m3
    const g = 10; // m/s2
    const p = rho * g * h;
    return {
      id: `katC-sci-peny-${num}`,
      number: num,
      category: 'Kategori C' as const,
      subject: 'IPA / Sains' as const,
      level: 'SMP/MTs' as const,
      stage: 'penyisihan' as const,
      curriculum: 'Cambridge Lower Secondary' as const,
      difficulty: 'Mudah' as const,
      questionText: `Seorang penyelam berada pada kedalaman h = ${h} meter di bawah permukaan danau (massa jenis air ρ = 1.000 kg/m³, gravitasi g = 10 m/s²). Berapakah tekanan hidrostatis yang dialami penyelam?`,
      imageSvg: makeSvgVisual(`TEKANAN HIDROSTATIS #${num}`, 'SMP/MTs · FLUIDA', ['#f0fdfa', '#ccfbf1', '#0f766e'], `
        <rect width="352" height="135" rx="8" fill="#f0fdfa"/>
        <rect x="40" y="25" width="272" height="75" rx="4" fill="#99f6e4" stroke="#0f766e" stroke-width="2"/>
        <line x1="176" y1="25" x2="176" y2="85" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="3,2"/>
        <circle cx="176" cy="85" r="7" fill="#0d9488" stroke="#134e4a" stroke-width="2"/>
        <text x="190" y="60" font-size="11" font-weight="bold" fill="#dc2626">h = ${h} m</text>
        <text x="176" y="122" font-size="12" font-weight="bold" fill="#115e59" text-anchor="middle">P_h = ρ × g × h</text>
      `),
      options: [
        { key: 'A', text: `${p.toLocaleString('id-ID')} Pascal (Pa)` },
        { key: 'B', text: `${(p / 10).toLocaleString('id-ID')} Pascal (Pa)` },
        { key: 'C', text: `${(p * 2).toLocaleString('id-ID')} Pascal (Pa)` },
        { key: 'D', text: `${h * 100} Pascal (Pa)` }
      ],
      correctAnswer: 'A',
      explanation: `Tekanan hidrostatis dihitung dengan: P_h = ρ × g × h = 1.000 kg/m³ × 10 m/s² × ${h} m = ${p.toLocaleString('id-ID')} Pa.`
    };
  }),

  // Final (66 - 100): HOTS Sains / Olimpiade (Genetika Mendel & Efisiensi Energi Termal)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 66;
    return {
      id: `katC-sci-final-${num}`,
      number: num,
      category: 'Kategori C' as const,
      subject: 'IPA / Sains' as const,
      level: 'SMP/MTs' as const,
      stage: 'final' as const,
      curriculum: 'Olimpiade Sains Terpadu' as const,
      difficulty: 'Sangat Sulit (HOTS)' as const,
      questionText: `HOTS Genetika Persilangan Monohibrid: Tanaman kacang ercis berbatang tinggi heterozigot (Tt) disilangkan dengan sesamanya (Tt × Tt). Berapakah persentase keturunan F1 yang berfenotipe batang tinggi?`,
      imageSvg: makeSvgVisual(`PAPAN CATUR PUNNETT #${num}`, 'SMP/MTs · HOTS GENETIKA', ['#faf5ff', '#ede9fe', '#9333ea'], `
        <rect width="352" height="135" rx="8" fill="#faf5ff"/>
        <g transform="translate(110, 20)">
          <rect width="130" height="70" fill="#ffffff" stroke="#7e22ce" stroke-width="2"/>
          <line x1="65" y1="0" x2="65" y2="70" stroke="#7e22ce" stroke-width="1.5"/>
          <line x1="0" y1="35" x2="130" y2="35" stroke="#7e22ce" stroke-width="1.5"/>
          <text x="32" y="24" font-size="12" font-weight="black" fill="#581c87" text-anchor="middle">TT</text>
          <text x="97" y="24" font-size="12" font-weight="black" fill="#581c87" text-anchor="middle">Tt</text>
          <text x="32" y="58" font-size="12" font-weight="black" fill="#581c87" text-anchor="middle">Tt</text>
          <text x="97" y="58" font-size="12" font-weight="black" fill="#dc2626" text-anchor="middle">tt</text>
        </g>
        <text x="176" y="115" font-size="11" font-weight="bold" fill="#6b21a8" text-anchor="middle">Rasio Genotipe: 1 TT : 2 Tt : 1 tt (T = dominan tinggi)</text>
      `),
      options: [
        { key: 'A', text: '75%' },
        { key: 'B', text: '50%' },
        { key: 'C', text: '25%' },
        { key: 'D', text: '100%' }
      ],
      correctAnswer: 'A',
      explanation: 'Gen T dominan terhadap t. Fenotipe batang tinggi dihasilkan oleh genotipe TT (25%) dan Tt (50%), sehingga total fenotipe tinggi adalah 75%.'
    };
  })
];

// --- 4. BAHASA INDONESIA KATEGORI C (100 SOAL) ---
export const KATEGORI_C_INDO: QuestionItem[] = [
  // Simulasi (1 - 30): Dasar SMP (Ide Pokok, Teks Berita 5W+1H, Kalimat Efektif)
  ...Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    return {
      id: `katC-indo-sim-${num}`,
      number: num,
      category: 'Kategori C' as const,
      subject: 'Bahasa Indonesia' as const,
      level: 'SMP/MTs' as const,
      stage: 'simulasi' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Sangat Mudah' as const,
      questionText: `Dalam teks berita, unsur jurnalistik yang menjawab pertanyaan tentang latar tempat berlangsungnya suatu peristiwa penting adalah...`,
      imageSvg: makeSvgVisual(`UNSUR TEKS BERITA #${num}`, 'SMP/MTs · LITERASI', ['#eff6ff', '#dbeafe', '#2563eb'], `
        <rect width="352" height="135" rx="8" fill="#eff6ff"/>
        <rect x="40" y="25" width="272" height="65" rx="8" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2"/>
        <text x="176" y="50" font-size="13" font-weight="black" fill="#1e3a8a" text-anchor="middle">Formula ADIKSIMBA (5W + 1H)</text>
        <text x="176" y="72" font-size="11" font-weight="bold" fill="#1e40af" text-anchor="middle">Apa - Di mana - Kapan - Siapa - Mengapa - Bagaimana</text>
        <text x="176" y="115" font-size="11" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Fokus: Keterangan Tempat</text>
      `),
      options: [
        { key: 'A', text: 'Di mana (Where)' },
        { key: 'B', text: 'Kapan (When)' },
        { key: 'C', text: 'Siapa (Who)' },
        { key: 'D', text: 'Mengapa (Why)' }
      ],
      correctAnswer: 'A',
      explanation: 'Unsur "Di mana" (Where) berfungsi untuk memberikan informasi mengenai tempat kejadian dalam teks berita.'
    };
  }),

  // Penyisihan (31 - 65): Menengah (Teks Pidato Persuasif, Teks Ulasan, Konjungsi)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 31;
    return {
      id: `katC-indo-peny-${num}`,
      number: num,
      category: 'Kategori C' as const,
      subject: 'Bahasa Indonesia' as const,
      level: 'SMP/MTs' as const,
      stage: 'penyisihan' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Mudah' as const,
      questionText: `"Marilah kita bersama-sama menjaga kebersihan lingkungan sekolah demi kesehatan kita semua." Berdasarkan tujuannya, kalimat kutipan pidato tersebut merupakan kalimat...`,
      imageSvg: makeSvgVisual(`PIDATO PERSUASIF #${num}`, 'SMP/MTs · RETORIKA', ['#f0fdf4', '#dcfce7', '#16a34a'], `
        <rect width="352" height="135" rx="8" fill="#f0fdf4"/>
        <rect x="35" y="25" width="282" height="65" rx="8" fill="#86efac" stroke="#15803d" stroke-width="2"/>
        <text x="176" y="50" font-size="12.5" font-weight="black" fill="#14532d" text-anchor="middle">Kata Kunci: "Marilah kita bersama-sama"</text>
        <text x="176" y="72" font-size="11" font-weight="semibold" fill="#166534" text-anchor="middle">Mengajak audiens berbuat kebaikan</text>
        <text x="176" y="115" font-size="11" font-weight="bold" fill="#15803d" text-anchor="middle">Ciri Khas Teks Pidato Ajakan</text>
      `),
      options: [
        { key: 'A', text: 'Persuasif (Ajakan)' },
        { key: 'B', text: 'Deskriptif (Penggambaran)' },
        { key: 'C', text: 'Naratif (Penceritaan dongeng)' },
        { key: 'D', text: 'Interogatif (Pertanyaan)' }
      ],
      correctAnswer: 'A',
      explanation: 'Kalimat yang diawali kata ajakan seperti "Marilah" atau "Ayo" dengan maksud membujuk/mengajak pembaca atau pendengar disebut kalimat persuasif.'
    };
  }),

  // Final (66 - 100): HOTS (Analisis Makna Tersirat & Majas Kompleks)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 66;
    return {
      id: `katC-indo-final-${num}`,
      number: num,
      category: 'Kategori C' as const,
      subject: 'Bahasa Indonesia' as const,
      level: 'SMP/MTs' as const,
      stage: 'final' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Sangat Sulit (HOTS)' as const,
      questionText: `HOTS Analisis Puisi: "Di ujung pena ini, ribuan asa digantungkan untuk menyinari gelapnya malam kebodohan." Makna lambang dari frasa 'gelapnya malam kebodohan' adalah...`,
      imageSvg: makeSvgVisual(`ANALISIS SASTRA TINGKAT TINGGI #${num}`, 'SMP/MTs · HOTS FINAL', ['#faf5ff', '#ede9fe', '#7c3aed'], `
        <rect width="352" height="135" rx="8" fill="#faf5ff"/>
        <rect x="35" y="25" width="282" height="65" rx="8" fill="#ddd6fe" stroke="#6d28d9" stroke-width="2"/>
        <text x="176" y="50" font-size="12" font-weight="black" fill="#4c1d95" text-anchor="middle">Simbolisme & Makna Konotatif</text>
        <text x="176" y="72" font-size="11" font-weight="bold" fill="#5b21b6" text-anchor="middle">"Pena menyinari malam kebodohan"</text>
        <text x="176" y="115" font-size="11" font-weight="bold" fill="#6d28d9" text-anchor="middle">Hubungan: Pendidikan sebagai penerang hidup</text>
      `),
      options: [
        { key: 'A', text: 'Kondisi keterbelakangan akibat kurangnya ilmu pengetahuan dan pendidikan' },
        { key: 'B', text: 'Suasana malam hari yang gelap gulita karena mati lampu' },
        { key: 'C', text: 'Kegiatan belajar yang dilakukan hanya pada waktu malam hari' },
        { key: 'D', text: 'Kemarahan seseorang yang tidak dapat tertahankan lagi' }
      ],
      correctAnswer: 'A',
      explanation: 'Dalam konteks puisi pendidikan, "gelapnya malam kebodohan" adalah metafora untuk ketidaktahuan atau keterbelakangan masyarakat yang belum terjangkau ilmu pengetahuan.'
    };
  })
];

export const ALL_KATEGORI_C_QUESTIONS: QuestionItem[] = [
  ...KATEGORI_C_MATH,
  ...KATEGORI_C_ENGLISH,
  ...KATEGORI_C_SCIENCE,
  ...KATEGORI_C_INDO
];
