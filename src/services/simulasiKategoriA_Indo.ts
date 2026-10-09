import { QuestionItem } from './cbtQuestionTypes';
import { createSimulasiSvg } from './simulasiSvgIllustrations';

// Kategori A: PAUD/TK - Bahasa Indonesia (20 Soal Sangat Mudah & Bergambar)

export const KATEGORI_A_INDO: QuestionItem[] = [
  {
    id: 'SIM-A-IND-01',
    number: 1,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Huruf vokal pertama dalam abjad bahasa Indonesia adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Huruf Abjad', 'Huruf A', '#E11D48',
        '<g transform="translate(130, 20)"><rect x="25" y="15" width="90" height="90" rx="16" fill="#FFE4E6" stroke="#E11D48" stroke-width="4"/><text x="70" y="78" font-size="60" font-weight="900" fill="#E11D48" text-anchor="middle">A</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Huruf A' }, { key: 'B', text: 'Huruf B' }, { key: 'C', text: 'Huruf C' }, { key: 'D', text: 'Huruf D' }],
    correctAnswer: 'A',
    explanation: 'Huruf vokal pertama dalam abjad adalah huruf A (A, I, U, E, O).'
  },
  {
    id: 'SIM-A-IND-02',
    number: 2,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Benda untuk membaca cerita bergambar disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Benda Belajar', 'Buku Cerita', '#2563EB',
        '<g transform="translate(130, 20)"><rect x="20" y="20" width="100" height="80" rx="8" fill="#DBEAFE" stroke="#2563EB" stroke-width="4"/><line x1="70" y1="20" x2="70" y2="100" stroke="#1D4ED8" stroke-width="4"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Buku' }, { key: 'B', text: 'Sapu' }, { key: 'C', text: 'Piring' }, { key: 'D', text: 'Sendok' }],
    correctAnswer: 'A',
    explanation: 'Buku berisi tulisan dan gambar cerita yang kita baca.'
  },
  {
    id: 'SIM-A-IND-03',
    number: 3,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Kata apakah yang diucapkan saat kita diberi hadiah oleh teman?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Kata Santun', 'Terima Kasih', '#059669',
        '<g transform="translate(110, 20)"><rect x="15" y="25" width="150" height="70" rx="14" fill="#D1FAE5" stroke="#059669" stroke-width="3"/><text x="90" y="68" font-size="16" font-weight="bold" fill="#065F46" text-anchor="middle">Terima Kasih</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Terima kasih' }, { key: 'B', text: 'Pergi sana' }, { key: 'C', text: 'Diam saja' }, { key: 'D', text: 'Awas' }],
    correctAnswer: 'A',
    explanation: 'Ucapan santun saat menerima bantuan atau pemberian adalah "Terima kasih".'
  },
  {
    id: 'SIM-A-IND-04',
    number: 4,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Huruf vokal apa yang terdengar pada kata "I B U"?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Mengeja Kata', 'I - B - U', '#7C3AED',
        '<g transform="translate(100, 20)"><rect x="10" y="25" width="160" height="70" rx="14" fill="#EDE9FE"/><text x="90" y="70" font-size="32" font-weight="900" fill="#7C3AED" text-anchor="middle">I B U</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'I dan U' }, { key: 'B', text: 'O dan A' }, { key: 'C', text: 'E dan O' }, { key: 'D', text: 'A saja' }],
    correctAnswer: 'A',
    explanation: 'Kata "IBU" diawali huruf I dan diakhiri huruf U.'
  },
  {
    id: 'SIM-A-IND-05',
    number: 5,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Lawan kata dari kata "BESAR" adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Lawan Kata', 'Besar Lawannya?', '#EA580C',
        '<g transform="translate(80, 20)"><circle cx="50" cy="60" r="35" fill="#FB923C"/><text x="50" y="65" font-size="12" font-weight="bold" fill="#FFF" text-anchor="middle">Besar</text><circle cx="160" cy="60" r="14" fill="#FDBA74"/><text x="160" y="64" font-size="9" font-weight="bold" fill="#7C2D12" text-anchor="middle">Kecil</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Kecil' }, { key: 'B', text: 'Tinggi' }, { key: 'C', text: 'Panjang' }, { key: 'D', text: 'Banyak' }],
    correctAnswer: 'A',
    explanation: 'Lawan kata besar adalah kecil.'
  },
  {
    id: 'SIM-A-IND-06',
    number: 6,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Benda yang kita pakai di kaki sebelum memakai sepatu adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Pakaian', 'Kaus Kaki', '#0284C7',
        '<g transform="translate(130, 20)"><path d="M40,20 L40,70 Q40,95 70,95 L90,95 Q105,95 105,80 Q105,65 85,65 L60,65 L60,20 Z" fill="#BAE6FD" stroke="#0284C7" stroke-width="3"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Kaus kaki' }, { key: 'B', text: 'Topi' }, { key: 'C', text: 'Sarung tangan' }, { key: 'D', text: 'Kacamata' }],
    correctAnswer: 'A',
    explanation: 'Kaus kaki dipakai di kaki untuk melindungi kaki di dalam sepatu.'
  },
  {
    id: 'SIM-A-IND-07',
    number: 7,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Jika kita tidak sengaja menyenggol teman, kita mengucapkan...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Kata Santun', 'Minta Maaf', '#D97706',
        '<g transform="translate(110, 20)"><rect x="15" y="25" width="150" height="70" rx="14" fill="#FEF3C7" stroke="#D97706" stroke-width="3"/><text x="90" y="68" font-size="18" font-weight="bold" fill="#92400E" text-anchor="middle">Maaf</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Maaf' }, { key: 'B', text: 'Hore' }, { key: 'C', text: 'Selamat' }, { key: 'D', text: 'Halo' }],
    correctAnswer: 'A',
    explanation: 'Kata "Maaf" diucapkan saat kita berbuat salah.'
  },
  {
    id: 'SIM-A-IND-08',
    number: 8,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Huruf apakah yang mengawali kata "B O L A"?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Huruf Awal', 'B O L A', '#2563EB',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="45" fill="#3B82F6"/><text x="65" y="75" font-size="30" font-weight="900" fill="#FFF" text-anchor="middle">B</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Huruf B' }, { key: 'B', text: 'Huruf K' }, { key: 'C', text: 'Huruf M' }, { key: 'D', text: 'Huruf P' }],
    correctAnswer: 'A',
    explanation: 'Kata "BOLA" diawali dengan huruf B.'
  },
  {
    id: 'SIM-A-IND-09',
    number: 9,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Tempat untuk belajar bersama guru dan teman-teman disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Tempat Belajar', 'Sekolah', '#10B981',
        '<g transform="translate(130, 20)"><polygon points="65,15 15,55 115,55" fill="#EF4444"/><rect x="25" y="55" width="80" height="50" fill="#E2E8F0"/><rect x="55" y="70" width="20" height="35" fill="#3B82F6"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Sekolah' }, { key: 'B', text: 'Pasar' }, { key: 'C', text: 'Hutan' }, { key: 'D', text: 'Bandara' }],
    correctAnswer: 'A',
    explanation: 'Sekolah adalah tempat kita belajar dan menuntut ilmu.'
  },
  {
    id: 'SIM-A-IND-10',
    number: 10,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Alat tulis untuk menggambar dan mewarnai di buku gambar adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Alat Tulis', 'Krayon Warna', '#F59E0B',
        '<g transform="translate(130, 20)"><rect x="40" y="20" width="20" height="70" rx="4" fill="#F59E0B"/><polygon points="40,20 50,5 60,20" fill="#D97706"/><rect x="80" y="20" width="20" height="70" rx="4" fill="#10B981"/><polygon points="80,20 90,5 100,20" fill="#059669"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Krayon / Pensil Warna' }, { key: 'B', text: 'Sendok' }, { key: 'C', text: 'Gunting kuku' }, { key: 'D', text: 'Panci' }],
    correctAnswer: 'A',
    explanation: 'Krayon dan pensil warna digunakan untuk mewarnai gambar.'
  },
  {
    id: 'SIM-A-IND-11',
    number: 11,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Ucapan salam saat bertemu teman di pagi hari adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Salam Pagi', 'Selamat Pagi', '#3B82F6',
        '<g transform="translate(100, 20)"><rect x="10" y="25" width="170" height="65" rx="14" fill="#DBEAFE"/><text x="95" y="65" font-size="16" font-weight="bold" fill="#1E40AF" text-anchor="middle">Selamat Pagi!</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Selamat Pagi' }, { key: 'B', text: 'Selamat Tidur' }, { key: 'C', text: 'Selamat Malam' }, { key: 'D', text: 'Selamat Tinggal' }],
    correctAnswer: 'A',
    explanation: 'Di pagi hari kita menyapa dengan "Selamat Pagi".'
  },
  {
    id: 'SIM-A-IND-12',
    number: 12,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Benda pelindung kepala dari panas sinar matahari adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Aksesoris', 'Topi Lucu', '#EC4899',
        '<g transform="translate(130, 25)"><ellipse cx="70" cy="70" rx="60" ry="15" fill="#F472B6"/><path d="M40,70 Q40,25 70,25 Q100,25 100,70 Z" fill="#DB2777"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Topi' }, { key: 'B', text: 'Sepatu' }, { key: 'C', text: 'Celana' }, { key: 'D', text: 'Cincin' }],
    correctAnswer: 'A',
    explanation: 'Topi dipakai di atas kepala.'
  },
  {
    id: 'SIM-A-IND-13',
    number: 13,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Suara kokok ayam jantan di pagi hari berbunyi...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Suara Hewan', 'Ayam Berkokok', '#EF4444',
        '<g transform="translate(110, 20)"><rect x="10" y="25" width="160" height="65" rx="14" fill="#FEE2E2"/><text x="90" y="65" font-size="16" font-weight="bold" fill="#991B1B" text-anchor="middle">Kukuruyuk!</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Kukuruyuk!' }, { key: 'B', text: 'Meong-meong' }, { key: 'C', text: 'Guk-guk' }, { key: 'D', text: 'Cicit-cicit' }],
    correctAnswer: 'A',
    explanation: 'Ayam jantan berkokok kukuruyuk di waktu subuh dan pagi hari.'
  },
  {
    id: 'SIM-A-IND-14',
    number: 14,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapa jumlah suku kata pada kata "M A - K A N"?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Suku Kata', 'MA - KAN', '#8B5CF6',
        '<g transform="translate(90, 20)"><rect x="10" y="25" width="80" height="60" rx="10" fill="#EDE9FE"/><text x="50" y="62" font-size="20" font-weight="bold" fill="#6D28D9" text-anchor="middle">MA</text><rect x="100" y="25" width="80" height="60" rx="10" fill="#EDE9FE"/><text x="140" y="62" font-size="20" font-weight="bold" fill="#6D28D9" text-anchor="middle">KAN</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '1 suku kata' }, { key: 'B', text: '2 suku kata' }, { key: 'C', text: '3 suku kata' }, { key: 'D', text: '4 suku kata' }],
    correctAnswer: 'B',
    explanation: 'Kata MA-KAN diucapkan dalam 2 ketukan atau 2 suku kata.'
  },
  {
    id: 'SIM-A-IND-15',
    number: 15,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Literacy',
    difficulty: 'Sangat Mudah',
    questionText: 'Kata "MATAHARI" diawali dengan huruf...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Huruf Awal', 'M - Matahari', '#F59E0B',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="45" fill="#FDE68A"/><text x="65" y="78" font-size="44" font-weight="900" fill="#D97706" text-anchor="middle">M</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'M' }, { key: 'B', text: 'P' }, { key: 'C', text: 'T' }, { key: 'D', text: 'S' }],
    correctAnswer: 'A',
    explanation: 'Kata Matahari berawalan huruf M.'
  },
  {
    id: 'SIM-A-IND-16',
    number: 16,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Literacy',
    difficulty: 'Sangat Mudah',
    questionText: 'Benda yang kita gunakan untuk menggosok gigi agar bersih adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Kebersihan', 'Sikat Gigi', '#06B6D4',
        '<g transform="translate(120, 20)"><rect x="20" y="60" width="120" height="15" rx="7" fill="#06B6D4"/><rect x="110" y="45" width="30" height="15" rx="3" fill="#E2E8F0"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Sikat gigi' }, { key: 'B', text: 'Sapu lidi' }, { key: 'C', text: 'Gunting' }, { key: 'D', text: 'Penggaris' }],
    correctAnswer: 'A',
    explanation: 'Sikat gigi dan pasta gigi digunakan untuk membersihkan gigi setiap hari.'
  },
  {
    id: 'SIM-A-IND-17',
    number: 17,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Literacy',
    difficulty: 'Sangat Mudah',
    questionText: 'Ibu memasak makanan lezat di ruangan yang bernama...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Bagian Rumah', 'Dapur Rumah', '#F97316',
        '<g transform="translate(120, 20)"><rect x="20" y="25" width="120" height="70" rx="8" fill="#FFEDD5"/><text x="80" y="65" font-size="16" font-weight="bold" fill="#C2410C" text-anchor="middle">DAPUR</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Dapur' }, { key: 'B', text: 'Kamar mandi' }, { key: 'C', text: 'Garasi' }, { key: 'D', text: 'Halaman' }],
    correctAnswer: 'A',
    explanation: 'Dapur adalah tempat untuk memasak dan menyiapkan makanan.'
  },
  {
    id: 'SIM-A-IND-18',
    number: 18,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Literacy',
    difficulty: 'Sangat Mudah',
    questionText: 'Warna bendera negara kita Indonesia adalah merah dan...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Bendera Negara', 'Merah Putih', '#EF4444',
        '<g transform="translate(130, 20)"><rect x="20" y="20" width="100" height="35" fill="#EF4444"/><rect x="20" y="55" width="100" height="35" fill="#FFFFFF" stroke="#E2E8F0"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Putih' }, { key: 'B', text: 'Biru' }, { key: 'C', text: 'Kuning' }, { key: 'D', text: 'Hitam' }],
    correctAnswer: 'A',
    explanation: 'Bendera kebangsaan Indonesia adalah Sang Saka Merah Putih.'
  },
  {
    id: 'SIM-A-IND-19',
    number: 19,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Literacy',
    difficulty: 'Sangat Mudah',
    questionText: 'Lawan kata dari kata "TERANG" adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Lawan Kata', 'Terang Lawannya?', '#334155',
        '<g transform="translate(130, 20)"><rect x="20" y="20" width="100" height="80" rx="10" fill="#1E293B"/><text x="70" y="65" font-size="14" font-weight="bold" fill="#F8FAFC" text-anchor="middle">GELAP</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Gelap' }, { key: 'B', text: 'Silau' }, { key: 'C', text: 'Bening' }, { key: 'D', text: 'Bersih' }],
    correctAnswer: 'A',
    explanation: 'Lawan kata terang adalah gelap.'
  },
  {
    id: 'SIM-A-IND-20',
    number: 20,
    category: 'Kategori A',
    subject: 'Bahasa Indonesia',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Literacy',
    difficulty: 'Sangat Mudah',
    questionText: 'Kata yang berakhiran bunyi "PING" di bawah ini adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Rima Kata', 'Bunyi Akhir', '#059669',
        '<g transform="translate(110, 20)"><rect x="20" y="25" width="140" height="65" rx="12" fill="#D1FAE5"/><text x="90" y="65" font-size="18" font-weight="bold" fill="#047857" text-anchor="middle">KEPIN-G</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Caping' }, { key: 'B', text: 'Buku' }, { key: 'C', text: 'Meja' }, { key: 'D', text: 'Mata' }],
    correctAnswer: 'A',
    explanation: 'Kata "Caping" berakhiran bunyi -ping.'
  }
];
