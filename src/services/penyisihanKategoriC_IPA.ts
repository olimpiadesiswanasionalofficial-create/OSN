import { QuestionItem } from './cbtQuestionTypes';
import { createPenyisihanSvg } from './simulasiSvgIllustrations';

// SOAL RESMI BABAK PENYISIHAN: IPA / SAINS SMP/MTs (Kategori C)
// 20 Soal Pilihan Ganda Kurikulum Campuran (Merdeka, Cambridge, Singapore, IB)
// Tingkat Kesulitan: Menengah | 100% Bergambar & Unik

export const PENYISIHAN_C_IPA: QuestionItem[] = [
  // --- KURIKULUM MERDEKA (Soal 1 - 5) ---
  {
    id: 'PENY-C-IPA-01',
    number: 1,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Sebuah balok bermassa 5 kg ditarik dengan gaya F = 25 N ke arah kanan di atas lantai licin (gesekan diabaikan). Berapakah percepatan yang dialami balok tersebut berdasarkan Hukum II Newton?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Dinamika Gerak', 'Hukum II Newton (F = m × a)', '#2563EB',
        `<g transform="translate(60, 15)">
          <line x1="20" y1="75" x2="260" y2="75" stroke="#64748B" stroke-width="2"/>
          <rect x="80" y="35" width="60" height="40" fill="#DBEAFE" stroke="#2563EB" stroke-width="2"/>
          <text x="110" y="60" font-size="11" font-weight="bold" fill="#1E40AF" text-anchor="middle">m = 5 kg</text>
          <!-- Gaya tarik -->
          <line x1="140" y1="55" x2="220" y2="55" stroke="#DC2626" stroke-width="3"/>
          <polygon points="220,50 230,55 220,60" fill="#DC2626"/>
          <text x="180" y="45" font-size="11" font-weight="bold" fill="#DC2626">F = 25 N</text>
          <text x="110" y="95" font-size="11" font-weight="bold" fill="#1E40AF" text-anchor="middle">a = F / m = ?</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '3 m/s²' },
      { key: 'B', text: '4 m/s²' },
      { key: 'C', text: '5 m/s²' },
      { key: 'D', text: '6 m/s²' }
    ],
    correctAnswer: 'C',
    explanation: 'Berdasarkan Hukum II Newton: a = ∑F / m = 25 N / 5 kg = 5 m/s².'
  },
  {
    id: 'PENY-C-IPA-02',
    number: 2,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Pada persilangan monohibrid dominan penuh antara tanaman berbunga merah (MM) dengan tanaman berbunga putih (mm), semua keturunan F1 berwarna merah (Mm). Jika F1 disilangkan dengan sesamanya (Mm × Mm), berapakah rasio fenotipe keturunan F2 (Merah : Putih)?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Genetika Mendel', 'Papan Catur Persilangan Monohibrid', '#DB2777',
        `<g transform="translate(70, 10)">
          <!-- Punnett Square -->
          <rect x="50" y="20" width="100" height="70" fill="#FDF2F8" stroke="#DB2777" stroke-width="2"/>
          <line x1="100" y1="20" x2="100" y2="90" stroke="#DB2777"/>
          <line x1="50" y1="55" x2="150" y2="55" stroke="#DB2777"/>
          <text x="75" y="42" font-size="11" font-weight="bold" fill="#9D174D" text-anchor="middle">MM (Merah)</text>
          <text x="125" y="42" font-size="11" font-weight="bold" fill="#9D174D" text-anchor="middle">Mm (Merah)</text>
          <text x="75" y="78" font-size="11" font-weight="bold" fill="#9D174D" text-anchor="middle">Mm (Merah)</text>
          <text x="125" y="78" font-size="11" font-weight="bold" fill="#64748B" text-anchor="middle">mm (Putih)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '1 : 1' },
      { key: 'B', text: '2 : 1' },
      { key: 'C', text: '3 : 1' },
      { key: 'D', text: '9 : 3 : 3 : 1' }
    ],
    correctAnswer: 'C',
    explanation: 'Genotipe F2 adalah 1 MM : 2 Mm : 1 mm. Karena M dominan penuh terhadap m, maka MM dan Mm menghasilkan warna Merah (3 bagian) dan mm berwarna Putih (1 bagian). Rasio fenotipe = 3 : 1.'
  },
  {
    id: 'PENY-C-IPA-03',
    number: 3,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Perhatikan nefron ginjal manusia berikut! Bagian glomerulus dan kapsula Bowman bertugas melakukan proses ... yang menghasilkan filtrat ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Sistem Ekskresi', 'Filtrasi Darah di Glomerulus', '#EA580C',
        `<g transform="translate(60, 15)">
          <circle cx="70" cy="50" r="28" fill="#FFEDD5" stroke="#EA580C" stroke-width="2"/>
          <text x="70" y="55" font-size="10" font-weight="bold" fill="#C2410C" text-anchor="middle">Glomerulus</text>
          <path d="M 100 50 L 150 50" stroke="#EA580C" stroke-width="2"/>
          <rect x="155" y="30" width="90" height="40" rx="8" fill="#FFF7ED" stroke="#EA580C"/>
          <text x="200" y="55" font-size="10" font-weight="bold" fill="#9A3412" text-anchor="middle">Tubulus Ginjal</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Reabsorpsi, urine sekunder' },
      { key: 'B', text: 'Filtrasi (penyaringan darah), urine primer' },
      { key: 'C', text: 'Augmentasi, urine sebenarnya' },
      { key: 'D', text: 'Defekasi, feses' }
    ],
    correctAnswer: 'B',
    explanation: 'Glomerulus menyaring darah (filtrasi) dari sel darah dan protein besar, menghasilkan urine primer yang ditampung di kapsula Bowman.'
  },
  {
    id: 'PENY-C-IPA-04',
    number: 4,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Sebuah kelapa bermassa 2 kg jatuh bebas dari pohon berketinggian 10 meter di atas tanah (g = 10 m/s²). Berapakah energi kinetik buah kelapa tepat sesaat sebelum menyentuh tanah?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Kekekalan Energi', 'Energi Potensial ke Kinetik', '#059669',
        `<g transform="translate(70, 15)">
          <!-- Pohon & kelapa -->
          <circle cx="60" cy="25" r="10" fill="#15803D"/>
          <text x="60" y="28" font-size="9" fill="#FFF" text-anchor="middle">m=2kg</text>
          <line x1="60" y1="35" x2="60" y2="85" stroke="#059669" stroke-width="2" stroke-dasharray="3"/>
          <line x1="20" y1="85" x2="220" y2="85" stroke="#64748B" stroke-width="2"/>
          <text x="140" y="45" font-size="11" font-weight="bold" fill="#047857">h = 10 m | g = 10 m/s²</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#065F46">Ek_bawah = Ep_atas = mgh</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '100 Joule' },
      { key: 'B', text: '150 Joule' },
      { key: 'C', text: '200 Joule' },
      { key: 'D', text: '250 Joule' }
    ],
    correctAnswer: 'C',
    explanation: 'Berdasarkan Hukum Kekekalan Energi Mekanik (tanpa gesekan udara): Ek_bawah = Ep_atas = m × g × h = 2 kg × 10 m/s² × 10 m = 200 Joule.'
  },
  {
    id: 'PENY-C-IPA-05',
    number: 5,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Perbedaan utama antara pembelahan sel secara MITOSIS dan MEIOSIS adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Pembelahan Sel', 'Mitosis vs Meiosis Perbandingan', '#7C3AED',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="110" height="60" rx="8" fill="#F5F3FF" stroke="#7C3AED"/>
          <text x="75" y="45" font-size="11" font-weight="bold" fill="#6D28D9" text-anchor="middle">Mitosis</text>
          <text x="75" y="65" font-size="9" fill="#5B21B6" text-anchor="middle">2 sel anak (2n diploid)</text>
          
          <rect x="145" y="20" width="110" height="60" rx="8" fill="#F5F3FF" stroke="#7C3AED"/>
          <text x="200" y="45" font-size="11" font-weight="bold" fill="#6D28D9" text-anchor="middle">Meiosis</text>
          <text x="200" y="65" font-size="9" fill="#5B21B6" text-anchor="middle">4 sel anak (n haploid)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Mitosis terjadi pada sel gamet, sedangkan meiosis pada sel tubuh' },
      { key: 'B', text: 'Mitosis menghasilkan 2 sel anak identik diploid (2n), sedangkan meiosis menghasilkan 4 sel anak haploid (n)' },
      { key: 'C', text: 'Mitosis mereduksi jumlah kromosom menjadi separuh' },
      { key: 'D', text: 'Meiosis bertujuan untuk pertumbuhan dan regenerasi jaringan rusak' }
    ],
    correctAnswer: 'B',
    explanation: 'Mitosis terjadi pada sel somatis menghasilkan 2 sel anak identik (2n), sedangkan meiosis terjadi pada sel gametogenesis menghasilkan 4 sel anak rekombinan haploid (n).'
  },

  // --- CAMBRIDGE LOWER SECONDARY SCIENCE (Soal 6 - 10) ---
  {
    id: 'PENY-C-IPA-06',
    number: 6,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Study the universal pH color scale. Solution X turns Universal Indicator solution dark blue/purple (pH 12). Solution X is classified as a ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Acids & Bases', 'Universal Indicator pH Spectrum', '#4F46E5',
        `<g transform="translate(60, 15)">
          <!-- pH Scale 0 to 14 -->
          <rect x="20" y="30" width="30" height="30" fill="#EF4444"/><text x="35" y="50" font-size="9" fill="#FFF" text-anchor="middle">pH 1</text>
          <rect x="55" y="30" width="30" height="30" fill="#F97316"/><text x="70" y="50" font-size="9" fill="#FFF" text-anchor="middle">pH 4</text>
          <rect x="90" y="30" width="30" height="30" fill="#22C55E"/><text x="105" y="50" font-size="9" fill="#FFF" text-anchor="middle">pH 7</text>
          <rect x="125" y="30" width="30" height="30" fill="#3B82F6"/><text x="140" y="50" font-size="9" fill="#FFF" text-anchor="middle">pH 10</text>
          <rect x="160" y="30" width="30" height="30" fill="#6366F1"/><text x="175" y="50" font-size="9" fill="#FFF" text-anchor="middle">pH 12★</text>
          <rect x="195" y="30" width="30" height="30" fill="#4338CA"/><text x="210" y="50" font-size="9" fill="#FFF" text-anchor="middle">pH 14</text>
          <text x="125" y="80" font-size="11" font-weight="bold" fill="#312E81" text-anchor="middle">Acidic (<7) ➔ Neutral (7) ➔ Alkaline (>7)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Strong acid' },
      { key: 'B', text: 'Neutral solution' },
      { key: 'C', text: 'Strong alkali / base' },
      { key: 'D', text: 'Weak acid' }
    ],
    correctAnswer: 'C',
    explanation: 'A pH value of 12 with a purple/dark blue universal indicator hue denotes a strongly alkaline (basic) solution.'
  },
  {
    id: 'PENY-C-IPA-07',
    number: 7,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'A transverse water wave has a frequency f = 5 Hz and a wavelength λ = 0.4 meters. What is the propagation speed (v) of this wave?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Wave Mechanics', 'Wave Speed Equation (v = f × λ)', '#0284C7',
        `<g transform="translate(60, 15)">
          <path d="M 20 50 Q 55 10 90 50 T 160 50 T 230 50" fill="none" stroke="#0284C7" stroke-width="3"/>
          <line x1="20" y1="50" x2="250" y2="50" stroke="#94A3B8" stroke-dasharray="3"/>
          <line x1="55" y1="15" x2="125" y2="15" stroke="#DC2626" stroke-width="2"/>
          <text x="90" y="10" font-size="10" font-weight="bold" fill="#DC2626" text-anchor="middle">λ = 0.4 m</text>
          <text x="140" y="85" font-size="11" font-weight="bold" fill="#0369A1" text-anchor="middle">v = f × λ | f = 5 Hz</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '1.25 m/s' },
      { key: 'B', text: '2.0 m/s' },
      { key: 'C', text: '4.5 m/s' },
      { key: 'D', text: '12.5 m/s' }
    ],
    correctAnswer: 'B',
    explanation: 'Wave velocity formula: v = f × λ = 5 Hz × 0.4 m = 2.0 m/s.'
  },
  {
    id: 'PENY-C-IPA-08',
    number: 8,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'In a hydraulic press system (Pascal\'s Principle), a small piston of cross-sectional area A₁ = 10 cm² receives an input force of F₁ = 200 N. What upward force F₂ is produced on the large piston of area A₂ = 50 cm²?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Fluid Pressure', 'Hydraulic Lift (Pascal\'s Principle)', '#D97706',
        `<g transform="translate(60, 15)">
          <!-- Small piston -->
          <rect x="30" y="30" width="30" height="40" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
          <text x="45" y="20" font-size="10" font-weight="bold" fill="#B45309" text-anchor="middle">F₁ = 200N</text>
          <!-- Pipe -->
          <rect x="60" y="55" width="80" height="15" fill="#BAE6FD"/>
          <!-- Large piston -->
          <rect x="140" y="20" width="70" height="50" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
          <text x="175" y="15" font-size="10" font-weight="bold" fill="#B45309" text-anchor="middle">F₂ = ?</text>
          <text x="110" y="90" font-size="11" font-weight="bold" fill="#92400E" text-anchor="middle">P₁ = P₂ ➔ F₁ / A₁ = F₂ / A₂</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '500 N' },
      { key: 'B', text: '800 N' },
      { key: 'C', text: '1.000 N' },
      { key: 'D', text: '2.000 N' }
    ],
    correctAnswer: 'C',
    explanation: 'By Pascal\'s law: F₁ / A₁ = F₂ / A₂ => 200 / 10 = F₂ / 50 => F₂ = 20 × 50 = 1.000 N.'
  },
  {
    id: 'PENY-C-IPA-09',
    number: 9,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Look at the tectonic plate boundary diagram. When two oceanic plates diverge (pull apart from each other), which geological feature is formed along the sea floor?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Earth Science', 'Divergent Tectonic Plate Boundary', '#EA580C',
        `<g transform="translate(60, 15)">
          <rect x="20" y="45" width="80" height="30" fill="#CBD5E1" stroke="#475569"/>
          <text x="60" y="35" font-size="12" font-weight="bold" fill="#DC2626">◀ Plate 1</text>
          
          <!-- Magma rising -->
          <polygon points="120,40 110,75 130,75" fill="#EF4444"/>
          <text x="120" y="25" font-size="10" font-weight="bold" fill="#DC2626" text-anchor="middle">Magma Rift</text>
          
          <rect x="140" y="45" width="80" height="30" fill="#CBD5E1" stroke="#475569"/>
          <text x="180" y="35" font-size="12" font-weight="bold" fill="#DC2626">Plate 2 ▶</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Deep subduction oceanic trench' },
      { key: 'B', text: 'Mid-ocean ridge with new oceanic crust formation' },
      { key: 'C', text: 'Fold mountains like the Himalayas' },
      { key: 'D', text: 'Inland desert sand dunes' }
    ],
    correctAnswer: 'B',
    explanation: 'Divergent oceanic boundaries allow magma from the mantle to upwell and cool, continuously creating new seafloor rock along a mid-ocean ridge (e.g., Mid-Atlantic Ridge).'
  },
  {
    id: 'PENY-C-IPA-10',
    number: 10,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Which eukaryotic cellular organelle contains folded inner membrane cristae and generates the majority of ATP energy through cellular aerobic respiration?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Cellular Biology', 'Mitochondria Organelle Structure', '#10B981',
        `<g transform="translate(80, 15)">
          <ellipse cx="80" cy="50" rx="55" ry="30" fill="#D1FAE5" stroke="#10B981" stroke-width="2"/>
          <path d="M 40 50 Q 55 35 65 50 T 95 50 T 120 50" fill="none" stroke="#047857" stroke-width="2.5"/>
          <text x="80" y="54" font-size="10" font-weight="bold" fill="#065F46" text-anchor="middle">Cristae</text>
          <text x="175" y="45" font-size="11" font-weight="bold" fill="#047857">Powerhouse</text>
          <text x="175" y="65" font-size="11" font-weight="bold" fill="#047857">ATP synthesis</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Ribosome' },
      { key: 'B', text: 'Golgi apparatus' },
      { key: 'C', text: 'Mitochondrion' },
      { key: 'D', text: 'Vacuole' }
    ],
    correctAnswer: 'C',
    explanation: 'The mitochondrion is known as the powerhouse of the eukaryotic cell, where Krebs cycle and electron transport chain synthesize ATP on folded cristae membranes.'
  },

  // --- SINGAPORE LOWER SECONDARY (Soal 11 - 15) ---
  {
    id: 'PENY-C-IPA-11',
    number: 11,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'An electrically neutral atom of element Sodium (Na) has an atomic number of 11 and a mass number of 23. What are the numbers of protons, neutrons, and electrons in this atom?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Atomic Structure', 'Bohr Model of Sodium Atom', '#6366F1',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#EEF2FF" stroke="#6366F1" stroke-width="1.5"/>
          <text x="140" y="42" font-size="12" font-weight="bold" fill="#4338CA" text-anchor="middle">²³₁₁Na (Atomic number Z = 11, Mass A = 23)</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#312E81" text-anchor="middle">Protons = Z | Electrons = Z | Neutrons = A - Z</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '11 protons, 12 neutrons, 11 electrons' },
      { key: 'B', text: '11 protons, 23 neutrons, 11 electrons' },
      { key: 'C', text: '12 protons, 11 neutrons, 12 electrons' },
      { key: 'D', text: '23 protons, 11 neutrons, 23 electrons' }
    ],
    correctAnswer: 'A',
    explanation: 'Atomic number = number of protons = 11. In a neutral atom, electrons = protons = 11. Number of neutrons = mass number - atomic number = 23 - 11 = 12.'
  },
  {
    id: 'PENY-C-IPA-12',
    number: 12,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'In an experiment observing thermal energy transfer: A thermometer inserted in a chemical reaction mixture registers a temperature drop from 25°C to 18°C. What type of reaction has occurred?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Thermochemistry', 'Endothermic vs Exothermic Reaction', '#0284C7',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/>
          <text x="140" y="42" font-size="12" font-weight="bold" fill="#0369A1" text-anchor="middle">Heat absorbed from surroundings (ΔT < 0)</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#0284C7" text-anchor="middle">Endothermic reaction cools the beaker</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Exothermic reaction releasing thermal heat' },
      { key: 'B', text: 'Endothermic reaction absorbing thermal heat from the surroundings' },
      { key: 'C', text: 'Nuclear fusion reaction' },
      { key: 'D', text: 'Combustion reaction' }
    ],
    correctAnswer: 'B',
    explanation: 'An endothermic reaction absorbs heat energy from the surrounding solution, resulting in a measurable temperature decrease on the thermometer.'
  },
  {
    id: 'PENY-C-IPA-13',
    number: 13,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Look at the nitrogen cycle diagram. Which group of specialized soil bacteria converts atmospheric nitrogen gas (N₂) directly into ammonium and nitrates usable by plants?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Nitrogen Cycle', 'Soil Nitrogen-Fixing Bacteria', '#15803D',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="80" height="50" rx="8" fill="#DCFCE7" stroke="#16A34A"/>
          <text x="60" y="50" font-size="10" font-weight="bold" fill="#15803D" text-anchor="middle">N₂ in Air</text>
          <text x="120" y="50" font-size="16" font-weight="bold" fill="#15803D">→</text>
          <rect x="140" y="20" width="110" height="50" rx="8" fill="#DCFCE7" stroke="#16A34A"/>
          <text x="195" y="45" font-size="10" font-weight="bold" fill="#15803D" text-anchor="middle">Nitrogen-Fixers</text>
          <text x="195" y="60" font-size="9" fill="#166534" text-anchor="middle">(Rhizobium in roots)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Denitrifying bacteria' },
      { key: 'B', text: 'Nitrogen-fixing bacteria (e.g., Rhizobium)' },
      { key: 'C', text: 'Methanogenic archaebacteria' },
      { key: 'D', text: 'Lactic acid fermenting bacilli' }
    ],
    correctAnswer: 'B',
    explanation: 'Nitrogen-fixing bacteria like Rhizobium (living symbiotically in legume root nodules) convert atmospheric N₂ gas into ammonia/nitrates that plants can assimilate.'
  },
  {
    id: 'PENY-C-IPA-14',
    number: 14,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Why is the heating element of an electric kettle placed at the very BOTTOM of the water container?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Thermal Physics', 'Convection Currents in Fluids', '#DC2626',
        `<g transform="translate(60, 15)">
          <rect x="50" y="15" width="140" height="75" rx="10" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
          <rect x="65" y="78" width="110" height="8" rx="4" fill="#DC2626"/>
          <path d="M 80 65 Q 70 35 120 30 Q 170 35 160 65" fill="none" stroke="#DC2626" stroke-width="2" stroke-dasharray="3"/>
          <text x="120" y="55" font-size="10" font-weight="bold" fill="#991B1B" text-anchor="middle">Convection Loop</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'To allow warm water to expand, become less dense, and rise, establishing convection currents' },
      { key: 'B', text: 'To prevent sound waves from escaping the kettle' },
      { key: 'C', text: 'Because cold water rises naturally by magnetic force' },
      { key: 'D', text: 'To stop the water from boiling too quickly' }
    ],
    correctAnswer: 'A',
    explanation: 'Water heated at the bottom expands, decreases in density, and rises. Denser cold water sinks to take its place, establishing efficient convection currents that heat the whole volume.'
  },
  {
    id: 'PENY-C-IPA-15',
    number: 15,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'An electrical appliance with power rating P = 1.200 Watts is operated for 5 hours each day. How many kilowatt-hours (kWh) of electrical energy are consumed in 30 days?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Electrical Energy', 'Energy Consumption (E = P × t)', '#F59E0B',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FFFBEB" stroke="#F59E0B" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#B45309" text-anchor="middle">P = 1.200 W = 1.2 kW | t = 5 h/day × 30 days</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#92400E" text-anchor="middle">E = 1.2 kW × 150 h = ? kWh</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '120 kWh' },
      { key: 'B', text: '150 kWh' },
      { key: 'C', text: '180 kWh' },
      { key: 'D', text: '240 kWh' }
    ],
    correctAnswer: 'C',
    explanation: 'Power in kW = 1.200 / 1.000 = 1,2 kW. Total operating hours = 5 hours/day × 30 days = 150 hours. Energy = 1,2 kW × 150 hours = 180 kWh.'
  },

  // --- INTERNATIONAL BACCALAUREATE (IB MYP) (Soal 16 - 20) ---
  {
    id: 'PENY-C-IPA-16',
    number: 16,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Investigate green hydrogen fuel cells: In a hydrogen-oxygen fuel cell, hydrogen gas (H₂) combines with oxygen (O₂) to generate clean electricity. What is the ONLY emission byproduct produced by this clean reaction?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Hydrogen Fuel Cells', 'Zero-Emission Fuel Cell Electrochemistry', '#059669',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#ECFDF5" stroke="#059669" stroke-width="2"/>
          <text x="140" y="42" font-size="12" font-weight="bold" fill="#065F46" text-anchor="middle">2H₂ + O₂ ➔ 2H₂O + Electricity ⚡</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">Pure Water (H₂O) Vapor byproduct</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Carbon dioxide gas (CO₂)' },
      { key: 'B', text: 'Sulfur dioxide gas (SO₂)' },
      { key: 'C', text: 'Pure water vapor (H₂O)' },
      { key: 'D', text: 'Carbon monoxide (CO)' }
    ],
    correctAnswer: 'C',
    explanation: 'The electrochemical reaction in a hydrogen fuel cell converts chemical energy into electricity with water vapor (H₂O) as its sole exhaust product.'
  },
  {
    id: 'PENY-C-IPA-17',
    number: 17,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Investigate the eutrophication cascade in freshwater lakes: What is the primary cause of severe aquatic hypoxia (depletion of dissolved oxygen) that triggers mass fish kills?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Freshwater Eutrophication', 'Algal Bloom & Oxygen Depletion Cascade', '#0D9488',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#CCFBF1" stroke="#0D9488" stroke-width="1.5"/>
          <text x="140" y="42" font-size="10" font-weight="bold" fill="#0F766E" text-anchor="middle">Fertilizer runoff ➔ Algal bloom ➔ Algae die</text>
          <text x="140" y="65" font-size="10" font-weight="bold" fill="#115E59" text-anchor="middle">Decomposers consume dissolved O₂ ➔ Fish suffocate</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Excess sunlight boiling the lake water' },
      { key: 'B', text: 'Decomposing aerobic bacteria consuming dissolved oxygen as they break down dead algal blooms' },
      { key: 'C', text: 'Overpopulation of carnivorous water snakes' },
      { key: 'D', text: 'Immediate chemical evaporation of all oxygen molecules' }
    ],
    correctAnswer: 'B',
    explanation: 'When massive algal blooms die, populations of aerobic decomposers multiply rapidly and consume dissolved oxygen from the water column, causing hypoxia.'
  },
  {
    id: 'PENY-C-IPA-18',
    number: 18,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Scientific Inquiry Variables: A student investigates how different enzyme concentrations affect the rate of starch breakdown into glucose at a constant 37°C and pH 7. In this experiment, the enzyme concentration is the ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Scientific Method', 'Identifying Experimental Variables', '#7C3AED',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#6D28D9" text-anchor="middle">Changed by experimenter = Independent Variable</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#5B21B6" text-anchor="middle">Measured outcome = Dependent Variable (Rate)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Controlled variable' },
      { key: 'B', text: 'Independent variable (variabel bebas)' },
      { key: 'C', text: 'Dependent variable (variabel terikat)' },
      { key: 'D', text: 'Confounding error variable' }
    ],
    correctAnswer: 'B',
    explanation: 'The independent variable is the single parameter intentionally manipulated by the researcher to observe its effect on the measured outcome (the dependent variable).'
  },
  {
    id: 'PENY-C-IPA-19',
    number: 19,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Biotechnology & Genetic Engineering: How do scientists introduce a human insulin gene into a plasmid vector of Escherichia coli bacteria?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Recombinant DNA Tech', 'Restriction Enzymes & Ligase', '#DB2777',
        `<g transform="translate(60, 15)">
          <circle cx="80" cy="50" r="25" fill="none" stroke="#DB2777" stroke-width="3"/>
          <text x="80" y="55" font-size="9" font-weight="bold" fill="#9D174D" text-anchor="middle">Plasmid</text>
          <text x="140" y="55" font-size="14" font-weight="bold" fill="#DB2777">+</text>
          <rect x="160" y="40" width="50" height="20" rx="4" fill="#FCE7F3" stroke="#DB2777"/>
          <text x="185" y="54" font-size="9" font-weight="bold" fill="#9D174D" text-anchor="middle">Gene</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'By crushing the bacteria with mortar and pestle' },
      { key: 'B', text: 'Using restriction endonucleases to cut DNA and DNA ligase to seal the recombinant plasmid' },
      { key: 'C', text: 'Boiling the DNA at 100°C for 2 hours' },
      { key: 'D', text: 'Using X-ray bombardment randomly' }
    ],
    correctAnswer: 'B',
    explanation: 'Restriction enzymes cut DNA at specific palindromic recognition sites creating sticky ends, and DNA ligase splices the gene into the circular plasmid vector.'
  },
  {
    id: 'PENY-C-IPA-20',
    number: 20,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Investigate the global greenhouse effect: Which mechanism explains why greenhouse gases like carbon dioxide (CO₂) and methane (CH₄) warm Earth\'s lower atmosphere?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Climate Physics', 'Atmospheric Greenhouse Effect', '#EA580C',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FFF7ED" stroke="#EA580C" stroke-width="1.5"/>
          <text x="140" y="42" font-size="10" font-weight="bold" fill="#C2410C" text-anchor="middle">Shortwave visible solar radiation passes through</text>
          <text x="140" y="65" font-size="10" font-weight="bold" fill="#9A3412" text-anchor="middle">Earth emits longwave infrared (heat) which is trapped</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'They reflect all incoming sunlight back into outer space' },
      { key: 'B', text: 'They absorb outgoing longwave infrared radiation re-emitted by Earth and re-radiate it in all directions' },
      { key: 'C', text: 'They trigger nuclear chain reactions in clouds' },
      { key: 'D', text: 'They stop ocean currents from moving' }
    ],
    correctAnswer: 'B',
    explanation: 'Greenhouse gas molecules absorb outgoing thermal infrared radiation emitted by Earth\'s surface and re-radiate heat back toward the surface, trapping energy in the troposphere.'
  }
];
