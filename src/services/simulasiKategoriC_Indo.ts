import { QuestionItem } from './cbtQuestionTypes';
import { createSimulasiSvg } from './simulasiSvgIllustrations';

// Kategori C: SMP/MTs - Bahasa Indonesia (20 Soal Sangat Mudah & Bergambar)

export const KATEGORI_C_INDO: QuestionItem[] = [
  {
    id: 'SIM-C-IND-01',
    number: 1,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Teks yang berisi laporan hasil pengamatan atau observasi secara sistematis dan objektif disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Jenis Teks', 'Teks LHO', '#2563EB',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#DBEAFE"/><text x="90" y="55" font-size="16" font-weight="bold" fill="#1D4ED8" text-anchor="middle">TEKS LHO</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Teks Laporan Hasil Observasi (LHO)' }, { key: 'B', text: 'Teks Cerpen' }, { key: 'C', text: 'Teks Iklan' }, { key: 'D', text: 'Teks Puisi' }],
    correctAnswer: 'A',
    explanation: 'Teks LHO menyajikan informasi fakta hasil pengamatan objek secara ilmiah.'
  },
  {
    id: 'SIM-C-IND-02',
    number: 2,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Majas yang membandingkan benda mati seolah-olah memiliki sifat hidup seperti manusia disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Gaya Bahasa', 'Personifikasi', '#16A34A',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="60" rx="10" fill="#DCFCE7"/><text x="100" y="55" font-size="15" font-weight="bold" fill="#15803D" text-anchor="middle">PERSONIFIKASI</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Personifikasi' }, { key: 'B', text: 'Metafora' }, { key: 'C', text: 'Hiperbola' }, { key: 'D', text: 'Litotes' }],
    correctAnswer: 'A',
    explanation: 'Personifikasi mengumpamakan benda tak bernyawa dapat bertingkah laku seperti insan manusia.'
  },
  {
    id: 'SIM-C-IND-03',
    number: 3,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Kalimat fakta adalah kalimat yang berisi hal yang...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Fakta vs Opini', 'Benar-Benar Terjadi', '#059669',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="60" rx="10" fill="#D1FAE5"/><text x="100" y="55" font-size="15" font-weight="bold" fill="#047857" text-anchor="middle">BENAR TERJADI</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Benar-benar terjadi dan dapat dibuktikan' }, { key: 'B', text: 'Masih berupa dugaan atau perkiraan' }, { key: 'C', text: 'Pendapat pribadi seseorang' }, { key: 'D', text: 'Impian di masa depan' }],
    correctAnswer: 'A',
    explanation: 'Fakta adalah peristiwa nyata yang telah terbukti kebenarannya.'
  },
  {
    id: 'SIM-C-IND-04',
    number: 4,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Struktur teks prosedur yang berisi panduan urutan kegiatan adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Teks Prosedur', 'Langkah-langkah', '#D97706',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#FEF3C7"/><text x="90" y="55" font-size="15" font-weight="bold" fill="#B45309" text-anchor="middle">LANGKAH KERJA</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Langkah-langkah / Tahapan' }, { key: 'B', text: 'Tujuan' }, { key: 'C', text: 'Penutup' }, { key: 'D', text: 'Alat dan bahan' }],
    correctAnswer: 'A',
    explanation: 'Bagian langkah-langkah memuat urutan aksi petunjuk pengerjaan yang runtut.'
  },
  {
    id: 'SIM-C-IND-05',
    number: 5,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Paragraf yang kalimat utamanya terletak di awal paragraf disebut paragraf...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Pola Paragraf', 'Paragraf Deduktif', '#7C3AED',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#EDE9FE"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#6D28D9" text-anchor="middle">DEDUKTIF</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Deduktif' }, { key: 'B', text: 'Induktif' }, { key: 'C', text: 'Campuran' }, { key: 'D', text: 'Deskriptif' }],
    correctAnswer: 'A',
    explanation: 'Paragraf deduktif menempatkan ide pokok di kalimat pertama atau awal.'
  },
  {
    id: 'SIM-C-IND-06',
    number: 6,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Penulisan singkatan gelar akademik sarjana pendidikan yang baku menurut EYD adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Ejaan Bahasa (EYD)', 'S.Pd.', '#0284C7',
        '<g transform="translate(120, 20)"><rect x="20" y="20" width="100" height="70" rx="10" fill="#E0F2FE"/><text x="70" y="62" font-size="28" font-weight="900" fill="#0369A1" text-anchor="middle">S.Pd.</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'S.Pd.' }, { key: 'B', text: 'Spd' }, { key: 'C', text: 'S,Pd' }, { key: 'D', text: 'S.pd' }],
    correctAnswer: 'A',
    explanation: 'Sarjana Pendidikan disingkat S.Pd. dengan tanda titik di antara dan akhir singkatan.'
  },
  {
    id: 'SIM-C-IND-07',
    number: 7,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Teks yang bertujuan mengajak atau membujuk pembaca agar tertarik melakukan sesuatu disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Jenis Karangan', 'Teks Persuasi', '#EA580C',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#FFEDD5"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#C2410C" text-anchor="middle">PERSUASI</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Teks Persuasi' }, { key: 'B', text: 'Teks Narasi' }, { key: 'C', text: 'Teks Eksplanasi' }, { key: 'D', text: 'Teks Deskripsi' }],
    correctAnswer: 'A',
    explanation: 'Teks persuasi berisi ajakan atau imbauan untuk memengaruhi pembaca.'
  },
  {
    id: 'SIM-C-IND-08',
    number: 8,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Konjungsi antarkalimat yang menyatakan pertentangan adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Konjungsi', 'Akan Tetapi / Namun', '#4F46E5',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#EEF2FF"/><text x="90" y="55" font-size="16" font-weight="bold" fill="#3730A3" text-anchor="middle">NAMUN</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Namun' }, { key: 'B', text: 'Dan' }, { key: 'C', text: 'Sehingga' }, { key: 'D', text: 'Kemudian' }],
    correctAnswer: 'A',
    explanation: '"Namun" atau "Akan tetapi" menyatakan pertentangan dengan kalimat sebelumnya.'
  },
  {
    id: 'SIM-C-IND-09',
    number: 9,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Unsur 5W + 1H dalam teks berita yang menanyakan PELAKU peristiwa adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Unsur Berita', 'Who (Siapa)', '#DC2626',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#FEE2E2"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#B91C1C" text-anchor="middle">SIAPA (WHO)</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Siapa (Who)' }, { key: 'B', text: 'Di mana (Where)' }, { key: 'C', text: 'Kapan (When)' }, { key: 'D', text: 'Mengapa (Why)' }],
    correctAnswer: 'A',
    explanation: 'Kata tanya "Siapa" menggali keterangan orang atau pihak yang terlibat.'
  },
  {
    id: 'SIM-C-IND-10',
    number: 10,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Karya sastra berupa drama yang berakhir dengan peristiwa menyedihkan disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Jenis Drama', 'Tragedi', '#64748B',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#F1F5F9"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#334155" text-anchor="middle">TRAGEDI</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Tragedi' }, { key: 'B', text: 'Komedi' }, { key: 'C', text: 'Operet' }, { key: 'D', text: 'Pantomim' }],
    correctAnswer: 'A',
    explanation: 'Tragedi adalah drama yang bertemakan kesedihan atau malapetaka duka.'
  },
  {
    id: 'SIM-C-IND-11',
    number: 11,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Bentuk puisi lama Melayu yang bersajak a-a-a-a adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Puisi Lama', 'Syair (a-a-a-a)', '#0891B2',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#CFFAFE"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#0E7490" text-anchor="middle">SYAIR</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Syair' }, { key: 'B', text: 'Pantun' }, { key: 'C', text: 'Gurindam' }, { key: 'D', text: 'Karmina' }],
    correctAnswer: 'A',
    explanation: 'Syair berima rata a-a-a-a dan semua barisnya merupakan isi.'
  },
  {
    id: 'SIM-C-IND-12',
    number: 12,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Sudut pandang orang pertama dalam cerita fiksi ditandai dengan kata ganti...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Sudut Pandang', 'Kata Ganti "Aku / Saya"', '#F59E0B',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#FEF3C7"/><text x="90" y="55" font-size="16" font-weight="bold" fill="#B45309" text-anchor="middle">AKU / SAYA</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Aku / Saya' }, { key: 'B', text: 'Dia / Mereka' }, { key: 'C', text: 'Kamu / Anda' }, { key: 'D', text: 'Beliau' }],
    correctAnswer: 'A',
    explanation: 'Sudut pandang orang pertama menggunakan tokoh "Aku" atau "Saya".'
  },
  {
    id: 'SIM-C-IND-13',
    number: 13,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Teks yang menjelaskan proses terjadinya fenomena alam (seperti gunung meletus atau tsunami) disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Teks Penjelasan', 'Teks Eksplanasi', '#10B981',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#D1FAE5"/><text x="90" y="55" font-size="15" font-weight="bold" fill="#047857" text-anchor="middle">EKSPLANASI</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Teks Eksplanasi' }, { key: 'B', text: 'Teks Cerpen' }, { key: 'C', text: 'Teks Anekdot' }, { key: 'D', text: 'Teks Negosiasi' }],
    correctAnswer: 'A',
    explanation: 'Teks eksplanasi memaparkan hubungan sebab-akibat proses fenomena alam atau sosial.'
  },
  {
    id: 'SIM-C-IND-14',
    number: 14,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Penulisan kata baku yang benar di bawah ini adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Kata Baku', 'Apotek vs Apotik', '#2563EB',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#DBEAFE"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#1D4ED8" text-anchor="middle">APOTEK</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Apotek' }, { key: 'B', text: 'Apotik' }, { key: 'C', text: 'Apotheek' }, { key: 'D', text: 'Apotikq' }],
    correctAnswer: 'A',
    explanation: 'Kata baku yang tepat menurut KBBI adalah "Apotek" (bukan apotik).'
  },
  {
    id: 'SIM-C-IND-15',
    number: 15,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary Literacy',
    difficulty: 'Sangat Mudah',
    questionText: 'Ringkasan singkat isi dari sebuah buku atau karangan karya sastra disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Ringkasan Buku', 'Sinopsis', '#8B5CF6',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#EDE9FE"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#6D28D9" text-anchor="middle">SINOPSIS</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Sinopsis' }, { key: 'B', text: 'Indeks' }, { key: 'C', text: 'Glosarium' }, { key: 'D', text: 'Bibliografi' }],
    correctAnswer: 'A',
    explanation: 'Sinopsis merupakan ringkasan garis besar jalan cerita atau isi karya.'
  },
  {
    id: 'SIM-C-IND-16',
    number: 16,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary Literacy',
    difficulty: 'Sangat Mudah',
    questionText: 'Bagian akhir dari alur cerita yang merupakan penyelesaian konflik disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Tahap Alur Cerita', 'Resolusi Cerita', '#059669',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#D1FAE5"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#047857" text-anchor="middle">RESOLUSI</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Resolusi' }, { key: 'B', text: 'Orientasi' }, { key: 'C', text: 'Komplikasi' }, { key: 'D', text: 'Klimaks' }],
    correctAnswer: 'A',
    explanation: 'Resolusi adalah tahap penyelesaian masalah atau lerai konflik dalam cerita.'
  },
  {
    id: 'SIM-C-IND-17',
    number: 17,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary Literacy',
    difficulty: 'Sangat Mudah',
    questionText: 'Ungkapan "Kutu Buku" bermakna orang yang...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Makna Kias', 'Gemar Membaca', '#D97706',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="60" rx="10" fill="#FEF3C7"/><text x="100" y="55" font-size="15" font-weight="bold" fill="#B45309" text-anchor="middle">Suka Membaca</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Sangat suka membaca buku' }, { key: 'B', text: 'Suka merusak buku' }, { key: 'C', text: 'Menjual buku di toko' }, { key: 'D', text: 'Hewan kecil di dalam buku' }],
    correctAnswer: 'A',
    explanation: 'Kutu buku adalah kiasan bagi orang yang sangat rajin membaca buku.'
  },
  {
    id: 'SIM-C-IND-18',
    number: 18,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary Literacy',
    difficulty: 'Sangat Mudah',
    questionText: 'Teks pidato resmi biasanya diawali dengan ucapan...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Struktur Pidato', 'Salam Pembuka', '#2563EB',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#DBEAFE"/><text x="90" y="55" font-size="15" font-weight="bold" fill="#1D4ED8" text-anchor="middle">SALAM PEMBUKA</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Salam pembuka dan puji syukur' }, { key: 'B', text: 'Permintaan sumbangan' }, { key: 'C', text: 'Cerita lucu' }, { key: 'D', text: 'Ucapan pamitan' }],
    correctAnswer: 'A',
    explanation: 'Pidato formal dibuka dengan salam pembuka, penghormatan, dan puji syukur.'
  },
  {
    id: 'SIM-C-IND-19',
    number: 19,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary Literacy',
    difficulty: 'Sangat Mudah',
    questionText: 'Kata serapan yang berasal dari bahasa Inggris berikut adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Kata Serapan', 'Computer -> Komputer', '#0891B2',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#CFFAFE"/><text x="90" y="55" font-size="16" font-weight="bold" fill="#0E7490" text-anchor="middle">KOMPUTER</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Komputer' }, { key: 'B', text: 'Gamelan' }, { key: 'C', text: 'Wayang' }, { key: 'D', text: 'Kereta' }],
    correctAnswer: 'A',
    explanation: 'Kata "Komputer" diserap dari bahasa Inggris "Computer".'
  },
  {
    id: 'SIM-C-IND-20',
    number: 20,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary Literacy',
    difficulty: 'Sangat Mudah',
    questionText: 'Daftar buku rujukan yang digunakan dalam penulisan karya ilmiah disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Rujukan Ilmiah', 'Daftar Pustaka', '#7C3AED',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="60" rx="10" fill="#EDE9FE"/><text x="100" y="55" font-size="15" font-weight="bold" fill="#6D28D9" text-anchor="middle">DAFTAR PUSTAKA</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Daftar pustaka' }, { key: 'B', text: 'Kata pengantar' }, { key: 'C', text: 'Daftar isi' }, { key: 'D', text: 'Lampiran foto' }],
    correctAnswer: 'A',
    explanation: 'Daftar pustaka memuat sumber referensi buku, jurnal, atau artikel yang dikutip.'
  }
];
