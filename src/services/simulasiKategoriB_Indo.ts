import { QuestionItem } from './cbtQuestionTypes';
import { createSimulasiSvg } from './simulasiSvgIllustrations';

// Kategori B: SD/MI - Bahasa Indonesia (20 Soal Sangat Mudah & Bergambar)

export const KATEGORI_B_INDO: QuestionItem[] = [
  {
    id: 'SIM-B-IND-01',
    number: 1,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Tanda baca yang digunakan pada akhir kalimat tanya adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Tanda Baca', 'Tanda Tanya (?)', '#2563EB',
        '<g transform="translate(130, 20)"><rect x="25" y="15" width="80" height="85" rx="14" fill="#DBEAFE"/><text x="65" y="75" font-size="60" font-weight="900" fill="#1D4ED8" text-anchor="middle">?</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Tanda tanya (?)' }, { key: 'B', text: 'Tanda titik (.)' }, { key: 'C', text: 'Tanda seru (!)' }, { key: 'D', text: 'Tanda koma (,)' }],
    correctAnswer: 'A',
    explanation: 'Kalimat yang menanyakan sesuatu selalu diakhiri tanda tanya (?).'
  },
  {
    id: 'SIM-B-IND-02',
    number: 2,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Sinonim (persamaan kata) dari kata "PANDAI" adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Sinonim Kata', 'Pandai = Pintar', '#16A34A',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#DCFCE7"/><text x="90" y="55" font-size="16" font-weight="bold" fill="#15803D" text-anchor="middle">PANDAI = PINTAR</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Pintar' }, { key: 'B', text: 'Malas' }, { key: 'C', text: 'Bodoh' }, { key: 'D', text: 'Lambat' }],
    correctAnswer: 'A',
    explanation: 'Kata pandai memiliki arti yang sama dengan pintar atau cerdas.'
  },
  {
    id: 'SIM-B-IND-03',
    number: 3,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Antonim (lawan kata) dari kata "GELAP" adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Antonim Kata', 'Lawan Kata Gelap', '#D97706',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#FEF3C7"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#B45309" text-anchor="middle">TERANG</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Terang' }, { key: 'B', text: 'Hitam' }, { key: 'C', text: 'Malam' }, { key: 'D', text: 'Redup' }],
    correctAnswer: 'A',
    explanation: 'Lawan kata dari gelap adalah terang.'
  },
  {
    id: 'SIM-B-IND-04',
    number: 4,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Subjek pada kalimat: "Budi membaca buku di perpustakaan" adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Unsur Kalimat (S-P-O-K)', 'Menentukan Subjek', '#7C3AED',
        '<g transform="translate(80, 25)"><rect x="10" y="20" width="220" height="55" rx="10" fill="#EDE9FE"/><text x="120" y="52" font-size="14" font-weight="bold" fill="#6D28D9" text-anchor="middle">Budi membaca buku</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Budi' }, { key: 'B', text: 'Membaca' }, { key: 'C', text: 'Buku' }, { key: 'D', text: 'Di perpustakaan' }],
    correctAnswer: 'A',
    explanation: 'Budi bertindak sebagai pelaku atau Subjek (S) dalam kalimat tersebut.'
  },
  {
    id: 'SIM-B-IND-05',
    number: 5,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Kata tanya yang digunakan untuk menanyakan TEMPAT kejadian adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Kata Tanya', 'Menanyakan Tempat', '#0284C7',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#E0F2FE"/><text x="90" y="55" font-size="16" font-weight="bold" fill="#0369A1" text-anchor="middle">DI MANA</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Di mana' }, { key: 'B', text: 'Kapan' }, { key: 'C', text: 'Mengapa' }, { key: 'D', text: 'Berapa' }],
    correctAnswer: 'A',
    explanation: 'Kata tanya "Di mana" digunakan khusus untuk menanyakan letak atau tempat.'
  },
  {
    id: 'SIM-B-IND-06',
    number: 6,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Dongeng yang menceritakan kehidupan hewan yang berperilaku seperti manusia disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Cerita Rakyat', 'Kancil & Buaya', '#059669',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#D1FAE5"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#047857" text-anchor="middle">FABEL</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Fabel' }, { key: 'B', text: 'Legenda' }, { key: 'C', text: 'Mite' }, { key: 'D', text: 'Sage' }],
    correctAnswer: 'A',
    explanation: 'Fabel adalah cerita fiksi bertokoh binatang yang mengandung pesan moral.'
  },
  {
    id: 'SIM-B-IND-07',
    number: 7,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Penulisan huruf kapital yang benar di bawah ini adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Ejaan Bahasa', 'Huruf Kapital Nama Kota', '#DC2626',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="55" rx="10" fill="#FEE2E2"/><text x="100" y="52" font-size="15" font-weight="bold" fill="#B91C1C" text-anchor="middle">Kota Bandung</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Kota Bandung' }, { key: 'B', text: 'kota bandung' }, { key: 'C', text: 'Kota bandung' }, { key: 'D', text: 'koTa BanDung' }],
    correctAnswer: 'A',
    explanation: 'Nama diri geografi seperti nama kota ditulis diawali huruf kapital (Bandung).'
  },
  {
    id: 'SIM-B-IND-08',
    number: 8,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Awalan "me-" pada kata dasar "tulis" membentuk kata yang benar yaitu...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Imbuhan Kata', 'me- + tulis', '#4F46E5',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="55" rx="10" fill="#EEF2FF"/><text x="100" y="52" font-size="15" font-weight="bold" fill="#3730A3" text-anchor="middle">Menulis</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Menulis' }, { key: 'B', text: 'Metulis' }, { key: 'C', text: 'Mengtulis' }, { key: 'D', text: 'Menyulist' }],
    correctAnswer: 'A',
    explanation: 'Huruf t pada awal kata tulis luluh menjadi n ketika diberi awalan me- (menulis).'
  },
  {
    id: 'SIM-B-IND-09',
    number: 9,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Pantun anak-anak biasanya terdiri dari berapa baris dalam satu bait?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Karya Sastra', 'Bait Pantun (4 Baris)', '#EA580C',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#FFEDD5"/><text x="80" y="55" font-size="15" font-weight="bold" fill="#C2410C" text-anchor="middle">4 Baris</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '2 baris' }, { key: 'B', text: '4 baris' }, { key: 'C', text: '6 baris' }, { key: 'D', text: '8 baris' }],
    correctAnswer: 'B',
    explanation: 'Satu bait pantun standar terdiri dari 4 baris (2 baris sampiran dan 2 baris isi).'
  },
  {
    id: 'SIM-B-IND-10',
    number: 10,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Kata dasar dari kata berimbuhan "MEMBANTU" adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Kata Dasar', 'Membantu', '#10B981',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#D1FAE5"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#047857" text-anchor="middle">BANTU</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Bantu' }, { key: 'B', text: 'Mbantu' }, { key: 'C', text: 'Bantua' }, { key: 'D', text: 'Antu' }],
    correctAnswer: 'A',
    explanation: 'Kata dasar dari membantu adalah bantu.'
  },
  {
    id: 'SIM-B-IND-11',
    number: 11,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Ungkapan "RINGAN TANGAN" memiliki arti suka...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Makna Ungkapan', 'Ringan Tangan = Suka Menolong', '#2563EB',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="60" rx="10" fill="#DBEAFE"/><text x="100" y="55" font-size="14" font-weight="bold" fill="#1E40AF" text-anchor="middle">Suka Menolong</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Menolong' }, { key: 'B', text: 'Marah' }, { key: 'C', text: 'Tidur' }, { key: 'D', text: 'Bermain' }],
    correctAnswer: 'A',
    explanation: 'Ringan tangan dalam arti positif berarti orang yang gemar menolong sesama.'
  },
  {
    id: 'SIM-B-IND-12',
    number: 12,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Tokoh yang memiliki sifat baik dalam sebuah cerita disebut tokoh...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Karakter Tokoh', 'Tokoh Baik', '#16A34A',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#DCFCE7"/><text x="90" y="55" font-size="15" font-weight="bold" fill="#166534" text-anchor="middle">PROTAGONIS</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Protagonis' }, { key: 'B', text: 'Antagonis' }, { key: 'C', text: 'Tritagonis' }, { key: 'D', text: 'Figuran' }],
    correctAnswer: 'A',
    explanation: 'Tokoh utama yang berwatak baik disebut protagonis.'
  },
  {
    id: 'SIM-B-IND-13',
    number: 13,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Kata baku yang tepat di bawah ini adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Kata Baku', 'Jadwal vs Jadual', '#0284C7',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#E0F2FE"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#0369A1" text-anchor="middle">JADWAL</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Jadwal' }, { key: 'B', text: 'Jadual' }, { key: 'C', text: 'Jatwal' }, { key: 'D', text: 'Jadwel' }],
    correctAnswer: 'A',
    explanation: 'Penulisan baku sesuai KBBI adalah "Jadwal".'
  },
  {
    id: 'SIM-B-IND-14',
    number: 14,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Gagasan utama yang mendasari isi dari suatu paragraf disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Paragraf', 'Ide Pokok', '#D97706',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#FEF3C7"/><text x="80" y="55" font-size="15" font-weight="bold" fill="#B45309" text-anchor="middle">IDE POKOK</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Ide pokok / Pikiran utama' }, { key: 'B', text: 'Judul buku' }, { key: 'C', text: 'Kata penutup' }, { key: 'D', text: 'Daftar pustaka' }],
    correctAnswer: 'A',
    explanation: 'Ide pokok adalah inti atau topik utama yang dibahas dalam sebuah paragraf.'
  },
  {
    id: 'SIM-B-IND-15',
    number: 15,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary Literacy',
    difficulty: 'Sangat Mudah',
    questionText: 'Pesan moral yang ingin disampaikan oleh pengarang kepada pembaca disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Unsur Cerita', 'Amanat Cerita', '#7C3AED',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#EDE9FE"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#6D28D9" text-anchor="middle">AMANAT</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Amanat' }, { key: 'B', text: 'Alur' }, { key: 'C', text: 'Latar' }, { key: 'D', text: 'Sudut pandang' }],
    correctAnswer: 'A',
    explanation: 'Amanat adalah pesan kebaikan yang dapat kita teladani dari suatu cerita.'
  },
  {
    id: 'SIM-B-IND-16',
    number: 16,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary Literacy',
    difficulty: 'Sangat Mudah',
    questionText: 'Kalimat yang berisi perintah atau ajakan di bawah ini adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Jenis Kalimat', 'Kalimat Perintah (!)', '#EF4444',
        '<g transform="translate(90, 25)"><rect x="10" y="20" width="200" height="55" rx="10" fill="#FEE2E2"/><text x="110" y="52" font-size="13" font-weight="bold" fill="#B91C1C" text-anchor="middle">Jagalah kebersihan kelas!</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Tutuplah pintu itu sekarang!' }, { key: 'B', text: 'Apakah kamu sudah makan?' }, { key: 'C', text: 'Hari ini cuaca sangat cerah.' }, { key: 'D', text: 'Saya suka buah apel.' }],
    correctAnswer: 'A',
    explanation: '"Tutuplah pintu itu sekarang!" adalah kalimat perintah yang menyuruh seseorang melakukan sesuatu.'
  },
  {
    id: 'SIM-B-IND-17',
    number: 17,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary Literacy',
    difficulty: 'Sangat Mudah',
    questionText: 'Tempat dan waktu terjadinya peristiwa dalam cerita dinamakan...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Unsur Cerita', 'Latar (Setting)', '#059669',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#D1FAE5"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#047857" text-anchor="middle">LATAR</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Latar (Setting)' }, { key: 'B', text: 'Tema' }, { key: 'C', text: 'Penokohan' }, { key: 'D', text: 'Gaya bahasa' }],
    correctAnswer: 'A',
    explanation: 'Latar mencakup waktu, suasana, dan tempat terjadinya cerita.'
  },
  {
    id: 'SIM-B-IND-18',
    number: 18,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary Literacy',
    difficulty: 'Sangat Mudah',
    questionText: 'Kamus Besar Bahasa Indonesia (KBBI) digunakan untuk mencari...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Buku Rujukan', 'KBBI', '#2563EB',
        '<g transform="translate(120, 20)"><rect x="25" y="20" width="90" height="75" rx="8" fill="#DBEAFE" stroke="#2563EB" stroke-width="3"/><text x="70" y="65" font-size="16" font-weight="900" fill="#1D4ED8" text-anchor="middle">KBBI</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Arti atau makna kata' }, { key: 'B', text: 'Nomor telepon' }, { key: 'C', text: 'Jadwal kereta' }, { key: 'D', text: 'Peta dunia' }],
    correctAnswer: 'A',
    explanation: 'KBBI adalah kamus rujukan resmi untuk mengetahui arti dan ejaan baku suatu kata.'
  },
  {
    id: 'SIM-B-IND-19',
    number: 19,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary Literacy',
    difficulty: 'Sangat Mudah',
    questionText: 'Kata penghubung yang menyatakan SEBAB terjadinya sesuatu adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Kata Hubung', 'Konjungsi Sebab', '#D97706',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#FEF3C7"/><text x="90" y="55" font-size="16" font-weight="bold" fill="#B45309" text-anchor="middle">KARENA</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Karena' }, { key: 'B', text: 'Dan' }, { key: 'C', text: 'Tetapi' }, { key: 'D', text: 'Atau' }],
    correctAnswer: 'A',
    explanation: 'Kata "karena" digunakan untuk menjelaskan penyebab suatu hal.'
  },
  {
    id: 'SIM-B-IND-20',
    number: 20,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary Literacy',
    difficulty: 'Sangat Mudah',
    questionText: 'Pengumuman resmi dari kepala sekolah biasanya dibacakan saat...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Kegiatan Sekolah', 'Upacara Bendera', '#EF4444',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="55" rx="10" fill="#FEE2E2"/><text x="100" y="52" font-size="14" font-weight="bold" fill="#991B1B" text-anchor="middle">Upacara Bendera</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Upacara bendera hari Senin' }, { key: 'B', text: 'Saat jam tidur malam' }, { key: 'C', text: 'Saat libur sekolah' }, { key: 'D', text: 'Saat makan di kantin' }],
    correctAnswer: 'A',
    explanation: 'Upacara bendera hari Senin adalah sarana resmi penyampaian amanat dan pengumuman sekolah.'
  }
];
