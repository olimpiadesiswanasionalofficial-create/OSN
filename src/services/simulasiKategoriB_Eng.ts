import { QuestionItem } from './cbtQuestionTypes';
import { createSimulasiSvg } from './simulasiSvgIllustrations';

// Kategori B: SD/MI - Bahasa Inggris (20 Soal Sangat Mudah & Bergambar)

export const KATEGORI_B_ENGLISH: QuestionItem[] = [
  {
    id: 'SIM-B-ENG-01',
    number: 1,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'What is the English word for "Pensil"?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('School Supplies', 'Pencil', '#F59E0B',
        '<g transform="translate(130, 20)"><rect x="25" y="55" width="85" height="16" rx="3" fill="#FBBF24"/><polygon points="110,55 125,63 110,71" fill="#78350F"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Pencil' }, { key: 'B', text: 'Eraser' }, { key: 'C', text: 'Ruler' }, { key: 'D', text: 'Scissors' }],
    correctAnswer: 'A',
    explanation: 'Pensil dalam bahasa Inggris adalah "Pencil".'
  },
  {
    id: 'SIM-B-ENG-02',
    number: 2,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Complete the sentence: "I ... a student."',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('To Be (Present)', 'I am a student', '#2563EB',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="55" rx="10" fill="#DBEAFE"/><text x="100" y="52" font-size="16" font-weight="bold" fill="#1D4ED8" text-anchor="middle">I AM a student</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'am' }, { key: 'B', text: 'is' }, { key: 'C', text: 'are' }, { key: 'D', text: 'were' }],
    correctAnswer: 'A',
    explanation: 'Subjek "I" berpasangan dengan to be "am" (I am).'
  },
  {
    id: 'SIM-B-ENG-03',
    number: 3,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'What is the opposite of "HAPPY"?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Adjectives', 'Happy vs Sad', '#64748B',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#F1F5F9"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#334155" text-anchor="middle">SAD</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Sad' }, { key: 'B', text: 'Glad' }, { key: 'C', text: 'Joyful' }, { key: 'D', text: 'Smart' }],
    correctAnswer: 'A',
    explanation: 'Lawan kata dari gembira (happy) adalah sedih (sad).'
  },
  {
    id: 'SIM-B-ENG-04',
    number: 4,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Which animal is known as the "King of the Jungle"?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Wild Animals', 'Lion', '#D97706',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="35" fill="#FED7AA"/><circle cx="65" cy="65" r="45" fill="none" stroke="#D97706" stroke-width="12" stroke-dasharray="8,6"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Lion' }, { key: 'B', text: 'Rabbit' }, { key: 'C', text: 'Fish' }, { key: 'D', text: 'Mouse' }],
    correctAnswer: 'A',
    explanation: 'Singa (Lion) dijuluki raja hutan.'
  },
  {
    id: 'SIM-B-ENG-05',
    number: 5,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'What day comes after Monday?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Days of the Week', 'Monday -> ?', '#7C3AED',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="55" rx="10" fill="#EDE9FE"/><text x="100" y="52" font-size="16" font-weight="bold" fill="#6D28D9" text-anchor="middle">TUESDAY</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Tuesday' }, { key: 'B', text: 'Wednesday' }, { key: 'C', text: 'Sunday' }, { key: 'D', text: 'Friday' }],
    correctAnswer: 'A',
    explanation: 'Hari setelah Senin (Monday) adalah Selasa (Tuesday).'
  },
  {
    id: 'SIM-B-ENG-06',
    number: 6,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'How many days are there in one week?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Calendar', 'Days in a Week', '#059669',
        '<g transform="translate(130, 20)"><rect x="25" y="15" width="80" height="85" rx="14" fill="#D1FAE5"/><text x="65" y="75" font-size="52" font-weight="900" fill="#047857" text-anchor="middle">7</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Five days' }, { key: 'B', text: 'Six days' }, { key: 'C', text: 'Seven days' }, { key: 'D', text: 'Eight days' }],
    correctAnswer: 'C',
    explanation: 'Dalam satu minggu terdapat 7 hari (seven days).'
  },
  {
    id: 'SIM-B-ENG-07',
    number: 7,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'What is the English word for "Gajah"?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Animals', 'Big Elephant', '#64748B',
        '<g transform="translate(130, 20)"><ellipse cx="65" cy="70" rx="45" ry="35" fill="#CBD5E1"/><text x="65" y="75" font-size="12" font-weight="bold" fill="#334155" text-anchor="middle">ELEPHANT</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Elephant' }, { key: 'B', text: 'Giraffe' }, { key: 'C', text: 'Zebra' }, { key: 'D', text: 'Monkey' }],
    correctAnswer: 'A',
    explanation: 'Gajah dalam bahasa Inggris adalah "Elephant".'
  },
  {
    id: 'SIM-B-ENG-08',
    number: 8,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: '"She is drinking water." What is the Indonesian meaning of "drinking"?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Daily Activity', 'Drinking Water', '#0284C7',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#E0F2FE"/><text x="90" y="55" font-size="16" font-weight="bold" fill="#0369A1" text-anchor="middle">MINUM</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Minum' }, { key: 'B', text: 'Makan' }, { key: 'C', text: 'Tidur' }, { key: 'D', text: 'Berlari' }],
    correctAnswer: 'A',
    explanation: 'Drinking artinya meminum.'
  },
  {
    id: 'SIM-B-ENG-09',
    number: 9,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Plural (jamak) of "one book" is "two ..."?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Singular & Plural', 'One Book -> Two Books', '#4F46E5',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="55" rx="10" fill="#EEF2FF"/><text x="100" y="52" font-size="16" font-weight="bold" fill="#3730A3" text-anchor="middle">BOOKS</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Books' }, { key: 'B', text: 'Bookes' }, { key: 'C', text: 'Book' }, { key: 'D', text: 'Bookies' }],
    correctAnswer: 'A',
    explanation: 'Bentuk jamak dari book adalah books dengan akhiran s.'
  },
  {
    id: 'SIM-B-ENG-10',
    number: 10,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Where do we sleep at night?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Rooms in the House', 'Bedroom', '#8B5CF6',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#EDE9FE"/><text x="90" y="55" font-size="16" font-weight="bold" fill="#6D28D9" text-anchor="middle">BEDROOM</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Bedroom' }, { key: 'B', text: 'Kitchen' }, { key: 'C', text: 'Bathroom' }, { key: 'D', text: 'Garage' }],
    correctAnswer: 'A',
    explanation: 'Kita tidur di kamar tidur (bedroom).'
  },
  {
    id: 'SIM-B-ENG-11',
    number: 11,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Ten plus five is equal to... (10 + 5 = ?)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Math in English', '10 + 5', '#10B981',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#D1FAE5"/><text x="90" y="55" font-size="16" font-weight="bold" fill="#047857" text-anchor="middle">FIFTEEN (15)</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Fifteen' }, { key: 'B', text: 'Fifty' }, { key: 'C', text: 'Twelve' }, { key: 'D', text: 'Twenty' }],
    correctAnswer: 'A',
    explanation: '10 + 5 = 15 (Fifteen).'
  },
  {
    id: 'SIM-B-ENG-12',
    number: 12,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'What is the color of grass? (Warna rumput)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Colors in Nature', 'Green Grass', '#15803D',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="45" fill="#22C55E"/><text x="65" y="72" font-size="14" font-weight="900" fill="#FFF" text-anchor="middle">GREEN</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Green' }, { key: 'B', text: 'Purple' }, { key: 'C', text: 'Orange' }, { key: 'D', text: 'Pink' }],
    correctAnswer: 'A',
    explanation: 'Warna rumput adalah hijau (green).'
  },
  {
    id: 'SIM-B-ENG-13',
    number: 13,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'What do we use to listen to music? (Organ tubuh untuk mendengar)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Body Parts', 'Ears', '#F59E0B',
        '<g transform="translate(130, 20)"><path d="M40,20 C80,20 80,100 40,100 Z" fill="#FEF3C7" stroke="#D97706" stroke-width="4"/><text x="60" y="65" font-size="12" font-weight="bold" fill="#78350F">EARS</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Ears' }, { key: 'B', text: 'Eyes' }, { key: 'C', text: 'Nose' }, { key: 'D', text: 'Teeth' }],
    correctAnswer: 'A',
    explanation: 'Ears artinya telinga untuk mendengar.'
  },
  {
    id: 'SIM-B-ENG-14',
    number: 14,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Someone who teaches students in a school is a...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Professions', 'Teacher', '#DC2626',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#FEE2E2"/><text x="90" y="55" font-size="16" font-weight="bold" fill="#991B1B" text-anchor="middle">TEACHER</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Teacher' }, { key: 'B', text: 'Doctor' }, { key: 'C', text: 'Pilot' }, { key: 'D', text: 'Chef' }],
    correctAnswer: 'A',
    explanation: 'Guru dalam bahasa Inggris adalah "Teacher".'
  },
  {
    id: 'SIM-B-ENG-15',
    number: 15,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary English',
    difficulty: 'Sangat Mudah',
    questionText: 'The opposite of "HOT" is...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Opposites', 'Hot vs Cold', '#0284C7',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#E0F2FE"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#0369A1" text-anchor="middle">COLD</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Cold' }, { key: 'B', text: 'Warm' }, { key: 'C', text: 'Boiling' }, { key: 'D', text: 'Fast' }],
    correctAnswer: 'A',
    explanation: 'Lawan kata dari panas (hot) adalah dingin (cold).'
  },
  {
    id: 'SIM-B-ENG-16',
    number: 16,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary English',
    difficulty: 'Sangat Mudah',
    questionText: 'Which vehicle travels in the sky?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Transportation', 'Airplane', '#2563EB',
        '<g transform="translate(130, 20)"><polygon points="30,65 110,65 90,45" fill="#3B82F6"/><rect x="50" y="60" width="50" height="10" rx="2" fill="#1D4ED8"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Airplane' }, { key: 'B', text: 'Bus' }, { key: 'C', text: 'Train' }, { key: 'D', text: 'Bicycle' }],
    correctAnswer: 'A',
    explanation: 'Pesawat terbang (airplane) mengudara di langit.'
  },
  {
    id: 'SIM-B-ENG-17',
    number: 17,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary English',
    difficulty: 'Sangat Mudah',
    questionText: 'What is the correct pronoun for a boy? (Kata ganti untuk anak laki-laki)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Pronouns', 'Boy -> He', '#059669',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#D1FAE5"/><text x="80" y="55" font-size="20" font-weight="bold" fill="#047857" text-anchor="middle">HE</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'He' }, { key: 'B', text: 'She' }, { key: 'C', text: 'It' }, { key: 'D', text: 'They' }],
    correctAnswer: 'A',
    explanation: 'Dia laki-laki menggunakan kata ganti "He".'
  },
  {
    id: 'SIM-B-ENG-18',
    number: 18,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary English',
    difficulty: 'Sangat Mudah',
    questionText: 'What season comes with a lot of rain? (Musim hujan)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Weather & Seasons', 'Rainy Season', '#0284C7',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#E0F2FE"/><text x="90" y="55" font-size="14" font-weight="bold" fill="#0369A1" text-anchor="middle">RAINY SEASON</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Rainy season' }, { key: 'B', text: 'Dry season' }, { key: 'C', text: 'Summer' }, { key: 'D', text: 'Sunny' }],
    correctAnswer: 'A',
    explanation: 'Musim hujan disebut rainy season.'
  },
  {
    id: 'SIM-B-ENG-19',
    number: 19,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary English',
    difficulty: 'Sangat Mudah',
    questionText: 'We use a clock to tell the...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Time', 'Clock', '#D97706',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="40" fill="#FEF3C7" stroke="#D97706" stroke-width="4"/><line x1="65" y1="65" x2="65" y2="40" stroke="#78350F" stroke-width="3"/><line x1="65" y1="65" x2="85" y2="65" stroke="#78350F" stroke-width="3"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Time' }, { key: 'B', text: 'Price' }, { key: 'C', text: 'Weight' }, { key: 'D', text: 'Length' }],
    correctAnswer: 'A',
    explanation: 'Jam dinding digunakan untuk mengetahui waktu (time).'
  },
  {
    id: 'SIM-B-ENG-20',
    number: 20,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary English',
    difficulty: 'Sangat Mudah',
    questionText: 'When someone says "Thank you", you should reply with...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Politeness', 'You are welcome', '#10B981',
        '<g transform="translate(90, 25)"><rect x="10" y="20" width="200" height="55" rx="10" fill="#D1FAE5"/><text x="110" y="52" font-size="14" font-weight="bold" fill="#047857" text-anchor="middle">You are welcome</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'You are welcome' }, { key: 'B', text: 'Never mind' }, { key: 'C', text: 'Go away' }, { key: 'D', text: 'Sorry' }],
    correctAnswer: 'A',
    explanation: 'Jawaban sopan untuk "Thank you" adalah "You are welcome" (Sama-sama).'
  }
];
