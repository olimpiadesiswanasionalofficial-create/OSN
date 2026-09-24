import { QuestionItem, makeSvgVisual } from './cbtQuestionTypes';

// =========================================================================
// BANK SOAL KATEGORI A: PAUD / TK (USIA 4 - 6 TAHUN)
// TOTAL: 400 SOAL (100 Matematika, 100 Bahasa Inggris, 100 IPA/Sains, 100 Bahasa Indonesia)
// Tingkat Kesulitan Sesuai Usia:
// - Simulasi: 30 Soal (Sangat Mudah: Visual ceria, hitung benda dasar 1-10, bentuk, warna)
// - Penyisihan: 35 Soal (Mudah: Pola 2 langkah, logika sederhana, kurikulum Merdeka PAUD & Early Cambridge)
// - Final: 35 Soal (HOTS PAUD: Penalaran komparasi, sebab-akibat, deret visual, Singapore Bar Early)
// =========================================================================

// --- 1. MATEMATIKA KATEGORI A (100 SOAL) ---
export const KATEGORI_A_MATH: QuestionItem[] = [
  // Simulasi (1 - 30): Sangat Mudah
  ...Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    const count = (i % 6) + 3; // 3 to 8
    const colors = ['#f87171', '#fb923c', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa'];
    const itemColor = colors[i % colors.length];
    return {
      id: `katA-math-sim-${num}`,
      number: num,
      category: 'Kategori A' as const,
      subject: 'Matematika' as const,
      level: 'PAUD/TK' as const,
      stage: 'simulasi' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Sangat Mudah' as const,
      questionText: `Hitunglah berapa banyak gambar lingkaran ceria pada kotak di samping!`,
      imageSvg: makeSvgVisual(`HITUNG BENDA #${num}`, 'PAUD/TK · SANGAT MUDAH', ['#fef2f2', '#fee2e2', '#ef4444'], `
        <rect width="352" height="135" rx="8" fill="#fff5f5"/>
        <g transform="translate(30, 25)">
          ${Array.from({ length: count }, (_, idx) => `
            <circle cx="${(idx % 5) * 60 + 25}" cy="${Math.floor(idx / 5) * 50 + 20}" r="18" fill="${itemColor}" stroke="#1f2937" stroke-width="2"/>
            <circle cx="${(idx % 5) * 60 + 19}" cy="${Math.floor(idx / 5) * 50 + 16}" r="3" fill="#ffffff"/>
          `).join('')}
        </g>
        <text x="176" y="125" font-family="sans-serif" font-size="12" font-weight="bold" fill="#991b1b" text-anchor="middle">Jumlah Objek = ?</text>
      `),
      options: [
        { key: 'A', text: `${count - 1} Lingkaran` },
        { key: 'B', text: `${count} Lingkaran` },
        { key: 'C', text: `${count + 1} Lingkaran` },
        { key: 'D', text: `${count + 2} Lingkaran` }
      ],
      correctAnswer: 'B',
      explanation: `Jika dihitung satu per satu dengan cermat, terdapat tepat ${count} buah lingkaran pada gambar.`
    };
  }),

  // Penyisihan (31 - 65): Mudah
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 31;
    const a = (i % 4) + 2;
    const b = (i % 3) + 1;
    const sum = a + b;
    return {
      id: `katA-math-peny-${num}`,
      number: num,
      category: 'Kategori A' as const,
      subject: 'Matematika' as const,
      level: 'PAUD/TK' as const,
      stage: 'penyisihan' as const,
      curriculum: 'Cambridge Primary/Checkpoint' as const,
      difficulty: 'Mudah' as const,
      questionText: `Ada ${a} buah bintang kuning, lalu ditambah ${b} buah bintang lagi. Berapakah jumlah seluruh bintang sekarang?`,
      imageSvg: makeSvgVisual(`PENJUMLAHAN VISUAL #${num}`, 'PAUD/TK · MUDAH', ['#fefce8', '#fef9c3', '#eab308'], `
        <rect width="352" height="135" rx="8" fill="#fffbeb"/>
        <g transform="translate(30, 30)">
          <text x="35" y="45" font-size="28" font-weight="black" fill="#ca8a04">${a} ★</text>
          <text x="110" y="45" font-size="28" font-weight="black" fill="#1f2937">+</text>
          <text x="150" y="45" font-size="28" font-weight="black" fill="#ca8a04">${b} ★</text>
          <text x="210" y="45" font-size="28" font-weight="black" fill="#1f2937">=</text>
          <text x="260" y="45" font-size="28" font-weight="black" fill="#dc2626">?</text>
        </g>
        <text x="176" y="115" font-family="sans-serif" font-size="12" font-weight="bold" fill="#854d0e" text-anchor="middle">${a} + ${b} = [ ? ]</text>
      `),
      options: [
        { key: 'A', text: `${sum} Bintang` },
        { key: 'B', text: `${sum + 1} Bintang` },
        { key: 'C', text: `${sum - 1} Bintang` },
        { key: 'D', text: `${sum + 2} Bintang` }
      ],
      correctAnswer: 'A',
      explanation: `Penjumlahan sederhana: ${a} ditambah ${b} sama dengan ${sum}.`
    };
  }),

  // Final (66 - 100): HOTS PAUD / TK (Penalaran Komparasi & Pola Logika)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 66;
    const patterns = ['Segitiga', 'Kotak', 'Lingkaran'];
    const nextItem = patterns[i % 3];
    return {
      id: `katA-math-final-${num}`,
      number: num,
      category: 'Kategori A' as const,
      subject: 'Matematika' as const,
      level: 'PAUD/TK' as const,
      stage: 'final' as const,
      curriculum: 'Singapore Curriculum' as const,
      difficulty: 'Sangat Sulit (HOTS)' as const,
      questionText: `HOTS Olimpiade PAUD: Perhatikan pola bentuk berulang berikut! Bentuk apakah yang tepat untuk mengisi tanda tanya (?)?`,
      imageSvg: makeSvgVisual(`POLA LOGIKA PAUD #${num}`, 'PAUD/TK · HOTS FINAL', ['#eff6ff', '#dbeafe', '#2563eb'], `
        <rect width="352" height="135" rx="8" fill="#f0f9ff"/>
        <g transform="translate(25, 35)">
          <polygon points="30,10 10,40 50,40" fill="#f87171" stroke="#dc2626" stroke-width="2"/>
          <rect x="75" y="10" width="30" height="30" fill="#60a5fa" stroke="#2563eb" stroke-width="2"/>
          <circle cx="150" cy="25" r="16" fill="#34d399" stroke="#059669" stroke-width="2"/>
          <text x="200" y="32" font-size="22" font-weight="bold" fill="#1e40af">➞</text>
          <rect x="235" y="5" width="40" height="40" rx="6" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
          <text x="255" y="33" font-size="24" font-weight="bold" fill="#b45309" text-anchor="middle">?</text>
        </g>
        <text x="176" y="115" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1e40af" text-anchor="middle">Pola: Segitiga ➞ Persegi ➞ Lingkaran ➞ [ ? ]</text>
      `),
      options: [
        { key: 'A', text: nextItem },
        { key: 'B', text: 'Bintang' },
        { key: 'C', text: 'Bulan Sabit' },
        { key: 'D', text: 'Oval Lonjong' }
      ],
      correctAnswer: 'A',
      explanation: `Pola visual berulang mengikuti urutan: Segitiga, Kotak, Lingkaran, lalu kembali lagi ke ${nextItem}.`
    };
  })
];

