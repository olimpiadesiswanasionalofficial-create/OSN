import { QuestionItem } from './cbtQuestionTypes';
import { createSimulasiSvg } from './simulasiSvgIllustrations';

// SOAL RESMI BABAK PENYISIHAN: BAHASA INGGRIS SMP/MTS (Kategori C)
// 20 Soal Lengkap Pilihan Ganda dengan Kunci Jawaban Resmi & Ilustrasi Visual

export const PENYISIHAN_C_ENGLISH: QuestionItem[] = [
  {
    id: 'PENY-C-ENG-01',
    number: 1,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Choose the correct sentence.',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'Grammar: Pronoun & Be', '#3B82F6',
        `<g transform="translate(90, 25)"><rect x="15" y="15" width="190" height="60" rx="10" fill="#DBEAFE" stroke="#3B82F6" stroke-width="2"/><text x="110" y="50" font-size="14" font-weight="900" fill="#1E40AF" text-anchor="middle">✓ "She is a student."</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'She are a student.' }, { key: 'B', text: 'She is a student.' }, { key: 'C', text: 'She am a student.' }, { key: 'D', text: 'She be a student.' }],
    correctAnswer: 'B',
    explanation: 'Subjek "She" berpasangan dengan to be "is".'
  },
  {
    id: 'PENY-C-ENG-02',
    number: 2,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What is the opposite of “expensive”?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'Antonyms: Price', '#10B981',
        `<g transform="translate(85, 20)"><rect x="10" y="15" width="90" height="70" rx="10" fill="#FEE2E2"/><text x="55" y="45" font-size="11" font-weight="bold" fill="#991B1B" text-anchor="middle">Expensive ($$$)</text><text x="55" y="65" font-size="11" font-weight="bold" fill="#991B1B" text-anchor="middle">Mahal</text><text x="115" y="55" font-size="18" font-weight="900" fill="#64748B" text-anchor="middle">↔</text><rect x="130" y="15" width="90" height="70" rx="10" fill="#DCFCE7"/><text x="175" y="45" font-size="11" font-weight="900" fill="#15803D" text-anchor="middle">Cheap ($)</text><text x="175" y="65" font-size="11" font-weight="bold" fill="#15803D" text-anchor="middle">Murah</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Cheap' }, { key: 'B', text: 'Large' }, { key: 'C', text: 'Heavy' }, { key: 'D', text: 'Easy' }],
    correctAnswer: 'A',
    explanation: 'Lawan kata dari "expensive" (mahal) adalah "cheap" (murah).'
  },
  {
    id: 'PENY-C-ENG-03',
    number: 3,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Complete the sentence:\n“My father ___ to work every morning.”',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'Simple Present: 3rd Person', '#F59E0B',
        `<g transform="translate(90, 25)"><rect x="15" y="15" width="190" height="60" rx="10" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2"/><text x="110" y="50" font-size="14" font-weight="900" fill="#92400E" text-anchor="middle">"My father GOES to work"</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'go' }, { key: 'B', text: 'goes' }, { key: 'C', text: 'going' }, { key: 'D', text: 'gone' }],
    correctAnswer: 'B',
    explanation: 'Subjek "My father" (he) pada Simple Present Tense memerlukan penambahan -es pada kata kerja dasar "go" menjadi "goes".'
  },
  {
    id: 'PENY-C-ENG-04',
    number: 4,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What is the past form of “eat”?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'Irregular Verbs (V2)', '#8B5CF6',
        `<g transform="translate(90, 25)"><rect x="15" y="15" width="190" height="60" rx="10" fill="#F3E8FF" stroke="#8B5CF6" stroke-width="2"/><text x="110" y="45" font-size="14" font-weight="bold" fill="#6B21A8" text-anchor="middle">V1: Eat → V2 (Past): ATE</text><text x="110" y="65" font-size="12" font-weight="900" fill="#581C87" text-anchor="middle">V3: Eaten</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Eated' }, { key: 'B', text: 'Eats' }, { key: 'C', text: 'Ate' }, { key: 'D', text: 'Eating' }],
    correctAnswer: 'C',
    explanation: 'Bentuk lampau (Past tense / V2) dari kata kerja tidak beraturan "eat" adalah "ate".'
  },
  {
    id: 'PENY-C-ENG-05',
    number: 5,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Choose the correct answer:\n“Where does Rina live?”',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'WH-Questions: Where', '#06B6D4',
        `<g transform="translate(85, 20)"><rect x="15" y="15" width="200" height="70" rx="10" fill="#E0F2FE" stroke="#06B6D4" stroke-width="2"/><text x="115" y="42" font-size="12" font-weight="bold" fill="#0369A1" text-anchor="middle">"Where does Rina live?"</text><text x="115" y="68" font-size="13" font-weight="900" fill="#0E7490" text-anchor="middle">"She lives in Malang." ✓</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'She is a student.' }, { key: 'B', text: 'She lives in Malang.' }, { key: 'C', text: 'She is thirteen years old.' }, { key: 'D', text: 'She likes swimming.' }],
    correctAnswer: 'B',
    explanation: 'Kata tanya "Where" menanyakan tempat. Jawaban yang tepat: "She lives in Malang."'
  },
  {
    id: 'PENY-C-ENG-06',
    number: 6,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Complete the sentence:\n“They ___ football yesterday.”',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'Simple Past Tense', '#EC4899',
        `<g transform="translate(90, 25)"><rect x="15" y="15" width="190" height="60" rx="10" fill="#FDF2F8" stroke="#EC4899" stroke-width="2"/><text x="110" y="45" font-size="14" font-weight="900" fill="#9D174D" text-anchor="middle">"Yesterday" → Past Tense</text><text x="110" y="65" font-size="13" font-weight="bold" fill="#BE185D" text-anchor="middle">They PLAYED football</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'play' }, { key: 'B', text: 'plays' }, { key: 'C', text: 'played' }, { key: 'D', text: 'playing' }],
    correctAnswer: 'C',
    explanation: 'Keterangan waktu "yesterday" menunjukkan Simple Past Tense, sehingga kata kerja yang digunakan adalah bentuk lampau: "played".'
  },
  {
    id: 'PENY-C-ENG-07',
    number: 7,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Which word is a verb?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'Parts of Speech: Verb', '#10B981',
        `<g transform="translate(90, 20)"><rect x="15" y="15" width="190" height="75" rx="10" fill="#DCFCE7" stroke="#10B981" stroke-width="2"/><text x="110" y="45" font-size="14" font-weight="900" fill="#14532D" text-anchor="middle">RUN = VERB (Kata Kerja)</text><text x="110" y="70" font-size="12" font-weight="bold" fill="#15803D" text-anchor="middle">Action word (Berlari)</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Beautiful' }, { key: 'B', text: 'Happiness' }, { key: 'C', text: 'Run' }, { key: 'D', text: 'Student' }],
    correctAnswer: 'C',
    explanation: '"Run" (berlari) adalah kata kerja (verb). Beautiful = adjective, Happiness = noun, Student = noun.'
  },
  {
    id: 'PENY-C-ENG-08',
    number: 8,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Choose the correct sentence.',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'Negative Simple Present', '#EF4444',
        `<g transform="translate(90, 25)"><rect x="15" y="15" width="190" height="60" rx="10" fill="#FEE2E2" stroke="#EF4444" stroke-width="2"/><text x="110" y="50" font-size="14" font-weight="900" fill="#991B1B" text-anchor="middle">✓ "I don't like coffee."</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'I don\'t like coffee.' }, { key: 'B', text: 'I doesn\'t like coffee.' }, { key: 'C', text: 'I am not like coffee.' }, { key: 'D', text: 'I not like coffee.' }],
    correctAnswer: 'A',
    explanation: 'Bentuk negatif untuk subjek "I" pada Simple Present adalah "don\'t" + verb dasar: "I don\'t like coffee."'
  },
  {
    id: 'PENY-C-ENG-09',
    number: 9,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What is the meaning of “library”?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'Places: Library', '#4F46E5',
        `<g transform="translate(100, 20)"><rect x="20" y="15" width="160" height="75" rx="10" fill="#EEF2FF" stroke="#4F46E5" stroke-width="2"/><text x="100" y="45" font-size="13" font-weight="900" fill="#312E81" text-anchor="middle">📚 LIBRARY</text><text x="100" y="70" font-size="11" font-weight="bold" fill="#4338CA" text-anchor="middle">Perpustakaan Buku</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Tempat membeli makanan' }, { key: 'B', text: 'Tempat membaca dan meminjam buku' }, { key: 'C', text: 'Tempat berolahraga' }, { key: 'D', text: 'Tempat belajar memasak' }],
    correctAnswer: 'B',
    explanation: 'Library adalah perpustakaan, yaitu tempat untuk membaca dan meminjam buku.'
  },
  {
    id: 'PENY-C-ENG-10',
    number: 10,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Complete the sentence:\n“There ___ two books on the table.”',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'There is / There are', '#0284C7',
        `<g transform="translate(90, 25)"><rect x="15" y="15" width="190" height="60" rx="10" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/><text x="110" y="45" font-size="13" font-weight="bold" fill="#0369A1" text-anchor="middle">Two books (Plural) →</text><text x="110" y="65" font-size="14" font-weight="900" fill="#0284C7" text-anchor="middle">"There ARE two books"</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'is' }, { key: 'B', text: 'am' }, { key: 'C', text: 'are' }, { key: 'D', text: 'be' }],
    correctAnswer: 'C',
    explanation: 'Karena bendanya jamak ("two books"), maka menggunakan "There are".'
  },
  {
    id: 'PENY-C-ENG-11',
    number: 11,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Read the sentence:\n“Dina is taller than Sinta.”\nWhat does the sentence mean?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'Comparative Degree', '#F59E0B',
        `<g transform="translate(90, 20)"><rect x="30" y="30" width="30" height="70" fill="#FBBF24"/><text x="45" y="20" font-size="11" font-weight="900" fill="#78350F" text-anchor="middle">Dina</text><rect x="110" y="50" width="30" height="50" fill="#FDE68A"/><text x="125" y="40" font-size="11" font-weight="900" fill="#78350F" text-anchor="middle">Sinta</text><text x="90" y="118" font-size="12" font-weight="bold" fill="#92400E" text-anchor="middle">Dina lebih tinggi dari Sinta</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Sinta is taller than Dina.' }, { key: 'B', text: 'Dina and Sinta have the same height.' }, { key: 'C', text: 'Dina has more height than Sinta.' }, { key: 'D', text: 'Dina is shorter than Sinta.' }],
    correctAnswer: 'C',
    explanation: '"Dina is taller than Sinta" bermakna Dina memiliki tinggi badan yang lebih daripada Sinta (Dina has more height than Sinta).'
  },
  {
    id: 'PENY-C-ENG-12',
    number: 12,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Choose the correct word:\n“We use our eyes to ___.”',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'Function of Senses', '#0284C7',
        `<g transform="translate(100, 20)"><ellipse cx="80" cy="50" rx="45" ry="25" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/><circle cx="80" cy="50" r="14" fill="#0284C7"/><text x="80" y="100" font-size="14" font-weight="900" fill="#0369A1" text-anchor="middle">EYES TO SEE 👀</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'hear' }, { key: 'B', text: 'smell' }, { key: 'C', text: 'see' }, { key: 'D', text: 'taste' }],
    correctAnswer: 'C',
    explanation: 'Kita menggunakan mata untuk melihat ("to see"). Hear = telinga, Smell = hidung, Taste = lidah.'
  },
  {
    id: 'PENY-C-ENG-13',
    number: 13,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Complete the sentence:\n“I ___ watching TV now.”',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'Present Continuous: I', '#6366F1',
        `<g transform="translate(90, 25)"><rect x="15" y="15" width="190" height="60" rx="10" fill="#EEF2FF" stroke="#6366F1" stroke-width="2"/><text x="110" y="50" font-size="14" font-weight="900" fill="#3730A3" text-anchor="middle">"I AM watching TV now"</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'am' }, { key: 'B', text: 'is' }, { key: 'C', text: 'are' }, { key: 'D', text: 'be' }],
    correctAnswer: 'A',
    explanation: 'Subjek "I" berpasangan dengan to be "am" dalam Present Continuous: "I am watching TV now."'
  },
  {
    id: 'PENY-C-ENG-14',
    number: 14,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What should you say when you want to ask someone to repeat what they said?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'Polite Requests', '#10B981',
        `<g transform="translate(85, 20)"><rect x="10" y="15" width="200" height="70" rx="10" fill="#ECFDF5" stroke="#10B981" stroke-width="2"/><text x="110" y="45" font-size="12" font-weight="900" fill="#065F46" text-anchor="middle">"Could you say that</text><text x="110" y="68" font-size="12" font-weight="900" fill="#065F46" text-anchor="middle">again, please?"</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Thank you.' }, { key: 'B', text: 'See you.' }, { key: 'C', text: 'Could you say that again, please?' }, { key: 'D', text: 'Good morning.' }],
    correctAnswer: 'C',
    explanation: 'Ungkapan sopan untuk meminta seseorang mengulangi perkataannya adalah "Could you say that again, please?".'
  },
  {
    id: 'PENY-C-ENG-15',
    number: 15,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Read the passage:\n“Rudi gets up at 6 a.m. every day. He takes a shower, has breakfast, and goes to school at 7 a.m.”\nWhat does Rudi do after taking a shower?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'Reading: Daily Routine', '#F59E0B',
        `<g transform="translate(85, 20)"><rect x="10" y="15" width="200" height="75" rx="10" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2"/><text x="110" y="40" font-size="12" font-weight="bold" fill="#78350F" text-anchor="middle">Routine Sequence:</text><text x="110" y="65" font-size="13" font-weight="900" fill="#92400E" text-anchor="middle">Shower → HAS BREAKFAST 🍞</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'He goes to school.' }, { key: 'B', text: 'He goes back to sleep.' }, { key: 'C', text: 'He has breakfast.' }, { key: 'D', text: 'He plays football.' }],
    correctAnswer: 'C',
    explanation: 'Berdasarkan teks, urutan kegiatannya: "takes a shower, has breakfast, and goes to school". Jadi setelah mandi, Rudi sarapan (has breakfast).'
  },
  {
    id: 'PENY-C-ENG-16',
    number: 16,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Choose the correct form.\n“She can ___ English very well.”',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'Modal: Can + Bare Infinitive', '#8B5CF6',
        `<g transform="translate(90, 25)"><rect x="15" y="15" width="190" height="60" rx="10" fill="#F3E8FF" stroke="#8B5CF6" stroke-width="2"/><text x="110" y="45" font-size="12" font-weight="bold" fill="#6B21A8" text-anchor="middle">Modal 'CAN' + Bare Infinitive</text><text x="110" y="65" font-size="14" font-weight="900" fill="#581C87" text-anchor="middle">She can SPEAK English</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'speaks' }, { key: 'B', text: 'spoke' }, { key: 'C', text: 'speaking' }, { key: 'D', text: 'speak' }],
    correctAnswer: 'D',
    explanation: 'Setelah modal verb "can", kata kerja yang mengikuti selalu dalam bentuk dasar (bare infinitive / V1 tanpa imbuhan), yaitu "speak".'
  },
  {
    id: 'PENY-C-ENG-17',
    number: 17,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'What is the opposite of “early”?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'Opposites: Time', '#EC4899',
        `<g transform="translate(85, 20)"><rect x="10" y="15" width="90" height="70" rx="10" fill="#FCE7F3"/><text x="55" y="45" font-size="12" font-weight="900" fill="#9D174D" text-anchor="middle">EARLY</text><text x="55" y="65" font-size="11" font-weight="bold" fill="#BE185D" text-anchor="middle">(Awal/Pagi)</text><text x="115" y="55" font-size="18" font-weight="900" fill="#64748B" text-anchor="middle">↔</text><rect x="130" y="15" width="90" height="70" rx="10" fill="#EDE9FE"/><text x="175" y="45" font-size="12" font-weight="900" fill="#6D28D9" text-anchor="middle">LATE</text><text x="175" y="65" font-size="11" font-weight="bold" fill="#7C3AED" text-anchor="middle">(Terlambat)</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Fast' }, { key: 'B', text: 'Late' }, { key: 'C', text: 'Soon' }, { key: 'D', text: 'Quick' }],
    correctAnswer: 'B',
    explanation: 'Lawan kata dari "early" (awal/lebih pagi) adalah "late" (terlambat/malam).'
  },
  {
    id: 'PENY-C-ENG-18',
    number: 18,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Complete the sentence:\n“If it rains, I ___ at home.”',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'Conditional Clause', '#0284C7',
        `<g transform="translate(90, 25)"><rect x="15" y="15" width="190" height="60" rx="10" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/><text x="110" y="50" font-size="14" font-weight="900" fill="#0369A1" text-anchor="middle">"If it rains, I STAY at home"</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'stay' }, { key: 'B', text: 'stayed' }, { key: 'C', text: 'staying' }, { key: 'D', text: 'stays' }],
    correctAnswer: 'A',
    explanation: 'Dalam Zero/First conditional type dengan subjek "I" pada present time, kata kerja yang digunakan adalah "stay".'
  },
  {
    id: 'PENY-C-ENG-19',
    number: 19,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Read the notice:\n“NO PARKING”\nWhat does it mean?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'Sign & Notice', '#DC2626',
        `<g transform="translate(100, 15)"><circle cx="80" cy="55" r="45" fill="#FEE2E2" stroke="#DC2626" stroke-width="6"/><text x="80" y="65" font-size="32" font-weight="900" fill="#DC2626" text-anchor="middle">P</text><line x1="48" y1="25" x2="112" y2="85" stroke="#DC2626" stroke-width="6"/><text x="80" y="120" font-size="13" font-weight="900" fill="#991B1B" text-anchor="middle">CANNOT PARK HERE</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'You can park here.' }, { key: 'B', text: 'You must park here.' }, { key: 'C', text: 'You cannot park here.' }, { key: 'D', text: 'You should wash your car here.' }],
    correctAnswer: 'C',
    explanation: 'Rambu peringatan "NO PARKING" artinya dilarang memarkir kendaraan di tempat tersebut ("You cannot park here").'
  },
  {
    id: 'PENY-C-ENG-20',
    number: 20,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Choose the correct response:\n“Would you like some tea?”',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SMP', 'Offering Something', '#10B981',
        `<g transform="translate(85, 20)"><rect x="10" y="15" width="200" height="75" rx="10" fill="#ECFDF5" stroke="#10B981" stroke-width="2"/><text x="110" y="40" font-size="12" font-weight="bold" fill="#065F46" text-anchor="middle">Offer: "Would you like some tea?"</text><text x="110" y="68" font-size="14" font-weight="900" fill="#047857" text-anchor="middle">"Yes, please." 🍵 ✓</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Yes, please.' }, { key: 'B', text: 'I am thirteen.' }, { key: 'C', text: 'It is on the table.' }, { key: 'D', text: 'Good afternoon.' }],
    correctAnswer: 'A',
    explanation: 'Respon sopan untuk menerima tawaran "Would you like some tea?" adalah "Yes, please." (Ya, tolong).'
  }
];
