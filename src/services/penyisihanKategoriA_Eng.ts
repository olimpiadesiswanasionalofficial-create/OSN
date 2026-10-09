import { QuestionItem } from './cbtQuestionTypes';
import { createPenyisihanSvg } from './simulasiSvgIllustrations';

// SOAL RESMI BABAK PENYISIHAN: BAHASA INGGRIS PAUD/TK (Kategori A)
// 20 Soal Pilihan Ganda Kurikulum Campuran (Merdeka, Cambridge, Singapore, IB)
// Tingkat Kesulitan: Menengah | 100% Bergambar & Unik

export const PENYISIHAN_A_ENGLISH: QuestionItem[] = [
  // --- KURIKULUM MERDEKA (Soal 1 - 5) ---
  {
    id: 'PENY-A-ENG-01',
    number: 1,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Look at the picture! What color is this fresh sunflower? (Warna bunga matahari)',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Colors', 'Yellow Sunflower', '#EAB308',
        `<g transform="translate(110, 20)">
          <text x="50" y="65" font-size="44">🌻</text>
          <text x="120" y="65" font-size="28" font-weight="900" fill="#CA8A04">Y E L L O W</text>
          <text x="85" y="115" font-size="12" font-weight="800" fill="#854D0E" text-anchor="middle">Bright Sunflower</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Yellow (Kuning)' },
      { key: 'B', text: 'Blue (Biru)' },
      { key: 'C', text: 'Red (Merah)' }
    ],
    correctAnswer: 'A',
    explanation: 'Bunga matahari berwarna kuning cerah, dalam bahasa Inggris adalah "Yellow".'
  },
  {
    id: 'PENY-A-ENG-02',
    number: 2,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'What is this friendly pet that says "Meow"? (Hewan peliharaan lucu)',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Animals', 'Cute Pet Cat', '#0284C7',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">🐱</text>
          <text x="120" y="65" font-size="30" font-weight="900" fill="#0284C7">C - A - T</text>
          <text x="85" y="115" font-size="12" font-weight="800" fill="#0369A1" text-anchor="middle">Purring Pet</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Cat' },
      { key: 'B', text: 'Cow' },
      { key: 'C', text: 'Duck' }
    ],
    correctAnswer: 'A',
    explanation: 'Kucing dalam bahasa Inggris adalah "Cat".'
  },
  {
    id: 'PENY-A-ENG-03',
    number: 3,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Look at the classroom object! What do we use to carry our books to school?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · School Bag', 'School Bag for Books', '#9333EA',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">🎒</text>
          <text x="120" y="65" font-size="30" font-weight="900" fill="#7E22CE">B - A - G</text>
          <text x="85" y="115" font-size="12" font-weight="800" fill="#6B21A8" text-anchor="middle">School Backpack</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Bag (Tas)' },
      { key: 'B', text: 'Chair (Kursi)' },
      { key: 'C', text: 'Table (Meja)' }
    ],
    correctAnswer: 'A',
    explanation: 'Tas sekolah dalam bahasa Inggris adalah "Bag" (school bag/backpack).'
  },
  {
    id: 'PENY-A-ENG-04',
    number: 4,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Count the red balloons! How many balloons are in the sky? (Jumlah balon udara)',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Number Words', 'Four Red Balloons', '#DC2626',
        `<g transform="translate(70, 20)">
          <text x="30" y="65" font-size="36">🎈</text>
          <text x="80" y="65" font-size="36">🎈</text>
          <text x="130" y="65" font-size="36">🎈</text>
          <text x="180" y="65" font-size="36">🎈</text>
          <text x="110" y="115" font-size="13" font-weight="900" fill="#B91C1C" text-anchor="middle">Count: 1, 2, 3, 4</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Three balloons' },
      { key: 'B', text: 'Four balloons' },
      { key: 'C', text: 'Five balloons' }
    ],
    correctAnswer: 'B',
    explanation: 'Terdapat 4 buah balon (Four balloons).'
  },
  {
    id: 'PENY-A-ENG-05',
    number: 5,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Look at the smiling boy! Which body part does he use to SEE colorful toys? (Bagian tubuh untuk melihat)',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Body Parts', 'Eyes for Seeing', '#2563EB',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">👀</text>
          <text x="120" y="65" font-size="28" font-weight="900" fill="#1D4ED8">E Y E S</text>
          <text x="85" y="115" font-size="12" font-weight="800" fill="#1E3A8A" text-anchor="middle">Sense of Sight</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Eyes (Mata)' },
      { key: 'B', text: 'Ears (Telinga)' },
      { key: 'C', text: 'Nose (Hidung)' }
    ],
    correctAnswer: 'A',
    explanation: 'Mata dalam bahasa Inggris adalah "Eyes", digunakan untuk melihat (to see).'
  },

  // --- CAMBRIDGE EARLY YEARS (Soal 6 - 10) ---
  {
    id: 'PENY-A-ENG-06',
    number: 6,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Cambridge Phonics: What is the beginning letter sound of "SUN" (Matahari)?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Phonics Sound', 'Letter Sound S for Sun', '#EA580C',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">☀️</text>
          <text x="120" y="65" font-size="34" font-weight="900" fill="#EA580C">_ U N</text>
          <text x="85" y="115" font-size="12" font-weight="800" fill="#9A3412" text-anchor="middle">Initial Letter Sound</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Letter S' },
      { key: 'B', text: 'Letter M' },
      { key: 'C', text: 'Letter T' }
    ],
    correctAnswer: 'A',
    explanation: 'Kata "Sun" (matahari) diawali oleh huruf S dengan bunyi fonik /s/.'
  },
  {
    id: 'PENY-A-ENG-07',
    number: 7,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Look at the picture! The big brown animal that roars loudly in the forest is a ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Wild Animals', 'King Lion', '#D97706',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">🦁</text>
          <text x="120" y="65" font-size="28" font-weight="900" fill="#B45309">L I O N</text>
          <text x="85" y="115" font-size="12" font-weight="800" fill="#78350F" text-anchor="middle">King of the Jungle</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Lion (Singa)' },
      { key: 'B', text: 'Rabbit (Kelinci)' },
      { key: 'C', text: 'Fish (Ikan)' }
    ],
    correctAnswer: 'A',
    explanation: 'Singa dalam bahasa Inggris adalah "Lion".'
  },
  {
    id: 'PENY-A-ENG-08',
    number: 8,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Cambridge Social Phrases: When teacher enters the classroom in the morning, what do pupils say?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Classroom Greeting', 'Teacher Greeting', '#16A34A',
        `<g transform="translate(90, 20)">
          <text x="50" y="65" font-size="40">👩‍🏫</text>
          <text x="110" y="65" font-size="26">💬</text>
          <text x="160" y="65" font-size="40">👦👧</text>
          <text x="105" y="115" font-size="12" font-weight="800" fill="#15803D" text-anchor="middle">Good Morning Teacher!</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Good morning, Teacher!' },
      { key: 'B', text: 'Good night, Teacher!' },
      { key: 'C', text: 'Goodbye, Teacher!' }
    ],
    correctAnswer: 'A',
    explanation: 'Ucapan salam pagi hari kepada guru adalah "Good morning, Teacher!".'
  },
  {
    id: 'PENY-A-ENG-09',
    number: 9,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Opposite Word: An airplane flies UP high, while a submarine dives ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Opposites', 'Up vs Down Direction', '#0284C7',
        `<g transform="translate(90, 20)">
          <text x="40" y="45" font-size="34">✈️ UP (Atas)</text>
          <text x="40" y="95" font-size="34">⚓ DOWN (Bawah)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Down' },
      { key: 'B', text: 'Hot' },
      { key: 'C', text: 'Fast' }
    ],
    correctAnswer: 'A',
    explanation: 'Lawan kata dari "Up" (ke atas) adalah "Down" (ke bawah).'
  },
  {
    id: 'PENY-A-ENG-10',
    number: 10,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Healthy Habits: Which delicious fruit is rich in vitamin C and has a yellow peel? (Buah pisang)',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Fruits', 'Yellow Banana', '#CA8A04',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">🍌</text>
          <text x="120" y="65" font-size="26" font-weight="900" fill="#A16207">B A N A N A</text>
          <text x="85" y="115" font-size="12" font-weight="800" fill="#713F12" text-anchor="middle">Sweet Yellow Fruit</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Banana' },
      { key: 'B', text: 'Tomato' },
      { key: 'C', text: 'Carrot' }
    ],
    correctAnswer: 'A',
    explanation: 'Pisang dalam bahasa Inggris adalah "Banana".'
  },

  // --- SINGAPORE EARLY LANGUAGE CURRICULUM (Soal 11 - 15) ---
  {
    id: 'PENY-A-ENG-11',
    number: 11,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Singapore CPA English: Complete the phrase. "A red ... that drives on the road." (Mobil merah)',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Vehicles', 'Red Car on Road', '#EF4444',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">🚗</text>
          <text x="120" y="65" font-size="30" font-weight="900" fill="#DC2626">C - A - R</text>
          <text x="85" y="115" font-size="12" font-weight="800" fill="#991B1B" text-anchor="middle">Vehicle on Wheels</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Car' },
      { key: 'B', text: 'Boat' },
      { key: 'C', text: 'Plane' }
    ],
    correctAnswer: 'A',
    explanation: 'Mobil dalam bahasa Inggris adalah "Car".'
  },
  {
    id: 'PENY-A-ENG-12',
    number: 12,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Look at the shape! Which word describes this shape with three corners? (Segitiga)',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Shapes', 'Triangle Shape', '#2563EB',
        `<g transform="translate(100, 20)">
          <polygon points="50,25 20,85 80,85" fill="#BFDBFE" stroke="#1D4ED8" stroke-width="3"/>
          <text x="140" y="65" font-size="20" font-weight="900" fill="#1E40AF">TRIANGLE</text>
          <text x="95" y="115" font-size="12" font-weight="800" fill="#1E3A8A" text-anchor="middle">3 Straight Sides</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Triangle' },
      { key: 'B', text: 'Circle' },
      { key: 'C', text: 'Square' }
    ],
    correctAnswer: 'A',
    explanation: 'Segitiga dalam bahasa Inggris adalah "Triangle".'
  },
  {
    id: 'PENY-A-ENG-13',
    number: 13,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Action Word (Verb): What is the happy frog doing on the pond leaf? (Melompat)',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Action Words', 'Frog Jumping', '#16A34A',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">🐸</text>
          <text x="120" y="65" font-size="28" font-weight="900" fill="#15803D">J U M P</text>
          <text x="85" y="115" font-size="12" font-weight="800" fill="#14532D" text-anchor="middle">Hopping Action</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Jump (Melompat)' },
      { key: 'B', text: 'Sleep (Tidur)' },
      { key: 'C', text: 'Read (Membaca)' }
    ],
    correctAnswer: 'A',
    explanation: 'Katak bergerak dengan cara melompat (Jump).'
  },
  {
    id: 'PENY-A-ENG-14',
    number: 14,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Time of Day: When the silver moon and bright stars appear in the dark sky, it is ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Day and Night', 'Night Sky with Moon', '#312E81',
        `<g transform="translate(100, 20)">
          <rect x="20" y="20" width="160" height="75" rx="12" fill="#1E1B4B"/>
          <text x="60" y="65" font-size="36">🌙</text>
          <text x="120" y="65" font-size="28">⭐✨</text>
          <text x="100" y="120" font-size="12" font-weight="900" fill="#312E81" text-anchor="middle">Dark Sky Time</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Night (Malam)' },
      { key: 'B', text: 'Morning (Pagi)' },
      { key: 'C', text: 'Afternoon (Siang)' }
    ],
    correctAnswer: 'A',
    explanation: 'Saat bulan dan bintang tampak di langit gelap adalah waktu malam hari (Night).'
  },
  {
    id: 'PENY-A-ENG-15',
    number: 15,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Preposition of Place: Where is the red ball? (Bola berada di atas meja)',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Prepositions', 'Ball ON the Table', '#059669',
        `<g transform="translate(110, 20)">
          <!-- Bola di atas meja -->
          <circle cx="80" cy="35" r="14" fill="#EF4444"/>
          <!-- Meja -->
          <rect x="30" y="50" width="100" height="10" rx="3" fill="#D97706"/>
          <line x1="45" y1="60" x2="45" y2="90" stroke="#B45309" stroke-width="4"/>
          <line x1="115" y1="60" x2="115" y2="90" stroke="#B45309" stroke-width="4"/>
          <text x="80" y="115" font-size="12" font-weight="800" fill="#047857" text-anchor="middle">ON the table</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'ON the table (Di atas meja)' },
      { key: 'B', text: 'UNDER the table (Di bawah meja)' },
      { key: 'C', text: 'IN the box (Di dalam kotak)' }
    ],
    correctAnswer: 'A',
    explanation: 'Bola diletakkan menempel di permukaan atas meja (ON the table).'
  },

  // --- INTERNATIONAL BACCALAUREATE (IB PYP) (Soal 16 - 20) ---
  {
    id: 'PENY-A-ENG-16',
    number: 16,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'IB Caring for Animals: What do pet dogs love to eat? (Makanan kesukaan anjing peliharaan)',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Animal Needs', 'Dog and Bone', '#B45309',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">🐶</text>
          <text x="120" y="65" font-size="34">🦴</text>
          <text x="85" y="115" font-size="12" font-weight="900" fill="#92400E" text-anchor="middle">Dog Loves Bone</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Bone (Tulang)' },
      { key: 'B', text: 'Grass (Rumput)' },
      { key: 'C', text: 'Leaves (Dedaunan)' }
    ],
    correctAnswer: 'A',
    explanation: 'Anjing menyukai tulang (Bone) atau makanan daging olahan khusus hewan.'
  },
  {
    id: 'PENY-A-ENG-17',
    number: 17,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'IB Social Interaction: When someone gives you a gift, what polite words do you say?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Courtesy Words', 'Thank You Appreciation', '#DB2777',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">🎁</text>
          <text x="120" y="65" font-size="22" font-weight="900" fill="#BE185D">"Thank You!"</text>
          <text x="85" y="115" font-size="12" font-weight="800" fill="#9D174D" text-anchor="middle">Gratitude & Politeness</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Thank you!' },
      { key: 'B', text: 'Sorry!' },
      { key: 'C', text: 'Stop!' }
    ],
    correctAnswer: 'A',
    explanation: 'Saat menerima pemberian atau hadiah, kita mengucapkan "Thank you!" (Terima kasih).'
  },
  {
    id: 'PENY-A-ENG-18',
    number: 18,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'IB Family Concept: Who is the caring man who loves and guides us at home? (Ayah)',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Family Member', 'Loving Father', '#0284C7',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">👨</text>
          <text x="120" y="65" font-size="26" font-weight="900" fill="#0369A1">F A T H E R</text>
          <text x="85" y="115" font-size="12" font-weight="800" fill="#075985" text-anchor="middle">Beloved Father</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Father (Ayah)' },
      { key: 'B', text: 'Sister (Saudari)' },
      { key: 'C', text: 'Baby (Bayi)' }
    ],
    correctAnswer: 'A',
    explanation: 'Ayah dalam bahasa Inggris adalah "Father".'
  },
  {
    id: 'PENY-A-ENG-19',
    number: 19,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'IB Weather Inquiry: Look at the sky! There are white clouds and rain falling down. What weather is it?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Weather Types', 'Rainy Weather Cloud', '#2563EB',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">🌧️</text>
          <text x="120" y="65" font-size="28" font-weight="900" fill="#1D4ED8">R A I N Y</text>
          <text x="85" y="115" font-size="12" font-weight="800" fill="#1E3A8A" text-anchor="middle">Rainy Weather</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Rainy (Hujan)' },
      { key: 'B', text: 'Sunny (Cerah)' },
      { key: 'C', text: 'Windy (Berangin)' }
    ],
    correctAnswer: 'A',
    explanation: 'Cuaca hujan saat air turun dari awan dalam bahasa Inggris adalah "Rainy".'
  },
  {
    id: 'PENY-A-ENG-20',
    number: 20,
    category: 'Kategori A',
    subject: 'Bahasa Inggris',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'IB Music & Sound: Which musical instrument has keys that produce sweet melodies? (Piano)',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Instruments', 'Musical Piano Instrument', '#4338CA',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">🎹</text>
          <text x="120" y="65" font-size="28" font-weight="900" fill="#3730A3">P I A N O</text>
          <text x="85" y="115" font-size="12" font-weight="800" fill="#312E81" text-anchor="middle">Keyboard Melodies</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Piano' },
      { key: 'B', text: 'Drum' },
      { key: 'C', text: 'Flute' }
    ],
    correctAnswer: 'A',
    explanation: 'Alat musik tuts tuts piano dalam bahasa Inggris disebut "Piano".'
  }
];