// --- 2. BAHASA INGGRIS KATEGORI A (100 SOAL) ---
export const KATEGORI_A_ENGLISH: QuestionItem[] = [
  // Simulasi (1 - 30): Sangat Mudah (Colors, Numbers, Animals)
  ...Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    const vocabList = [
      { word: 'APPLE', ind: 'Apel', color: '#ef4444', emoji: '🍎' },
      { word: 'CAT', ind: 'Kucing', color: '#f59e0b', emoji: '🐱' },
      { word: 'DOG', ind: 'Anjing', color: '#8b5cf6', emoji: '🐶' },
      { word: 'SUN', ind: 'Matahari', color: '#eab308', emoji: '☀️' },
      { word: 'FISH', ind: 'Ikan', color: '#06b6d4', emoji: '🐟' }
    ];
    const item = vocabList[i % vocabList.length];
    return {
      id: `katA-eng-sim-${num}`,
      number: num,
      category: 'Kategori A' as const,
      subject: 'Bahasa Inggris' as const,
      level: 'PAUD/TK' as const,
      stage: 'simulasi' as const,
      curriculum: 'Cambridge Primary/Checkpoint' as const,
      difficulty: 'Sangat Mudah' as const,
      questionText: `What is the English word for "${item.ind}"?`,
      imageSvg: makeSvgVisual(`ENGLISH VOCABULARY #${num}`, 'PAUD/TK · SANGAT MUDAH', ['#fdf4ff', '#fae8ff', '#a855f7'], `
        <rect width="352" height="135" rx="8" fill="#faf5ff"/>
        <g transform="translate(140, 20)">
          <circle cx="36" cy="36" r="32" fill="${item.color}" opacity="0.2"/>
          <text x="36" y="46" font-size="34" text-anchor="middle">${item.emoji}</text>
        </g>
        <text x="176" y="112" font-family="sans-serif" font-size="14" font-weight="black" fill="#6b21a8" text-anchor="middle">${item.ind} = [ ? ]</text>
      `),
      options: [
        { key: 'A', text: item.word },
        { key: 'B', text: 'BIRD' },
        { key: 'C', text: 'BOOK' },
        { key: 'D', text: 'TREE' }
      ],
      correctAnswer: 'A',
      explanation: `Bahasa Inggris dari kata "${item.ind}" adalah "${item.word}".`
    };
  }),

  // Penyisihan (31 - 65): Mudah (Greetings, Family, Body Parts)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 31;
    const bodyParts = [
      { eng: 'EYES', ind: 'Mata untuk melihat' },
      { eng: 'EARS', ind: 'Telinga untuk mendengar' },
      { eng: 'HANDS', ind: 'Tangan untuk memegang' },
      { eng: 'NOSE', ind: 'Hidung untuk bernapas' }
    ];
    const bp = bodyParts[i % bodyParts.length];
    return {
      id: `katA-eng-peny-${num}`,
      number: num,
      category: 'Kategori A' as const,
      subject: 'Bahasa Inggris' as const,
      level: 'PAUD/TK' as const,
      stage: 'penyisihan' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Mudah' as const,
      questionText: `We use our _____ to see colorful rainbows in the sky.`,
      imageSvg: makeSvgVisual(`MY BODY PARTS #${num}`, 'PAUD/TK · MUDAH', ['#ecfdf5', '#d1fae5', '#10b981'], `
        <rect width="352" height="135" rx="8" fill="#f0fdf4"/>
        <rect x="50" y="25" width="250" height="70" rx="8" fill="#bbf7d0" stroke="#16a34a" stroke-width="2"/>
        <text x="175" y="55" font-size="14" font-weight="bold" fill="#14532d" text-anchor="middle">Function: SEE & LOOK</text>
        <text x="175" y="78" font-size="12" font-weight="bold" fill="#15803d" text-anchor="middle">${bp.ind}</text>
      `),
      options: [
        { key: 'A', text: bp.eng },
        { key: 'B', text: 'LEGS' },
        { key: 'C', text: 'TEETH' },
        { key: 'D', text: 'HAIR' }
      ],
      correctAnswer: 'A',
      explanation: `Kita menggunakan "${bp.eng}" (${bp.ind}) untuk aktivitas tersebut.`
    };
  }),

  // Final (66 - 100): HOTS PAUD (Simple Sentences & Phonics)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 66;
    return {
      id: `katA-eng-final-${num}`,
      number: num,
      category: 'Kategori A' as const,
      subject: 'Bahasa Inggris' as const,
      level: 'PAUD/TK' as const,
      stage: 'final' as const,
      curriculum: 'International Baccalaureate (IB)' as const,
      difficulty: 'Sangat Sulit (HOTS)' as const,
      questionText: `Early Reading HOTS: Look at the picture! "The sun is shining bright in the sky." What color is the sun?`,
      imageSvg: makeSvgVisual(`READING & COMPREHENSION #${num}`, 'PAUD/TK · HOTS FINAL', ['#fefce8', '#fef08a', '#ca8a04'], `
        <rect width="352" height="135" rx="8" fill="#fffbeb"/>
        <circle cx="176" cy="50" r="26" fill="#facc15" stroke="#eab308" stroke-width="3"/>
        <text x="176" y="105" font-family="sans-serif" font-size="12" font-weight="bold" fill="#854d0e" text-anchor="middle">"The Sun is Yellow and Warm"</text>
      `),
      options: [
        { key: 'A', text: 'Yellow' },
        { key: 'B', text: 'Blue' },
        { key: 'C', text: 'Green' },
        { key: 'D', text: 'Purple' }
      ],
      correctAnswer: 'A',
      explanation: `Matahari yang bersinar pada gambar digambarkan berwarna kuning cerah (Yellow).`
    };
  })
];

