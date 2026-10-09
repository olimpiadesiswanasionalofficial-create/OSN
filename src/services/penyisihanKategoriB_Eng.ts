import { QuestionItem } from './cbtQuestionTypes';
import { createPenyisihanSvg } from './simulasiSvgIllustrations';

// SOAL RESMI BABAK PENYISIHAN: BAHASA INGGRIS SD/MI (Kategori B)
// 20 Soal Pilihan Ganda Kurikulum Campuran (Merdeka, Cambridge, Singapore, IB)
// Tingkat Kesulitan: Menengah | 100% Bergambar & Unik

export const PENYISIHAN_B_ENGLISH: QuestionItem[] = [
  // --- KURIKULUM MERDEKA (Soal 1 - 5) ---
  {
    id: 'PENY-B-ENG-01',
    number: 1,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Look at the picture! Yesterday afternoon, Rafi and his sister ... bicycle in the community park happily.',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Past Tense', 'Past Activity in the Park', '#0284C7',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="70" rx="12" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
          <text x="140" y="50" font-size="28" text-anchor="middle">🚴‍♂️ 👧 🌳</text>
          <text x="140" y="75" font-size="12" font-weight="bold" fill="#0369A1" text-anchor="middle">Time signal: "Yesterday afternoon"</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'ride' },
      { key: 'B', text: 'rode' },
      { key: 'C', text: 'riding' },
      { key: 'D', text: 'rides' }
    ],
    correctAnswer: 'B',
    explanation: 'The sentence uses the time signal "Yesterday afternoon", which indicates the Simple Past Tense. The past form (V2) of "ride" is "rode".'
  },
  {
    id: 'PENY-B-ENG-02',
    number: 2,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Study the public sign in the school hallway. What is the main message of this sign?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Public Notice', 'School Caution Sign', '#E11D48',
        `<g transform="translate(70, 15)">
          <rect x="30" y="15" width="200" height="75" rx="10" fill="#FFE4E6" stroke="#E11D48" stroke-width="2"/>
          <text x="130" y="45" font-size="22" text-anchor="middle">⚠️</text>
          <text x="130" y="65" font-size="12" font-weight="900" fill="#9F1239" text-anchor="middle">QUIET PLEASE!</text>
          <text x="130" y="80" font-size="10" font-weight="bold" fill="#BE123C" text-anchor="middle">EXAM IN PROGRESS</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Students must enter the room loudly.' },
      { key: 'B', text: 'People should remain silent because students are taking a test.' },
      { key: 'C', text: 'The room is currently closed for renovation.' },
      { key: 'D', text: 'Students are invited to chat inside.' }
    ],
    correctAnswer: 'B',
    explanation: '"Quiet please! Exam in progress" means people in the surrounding area must stay quiet so that test-takers are not disturbed.'
  },
  {
    id: 'PENY-B-ENG-03',
    number: 3,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Look at the comparative chart of three buildings. Which statement accurately compares their heights?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Degree of Comparison', 'Height Comparison Chart', '#7C3AED',
        `<g transform="translate(60, 10)">
          <!-- Building A -->
          <rect x="30" y="55" width="45" height="45" fill="#DDD6FE" stroke="#7C3AED" stroke-width="1.5"/>
          <text x="52" y="115" font-size="10" font-weight="bold" fill="#4C1D95" text-anchor="middle">Tower A (15m)</text>
          <!-- Building B -->
          <rect x="110" y="30" width="45" height="70" fill="#C4B5FD" stroke="#7C3AED" stroke-width="1.5"/>
          <text x="132" y="115" font-size="10" font-weight="bold" fill="#4C1D95" text-anchor="middle">Tower B (25m)</text>
          <!-- Building C -->
          <rect x="190" y="10" width="45" height="90" fill="#A78BFA" stroke="#7C3AED" stroke-width="1.5"/>
          <text x="212" y="115" font-size="10" font-weight="bold" fill="#4C1D95" text-anchor="middle">Tower C (35m)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Tower A is taller than Tower B.' },
      { key: 'B', text: 'Tower B is the tallest among all three.' },
      { key: 'C', text: 'Tower C is the tallest building.' },
      { key: 'D', text: 'Tower B is shorter than Tower A.' }
    ],
    correctAnswer: 'C',
    explanation: 'Tower C has a height of 35 m, which is greater than Tower B (25 m) and Tower A (15 m). Thus, Tower C is the tallest.'
  },
  {
    id: 'PENY-B-ENG-04',
    number: 4,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Where is the school library located based on the map illustration below?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Prepositions', 'School Floor Plan', '#059669',
        `<g transform="translate(50, 15)">
          <rect x="10" y="20" width="80" height="60" fill="#D1FAE5" stroke="#059669" stroke-width="1.5"/>
          <text x="50" y="55" font-size="10" font-weight="bold" fill="#065F46" text-anchor="middle">Class 4</text>
          
          <rect x="110" y="20" width="80" height="60" fill="#FEF08A" stroke="#CA8A04" stroke-width="2"/>
          <text x="150" y="48" font-size="10" font-weight="900" fill="#854D0E" text-anchor="middle">Library</text>
          <text x="150" y="65" font-size="14" text-anchor="middle">📚</text>
          
          <rect x="210" y="20" width="80" height="60" fill="#D1FAE5" stroke="#059669" stroke-width="1.5"/>
          <text x="250" y="55" font-size="10" font-weight="bold" fill="#065F46" text-anchor="middle">Class 5</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Behind Class 4' },
      { key: 'B', text: 'Between Class 4 and Class 5' },
      { key: 'C', text: 'Far away from Class 5' },
      { key: 'D', text: 'Under Class 4' }
    ],
    correctAnswer: 'B',
    explanation: 'The library is situated in the middle with Class 4 on its left and Class 5 on its right; therefore, it is "between Class 4 and Class 5".'
  },
  {
    id: 'PENY-B-ENG-05',
    number: 5,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Read the habit calendar: Maya waters the house garden every single day without exception. Maya ... waters the plants in the garden.',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Adverbs of Frequency', 'Weekly Habit Calendar', '#D97706',
        `<g transform="translate(40, 15)">
          <rect x="10" y="25" width="40" height="40" fill="#DCFCE7" stroke="#16A34A"/><text x="30" y="50" font-size="10" font-weight="bold" text-anchor="middle">Mon ✓</text>
          <rect x="55" y="25" width="40" height="40" fill="#DCFCE7" stroke="#16A34A"/><text x="75" y="50" font-size="10" font-weight="bold" text-anchor="middle">Tue ✓</text>
          <rect x="100" y="25" width="40" height="40" fill="#DCFCE7" stroke="#16A34A"/><text x="120" y="50" font-size="10" font-weight="bold" text-anchor="middle">Wed ✓</text>
          <rect x="145" y="25" width="40" height="40" fill="#DCFCE7" stroke="#16A34A"/><text x="165" y="50" font-size="10" font-weight="bold" text-anchor="middle">Thu ✓</text>
          <rect x="190" y="25" width="40" height="40" fill="#DCFCE7" stroke="#16A34A"/><text x="210" y="50" font-size="10" font-weight="bold" text-anchor="middle">Fri ✓</text>
          <rect x="235" y="25" width="40" height="40" fill="#DCFCE7" stroke="#16A34A"/><text x="255" y="50" font-size="10" font-weight="bold" text-anchor="middle">Sat ✓</text>
          <rect x="280" y="25" width="40" height="40" fill="#DCFCE7" stroke="#16A34A"/><text x="300" y="50" font-size="10" font-weight="bold" text-anchor="middle">Sun ✓</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'rarely' },
      { key: 'B', text: 'sometimes' },
      { key: 'C', text: 'never' },
      { key: 'D', text: 'always' }
    ],
    correctAnswer: 'D',
    explanation: 'An activity performed 100% of the time (every single day) corresponds to the frequency adverb "always".'
  },

  // --- CAMBRIDGE PRIMARY (Soal 6 - 10) ---
  {
    id: 'PENY-B-ENG-06',
    number: 6,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Read the short scientific paragraph in the diagram. What is the main idea of the text?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Main Idea', 'Honeybees & Pollination', '#CA8A04',
        `<g transform="translate(40, 15)">
          <rect x="10" y="15" width="340" height="75" rx="10" fill="#FEF9C3" stroke="#CA8A04" stroke-width="1.5"/>
          <text x="30" y="38" font-size="11" font-weight="bold" fill="#854D0E">"Honeybees fly from flower to flower gathering nectar.</text>
          <text x="30" y="55" font-size="11" font-weight="bold" fill="#854D0E">During this visit, pollen sticks to their fuzzy bodies and</text>
          <text x="30" y="72" font-size="11" font-weight="bold" fill="#854D0E">helps plants reproduce. Without bees, many crops cannot grow."</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Honeybees prefer to sleep during daytime.' },
      { key: 'B', text: 'Honeybees play a vital role in pollination and plant reproduction.' },
      { key: 'C', text: 'Flowers produce nectar only to feed birds.' },
      { key: 'D', text: 'Bees damage crops when they fly in fields.' }
    ],
    correctAnswer: 'B',
    explanation: 'The paragraph explains how bees collect nectar, transfer pollen, and help plants reproduce, showing that their primary role is essential pollination.'
  },
  {
    id: 'PENY-B-ENG-07',
    number: 7,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Choose the correct subject-verb agreement: Neither the teacher nor the students ... late for the science assembly this morning.',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Grammar Rule', 'Subject-Verb Agreement', '#2563EB',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#EFF6FF" stroke="#2563EB" stroke-width="2"/>
          <text x="140" y="45" font-size="12" font-weight="bold" fill="#1E40AF" text-anchor="middle">Rule: "Neither ... nor [plural noun] ... "</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#3B82F6" text-anchor="middle">Verb agrees with the closer subject: "students"</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'was' },
      { key: 'B', text: 'were' },
      { key: 'C', text: 'is' },
      { key: 'D', text: 'are' }
    ],
    correctAnswer: 'B',
    explanation: 'In the structure "Neither ... nor", the verb agrees with the noun closest to it ("the students", plural). For past tense, "were" is the correct verb form.'
  },
  {
    id: 'PENY-B-ENG-08',
    number: 8,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Complete the sentence with the appropriate question tag: "You have submitted your science experiment log, ...?"',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Question Tags', 'Tag Question Formation', '#4F46E5',
        `<g transform="translate(50, 15)">
          <rect x="20" y="20" width="260" height="65" rx="10" fill="#EEF2FF" stroke="#4F46E5" stroke-width="2"/>
          <text x="150" y="45" font-size="12" font-weight="bold" fill="#3730A3" text-anchor="middle">Positive Statement ("You have...")</text>
          <text x="150" y="68" font-size="12" font-weight="bold" fill="#4F46E5" text-anchor="middle">➔ Negative Tag ("haven\'t you?")</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'have you' },
      { key: 'B', text: 'haven\'t you' },
      { key: 'C', text: 'did you' },
      { key: 'D', text: 'don\'t you' }
    ],
    correctAnswer: 'B',
    explanation: 'The auxiliary verb is "have" in a positive clause, so the tag question requires the negative auxiliary "haven\'t you?".'
  },
  {
    id: 'PENY-B-ENG-09',
    number: 9,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Read the context: "The desert air is extremely arid, making it hard for plants to survive." What is the exact antonym (opposite meaning) of the word "arid"?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Vocabulary', 'Contextual Antonym', '#B45309',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="110" height="65" rx="8" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
          <text x="75" y="48" font-size="11" font-weight="bold" fill="#92400E" text-anchor="middle">Arid (Dry) 🏜️</text>
          
          <text x="150" y="55" font-size="16" font-weight="bold" fill="#B45309" text-anchor="middle">↔</text>
          
          <rect x="170" y="20" width="110" height="65" rx="8" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/>
          <text x="225" y="48" font-size="11" font-weight="bold" fill="#0369A1" text-anchor="middle">Opposite = ? 💧</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Hot' },
      { key: 'B', text: 'Humid / Moist' },
      { key: 'C', text: 'Barren' },
      { key: 'D', text: 'Sandy' }
    ],
    correctAnswer: 'B',
    explanation: '"Arid" means lacking moisture or extremely dry. Its direct opposite is "humid" or "moist" (rich in water vapor and damp).'
  },
  {
    id: 'PENY-B-ENG-10',
    number: 10,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Fill in the relative pronoun: "The young scientist ... designed the solar-powered water filter won the national award."',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Relative Pronoun', 'Relative Clause for Persons', '#10B981',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#ECFDF5" stroke="#10B981" stroke-width="2"/>
          <text x="140" y="45" font-size="12" font-weight="bold" fill="#065F46" text-anchor="middle">Antecedent: "The young scientist" (Person)</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">Subject relative pronoun: "who"</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'which' },
      { key: 'B', text: 'whose' },
      { key: 'C', text: 'who' },
      { key: 'D', text: 'where' }
    ],
    correctAnswer: 'C',
    explanation: 'When referring to a person as the subject of the relative clause ("The young scientist"), the appropriate relative pronoun is "who".'
  },

  // --- SINGAPORE CURRICULUM (Soal 11 - 15) ---
  {
    id: 'PENY-B-ENG-11',
    number: 11,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Synthesis & Transformation: Combine the two sentences using "Unless":\nSentence 1: You wear a helmet.\nSentence 2: You cannot ride this race scooter.',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Synthesis', 'Sentence Transformation (Unless)', '#9333EA',
        `<g transform="translate(50, 15)">
          <rect x="20" y="20" width="260" height="65" rx="10" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5"/>
          <text x="150" y="45" font-size="11" font-weight="bold" fill="#6B21A8" text-anchor="middle">Rule: "Unless" = "If ... not"</text>
          <text x="150" y="68" font-size="11" font-weight="bold" fill="#7E22CE" text-anchor="middle">Unless you wear a helmet, you cannot ride...</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Unless you wear a helmet, you can ride this race scooter.' },
      { key: 'B', text: 'Unless you wear a helmet, you cannot ride this race scooter.' },
      { key: 'C', text: 'Unless you do not wear a helmet, you cannot ride.' },
      { key: 'D', text: 'You wear a helmet unless you cannot ride.' }
    ],
    correctAnswer: 'B',
    explanation: '"Unless" means "if not". "Unless you wear a helmet, you cannot ride this race scooter" accurately conveys that wearing a helmet is a strict requirement.'
  },
  {
    id: 'PENY-B-ENG-12',
    number: 12,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Look at the idiom illustration: Before going on stage for her violin recital, Clara\'s mom whispered, "Break a leg, honey!" What does "break a leg" mean?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Idioms', 'Idiomatic Expression', '#EA580C',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FFF7ED" stroke="#EA580C" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">🎻 🎭</text>
          <text x="140" y="70" font-size="12" font-weight="900" fill="#C2410C" text-anchor="middle">"Break a leg!" = Good luck!</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Be careful not to injure your bones.' },
      { key: 'B', text: 'Good luck with your performance.' },
      { key: 'C', text: 'Run as fast as you can.' },
      { key: 'D', text: 'Stop playing immediately.' }
    ],
    correctAnswer: 'B',
    explanation: '"Break a leg" is a widely recognized English idiom used to wish performers good luck before a show.'
  },
  {
    id: 'PENY-B-ENG-13',
    number: 13,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Cloze Passage: "Although the storm was severe, the crew managed to navigate safely ... the harbor." What preposition correctly fits the blank?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Cloze Test', 'Navigation & Direction', '#0891B2',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#ECFEFF" stroke="#0891B2" stroke-width="2"/>
          <text x="140" y="45" font-size="11" font-weight="bold" fill="#0E7490" text-anchor="middle">Movement toward an enclosed haven</text>
          <text x="140" y="68" font-size="12" font-weight="bold" fill="#155E75" text-anchor="middle">"navigate safely into the harbor"</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'onto' },
      { key: 'B', text: 'into' },
      { key: 'C', text: 'over' },
      { key: 'D', text: 'above' }
    ],
    correctAnswer: 'B',
    explanation: 'The verb "navigate into" expresses directional entry into a designated location such as a harbor or port.'
  },
  {
    id: 'PENY-B-ENG-14',
    number: 14,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Select the correct modal auxiliary for a polite and formal request: "... I borrow your dictionary for a moment, Mr. Adams?"',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Modals', 'Formal Polite Request', '#6366F1',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#EEF2FF" stroke="#6366F1" stroke-width="1.5"/>
          <text x="140" y="45" font-size="12" font-weight="bold" fill="#4338CA" text-anchor="middle">Polite inquiry directed to a teacher</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#312E81" text-anchor="middle">Formal permission: "May I...?"</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Must' },
      { key: 'B', text: 'Should' },
      { key: 'C', text: 'May' },
      { key: 'D', text: 'Will' }
    ],
    correctAnswer: 'C',
    explanation: '"May I...?" is the standard polite and formal modal verb construction used to request permission.'
  },
  {
    id: 'PENY-B-ENG-15',
    number: 15,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Sentence Connector: "Daniel practiced piano diligently every evening; ..., he earned first place in the competition."',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Connectors', 'Cause & Result Transition', '#15803D',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#F0FDF4" stroke="#15803D" stroke-width="2"/>
          <text x="140" y="45" font-size="11" font-weight="bold" fill="#166534" text-anchor="middle">Cause: Practiced diligently every evening</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#15803D" text-anchor="middle">Result: "... consequently / as a result ..."</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'however' },
      { key: 'B', text: 'consequently' },
      { key: 'C', text: 'otherwise' },
      { key: 'D', text: 'nevertheless' }
    ],
    correctAnswer: 'B',
    explanation: '"Consequently" introduces a direct result or outcome of the preceding hard work. The other options introduce contrast or negative alternatives.'
  },

  // --- INTERNATIONAL BACCALAUREATE (IB PYP) (Soal 16 - 20) ---
  {
    id: 'PENY-B-ENG-16',
    number: 16,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Analyze the global sustainability poster. What is the key action recommended by the slogan "Reduce, Reuse, Recycle"?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Sustainability Poster', 'Waste Management Slogan', '#059669',
        `<g transform="translate(60, 15)">
          <rect x="20" y="15" width="240" height="75" rx="12" fill="#ECFDF5" stroke="#059669" stroke-width="2"/>
          <text x="140" y="40" font-size="22" text-anchor="middle">♻️ 🌍</text>
          <text x="140" y="62" font-size="12" font-weight="900" fill="#065F46" text-anchor="middle">REDUCE • REUSE • RECYCLE</text>
          <text x="140" y="78" font-size="9" font-weight="bold" fill="#047857" text-anchor="middle">Guardians of Our Living Planet</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Consume more single-use plastic bottles.' },
      { key: 'B', text: 'Minimize waste and conserve Earth\'s natural resources.' },
      { key: 'C', text: 'Burn all domestic trash in gardens.' },
      { key: 'D', text: 'Throw recyclable containers into open rivers.' }
    ],
    correctAnswer: 'B',
    explanation: 'The 3Rs slogan urges responsible consumption: minimizing waste generation, reusing existing items, and recycling materials to conserve resources.'
  },
  {
    id: 'PENY-B-ENG-17',
    number: 17,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Read the intercultural dialogue: Kenji says, "In Japan, we bow respectfully when greeting elders." What communicative value is Kenji highlighting?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Intercultural Inquiry', 'Cultural Greeting & Respect', '#DB2777',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FDF2F8" stroke="#DB2777" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">🙇‍♂️ 🤝 🌏</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#9D174D" text-anchor="middle">Cultural customs showing respect to elders</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Competitive sportsmanship' },
      { key: 'B', text: 'Mutual respect and cultural courtesy' },
      { key: 'C', text: 'Financial transaction' },
      { key: 'D', text: 'Academic grading' }
    ],
    correctAnswer: 'B',
    explanation: 'Bowing to elders in Japanese tradition embodies deep respect, politeness, and social harmony.'
  },
  {
    id: 'PENY-B-ENG-18',
    number: 18,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Read the procedural inquiry: "Step 1: Place bean seeds on moist cotton. Step 2: Keep in indirect sunlight. Step 3: Record daily stem growth." What text type is this?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Text Types', 'Scientific Procedural Text', '#D97706',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
          <text x="140" y="45" font-size="11" font-weight="bold" fill="#B45309" text-anchor="middle">Step-by-step sequential instructions</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#92400E" text-anchor="middle">Goal: Conduct a seed germination test</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Fictional Fairy Tale' },
      { key: 'B', text: 'Procedural / Instructional Text' },
      { key: 'C', text: 'Poetry' },
      { key: 'D', text: 'Advertisement flyer' }
    ],
    correctAnswer: 'B',
    explanation: 'A text that outlines sequential steps and methods to achieve a specific goal or conduct an experiment is a procedural/instructional text.'
  },
  {
    id: 'PENY-B-ENG-19',
    number: 19,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Cause and Effect inquiry: "Due to heavy deforestation on the hillside, the fertile topsoil was washed away during rainy seasons." What was the cause in this scenario?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Cause and Effect', 'Ecosystem Inquiry', '#15803D',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="115" height="65" rx="8" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/>
          <text x="77" y="45" font-size="10" font-weight="bold" fill="#991B1B" text-anchor="middle">CAUSE</text>
          <text x="77" y="65" font-size="9" font-weight="bold" fill="#B91C1C" text-anchor="middle">Deforestation</text>
          
          <text x="147" y="55" font-size="16" font-weight="bold" fill="#475569" text-anchor="middle">➔</text>
          
          <rect x="160" y="20" width="115" height="65" rx="8" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
          <text x="217" y="45" font-size="10" font-weight="bold" fill="#92400E" text-anchor="middle">EFFECT</text>
          <text x="217" y="65" font-size="9" font-weight="bold" fill="#B45309" text-anchor="middle">Soil Erosion</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Soil erosion' },
      { key: 'B', text: 'Heavy deforestation on the hillside' },
      { key: 'C', text: 'Planting new mahogany trees' },
      { key: 'D', text: 'Building bird sanctuaries' }
    ],
    correctAnswer: 'B',
    explanation: 'The cause introduced by "Due to" is "heavy deforestation on the hillside", which led to the effect of topsoil washing away.'
  },
  {
    id: 'PENY-B-ENG-20',
    number: 20,
    category: 'Kategori B',
    subject: 'Bahasa Inggris',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Read the reflective journal entry: "I learned that listening openly to classmates from different backgrounds helped us solve the puzzle faster." Which IB Learner Profile attribute is demonstrated?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Learner Profile', 'Reflective & Open-Minded', '#2563EB',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">💡 🤝 🧩</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#1E40AF" text-anchor="middle">Value: Valuing diverse perspectives & collaboration</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Risk-averse' },
      { key: 'B', text: 'Open-Minded and Collaborative' },
      { key: 'C', text: 'Passive observer' },
      { key: 'D', text: 'Aggressive competitor' }
    ],
    correctAnswer: 'B',
    explanation: 'Actively listening to other perspectives and collaborating respectfully embodies the IB Learner Profile attribute of being "Open-Minded".'
  }
];
