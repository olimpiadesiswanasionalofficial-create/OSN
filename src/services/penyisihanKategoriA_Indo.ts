import { QuestionItem } from './cbtQuestionTypes';
import { createPenyisihanSvg } from './simulasiSvgIllustrations';

// SOAL RESMI BABAK PENYISIHAN: BAHASA INDONESIA PAUD/TK (Kategori A)
// 20 Soal Pilihan Ganda Kurikulum Campuran (Merdeka, Cambridge, Singapore, IB)
// Tingkat Kesulitan: Menengah | 100% Bergambar & Unik

export const PENYISIHAN_A_INDO: QuestionItem[] = [
  // --- KURIKULUM MERDEKA (Soal 1 - 5) ---
  {
    id: 'PENY-A-IND-01',
    number: 1,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Huruf vokal apakah yang mengawali kata benda pada gambar berikut? (APEL)',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Huruf Vokal', 'Huruf Awal Buah Apel', '#EF4444',
        `<g transform="translate(110, 20)">
          <text x="50" y="65" font-size="44">🍎</text>
          <text x="110" y="65" font-size="34" font-weight="900" fill="#DC2626">_ P E L</text>
          <text x="80" y="115" font-size="12" font-weight="800" fill="#991B1B" text-anchor="middle">Buah Apel Merah</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Huruf A' },
      { key: 'B', text: 'Huruf I' },
      { key: 'C', text: 'Huruf U' }
    ],
    correctAnswer: 'A',
    explanation: 'Kata "APEL" diawali oleh huruf vokal A (A - P - E - L).'
  },
  {
    id: 'PENY-A-IND-02',
    number: 2,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Suku kata awal apakah yang tepat untuk melengkapi nama benda ini? ( ... - KU )',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Suku Kata', 'Melengkapi Kata Buku', '#2563EB',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">📚</text>
          <text x="120" y="65" font-size="30" font-weight="900" fill="#1D4ED8">[ ... ] - K U</text>
          <text x="85" y="115" font-size="12" font-weight="800" fill="#1E3A8A" text-anchor="middle">Benda Bacaan</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'BU (Buku)' },
      { key: 'B', text: 'SA (Saku)' },
      { key: 'C', text: 'PA (Paku)' }
    ],
    correctAnswer: 'A',
    explanation: 'Buku diawali dengan suku kata "BU", sehingga digabungkan menjadi "BU-KU".'
  },
  {
    id: 'PENY-A-IND-03',
    number: 3,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Kata santun: Ketika Siti tidak sengaja menyenggol tempat pensil Edo hingga jatuh, Siti harus mengucapkan apa?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Kata Santun', 'Permintaan Maaf yang Santun', '#EA580C',
        `<g transform="translate(90, 20)">
          <text x="50" y="65" font-size="38">👧</text>
          <text x="110" y="65" font-size="28">💬</text>
          <text x="160" y="65" font-size="38">👦</text>
          <text x="105" y="115" font-size="12" font-weight="800" fill="#9A3412" text-anchor="middle">Meminta Maaf dengan Tulus</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Tolong' },
      { key: 'B', text: 'Maaf' },
      { key: 'C', text: 'Sama-sama' }
    ],
    correctAnswer: 'B',
    explanation: 'Ketika melakukan kesalahan tanpa sengaja, kita wajib mengucapkan kata "Maaf".'
  },
  {
    id: 'PENY-A-IND-04',
    number: 4,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Lawan kata: Gajah bertubuh BESAR, sedangkan semut bertubuh apa?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Lawan Kata', 'Besar vs Kecil', '#7C3AED',
        `<g transform="translate(80, 20)">
          <text x="50" y="65" font-size="44">🐘</text>
          <text x="110" y="65" font-size="18" font-weight="900" fill="#6D28D9">lawan kata</text>
          <text x="200" y="65" font-size="26">🐜</text>
          <text x="125" y="115" font-size="12" font-weight="800" fill="#4C1D95" text-anchor="middle">Gajah Besar & Semut ...</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Kecil' },
      { key: 'B', text: 'Panjang' },
      { key: 'C', text: 'Tinggi' }
    ],
    correctAnswer: 'A',
    explanation: 'Lawan kata dari "Besar" adalah "Kecil".'
  },
  {
    id: 'PENY-A-IND-05',
    number: 5,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Manakah nama binatang yang berawalan huruf K?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Mengenal Huruf K', 'Hewan Berawalan Huruf K', '#16A34A',
        `<g transform="translate(60, 20)">
          <rect x="20" y="20" width="90" height="85" rx="12" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/>
          <text x="65" y="65" font-size="34" text-anchor="middle">🐱</text>
          <text x="65" y="92" font-size="11" font-weight="800" fill="#15803D" text-anchor="middle">Kucing (A)</text>
          <rect x="135" y="20" width="90" height="85" rx="12" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
          <text x="180" y="65" font-size="34" text-anchor="middle">🦆</text>
          <text x="180" y="92" font-size="11" font-weight="800" fill="#B45309" text-anchor="middle">Bebek (B)</text>
          <rect x="250" y="20" width="90" height="85" rx="12" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
          <text x="295" y="65" font-size="34" text-anchor="middle">🐘</text>
          <text x="295" y="92" font-size="11" font-weight="800" fill="#0369A1" text-anchor="middle">Gajah (C)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Kucing (A)' },
      { key: 'B', text: 'Bebek (B)' },
      { key: 'C', text: 'Gajah (C)' }
    ],
    correctAnswer: 'A',
    explanation: 'Kata "Kucing" diawali oleh huruf K (K-u-c-i-n-g).'
  },

  // --- CAMBRIDGE EARLY LITERACY (Soal 6 - 10) ---
  {
    id: 'PENY-A-IND-06',
    number: 6,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Cambridge Phonics: Kata manakah yang memiliki RIMA (bunyi akhiran) yang SAMA dengan kata "MATA"?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Rhyme & Sound', 'Rhyming Words with MATA', '#DB2777',
        `<g transform="translate(100, 20)">
          <rect x="20" y="20" width="180" height="70" rx="12" fill="#FCE7F3" stroke="#DB2777" stroke-width="2"/>
          <text x="60" y="65" font-size="34">👁️</text>
          <text x="130" y="65" font-size="24" font-weight="900" fill="#9D174D">M A T A</text>
          <text x="110" y="115" font-size="12" font-weight="800" fill="#BE185D" text-anchor="middle">Berakhiran bunyi "-TA"</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'KATA' },
      { key: 'B', text: 'BUKU' },
      { key: 'C', text: 'SAPU' }
    ],
    correctAnswer: 'A',
    explanation: 'Kata "Mata" dan "Kata" memiliki rima bunyi akhir yang sama (-ta).'
  },
  {
    id: 'PENY-A-IND-07',
    number: 7,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Lihat gambar! Budi sedang membaca buku di perpustakaan. Kalimat manakah yang menceritakan gambar tersebut?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Sentence Reading', 'Reading in the Library', '#2563EB',
        `<g transform="translate(120, 20)">
          <text x="60" y="65" font-size="44">👦 📖</text>
          <text x="60" y="115" font-size="13" font-weight="900" fill="#1D4ED8" text-anchor="middle">Budi senang membaca buku</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Budi sedang membaca buku cerita' },
      { key: 'B', text: 'Budi sedang bermain sepak bola' },
      { key: 'C', text: 'Budi sedang tidur di kasur' }
    ],
    correctAnswer: 'A',
    explanation: 'Gambar memperlihatkan anak laki-laki yang sedang asyik memegang dan membaca buku cerita.'
  },
  {
    id: 'PENY-A-IND-08',
    number: 8,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Berapa jumlah suku kata pada kata "M E N A R I"?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Syllable Counting', 'Counting Syllables', '#9333EA',
        `<g transform="translate(90, 20)">
          <text x="40" y="65" font-size="38">💃</text>
          <text x="135" y="65" font-size="22" font-weight="900" fill="#6B21A8">ME - NA - RI</text>
          <text x="110" y="115" font-size="12" font-weight="800" fill="#581C87" text-anchor="middle">Ketukan Suku Kata</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '2 suku kata' },
      { key: 'B', text: '3 suku kata' },
      { key: 'C', text: '4 suku kata' }
    ],
    correctAnswer: 'B',
    explanation: 'Kata "Me-na-ri" terdiri dari 3 suku kata (Me - na - ri).'
  },
  {
    id: 'PENY-A-IND-09',
    number: 9,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Susun huruf-huruf acak ini menjadi nama buah yang segar: [ J - E - R - U - K ]. Gambar apakah itu?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Word Unscramble', 'Arranging Fruit Letters', '#EA580C',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">🍊</text>
          <text x="120" y="65" font-size="24" font-weight="900" fill="#C2410C">J - E - R - U - K</text>
          <text x="85" y="115" font-size="12" font-weight="800" fill="#9A3412" text-anchor="middle">Buah Berwarna Oranye</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Jeruk' },
      { key: 'B', text: 'Jambu' },
      { key: 'C', text: 'Jagung' }
    ],
    correctAnswer: 'A',
    explanation: 'Huruf J - E - R - U - K tersusun membentuk kata "Jeruk".'
  },
  {
    id: 'PENY-A-IND-10',
    number: 10,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Profesi apakah pada gambar ini yang bertugas memadamkan kobaran api dan menolong warga?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Community Helpers', 'Firefighter Profession', '#DC2626',
        `<g transform="translate(110, 20)">
          <text x="50" y="65" font-size="44">👨‍🚒</text>
          <text x="110" y="65" font-size="34">🚒 🔥</text>
          <text x="80" y="115" font-size="12" font-weight="900" fill="#991B1B" text-anchor="middle">Pemadam Kebakaran</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Pemadam Kebakaran' },
      { key: 'B', text: 'Dokter Gigi' },
      { key: 'C', text: 'Petani Sawah' }
    ],
    correctAnswer: 'A',
    explanation: 'Petugas pemadam kebakaran mengendarai mobil pemadam untuk menolong warga dan memadamkan api.'
  },

  // --- SINGAPORE EARLY LANGUAGE CURRICULUM (Soal 11 - 15) ---
  {
    id: 'PENY-A-IND-11',
    number: 11,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Singapore CPA Language: Hubungkan gambar dengan kata yang tepat. Benda apakah yang kita pakai di kepala saat panas terik?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Object Identification', 'Pelindung Kepala', '#D97706',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">🧢</text>
          <text x="120" y="65" font-size="26" font-weight="900" fill="#B45309">T O P I</text>
          <text x="85" y="115" font-size="12" font-weight="800" fill="#78350F" text-anchor="middle">Dipakai di Kepala</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Topi' },
      { key: 'B', text: 'Sepatu' },
      { key: 'C', text: 'Kaos kaki' }
    ],
    correctAnswer: 'A',
    explanation: 'Topi (T-O-P-I) digunakan di kepala untuk melindungi dari sinar panas matahari.'
  },
  {
    id: 'PENY-A-IND-12',
    number: 12,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Kata tanya: Kata tanya apakah yang kita gunakan untuk menanyakan TEMPAT keberadaan sekolah?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Question Words', 'Asking for Places', '#0284C7',
        `<g transform="translate(110, 20)">
          <text x="50" y="65" font-size="44">🏫</text>
          <text x="110" y="65" font-size="28" font-weight="900" fill="#0369A1">Di mana ...?</text>
          <text x="80" y="115" font-size="12" font-weight="800" fill="#075985" text-anchor="middle">Menanyakan Lokasi Sekolah</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Di mana' },
      { key: 'B', text: 'Berapa' },
      { key: 'C', text: 'Siapa' }
    ],
    correctAnswer: 'A',
    explanation: 'Kata tanya "Di mana" digunakan untuk menanyakan lokasi atau tempat.'
  },
  {
    id: 'PENY-A-IND-13',
    number: 13,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Suara hewan: Hewan kucing mengeluarkan suara seperti apa?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Animal Sounds', 'Cat Sound Expression', '#059669',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">🐱</text>
          <text x="120" y="65" font-size="24" font-weight="900" fill="#047857">"Meong... meong!"</text>
          <text x="85" y="115" font-size="12" font-weight="800" fill="#065F46" text-anchor="middle">Suara Kucing Lucu</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Meong... meong' },
      { key: 'B', text: 'Kukuruyuk' },
      { key: 'C', text: 'Moo... moo' }
    ],
    correctAnswer: 'A',
    explanation: 'Kucing bersuara "meong", ayam jantan bersuara "kukuruyuk", dan sapi bersuara "moo".'
  },
  {
    id: 'PENY-A-IND-14',
    number: 14,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Lihat gambar jam dinding pagi hari! Ucapan salam apakah yang tepat saat kita baru sampai di sekolah pukul 07.00 pagi?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Morning Greeting', 'Good Morning Greeting', '#F59E0B',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="38">🌅</text>
          <text x="110" y="65" font-size="34">🎒 🏫</text>
          <text x="80" y="115" font-size="12" font-weight="900" fill="#B45309" text-anchor="middle">Pagi Hari di Sekolah</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Selamat Pagi' },
      { key: 'B', text: 'Selamat Malam' },
      { key: 'C', text: 'Selamat Tidur' }
    ],
    correctAnswer: 'A',
    explanation: 'Saat pagi hari kita mengucapkan salam "Selamat Pagi" kepada guru dan teman.'
  },
  {
    id: 'PENY-A-IND-15',
    number: 15,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Pengenalan rasa: Gula dan madu memiliki rasa apa di lidah kita?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Taste Perception', 'Sweet Sugar & Honey', '#EA580C',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">🍯</text>
          <text x="120" y="65" font-size="28" font-weight="900" fill="#C2410C">M A N I S</text>
          <text x="85" y="115" font-size="12" font-weight="800" fill="#9A3412" text-anchor="middle">Madu Alami</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Manis' },
      { key: 'B', text: 'Pahit' },
      { key: 'C', text: 'Asam' }
    ],
    correctAnswer: 'A',
    explanation: 'Gula dan madu memiliki rasa manis yang enak.'
  },

  // --- INTERNATIONAL BACCALAUREATE (IB PYP) (Soal 16 - 20) ---
  {
    id: 'PENY-A-IND-16',
    number: 16,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'IB Story Sequence: Urutan Cerita Gambar. Apa yang harus kita lakukan SETELAH bangun tidur di pagi hari sebelum berangkat ke sekolah?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Sequential Thinking', 'Morning Routine Sequence', '#0891B2',
        `<g transform="translate(70, 20)">
          <text x="30" y="65" font-size="34">🛏️ (1)</text>
          <text x="100" y="60" font-size="24">→</text>
          <text x="140" y="65" font-size="34">🚿 (2)</text>
          <text x="200" y="60" font-size="24">→</text>
          <text x="240" y="65" font-size="34">🏫 (3)</text>
          <text x="140" y="115" font-size="12" font-weight="900" fill="#0E7490" text-anchor="middle">Bangun Tidur → Mandi Bersih → Sekolah</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Mandi dan merapikan tempat tidur' },
      { key: 'B', text: 'Langsung bermain di luar rumah' },
      { key: 'C', text: 'Tidur lagi sampai siang' }
    ],
    correctAnswer: 'A',
    explanation: 'Urutan aktivitas pagi yang baik adalah bangun tidur, merapikan kasur, mandi bersih, sarapan, lalu berangkat sekolah.'
  },
  {
    id: 'PENY-A-IND-17',
    number: 17,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Ekspresi Emosi: Wajah anak pada gambar ini sedang menunjukkan perasaan apa saat mendapat hadiah balon warna-warni?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Emotion Expression', 'Happy Expression Face', '#16A34A',
        `<g transform="translate(110, 20)">
          <text x="50" y="65" font-size="44">😊</text>
          <text x="110" y="65" font-size="34">🎈 🎁</text>
          <text x="80" y="115" font-size="12" font-weight="900" fill="#15803D" text-anchor="middle">Tersenyum Bahagia</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Senang dan gembira' },
      { key: 'B', text: 'Sedih dan menangis' },
      { key: 'C', text: 'Marah dan kesal' }
    ],
    correctAnswer: 'A',
    explanation: 'Ekspresi senyuman lebar menunjukkan perasaan senang dan gembira (happy).'
  },
  {
    id: 'PENY-A-IND-18',
    number: 18,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Benda peralatan sekolah: Benda apakah yang kita gunakan untuk menggunting kertas lipat origami?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · School Tools', 'Scissors for Cutting Paper', '#7C3AED',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">✂️</text>
          <text x="120" y="65" font-size="34">📄</text>
          <text x="85" y="115" font-size="12" font-weight="900" fill="#6D28D9" text-anchor="middle">Gunting Kertas</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Gunting' },
      { key: 'B', text: 'Penggaris' },
      { key: 'C', text: 'Penghapus' }
    ],
    correctAnswer: 'A',
    explanation: 'Gunting digunakan untuk memotong atau menggunting kertas menjadi bentuk yang diinginkan.'
  },
  {
    id: 'PENY-A-IND-19',
    number: 19,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Keluarga Inti: Ibu dari ayah atau ibu dari bunda kita panggil dengan sebutan apa?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Family Tree', 'Grandmother in Family', '#DB2777',
        `<g transform="translate(110, 20)">
          <text x="50" y="65" font-size="44">👵</text>
          <text x="110" y="65" font-size="28" font-weight="900" fill="#BE185D">N E N E K</text>
          <text x="80" y="115" font-size="12" font-weight="900" fill="#9D174D" text-anchor="middle">Ibu dari Orang Tua Kita</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Nenek' },
      { key: 'B', text: 'Bibi' },
      { key: 'C', text: 'Kakak' }
    ],
    correctAnswer: 'A',
    explanation: 'Ibu dari ayah atau ibu dari bunda dipanggil Nenek.'
  },
  {
    id: 'PENY-A-IND-20',
    number: 20,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Benda di rumah: Di ruangan manakah ibu memasak sayur dan menggoreng lauk pauk yang lezat?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB PYP · Living Spaces', 'Cooking in the Kitchen', '#EA580C',
        `<g transform="translate(100, 20)">
          <text x="50" y="65" font-size="44">🍳</text>
          <text x="120" y="65" font-size="28" font-weight="900" fill="#EA580C">D A P U R</text>
          <text x="85" y="115" font-size="12" font-weight="900" fill="#9A3412" text-anchor="middle">Tempat Memasak Makanan</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Dapur' },
      { key: 'B', text: 'Kamar tidur' },
      { key: 'C', text: 'Kamar mandi' }
    ],
    correctAnswer: 'A',
    explanation: 'Dapur adalah ruangan di dalam rumah yang digunakan untuk memasak dan menyiapkan makanan.'
  }
];