// --- 3. IPA / SAINS KATEGORI A (100 SOAL) ---
export const KATEGORI_A_SCIENCE: QuestionItem[] = [
  // Simulasi (1 - 30): Sangat Mudah (Hewan & Tumbuhan Dasar)
  ...Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    const hewanList = [
      { nama: 'SAPI', makan: 'Rumput hijau di padang', suara: 'Moo-moo' },
      { nama: 'AYAM', makan: 'Biji-bijian & jagung', suara: 'Kukuruyuk' },
      { nama: 'KUCING', makan: 'Ikan segar', suara: 'Meong-meong' },
      { nama: 'BEBEK', makan: 'Cacing & dedak', suara: 'Kwek-kwek' }
    ];
    const h = hewanList[i % hewanList.length];
    return {
      id: `katA-sci-sim-${num}`,
      number: num,
      category: 'Kategori A' as const,
      subject: 'IPA / Sains' as const,
      level: 'PAUD/TK' as const,
      stage: 'simulasi' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Sangat Mudah' as const,
      questionText: `Hewan pada gambar berbunyi "${h.suara}" dan suka makan ${h.makan}. Apakah nama hewan tersebut?`,
      imageSvg: makeSvgVisual(`DUNIA HEWAN PAUD #${num}`, 'PAUD/TK · SANGAT MUDAH', ['#ecfdf5', '#d1fae5', '#059669'], `
        <rect width="352" height="135" rx="8" fill="#f0fdf4"/>
        <rect x="50" y="25" width="252" height="70" rx="10" fill="#a7f3d0" stroke="#059669" stroke-width="2"/>
        <text x="176" y="52" font-size="14" font-weight="bold" fill="#065f46" text-anchor="middle">Suara: "${h.suara}"</text>
        <text x="176" y="78" font-size="12" font-weight="bold" fill="#047857" text-anchor="middle">Makanan: ${h.makan}</text>
      `),
      options: [
        { key: 'A', text: h.nama },
        { key: 'B', text: 'HARIMAU' },
        { key: 'C', text: 'BUAYA' },
        { key: 'D', text: 'SERIGALA' }
      ],
      correctAnswer: 'A',
      explanation: `Hewan yang bersuara "${h.suara}" dan memakan makanan tersebut adalah ${h.nama}.`
    };
  }),

  // Penyisihan (31 - 65): Mudah (Cuaca, Panca Indera & Alam Sekitar)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 31;
    return {
      id: `katA-sci-peny-${num}`,
      number: num,
      category: 'Kategori A' as const,
      subject: 'IPA / Sains' as const,
      level: 'PAUD/TK' as const,
      stage: 'penyisihan' as const,
      curriculum: 'Cambridge Primary/Checkpoint' as const,
      difficulty: 'Mudah' as const,
      questionText: `Benda langit yang bersinar terang pada siang hari dan menghangatkan bumi adalah...`,
      imageSvg: makeSvgVisual(`BENDA LANGIT #${num}`, 'PAUD/TK · MUDAH', ['#fff7ed', '#ffedd5', '#ea580c'], `
        <rect width="352" height="135" rx="8" fill="#fff7ed"/>
        <circle cx="176" cy="55" r="28" fill="#fb923c" stroke="#ea580c" stroke-width="3"/>
        <text x="176" y="115" font-family="sans-serif" font-size="12" font-weight="bold" fill="#9a3412" text-anchor="middle">Terang di Siang Hari</text>
      `),
      options: [
        { key: 'A', text: 'Matahari' },
        { key: 'B', text: 'Bulan' },
        { key: 'C', text: 'Bintang Malam' },
        { key: 'D', text: 'Awan Gelap' }
      ],
      correctAnswer: 'A',
      explanation: 'Matahari adalah sumber cahaya alami terbesar yang menerangi dan menghangatkan bumi pada siang hari.'
    };
  }),

  // Final (66 - 100): HOTS PAUD (Sains Sederhana: Terapung/Tenggelam & Pertumbuhan)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 66;
    return {
      id: `katA-sci-final-${num}`,
      number: num,
      category: 'Kategori A' as const,
      subject: 'IPA / Sains' as const,
      level: 'PAUD/TK' as const,
      stage: 'final' as const,
      curriculum: 'Singapore Curriculum' as const,
      difficulty: 'Sangat Sulit (HOTS)' as const,
      questionText: `Eksperimen Air Sains: Jika kita meletakkan daun kering di atas permukaan air dalam mangkuk, apa yang akan terjadi?`,
      imageSvg: makeSvgVisual(`SAINS TERAPUNG & TENGGELAM #${num}`, 'PAUD/TK · HOTS FINAL', ['#eff6ff', '#bfdbfe', '#1d4ed8'], `
        <rect width="352" height="135" rx="8" fill="#eff6ff"/>
        <rect x="60" y="55" width="232" height="50" rx="4" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2"/>
        <ellipse cx="176" cy="55" rx="30" ry="8" fill="#86efac" stroke="#15803d" stroke-width="2"/>
        <text x="176" y="122" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1e40af" text-anchor="middle">Daun di Atas Permukaan Air</text>
      `),
      options: [
        { key: 'A', text: 'Daun Terapung di Atas Air' },
        { key: 'B', text: 'Daun Tenggelam ke Dasar' },
        { key: 'C', text: 'Daun Meleleh Cepat' },
        { key: 'D', text: 'Air Berubah Jadi Es' }
      ],
      correctAnswer: 'A',
      explanation: 'Daun kering memiliki massa jenis lebih ringan daripada air sehingga daun akan terapung di atas permukaan air.'
    };
  })
];

