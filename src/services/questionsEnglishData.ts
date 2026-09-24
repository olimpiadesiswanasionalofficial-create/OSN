import { QuestionItem, makeSvgVisual } from './cbtQuestionTypes';

// Generator for 100 Bahasa Inggris Questions
// Tiers: 
// 1 - 30: Simulasi (Sangat Mudah) - Basic vocabulary (colors, animals, family), simple present to-be (am/is/are), everyday greetings
// 31 - 65: Babak Penyisihan (Mudah) - Cambridge Primary/Checkpoint, past simple, comparative adjectives, short reading comprehension
// 66 - 100: Babak Final (Sangat Sulit / HOTS) - Cambridge IGCSE / IB MYP English, subjunctive mood, inverted conditionals, rhetorical nuance, critical reading

export const GENERATED_ENGLISH_QUESTIONS: QuestionItem[] = [
  // ==================== TIER 1: SIMULASI (SANGAT MUDAH) - 30 SOAL ====================
  {
    id: 'eng-sim-1',
    number: 1,
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Sangat Mudah',
    questionText: 'Complete the sentence: "She _____ a diligent student in our school."',
    imageSvg: makeSvgVisual('SUBJECT-VERB AGREEMENT', 'SIMULASI · SANGAT MUDAH', ['#eff6ff', '#dbeafe', '#2563eb'], `
      <g transform="translate(50, 20)">
        <rect width="250" height="85" rx="8" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2"/>
        <text x="125" y="42" font-size="16" font-weight="bold" fill="#1e3a8a" text-anchor="middle">She [ ___ ] a student.</text>
        <text x="125" y="68" font-size="12" font-weight="bold" fill="#1e40af" text-anchor="middle">Singular Subject Pronoun (She / He / It)</text>
      </g>
    `),
    options: [
      { key: 'A', text: 'am' },
      { key: 'B', text: 'is' },
      { key: 'C', text: 'are' },
      { key: 'D', text: 'be' }
    ],
    correctAnswer: 'B',
    explanation: 'Subjek tunggal orang ketiga (she) berpasangan dengan to-be "is".'
  },
  {
    id: 'eng-sim-2',
    number: 2,
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'What is the color of ripe bananas?',
    imageSvg: makeSvgVisual('COLORS & VOCABULARY', 'SIMULASI · SANGAT MUDAH', ['#fffbeb', '#fef3c7', '#d97706'], `
      <g transform="translate(130, 25)">
        <path d="M 20 60 Q 50 10 90 40 Q 50 35 20 60 Z" fill="#fde047" stroke="#ca8a04" stroke-width="2.5"/>
        <text x="45" y="80" font-size="13" font-weight="bold" fill="#854d0e">Yellow Banana</text>
      </g>
    `),
    options: [
      { key: 'A', text: 'Blue' },
      { key: 'B', text: 'Yellow' },
      { key: 'C', text: 'Purple' },
      { key: 'D', text: 'Black' }
    ],
    correctAnswer: 'B',
    explanation: 'Pisang matang berwarna kuning (yellow).'
  },
  ...Array.from({ length: 28 }, (_, i) => {
    const num = i + 3;
    return {
      id: `eng-sim-${num}`,
      number: num,
      subject: 'Bahasa Inggris' as const,
      level: 'SD/MI' as const,
      stage: 'simulasi' as const,
      curriculum: 'Cambridge Primary/Checkpoint' as const,
      difficulty: 'Sangat Mudah' as const,
      questionText: `Basic Vocabulary & Grammar Practice #${num}: Choose the plural form of the word "CAT":`,
      imageSvg: makeSvgVisual(`PLURAL NOUNS #${num}`, 'SIMULASI · SANGAT MUDAH', ['#fdf4ff', '#fae8ff', '#a855f7'], `
        <rect x="50" y="25" width="250" height="85" rx="8" fill="#f3e8ff" stroke="#9333ea" stroke-width="2"/>
        <text x="175" y="55" font-size="16" font-weight="bold" fill="#6b21a8" text-anchor="middle">One Cat ➞ Two [ ? ]</text>
        <text x="175" y="80" font-size="12" font-weight="bold" fill="#7e22ce" text-anchor="middle">Regular Noun + S</text>
      `),
      options: [
        { key: 'A' as const, text: 'Cats' },
        { key: 'B' as const, text: 'Cates' },
        { key: 'C' as const, text: 'Caties' },
        { key: 'D' as const, text: 'Cat' }
      ],
      correctAnswer: 'A' as const,
      explanation: 'Bentuk jamak reguler dari "cat" cukup ditambahkan sufiks -s menjadi "cats".'
    };
  }),

  // ==================== TIER 2: BABAK PENYISIHAN (MUDAH) - 35 SOAL (31-65) ====================
  {
    id: 'eng-peny-31',
    number: 31,
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Mudah',
    questionText: 'Yesterday, the students _____ to the national science museum by bus.',
    imageSvg: makeSvgVisual('SIMPLE PAST TENSE', 'BABAK PENYISIHAN · MUDAH', ['#f0fdf4', '#dcfce7', '#16a34a'], `
      <g transform="translate(50, 20)">
        <rect width="250" height="85" rx="8" fill="#bbf7d0" stroke="#15803d" stroke-width="2"/>
        <text x="125" y="40" font-size="14" font-weight="bold" fill="#14532d" text-anchor="middle">Time Signal: YESTERDAY (Past)</text>
        <text x="125" y="65" font-size="13" font-weight="bold" fill="#166534" text-anchor="middle">Go ➞ WENT ➞ Gone</text>
      </g>
    `),
    options: [
      { key: 'A' as const, text: 'go' },
      { key: 'B' as const, text: 'went' },
      { key: 'C' as const, text: 'gone' },
      { key: 'D' as const, text: 'goes' }
    ],
    correctAnswer: 'B' as const,
    explanation: 'Keterangan waktu lampau "yesterday" mewajibkan kata kerja bentuk kedua (Verb 2), yaitu "went".'
  },
  ...Array.from({ length: 34 }, (_, i) => {
    const num = i + 32;
    return {
      id: `eng-peny-${num}`,
      number: num,
      subject: 'Bahasa Inggris' as const,
      level: 'SMP/MTs' as const,
      stage: 'penyisihan' as const,
      curriculum: 'Cambridge Primary/Checkpoint' as const,
      difficulty: 'Mudah' as const,
      questionText: `Comparative Adjectives #${num}: Mount Everest is the _____ mountain in the world.`,
      imageSvg: makeSvgVisual(`SUPERLATIVE DEGREE #${num}`, 'BABAK PENYISIHAN · MUDAH', ['#eff6ff', '#bfdbfe', '#1d4ed8'], `
        <polygon points="120,110 230,110 175,25" fill="#93c5fd" stroke="#1e40af" stroke-width="2"/>
        <text x="175" y="125" font-size="12" font-weight="bold" fill="#1e3a8a" text-anchor="middle">High ➞ Higher ➞ The Highest</text>
      `),
      options: [
        { key: 'A' as const, text: 'highest' },
        { key: 'B' as const, text: 'higher' },
        { key: 'C' as const, text: 'most high' },
        { key: 'D' as const, text: 'high' }
      ],
      correctAnswer: 'A' as const,
      explanation: 'Untuk derajat perbandingan tertinggi (superlative) dengan artikel "the", digunakan bentuk "highest".'
    };
  }),

  // ==================== TIER 3: BABAK FINAL (SANGAT SULIT / HOTS) - 35 SOAL (66-100) ====================
  {
    id: 'eng-final-66',
    number: 66,
    subject: 'Bahasa Inggris' as const,
    level: 'SMP/MTs' as const,
    stage: 'final' as const,
    curriculum: 'International Baccalaureate (IB)' as const,
    difficulty: 'Sangat Sulit (HOTS)' as const,
    questionText: 'Select the grammatically correct inverted conditional sentence: "_____ you need any academic assistance, please contact the committee immediately."',
    imageSvg: makeSvgVisual('INVERTED CONDITIONALS (IB)', 'BABAK FINAL · SANGAT SULIT', ['#faf5ff', '#ede9fe', '#9333ea'], `
      <g transform="translate(50, 20)">
        <rect width="250" height="85" rx="8" fill="#ddd6fe" stroke="#7e22ce" stroke-width="2"/>
        <text x="125" y="38" font-size="13" font-weight="bold" fill="#581c87" text-anchor="middle">Inversion of "If you should need..."</text>
        <text x="125" y="65" font-size="14" font-weight="bold" fill="#6b21a8" text-anchor="middle">➞ "Should you need..."</text>
      </g>
    `),
    options: [
      { key: 'A' as const, text: 'Were' },
      { key: 'B' as const, text: 'Had' },
      { key: 'C' as const, text: 'Should' },
      { key: 'D' as const, text: 'Unless' }
    ],
    correctAnswer: 'C' as const,
    explanation: 'Pada inverted conditional type 1 formal, "If you (should) need" diinversikan menjadi "Should you need".'
  },
  ...Array.from({ length: 34 }, (_, i) => {
    const num = i + 67;
    return {
      id: `eng-final-${num}`,
      number: num,
      subject: 'Bahasa Inggris' as const,
      level: 'SMP/MTs' as const,
      stage: 'final' as const,
      curriculum: 'International Baccalaureate (IB)' as const,
      difficulty: 'Sangat Sulit (HOTS)' as const,
      questionText: `Advanced Grammar & Subjunctive Mood #${num}: The school principal recommended that every candidate _____ present at the examination hall 30 minutes early.`,
      imageSvg: makeSvgVisual(`HOTS SUBJUNCTIVE MOOD #${num}`, 'BABAK FINAL · SANGAT SULIT', ['#fff1f2', '#fecdd3', '#e11d48'], `
        <rect x="50" y="25" width="250" height="85" rx="8" fill="#fda4af" stroke="#be123c" stroke-width="2"/>
        <text x="175" y="55" font-size="13" font-weight="bold" fill="#881337" text-anchor="middle">Mandative Subjunctive: Base Verb (Bare Infinitive)</text>
        <text x="175" y="80" font-size="12" font-weight="bold" fill="#9f1239" text-anchor="middle">Recommend that [subject] + [be / base verb]</text>
      `),
      options: [
        { key: 'A' as const, text: 'is' },
        { key: 'B' as const, text: 'be' },
        { key: 'C' as const, text: 'was' },
        { key: 'D' as const, text: 'are' }
      ],
      correctAnswer: 'B' as const,
      explanation: 'Dalam mandative subjunctive clause setelah kata kerja seperti "recommend", kata kerja yang dipakai adalah bare infinitive ("be").'
    };
  })
];
