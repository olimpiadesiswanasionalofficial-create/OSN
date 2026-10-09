import { QuestionItem } from './cbtQuestionTypes';
import { createPenyisihanSvg } from './simulasiSvgIllustrations';

// SOAL RESMI BABAK PENYISIHAN: BAHASA INGGRIS SMP/MTs (Kategori C)
// 20 Soal Pilihan Ganda Kurikulum Campuran (Merdeka, Cambridge, Singapore, IB)
// Tingkat Kesulitan: Menengah | 100% Bergambar & Unik

export const PENYISIHAN_C_ENGLISH: QuestionItem[] = [
  // --- KURIKULUM MERDEKA (Soal 1 - 5) ---
  {
    id: 'PENY-C-ENG-01',
    number: 1,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Read the informational report text on the Komodo dragon: "The Komodo dragon (Varanus komodoensis) is the largest living lizard on Earth. It inhabits the dry savannas of Komodo Island, utilizing its keen sense of smell and venomous bite to subdue prey." What is the communicative purpose of this text?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Report Text', 'Informational Report on Fauna', '#059669',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#ECFDF5" stroke="#059669" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">🦎 🏝️ 🔍</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#065F46" text-anchor="middle">Scientific classification & factual descriptions</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'To entertain readers with a fictional fable about talking lizards' },
      { key: 'B', text: 'To present factual information about the Komodo dragon as a species' },
      { key: 'C', text: 'To persuade tourists to buy Komodo souvenirs' },
      { key: 'D', text: 'To instruct step-by-step how to capture a wild reptile' }
    ],
    correctAnswer: 'B',
    explanation: 'A factual report text describes things as they are with reference to whole classes of natural, synthetic, or social phenomena.'
  },
  {
    id: 'PENY-C-ENG-02',
    number: 2,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Complete the Conditional Sentence Type 2 (unreal present situation): "If our school ... more solar panels on the roof, we would save thousands of kilowatt-hours of grid electricity every month."',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Conditionals', 'Conditional Type 2 Structure', '#2563EB',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#EFF6FF" stroke="#2563EB" stroke-width="2"/>
          <text x="140" y="42" font-size="12" font-weight="bold" fill="#1E40AF" text-anchor="middle">If + Simple Past (V2), ... would + V1</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#3B82F6" text-anchor="middle">Hypothetical / Unreal condition in present</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'installs' },
      { key: 'B', text: 'installed' },
      { key: 'C', text: 'will install' },
      { key: 'D', text: 'had installed' }
    ],
    correctAnswer: 'B',
    explanation: 'Second conditional uses "If + Simple Past (installed), would + bare infinitive (save)" to express a hypothetical present situation.'
  },
  {
    id: 'PENY-C-ENG-03',
    number: 3,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Change into passive voice: "Marine biologists have discovered a new species of bioluminescent jellyfish in the deep Sunda Trench."',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Passive Voice', 'Present Perfect Passive', '#7C3AED',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#6D28D9" text-anchor="middle">Active: have/has + V3</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#5B21B6" text-anchor="middle">Passive: has been + V3 (discovered)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'A new species of bioluminescent jellyfish was discovered by marine biologists.' },
      { key: 'B', text: 'A new species of bioluminescent jellyfish has been discovered by marine biologists.' },
      { key: 'C', text: 'A new species of bioluminescent jellyfish had been discovered by marine biologists.' },
      { key: 'D', text: 'A new species is being discovered in the Sunda Trench.' }
    ],
    correctAnswer: 'B',
    explanation: 'The present perfect active ("have discovered") becomes "has been discovered" in the passive voice when the new subject ("a new species", singular) is placed first.'
  },
  {
    id: 'PENY-C-ENG-04',
    number: 4,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Read the formal email excerpt: "Dear Committee Members, We would be grateful if you could confirm your attendance by Friday so that arrangements for laboratory stations can be finalized." What is the tone of this email?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Formal Email', 'Professional Email Register', '#0D9488',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#CCFBF1" stroke="#0D9488" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">✉️ 🔬 📋</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#0F766E" text-anchor="middle">Formal, polite, and official administrative tone</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Sarcastic and humorous' },
      { key: 'B', text: 'Formal, polite, and professional' },
      { key: 'C', text: 'Aggressive and demanding' },
      { key: 'D', text: 'Casual slang between close buddies' }
    ],
    correctAnswer: 'B',
    explanation: 'Expressions such as "Dear Committee Members", "We would be grateful if you could", and "can be finalized" demonstrate a formal, polite, and respectful communicative register.'
  },
  {
    id: 'PENY-C-ENG-05',
    number: 5,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Choose the appropriate phrasal verb: "Due to unprecedented monsoon flooding, the inter-school robotic olympiad had to be ... until next month."',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Phrasal Verbs', 'Event Postponement Idiom', '#D97706',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FFFBEB" stroke="#D97706" stroke-width="1.5"/>
          <text x="140" y="45" font-size="12" font-weight="bold" fill="#B45309" text-anchor="middle">Postpone / Delay = "put off"</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#92400E" text-anchor="middle">Cancel = "call off"</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'put off (postponed)' },
      { key: 'B', text: 'turned on' },
      { key: 'C', text: 'broken down' },
      { key: 'D', text: 'looked after' }
    ],
    correctAnswer: 'A',
    explanation: '"Put off" means to postpone or delay an event to a later date, which fits the context of rescheduling until next month.'
  },

  // --- CAMBRIDGE LOWER SECONDARY (Soal 6 - 10) ---
  {
    id: 'PENY-C-ENG-06',
    number: 6,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Read the literary excerpt: "The old scientist stared at the fluctuating waveform on the monitor. A subtle grin broke across his weary face; three grueling years of trial and error had finally borne fruit." What can be inferred about the scientist?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Literary Inference', 'Inferring Character Emotion', '#4F46E5',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#EEF2FF" stroke="#4F46E5" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">👨‍🔬 📈 ✨</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#3730A3" text-anchor="middle">Relief and accomplishment after persistent research</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'He decided to abandon his experiment immediately.' },
      { key: 'B', text: 'He felt exhausted and angry at his computer machine.' },
      { key: 'C', text: 'He achieved a long-awaited breakthrough after years of dedication.' },
      { key: 'D', text: 'He was disappointed because the experiment failed.' }
    ],
    correctAnswer: 'C',
    explanation: 'The "subtle grin" and the phrase "three grueling years had finally borne fruit" indicate relief and successful realization of a major discovery.'
  },
  {
    id: 'PENY-C-ENG-07',
    number: 7,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Select the complex sentence with a non-defining relative clause correctly punctuated with commas:',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Relative Clauses', 'Non-defining Clause Punctuation', '#0284C7',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#0369A1" text-anchor="middle">Non-defining clause adds extra info</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#0284C7" text-anchor="middle">Separated by commas: [Noun], which ..., [Verb]</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Mount Bromo which is located in East Java attracts tourists from across the globe.' },
      { key: 'B', text: 'Mount Bromo, which is located in East Java, attracts tourists from across the globe.' },
      { key: 'C', text: 'Mount Bromo that is located in East Java, attracts tourists.' },
      { key: 'D', text: 'Mount Bromo, which is located in East Java attracts tourists.' }
    ],
    correctAnswer: 'B',
    explanation: 'A non-defining relative clause provides non-essential extra information and must be enclosed by a pair of commas (before the relative pronoun "which" and after the clause).'
  },
  {
    id: 'PENY-C-ENG-08',
    number: 8,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Transform the direct speech into reported speech:\nProfessor Lee said, "I will submit the research findings tomorrow."',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Reported Speech', 'Backshifting Tenses in Indirect Speech', '#EA580C',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FFF7ED" stroke="#EA580C" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#C2410C" text-anchor="middle">Direct: will ➔ Indirect: would</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#9A3412" text-anchor="middle">Direct: tomorrow ➔ Indirect: the next/following day</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Professor Lee said that he will submit the findings tomorrow.' },
      { key: 'B', text: 'Professor Lee said that he would submit the research findings the following day.' },
      { key: 'C', text: 'Professor Lee said that I would submit the research findings tomorrow.' },
      { key: 'D', text: 'Professor Lee said that he had submitted the research findings yesterday.' }
    ],
    correctAnswer: 'B',
    explanation: 'In reported speech with past reporting verb ("said"), modal "will" backshifts to "would", pronoun "I" shifts to "he", and "tomorrow" becomes "the following day".'
  },
  {
    id: 'PENY-C-ENG-09',
    number: 9,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Read the sentence: "The speaker presented an eloquent defense of clean energy technologies, leaving the auditorium audience deeply inspired." What does "eloquent" mean?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Advanced Lexicon', 'Contextual Meaning of "Eloquent"', '#16A34A',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">🎙️ 👏 💡</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#15803D" text-anchor="middle">Fluent, persuasive, and beautifully expressed speech</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Hesitant and difficult to hear' },
      { key: 'B', text: 'Fluent, persuasive, and powerfully expressive' },
      { key: 'C', text: 'Confusing and full of technical jargon' },
      { key: 'D', text: 'Loud and aggressive' }
    ],
    correctAnswer: 'B',
    explanation: '"Eloquent" describes fluent, persuasive, and graceful use of language in speech or writing.'
  },
  {
    id: 'PENY-C-ENG-10',
    number: 10,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Which sentence correctly uses a subjunctive or hypothetical inversion to express an unlikely condition?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Advanced Syntax', 'Inversion in Conditional Clauses', '#8B5CF6',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#F5F3FF" stroke="#8B5CF6" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#6D28D9" text-anchor="middle">Inversion: "Should you need..." = "If you need..."</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#4C1D95" text-anchor="middle">Formal written English convention</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Should you require any further assistance, please contact the coordinator.' },
      { key: 'B', text: 'If you will need any further assistance, please contact us.' },
      { key: 'C', text: 'Unless you need assistance, do not call anyone.' },
      { key: 'D', text: 'You should need assistance contact the desk.' }
    ],
    correctAnswer: 'A',
    explanation: '"Should you require..." is the correct formal inversion for conditional clauses, replacing "If you should require..." without requiring "if".'
  },

  // --- SINGAPORE SECONDARY (Soal 11 - 15) ---
  {
    id: 'PENY-C-ENG-11',
    number: 11,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Synthesis and Transformation: Combine using "In spite of":\nSentence 1: He was severely injured.\nSentence 2: He managed to drag his teammate out of the burning vehicle.',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Synthesis', 'Concession with "In spite of"', '#DC2626',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#991B1B" text-anchor="middle">Rule: In spite of + [noun phrase / being + V3]</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#B91C1C" text-anchor="middle">In spite of being severely injured, he managed to...</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'In spite of he was injured, he managed to save his teammate.' },
      { key: 'B', text: 'In spite of being severely injured, he managed to drag his teammate out.' },
      { key: 'C', text: 'In spite of his teammate was in danger, he was injured.' },
      { key: 'D', text: 'He managed to drag his teammate in spite of he could not walk.' }
    ],
    correctAnswer: 'B',
    explanation: '"In spite of" is a prepositional phrase that must be followed by a noun phrase or gerund ("being severely injured"), never a finite clause.'
  },
  {
    id: 'PENY-C-ENG-12',
    number: 12,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Modal of Deduction: "The laboratory door is still double-locked from the inside and Dr. Evans\' coat is hanging on the peg. He ... left the building yet."',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Modals of Deduction', 'Logical Deduction in Past/Present', '#D97706',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#92400E" text-anchor="middle">Evidence: Door locked from inside & coat still hanging</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#B45309" text-anchor="middle">Strong negative certainty ➔ "can\'t have / couldn\'t have"</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'must have' },
      { key: 'B', text: 'can\'t have' },
      { key: 'C', text: 'should have' },
      { key: 'D', text: 'might not' }
    ],
    correctAnswer: 'B',
    explanation: '"Can\'t have + V3" is used to deduce with high certainty that something was impossible given strong contradictory physical evidence.'
  },
  {
    id: 'PENY-C-ENG-13',
    number: 13,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Cloze Passage: "The implementation of the new circular economy regulations was met with widespread acclaim, as it promised to ... both industrial pollution and resource depletion."',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Vocabulary Cloze', 'Advanced Collocations', '#059669',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#ECFDF5" stroke="#059669" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#065F46" text-anchor="middle">Collocation with "pollution and depletion"</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">Target verb meaning alleviate or diminish</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'mitigate' },
      { key: 'B', text: 'aggravate' },
      { key: 'C', text: 'deteriorate' },
      { key: 'D', text: 'provoke' }
    ],
    correctAnswer: 'A',
    explanation: '"Mitigate" means to make less severe, harmful, or painful. The other words mean to worsen (aggravate, deteriorate) or incite (provoke).'
  },
  {
    id: 'PENY-C-ENG-14',
    number: 14,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Correlative Conjunctions: "The university exchange programme offers ... comprehensive financial scholarships ... international internship placements to qualifying candidates."',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Correlative Conjunctions', 'Parallel Structure (not only ... but also)', '#6366F1',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#EEF2FF" stroke="#6366F1" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#4338CA" text-anchor="middle">Pair: "not only ... but also ..."</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#312E81" text-anchor="middle">Links two parallel noun phrases</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'either ... nor' },
      { key: 'B', text: 'not only ... but also' },
      { key: 'C', text: 'both ... or' },
      { key: 'D', text: 'neither ... and' }
    ],
    correctAnswer: 'B',
    explanation: 'The correlative pair "not only ... but also" connects two positive parallel items with emphasis.'
  },
  {
    id: 'PENY-C-ENG-15',
    number: 15,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Identify the grammatically correct sentence that avoids dangling modifiers:',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Syntax & Modifiers', 'Avoiding Dangling Modifiers', '#10B981',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">Participial phrase: "Having calibrated the sensor, ..."</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#065F46" text-anchor="middle">Subject must be the person who calibrated</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Having calibrated the sensor, the test was initiated by the team.' },
      { key: 'B', text: 'Having calibrated the sensor, the research team initiated the test.' },
      { key: 'C', text: 'Having calibrated the sensor, the laboratory was closed.' },
      { key: 'D', text: 'Having calibrated the sensor, errors were not detected.' }
    ],
    correctAnswer: 'B',
    explanation: 'In sentence B, the subject immediately following the introductory modifier ("the research team") is the agent that actually calibrated the sensor, avoiding a dangling modifier.'
  },

  // --- INTERNATIONAL BACCALAUREATE (IB MYP) (Soal 16 - 20) ---
  {
    id: 'PENY-C-ENG-16',
    number: 16,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Analyze the argumentative excerpt on artificial intelligence: "While generative algorithms enhance productivity, unchecked reliance risks eroding authentic human critical thinking." What rhetorical technique does the author employ here?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Critical Discourse', 'Rhetorical Concession & Balance', '#9333EA',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#6B21A8" text-anchor="middle">Concession ("While...") + Counter-critique</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#7E22CE" text-anchor="middle">Demonstrating a balanced perspective</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Pure emotional hyperbole' },
      { key: 'B', text: 'Balanced concession followed by a critical counter-argument' },
      { key: 'C', text: 'Personal attack (ad hominem)' },
      { key: 'D', text: 'Circular reasoning' }
    ],
    correctAnswer: 'B',
    explanation: 'The author acknowledges the benefit (concession: "While algorithms enhance productivity") before presenting the cautionary risk, creating a nuanced and balanced evaluation.'
  },
  {
    id: 'PENY-C-ENG-17',
    number: 17,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Study the multimodal infographic slogan: "We do not inherit the Earth from our ancestors; we borrow it from our children." What is the central ecological message?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Global Sustainability', 'Intergenerational Ecological Stewardship', '#059669',
        `<g transform="translate(60, 15)">
          <rect x="20" y="15" width="240" height="75" rx="12" fill="#ECFDF5" stroke="#059669" stroke-width="2"/>
          <text x="140" y="42" font-size="22" text-anchor="middle">🌱 🤝 🌏</text>
          <text x="140" y="62" font-size="10" font-weight="900" fill="#065F46" text-anchor="middle">INTERGENERATIONAL STEWARDSHIP</text>
          <text x="140" y="78" font-size="9" font-weight="bold" fill="#047857" text-anchor="middle">Preserving natural capital for future generations</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Older generations own all natural resources permanently.' },
      { key: 'B', text: 'Humans hold a moral responsibility of stewardship to preserve the Earth for future generations.' },
      { key: 'C', text: 'Children should buy farmland from their parents.' },
      { key: 'D', text: 'Natural resources are infinite and need no conservation.' }
    ],
    correctAnswer: 'B',
    explanation: 'The proverb emphasizes intergenerational stewardship: we are temporary caretakers who must preserve the planet sustainably for those who come after us.'
  },
  {
    id: 'PENY-C-ENG-18',
    number: 18,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'In intercultural communication, what does the idiom "reading between the lines" mean?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Idiom & Subtext', 'Implicit Meaning & Subtext', '#EA580C',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FFF7ED" stroke="#EA580C" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">📖 🔍 💡</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#C2410C" text-anchor="middle">Understanding implicit subtext beyond literal words</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Reading words out loud very fast' },
      { key: 'B', text: 'Understanding the implied, hidden, or deeper meaning not explicitly stated' },
      { key: 'C', text: 'Checking spelling mistakes with a ruler' },
      { key: 'D', text: 'Translating each sentence word for word' }
    ],
    correctAnswer: 'B',
    explanation: '"Reading between the lines" means discerning implicit clues, hidden attitudes, or indirect messages that the speaker or writer did not say aloud.'
  },
  {
    id: 'PENY-C-ENG-19',
    number: 19,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Analyze the poetic metaphor: "Hope is the thing with feathers / That perches in the soul / And sings the tune without the words / And never stops at all." What does the bird metaphor represent?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Literary Analysis', 'Metaphor in Emily Dickinson\'s Poetry', '#DB2777',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FDF2F8" stroke="#DB2777" stroke-width="1.5"/>
          <text x="140" y="45" font-size="22" text-anchor="middle">🕊️ 🎶 ❤️</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#9D174D" text-anchor="middle">Hope as an enduring, uplifting inner presence</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'A wild predator hunting for seeds' },
      { key: 'B', text: 'An enduring, comforting spirit of optimism that survives adversity' },
      { key: 'C', text: 'A noisy distraction in the morning' },
      { key: 'D', text: 'A physical pet that requires a cage' }
    ],
    correctAnswer: 'B',
    explanation: 'Emily Dickinson metaphorically compares hope to a gentle bird that perches within the soul, continuously singing and providing comfort even in stormy times.'
  },
  {
    id: 'PENY-C-ENG-20',
    number: 20,
    category: 'Kategori C',
    subject: 'Bahasa Inggris',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Media Literacy inquiry: Which of the following is a key hallmark of a reputable, peer-reviewed scientific digital journal?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Media Verification', 'Evaluating Academic Credibility', '#2563EB',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#1E40AF" text-anchor="middle">Rigorous independent peer review & cited references</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#3B82F6" text-anchor="middle">Replicable data methodologies & transparent authors</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Sensational clickbait headlines with anonymous authors' },
      { key: 'B', text: 'Transparent research methodology, verifiable cited sources, and rigorous review by independent field experts' },
      { key: 'C', text: 'Pop-up commercials selling unrelated miracle products' },
      { key: 'D', text: 'Zero mention of experimental limitations or contrary data' }
    ],
    correctAnswer: 'B',
    explanation: 'Credible academic publications undergo independent peer review by domain specialists, provide verifiable references, and detail reproducible methodologies.'
  }
];
