import { QuestionItem } from './cbtQuestionTypes';
import { createPenyisihanSvg } from './simulasiSvgIllustrations';

// SOAL RESMI BABAK PENYISIHAN: MATEMATIKA SMP/MTs (Kategori C)
// 20 Soal Pilihan Ganda Kurikulum Campuran (Merdeka, Cambridge, Singapore, IB)
// Tingkat Kesulitan: Menengah | 100% Bergambar & Unik

export const PENYISIHAN_C_MATEMATIKA: QuestionItem[] = [
  // --- KURIKULUM MERDEKA (Soal 1 - 5) ---
  {
    id: 'PENY-C-MAT-01',
    number: 1,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Sebuah tiang bendera setinggi 12 meter ditopang oleh seutas kawat baja yang dipatok ke tanah pada jarak 9 meter dari pangkal tiang. Berapakah panjang minimal kawat baja tersebut?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Teorema Pythagoras', 'Aplikasi Segitiga Siku-Siku', '#2563EB',
        `<g transform="translate(60, 15)">
          <!-- Tiang vertikal -->
          <line x1="80" y1="20" x2="80" y2="85" stroke="#1E293B" stroke-width="4"/>
          <!-- Tanah horizontal -->
          <line x1="80" y1="85" x2="200" y2="85" stroke="#64748B" stroke-width="3"/>
          <!-- Kawat miring -->
          <line x1="80" y1="20" x2="200" y2="85" stroke="#2563EB" stroke-width="3" stroke-dasharray="4"/>
          <!-- Siku-siku -->
          <rect x="80" y="75" width="10" height="10" fill="none" stroke="#1E293B"/>
          <text x="65" y="55" font-size="11" font-weight="bold" fill="#1E293B">a = 12 m</text>
          <text x="140" y="98" font-size="11" font-weight="bold" fill="#64748B" text-anchor="middle">b = 9 m</text>
          <text x="155" y="45" font-size="12" font-weight="bold" fill="#2563EB">c = ?</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '13 meter' },
      { key: 'B', text: '14 meter' },
      { key: 'C', text: '15 meter' },
      { key: 'D', text: '16 meter' }
    ],
    correctAnswer: 'C',
    explanation: 'Berdasarkan Teorema Pythagoras: c² = a² + b² = 12² + 9² = 144 + 81 = 225. Maka panjang kawat c = √225 = 15 meter.'
  },
  {
    id: 'PENY-C-MAT-02',
    number: 2,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Tentukan himpunan penyelesaian dari Sistem Persamaan Linear Dua Variabel (SPLDV) berikut:\n2x + y = 13\nx - y = 2',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · SPLDV', 'Metode Eliminasi & Substitusi', '#7C3AED',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/>
          <text x="140" y="42" font-size="13" font-weight="bold" fill="#6D28D9" text-anchor="middle">Persamaan (1): 2x + y = 13</text>
          <text x="140" y="65" font-size="13" font-weight="bold" fill="#5B21B6" text-anchor="middle">Persamaan (2): x - y = 2</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'x = 4 dan y = 5' },
      { key: 'B', text: 'x = 5 dan y = 3' },
      { key: 'C', text: 'x = 6 dan y = 1' },
      { key: 'D', text: 'x = 7 dan y = -1' }
    ],
    correctAnswer: 'B',
    explanation: 'Jumlahkan kedua persamaan: (2x + y) + (x - y) = 13 + 2 => 3x = 15 => x = 5. Substitusikan x = 5 ke pers (2): 5 - y = 2 => y = 3. Jadi (x, y) = (5, 3).'
  },
  {
    id: 'PENY-C-MAT-03',
    number: 3,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Suatu barisan aritmetika memiliki suku ke-3 (U₃) = 11 dan suku ke-7 (U₇) = 23. Berapakah suku ke-15 (U₁₅) dari barisan tersebut?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Barisan Aritmetika', 'Rumus Suku ke-n Barisan', '#D97706',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FFFBEB" stroke="#D97706" stroke-width="1.5"/>
          <text x="140" y="42" font-size="12" font-weight="bold" fill="#B45309" text-anchor="middle">U₃ = a + 2b = 11</text>
          <text x="140" y="65" font-size="12" font-weight="bold" fill="#92400E" text-anchor="middle">U₇ = a + 6b = 23 ➔ U₁₅ = ?</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '43' },
      { key: 'B', text: '45' },
      { key: 'C', text: '47' },
      { key: 'D', text: '49' }
    ],
    correctAnswer: 'C',
    explanation: 'Beda b = (U₇ - U₃) / (7 - 3) = (23 - 11) / 4 = 12 / 4 = 3. Suku pertama a = 11 - 2(3) = 5. U₁₅ = a + 14b = 5 + 14(3) = 5 + 42 = 47.'
  },
  {
    id: 'PENY-C-MAT-04',
    number: 4,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Sebuah fungsi kuadrat memiliki persamaan f(x) = x² - 6x + 5. Koordinat titik puncak (titik balik minimum) dari grafik parabola tersebut adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Fungsi Kuadrat', 'Titik Puncak Parabola', '#059669',
        `<g transform="translate(60, 15)">
          <path d="M 40 20 Q 140 85 240 20" fill="none" stroke="#059669" stroke-width="2.5"/>
          <circle cx="140" cy="85" r="5" fill="#047857"/>
          <text x="140" y="102" font-size="11" font-weight="bold" fill="#065F46" text-anchor="middle">Titik Puncak (xp, yp) = ?</text>
          <text x="140" y="40" font-size="11" font-weight="bold" fill="#15803D" text-anchor="middle">f(x) = x² - 6x + 5</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '(3, -4)' },
      { key: 'B', text: '(3, 4)' },
      { key: 'C', text: '(-3, -4)' },
      { key: 'D', text: '(2, -3)' }
    ],
    correctAnswer: 'A',
    explanation: 'Sumbu simetri xp = -b / (2a) = -(-6) / (2 × 1) = 3. Nilai minimum yp = f(3) = 3² - 6(3) + 5 = 9 - 18 + 5 = -4. Titik puncak adalah (3, -4).'
  },
  {
    id: 'PENY-C-MAT-05',
    number: 5,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Diberikan data nilai ujian matematika 9 orang siswa: 5, 6, 7, 7, 8, 8, 8, 9, 10. Nilai jangkauan interkuartil (Q₃ - Q₁) dari data tersebut adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Statistika', 'Kuartil & Jangkauan Interkuartil', '#EA580C',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FFF7ED" stroke="#EA580C" stroke-width="1.5"/>
          <text x="140" y="42" font-size="12" font-weight="bold" fill="#C2410C" text-anchor="middle">Data: 5, 6, 7, 7, [8], 8, 8, 9, 10</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#9A3412" text-anchor="middle">Q₁ = 6,5 | Q₂ = 8 | Q₃ = 8,5</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '1,5' },
      { key: 'B', text: '2,0' },
      { key: 'C', text: '2,5' },
      { key: 'D', text: '3,0' }
    ],
    correctAnswer: 'B',
    explanation: 'Kuartil bawah Q₁ = (6 + 7)/2 = 6,5. Kuartil atas Q₃ = (8 + 9)/2 = 8,5. Jangkauan interkuartil (IQR) = Q₃ - Q₁ = 8,5 - 6,5 = 2,0.'
  },

  // --- CAMBRIDGE LOWER SECONDARY (Soal 6 - 10) ---
  {
    id: 'PENY-C-MAT-06',
    number: 6,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Factorise the quadratic expression completely: 2x² + 7x + 3. Which of the following is the correct factorization?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Algebra', 'Quadratic Factorisation', '#4F46E5',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#EEF2FF" stroke="#4F46E5" stroke-width="1.5"/>
          <text x="140" y="45" font-size="14" font-weight="bold" fill="#3730A3" text-anchor="middle">2x² + 7x + 3 = (2x + p)(x + q)</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#4F46E5" text-anchor="middle">Find p and q such that p × q = 3 and 2q + p = 7</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '(2x + 1)(x + 3)' },
      { key: 'B', text: '(2x + 3)(x + 1)' },
      { key: 'C', text: '(2x - 1)(x - 3)' },
      { key: 'D', text: '(x + 1)(x + 6)' }
    ],
    correctAnswer: 'A',
    explanation: 'Expanding (2x + 1)(x + 3) = 2x² + 6x + x + 3 = 2x² + 7x + 3. Thus, option A is correct.'
  },
  {
    id: 'PENY-C-MAT-07',
    number: 7,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'In the circle diagram below with center O and radius 14 cm, the angle subtended at the center by arc AB is 90°. What is the area of sector AOB? (Use π = 22/7)',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Circle Theorems', 'Area of a Sector', '#0D9488',
        `<g transform="translate(60, 15)">
          <circle cx="90" cy="50" r="35" fill="#F0FDFA" stroke="#0D9488" stroke-width="2"/>
          <path d="M 90 50 L 90 15 A 35 35 0 0 1 125 50 Z" fill="#99F6E4" stroke="#0D9488"/>
          <text x="105" y="42" font-size="10" font-weight="bold" fill="#0F766E">90°</text>
          
          <rect x="150" y="25" width="110" height="50" rx="8" fill="#CCFBF1" stroke="#0D9488" stroke-width="1.5"/>
          <text x="205" y="45" font-size="11" font-weight="bold" fill="#0F766E" text-anchor="middle">r = 14 cm</text>
          <text x="205" y="62" font-size="10" font-weight="bold" fill="#115E59" text-anchor="middle">θ = 90° (1/4 circle)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '77 cm²' },
      { key: 'B', text: '154 cm²' },
      { key: 'C', text: '308 cm²' },
      { key: 'D', text: '616 cm²' }
    ],
    correctAnswer: 'B',
    explanation: 'Total circle area = π × r² = 22/7 × 14 × 14 = 616 cm². Sector area (90° / 360° = 1/4) = 1/4 × 616 = 154 cm².'
  },
  {
    id: 'PENY-C-MAT-08',
    number: 8,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Solve the linear inequality for integer values of x: 3x - 5 < 2x + 3. What is the greatest integer value of x that satisfies this inequality?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Inequalities', 'Linear Inequality on Number Line', '#DC2626',
        `<g transform="translate(60, 15)">
          <line x1="20" y1="50" x2="260" y2="50" stroke="#64748B" stroke-width="2"/>
          <circle cx="180" cy="50" r="5" fill="#FFFFFF" stroke="#DC2626" stroke-width="2"/>
          <line x1="175" y1="50" x2="30" y2="50" stroke="#DC2626" stroke-width="3"/>
          <text x="180" y="75" font-size="11" font-weight="bold" fill="#DC2626" text-anchor="middle">8 (open circle)</text>
          <text x="100" y="40" font-size="11" font-weight="bold" fill="#DC2626">x < 8</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '6' },
      { key: 'B', text: '7' },
      { key: 'C', text: '8' },
      { key: 'D', text: '9' }
    ],
    correctAnswer: 'B',
    explanation: 'Subtracting 2x from both sides gives x - 5 < 3. Adding 5 gives x < 8. The largest integer strictly less than 8 is 7.'
  },
  {
    id: 'PENY-C-MAT-09',
    number: 9,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'A bag contains 5 red balls and 3 green balls. Two balls are drawn one after another WITHOUT replacement. What is the probability that both balls drawn are Red?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Probability Tree', 'Dependent Probability Without Replacement', '#B45309',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FEF3C7" stroke="#B45309" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#92400E" text-anchor="middle">1st draw: P(R₁) = 5/8</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#78350F" text-anchor="middle">2nd draw: P(R₂ | R₁) = 4/7 ➔ P(Both) = 5/8 × 4/7</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '5/14' },
      { key: 'B', text: '15/56' },
      { key: 'C', text: '25/64' },
      { key: 'D', text: '1/2' }
    ],
    correctAnswer: 'A',
    explanation: 'Probability of first red ball = 5/8. After one red is removed, 4 red remain out of 7 total balls. P(both red) = 5/8 × 4/7 = 20/56 = 5/14.'
  },
  {
    id: 'PENY-C-MAT-10',
    number: 10,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Look at the parallel lines cut by a transversal. If angle ∠1 = 3x + 10° and alternate interior angle ∠2 = 5x - 30°, what is the value of x?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Geometry Angles', 'Alternate Interior Angles', '#059669',
        `<g transform="translate(60, 15)">
          <line x1="20" y1="30" x2="260" y2="30" stroke="#059669" stroke-width="2"/>
          <line x1="20" y1="75" x2="260" y2="75" stroke="#059669" stroke-width="2"/>
          <line x1="60" y1="90" x2="220" y2="15" stroke="#1E293B" stroke-width="2.5"/>
          <text x="110" y="45" font-size="10" font-weight="bold" fill="#065F46">∠1 = 3x+10°</text>
          <text x="170" y="70" font-size="10" font-weight="bold" fill="#065F46">∠2 = 5x-30°</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '15°' },
      { key: 'B', text: '20°' },
      { key: 'C', text: '25°' },
      { key: 'D', text: '30°' }
    ],
    correctAnswer: 'B',
    explanation: 'Alternate interior angles between parallel lines are equal: 3x + 10 = 5x - 30 => 2x = 40 => x = 20°.'
  },

  // --- SINGAPORE LOWER SECONDARY (Soal 11 - 15) ---
  {
    id: 'PENY-C-MAT-11',
    number: 11,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Find the gradient (slope) of the straight line passing through points A(2, 5) and B(6, 17) in the Cartesian plane.',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Coordinate Geometry', 'Gradient of a Straight Line', '#2563EB',
        `<g transform="translate(60, 15)">
          <line x1="30" y1="80" x2="250" y2="80" stroke="#94A3B8" stroke-width="2"/>
          <line x1="30" y1="80" x2="30" y2="10" stroke="#94A3B8" stroke-width="2"/>
          <line x1="50" y1="70" x2="220" y2="20" stroke="#2563EB" stroke-width="3"/>
          <circle cx="50" cy="70" r="4" fill="#1E40AF"/>
          <text x="65" y="78" font-size="10" font-weight="bold" fill="#1E40AF">A(2, 5)</text>
          <circle cx="220" cy="20" r="4" fill="#1E40AF"/>
          <text x="200" y="15" font-size="10" font-weight="bold" fill="#1E40AF">B(6, 17)</text>
          <text x="140" y="55" font-size="11" font-weight="bold" fill="#2563EB">m = (y₂ - y₁) / (x₂ - x₁)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'm = 2' },
      { key: 'B', text: 'm = 3' },
      { key: 'C', text: 'm = 4' },
      { key: 'D', text: 'm = 5' }
    ],
    correctAnswer: 'B',
    explanation: 'Gradient m = (y₂ - y₁) / (x₂ - x₁) = (17 - 5) / (6 - 2) = 12 / 4 = 3.'
  },
  {
    id: 'PENY-C-MAT-12',
    number: 12,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'A solid metal cylinder has base radius r = 7 cm and height h = 10 cm. Find the total volume of the cylinder. (Use π = 22/7)',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Mensuration', 'Volume of a Cylinder', '#0284C7',
        `<g transform="translate(80, 15)">
          <ellipse cx="80" cy="25" rx="35" ry="12" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
          <line x1="45" y1="25" x2="45" y2="75" stroke="#0284C7" stroke-width="2"/>
          <line x1="115" y1="25" x2="115" y2="75" stroke="#0284C7" stroke-width="2"/>
          <ellipse cx="80" cy="75" rx="35" ry="12" fill="#BAE6FD" stroke="#0284C7" stroke-width="2"/>
          <text x="160" y="45" font-size="11" font-weight="bold" fill="#0369A1">r = 7 cm</text>
          <text x="160" y="65" font-size="11" font-weight="bold" fill="#0369A1">h = 10 cm</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '770 cm³' },
      { key: 'B', text: '1.440 cm³' },
      { key: 'C', text: '1.540 cm³' },
      { key: 'D', text: '2.156 cm³' }
    ],
    correctAnswer: 'C',
    explanation: 'Volume = π × r² × h = (22/7) × 7 × 7 × 10 = 22 × 7 × 10 = 1.540 cm³.'
  },
  {
    id: 'PENY-C-MAT-13',
    number: 13,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'It takes 6 construction workers 12 days to complete a pavilion project. Assuming all workers work at the same constant rate, how many days would it take 9 workers to complete the same project?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Inverse Proportion', 'Worker-Day Inverse Proportion', '#D97706',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
          <text x="140" y="42" font-size="12" font-weight="bold" fill="#B45309" text-anchor="middle">Total Work = 6 workers × 12 days = 72 man-days</text>
          <text x="140" y="65" font-size="12" font-weight="bold" fill="#92400E" text-anchor="middle">Days with 9 workers = 72 / 9 = ?</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '6 hari' },
      { key: 'B', text: '8 hari' },
      { key: 'C', text: '9 hari' },
      { key: 'D', text: '10 hari' }
    ],
    correctAnswer: 'B',
    explanation: 'Number of workers is inversely proportional to time: Total man-days = 6 × 12 = 72. With 9 workers: Time = 72 / 9 = 8 days.'
  },
  {
    id: 'PENY-C-MAT-14',
    number: 14,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Calculate the value of (4 × 10⁵) × (2.5 × 10⁻²) and express the final result in standard scientific form (a × 10ⁿ).',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Standard Form', 'Scientific Notation Calculation', '#9333EA',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5"/>
          <text x="140" y="42" font-size="12" font-weight="bold" fill="#6B21A8" text-anchor="middle">(4 × 2.5) × (10⁵ × 10⁻²)</text>
          <text x="140" y="65" font-size="12" font-weight="bold" fill="#7E22CE" text-anchor="middle">= 10 × 10³ = 1.0 × 10⁴</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '1.0 × 10³' },
      { key: 'B', text: '1.0 × 10⁴' },
      { key: 'C', text: '1.0 × 10⁵' },
      { key: 'D', text: '10 × 10³' }
    ],
    correctAnswer: 'B',
    explanation: '(4 × 2.5) = 10. (10⁵ × 10⁻²) = 10³. 10 × 10³ = 10⁴ = 1.0 × 10⁴ in proper scientific notation (where 1 ≤ a < 10).'
  },
  {
    id: 'PENY-C-MAT-15',
    number: 15,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'The sum of interior angles of an n-sided regular polygon is given by (n - 2) × 180°. What is the size of each interior angle in a regular octagon (8-sided polygon)?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Polygons', 'Regular Octagon Interior Angle', '#10B981',
        `<g transform="translate(60, 15)">
          <polygon points="100,20 140,20 170,50 170,80 140,105 100,105 70,80 70,50" fill="#ECFDF5" stroke="#10B981" stroke-width="2"/>
          <text x="120" y="65" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">n = 8 sides</text>
          <text x="210" y="55" font-size="11" font-weight="bold" fill="#065F46">Sum = (8-2)×180°</text>
          <text x="210" y="75" font-size="11" font-weight="bold" fill="#065F46">Each = Sum / 8</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '120°' },
      { key: 'B', text: '135°' },
      { key: 'C', text: '140°' },
      { key: 'D', text: '144°' }
    ],
    correctAnswer: 'B',
    explanation: 'Sum of interior angles = (8 - 2) × 180° = 6 × 180° = 1.080°. Since all 8 interior angles are equal: 1.080° / 8 = 135°.'
  },

  // --- INTERNATIONAL BACCALAUREATE (IB MYP) (Soal 16 - 20) ---
  {
    id: 'PENY-C-MAT-16',
    number: 16,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'An inquiry student models a compound interest investment: Rp 10.000.000 is invested in a green energy fund at 10% annual compound interest for 2 years. What is the total accumulated value at maturity?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Financial Inquiry', 'Annual Compound Interest Model', '#15803D',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#F0FDF4" stroke="#15803D" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#166534" text-anchor="middle">A = P(1 + r)ⁿ</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#15803D" text-anchor="middle">A = 10.000.000 × (1.10)²</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Rp 11.000.000' },
      { key: 'B', text: 'Rp 12.000.000' },
      { key: 'C', text: 'Rp 12.100.000' },
      { key: 'D', text: 'Rp 12.210.000' }
    ],
    correctAnswer: 'C',
    explanation: 'A = P × (1 + r)² = Rp 10.000.000 × (1,1)² = Rp 10.000.000 × 1,21 = Rp 12.100.000.'
  },
  {
    id: 'PENY-C-MAT-17',
    number: 17,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'In right-angled triangle ABC with right angle at C, side AC = 8 cm and side BC = 6 cm. What is the value of sin ∠B?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Trigonometry', 'Trigonometric Ratios (sin = opp/hyp)', '#6366F1',
        `<g transform="translate(70, 15)">
          <polygon points="40,80 180,80 40,20" fill="#EEF2FF" stroke="#4F46E5" stroke-width="2"/>
          <text x="30" y="85" font-size="10" font-weight="bold">C(90°)</text>
          <text x="185" y="85" font-size="10" font-weight="bold">B</text>
          <text x="30" y="18" font-size="10" font-weight="bold">A</text>
          <text x="25" y="50" font-size="10" font-weight="bold" fill="#4F46E5">8</text>
          <text x="110" y="95" font-size="10" font-weight="bold" fill="#4F46E5">6</text>
          <text x="120" y="45" font-size="10" font-weight="bold" fill="#4F46E5">AB = 10</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '3/5 atau 0,6' },
      { key: 'B', text: '4/5 atau 0,8' },
      { key: 'C', text: '3/4 atau 0,75' },
      { key: 'D', text: '4/3' }
    ],
    correctAnswer: 'B',
    explanation: 'Hypotenuse AB = √(8² + 6²) = √(64 + 36) = 10 cm. For angle ∠B, opposite side is AC = 8 cm. Thus sin ∠B = opposite / hypotenuse = 8 / 10 = 4/5 = 0,8.'
  },
  {
    id: 'PENY-C-MAT-18',
    number: 18,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Investigate the Box-and-Whisker plot showing test results across two school branches. Which branch demonstrated a smaller spread (Interquartile Range) in student performances?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Statistical Modeling', 'Box-and-Whisker Plot Comparison', '#0D9488',
        `<g transform="translate(60, 15)">
          <!-- Branch A: box from 60 to 80 -->
          <text x="20" y="38" font-size="10" font-weight="bold" fill="#0D9488">Branch A</text>
          <line x1="80" y1="35" x2="220" y2="35" stroke="#0D9488"/>
          <rect x="110" y="25" width="50" height="20" fill="#CCFBF1" stroke="#0D9488"/>
          <line x1="135" y1="25" x2="135" y2="45" stroke="#0D9488" stroke-width="2"/>
          
          <!-- Branch B: box from 50 to 90 -->
          <text x="20" y="78" font-size="10" font-weight="bold" fill="#DC2626">Branch B</text>
          <line x1="80" y1="75" x2="220" y2="75" stroke="#DC2626"/>
          <rect x="95" y="65" width="85" height="20" fill="#FEE2E2" stroke="#DC2626"/>
          <line x1="140" y1="65" x2="140" y2="85" stroke="#DC2626" stroke-width="2"/>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Branch A with a narrower box width (smaller IQR)' },
      { key: 'B', text: 'Branch B with a wider box width' },
      { key: 'C', text: 'Both branches have identical distributions' },
      { key: 'D', text: 'The plot provides insufficient data to measure spread' }
    ],
    correctAnswer: 'A',
    explanation: 'The length of the box represents the Interquartile Range (IQR = Q₃ - Q₁). A narrower box (Branch A) indicates less variability and more consistent student scores.'
  },
  {
    id: 'PENY-C-MAT-19',
    number: 19,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'An environmental design challenge requires packing organic juice bottles into a cuboid box with dimensions 30 cm × 20 cm × 15 cm. What is the total outer surface area of this packaging box?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Packaging Design', 'Surface Area of a Cuboid', '#EA580C',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FFF7ED" stroke="#EA580C" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#C2410C" text-anchor="middle">Dimensions: L = 30 cm, W = 20 cm, H = 15 cm</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#9A3412" text-anchor="middle">Surface Area = 2 × (LW + LH + WH)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '2.400 cm²' },
      { key: 'B', text: '2.700 cm²' },
      { key: 'C', text: '3.000 cm²' },
      { key: 'D', text: '3.200 cm²' }
    ],
    correctAnswer: 'B',
    explanation: 'Surface Area = 2 × (30×20 + 30×15 + 20×15) = 2 × (600 + 450 + 300) = 2 × 1.350 = 2.700 cm².'
  },
  {
    id: 'PENY-C-MAT-20',
    number: 20,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'In a modular clock arithmetic investigation, what is the value of (17 + 25) mod 12?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Modular Arithmetic', 'Clock Arithmetic (Mod 12)', '#7C3AED',
        `<g transform="translate(80, 15)">
          <circle cx="80" cy="50" r="32" fill="#F5F3FF" stroke="#7C3AED" stroke-width="2"/>
          <text x="80" y="28" font-size="9" font-weight="bold" text-anchor="middle">12</text>
          <text x="105" y="53" font-size="9" font-weight="bold" text-anchor="middle">3</text>
          <text x="80" y="78" font-size="9" font-weight="bold" text-anchor="middle">6</text>
          <text x="55" y="53" font-size="9" font-weight="bold" text-anchor="middle">9</text>
          <text x="175" y="53" font-size="12" font-weight="bold" fill="#5B21B6">(42 ÷ 12) remainder ?</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '4' },
      { key: 'B', text: '5' },
      { key: 'C', text: '6' },
      { key: 'D', text: '8' }
    ],
    correctAnswer: 'C',
    explanation: '17 + 25 = 42. Dividing 42 by 12 yields 3 with a remainder of 6 (3 × 12 + 6 = 42). Thus 42 mod 12 = 6.'
  }
];
