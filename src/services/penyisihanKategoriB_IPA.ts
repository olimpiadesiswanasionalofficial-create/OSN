import { QuestionItem } from './cbtQuestionTypes';
import { createPenyisihanSvg } from './simulasiSvgIllustrations';

// SOAL RESMI BABAK PENYISIHAN: IPA / SAINS SD/MI (Kategori B)
// 20 Soal Pilihan Ganda Kurikulum Campuran (Merdeka, Cambridge, Singapore, IB)
// Tingkat Kesulitan: Menengah | 100% Bergambar & Unik

export const PENYISIHAN_B_IPA: QuestionItem[] = [
  // --- KURIKULUM MERDEKA (Soal 1 - 5) ---
  {
    id: 'PENY-B-IPA-01',
    number: 1,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Perhatikan bagan rantai makanan ekosistem sawah berikut! Jika populasi ular menurun drastis karena diburu manusia, apa dampak langsung yang akan terjadi pada populasi tikus dan tanaman padi?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Ekosistem', 'Rantai Makanan Sawah', '#16A34A',
        `<g transform="translate(40, 15)">
          <rect x="10" y="25" width="65" height="50" rx="8" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/>
          <text x="42" y="55" font-size="11" font-weight="bold" fill="#15803D" text-anchor="middle">Padi 🌾</text>
          <text x="88" y="55" font-size="14" font-weight="bold" fill="#16A34A">→</text>
          
          <rect x="105" y="25" width="65" height="50" rx="8" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
          <text x="137" y="55" font-size="11" font-weight="bold" fill="#B45309" text-anchor="middle">Tikus 🐀</text>
          <text x="183" y="55" font-size="14" font-weight="bold" fill="#16A34A">→</text>
          
          <rect x="200" y="25" width="65" height="50" rx="8" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/>
          <text x="232" y="55" font-size="11" font-weight="bold" fill="#991B1B" text-anchor="middle">Ular 🐍</text>
          <text x="278" y="55" font-size="14" font-weight="bold" fill="#16A34A">→</text>
          
          <rect x="295" y="25" width="65" height="50" rx="8" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/>
          <text x="327" y="55" font-size="11" font-weight="bold" fill="#0369A1" text-anchor="middle">Elang 🦅</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Populasi tikus meningkat dan tanaman padi menurun' },
      { key: 'B', text: 'Populasi tikus menurun dan tanaman padi meningkat' },
      { key: 'C', text: 'Populasi elang meningkat drastis' },
      { key: 'D', text: 'Tidak ada perubahan pada seluruh populasi' }
    ],
    correctAnswer: 'A',
    explanation: 'Ular adalah predator alami bagi tikus. Jika populasi ular menurun, populasi tikus akan melonjak tajam sehingga konsumsi padi meningkat dan panen padi menurun drastis.'
  },
  {
    id: 'PENY-B-IPA-02',
    number: 2,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Perhatikan diagram siklus perubahan wujud zat berikut! Perubahan wujud nomor 1 (cair menjadi gas) dan nomor 2 (gas menjadi cair) berturut-turut disebut ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Wujud Zat', 'Perubahan Wujud Zat', '#0284C7',
        `<g transform="translate(60, 15)">
          <circle cx="60" cy="50" r="32" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
          <text x="60" y="55" font-size="12" font-weight="bold" fill="#0369A1" text-anchor="middle">Cair 💧</text>
          
          <path d="M 100 35 L 200 35" stroke="#2563EB" stroke-width="2" marker-end="url(#arrow)"/>
          <text x="150" y="28" font-size="11" font-weight="bold" fill="#1E40AF" text-anchor="middle">No. 1 (?)</text>
          
          <path d="M 200 65 L 100 65" stroke="#0D9488" stroke-width="2"/>
          <text x="150" y="80" font-size="11" font-weight="bold" fill="#0F766E" text-anchor="middle">No. 2 (?)</text>
          
          <circle cx="240" cy="50" r="32" fill="#F1F5F9" stroke="#64748B" stroke-width="2"/>
          <text x="240" y="55" font-size="12" font-weight="bold" fill="#334155" text-anchor="middle">Gas 💨</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Membeku dan mencair' },
      { key: 'B', text: 'Menguap dan mengembun' },
      { key: 'C', text: 'Menyublim dan mengkristal' },
      { key: 'D', text: 'Mengembun dan menguap' }
    ],
    correctAnswer: 'B',
    explanation: 'Perubahan wujud dari zat cair menjadi gas disebut menguap (evaporasi), sedangkan gas menjadi cair disebut mengembun (kondensasi).'
  },
  {
    id: 'PENY-B-IPA-03',
    number: 3,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Perhatikan skema peredaran darah manusia! Bagian jantung yang berfungsi memompa darah kaya oksigen (O₂) ke seluruh tubuh adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Sistem Peredaran Darah', 'Struktur Ruang Jantung', '#DC2626',
        `<g transform="translate(80, 15)">
          <rect x="20" y="15" width="90" height="40" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.5"/>
          <text x="65" y="40" font-size="10" font-weight="bold" fill="#1E40AF" text-anchor="middle">Serambi Kanan</text>
          
          <rect x="120" y="15" width="90" height="40" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/>
          <text x="165" y="40" font-size="10" font-weight="bold" fill="#991B1B" text-anchor="middle">Serambi Kiri</text>
          
          <rect x="20" y="60" width="90" height="40" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.5"/>
          <text x="65" y="85" font-size="10" font-weight="bold" fill="#1E40AF" text-anchor="middle">Bilik Kanan</text>
          
          <rect x="120" y="60" width="90" height="40" fill="#FCA5A5" stroke="#B91C1C" stroke-width="2"/>
          <text x="165" y="85" font-size="10" font-weight="bold" fill="#7F1D1D" text-anchor="middle">Bilik Kiri (★)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Serambi kanan' },
      { key: 'B', text: 'Bilik kanan' },
      { key: 'C', text: 'Serambi kiri' },
      { key: 'D', text: 'Bilik kiri' }
    ],
    correctAnswer: 'D',
    explanation: 'Bilik kiri (ventrikel kiri) memiliki otot dinding paling tebal karena bertugas memompa darah bersih beroksigen ke seluruh jaringan tubuh melalui aorta.'
  },
  {
    id: 'PENY-B-IPA-04',
    number: 4,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Perhatikan bagian-bagian bunga sempurna pada gambar! Tempat terjadinya proses penyerbukan (jatuhnya serbuk sari ke kepala putik) ditunjukkan oleh huruf ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Reproduksi Tumbuhan', 'Anatomi Bunga Sempurna', '#DB2777',
        `<g transform="translate(80, 15)">
          <circle cx="120" cy="30" r="14" fill="#FCE7F3" stroke="#DB2777" stroke-width="2"/>
          <text x="120" y="34" font-size="11" font-weight="bold" fill="#9D174D" text-anchor="middle">P (Putik)</text>
          
          <circle cx="70" cy="45" r="12" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
          <text x="70" y="49" font-size="10" font-weight="bold" fill="#B45309" text-anchor="middle">Q (Sari)</text>
          
          <path d="M 60 70 Q 120 100 180 70" fill="#FBCFE8" stroke="#DB2777" stroke-width="1.5"/>
          <text x="120" y="90" font-size="10" font-weight="bold" fill="#9D174D" text-anchor="middle">R (Mahkota)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Bagian P (Kepala Putik)' },
      { key: 'B', text: 'Bagian Q (Benang Sari)' },
      { key: 'C', text: 'Bagian R (Mahkota Bunga)' },
      { key: 'D', text: 'Tangkai Bunga' }
    ],
    correctAnswer: 'A',
    explanation: 'Penyerbukan adalah peristiwa jatuhnya serbuk sari (alat kelamin jantan) ke atas kepala putik (bagian P, alat kelamin betina).'
  },
  {
    id: 'PENY-B-IPA-05',
    number: 5,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Pembangkit Listrik Tenaga Surya (PLTS) memanfaatkan panel surya untuk mengubah energi cahaya matahari menjadi energi listrik. Keunggulan utama energi alternatif ini adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Energi Alternatif', 'Sistem Panel Surya Ramah Lingkungan', '#F59E0B',
        `<g transform="translate(60, 15)">
          <circle cx="50" cy="40" r="22" fill="#FDE047" stroke="#EAB308" stroke-width="2"/>
          <text x="50" y="45" font-size="16" text-anchor="middle">☀️</text>
          
          <line x1="80" y1="45" x2="130" y2="55" stroke="#F59E0B" stroke-width="2" stroke-dasharray="3"/>
          
          <rect x="140" y="30" width="80" height="50" rx="6" fill="#1E3A8A" stroke="#3B82F6" stroke-width="2"/>
          <text x="180" y="55" font-size="10" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Solar Panel</text>
          
          <text x="250" y="55" font-size="18" text-anchor="middle">⚡💡</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Menghasilkan gas buang karbon dioksida yang banyak' },
      { key: 'B', text: 'Dapat diperbarui, tidak habis, dan ramah lingkungan tanpa polusi' },
      { key: 'C', text: 'Hanya bisa digunakan saat malam hari' },
      { key: 'D', text: 'Memerlukan bahan bakar batu bara' }
    ],
    correctAnswer: 'B',
    explanation: 'Energi surya merupakan energi terbarukan (renewable) yang berlimpah, tidak akan habis, serta bersih dari polusi udara dan emisi gas rumah kaca.'
  },

  // --- CAMBRIDGE PRIMARY SCIENCE (Soal 6 - 10) ---
  {
    id: 'PENY-B-IPA-06',
    number: 6,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'In a physics experiment on friction, a wooden block is pulled across four different surfaces with a spring balance. Which surface will produce the HIGHEST friction force?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Forces & Friction', 'Friction Investigation on Surfaces', '#EA580C',
        `<g transform="translate(60, 15)">
          <rect x="20" y="45" width="240" height="20" fill="#E2E8F0" stroke="#64748B" stroke-width="1"/>
          <!-- Block -->
          <rect x="120" y="20" width="50" height="25" fill="#FED7AA" stroke="#EA580C" stroke-width="1.5"/>
          <text x="145" y="37" font-size="9" font-weight="bold" fill="#9A3412" text-anchor="middle">Block</text>
          <!-- Pull arrow -->
          <line x1="170" y1="32" x2="220" y2="32" stroke="#EA580C" stroke-width="2"/>
          <text x="235" y="36" font-size="10" font-weight="bold" fill="#EA580C">→</text>
          <!-- Surface textures -->
          <text x="140" y="80" font-size="11" font-weight="bold" fill="#475569" text-anchor="middle">Test: Glass vs Ice vs Wood vs Sandpaper</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Smooth polished glass' },
      { key: 'B', text: 'Wet ice block' },
      { key: 'C', text: 'Rough sandpaper surface' },
      { key: 'D', text: 'Oiled plastic board' }
    ],
    correctAnswer: 'C',
    explanation: 'Rough sandpaper has high microscopic irregularities that resist movement, producing the highest friction force compared to smooth glass or ice.'
  },
  {
    id: 'PENY-B-IPA-07',
    number: 7,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Look at the particle model illustration below. In which state of matter are particles tightly packed in a regular fixed lattice with only vibrational movement?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Particle Theory', 'States of Matter Particle Models', '#6366F1',
        `<g transform="translate(50, 15)">
          <!-- Solid -->
          <rect x="15" y="20" width="75" height="65" rx="8" fill="#EEF2FF" stroke="#4F46E5" stroke-width="1.5"/>
          <text x="52" y="55" font-size="12" text-anchor="middle">●●●●\n●●●●</text>
          <text x="52" y="98" font-size="10" font-weight="bold" fill="#4338CA" text-anchor="middle">Model X (Solid)</text>
          <!-- Liquid -->
          <rect x="115" y="20" width="75" height="65" rx="8" fill="#EEF2FF" stroke="#4F46E5" stroke-width="1.5"/>
          <text x="152" y="55" font-size="12" text-anchor="middle">●  ● ●\n● ●  ●</text>
          <text x="152" y="98" font-size="10" font-weight="bold" fill="#4338CA" text-anchor="middle">Model Y (Liquid)</text>
          <!-- Gas -->
          <rect x="215" y="20" width="75" height="65" rx="8" fill="#EEF2FF" stroke="#4F46E5" stroke-width="1.5"/>
          <text x="252" y="55" font-size="12" text-anchor="middle">●     ●\n   ●</text>
          <text x="252" y="98" font-size="10" font-weight="bold" fill="#4338CA" text-anchor="middle">Model Z (Gas)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Solid (Padat)' },
      { key: 'B', text: 'Liquid (Cair)' },
      { key: 'C', text: 'Gas' },
      { key: 'D', text: 'Plasma' }
    ],
    correctAnswer: 'A',
    explanation: 'In a solid, particles are closely packed in fixed positions in a regular lattice and can only vibrate around fixed points.'
  },
  {
    id: 'PENY-B-IPA-08',
    number: 8,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Look at the light and shadow experiment. When the flashlight is moved CLOSER to the opaque ball, what happens to the size of the shadow on the screen?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Light & Shadows', 'Shadow Formation Experiment', '#475569',
        `<g transform="translate(50, 15)">
          <!-- Flashlight -->
          <rect x="10" y="40" width="35" height="20" fill="#FDE047" stroke="#CA8A04"/>
          <!-- Light rays -->
          <line x1="45" y1="50" x2="120" y2="30" stroke="#FACC15" stroke-dasharray="2"/>
          <line x1="45" y1="50" x2="120" y2="70" stroke="#FACC15" stroke-dasharray="2"/>
          <!-- Opaque ball -->
          <circle cx="120" cy="50" r="16" fill="#1E293B"/>
          <!-- Screen -->
          <line x1="240" y1="10" x2="240" y2="90" stroke="#0F172A" stroke-width="3"/>
          <rect x="238" y="25" width="4" height="50" fill="#64748B"/>
          <text x="210" y="55" font-size="10" font-weight="bold" fill="#334155">Shadow</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'The shadow becomes smaller' },
      { key: 'B', text: 'The shadow becomes larger' },
      { key: 'C', text: 'The shadow disappears completely' },
      { key: 'D', text: 'The shadow changes into a circle of light' }
    ],
    correctAnswer: 'B',
    explanation: 'Moving the light source closer to an opaque object causes the object to block a wider cone of light rays, casting a larger shadow on the screen.'
  },
  {
    id: 'PENY-B-IPA-09',
    number: 9,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'In the simple electrical circuit shown below, what will happen if Switch S1 is opened (turned off)?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Electricity', 'Series Circuit with Switch', '#0D9488',
        `<g transform="translate(60, 15)">
          <rect x="30" y="20" width="220" height="60" rx="4" fill="none" stroke="#0D9488" stroke-width="2"/>
          <!-- Battery -->
          <rect x="40" y="35" width="30" height="30" fill="#CCFBF1" stroke="#0F766E"/>
          <text x="55" y="55" font-size="10" font-weight="bold" fill="#115E59" text-anchor="middle">🔋</text>
          <!-- Switch open -->
          <line x1="120" y1="20" x2="145" y2="10" stroke="#DC2626" stroke-width="3"/>
          <text x="135" y="32" font-size="9" font-weight="bold" fill="#DC2626">S1 (Open)</text>
          <!-- Bulbs -->
          <circle cx="210" cy="50" r="14" fill="#FEF08A" stroke="#CA8A04"/>
          <text x="210" y="55" font-size="12" text-anchor="middle">💡</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'The bulb shines twice as brightly' },
      { key: 'B', text: 'The circuit is broken and the bulb turns off' },
      { key: 'C', text: 'The battery runs out instantly' },
      { key: 'D', text: 'The wire becomes very hot' }
    ],
    correctAnswer: 'B',
    explanation: 'In a series circuit, an open switch breaks the continuous conductive loop, stopping electric current flow completely so the bulb turns off.'
  },
  {
    id: 'PENY-B-IPA-10',
    number: 10,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Which essential gas is absorbed by green leaves during photosynthesis, and which gas is released as a byproduct?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Photosynthesis', 'Gas Exchange in Photosynthesis', '#16A34A',
        `<g transform="translate(60, 15)">
          <path d="M 80 50 C 120 15 180 15 220 50 C 180 85 120 85 80 50 Z" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/>
          <text x="150" y="55" font-size="12" font-weight="bold" fill="#15803D" text-anchor="middle">Green Leaf 🍃</text>
          
          <text x="40" y="45" font-size="11" font-weight="bold" fill="#0369A1">In: CO₂</text>
          <text x="240" y="45" font-size="11" font-weight="bold" fill="#15803D">Out: O₂</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Absorbs Oxygen, releases Nitrogen' },
      { key: 'B', text: 'Absorbs Carbon Dioxide, releases Oxygen' },
      { key: 'C', text: 'Absorbs Nitrogen, releases Carbon Dioxide' },
      { key: 'D', text: 'Absorbs Hydrogen, releases Helium' }
    ],
    correctAnswer: 'B',
    explanation: 'During photosynthesis, chlorophyll absorbs carbon dioxide (CO₂) from the air and water from the soil, producing glucose and releasing oxygen (O₂).'
  },

  // --- SINGAPORE CURRICULUM SCIENCE (Soal 11 - 15) ---
  {
    id: 'PENY-B-IPA-11',
    number: 11,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'In the human digestive system, in which organ are nutrients primarily absorbed into the bloodstream?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Human Systems', 'Human Digestive Organ Flow', '#D97706',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="70" height="35" rx="6" fill="#FEF3C7" stroke="#D97706"/>
          <text x="55" y="42" font-size="10" font-weight="bold" fill="#92400E" text-anchor="middle">Stomach</text>
          <text x="100" y="42" font-size="14" font-weight="bold" fill="#D97706">→</text>
          
          <rect x="115" y="20" width="90" height="35" rx="6" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>
          <text x="160" y="42" font-size="10" font-weight="bold" fill="#9A3412" text-anchor="middle">Small Intestine ★</text>
          <text x="215" y="42" font-size="14" font-weight="bold" fill="#D97706">→</text>
          
          <rect x="230" y="20" width="70" height="35" rx="6" fill="#FEF3C7" stroke="#D97706"/>
          <text x="265" y="42" font-size="10" font-weight="bold" fill="#92400E" text-anchor="middle">Large Int.</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Mouth cavity' },
      { key: 'B', text: 'Esophagus' },
      { key: 'C', text: 'Small intestine (Usus halus)' },
      { key: 'D', text: 'Large intestine (Usus besar)' }
    ],
    correctAnswer: 'C',
    explanation: 'The small intestine contains millions of tiny finger-like projections called villi that maximize surface area to absorb digested nutrients into blood capillaries.'
  },
  {
    id: 'PENY-B-IPA-12',
    number: 12,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Four spoons made of different materials (Silver, Wood, Plastic, Glass) are placed in hot water. Which spoon will conduct heat the fastest to the top handle?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Heat Conductors', 'Thermal Conductivity Test', '#E11D48',
        `<g transform="translate(60, 15)">
          <rect x="40" y="55" width="200" height="40" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/>
          <text x="140" y="80" font-size="11" font-weight="bold" fill="#1D4ED8" text-anchor="middle">Beaker of Hot Water (80°C)</text>
          <!-- 4 spoons -->
          <line x1="70" y1="20" x2="70" y2="70" stroke="#94A3B8" stroke-width="4"/>
          <text x="70" y="15" font-size="9" font-weight="bold" text-anchor="middle">Silver</text>
          
          <line x1="115" y1="20" x2="115" y2="70" stroke="#B45309" stroke-width="4"/>
          <text x="115" y="15" font-size="9" font-weight="bold" text-anchor="middle">Wood</text>
          
          <line x1="165" y1="20" x2="165" y2="70" stroke="#065F46" stroke-width="4"/>
          <text x="165" y="15" font-size="9" font-weight="bold" text-anchor="middle">Plastic</text>
          
          <line x1="210" y1="20" x2="210" y2="70" stroke="#64748B" stroke-width="4"/>
          <text x="210" y="15" font-size="9" font-weight="bold" text-anchor="middle">Glass</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Silver spoon (Metal)' },
      { key: 'B', text: 'Wooden spoon' },
      { key: 'C', text: 'Plastic spoon' },
      { key: 'D', text: 'Glass spoon' }
    ],
    correctAnswer: 'A',
    explanation: 'Metals like silver are excellent conductors of thermal heat due to free valence electrons, transferring heat much faster than insulators like wood, plastic, or glass.'
  },
  {
    id: 'PENY-B-IPA-13',
    number: 13,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'How is a desert cactus plant physically adapted to minimize water loss (transpiration) in harsh arid climates?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Plant Adaptations', 'Desert Cactus Structural Features', '#15803D',
        `<g transform="translate(80, 15)">
          <rect x="70" y="20" width="40" height="70" rx="16" fill="#86EFAC" stroke="#15803D" stroke-width="2"/>
          <!-- Spines -->
          <line x1="60" y1="35" x2="70" y2="35" stroke="#15803D" stroke-width="2"/>
          <line x1="110" y1="45" x2="120" y2="45" stroke="#15803D" stroke-width="2"/>
          <line x1="60" y1="65" x2="70" y2="65" stroke="#15803D" stroke-width="2"/>
          <text x="160" y="45" font-size="11" font-weight="bold" fill="#166534">Spines (Thorns)</text>
          <text x="160" y="65" font-size="11" font-weight="bold" fill="#166534">Fleshy Green Stem</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Growing broad thin leaves with thousands of stomata' },
      { key: 'B', text: 'Leaves modified into sharp spines with thick waxy cuticles' },
      { key: 'C', text: 'Shedding roots during rainy seasons' },
      { key: 'D', text: 'Absorbing water through flowers only' }
    ],
    correctAnswer: 'B',
    explanation: 'Cactus leaves are modified into spines (needles) to reduce exposed surface area for transpiration and prevent herbivores from eating moisture-storing stems.'
  },
  {
    id: 'PENY-B-IPA-14',
    number: 14,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Look at the bar magnet interaction. When the North (N) pole of Magnet 1 is brought near Pole X of Magnet 2, they repel each other. What pole is Pole X?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Magnetism', 'Magnetic Pole Interactions', '#2563EB',
        `<g transform="translate(60, 15)">
          <!-- Magnet 1 -->
          <rect x="20" y="30" width="50" height="30" fill="#EF4444"/><text x="45" y="50" font-size="12" font-weight="bold" fill="#FFF" text-anchor="middle">S</text>
          <rect x="70" y="30" width="50" height="30" fill="#3B82F6"/><text x="95" y="50" font-size="12" font-weight="bold" fill="#FFF" text-anchor="middle">N</text>
          
          <text x="140" y="45" font-size="14" font-weight="bold" fill="#DC2626" text-anchor="middle">◀ REPEL ▶</text>
          
          <!-- Magnet 2 -->
          <rect x="160" y="30" width="50" height="30" fill="#3B82F6"/><text x="185" y="50" font-size="12" font-weight="bold" fill="#FFF" text-anchor="middle">X (?)</text>
          <rect x="210" y="30" width="50" height="30" fill="#EF4444"/><text x="235" y="50" font-size="12" font-weight="bold" fill="#FFF" text-anchor="middle">S</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'South (S) Pole' },
      { key: 'B', text: 'North (N) Pole' },
      { key: 'C', text: 'Neutral pole without charge' },
      { key: 'D', text: 'East pole' }
    ],
    correctAnswer: 'B',
    explanation: 'Like poles repel and opposite poles attract. Since the North pole of Magnet 1 repels pole X, pole X must also be a North (N) pole.'
  },
  {
    id: 'PENY-B-IPA-15',
    number: 15,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Which factor will INCREASE the rate of water evaporation from an open pond during a sunny day?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Water Cycle', 'Factors Affecting Evaporation', '#0284C7',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/>
          <text x="140" y="45" font-size="11" font-weight="bold" fill="#0369A1" text-anchor="middle">Key factors: Temperature, Surface Area, Wind speed</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#0284C7" text-anchor="middle">Higher heat & dry wind ➔ faster evaporation</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Decreasing the ambient temperature' },
      { key: 'B', text: 'Increasing the air humidity to 100%' },
      { key: 'C', text: 'Higher surrounding temperature and stronger dry wind blowing' },
      { key: 'D', text: 'Covering the pond surface with dense plastic' }
    ],
    correctAnswer: 'C',
    explanation: 'Higher air temperatures supply more kinetic thermal energy to water molecules, and dry wind carries water vapor away quickly, increasing the rate of evaporation.'
  },

  // --- INTERNATIONAL BACCALAUREATE (IB PYP) (Soal 16 - 20) ---
  {
    id: 'PENY-B-IPA-16',
    number: 16,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'An environmental inquiry team constructs a low-cost DIY water filtration column. Which sequential arrangement of layers from top to bottom provides the most effective physical filtration?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Water Filtration Inquiry', 'Sequential Water Filter Layers', '#0284C7',
        `<g transform="translate(70, 10)">
          <rect x="40" y="10" width="160" height="85" fill="#F8FAFC" stroke="#334155" stroke-width="2"/>
          <rect x="42" y="12" width="156" height="20" fill="#CBD5E1"/><text x="120" y="26" font-size="9" font-weight="bold" text-anchor="middle">Coarse Gravel / Pebbles</text>
          <rect x="42" y="33" width="156" height="20" fill="#FED7AA"/><text x="120" y="47" font-size="9" font-weight="bold" text-anchor="middle">Coarse & Fine Sand</text>
          <rect x="42" y="54" width="156" height="20" fill="#475569"/><text x="120" y="68" font-size="9" font-weight="bold" fill="#FFF" text-anchor="middle">Activated Charcoal</text>
          <rect x="42" y="75" width="156" height="18" fill="#FFFFFF"/><text x="120" y="88" font-size="9" font-weight="bold" text-anchor="middle">Cotton / Filter Paper</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Cotton -> Charcoal -> Sand -> Gravel' },
      { key: 'B', text: 'Gravel/Pebbles -> Sand -> Activated Charcoal -> Cotton' },
      { key: 'C', text: 'Charcoal only throughout the bottle' },
      { key: 'D', text: 'Fine sand -> Gravel -> Open space' }
    ],
    correctAnswer: 'B',
    explanation: 'Filtration works progressively: coarse gravel traps large debris first, sand captures smaller particles, activated charcoal adsorbs chemical impurities and odors, and cotton traps final micro-sediments.'
  },
  {
    id: 'PENY-B-IPA-17',
    number: 17,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Investigate the coral reef food web: If rising sea temperatures cause widespread coral bleaching, which organism group will suffer an immediate loss of primary habitat and nursery shelter?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Marine Conservation', 'Coral Reef Ecosystem Health', '#0D9488',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#CCFBF1" stroke="#0D9488" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">🪸 🐠 🌊</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#0F766E" text-anchor="middle">Bleached corals lose zooxanthellae algae</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Terrestrial mountain goats' },
      { key: 'B', text: 'Small reef fish, crustaceans, and juvenile sea creatures' },
      { key: 'C', text: 'Desert lizards' },
      { key: 'D', text: 'Deep-trench hydrothermal vent bacteria' }
    ],
    correctAnswer: 'B',
    explanation: 'Coral reefs serve as nurseries and protective habitats for more than 25% of all marine species, particularly juvenile reef fishes and crustaceans.'
  },
  {
    id: 'PENY-B-IPA-18',
    number: 18,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'In a fair test investigation on soil permeability, equal amounts of water are poured through Sandy Soil, Clay Soil, and Loam Soil. Which soil allows water to drain through most rapidly?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Soil Science Inquiry', 'Soil Permeability Comparison', '#B45309',
        `<g transform="translate(60, 15)">
          <rect x="15" y="20" width="75" height="60" rx="6" fill="#FEF3C7" stroke="#B45309"/>
          <text x="52" y="45" font-size="10" font-weight="bold" text-anchor="middle">Sandy Soil</text>
          <text x="52" y="65" font-size="9" text-anchor="middle">Fastest drain ⏱️</text>
          
          <rect x="100" y="20" width="75" height="60" rx="6" fill="#FED7AA" stroke="#EA580C"/>
          <text x="137" y="45" font-size="10" font-weight="bold" text-anchor="middle">Loam Soil</text>
          <text x="137" y="65" font-size="9" text-anchor="middle">Balanced</text>
          
          <rect x="185" y="20" width="75" height="60" rx="6" fill="#FDBA74" stroke="#C2410C"/>
          <text x="222" y="45" font-size="10" font-weight="bold" text-anchor="middle">Clay Soil</text>
          <text x="222" y="65" font-size="9" text-anchor="middle">Slowest drain</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Clay soil because of its tiny microscopic particles' },
      { key: 'B', text: 'Sandy soil because of its large particles and large pore spaces' },
      { key: 'C', text: 'Peat soil stored in sealed containers' },
      { key: 'D', text: 'All soils drain at identical speeds' }
    ],
    correctAnswer: 'B',
    explanation: 'Sandy soil consists of large particles loosely packed together, creating large interconnected air spaces (pores) that allow water to drain through quickly.'
  },
  {
    id: 'PENY-B-IPA-19',
    number: 19,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Investigate microplastics in ocean food chains: What biological phenomenon occurs when non-biodegradable toxins accumulate in higher concentrations at top trophic levels?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Eco-Toxicity Inquiry', 'Biomagnification Pyramid', '#DC2626',
        `<g transform="translate(60, 15)">
          <polygon points="140,15 50,85 230,85" fill="#FEE2E2" stroke="#DC2626" stroke-width="2"/>
          <text x="140" y="38" font-size="9" font-weight="bold" fill="#991B1B" text-anchor="middle">Apex Predator (High Toxins)</text>
          <text x="140" y="58" font-size="9" font-weight="bold" fill="#B91C1C" text-anchor="middle">Medium Fish</text>
          <text x="140" y="78" font-size="9" font-weight="bold" fill="#DC2626" text-anchor="middle">Zooplankton (Microplastics)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Biomagnification / Bioakumulasi' },
      { key: 'B', text: 'Eutrophication' },
      { key: 'C', text: 'Fermentation' },
      { key: 'D', text: 'Thermal condensation' }
    ],
    correctAnswer: 'A',
    explanation: 'Biomagnification refers to the increasing concentration of persistent toxic substances (like heavy metals or microplastic chemicals) in the tissues of organisms at higher levels of a food chain.'
  },
  {
    id: 'PENY-B-IPA-20',
    number: 20,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'A sustainable city development plans to replace fossil fuels with wind energy turbines. What is the fundamental energy conversion that occurs inside a wind turbine generator?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Renewable Energy', 'Wind Turbine Generator Energy Flow', '#059669',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#ECFDF5" stroke="#059669" stroke-width="2"/>
          <text x="140" y="45" font-size="12" font-weight="bold" fill="#065F46" text-anchor="middle">Wind kinetic energy ➔ Generator rotation</text>
          <text x="140" y="68" font-size="12" font-weight="bold" fill="#047857" text-anchor="middle">Mechanical / Kinetic Energy ➔ Electrical Energy ⚡</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Chemical energy to nuclear energy' },
      { key: 'B', text: 'Kinetic (mechanical) energy of moving wind to electrical energy' },
      { key: 'C', text: 'Light energy to sound energy' },
      { key: 'D', text: 'Thermal heat energy to gravitational potential energy' }
    ],
    correctAnswer: 'B',
    explanation: 'Wind turbines capture the kinetic energy of moving air masses with aerodynamic rotor blades, driving an electrical generator to produce usable electrical energy.'
  }
];
