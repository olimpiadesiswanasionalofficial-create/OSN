import { QuestionItem } from './cbtQuestionTypes';
import { createSimulasiSvg } from './simulasiSvgIllustrations';

// Kategori C: SMP/MTs - Bahasa Inggris (20 Soal Sangat Mudah & Bergambar)

export const KATEGORI_C_ENGLISH: QuestionItem[] = [
  {
    id: 'SIM-C-ENG-01',
    number: 1,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Complete the sentence with simple present tense: "The sun ... in the east."',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Simple Present', 'The sun rises', '#F59E0B',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="55" rx="10" fill="#FEF3C7"/><text x="100" y="52" font-size="16" font-weight="bold" fill="#B45309" text-anchor="middle">RISES</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'rises' }, { key: 'B', text: 'rise' }, { key: 'C', text: 'rising' }, { key: 'D', text: 'rose' }],
    correctAnswer: 'A',
    explanation: 'Subjek tunggal "The sun" menggunakan kata kerja berakhiran -s (rises).'
  },
  {
    id: 'SIM-C-ENG-02',
    number: 2,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'What is the past tense (V2) of the verb "GO"?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Irregular Verbs', 'Go -> Went', '#2563EB',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#DBEAFE"/><text x="90" y="55" font-size="18" font-weight="bold" fill="#1D4ED8" text-anchor="middle">GO → WENT</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Went' }, { key: 'B', text: 'Goed' }, { key: 'C', text: 'Gone' }, { key: 'D', text: 'Going' }],
    correctAnswer: 'A',
    explanation: 'Bentuk lampau (Verb 2) dari kata kerja tidak beraturan "go" adalah "went".'
  },
  {
    id: 'SIM-C-ENG-03',
    number: 3,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'The comparative degree of "BIG" is...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Comparison Degree', 'Big -> Bigger', '#16A34A',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#DCFCE7"/><text x="90" y="55" font-size="18" font-weight="bold" fill="#15803D" text-anchor="middle">BIGGER</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Bigger' }, { key: 'B', text: 'More big' }, { key: 'C', text: 'Biggest' }, { key: 'D', text: 'Most big' }],
    correctAnswer: 'A',
    explanation: 'Tingkat perbandingan lebih (comparative) dari big adalah bigger.'
  },
  {
    id: 'SIM-C-ENG-04',
    number: 4,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Which modal verb is used to ask for permission politely? (Meminta izin dengan sopan)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Modals of Politeness', 'May I come in?', '#7C3AED',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="55" rx="10" fill="#EDE9FE"/><text x="100" y="52" font-size="16" font-weight="bold" fill="#6D28D9" text-anchor="middle">MAY I ... ?</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'May' }, { key: 'B', text: 'Must' }, { key: 'C', text: 'Should' }, { key: 'D', text: 'Will' }],
    correctAnswer: 'A',
    explanation: '"May" digunakan secara sopan untuk meminta izin (contoh: "May I wash my hands?").'
  },
  {
    id: 'SIM-C-ENG-05',
    number: 5,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'What is the synonym of the word "DIFFICULT"?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Synonyms', 'Difficult = Hard', '#DC2626',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#FEE2E2"/><text x="90" y="55" font-size="16" font-weight="bold" fill="#B91C1C" text-anchor="middle">HARD</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Hard' }, { key: 'B', text: 'Easy' }, { key: 'C', text: 'Simple' }, { key: 'D', text: 'Light' }],
    correctAnswer: 'A',
    explanation: 'Difficult bersinonim dengan hard (sulit).'
  },
  {
    id: 'SIM-C-ENG-06',
    number: 6,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'A text that tells a story with orientation, complication, and resolution is called...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Text Genres', 'Narrative Text', '#0284C7',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="55" rx="10" fill="#E0F2FE"/><text x="100" y="52" font-size="16" font-weight="bold" fill="#0369A1" text-anchor="middle">NARRATIVE</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Narrative Text' }, { key: 'B', text: 'Report Text' }, { key: 'C', text: 'Descriptive Text' }, { key: 'D', text: 'Procedure Text' }],
    correctAnswer: 'A',
    explanation: 'Narrative text menceritakan kisah fiksi dengan alur komplikasi dan resolusi.'
  },
  {
    id: 'SIM-C-ENG-07',
    number: 7,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Complete the tag question: "You are a doctor, ...?"',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Question Tags', 'aren\'t you?', '#4F46E5',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="55" rx="10" fill="#EEF2FF"/><text x="100" y="52" font-size="16" font-weight="bold" fill="#3730A3" text-anchor="middle">AREN\'T YOU?</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: "aren't you" }, { key: 'B', text: "isn't you" }, { key: 'C', text: "don't you" }, { key: 'D', text: "won't you" }],
    correctAnswer: 'A',
    explanation: 'Kalimat positif dengan to be "are" memiliki question tag negatif "aren\'t you".'
  },
  {
    id: 'SIM-C-ENG-08',
    number: 8,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'The antonym (opposite) of "CHEAP" is...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Opposites', 'Cheap vs Expensive', '#D97706',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="55" rx="10" fill="#FEF3C7"/><text x="100" y="52" font-size="15" font-weight="bold" fill="#B45309" text-anchor="middle">EXPENSIVE</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Expensive' }, { key: 'B', text: 'Free' }, { key: 'C', text: 'Small' }, { key: 'D', text: 'Near' }],
    correctAnswer: 'A',
    explanation: 'Lawan kata dari murah (cheap) adalah mahal (expensive).'
  },
  {
    id: 'SIM-C-ENG-09',
    number: 9,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Complete the sentence: "They ... playing football in the school yard right now."',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Present Continuous', 'They are playing', '#10B981',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="55" rx="10" fill="#D1FAE5"/><text x="100" y="52" font-size="16" font-weight="bold" fill="#047857" text-anchor="middle">ARE</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'are' }, { key: 'B', text: 'is' }, { key: 'C', text: 'am' }, { key: 'D', text: 'was' }],
    correctAnswer: 'A',
    explanation: 'Subjek jamak "They" menggunakan to be "are" dalam present continuous tense.'
  },
  {
    id: 'SIM-C-ENG-10',
    number: 10,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Which conjunction shows a contrast or difference? (Kata hubung perlawanan)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Conjunctions', 'Contrast: But', '#EA580C',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#FFEDD5"/><text x="80" y="55" font-size="18" font-weight="bold" fill="#C2410C" text-anchor="middle">BUT</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'But' }, { key: 'B', text: 'And' }, { key: 'C', text: 'So' }, { key: 'D', text: 'Because' }],
    correctAnswer: 'A',
    explanation: '"But" (tetapi) digunakan untuk menghubungkan dua klausa yang bertentangan.'
  },
  {
    id: 'SIM-C-ENG-11',
    number: 11,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'What is the superlative form of "FAST"?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Superlative Degree', 'Fast -> The Fastest', '#2563EB',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="55" rx="10" fill="#DBEAFE"/><text x="100" y="52" font-size="16" font-weight="bold" fill="#1D4ED8" text-anchor="middle">THE FASTEST</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'The fastest' }, { key: 'B', text: 'Faster' }, { key: 'C', text: 'Most fast' }, { key: 'D', text: 'More faster' }],
    correctAnswer: 'A',
    explanation: 'Bentuk paling cepat (superlative) adalah the fastest.'
  },
  {
    id: 'SIM-C-ENG-12',
    number: 12,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'What preposition is used for specific days? (Contoh: ... Monday)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Prepositions of Time', 'On Monday', '#059669',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="55" rx="10" fill="#D1FAE5"/><text x="100" y="52" font-size="16" font-weight="bold" fill="#047857" text-anchor="middle">ON Monday</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'On' }, { key: 'B', text: 'In' }, { key: 'C', text: 'At' }, { key: 'D', text: 'By' }],
    correctAnswer: 'A',
    explanation: 'Untuk nama-nama hari digunakan preposisi "on" (on Monday, on Sunday).'
  },
  {
    id: 'SIM-C-ENG-13',
    number: 13,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'A person whose job is to fly an aircraft is called a...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Professions', 'Airplane Pilot', '#0284C7',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#E0F2FE"/><text x="90" y="55" font-size="16" font-weight="bold" fill="#0369A1" text-anchor="middle">PILOT</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Pilot' }, { key: 'B', text: 'Driver' }, { key: 'C', text: 'Sailor' }, { key: 'D', text: 'Mechanic' }],
    correctAnswer: 'A',
    explanation: 'Pilot adalah pengemudi pesawat terbang.'
  },
  {
    id: 'SIM-C-ENG-14',
    number: 14,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Choose the correct greeting for congratulating someone on their birthday:',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Greetings & Wishes', 'Happy Birthday!', '#EC4899',
        '<g transform="translate(90, 25)"><rect x="10" y="20" width="200" height="55" rx="10" fill="#FCE7F3"/><text x="110" y="52" font-size="14" font-weight="bold" fill="#DB2777" text-anchor="middle">Happy Birthday!</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Happy Birthday!' }, { key: 'B', text: 'Get well soon!' }, { key: 'C', text: 'Good luck!' }, { key: 'D', text: 'Nice to meet you!' }],
    correctAnswer: 'A',
    explanation: 'Ucapan selamat ulang tahun adalah "Happy Birthday!".'
  },
  {
    id: 'SIM-C-ENG-15',
    number: 15,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary English',
    difficulty: 'Sangat Mudah',
    questionText: 'The past participle (V3) of the irregular verb "WRITE" is...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Past Participle', 'Write - Wrote - Written', '#8B5CF6',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="55" rx="10" fill="#EDE9FE"/><text x="100" y="52" font-size="16" font-weight="bold" fill="#6D28D9" text-anchor="middle">WRITTEN</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Written' }, { key: 'B', text: 'Wrote' }, { key: 'C', text: 'Writing' }, { key: 'D', text: 'Writed' }],
    correctAnswer: 'A',
    explanation: 'Write (V1) -> Wrote (V2) -> Written (V3).'
  },
  {
    id: 'SIM-C-ENG-16',
    number: 16,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary English',
    difficulty: 'Sangat Mudah',
    questionText: 'Complete the conditional sentence: "If it rains tomorrow, we ... stay at home."',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Conditionals (Type 1)', 'If ... will ...', '#059669',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="55" rx="10" fill="#D1FAE5"/><text x="100" y="52" font-size="16" font-weight="bold" fill="#047857" text-anchor="middle">WILL</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'will' }, { key: 'B', text: 'would' }, { key: 'C', text: 'had' }, { key: 'D', text: 'are' }],
    correctAnswer: 'A',
    explanation: 'First conditional menggunakan pola If + simple present, will + infinitive.'
  },
  {
    id: 'SIM-C-ENG-17',
    number: 17,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary English',
    difficulty: 'Sangat Mudah',
    questionText: 'The passive voice of "Rina opens the window" is...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Passive Voice', 'is opened by Rina', '#2563EB',
        '<g transform="translate(90, 25)"><rect x="10" y="20" width="200" height="55" rx="10" fill="#DBEAFE"/><text x="110" y="52" font-size="13" font-weight="bold" fill="#1D4ED8" text-anchor="middle">is opened by Rina</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'The window is opened by Rina' }, { key: 'B', text: 'The window was opened by Rina' }, { key: 'C', text: 'The window opened Rina' }, { key: 'D', text: 'The window is open Rina' }],
    correctAnswer: 'A',
    explanation: 'Pola simple present passive: Object + is/am/are + V3 + by subject.'
  },
  {
    id: 'SIM-C-ENG-18',
    number: 18,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary English',
    difficulty: 'Sangat Mudah',
    questionText: 'What is the purpose of an INVITATION card?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Short Functional Text', 'Invitation Card', '#D97706',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="55" rx="10" fill="#FEF3C7"/><text x="100" y="52" font-size="14" font-weight="bold" fill="#B45309" text-anchor="middle">To invite someone</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'To invite someone to come to an event' }, { key: 'B', text: 'To complain about a bad service' }, { key: 'C', text: 'To explain how to make food' }, { key: 'D', text: 'To describe an animal' }],
    correctAnswer: 'A',
    explanation: 'Invitation card (surat undangan) bertujuan mengundang seseorang hadir ke suatu acara.'
  },
  {
    id: 'SIM-C-ENG-19',
    number: 19,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary English',
    difficulty: 'Sangat Mudah',
    questionText: 'Which expression expresses an OPINION?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Giving Opinion', 'I think that ...', '#6366F1',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="55" rx="10" fill="#EEF2FF"/><text x="100" y="52" font-size="16" font-weight="bold" fill="#4338CA" text-anchor="middle">I THINK ...</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'In my opinion, this book is great.' }, { key: 'B', text: 'Water boils at 100°C.' }, { key: 'C', text: 'Jakarta is in Indonesia.' }, { key: 'D', text: 'Today is Wednesday.' }],
    correctAnswer: 'A',
    explanation: '"In my opinion..." mengemukakan pendapat atau sudut pandang pribadi.'
  },
  {
    id: 'SIM-C-ENG-20',
    number: 20,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary English',
    difficulty: 'Sangat Mudah',
    questionText: 'The synonym of the word "SMART" is...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Vocabulary', 'Smart = Clever', '#10B981',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#D1FAE5"/><text x="90" y="55" font-size="16" font-weight="bold" fill="#047857" text-anchor="middle">CLEVER</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Clever' }, { key: 'B', text: 'Stupid' }, { key: 'C', text: 'Lazy' }, { key: 'D', text: 'Slow' }],
    correctAnswer: 'A',
    explanation: 'Smart memiliki persamaan kata dengan clever atau intelligent (pintar/cerdas).'
  }
];