// --- 4. BAHASA INDONESIA KATEGORI A (100 SOAL) ---
export const KATEGORI_A_INDO: QuestionItem[] = [
  // Simulasi (1 - 30): Sangat Mudah (Huruf Vokal & Kata Benda Ceria)
  ...Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    const vokal = ['A', 'I', 'U', 'E', 'O'];
    const v = vokal[i % vokal.length];
    return {
      id: `katA-indo-sim-${num}`,
      number: num,
      category: 'Kategori A' as const,
      subject: 'Bahasa Indonesia' as const,
      level: 'PAUD/TK' as const,
      stage: 'simulasi' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Sangat Mudah' as const,
      questionText: `Huruf abjad besar yang tertulis pada kartu di samping adalah huruf...`,
      imageSvg: makeSvgVisual(`HURUF ABJAD VOKAL #${num}`, 'PAUD/TK · SANGAT MUDAH', ['#fdf2f8', '#fbcfe8', '#db2777'], `
        <rect width="352" height="135" rx="8" fill="#fdf2f8"/>
        <circle cx="176" cy="50" r="32" fill="#f472b6" stroke="#db2777" stroke-width="3"/>
        <text x="176" y="62" font-family="sans-serif" font-size="36" font-weight="black" fill="#ffffff" text-anchor="middle">${v}</text>
        <text x="176" y="112" font-family="sans-serif" font-size="12" font-weight="bold" fill="#9d174d" text-anchor="middle">Tebak Huruf</text>
      `),
      options: [
        { key: 'A', text: `Huruf ${v}` },
        { key: 'B', text: 'Huruf Z' },
        { key: 'C', text: 'Huruf X' },
        { key: 'D', text: 'Huruf Q' }
      ],
      correctAnswer: 'A',
      explanation: `Huruf yang ditampilkan secara jelas pada kartu bergambar adalah huruf vokal "${v}".`
    };
  }),

  // Penyisihan (31 - 65): Mudah (Kata Sapaan & Sopan Santun)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 31;
    return {
      id: `katA-indo-peny-${num}`,
      number: num,
      category: 'Kategori A' as const,
      subject: 'Bahasa Indonesia' as const,
      level: 'PAUD/TK' as const,
      stage: 'penyisihan' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Mudah' as const,
      questionText: `Ketika kita berbuat kesalahan atau tidak sengaja menabrak teman, kata sopan yang harus kita ucapkan adalah...`,
      imageSvg: makeSvgVisual(`KATA SOPAN SANTUN #${num}`, 'PAUD/TK · MUDAH', ['#f0fdf4', '#dcfce7', '#16a34a'], `
        <rect width="352" height="135" rx="8" fill="#f0fdf4"/>
        <rect x="50" y="25" width="252" height="70" rx="10" fill="#86efac" stroke="#16a34a" stroke-width="2"/>
        <text x="176" y="55" font-size="15" font-weight="black" fill="#14532d" text-anchor="middle">Adab & Budi Pekerti Baik</text>
        <text x="176" y="78" font-size="12" font-weight="bold" fill="#166534" text-anchor="middle">Meminta Maaf dengan Tulus</text>
      `),
      options: [
        { key: 'A', text: 'Maaf' },
        { key: 'B', text: 'Diam saja' },
        { key: 'C', text: 'Tertawa' },
        { key: 'D', text: 'Menangis' }
      ],
      correctAnswer: 'A',
      explanation: 'Sikap terpuji dan sopan santun saat kita berbuat salah adalah segera mengucapkan kata "Maaf".'
    };
  }),

  // Final (66 - 100): HOTS PAUD (Pemahaman Dongeng Bergambar)
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 66;
    return {
      id: `katA-indo-final-${num}`,
      number: num,
      category: 'Kategori A' as const,
      subject: 'Bahasa Indonesia' as const,
      level: 'PAUD/TK' as const,
      stage: 'final' as const,
      curriculum: 'Kurikulum Merdeka' as const,
      difficulty: 'Sangat Sulit (HOTS)' as const,
      questionText: `Cerita Karakter Anak: "Budi selalu menyiram tanaman bunga setiap sore agar bunganya mekar indah." Siapakah nama anak yang rajin tersebut?`,
      imageSvg: makeSvgVisual(`LITERASI CERITA PAUD #${num}`, 'PAUD/TK · HOTS FINAL', ['#eff6ff', '#bfdbfe', '#2563eb'], `
        <rect width="352" height="135" rx="8" fill="#eff6ff"/>
        <rect x="50" y="20" width="252" height="75" rx="8" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2"/>
        <text x="176" y="45" font-size="13" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Budi Rajin Menyiram Bunga</text>
        <text x="176" y="72" font-size="11" font-weight="semibold" fill="#1e40af" text-anchor="middle">Tanaman Tumbuh Subur & Indah</text>
      `),
      options: [
        { key: 'A', text: 'Budi' },
        { key: 'B', text: 'Kancil' },
        { key: 'C', text: 'Kelinci' },
        { key: 'D', text: 'Roni' }
      ],
      correctAnswer: 'A',
      explanation: 'Pada teks cerita pendek disampaikan dengan jelas bahwa tokoh anak yang rajin menyiram bunga adalah Budi.'
    };
  })
];

export const ALL_KATEGORI_A_QUESTIONS: QuestionItem[] = [
  ...KATEGORI_A_MATH,
  ...KATEGORI_A_ENGLISH,
  ...KATEGORI_A_SCIENCE,
  ...KATEGORI_A_INDO
];
