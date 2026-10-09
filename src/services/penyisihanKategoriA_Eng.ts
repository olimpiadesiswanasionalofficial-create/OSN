import { QuestionItem } from './cbtQuestionTypes';
import { createSimulasiSvg } from './simulasiSvgIllustrations';

// SOAL RESMI BABAK PENYISIHAN: BAHASA INGGRIS KATEGORI PAUD/TK (Kategori A)
// 20 Soal Resmi Pilihan Ganda dengan Kunci Jawaban Resmi & Ilustrasi Visual Berkualitas Tinggi

export const PENYISIHAN_A_ENGLISH: QuestionItem[] = [
  {
    id: 'PENY-A-ENG-01',
    number: 1,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What color is the sun usually?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Sun Color',
        '#F59E0B',
        `<g transform="translate(130, 15)">
          <circle cx="70" cy="70" r="42" fill="#FBBF24" stroke="#F59E0B" stroke-width="4"/>
          <line x1="70" y1="12" x2="70" y2="24" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
          <line x1="70" y1="116" x2="70" y2="128" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
          <line x1="12" y1="70" x2="24" y2="70" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
          <line x1="116" y1="70" x2="128" y2="70" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
          <line x1="28" y1="28" x2="38" y2="38" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
          <line x1="102" y1="102" x2="112" y2="112" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
          <line x1="28" y1="112" x2="38" y2="102" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
          <line x1="102" y1="38" x2="112" y2="28" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
          <circle cx="58" cy="62" r="5" fill="#78350F"/>
          <circle cx="82" cy="62" r="5" fill="#78350F"/>
          <path d="M 58 76 Q 70 88 82 76" stroke="#78350F" stroke-width="3" fill="none" stroke-linecap="round"/>
          <text x="70" y="104" font-size="12" font-weight="900" fill="#B45309" text-anchor="middle">SUN</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Blue' },
      { key: 'B', text: 'Yellow' },
      { key: 'C', text: 'Green' },
      { key: 'D', text: 'Purple' }
    ],
    correctAnswer: 'B',
    explanation: 'Matahari pada umumnya tampak berwarna kuning cerah (Yellow).'
  },
  {
    id: 'PENY-A-ENG-02',
    number: 2,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What is “kucing” in English?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Animals: Kucing',
        '#EC4899',
        `<g transform="translate(130, 15)">
          <circle cx="70" cy="72" r="42" fill="#FCE7F3" stroke="#EC4899" stroke-width="3"/>
          <polygon points="40,46 30,16 60,34" fill="#F472B6" stroke="#DB2777" stroke-width="2"/>
          <polygon points="100,46 110,16 80,34" fill="#F472B6" stroke="#DB2777" stroke-width="2"/>
          <circle cx="56" cy="66" r="5" fill="#831843"/>
          <circle cx="84" cy="66" r="5" fill="#831843"/>
          <polygon points="70,76 65,72 75,72" fill="#DB2777"/>
          <path d="M 70 76 Q 64 84 56 82 M 70 76 Q 76 84 84 82" stroke="#831843" stroke-width="2.5" fill="none"/>
          <line x1="32" y1="72" x2="50" y2="74" stroke="#DB2777" stroke-width="2"/>
          <line x1="30" y1="80" x2="50" y2="78" stroke="#DB2777" stroke-width="2"/>
          <line x1="108" y1="72" x2="90" y2="74" stroke="#DB2777" stroke-width="2"/>
          <line x1="110" y1="80" x2="90" y2="78" stroke="#DB2777" stroke-width="2"/>
          <text x="70" y="104" font-size="13" font-weight="900" fill="#BE185D" text-anchor="middle">CAT</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Dog' },
      { key: 'B', text: 'Cat' },
      { key: 'C', text: 'Bird' },
      { key: 'D', text: 'Fish' }
    ],
    correctAnswer: 'B',
    explanation: 'Kata bahasa Inggris untuk "kucing" adalah "Cat".'
  },
  {
    id: 'PENY-A-ENG-03',
    number: 3,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'How many fingers are on one hand?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Counting Fingers',
        '#3B82F6',
        `<g transform="translate(130, 10)">
          <rect x="35" y="60" width="70" height="60" rx="16" fill="#BFDBFE" stroke="#3B82F6" stroke-width="3"/>
          <rect x="20" y="55" width="22" height="36" rx="10" fill="#93C5FD" stroke="#2563EB" stroke-width="2" transform="rotate(-30 30 70)"/>
          <rect x="42" y="20" width="14" height="48" rx="7" fill="#93C5FD" stroke="#2563EB" stroke-width="2"/>
          <rect x="58" y="14" width="14" height="54" rx="7" fill="#93C5FD" stroke="#2563EB" stroke-width="2"/>
          <rect x="74" y="20" width="14" height="48" rx="7" fill="#93C5FD" stroke="#2563EB" stroke-width="2"/>
          <rect x="90" y="32" width="13" height="38" rx="6" fill="#93C5FD" stroke="#2563EB" stroke-width="2"/>
          <circle cx="20" cy="52" r="8" fill="#1D4ED8"/><text x="20" y="56" font-size="10" font-weight="900" fill="#FFF" text-anchor="middle">1</text>
          <circle cx="49" cy="14" r="8" fill="#1D4ED8"/><text x="49" y="18" font-size="10" font-weight="900" fill="#FFF" text-anchor="middle">2</text>
          <circle cx="65" cy="8" r="8" fill="#1D4ED8"/><text x="65" y="12" font-size="10" font-weight="900" fill="#FFF" text-anchor="middle">3</text>
          <circle cx="81" cy="14" r="8" fill="#1D4ED8"/><text x="81" y="18" font-size="10" font-weight="900" fill="#FFF" text-anchor="middle">4</text>
          <circle cx="97" cy="26" r="8" fill="#1D4ED8"/><text x="97" y="30" font-size="10" font-weight="900" fill="#FFF" text-anchor="middle">5</text>
          <text x="70" y="100" font-size="16" font-weight="900" fill="#1E40AF" text-anchor="middle">5 FINGERS</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Three' },
      { key: 'B', text: 'Four' },
      { key: 'C', text: 'Five' },
      { key: 'D', text: 'Six' }
    ],
    correctAnswer: 'C',
    explanation: 'Pada satu tangan manusia terdapat lima (Five) jari: ibu jari, telunjuk, tengah, manis, kelingking.'
  },
  {
    id: 'PENY-A-ENG-04',
    number: 4,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What do we say in the morning?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Daily Greetings',
        '#F97316',
        `<g transform="translate(100, 15)">
          <path d="M 10 95 Q 100 35 190 95 Z" fill="#FED7AA"/>
          <circle cx="100" cy="50" r="30" fill="#F97316"/>
          <rect x="0" y="85" width="200" height="20" fill="#84CC16" rx="4"/>
          <text x="100" y="120" font-size="14" font-weight="900" fill="#C2410C" text-anchor="middle">GOOD MORNING 🌅</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Good night' },
      { key: 'B', text: 'Good morning' },
      { key: 'C', text: 'Goodbye' },
      { key: 'D', text: 'Thank you' }
    ],
    correctAnswer: 'B',
    explanation: 'Ucapan salam saat pagi hari adalah "Good morning" (Selamat pagi).'
  },
  {
    id: 'PENY-A-ENG-05',
    number: 5,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Which animal says “woof”?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Animal Sounds',
        '#8B5CF6',
        `<g transform="translate(120, 15)">
          <circle cx="65" cy="70" r="38" fill="#EDE9FE" stroke="#8B5CF6" stroke-width="3"/>
          <ellipse cx="35" cy="55" rx="10" ry="24" fill="#DDD6FE" stroke="#7C3AED" stroke-width="2"/>
          <ellipse cx="95" cy="55" rx="10" ry="24" fill="#DDD6FE" stroke="#7C3AED" stroke-width="2"/>
          <circle cx="54" cy="66" r="4.5" fill="#4C1D95"/>
          <circle cx="76" cy="66" r="4.5" fill="#4C1D95"/>
          <ellipse cx="65" cy="76" rx="8" ry="6" fill="#5B21B6"/>
          <rect x="110" y="25" width="60" height="32" rx="8" fill="#FBBF24"/>
          <polygon points="110,40 100,45 110,48" fill="#FBBF24"/>
          <text x="140" y="46" font-size="11" font-weight="900" fill="#78350F" text-anchor="middle">WOOF!</text>
          <text x="65" y="125" font-size="13" font-weight="900" fill="#6D28D9" text-anchor="middle">DOG 🐶</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Cat' },
      { key: 'B', text: 'Cow' },
      { key: 'C', text: 'Dog' },
      { key: 'D', text: 'Duck' }
    ],
    correctAnswer: 'C',
    explanation: 'Suara gonggongan "woof" adalah suara anjing (Dog).'
  },
  {
    id: 'PENY-A-ENG-06',
    number: 6,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What color is grass?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Nature Colors: Grass',
        '#10B981',
        `<g transform="translate(110, 20)">
          <path d="M 20 85 L 30 25 L 40 85 L 55 18 L 70 85 L 85 30 L 100 85 L 115 15 L 130 85 L 145 28 L 160 85 Z" fill="#22C55E" stroke="#15803D" stroke-width="2"/>
          <rect x="10" y="85" width="160" height="15" fill="#16A34A" rx="4"/>
          <text x="90" y="120" font-size="15" font-weight="900" fill="#15803D" text-anchor="middle">GREEN 🌿</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Green' },
      { key: 'B', text: 'Red' },
      { key: 'C', text: 'Black' },
      { key: 'D', text: 'Pink' }
    ],
    correctAnswer: 'A',
    explanation: 'Rumput pada umumnya berwarna hijau (Green).'
  },
  {
    id: 'PENY-A-ENG-07',
    number: 7,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What is “apel” in English?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Fruits: Apel',
        '#EF4444',
        `<g transform="translate(135, 15)">
          <path d="M 50 25 C 20 25 10 55 10 75 C 10 100 35 110 50 110 C 65 110 90 100 90 75 C 90 55 80 25 50 25 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>
          <path d="M 50 25 Q 52 10 60 5" stroke="#78350F" stroke-width="3.5" fill="none" stroke-linecap="round"/>
          <ellipse cx="65" cy="12" rx="10" ry="5" fill="#22C55E" transform="rotate(-20 65 12)"/>
          <text x="50" y="75" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">APPLE</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Apple' },
      { key: 'B', text: 'Orange' },
      { key: 'C', text: 'Banana' },
      { key: 'D', text: 'Mango' }
    ],
    correctAnswer: 'A',
    explanation: 'Bahasa Inggris dari kata "apel" adalah "Apple".'
  },
  {
    id: 'PENY-A-ENG-08',
    number: 8,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'How many eyes do you have?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Body Parts: Eyes',
        '#06B6D4',
        `<g transform="translate(100, 20)">
          <!-- Left Eye -->
          <ellipse cx="50" cy="55" rx="35" ry="24" fill="#FFFFFF" stroke="#0891B2" stroke-width="3"/>
          <circle cx="50" cy="55" r="14" fill="#0284C7"/>
          <circle cx="50" cy="55" r="7" fill="#0F172A"/>
          <circle cx="47" cy="51" r="3" fill="#FFFFFF"/>
          <text x="50" y="24" font-size="13" font-weight="900" fill="#0891B2" text-anchor="middle">Eye 1</text>
          
          <!-- Right Eye -->
          <ellipse cx="140" cy="55" rx="35" ry="24" fill="#FFFFFF" stroke="#0891B2" stroke-width="3"/>
          <circle cx="140" cy="55" r="14" fill="#0284C7"/>
          <circle cx="140" cy="55" r="7" fill="#0F172A"/>
          <circle cx="137" cy="51" r="3" fill="#FFFFFF"/>
          <text x="140" y="24" font-size="13" font-weight="900" fill="#0891B2" text-anchor="middle">Eye 2</text>
          <text x="95" y="110" font-size="14" font-weight="900" fill="#0E7490" text-anchor="middle">TWO EYES (2)</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'One' },
      { key: 'B', text: 'Two' },
      { key: 'C', text: 'Three' },
      { key: 'D', text: 'Four' }
    ],
    correctAnswer: 'B',
    explanation: 'Manusia memiliki 2 (Two) mata untuk melihat.'
  },
  {
    id: 'PENY-A-ENG-09',
    number: 9,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Complete the sentence:\n“My name ___ Budi.”',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Self Introduction',
        '#6366F1',
        `<g transform="translate(110, 15)">
          <circle cx="85" cy="40" r="26" fill="#FEE2E2"/>
          <rect x="60" y="70" width="50" height="35" rx="8" fill="#4F46E5"/>
          <rect x="20" y="105" width="130" height="30" rx="10" fill="#EEF2FF" stroke="#6366F1" stroke-width="2"/>
          <text x="85" y="125" font-size="12" font-weight="800" fill="#3730A3" text-anchor="middle">"My name is Budi"</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'am' },
      { key: 'B', text: 'are' },
      { key: 'C', text: 'is' },
      { key: 'D', text: 'be' }
    ],
    correctAnswer: 'C',
    explanation: 'Kata kerja bantu (to be) yang tepat untuk "My name" adalah "is". Kalimat lengkap: "My name is Budi."'
  },
  {
    id: 'PENY-A-ENG-10',
    number: 10,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Which one is a fruit?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Vocabulary: Fruit',
        '#E11D48',
        `<g transform="translate(90, 20)">
          <!-- Apple (Fruit) -->
          <circle cx="50" cy="50" r="30" fill="#EF4444"/>
          <text x="50" y="55" font-size="11" font-weight="900" fill="#FFF" text-anchor="middle">APPLE</text>
          <text x="50" y="95" font-size="11" font-weight="bold" fill="#15803D" text-anchor="middle">✓ FRUIT</text>
          
          <!-- Chair (Furniture) -->
          <rect x="130" y="30" width="30" height="35" fill="#CBD5E1" stroke="#64748B" stroke-width="2"/>
          <line x1="135" y1="65" x2="135" y2="85" stroke="#64748B" stroke-width="3"/>
          <line x1="155" y1="65" x2="155" y2="85" stroke="#64748B" stroke-width="3"/>
          <text x="145" y="95" font-size="11" font-weight="bold" fill="#94A3B8" text-anchor="middle">CHAIR</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Apple' },
      { key: 'B', text: 'Chair' },
      { key: 'C', text: 'Pencil' },
      { key: 'D', text: 'Book' }
    ],
    correctAnswer: 'A',
    explanation: 'Apple (apel) adalah buah (fruit), sedangkan Chair (kursi), Pencil (pensil), dan Book (buku) adalah benda mati.'
  },
  {
    id: 'PENY-A-ENG-11',
    number: 11,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What is the English word for “merah”?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Color: Merah',
        '#DC2626',
        `<g transform="translate(130, 15)">
          <circle cx="70" cy="65" r="45" fill="#EF4444" stroke="#B91C1C" stroke-width="4"/>
          <text x="70" y="72" font-size="20" font-weight="900" fill="#FFFFFF" text-anchor="middle">RED</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Blue' },
      { key: 'B', text: 'Yellow' },
      { key: 'C', text: 'Red' },
      { key: 'D', text: 'Green' }
    ],
    correctAnswer: 'C',
    explanation: 'Warna "merah" dalam bahasa Inggris disebut "Red".'
  },
  {
    id: 'PENY-A-ENG-12',
    number: 12,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What animal can swim?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Animals: Swimming',
        '#0284C7',
        `<g transform="translate(120, 20)">
          <!-- Fish -->
          <ellipse cx="65" cy="55" rx="42" ry="26" fill="#38BDF8" stroke="#0284C7" stroke-width="3"/>
          <polygon points="105,55 130,35 130,75" fill="#0284C7"/>
          <circle cx="45" cy="48" r="5" fill="#0F172A"/>
          <circle cx="43" cy="46" r="2" fill="#FFFFFF"/>
          <circle cx="25" cy="38" r="4" fill="#E0F2FE"/>
          <circle cx="18" cy="25" r="3" fill="#E0F2FE"/>
          <text x="70" y="105" font-size="14" font-weight="900" fill="#0369A1" text-anchor="middle">FISH CAN SWIM 🐟</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Fish' },
      { key: 'B', text: 'Cat' },
      { key: 'C', text: 'Chicken' },
      { key: 'D', text: 'Rabbit' }
    ],
    correctAnswer: 'A',
    explanation: 'Fish (ikan) adalah hewan yang hidup di air dan dapat berenang (can swim).'
  },
  {
    id: 'PENY-A-ENG-13',
    number: 13,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What is the number after 3?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Number Sequence',
        '#8B5CF6',
        `<g transform="translate(70, 25)">
          <circle cx="40" cy="50" r="24" fill="#EDE9FE" stroke="#8B5CF6" stroke-width="2"/>
          <text x="40" y="58" font-size="20" font-weight="900" fill="#6D28D9" text-anchor="middle">2</text>
          
          <circle cx="110" cy="50" r="24" fill="#EDE9FE" stroke="#8B5CF6" stroke-width="2"/>
          <text x="110" y="58" font-size="20" font-weight="900" fill="#6D28D9" text-anchor="middle">3</text>
          
          <line x1="140" y1="50" x2="170" y2="50" stroke="#7C3AED" stroke-width="3" stroke-dasharray="4"/>
          
          <circle cx="200" cy="50" r="28" fill="#FBBF24" stroke="#D97706" stroke-width="3"/>
          <text x="200" y="60" font-size="24" font-weight="900" fill="#78350F" text-anchor="middle">4</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '2' },
      { key: 'B', text: '4' },
      { key: 'C', text: '5' },
      { key: 'D', text: '6' }
    ],
    correctAnswer: 'B',
    explanation: 'Setelah angka 3 (Three) adalah angka 4 (Four).'
  },
  {
    id: 'PENY-A-ENG-14',
    number: 14,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Which body part do we use to see?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Five Senses: Sight',
        '#0284C7',
        `<g transform="translate(130, 15)">
          <ellipse cx="70" cy="65" rx="55" ry="32" fill="#FFFFFF" stroke="#0284C7" stroke-width="4"/>
          <circle cx="70" cy="65" r="20" fill="#0EA5E9"/>
          <circle cx="70" cy="65" r="10" fill="#0F172A"/>
          <circle cx="66" cy="60" r="4" fill="#FFFFFF"/>
          <text x="70" y="115" font-size="14" font-weight="900" fill="#0369A1" text-anchor="middle">EYE (MATA) 👀</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Nose' },
      { key: 'B', text: 'Ear' },
      { key: 'C', text: 'Eye' },
      { key: 'D', text: 'Hand' }
    ],
    correctAnswer: 'C',
    explanation: 'Bagian tubuh yang kita gunakan untuk melihat (to see) adalah mata (Eye).'
  },
  {
    id: 'PENY-A-ENG-15',
    number: 15,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What do you say when someone helps you?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Good Manners',
        '#10B981',
        `<g transform="translate(90, 20)">
          <rect x="20" y="20" width="180" height="55" rx="14" fill="#ECFDF5" stroke="#10B981" stroke-width="3"/>
          <polygon points="110,75 100,90 120,75" fill="#ECFDF5"/>
          <text x="110" y="55" font-size="16" font-weight="900" fill="#047857" text-anchor="middle">“THANK YOU!” 🙏</text>
          <text x="110" y="110" font-size="12" font-weight="bold" fill="#065F46" text-anchor="middle">Say when helped</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Sorry' },
      { key: 'B', text: 'Goodbye' },
      { key: 'C', text: 'Thank you' },
      { key: 'D', text: 'Good night' }
    ],
    correctAnswer: 'C',
    explanation: 'Saat seseorang membantu kita, ungkapan sopan yang kita katakan adalah "Thank you" (Terima kasih).'
  },
  {
    id: 'PENY-A-ENG-16',
    number: 16,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Which one is a school object?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'School Supplies',
        '#F59E0B',
        `<g transform="translate(110, 15)">
          <polygon points="30,85 130,25 145,35 45,95" fill="#FBBF24" stroke="#D97706" stroke-width="2"/>
          <polygon points="20,95 30,85 45,95" fill="#FED7AA"/>
          <circle cx="22" cy="93" r="3" fill="#1E293B"/>
          <rect x="135" y="22" width="16" height="16" rx="3" fill="#F472B6" transform="rotate(30 143 30)"/>
          <text x="90" y="118" font-size="14" font-weight="900" fill="#92400E" text-anchor="middle">PENCIL ✏️</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Pencil' },
      { key: 'B', text: 'Banana' },
      { key: 'C', text: 'Tiger' },
      { key: 'D', text: 'Apple' }
    ],
    correctAnswer: 'A',
    explanation: 'Pencil (pensil) adalah benda/alat perlengkapan sekolah (school object).'
  },
  {
    id: 'PENY-A-ENG-17',
    number: 17,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What is “anjing” in English?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Animals: Anjing',
        '#3B82F6',
        `<g transform="translate(130, 15)">
          <circle cx="70" cy="65" r="40" fill="#DBEAFE" stroke="#3B82F6" stroke-width="3"/>
          <ellipse cx="40" cy="50" rx="9" ry="20" fill="#93C5FD"/>
          <ellipse cx="100" cy="50" rx="9" ry="20" fill="#93C5FD"/>
          <circle cx="58" cy="60" r="4.5" fill="#1E3A8A"/>
          <circle cx="82" cy="60" r="4.5" fill="#1E3A8A"/>
          <ellipse cx="70" cy="72" rx="7" ry="5" fill="#1D4ED8"/>
          <text x="70" y="118" font-size="14" font-weight="900" fill="#1D4ED8" text-anchor="middle">DOG 🐕</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Cat' },
      { key: 'B', text: 'Dog' },
      { key: 'C', text: 'Horse' },
      { key: 'D', text: 'Bird' }
    ],
    correctAnswer: 'B',
    explanation: 'Kata bahasa Inggris untuk "anjing" adalah "Dog".'
  },
  {
    id: 'PENY-A-ENG-18',
    number: 18,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Complete the sentence:\n“This is my ___.”\n👃',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Face Parts: Nose',
        '#EC4899',
        `<g transform="translate(130, 15)">
          <circle cx="70" cy="70" r="45" fill="#FDF2F8" stroke="#F472B6" stroke-width="2"/>
          <!-- Nose Icon -->
          <path d="M 68 40 L 78 72 Q 74 78 62 78 Q 54 78 54 72" stroke="#DB2777" stroke-width="4" fill="none" stroke-linecap="round"/>
          <ellipse cx="60" cy="74" rx="4" ry="2.5" fill="#BE185D"/>
          <text x="70" y="112" font-size="15" font-weight="900" fill="#9D174D" text-anchor="middle">NOSE (HIDUNG) 👃</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Eye' },
      { key: 'B', text: 'Nose' },
      { key: 'C', text: 'Ear' },
      { key: 'D', text: 'Hand' }
    ],
    correctAnswer: 'B',
    explanation: 'Gambar tersebut adalah hidung. Dalam bahasa Inggris adalah "Nose". Kalimat: "This is my nose."'
  },
  {
    id: 'PENY-A-ENG-19',
    number: 19,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What color is a banana usually?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Banana Color',
        '#FACC15',
        `<g transform="translate(120, 20)">
          <path d="M 30 75 Q 80 110 130 35 Q 85 80 30 75 Z" fill="#FDE047" stroke="#CA8A04" stroke-width="3"/>
          <rect x="25" y="73" width="8" height="6" fill="#713F12" rx="2"/>
          <rect x="127" y="32" width="7" height="6" fill="#854D0E" rx="2"/>
          <text x="80" y="115" font-size="14" font-weight="900" fill="#A16207" text-anchor="middle">YELLOW 🍌</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Yellow' },
      { key: 'B', text: 'Blue' },
      { key: 'C', text: 'Black' },
      { key: 'D', text: 'Purple' }
    ],
    correctAnswer: 'A',
    explanation: 'Pisang matang pada umumnya berwarna kuning cerah (Yellow).'
  },
  {
    id: 'PENY-A-ENG-20',
    number: 20,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Choose the correct answer:\n“How are you?”',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg(
        'Penyisihan TK',
        'Conversation: How are you?',
        '#10B981',
        `<g transform="translate(80, 20)">
          <rect x="10" y="15" width="110" height="40" rx="10" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
          <text x="65" y="40" font-size="11" font-weight="bold" fill="#0369A1" text-anchor="middle">"How are you?"</text>
          
          <rect x="140" y="45" width="110" height="40" rx="10" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/>
          <text x="195" y="70" font-size="11" font-weight="900" fill="#15803D" text-anchor="middle">"I am fine." ✓</text>
        </g>`
      );
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'I am fine.' },
      { key: 'B', text: 'My name is Rina.' },
      { key: 'C', text: 'Good night.' },
      { key: 'D', text: 'Thank you.' }
    ],
    correctAnswer: 'A',
    explanation: 'Jawaban yang tepat saat ditanya "How are you?" (Bagaimana kabarmu?) adalah "I am fine." (Saya baik-baik saja).'
  }
];
