import { QuestionItem } from './cbtQuestionTypes';
import { createSimulasiSvg } from './simulasiSvgIllustrations';

// SOAL RESMI BABAK PENYISIHAN: BAHASA INGGRIS SD/MI (Kategori B)
// 20 Soal Lengkap Pilihan Ganda dengan Kunci Jawaban Resmi & Ilustrasi Visual

export const PENYISIHAN_B_ENGLISH: QuestionItem[] = [
  {
    id: 'PENY-B-ENG-01',
    number: 1,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What is the English word for “buku”?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'School Object: Buku', '#3B82F6',
        `<g transform="translate(130, 20)"><rect x="20" y="20" width="80" height="90" rx="8" fill="#3B82F6" stroke="#1D4ED8" stroke-width="3"/><path d="M 25 25 L 95 25 M 25 40 L 95 40 M 25 55 L 75 55" stroke="#FFFFFF" stroke-width="2.5"/><text x="60" y="85" font-size="13" font-weight="900" fill="#FFFFFF" text-anchor="middle">BOOK</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Book' }, { key: 'B', text: 'Bag' }, { key: 'C', text: 'Pen' }, { key: 'D', text: 'Table' }],
    correctAnswer: 'A',
    explanation: 'Kata bahasa Inggris untuk "buku" adalah "Book".'
  },
  {
    id: 'PENY-B-ENG-02',
    number: 2,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Choose the correct answer:\n“How are you?”',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Greetings', '#10B981',
        `<g transform="translate(100, 20)"><rect x="10" y="10" width="180" height="40" rx="10" fill="#ECFDF5" stroke="#10B981" stroke-width="2"/><text x="100" y="35" font-size="13" font-weight="bold" fill="#065F46" text-anchor="middle">"How are you?"</text><rect x="10" y="60" width="180" height="40" rx="10" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2"/><text x="100" y="85" font-size="13" font-weight="900" fill="#92400E" text-anchor="middle">"I am fine." ✓</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'My name is Rina.' }, { key: 'B', text: 'I am fine.' }, { key: 'C', text: 'Good night.' }, { key: 'D', text: 'See you tomorrow.' }],
    correctAnswer: 'B',
    explanation: 'Respon tepat terhadap pertanyaan kabar "How are you?" adalah "I am fine."'
  },
  {
    id: 'PENY-B-ENG-03',
    number: 3,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What color is the sky on a clear day?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'The Sky Color', '#0284C7',
        `<g transform="translate(110, 20)"><circle cx="80" cy="55" r="45" fill="#38BDF8"/><path d="M 40 70 Q 55 50 75 60 Q 95 45 115 65 Z" fill="#FFFFFF"/><text x="80" y="115" font-size="14" font-weight="900" fill="#0369A1" text-anchor="middle">BLUE SKY ☁️</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Green' }, { key: 'B', text: 'Blue' }, { key: 'C', text: 'Black' }, { key: 'D', text: 'Orange' }],
    correctAnswer: 'B',
    explanation: 'Langit pada hari yang cerah berwarna biru (Blue).'
  },
  {
    id: 'PENY-B-ENG-04',
    number: 4,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Complete the sentence:\n“She ___ a student.”',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Grammar: To Be', '#8B5CF6',
        `<g transform="translate(90, 25)"><rect x="10" y="20" width="200" height="60" rx="12" fill="#F3E8FF" stroke="#8B5CF6" stroke-width="2"/><text x="110" y="55" font-size="15" font-weight="900" fill="#6B21A8" text-anchor="middle">"She IS a student"</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'am' }, { key: 'B', text: 'are' }, { key: 'C', text: 'is' }, { key: 'D', text: 'be' }],
    correctAnswer: 'C',
    explanation: 'Subjek tunggal "She" menggunakan to be "is".'
  },
  {
    id: 'PENY-B-ENG-05',
    number: 5,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What is the opposite of “big”?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Opposites (Lawan Kata)', '#F59E0B',
        `<g transform="translate(90, 20)"><circle cx="50" cy="55" r="35" fill="#FBBF24"/><text x="50" y="60" font-size="12" font-weight="900" fill="#78350F" text-anchor="middle">BIG</text><text x="105" y="60" font-size="16" font-weight="900" fill="#92400E" text-anchor="middle">↔</text><circle cx="150" cy="55" r="16" fill="#FCD34D"/><text x="150" y="60" font-size="10" font-weight="900" fill="#78350F" text-anchor="middle">SMALL</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Tall' }, { key: 'B', text: 'Small' }, { key: 'C', text: 'Long' }, { key: 'D', text: 'Fast' }],
    correctAnswer: 'B',
    explanation: 'Lawan kata dari "big" (besar) adalah "small" (kecil).'
  },
  {
    id: 'PENY-B-ENG-06',
    number: 6,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Which one is an animal?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Animals Category', '#EA580C',
        `<g transform="translate(110, 20)"><circle cx="80" cy="55" r="42" fill="#FED7AA" stroke="#EA580C" stroke-width="3"/><text x="80" y="60" font-size="13" font-weight="900" fill="#9A3412" text-anchor="middle">TIGER 🐯</text><text x="80" y="115" font-size="12" font-weight="bold" fill="#C2410C" text-anchor="middle">Animal (Hewan)</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Chair' }, { key: 'B', text: 'Pencil' }, { key: 'C', text: 'Tiger' }, { key: 'D', text: 'Book' }],
    correctAnswer: 'C',
    explanation: 'Tiger (harimau) adalah hewan (animal).'
  },
  {
    id: 'PENY-B-ENG-07',
    number: 7,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Complete the sentence:\n“I ___ two brothers.”',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Have / Has', '#0D9488',
        `<g transform="translate(90, 25)"><rect x="15" y="20" width="190" height="60" rx="10" fill="#CCFBF1" stroke="#0D9488" stroke-width="2"/><text x="110" y="55" font-size="15" font-weight="900" fill="#115E59" text-anchor="middle">"I HAVE two brothers"</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'has' }, { key: 'B', text: 'have' }, { key: 'C', text: 'having' }, { key: 'D', text: 'am' }],
    correctAnswer: 'B',
    explanation: 'Subjek "I" berpasangan dengan "have" ("I have two brothers").'
  },
  {
    id: 'PENY-B-ENG-08',
    number: 8,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What is “Senin” in English?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Days of the Week', '#4F46E5',
        `<g transform="translate(100, 20)"><rect x="25" y="15" width="150" height="80" rx="12" fill="#EEF2FF" stroke="#4F46E5" stroke-width="2"/><rect x="25" y="15" width="150" height="25" fill="#4F46E5" rx="4"/><text x="100" y="32" font-size="11" font-weight="900" fill="#FFF" text-anchor="middle">CALENDAR</text><text x="100" y="70" font-size="18" font-weight="900" fill="#312E81" text-anchor="middle">MONDAY</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Sunday' }, { key: 'B', text: 'Monday' }, { key: 'C', text: 'Tuesday' }, { key: 'D', text: 'Friday' }],
    correctAnswer: 'B',
    explanation: 'Hari Senin dalam bahasa Inggris adalah "Monday".'
  },
  {
    id: 'PENY-B-ENG-09',
    number: 9,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Which sentence is correct?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Subject-Verb Agreement', '#16A34A',
        `<g transform="translate(90, 25)"><rect x="15" y="20" width="190" height="60" rx="10" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/><text x="110" y="55" font-size="15" font-weight="900" fill="#14532D" text-anchor="middle">✓ "He is happy."</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'He are happy.' }, { key: 'B', text: 'He am happy.' }, { key: 'C', text: 'He is happy.' }, { key: 'D', text: 'He be happy.' }],
    correctAnswer: 'C',
    explanation: 'Kalimat yang benar adalah "He is happy." karena subjek "He" memakai to be "is".'
  },
  {
    id: 'PENY-B-ENG-10',
    number: 10,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What do we use to write?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Stationery: Writing', '#CA8A04',
        `<g transform="translate(110, 20)"><polygon points="30,80 120,20 135,32 45,92" fill="#FACC15" stroke="#CA8A04" stroke-width="2"/><polygon points="20,90 30,80 45,92" fill="#FED7AA"/><text x="80" y="115" font-size="14" font-weight="900" fill="#854D0E" text-anchor="middle">PENCIL ✏️</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Pencil' }, { key: 'B', text: 'Shoes' }, { key: 'C', text: 'Spoon' }, { key: 'D', text: 'Hat' }],
    correctAnswer: 'A',
    explanation: 'Benda yang kita gunakan untuk menulis adalah pensil (Pencil).'
  },
  {
    id: 'PENY-B-ENG-11',
    number: 11,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Choose the correct word:\n“There are seven days in a ___.”',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Time: 7 Days', '#0284C7',
        `<g transform="translate(90, 20)"><rect x="15" y="15" width="190" height="75" rx="10" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/><text x="110" y="45" font-size="14" font-weight="900" fill="#0369A1" text-anchor="middle">7 DAYS = 1 WEEK</text><text x="110" y="70" font-size="12" font-weight="bold" fill="#075985" text-anchor="middle">(1 Minggu = 7 Hari)</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'month' }, { key: 'B', text: 'year' }, { key: 'C', text: 'week' }, { key: 'D', text: 'day' }],
    correctAnswer: 'C',
    explanation: 'Terdapat tujuh hari dalam satu minggu ("seven days in a week").'
  },
  {
    id: 'PENY-B-ENG-12',
    number: 12,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What is the plural form of “cat”?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Plural Nouns', '#EC4899',
        `<g transform="translate(100, 25)"><rect x="15" y="15" width="170" height="60" rx="10" fill="#FDF2F8" stroke="#EC4899" stroke-width="2"/><text x="100" y="45" font-size="14" font-weight="bold" fill="#9D174D" text-anchor="middle">1 Cat → 2 Cats</text><text x="100" y="65" font-size="12" font-weight="900" fill="#BE185D" text-anchor="middle">Add '-s' = CATS</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Cats' }, { key: 'B', text: 'Cates' }, { key: 'C', text: 'Caties' }, { key: 'D', text: 'Caties' }],
    correctAnswer: 'A',
    explanation: 'Bentuk jamak (plural) dari kata "cat" adalah "Cats".'
  },
  {
    id: 'PENY-B-ENG-13',
    number: 13,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Complete the sentence:\n“They ___ playing football.”',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Present Continuous', '#6366F1',
        `<g transform="translate(90, 25)"><rect x="15" y="20" width="190" height="60" rx="10" fill="#EEF2FF" stroke="#6366F1" stroke-width="2"/><text x="110" y="55" font-size="15" font-weight="900" fill="#3730A3" text-anchor="middle">"They ARE playing"</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'is' }, { key: 'B', text: 'am' }, { key: 'C', text: 'are' }, { key: 'D', text: 'be' }],
    correctAnswer: 'C',
    explanation: 'Subjek jamak "They" menggunakan to be "are".'
  },
  {
    id: 'PENY-B-ENG-14',
    number: 14,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Which one is a fruit?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Food & Fruits', '#EF4444',
        `<g transform="translate(110, 20)"><circle cx="80" cy="55" r="42" fill="#FEE2E2" stroke="#EF4444" stroke-width="3"/><text x="80" y="60" font-size="14" font-weight="900" fill="#991B1B" text-anchor="middle">APPLE 🍎</text><text x="80" y="115" font-size="12" font-weight="bold" fill="#15803D" text-anchor="middle">Fruit (Buah)</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Carrot' }, { key: 'B', text: 'Potato' }, { key: 'C', text: 'Apple' }, { key: 'D', text: 'Onion' }],
    correctAnswer: 'C',
    explanation: 'Apple (apel) adalah buah (fruit), sedangkan wortel, kentang, dan bawang adalah sayuran (vegetables).'
  },
  {
    id: 'PENY-B-ENG-15',
    number: 15,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Read the sentence:\n“Rina has a red bag.”\nWhat color is Rina\'s bag?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Reading: Red Bag', '#DC2626',
        `<g transform="translate(110, 15)"><rect x="40" y="40" width="80" height="65" rx="12" fill="#EF4444" stroke="#B91C1C" stroke-width="3"/><path d="M 60 40 Q 80 20 100 40" stroke="#B91C1C" stroke-width="4" fill="none"/><text x="80" y="80" font-size="13" font-weight="900" fill="#FFF" text-anchor="middle">RED</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Blue' }, { key: 'B', text: 'Green' }, { key: 'C', text: 'Red' }, { key: 'D', text: 'Yellow' }],
    correctAnswer: 'C',
    explanation: 'Dalam teks disebutkan "a red bag", jadi tas Rina berwarna merah (Red).'
  },
  {
    id: 'PENY-B-ENG-16',
    number: 16,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What is the opposite of “hot”?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Opposites: Temperature', '#0284C7',
        `<g transform="translate(90, 20)"><circle cx="50" cy="55" r="30" fill="#FEE2E2"/><text x="50" y="60" font-size="12" font-weight="900" fill="#DC2626" text-anchor="middle">HOT 🔥</text><text x="105" y="60" font-size="16" font-weight="900" fill="#64748B" text-anchor="middle">↔</text><circle cx="150" cy="55" r="30" fill="#E0F2FE"/><text x="150" y="60" font-size="12" font-weight="900" fill="#0284C7" text-anchor="middle">COLD ❄️</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Warm' }, { key: 'B', text: 'Cold' }, { key: 'C', text: 'Big' }, { key: 'D', text: 'Dry' }],
    correctAnswer: 'B',
    explanation: 'Lawan kata dari "hot" (panas) adalah "cold" (dingin).'
  },
  {
    id: 'PENY-B-ENG-17',
    number: 17,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Choose the correct answer:\n“Where do you live?”',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Asking Location', '#8B5CF6',
        `<g transform="translate(90, 20)"><rect x="15" y="15" width="190" height="75" rx="10" fill="#F3E8FF" stroke="#8B5CF6" stroke-width="2"/><text x="110" y="42" font-size="13" font-weight="bold" fill="#6B21A8" text-anchor="middle">"Where do you live?"</text><text x="110" y="68" font-size="14" font-weight="900" fill="#581C87" text-anchor="middle">"I live in Surabaya." ✓</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'I am ten years old.' }, { key: 'B', text: 'I live in Surabaya.' }, { key: 'C', text: 'My name is Dita.' }, { key: 'D', text: 'I like apples.' }],
    correctAnswer: 'B',
    explanation: 'Pertanyaan "Where do you live?" menanyakan tempat tinggal, sehingga jawabannya adalah "I live in Surabaya."'
  },
  {
    id: 'PENY-B-ENG-18',
    number: 18,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Complete the sentence:\n“My mother is cooking in the ___.”',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Rooms in the House', '#F59E0B',
        `<g transform="translate(100, 20)"><rect x="25" y="15" width="150" height="80" rx="12" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2"/><text x="100" y="45" font-size="14" font-weight="900" fill="#92400E" text-anchor="middle">🍳 KITCHEN</text><text x="100" y="70" font-size="11" font-weight="bold" fill="#B45309" text-anchor="middle">Cooking in the kitchen</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'bedroom' }, { key: 'B', text: 'bathroom' }, { key: 'C', text: 'kitchen' }, { key: 'D', text: 'garden' }],
    correctAnswer: 'C',
    explanation: 'Kegiatan memasak (cooking) umumnya dilakukan di dapur (kitchen).'
  },
  {
    id: 'PENY-B-ENG-19',
    number: 19,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Which word means “sekolah”?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Places: Sekolah', '#3B82F6',
        `<g transform="translate(110, 20)"><rect x="30" y="30" width="100" height="60" fill="#DBEAFE" stroke="#3B82F6" stroke-width="2"/><polygon points="80,10 20,30 140,30" fill="#2563EB"/><text x="80" y="65" font-size="13" font-weight="900" fill="#1E40AF" text-anchor="middle">SCHOOL 🏫</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'School' }, { key: 'B', text: 'Station' }, { key: 'C', text: 'Store' }, { key: 'D', text: 'Street' }],
    correctAnswer: 'A',
    explanation: 'Kata bahasa Inggris untuk "sekolah" adalah "School".'
  },
  {
    id: 'PENY-B-ENG-20',
    number: 20,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Read carefully:\n“Tom has three apples. He gives one apple to his sister.”\nHow many apples does Tom have now?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Math in English: 3 - 1', '#10B981',
        `<g transform="translate(90, 20)"><rect x="15" y="15" width="190" height="75" rx="10" fill="#DCFCE7" stroke="#10B981" stroke-width="2"/><text x="110" y="45" font-size="15" font-weight="900" fill="#14532D" text-anchor="middle">3 Apples - 1 Apple = ?</text><text x="110" y="70" font-size="14" font-weight="900" fill="#15803D" text-anchor="middle">TWO (2) APPLES ✓</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'One' }, { key: 'B', text: 'Two' }, { key: 'C', text: 'Three' }, { key: 'D', text: 'Four' }],
    correctAnswer: 'B',
    explanation: 'Tom memiliki 3 apel lalu memberikan 1 apel kepada adiknya. 3 - 1 = 2 (Two).'
  }
];
