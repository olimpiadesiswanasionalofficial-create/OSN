import { QuestionItem } from './cbtQuestionTypes';
import { createSimulasiSvg } from './simulasiSvgIllustrations';

// Kategori A: PAUD/TK - Bahasa Inggris (20 Soal Sangat Mudah & Bergambar)

export const KATEGORI_A_ENGLISH: QuestionItem[] = [
  {
    id: 'SIM-A-ENG-01',
    number: 1,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'What color is this apple? (Warna apa apel ini dalam bahasa Inggris?)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Colors', 'Apple Color', '#EF4444',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="45" fill="#EF4444"/><text x="65" y="72" font-size="16" font-weight="900" fill="#FFF" text-anchor="middle">RED</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Red' }, { key: 'B', text: 'Blue' }, { key: 'C', text: 'Green' }, { key: 'D', text: 'Black' }],
    correctAnswer: 'A',
    explanation: 'Warna merah dalam bahasa Inggris adalah "Red".'
  },
  {
    id: 'SIM-A-ENG-02',
    number: 2,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'What animal is this? ("Kucing" in English is...)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Animals', 'Cute Cat', '#F59E0B',
        '<g transform="translate(130, 20)"><circle cx="65" cy="70" r="35" fill="#FDE68A"/><polygon points="40,45 30,20 55,35" fill="#F59E0B"/><polygon points="90,45 100,20 75,35" fill="#F59E0B"/><text x="65" y="75" font-size="14" font-weight="bold" fill="#78350F" text-anchor="middle">CAT</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Cat' }, { key: 'B', text: 'Dog' }, { key: 'C', text: 'Fish' }, { key: 'D', text: 'Bird' }],
    correctAnswer: 'A',
    explanation: 'Kucing dalam bahasa Inggris adalah "Cat".'
  },
  {
    id: 'SIM-A-ENG-03',
    number: 3,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'How many circles are there? (Ada berapa lingkaran pada gambar?)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Numbers', 'Count to One', '#3B82F6',
        '<g transform="translate(140, 20)"><circle cx="50" cy="65" r="40" fill="#3B82F6"/><text x="50" y="72" font-size="24" font-weight="900" fill="#FFF" text-anchor="middle">1</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'One' }, { key: 'B', text: 'Two' }, { key: 'C', text: 'Three' }, { key: 'D', text: 'Four' }],
    correctAnswer: 'A',
    explanation: 'Satu dalam bahasa Inggris adalah "One".'
  },
  {
    id: 'SIM-A-ENG-04',
    number: 4,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'What is "Buku" in English?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Objects', 'Reading Book', '#8B5CF6',
        '<g transform="translate(130, 20)"><rect x="20" y="25" width="90" height="70" rx="8" fill="#EDE9FE" stroke="#7C3AED" stroke-width="4"/><text x="65" y="68" font-size="16" font-weight="bold" fill="#6D28D9" text-anchor="middle">BOOK</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Book' }, { key: 'B', text: 'Pen' }, { key: 'C', text: 'Ruler' }, { key: 'D', text: 'Bag' }],
    correctAnswer: 'A',
    explanation: 'Buku dalam bahasa Inggris disebut "Book".'
  },
  {
    id: 'SIM-A-ENG-05',
    number: 5,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'What color is the sky? (Warna langit yang cerah adalah...)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Colors', 'Sky Color', '#0284C7',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="45" fill="#38BDF8"/><text x="65" y="72" font-size="16" font-weight="900" fill="#FFF" text-anchor="middle">BLUE</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Blue' }, { key: 'B', text: 'Red' }, { key: 'C', text: 'Yellow' }, { key: 'D', text: 'Pink' }],
    correctAnswer: 'A',
    explanation: 'Warna biru dalam bahasa Inggris adalah "Blue".'
  },
  {
    id: 'SIM-A-ENG-06',
    number: 6,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'The greeting for the morning is... (Ucapan selamat pagi)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Greetings', 'Morning Sun', '#F59E0B',
        '<g transform="translate(100, 20)"><rect x="10" y="25" width="170" height="65" rx="12" fill="#FEF3C7"/><text x="95" y="65" font-size="15" font-weight="bold" fill="#B45309" text-anchor="middle">Good Morning</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Good Morning' }, { key: 'B', text: 'Good Night' }, { key: 'C', text: 'Good Bye' }, { key: 'D', text: 'No' }],
    correctAnswer: 'A',
    explanation: 'Selamat pagi dalam bahasa Inggris adalah "Good Morning".'
  },
  {
    id: 'SIM-A-ENG-07',
    number: 7,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'What animal can swim in the water? (Hewan berenang)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Animals', 'Swimming Fish', '#06B6D4',
        '<g transform="translate(130, 20)"><ellipse cx="65" cy="65" rx="40" ry="22" fill="#22D3EE"/><polygon points="105,65 125,50 125,80" fill="#0891B2"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Fish' }, { key: 'B', text: 'Lion' }, { key: 'C', text: 'Tiger' }, { key: 'D', text: 'Cow' }],
    correctAnswer: 'A',
    explanation: 'Ikan dalam bahasa Inggris adalah "Fish".'
  },
  {
    id: 'SIM-A-ENG-08',
    number: 8,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'What is "Dua" in English? (Angka 2)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Numbers', 'Number Two', '#10B981',
        '<g transform="translate(130, 20)"><rect x="25" y="15" width="80" height="85" rx="14" fill="#D1FAE5"/><text x="65" y="75" font-size="52" font-weight="900" fill="#059669" text-anchor="middle">2</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Two' }, { key: 'B', text: 'One' }, { key: 'C', text: 'Three' }, { key: 'D', text: 'Five' }],
    correctAnswer: 'A',
    explanation: 'Angka dua dalam bahasa Inggris adalah "Two".'
  },
  {
    id: 'SIM-A-ENG-09',
    number: 9,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'What color is the banana? (Warna buah pisang)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Colors', 'Banana Color', '#EAB308',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="45" fill="#FACC15"/><text x="65" y="72" font-size="14" font-weight="900" fill="#713F12" text-anchor="middle">YELLOW</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Yellow' }, { key: 'B', text: 'Blue' }, { key: 'C', text: 'Black' }, { key: 'D', text: 'Red' }],
    correctAnswer: 'A',
    explanation: 'Warna kuning adalah "Yellow".'
  },
  {
    id: 'SIM-A-ENG-10',
    number: 10,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'What is "Mata" in English?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Body Parts', 'Eye', '#6366F1',
        '<g transform="translate(130, 20)"><ellipse cx="65" cy="65" rx="50" ry="25" fill="#EEF2FF" stroke="#4F46E5" stroke-width="4"/><circle cx="65" cy="65" r="16" fill="#312E81"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Eye' }, { key: 'B', text: 'Nose' }, { key: 'C', text: 'Ear' }, { key: 'D', text: 'Foot' }],
    correctAnswer: 'A',
    explanation: 'Mata dalam bahasa Inggris adalah "Eye".'
  },
  {
    id: 'SIM-A-ENG-11',
    number: 11,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'What is "Anjing" in English?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Animals', 'Puppy Dog', '#D97706',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="35" fill="#FED7AA"/><ellipse cx="38" cy="40" rx="8" ry="18" fill="#B45309"/><ellipse cx="92" cy="40" rx="8" ry="18" fill="#B45309"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Dog' }, { key: 'B', text: 'Cat' }, { key: 'C', text: 'Duck' }, { key: 'D', text: 'Frog' }],
    correctAnswer: 'A',
    explanation: 'Anjing dalam bahasa Inggris adalah "Dog".'
  },
  {
    id: 'SIM-A-ENG-12',
    number: 12,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'What is "Tiga" in English? (Angka 3)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Numbers', 'Number Three', '#EC4899',
        '<g transform="translate(130, 20)"><rect x="25" y="15" width="80" height="85" rx="14" fill="#FCE7F3"/><text x="65" y="75" font-size="52" font-weight="900" fill="#DB2777" text-anchor="middle">3</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Three' }, { key: 'B', text: 'Two' }, { key: 'C', text: 'Four' }, { key: 'D', text: 'One' }],
    correctAnswer: 'A',
    explanation: 'Tiga dalam bahasa Inggris adalah "Three".'
  },
  {
    id: 'SIM-A-ENG-13',
    number: 13,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'What is "Pena / Pulpen" in English?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Objects', 'Writing Pen', '#0284C7',
        '<g transform="translate(130, 20)"><rect x="25" y="55" width="80" height="16" rx="4" fill="#0284C7"/><polygon points="105,55 125,63 105,71" fill="#0369A1"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Pen' }, { key: 'B', text: 'Bag' }, { key: 'C', text: 'Chair' }, { key: 'D', text: 'Hat' }],
    correctAnswer: 'A',
    explanation: 'Pena dalam bahasa Inggris adalah "Pen".'
  },
  {
    id: 'SIM-A-ENG-14',
    number: 14,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'What color is milk? (Warna susu sapi putih murni)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Colors', 'Glass of Milk', '#94A3B8',
        '<g transform="translate(130, 20)"><rect x="35" y="25" width="60" height="80" rx="8" fill="#F8FAFC" stroke="#64748B" stroke-width="4"/><text x="65" y="70" font-size="12" font-weight="bold" fill="#334155" text-anchor="middle">WHITE</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'White' }, { key: 'B', text: 'Black' }, { key: 'C', text: 'Red' }, { key: 'D', text: 'Green' }],
    correctAnswer: 'A',
    explanation: 'Warna putih dalam bahasa Inggris adalah "White".'
  },
  {
    id: 'SIM-A-ENG-15',
    number: 15,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Years',
    difficulty: 'Sangat Mudah',
    questionText: 'What is "Matahari" in English?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Nature', 'Sun', '#F59E0B',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="35" fill="#FBBF24"/><text x="65" y="70" font-size="14" font-weight="900" fill="#78350F" text-anchor="middle">SUN</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Sun' }, { key: 'B', text: 'Moon' }, { key: 'C', text: 'Star' }, { key: 'D', text: 'Cloud' }],
    correctAnswer: 'A',
    explanation: 'Matahari dalam bahasa Inggris adalah "Sun".'
  },
  {
    id: 'SIM-A-ENG-16',
    number: 16,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Years',
    difficulty: 'Sangat Mudah',
    questionText: 'What is "Bintang" in English?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Night Sky', 'Twinkle Star', '#EAB308',
        '<g transform="translate(130, 20)"><polygon points="65,15 76,48 110,48 82,68 93,101 65,81 37,101 48,68 20,48 54,48" fill="#FACC15"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Star' }, { key: 'B', text: 'Sky' }, { key: 'C', text: 'Rain' }, { key: 'D', text: 'Tree' }],
    correctAnswer: 'A',
    explanation: 'Bintang dalam bahasa Inggris adalah "Star".'
  },
  {
    id: 'SIM-A-ENG-17',
    number: 17,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Years',
    difficulty: 'Sangat Mudah',
    questionText: 'Saying goodbye to a friend is... (Ucapan selamat tinggal)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Greetings', 'Goodbye Wave', '#059669',
        '<g transform="translate(110, 20)"><rect x="15" y="25" width="150" height="65" rx="12" fill="#D1FAE5"/><text x="90" y="65" font-size="16" font-weight="bold" fill="#047857" text-anchor="middle">Goodbye!</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Goodbye' }, { key: 'B', text: 'Hello' }, { key: 'C', text: 'Good Morning' }, { key: 'D', text: 'Welcome' }],
    correctAnswer: 'A',
    explanation: 'Selamat tinggal atau sampai jumpa adalah "Goodbye".'
  },
  {
    id: 'SIM-A-ENG-18',
    number: 18,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Years',
    difficulty: 'Sangat Mudah',
    questionText: 'What is "Bebek" in English?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Animals', 'Yellow Duck', '#FBBF24',
        '<g transform="translate(130, 20)"><circle cx="80" cy="50" r="20" fill="#FBBF24"/><ellipse cx="60" cy="75" rx="35" ry="22" fill="#FBBF24"/><polygon points="98,48 115,53 98,58" fill="#F97316"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Duck' }, { key: 'B', text: 'Fish' }, { key: 'C', text: 'Bear' }, { key: 'D', text: 'Sheep' }],
    correctAnswer: 'A',
    explanation: 'Bebek dalam bahasa Inggris adalah "Duck".'
  },
  {
    id: 'SIM-A-ENG-19',
    number: 19,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Years',
    difficulty: 'Sangat Mudah',
    questionText: 'What is "Rumah" in English?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Places', 'House', '#EF4444',
        '<g transform="translate(130, 20)"><polygon points="65,15 20,55 110,55" fill="#EF4444"/><rect x="30" y="55" width="70" height="50" fill="#FDE047"/><rect x="55" y="70" width="20" height="35" fill="#B45309"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'House' }, { key: 'B', text: 'Car' }, { key: 'C', text: 'Boat' }, { key: 'D', text: 'Tree' }],
    correctAnswer: 'A',
    explanation: 'Rumah dalam bahasa Inggris adalah "House".'
  },
  {
    id: 'SIM-A-ENG-20',
    number: 20,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Years',
    difficulty: 'Sangat Mudah',
    questionText: 'What is "Apel" in English?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Fruits', 'Red Apple', '#DC2626',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="40" fill="#DC2626"/><line x1="65" y1="25" x2="65" y2="15" stroke="#15803D" stroke-width="4"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Apple' }, { key: 'B', text: 'Orange' }, { key: 'C', text: 'Mango' }, { key: 'D', text: 'Grape' }],
    correctAnswer: 'A',
    explanation: 'Apel dalam bahasa Inggris adalah "Apple".'
  }
];
